# backend/app.py
from flask import Flask
from routes import configure_routes
from database import init_db, db
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)

# Initialize the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///prod_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
init_db(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Make sure the database is set up correctly
with app.app_context():
    db.create_all()

# Configure routes
configure_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
