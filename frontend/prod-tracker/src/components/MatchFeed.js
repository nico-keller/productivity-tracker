import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MatchFeed.css';

function MatchFeed() {
  const [matches, setMatches] = useState({});

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/matches');
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="match-feed">
      <h1>Match Feed</h1>
      {Object.keys(matches).map((team) => (
        <div key={team} className="team-matches">
          <h2>{team}</h2>
          <div className="match-carousel">
            {matches[team].last_matches.map((match, index) => (
              <div key={index} className="match-box">
                <p>{new Date(match.fixture.date).toLocaleDateString()}</p>
                <p>{match.teams.home.name} vs {match.teams.away.name}</p>
                <p>Score: {match.goals.home} - {match.goals.away}</p>
              </div>
            ))}
            {matches[team].next_match && (
              <div className="match-box upcoming">
                <p>Next Match:</p>
                <p>{new Date(matches[team].next_match.fixture.date).toLocaleDateString()}</p>
                <p>{matches[team].next_match.teams.home.name} vs {matches[team].next_match.teams.away.name}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchFeed;
