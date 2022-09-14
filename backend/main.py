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
from fb_setting import (
    get_current_user
)
from database import (
    initialize,
    update_rate,
    get_all_pair,
    get_all_rate,
    get_current_rate,
)
from decide_color import color_array
from detect_board import det_board
from correct_board import cor_board
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

default_app = firebase_admin.initialize_app()

app = FastAPI() 



initialize()
app = FastAPI()


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


#firebaseからuidを取ってきたいときの実装
@app.get("/sample")
async def id(token_test = Depends(get_current_user)):
    uid = token_test["uid"]
    return [uid]


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
    cor_board(im, x, y)

    return FileResponse("files/corrected.png")


@app.post("/post/move")
def _(
    black: str,
    white: str,
    upload_file: UploadFile = File(...),
):
    return FileResponse("files/output.png")


@app.post("/post/result")
def _():
    return {}


@app.get("/get/rate")
def _(id: str):
    return get_current_rate(id)


@app.get("/me")
def user_hello(current_user=Depends(get_current_user)):
    return {"msg":"Hello","user":current_user}

@app.get("/get/all_rate")
def _():
    return {}


@app.get("/get/rate_hist")
def _(id: str):
    return get_all_rate(id)


@app.get("/get/all_name")
def _():
    return get_all_pair()

