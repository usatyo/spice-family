from fastapi import FastAPI, UploadFile
import uvicorn

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/post/firstboard")
def board_position(file: UploadFile):
    return file


@app.post("/post/board")
def read_item(skip: int = 10):
    return {"item_id": skip}


@app.post("/post/rate")
def calc_rate():
    return 0


@app.get("/items/")
def read_query_item(skip: int = 0, limit: int = 10):
    return 0


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
