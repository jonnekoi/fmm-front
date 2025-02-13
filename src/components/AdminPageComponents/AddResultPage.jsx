import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
const url = 'http://127.0.0.1:3000/v1';

const AddResultPage = () => {
  const [matches, setMatches] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);


  const fetchMatches = async () => {
    try {
      const response = await fetch(url + '/matches');
      const responseData = await response.json();
      setMatches(responseData);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);


  const handleAddResult = async (index, homeScore, awayScore) => {
    const matchId = index;
    const matchScores = {
      home_score: homeScore,
      away_score: awayScore,
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(matchScores),
    };

    try {
      const response = await fetch(`${url}/matches/result/post/${matchId}`, fetchOptions);
      if (response.ok) {
        setSelectedRowIndex(null);
        setMatches(prevMatches => {
          const updatedMatches = prevMatches.filter(match => match.id !== matchId);
          return [...updatedMatches];
        });
      } else {
        console.error('Error submitting score:', await response.json());
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  if (!matches) {
    return <div></div>;
  }

  const filteredMatches = matches.filter(match => match.home_score === null && match.away_score === null);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleMatches = filteredMatches.slice(startIndex, endIndex);

  const nextPage = () => {
    if (endIndex < filteredMatches.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
      <div className="w-full">
      <div className="flex flex-col bg-slate-900 m-5 w-full rounded">
        <table className="w-full table-mobile">
          <thead>
          <tr>
            <th className="p-3 poppins-font border-b border-white">Match Date</th>
            <th className="p-3 poppins-font border-b border-white">Home</th>
            <th className="p-3 poppins-font border-b border-white">Away</th>
          </tr>
          </thead>
          <tbody>
          {visibleMatches.map((match) => (
              <tr key={match.id}
                  className={`cursor-pointer tr-alin ${selectedRowIndex ===
                  match.id ? 'selected-row' : ''}`}
                  onClick={() => setSelectedRowIndex(match.id)}>
                <td className="p-3 poppins-font border-b border-white">{format(
                    new Date(match.matchday), 'dd/MM/yyyy HH:mm')}</td>
                <td className="p-3 poppins-font border-b border-white">{match.home_team}</td>
                <td className="p-3 poppins-font border-b border-white">{match.away_team}</td>
              </tr>
          ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded ${currentPage === 0 ? "cursor-not-allowed" : "text-white"}`}>Previous</button>
          <button
              onClick={nextPage}
              disabled={endIndex >= filteredMatches.length}
              className={`px-4 py-2 rounded ${endIndex >= filteredMatches.length ? "cursor-not-allowed" : "text-white"}`}>Next</button>
        </div>
      </div>
        {selectedRowIndex !== null && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const homeScore = formData.get('home_score');
              const awayScore = formData.get('away_score');
              handleAddResult(selectedRowIndex, homeScore, awayScore);
            }} className="flex justify-center m-5 w-full rounded">
              <div className="m-2">
                <label className="block">Home Score</label>
                <input name="home_score" min="0" type="number"
                       className="bg-white m-2 p-2 text-black"/>
              </div>
              <div className="m-2">
                <label className="block">Away Score</label>
                <input name="away_score" min="0" type="number"
                       className="bg-white m-2 p-2 text-black"/>
              </div>
              <button type="submit"
                      className="font-myFont text-4xl m-2 mt-5 hover:underline">Add
                Score
              </button>
            </form>
        )}
      </div>
  );
};

export default AddResultPage;
