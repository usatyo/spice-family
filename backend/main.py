import os
import uvicorn
import cv2
import shutil
import os
from utility import calc_rate
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
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
)
from decide_color import color_array
from detect_board import det_board
from correct_board import cor_board
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

# key_path = os.environ['GOOGLE_APPLICATION_CREDENTIALS']
# print(key_path)
# cred = credentials.RefreshToken(key_path)
# default_app = firebase_admin.initialize_app(cred)
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


@app.post("/post/board")
def _(
    upload_file: UploadFile = File(...),
):
    path = "files/given.jpg"
    with open(path, "w+b") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    im = cv2.imread(os.path.abspath(path))
    x, y = det_board(im)
    print(x)
    print(y)
    cor_board(im, x, y)

    return FileResponse("files/corrected.jpg")


@app.post("/post/start_game")
def _(
    black: str,
    white: str,
):
    if not id_in_sql(black) or not id_in_sql(white):
        return {"error": "non-exist user_id"}
    game_id = new_game(black, white)
    return {"game_id": game_id}


@app.post("/post/move")
def _(
    game_id: int,
    upload_file: UploadFile = File(...),
):
    path = "files/given.jpg"
    with open(path, "w+b") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    im = cv2.imread(os.path.abspath("files/given.jpg"))
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
    return {}


@app.get("/get/rate")
def _(id: str):
    if not id_in_sql(id):
        return {"error": "invalid user_id"}
    return get_current_rate(id)


@app.get("/me")
def user_hello(current_user=Depends(get_current_user)):
    return {"msg": "Hello", "user": current_user}


@app.get("/get/rate_hist")
def _(id: str):
    if not id_in_sql(id):
        return {"error": "invalid user_id"}
    return get_all_rate(id)


@app.get("/get/all_name")
def _():
    return get_all_pair()


@app.get("/get/result")
def _(id: str):
    return get_all_result(id)


@app.get("/get/game_record")
def _(game_id: int):
    get_record(game_id)
