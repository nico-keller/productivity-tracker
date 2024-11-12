import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import NewsFeed from "./components/NewsFeed";
import MatchFeed from "./components/MatchFeed";
import Tasks from './pages/Tasks';
import Habits from "./pages/Habits";

function App() {
    return (
        <Router>
            <div>
                <NavBar/>
                <Routes>
                    <Route path="/" element={
                      <>
                        <NewsFeed />
                        <MatchFeed />
                      </>
                    }/>
                    <Route path="/tasks" element={<Tasks/>}/>
                    <Route path="/habits" element={<Habits/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
