from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

books = [
    #id  title  author  user_id timestamp
    [1, "The Hobbit", "J.R.R Tolkein", 1, "2025-11-11 13:23:44"],
    [2, "The Colour of Magic", "Terry Pratchet", 1, "2025-11-09 15:45:21"],
    [3, "Cloud Cuckoo Land", "Anthony Doerr", 1, "2025-11-11 11:12:01"]
    ]

@app.get("/")
async def root():
    return books