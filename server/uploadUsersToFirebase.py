import firebase_admin
from firebase_admin import credentials, firestore
import json
import os

# Initialize Firestore DB
cred = credentials.Certificate('/Users/ashoksaravanan/Coding/ReadAI/server/secret/readai-bbdff-firebase-adminsdk-v18p4-260e6fa436.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Path to the users folder
users_folder_path = '/Users/ashoksaravanan/Coding/ReadAI/server/secret/users'

# Function to upload data to Firestore
def upload_to_firestore(data, collection_name, document_id):
    doc_ref = db.collection(collection_name).document(document_id)
    doc_ref.set(data)
    print(f"Document {document_id} added to collection {collection_name}")

# Iterate through each file in the users folder
for filename in os.listdir(users_folder_path):
    if filename:  # Make sure it is not empty
        user_id = filename  # Filename is the user ID
        file_path = os.path.join(users_folder_path, filename)
        
        # Load JSON data from file
        with open(file_path, 'r', encoding='utf-8') as f:
            user_data = json.load(f)
        
        # Upload the user data to Firestore
        upload_to_firestore(user_data, 'users', user_id)
