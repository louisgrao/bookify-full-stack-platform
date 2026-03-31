from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select


class Books(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    author: str
    user_id: int       
    added: str   
      
DATABASE_URL = "postgresql://louis@localhost:5432/bookify"
engine = create_engine(DATABASE_URL)

app = FastAPI()


def get_session():
    with Session(engine) as session:
        yield session

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(session: Session = Depends(get_session)):
    statement = select(Books)
    books = session.exec(statement).all()
    if not books:
        raise HTTPException(status_code=404, detail="Book not found")
        
    return books

