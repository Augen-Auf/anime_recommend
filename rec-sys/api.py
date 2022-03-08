from typing import Optional
import uvicorn
from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel

import SVD_prediction

app = FastAPI()


class UserData(BaseModel):
    user_id: str
    anime_ratings: Optional[dict] = None


@app.get('/')
async def init_page():
    return {'message': 'hello world'}


@app.post('/make-recommend')
def make_recommend(user_data: UserData):
    predictions = SVD_prediction.make_predict(user_data.user_id, user_data.anime_ratings)
    return predictions


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)


