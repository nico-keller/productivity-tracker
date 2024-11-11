// src/components/HabitTracker.js
import React from 'react';
import './HabitTracker.css';

function HabitTracker({ habit, habitIndex, toggleDay }) {
  // Define month names and the start of the year
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const yearStart = new Date(new Date().getFullYear(), 0, 1);

  return (
    <div className="habit-tracker">
      {/* Display habit title here as well, if needed */}
      <h2>{habit.title}</h2>
      <div className="graph">
        <ul className="months">
          {months.map((month, index) => (
            <li key={index}>{month}</li>
          ))}
        </ul>
        <ul className="days">
          {days.map((day, index) => (
            <li key={index} className={index % 2 === 0 ? "" : "invisible"}>{day}</li>
          ))}
        </ul>
        <ul className="squares">
          {habit.dates.map((completed, dayOfYear) => {
            const date = new Date(yearStart);
            date.setDate(yearStart.getDate() + dayOfYear);

            return (
              <li
                key={dayOfYear}
                className={`day-square ${completed ? 'completed' : 'not-completed'}`}
                onClick={() => toggleDay(habitIndex, dayOfYear)}
                title={date.toDateString()}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default HabitTracker;
