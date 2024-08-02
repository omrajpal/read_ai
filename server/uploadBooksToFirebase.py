import firebase_admin
from firebase_admin import credentials, firestore
import json

# Initialize Firestore DB
cred = credentials.Certificate('/Users/ashoksaravanan/Coding/ReadAI/server/secret/readai-bbdff-firebase-adminsdk-v18p4-260e6fa436.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load JSON data from file
with open('/Users/ashoksaravanan/Coding/ReadAI/server/secret/all_books.json', 'r') as f:
    json_data = json.load(f)

# Function to upload data to Firestore
def upload_to_firestore(data, collection_name):
    for title, book_data in data.items():
        doc_ref = db.collection(collection_name).document(title)
        doc_ref.set(book_data)
        print(f"Document '{title}' added to collection '{collection_name}'")

# Upload the JSON data to Firestore
upload_to_firestore(json_data, 'books')
