import csv
import re
import boto3
import math
from io import StringIO
import json
import operator
import os
import logging
import random

# Get the value of the LAMBDA_LOG_LEVEL environment variable
log_level = os.environ.get('LAMBDA_LOG_LEVEL', 'INFO')

# Configure the logger
logger = logging.getLogger()
logger.setLevel(log_level)

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def mean_squared_error(y_true, y_pred):
    mse = sum((yt - yp) ** 2 for yt, yp in zip(y_true, y_pred)) / len(y_true)
    return math.sqrt(mse)

def weighted_euclidean_distance(v1, v2, weights):
    """
    Calculate the weighted Euclidean distance between two vectors.
    
    Parameters:
    v1 (list): The first vector.
    v2 (list): The second vector.
    weights (list): The weights for each element.
    
    Returns:
    float: The weighted Euclidean distance between the two vectors.
    """
    return math.sqrt(sum(w * (a - b)**2 for a, b, w in zip(v1, v2, weights)))

def similarity_percentage(v1, v2, weights):
    """
    Calculate the similarity percentage based on weighted Euclidean distance.
    
    Parameters:
    v1 (list): The first vector.
    v2 (list): The second vector.
    weights (list): The weights for each element.
    
    Returns:
    float: The similarity percentage between the two vectors.
    """
    max_distance = math.sqrt(sum(w * (10**2) for w in weights))
    actual_distance = weighted_euclidean_distance(v1, v2, weights)
    similarity = 1 - (actual_distance / max_distance)
    return similarity

def rescale_similarity(similarity, low=40, high=95):
    """
    Rescale the similarity score to fit into the desired range.
    
    Parameters:
    similarity (float): The original similarity score.
    low (float): The lower bound of the desired range.
    high (float): The upper bound of the desired range.
    
    Returns:
    float: The rescaled similarity score.
    """
    score = low + (high - low) * similarity
    
    if score > 85:
        score += 7
    elif score > 80:
        score += 5
    else:
        score -= 7
    
    # Rescaling
    if score > 100:
        score = 100
    elif score < 1:
        score = 1
    
    return score


def dot_product(A, B):
    return sum(a * b for a, b in zip(A, B))

def magnitude(v):
    return sum(x**2 for x in v)**0.5

def cosine_similarity(A, B):
    try:
        return dot_product(A, B) / (magnitude(A) * magnitude(B))
    except ZeroDivisionError:
        return None  # Handle the case where one or both vectors are zero vectors


def lambda_handler(event, context):
    
    # Need to try using GNN for simplicty and database to store cat + gen / find other way to cache data and books
    
    # extract the parameters from the event object
    cat_data = event["queryStringParameters"]["cat"]
    gen_data = event["queryStringParameters"]["gen"]
    
    logger.info(f"Categorical Data: {cat_data} General Data: {gen_data}")
    
    cat_weights = [7.0, 9.5, 8.5, 6.0, 4.0]
    gen_weights = [10.0, 9.0, 8.0, 7.0, 6.0]
    
    userWeights = {}
    genres = ['Personal Growth', 'Leadership Management', 'Creativity', 'Finance Wealth', 'Communication Relationships', 'Health Wellness', 'Mindfulness', 'Spirituality']
    
    for idx, genre in enumerate(genres):
        wgts = []
        for char in cat_data[3*idx:3*(idx+1)]:
            wgts.append(cat_weights[int(char) - 1])
    
        for char in gen_data:
            wgts.append(gen_weights[int(char) - 1])
        userWeights[genre] = wgts
    
    # s3 client to access files
    s3 = boto3.client('s3', region_name='us-east-2')
    
    # get data from s3 bucket
    
    booksFile = s3.get_object(Bucket='readaibookshelf', Key='books.json')
    booksDict = json.loads(booksFile['Body'].read())
    
    books = booksDict.values()
    
    pathParameters = event.get('pathParameters', {})
    rawPath = event.get('rawPath')
    
    # Handle /id
    if pathParameters:
        book_id = pathParameters.get('id')
        genre = pathParameters.get('genre')
        
        if book_id: # getBookById()
            for book in books: # finding book with specified id
                if book['id'] == book_id:
                    book_with_id = book
                    break
            
            if 'similar' in rawPath: # getSimilarBooks()
                newBooks = []
                genre_index = random.choice(range(len(book_with_id["weights"])))
                for book in books:
                    for weight in book["weights"]:
                        bookGenre = weight["Genre"]
                        if bookGenre == book_with_id["weights"][genre_index]["Genre"]: # Only using first genre for now to simplify logic -- need GNN!:
                            newBooks.append(book)
                            break
                books = newBooks
                
                book_with_id_genre = book_with_id["weights"][genre_index]["Genre"]
                book_with_id_weight = list(book_with_id["weights"][genre_index].values())
                book_with_id_weights = [float(w) for w in book_with_id_weight[:6]]
                
                userWeights[book_with_id_genre] = book_with_id_weights
            else: # Book Details
                books = [book_with_id]
        
        if genre: # getBooksbyGenre()
            newBooks = []
            for book in books:
                for weight in book["weights"]:
                    bookGenre = weight["Genre"]
                    if bookGenre == genre:
                        newBooks.append(book)
                        break
            books = newBooks
    
    
    for book in books:
        # update weights
        weights = book["weights"]
        scores = []
        genres = []
        for weight in weights: # dict
            
            weight = list(weight.values())
            bookWeights = [float(w) for w in weight[:6]]
            genre = weight[-1]
            
            scores.append(rescale_similarity(similarity_percentage(userWeights[genre], bookWeights, weights=[2,2,2,1,1,1])))
            genres.append(genre)
        
        book["score"] = scores
        book['genre'] = genres
        
        del book['weights']
        
    books = sorted(books, key=lambda k: k['score'], reverse=True)
    # Handling top
    
    if rawPath == "/default/getBooks/top": # getTopBooks()
        genres = []
        newBooks = []
        for book in books:
            if len(genres) < 50:
                if genres.count(book["genre"]) < 7:
                    genres.append(book["genre"])
                    newBooks.append(book)
            else:
                books = newBooks
                break
        
    # Remove Duplicates        
    ids = [] # storing ids already found in books
    newBooks = [] # storing the new books availaible
    for book in books:
        if book["id"] not in ids: # new book
            ids.append(book["id"])
            newBooks.append(book) # adding the books not currenlty in to newBooks
    
    return list(newBooks) # getAllBooks()