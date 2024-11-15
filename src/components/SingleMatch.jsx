// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const url = 'http://127.0.0.1:3000/v1';

// eslint-disable-next-line react/prop-types
const SingleMatch = ({ matchId }) => {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (matchId) {
      const fetchMatch = async () => {
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        };

        try {
          const response = await fetch(url + `/matches/${matchId}`, fetchOptions);
          const responseData = await response.json();
          setMatch(responseData);
        } catch (error) {
          console.error('Error fetching match:', error);
        }
      };

      fetchMatch();
    }
  }, [matchId]);

  if (!match) {
    return <div></div>;
  }

  return (
      <div className="w-2/6 flex flex-col m-3 match-detail-mobile">
        <h1 className="font-myFont text-6xl">Match Details</h1>
        <div className="bg-slate-900 m-auto w-full border mt-5 rounded p-10">
          <p><strong>Match Date:</strong> {match.matchday}</p>
          <p><strong>Home Team:</strong> {match.home_team}</p>
          <p><strong>Away Team:</strong> {match.away_team}</p>
          <p><strong>Score:</strong> {match.home_score} - {match.away_score}</p>
        </div>
      </div>
  );
};

export default SingleMatch;
