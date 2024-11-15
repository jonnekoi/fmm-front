// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {differenceInMinutes, format} from 'date-fns';

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
  const homeScore = match.home_score ? match.home_score : 0;
  const awayScore = match.away_score ? match.away_score : 0;
  const matchTime = new Date(match.matchday);
  const currentTime = new Date();
  const timeDifference = differenceInMinutes(matchTime, currentTime);
  const days = Math.floor(timeDifference / (60 * 24));
  const hours = Math.floor((timeDifference % (60 * 24)) / 60);
  const minutes = timeDifference % 60;

  const timeDisplay = timeDifference > 0
      ? days > 0
          ? `Starts in ${days}d ${hours}h ${minutes}min`
          : `Starts in ${hours}h ${minutes}min`
      : format(matchTime, 'yyyy-MM-dd HH:mm');
  return (
      <div className="w-2/6 flex flex-col m-3 match-detail-mobile">
        <h1 className="font-myFont text-6xl">Match Details</h1>
        <div className="bg-slate-900 m-auto w-full border mt-5 rounded p-10">
          <p className="p-2 font-myFont text-6xl"><strong></strong>{timeDisplay}</p>
          <p className="p-2 font-myFont text-6xl"><strong>Home: </strong> {match.home_team}</p>
          <p className="p-2 font-myFont text-6xl"><strong>Away: </strong> {match.away_team}</p>
          <p className="p-2 font-myFont text-6xl border-b"><strong>Score: </strong> {homeScore} - {awayScore}</p>
          <form className="flex flex-col m-auto w-3/4 profile-form">
          <label className="p-2 font-myFont text-6xl">Enter Score (e.g. 1-1):</label>
          <input className="m-2 bg-white rounded text-black p-1 text-center " type="text" id="score" name="score" pattern="^[0-99]-[0-99]$" required/>
          <button className="font-myFont mt-5 text-6xl hover:underline" type="submit">Submit</button>
          </form>
        </div>
      </div>
  );
};

export default SingleMatch;
