import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
const url = 'http://127.0.0.1:3000/v1';
const AddResultPage = () => {
  const [matches, setMatches] = useState(null);
  const [scores, setScores] = useState({});

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

  const handleScoreChange = (matchId, type, value) => {
    setScores(prevScores => ({
      ...prevScores,
      [matchId]: {
        ...prevScores[matchId],
        [type]: value
      }
    }));
  };

  const handleSubmit = async (matchId) => {
    const matchScores = scores[matchId];
    if (!matchScores)
      return;
    if (!matchScores || matchScores.home_score < 0 || matchScores.away_score < 0) {
      return;
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
      await response.json();
      location.reload();
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  if (!matches) {
    return <div></div>;
  }

  const filteredMatches = matches.filter(match => match.home_score === null && match.away_score === null);

  return (
      <div className="flex flex-col bg-slate-900 m-5 w-full league-data-component">
        <h1 className="font-myFont text-6xl">Matches</h1>
        <table className="w-full table-mobile">
          <thead>
          <tr>
            <th className="p-3 poppins-font border-b border-white">Match Date</th>
            <th className="p-3 poppins-font border-b border-white">Home</th>
            <th className="p-3 poppins-font border-b border-white">Away</th>
            <th className="p-3 poppins-font border-b border-white">Score</th>
            <th className="p-3 poppins-font border-b border-white">Add</th>
          </tr>
          </thead>
          <tbody>
          {filteredMatches.map((match, index) => (
              <tr key={index} className="cursor-pointer tr-alin">
                <td className="p-3 poppins-font border-b border-white">{format(new Date(match.matchday), 'dd/MM/yyyy HH:mm')}</td>
                <td className="p-3 poppins-font border-b border-white">{match.home_team}</td>
                <td className="p-3 poppins-font border-b border-white">{match.away_team}</td>
                <td className="p-3 poppins-font border-b border-white">
                  <input
                      type="number"
                      value={scores[match.id]?.home_score || ''}
                      onChange={(e) => handleScoreChange(match.id, 'home_score', e.target.value)}
                      className="p-1 w-1/4 bg-white text-black"
                  />
                  -
                  <input
                      type="number"
                      value={scores[match.id]?.away_score || ''}
                      onChange={(e) => handleScoreChange(match.id, 'away_score', e.target.value)}
                      className="p-1 w-1/4 bg-white text-black"
                  />
                </td>
                <td className="">
                  <button onClick={() => handleSubmit(match.id)} className="form-button">Add</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default AddResultPage;
