import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const url = 'http://127.0.0.1:3000/v1';

const fetchMatches = async (setMatches) => {
  try {
    const response = await fetch(url + '/matches');
    const responseData = await response.json();
    setMatches(responseData);
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
};

// eslint-disable-next-line react/prop-types
const MatchesTable = ({ setSelectedMatchId }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches(setMatches);
  }, []);

  const sortedMatches = matches.sort((a, b) => new Date(a.matchday) - new Date(b.matchday));

  const handleMatchClick = (event, id) => {
    event.preventDefault();
    setSelectedMatchId(id);
  };

  return (
      <div className="w-2/4 flex flex-col m-3 matches-mobile-table">
        <h1 className="font-myFont text-6xl" title="Select match for details">Matches</h1>
        <div className="bg-slate-900 m-auto w-full border mt-5 rounded">
          <table className="w-full tableHover">
            <thead>
            <tr>
              <th className="p-2 border">Match Date</th>
              <th className="p-2 border">Home</th>
              <th className="p-2 border">Away</th>
              <th className="p-2 border">Score</th>
            </tr>
            </thead>
            <tbody>
            {sortedMatches.map((match) => (
                <tr key={match.id} className="cursor-pointer hover:bg-gray-700" onClick={(event) => handleMatchClick(event, match.id)}>
                  <td className="p-2 border">{format(new Date(match.matchday), 'yyyy-MM-dd HH:mm')}</td>
                  <td className="p-2 border">{match.home_team}</td>
                  <td className="p-2 border">{match.away_team}</td>
                  <td className="p-2 border">{match.home_score} - {match.away_score}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default MatchesTable;
