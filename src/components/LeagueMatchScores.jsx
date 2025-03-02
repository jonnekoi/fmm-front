import { useState } from 'react';
import { format } from 'date-fns';

// eslint-disable-next-line react/prop-types
const LeagueMatchScores = ({matches}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;


  const sortedMatches = matches
  .filter(match => match.home_score !== null && match.away_score !== null)

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleMatches = sortedMatches.slice(startIndex, endIndex);

  const nextPage = () => {
    if (endIndex < sortedMatches.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
      <div className="flex flex-col bg-slate-900 m-5 league-data-component">
        <h1 className="font-myFont text-6xl">Scores</h1>
        <table className="w-full table-mobile">
          <thead>
          <tr>
            <th className="p-3 poppins-font border-b border-white table-mobile">Match
              Date
            </th>
            <th className="p-3 poppins-font border-b border-white table-mobile">Home</th>
            <th className="p-3 poppins-font border-b border-white table-mobile">Away</th>
            <th className="p-3 poppins-font border-b border-white table-mobile">Score</th>
          </tr>
          </thead>
          <tbody>
          {visibleMatches.map((match, index) => (
              <tr key={index} className="cursor-pointer tr-alin">
                <td className="p-3 poppins-font border-b border-white table-mobile">{format(
                    new Date(match.matchday), 'dd/MM/yyyy HH:mm')}</td>
                <td className="p-3 poppins-font border-b border-white table-mobile">{match.home_team}</td>
                <td className="p-3 poppins-font border-b border-white table-mobile">{match.away_team}</td>
                <td className="p-3 poppins-font border-b border-white table-mobile">{match.home_score} - {match.away_score}</td>
              </tr>
          ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded ${currentPage === 0 ? "cursor-not-allowed" : "text-white"}`}>Previous</button>
          <button
              onClick={nextPage}
              disabled={endIndex >= sortedMatches.length}
              className={`px-4 py-2 rounded ${endIndex >= sortedMatches.length ? "cursor-not-allowed" : "text-white"}`}>Next</button>
        </div>
      </div>
  );
};

export default LeagueMatchScores;
