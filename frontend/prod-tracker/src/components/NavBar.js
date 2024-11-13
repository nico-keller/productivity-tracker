// src/components/NavBar.js

import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Prod</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/tasks">Tasks</a></li>
        <li><a href="/habits">Habits</a></li>
        <li><a href="/weather">Weather</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
