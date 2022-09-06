from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import uvicorn
import cv2
import shutil
import os
from detect_board import det_board
from correct_board import cor_board
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware


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


@app.get("/get/all_rate")
def _():
    return {}
