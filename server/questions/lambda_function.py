import json
import csv
import boto3


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

def lambda_handler(event, context):
    # s3 client to access files
    s3 = boto3.client('s3', region_name='us-east-2') # adjust the region name as necessary
    
    questions_obj = s3.get_object(Bucket='readaiquestions', Key='questions.csv') # replace 'your-bucket-name' with your S3 bucket name
    info_obj = s3.get_object(Bucket='readaiquestions', Key='info.csv')
    
    questions_data = [row for row in csv.DictReader(questions_obj['Body'].read().decode('utf-8').splitlines())]
    info_data = [row for row in csv.DictReader(info_obj['Body'].read().decode('utf-8').splitlines())]
    
    
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
        
    return combined_survey