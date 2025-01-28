import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';

const url = 'http://127.0.0.1:3000/v1';

// When User selects a match from his leagues matches, this component will show the details of that match

const SingleMatchPage = () => {
  const {id: matchId} = useParams();
  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState(null);
  const [userGuess, setUserGuess] = useState(null);
  const [scorerGuess, setScorerGuess] = useState(null);

  const getMatch = async (matchId) => {
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

  const getPlayers = async (matchId) => {
    try {
      const response = await fetch(url + `/players/match/${matchId}`);
      const responseData = await response.json();
      setPlayers(responseData);
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  }

  const placePick = async (event) => {
    event.preventDefault();
    const matchNUM = matchId;
    const formData = new FormData(event.target);
    formData.append("match_id", matchNUM);
    const data = Object.fromEntries(formData);
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
        console.log("error")
      } else if (response.ok) {
        console.log("ok")
      }
    } catch (error) {
      console.error('Error submitting guess:', error);
    }
  }

  const getUserGuess = async () => {
    const fetchOptions = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    try {
      const response = await fetch(url + `/matches/guess/score/${matchId}`, fetchOptions);
      const guess = await response.json()
      if (response.ok) {
        const guessinNumbers = guess[0].home_score_guess + " - " + guess[0].away_score_guess;
        const scorerGuess = guess[0].scorer;
        setUserGuess(guessinNumbers);
        setScorerGuess(scorerGuess);
      }
    } catch (error) {
      console.error("Error fetching guess", error)
    }
  }

  useEffect(() => {
    getMatch(matchId);
    getPlayers(matchId);
    getUserGuess(matchId)
  }, [matchId]);

  return (
      <div className="bg-slate-900 single-match m-5 w-1/2 leagues-mobile">
        {match && players && (
            <div>
              <h1 className="poppins-font font-bold pt-8 text-2xl">{match.home_team} - {match.away_team}</h1>
              <p className="poppins-font m-1">{format(new Date (match.matchday), 'dd/MM/yyyy HH:mm')}</p>
              <p className="poppins-font text-2xl m-1">{match.home_score ? match.home_score : 0} - {match.away_score ? match.away_score : 0}</p>
              <form className="grid" onSubmit={placePick}>
                <div className="flex justify-center flex-col">
                  {userGuess && scorerGuess && (
                      <div>
                      <p className="poppins-font font-bold m-3">Current Score Guess: {userGuess}</p>
                      <p className="poppins-font font-bold m-3">Current Scorer Guess: {scorerGuess}</p>
                      </div>
                  )}
                  <label className="poppins-font m-3">Home Score</label>
                  <input
                      className="m-auto w-1/6 p-0.5 bg-white rounded text-black text-center select-score-input"
                      name="home_score" type="number" min="0" max="20"
                      defaultValue="0"/>
                  <label className="poppins-font m-3">Away Score</label>
                  <input
                      className="m-auto w-1/6 p-0.5 bg-white rounded text-black text-center select-score-input"
                      name="away_score" type="number" min="0" max="20"
                      defaultValue="0"/>
                </div>
                <label className="poppins-font m-3">Select goalscorer</label>
                <select
                    className="m-auto mb-9 w-2/6 bg-white rounded text-black p-1 text-center select-goal-scorer-input"
                    name="scorer" defaultValue="default">
                  <option value="default">Select one</option>
                  {players.map((player) => (
                      <option key={player.id}
                              value={player.id}>{player.name}</option>
                  ))}
                </select>
                <button type="submit" className="m-auto mb-5 w-1/2 submit-pick-button">Submit Pick</button>
              </form>
            </div>
        )}
      </div>
  );
};
export default SingleMatchPage;
