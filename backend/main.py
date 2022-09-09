from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import uvicorn
import cv2
import shutil
import os
from utility import calc_rate
from database import (
    initialize,
    update_rate,
    get_all_pair,
    get_all_rate,
    get_current_rate,
    update_result,
    get_all_result,
)
from decide_color import color_array
from detect_board import det_board
from correct_board import cor_board
from fastapi.middleware.cors import CORSMiddleware


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
def _(
    black: str,
    white: str,
    result: int,
):
    update_result(black, white, result)
    b_rate = get_current_rate(black)
    w_rate = get_current_rate(white)
    if result == 1:
        b_rate, w_rate = calc_rate(b_rate, w_rate, 0)
    elif result == -1:
        w_rate, b_rate = calc_rate(w_rate, b_rate, 0)

    update_rate(black, b_rate)
    update_rate(white, w_rate)
    return {}


@app.get("/get/rate")
def _(id: str):
    return get_current_rate(id)


@app.get("/get/all_rate")
def _(id: str):
    return get_all_rate(id)


@app.get("/get/all_name")
def _():
    return get_all_pair()


@app.get("/get/result")
def _():
    return get_all_result()