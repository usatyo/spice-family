import os 
import firebase_admin
from firebase_admin import credentials
from fastapi import FastAPI
from dotenv  import load_dotenv

load_dotenv()

# key_path = os.environ['GOOGLE_APPLICATION_CREDENTIALS']
# print(key_path)
# cred = credentials.RefreshToken(key_path)
# default_app = firebase_admin.initialize_app(cred)
default_app = firebase_admin.initialize_app()

app = FastAPI() 


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id):
    return {"item_id": item_id}


fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/items/")
def read_query_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]