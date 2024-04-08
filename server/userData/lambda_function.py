import json
import boto3
import datetime

def get_from_s3(uuivd4_key):
    # Requirements: uuid
    s3 = boto3.client("s3")
    BUCKET_NAME = "readaiuserdata"
    
    try: 
        response = s3.get_object(
            Bucket=BUCKET_NAME, Key=uuivd4_key
        )  # trying to get response from s3 bucket
        data = response["Body"].read().decode("utf-8")  # finding file content if exists
        return json.loads(data)
    except:
        return None
    

def store_in_s3(uuivd4_key, json_user_data):
    s3 = boto3.client("s3")
    BUCKET_NAME = "readaiuserdata"

    data = {"key": uuivd4_key, "time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "user_data": json_user_data}

    s3.put_object(Body=json.dumps(data), Bucket=BUCKET_NAME, Key=uuivd4_key)
    return data


def lambda_handler(event, context):
    
    pathParameters = event.get("pathParameters", {})

    if pathParameters:

        action = pathParameters.get("action")
        uuivd4_key = pathParameters.get("key")
        
        if action == "create":
            body = event.get("body", None)
            if body == None:
                return {"statusCode": 400, "body": "No data could be found"}
            
            body_json = json.loads(body)
            
            uuivd4_key = body_json["key"]
            user_data = body_json["data"]

            data = store_in_s3(uuivd4_key, user_data)
            return {"statusCode": 200, "body": json.dumps(data)}


        if action == "user":
            if uuivd4_key == None: 
                return {"statusCode": 400, "body": "No key could be found"}
                
            data = get_from_s3(uuivd4_key)
            return {"statusCode": 200, "body": json.dumps(data)}


        if action == "update":
            if uuivd4_key == None:
              return {"statusCode": 400, "body": "No key could be found"}
          
            # Getting user data
            body = event.get("body", None)
            if body == None:
                return {"statusCode": 400, "body": "No data could be found"}

            body_json = json.loads(body)
            
            data = store_in_s3(uuivd4_key, body_json)
            
            return {"statusCode": 200, "body": json.dumps(data)}

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
