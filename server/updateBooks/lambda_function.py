import json
import boto3
import csv
from re import sub
import requests
import pickle

def merge_books(books):
    book_dict = {}

    for book in books:
        # Use Title as a unique identifier
        key = book["Title"]

        # Extract dynamic weights and genre
        genre = book["Genre"]
        weight_keys = set(book.keys()) - {"Title", "Author", "Genre"}
        weights = {k: book[k] for k in weight_keys}
        weights["Genre"] = genre

        if key not in book_dict:
            # Initialize author and weights list
            book_dict[key] = {
                "Title": book["Title"],
                "Author": book["Author"],
                "Weights": [weights]
            }
        else:
            # Merge authors
            existing_author = book_dict[key]["Author"]
            if book["Author"] not in existing_author:
                book_dict[key]["Author"] = existing_author + ", " + book["Author"]
            
            # Check if genre already exists in Weights list
            existing_weights = [w for w in book_dict[key]["Weights"] if w["Genre"] == genre]
            if not existing_weights:
                book_dict[key]["Weights"].append(weights)

    # Convert back to list format
    merged_books = list(book_dict.values())
    return merged_books

def camel_case(s):
        s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
        return ''.join([s[0].lower(), s[1:]])

def lambda_handler(event, context):
    s3 = boto3.client('s3', region_name='us-east-2')

    # Get all the file names in the S3 bucket
    objects = s3.list_objects_v2(Bucket='readaibucket')
    
    # Check if 'Contents' key is in the response (it may not be if the bucket is empty)
    if 'Contents' not in objects:
        print("The bucket is empty.")
        exit()
    
    file_names = [obj['Key'] for obj in objects['Contents']]
    
    # Read all data from csv files
    data = []
    for file_name in file_names:
        if file_name.endswith('.csv'):  # Ensure we're only reading CSV files
            obj = s3.get_object(Bucket='readaibucket', Key=file_name)
            genre = file_name.rsplit('.', 1)[0]  # Removing the '.csv' from the filename to get the genre
            genre_cleaned = sub('[^0-9a-zA-Z]+', ' ', genre)
            for row in csv.DictReader(obj['Body'].read().decode('utf-8').splitlines()):
                row["Genre"] = genre_cleaned
                data.append(row)
    
    # Pre-process titles/combine genres
    data = merge_books(data)
    
    # Extract titles from all books
    titles = [book["Title"] for book in data]
    
    # Compare titles to titles.txt and find differences
    
    titlesFile = s3.get_object(Bucket='readaibookshelf', Key='titles.txt')
    savedTitles = json.loads(titlesFile['Body'].read())
    
    savedTitlesSet = set(savedTitles)
    newTitlesSet = set(titles)
    
    to_remove = savedTitlesSet - newTitlesSet
    to_add = newTitlesSet - savedTitlesSet
    
    remove = list(to_remove)
    add = list(to_add)
    
    # Run for loop and get Google Books data for each book, adding each one to bookshelf bucket. If no error, also add to titles.txt
    
    #add
    adding = {}
    for title in add:
        # find weights 
        idx = titles.index(title)
        weights = data[idx]["Weights"]
        
        response = requests.get(f"https://www.googleapis.com/books/v1/volumes?q=intitle:{title}&maxResults=1&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU", timeout=5)
        api_data = response.json()
        items = api_data.get('items', [])
        
        if items:
            volume_info = items[0].get('volumeInfo', {})
            sale_info = items[0].get('saleInfo', {})
            
            industry_identifiers = volume_info.get('industryIdentifiers', [])
            isbn13 = next((i['identifier'] for i in industry_identifiers if i['type'] == 'ISBN_13'), 'N/A')
            isbn10 = next((i['identifier'] for i in industry_identifiers if i['type'] == 'ISBN_10'), 'N/A')
            
            image_links = volume_info.get('imageLinks', {})
            small_thumbnail = image_links.get('smallThumbnail', 'N/A')
            thumbnail = image_links.get('thumbnail', 'N/A')
            
            retail_price = sale_info.get('retailPrice', {})
            
            bookshelf_data = {
                "id": items[0].get('id', "N/A"),
                "title": volume_info.get('title', 'N/A'),
                "subtitle": volume_info.get('subtitle', 'N/A'),
                "authors": volume_info.get('authors', ['N/A']),
                "publisher": volume_info.get('publisher', 'N/A'),
                "publishedDate": volume_info.get('publishedDate', 'N/A'),
                "description": volume_info.get('description', 'N/A'),
                "isbn13": isbn13,
                "isbn10": isbn10,
                "pageCount": volume_info.get('pageCount', 'N/A'),
                "averageRating": volume_info.get('averageRating', 'N/A'),
                "ratingsCount": volume_info.get('ratingsCount', 'N/A'),
                "smallThumbnail": small_thumbnail,
                "thumbnail": thumbnail,
                "country": sale_info.get('country', 'N/A'),
                "amount": retail_price.get('amount', 'N/A'),
                "currencyCode": retail_price.get('currencyCode', 'N/A'),
                "buyLink": sale_info.get('buyLink', 'N/A'),
                "weights" : weights
            }
            adding[title] = bookshelf_data
        
    
    #remove
    booksFile = s3.get_object(Bucket='readaibookshelf', Key='books.json')
    keeping = json.loads(booksFile['Body'].read())
    for title in remove:
        if title in keeping:
            del keeping[title]
    
    # #Updating Cloud
    books = {**adding, **keeping}
    cloudTitles = list(books.keys())
    
    
    s3.put_object(Body=json.dumps(books), Bucket='readaibookshelf', Key='books.json')
    s3.put_object(Body=json.dumps(cloudTitles), Bucket='readaibookshelf', Key='titles.txt')
    
    return books
