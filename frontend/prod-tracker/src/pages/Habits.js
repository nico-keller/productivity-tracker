// src/pages/Habits.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitTracker from '../components/HabitTracker';

function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("")

  // Fetch habits from the backend on component mount
  useEffect(() => {
    fetchHabits();
  },[]);

    const fetchHabits = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/habits'); // Replace with your API endpoint
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };


  // Add a new habit
  const addHabit = async (name) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/new-habit', { title: name });
      setHabits((prevHabits) => [...prevHabits, response.data]);
      console.log("Habit added:", response.data);  // Debugging output
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  // Toggle a day for a specific habit and update in the backend
  const toggleDay = async (habitIndex, dayOfYear) => {
    const updatedHabits = habits.map((habit, i) => {
      if (i === habitIndex) {
        const updatedDates = [...habit.dates];
        updatedDates[dayOfYear] = updatedDates[dayOfYear] === 1 ? 0 : 1;
        return { ...habit, dates: updatedDates };
      }
      return habit;
    });
    setHabits(updatedHabits);

    try {
      const habit = updatedHabits[habitIndex];
      await axios.put(`http://127.0.0.1:5000/habits/${habit.id}`, { dates: habit.dates });
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  // Delete a habit
  const deleteHabit = async (index) => {
    const habit = habits[index];
    try {
      await axios.delete(`http://127.0.0.1:5000/habits/${habit.id}`);
      setHabits(habits.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
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
