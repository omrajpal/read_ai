import firebase_admin
from firebase_admin import credentials, firestore
import json
import csv

def reformat_question(question):
    return {
        'questionType': 'SelectionGroup',
        'questionText': question['Question'],
        'questionId': question['Topic'],
        'questionSettings': {
            'allowDeselect': False,
        },
        'options': [
            {'optionText': question['Ratings'][0], 'value': '1'},
            {'optionText': question['Ratings'][1], 'value': '2'},
            {'optionText': question['Ratings'][2], 'value': '3'},
            {'optionText': question['Ratings'][3], 'value': '4'},
            {'optionText': question['Ratings'][4], 'value': '5'}
        ]
    }

def reformat_info(info):
    return {
        'questionType': "Info",
        'questionText': info['Text'],
        'questionId': info['Topic'],
    }

def reformat_name(name):
    return {
        'questionType': 'TextInput',
        'questionText': name['Topic'],
        'questionId': name['Topic'],
        'placeholderText': name['Text']
    }

def refactor_ratings(questions):
    json_questions_data = []
    for row in questions:
        ratings_list = [row[str(i)] for i in range(1, 6)]

        # Remove the last 5 key-value pairs from the original dictionary
        for i in range(1, 6):
            del row[str(i)]

        # Insert the new key with the ratings list
        row['Ratings'] = ratings_list
        json_questions_data.append(row)
    return json_questions_data

def load_csv_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return [row for row in csv.DictReader(f)]

# Initialize Firestore DB
cred = credentials.Certificate('/Users/ashoksaravanan/Coding/ReadAI/server/secret/readai-bbdff-firebase-adminsdk-v18p4-260e6fa436.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load CSV data from local files
questions_data = load_csv_data('/Users/ashoksaravanan/Coding/ReadAI/server/secret/questions.csv')
info_data = load_csv_data('/Users/ashoksaravanan/Coding/ReadAI/server/secret/info.csv')

questions = refactor_ratings(questions_data)
questions = list(map(reformat_question, questions))

start, name, info, end = info_data[:2], [info_data[2]], info_data[3:-1], [info_data[-1]]

start = list(map(reformat_info, start))
name = list(map(reformat_name, name))
info = list(map(reformat_info, info))
end = list(map(reformat_info, end))

combined_survey = []

combined_survey.extend(start)
combined_survey.extend(name)

for idx, info_question in enumerate(info):
    combined_survey.append(info_question)
    combined_survey.extend(questions[3*idx:3*idx+3])

combined_survey.extend(end)

# Function to upload data to Firestore
def upload_to_firestore(data, collection_name):
    for idx, question in enumerate(data):
        doc_ref = db.collection(collection_name).document(str(idx + 1))
        doc_ref.set(question)
        print(f"Document {idx + 1} added to collection {collection_name}")

# Upload the combined survey to Firestore
upload_to_firestore(combined_survey, 'questions')
