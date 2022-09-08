import os 
import uvicorn
import cv2
import shutil
from dotenv  import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from detect_board import det_board
from correct_board import cor_board
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

# key_path = os.environ['GOOGLE_APPLICATION_CREDENTIALS']
# print(key_path)
# cred = credentials.RefreshToken(key_path)
# default_app = firebase_admin.initialize_app(cred)
default_app = firebase_admin.initialize_app()

app = FastAPI() 


def get_current_user(cred: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    try:
        decoded_token = auth.verify_id_token(cred.credentials)
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid authentication credentials',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    user = decoded_token['firebase']['identities']

    return user

origins = [
    "http://localhost:3000",
    "http://localhost",
    # TODO: フロントエンドデプロイしたらそのURLも入れる
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "this is root"}


@app.post("/post/board")
def _(
    upload_file: UploadFile = File(...),
):
    path = f"files/{upload_file.filename}"
    with open(path, "w+b") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    im = cv2.imread(os.path.abspath(path))
    x, y = det_board(im)
    print(x)
    print(y)
    # cor_board(im, x, y)

    return FileResponse("files/output.png")


@app.post("/post/move")
def _(
    upload_file: UploadFile = File(...),
):
    return FileResponse("files/output.png")


@app.post("/post/result")
def _():
    return {}


@app.get("/get/rate")
def _():
    return {}


@app.get("/me")
def user_hello(current_user=Depends(get_current_user)):
    return {"msg":"Hello","user":current_user}

@app.get("/get/all_rate")
def _():
    return {}

