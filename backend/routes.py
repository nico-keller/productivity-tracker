# backend/routes.py
from flask import request, jsonify
from models import Task
from database import db

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
