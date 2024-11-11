from database import db
import json


class Habit(db.Model):
    __tablename__ = 'habits'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), unique=True, nullable=False)
    dates = db.Column(db.Text, nullable=False)  # Store JSON-encoded 365-day array

    def __init__(self, title):
        self.title = title
        self.dates = json.dumps([0] * 365)  # Initialize with 365 days of 0 (not completed)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "dates": json.loads(self.dates)  # Decode dates JSON before sending to frontend
        }


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), unique=True, nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "completed": self.completed
        }