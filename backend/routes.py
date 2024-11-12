# backend/routes.py
from flask import request, jsonify
from models import Task, Habit
from database import db
import json
from news import fetch_news


def configure_routes(app):
    @app.route('/', methods=['GET'])
    def home():
        return "Welcome to your Personal Productivity Tracker!", 200

    @app.route('/tasks', methods=['GET'])
    def get_tasks():
        tasks = Task.query.all()
        return jsonify([task.to_dict() for task in tasks]), 200

    @app.route('/new-task', methods=['POST'])
    def new_task():
        data = request.get_json()
        title = data.get('title')
        task = Task(title=title)
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201

    @app.route('/tasks/<int:task_id>', methods=['PUT'])
    def update_task(task_id):
        task = Task.query.get_or_404(task_id)
        data = request.get_json()
        task.title = data.get('title', task.title)
        task.completed = data.get('completed', task.completed)
        db.session.commit()
        return jsonify(task.to_dict()), 200

    @app.route('/tasks/<int:task_id>', methods=['DELETE'])
    def delete_task(task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return '', 204

    # Habit Routes
    @app.route('/habits', methods=['GET'])
    def get_habits():
        habits = Habit.query.all()
        return jsonify([habit.to_dict() for habit in habits]), 200

    @app.route('/new-habit', methods=['POST'])
    def new_habit():
        try:
            data = request.get_json()
            title = data.get('title')
            if not title:
                return jsonify({"error": "Title is required"}), 400

            habit = Habit(title=title)
            db.session.add(habit)
            db.session.commit()

            print("Habit added successfully:", habit.to_dict())  # Debugging output
            return jsonify(habit.to_dict()), 201
        except Exception as e:
            print("Error adding habit:", str(e))
            return jsonify({"error": "Failed to add habit"}), 500

    @app.route('/habits/<int:habit_id>', methods=['PUT'])
    def update_habit(habit_id):
        habit = Habit.query.get_or_404(habit_id)
        data = request.get_json()

        # Update the dates array
        habit.dates = json.dumps(data.get('dates', json.loads(habit.dates)))

        db.session.commit()
        return jsonify(habit.to_dict()), 200

    @app.route('/habits/<int:habit_id>', methods=['DELETE'])
    def delete_habit(habit_id):
        habit = Habit.query.get_or_404(habit_id)
        db.session.delete(habit)
        db.session.commit()
        return '', 204

    @app.route('/news', methods=['GET'])
    def get_news():
        news_data = fetch_news()  # Fetch the news data from news.py
        if news_data is not None:
            return jsonify(news_data), 200
        else:
            return jsonify({"error": "Failed to fetch news"}), 500