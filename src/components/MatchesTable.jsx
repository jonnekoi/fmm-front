import React, { useState, useEffect } from 'react';
import { format, addHours } from 'date-fns';

const url = 'http://127.0.0.1:3000/v1';

const fetchMatches = async (setMatches) => {
  try {
    const response = await fetch(url + '/matches');
    const responseData = await response.json();
    setMatches(responseData);
    console.log(responseData);
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
}

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches(setMatches);
  }, []);

  return (
      <div className="w-2/6 flex flex-col m-3 matches-mobile-table">
        <h1 className="font-myFont text-6xl">Matches</h1>
        <div className="bg-slate-900 m-auto w-full border mt-5">
          <table className="w-full">
            <thead>
            <tr>
              <th className="p-2 border">Match Date</th>
              <th className="p-2 border">Home</th>
              <th className="p-2 border">Away</th>
              <th className="p-2 border">Score</th>
            </tr>
            </thead>
            <tbody>
            {matches.map((match, index) => (
                <tr key={index}>
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
