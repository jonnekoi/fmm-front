import { useState } from 'react';
import { format } from 'date-fns';

// eslint-disable-next-line react/prop-types
const MatchesList = ({ matches, onMatchClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const upcomingMatches = matches
      // eslint-disable-next-line react/prop-types
  .filter(match => match.home_score === null && match.away_score === null)
  .sort((a, b) => new Date(b.matchday) - new Date(a.matchday));

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleMatches = upcomingMatches.slice(startIndex, endIndex);

  const nextPage = () => {
    if (endIndex < upcomingMatches.length) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
      <div className="flex flex-col bg-slate-900 m-5 league-data-component">
        <h1 className="font-myFont text-6xl pb-5">League Matches</h1>
        <table className="w-full table-mobile">
          <thead>
          <tr>
            <th className="p-3 poppins-font border-b border-white">Date</th>
            <th className="p-3 poppins-font border-b border-white">Home Team</th>
            <th className="p-3 poppins-font border-b border-white">Away Team</th>
            <th className="p-3 poppins-font border-b border-white">Score</th>
          </tr>
          </thead>
          <tbody>
          {visibleMatches.map(match => (
              <tr
                  key={match.match_id}
                  className="cursor-pointer tr-alin"
                  onClick={() => onMatchClick(match.match_id)}
              >
                <td className="p-3 poppins-font border-b border-white">
                  {format(new Date(match.matchday), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="p-3 poppins-font border-b border-white">{match.home_team}</td>
                <td className="p-3 poppins-font border-b border-white">{match.away_team}</td>
                <td className="p-3 poppins-font border-b border-white">{match.home_score} - {match.away_score}</td>
              </tr>
          ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded ${currentPage === 0 ? "cursor-not-allowed" : "text-white"}`}
          >
            Previous
          </button>
          <button
              onClick={nextPage}
              disabled={endIndex >= upcomingMatches.length}
              className={`px-4 py-2 rounded ${endIndex >= upcomingMatches.length ? "cursor-not-allowed" : "text-white"}`}
          >
            Next
          </button>
        </div>
      </div>
  );
};

export default MatchesList;
