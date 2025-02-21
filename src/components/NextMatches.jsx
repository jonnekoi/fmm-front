import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const url = 'http://127.0.0.1:3000/v1';

// This renders table of next matches

const fetchMatches = async (setMatches) => {
  try {
    const response = await fetch(url + '/matches');
    const responseData = await response.json();
    setMatches(responseData);
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
}

const NextMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches(setMatches);
  }, []);

  const currentDate = new Date();
  const sortedMatches = matches
  .filter(match => match.home_score === null && match.away_score === null)
  .filter(match => new Date(match.matchday) >= currentDate)
  .sort((a, b) => new Date(a.matchday) - new Date(b.matchday))
  .slice(0, 5);

  return (
      <div className="flex flex-col bg-slate-900 m-5 league-data-component next-matches-mobile">
        <h1 className="font-myFont text-6xl">Next 5 matches</h1>
          <table className="w-full table-mobile">
            <thead>
            <tr>
              <th className="p-3 poppins-font border-b border-white">Match Date</th>
              <th className="p-3 poppins-font border-b border-white">Home</th>
              <th className="p-3 poppins-font border-b border-white">Away</th>
              <th className="p-3 poppins-font border-b border-white">Score</th>
            </tr>
            </thead>
            <tbody>
            {sortedMatches.map((match, index) => (
                <tr key={index} className="cursor-pointer tr-alin">
                  <td className="p-3 poppins-font border-b border-white">{format(new Date(match.matchday), 'dd/MM/yyyy HH:mm')}</td>
                  <td className="p-3 poppins-font border-b border-white">{match.home_team}</td>
                  <td className="p-3 poppins-font border-b border-white">{match.away_team}</td>
                  <td className="p-3 poppins-font border-b border-white">{match.home_score} - {match.away_score}</td>
                </tr>
            ))}
            </tbody>
          </table>
      </div>
  );
};

export default NextMatches;
