from fastapi import FastAPI, File, UploadFile, Form, status
from fastapi.responses import JSONResponse
import uvicorn
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
def _():
    return {}


@app.post("/post/move")
def _():
    return {}


@app.post("/post/result")
def _():
    return {}


@app.get("/get/rate")
def _():
    return {}


@app.get("/get/all_rate")
def _():
    return {}
