import React, { useEffect, useState } from 'react';
import { differenceInMinutes, format } from 'date-fns';

const url = 'http://127.0.0.1:3000/v1';

const handleSubmitGuess = async (event, matchid, setStatusMessage, setUserGuess) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const matchId = matchid;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    },
    body: JSON.stringify(data),
  };

  try {
    console.log(data);
    const response = await fetch(url + `/matches/guess/${matchId}`, fetchOptions);
    if (response.status === 304) {
      setStatusMessage('Match already started');
    } else if (response.ok) {
      setStatusMessage('Guess added!');
      setUserGuess(data.guess);
    }
  } catch (error) {
    console.error('Error submitting guess:', error);
  }
};

const fetchUserGuess = async (matchId, setUserGuess) => {
  const userId = sessionStorage.getItem('id');
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  };

  try {
    const response = await fetch(url + `/matches/${matchId}/guess/${userId}`, fetchOptions);
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.length > 0) {
        setUserGuess(responseData[0].guess);
      }
    }
  } catch (error) {
    console.error('Error fetching user guess:', error);
  }
};

const fetchPlayers = async (matchId, setPlayers) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  };

  try {
    const response = await fetch(url + `/players/match/${matchId}`, fetchOptions);
    if (response.ok) {
      const responseData = await response.json();
      setPlayers(responseData);
    }
  } catch (error) {
    console.error('Error fetching players:', error);
  }
};

// eslint-disable-next-line react/prop-types
const SingleMatch = ({ matchId }) => {
  const [match, setMatch] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [userGuess, setUserGuess] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setUserGuess(null);
    setStatusMessage('');

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
      fetchUserGuess(matchId, setUserGuess);
      fetchPlayers(matchId, setPlayers);
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

  const matchStarted = timeDifference <= 0;

  return (
      <div className="w-2/6 flex flex-col m-3 match-detail-mobile">
        <h1 className="font-myFont text-6xl">Match Details</h1>
        <div className="bg-slate-900 m-auto w-full border mt-5 rounded p-10">
          <p className="p-2 font-myFont text-6xl"><strong></strong>{timeDisplay}</p>
          <p className="p-2 font-myFont text-6xl"><strong>Home: </strong> {match.home_team}</p>
          <p className="p-2 font-myFont text-6xl border-b"><strong>Away: </strong> {match.away_team}</p>
          {userGuess && <p className="p-2 font-myFont text-6xl border-b"><strong>Your Guess: </strong> {userGuess}</p>}
          {matchStarted ? (
              <p className="p-2 font-myFont text-6xl text-red-500">Closed</p>
          ) : (
              <form onSubmit={(e) => handleSubmitGuess(e, matchId, setStatusMessage, setUserGuess)}
                    className="flex flex-col m-auto w-3/4 profile-form">
                <label className="p-2 font-myFont text-6xl">Enter Score:</label>
                <input className="m-2 bg-white rounded text-black p-1 text-center "
                       type="text" id="score" name="guess" pattern="^[0-9]{1,2}-[0-9]{1,2}$"
                       defaultValue={userGuess || ''}
                       required/>
                <label className="p-2 font-myFont text-6xl">Select Scorer:</label>
                <select className="m-2 bg-white rounded text-black p-1 text-center" name="scorer" required>
                  {players.map((player) => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                  ))}
                </select>
                <button className="font-myFont mt-5 text-6xl hover:underline"
                        type="submit">Submit
                </button>
              </form>
          )}
          {statusMessage && <p className="p-2 font-myFont text-6xl text-green-500">{statusMessage}</p>}
        </div>
      </div>
  );
};

export default SingleMatch;
