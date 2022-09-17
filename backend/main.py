import os
from pydantic import BaseModel
import uvicorn
import cv2
import shutil
import os
import base64
from utility import gen_boardimg
from utility import calc_rate
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fb_setting import get_current_user
from database import (
    initialize,
    update_rate,
    get_all_pair,
    get_all_rate,
    get_current_rate,
    update_result,
    get_all_result,
    id_in_sql,
    update_record,
    get_record,
    new_game,
    register_corner,
    get_corner,
    register_user,
    name_in_sql,
    get_name,
)
from decide_color import color_array
from detect_board import det_board
from correct_board import cor_board
from fastapi.middleware.cors import CORSMiddleware


class Item(BaseModel):
    src: str


load_dotenv()

default_app = firebase_admin.initialize_app()


initialize()
app = FastAPI()


def get_current_user(cred: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    try:
        decoded_token = auth.verify_id_token(cred.credentials)
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = decoded_token["firebase"]["identities"]

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


# firebaseからuidを取ってきたいときの実装
@app.get("/sample")
async def id(token_test=Depends(get_current_user)):
    uid = token_test["uid"]
    return [uid]


@app.post("/post/name")
def _(
    name: str,
    token=Depends(get_current_user),
):
    user_id = token["uid"]
    if name_in_sql(name) or not name:
        return {"error": "exist same name"}
    register_user(user_id, name)
    return


@app.post("/post/start_game")
def _(
    black: str,
    white: str,
):
    if not id_in_sql(black) or not id_in_sql(white):
        return {"error": "non-exist user_id"}
    game_id = new_game(black, white)
    return {"game_id": game_id}


@app.post("/post/board")
def _(
    game_id: int,
    upload_file: UploadFile = File(...),
):
    path = "files/given.jpg"
    with open(path, "w+b") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    im = cv2.imread(os.path.abspath(path))
    x, y = det_board(im)
    register_corner(game_id, x, y)
    cor_board(im, x, y)

    return FileResponse("files/corrected.jpg")


@app.post("/post/move")
def _(
    game_id: int,
    upload_file: UploadFile = File(...),
):
    path = "files/given.jpg"
    with open(path, "w+b") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    im = cv2.imread(os.path.abspath("files/given.jpg"))
    x, y = get_corner(game_id)
    cor_board(im, x, y)
    im = cv2.imread(os.path.abspath("files/corrected.jpg"))
    rec = color_array(im)
    update_record(game_id, rec)
    return FileResponse("files/output.jpg")


@app.post("/post/move/base64")
def _(
    game_id: int,
    img: Item,
):
    decoded_img = base64.b64decode(img.src)
    path = "files/given.jpg"
    f = open(path, "wb")
    f.write(decoded_img)
    f.close()
    im = cv2.imread(os.path.abspath("files/given.jpg"))
    x, y = get_corner(game_id)
    cor_board(im, x, y)
    im = cv2.imread(os.path.abspath("files/corrected.jpg"))
    rec = color_array(im)
    update_record(game_id, rec)
    return FileResponse("files/output.jpg")


@app.post("/post/result")
def _(
    game_id: int,
    result: int,
):
    if result < -1 or 1 < result:
        return {"error": "invalid result"}
    black, white = update_result(game_id, result)
    b_rate = get_current_rate(black)[0]["rate"]
    w_rate = get_current_rate(white)[0]["rate"]
    if result == 1:
        b_rate, w_rate = calc_rate(b_rate, w_rate, 0)
    elif result == -1:
        w_rate, b_rate = calc_rate(w_rate, b_rate, 0)

    update_rate(black, b_rate)
    update_rate(white, w_rate)
    return


@app.get("/get/rate")
def _(
    token=Depends(get_current_user),
):
    user_id = token["uid"]
    return get_current_rate(user_id)


@app.get("/get/rate_hist")
def _(
    token=Depends(get_current_user),
):
    user_id = token["uid"]
    return get_all_rate(user_id)


@app.get("/get/name")
def _(
    token=Depends(get_current_user)
):
    user_id = token["uid"]
    return get_name(user_id)


@app.get("/get/all_name")
def _():
    return get_all_pair()


@app.get("/get/result")
def _(
    token=Depends(get_current_user),
):
    user_id = token["uid"]
    return get_all_result(user_id)


@app.get("/get/game_record")
def _(
    game_id: int,
    turn: int,
):
    state = get_record(game_id, turn)
    if state == -1:
        return {"error": "Invalid game_id or invalid turn"}
    gen_boardimg(state)
    return FileResponse("files/output.jpg")
