import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Tasks from './pages/Tasks';
import Habits from "./pages/Habits";
import NewsFeed from "./components/NewsFeed";  // Import NewsFeed component

function App() {
    return (
        <Router>
            <div>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<NewsFeed/>}/> {/* Add NewsFeed on the homepage */}
                    <Route path="/tasks" element={<Tasks/>}/>
                    <Route path="/habits" element={<Habits/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
