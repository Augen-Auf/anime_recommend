from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class User(db.Model):
    id = db.column(db.Integer, primary_key=True)
    username = db.column(db.String(80), unique=True, nullable=False)
    email = db.column(db.String(120), unique=True, nullable=False)
    password = db.column(db.Text(), nullable=False)
    created_at = db.column(db.DateTime(), default=datetime.now())
    updated_at = db.column(db.DateTime(), onupdate=datetime.now())

    def __repr__(self) -> str:
        return f'User>>> {self.username}'
