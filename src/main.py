from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()


class Song(BaseModel):
    name: str
    singer: Optional[str]


@app.get('/')
def index():
    return 'Bem-vindo(a) à API do ministério de louvor da Igreja Batista em Conselheiro Paulino'


@app.get('/songs')
def list_songs():
    return { 'result': [] }


@app.get('/songs/{song_id}')
def get_song(song_id: str):
    return { 'message': 'Song not found', 'song_id': song_id }


@app.post('/songs')
def create_song(song: Song):
    return song


@app.delete('/songs/{song_id}')
def delete_song(song_id: str):
    return { 'message': 'Song not found', 'song_id': song_id }


@app.patch('/songs/{song_id}')
def update_song(song_id: str, song: Song):
    return { 'message': 'Song not found', 'song_id': song_id }
