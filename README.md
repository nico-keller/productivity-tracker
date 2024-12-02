# Personal Productivity Tracker

This project is a **Personal Productivity Tracker** designed to help users manage tasks, track habits, and stay updated with news, weather, and football match data. The system combines a Flask backend with a React frontend for a comprehensive and user-friendly experience.

---

## Features

### Backend Features
- **Task Management**: Create, read, update, and delete tasks.
- **Habit Tracking**: Add, update, and delete habits with date tracking.
- **News Feed**: Fetch and display the latest news articles.
- **Weather Updates**: Get weather forecasts for specified locations.
- **Football Matches**: Display upcoming matches for specific teams like Real Madrid and Bayern Munich.

### Frontend Features
- **Task and Habit Pages**: Interactive interfaces for task and habit tracking.
- **News Feed Component**: Displays the latest news articles.
- **Match Feed Component**: Showcases upcoming football matches.
- **Weather Page**: Displays weather forecasts for a given location.
- **Responsive Navigation Bar**: Easy navigation across different sections.

---

## Project Structure

### Backend
Located in the `backend/` directory:
- `app.py`: Entry point for the Flask backend.
- `routes.py`: Defines all API routes for tasks, habits, news, weather, and matches.
- `database.py`: Handles SQLite database setup and interactions.
- `models.py`: Defines ORM models for tasks and habits.
- `news.py`: Fetches the latest news data.
- `football.py`: Retrieves football match fixtures.
- `weather.py`: Provides weather forecast functionality.

### Frontend
Located in the `frontend/prod-tracker/` directory:
- `src/components`: Contains reusable components like `NavBar`, `NewsFeed`, `MatchFeed`, etc.
- `src/pages`: Contains individual pages like `Tasks.js`, `Habits.js`, and `Weather.js`.
- `public/`: Holds static files for the frontend.

---

## Requirements

### Backend
- Python 3.8+
- Flask
- Flask-CORS
- Flask-Migrate
- SQLAlchemy
- SQLite
- Requests

### Frontend
- React
- React Router DOM

---

## Setup and Usage

### Backend Setup
1. Navigate to the `backend/` directory.
2. Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
3. Initialize db
   flask db upgrade
5. Run the flask app:
   python app.py


### Frontend Setup
To set up the frontend, follow these steps:

1. Navigate to the `frontend/prod-tracker/` directory:
   ```bash
   cd frontend/prod-tracker/
2. Install Dependencies
   npm insall
3. Run frontend
   npm start


---
## Frontend Setup

backend/
│
├── app.py             # Flask entry point
├── database.py        # Database initialization
├── models.py          # ORM models
├── routes.py          # API routes
├── news.py            # News data fetching
├── football.py        # Football match fetching
├── weather.py         # Weather forecast fetching
└── migrations/        # Database migrations


frontend/prod-tracker/
│
├── public/            # Static files
├── src/
│   ├── components/    # Reusable components
│   │   ├── NavBar.js
│   │   ├── NewsFeed.js
│   │   ├── MatchFeed.js
│   │   ├── HabitTracker.js
│   │   └── WeatherFeed.js
│   ├── pages/         # Individual pages
│   │   ├── Tasks.js
│   │   ├── Habits.js
│   │   └── Weather.js
│   └── App.js         # Main React component
└── package.json       # Frontend dependencies

