// src/pages/Habits.js
import React, { useState, useEffect } from 'react';
import HabitTracker from '../components/HabitTracker';

const defaultHabits = [
  {
    name: "Exercise",
    dates: Array(365).fill(0), // Initialize with 365 days, not completed (0)
  },
];

function Habits() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : defaultHabits;
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name) => {
    setHabits([...habits, { name, dates: Array(365).fill(0) }]);
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  const toggleDay = (habitIndex, dayOfYear) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, i) => {
        if (i === habitIndex) {
          const updatedDates = [...habit.dates];
          updatedDates[dayOfYear] = updatedDates[dayOfYear] === 1 ? 0 : 1;
          return { ...habit, dates: updatedDates };
        }
        return habit;
      })
    );
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <AddHabitForm addHabit={addHabit} />
      {habits.map((habit, index) => (
        <div key={index}>
          <HabitTracker
            habit={habit}
            habitIndex={index}
            toggleDay={toggleDay}
          />
          <button onClick={() => deleteHabit(index)}>Delete Habit</button>
        </div>
      ))}
    </div>
  );
}

export default Habits;

// Form component to add a new habit
function AddHabitForm({ addHabit }) {
  const [newHabit, setNewHabit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newHabit) {
      addHabit(newHabit);
      setNewHabit("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Habit"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}
