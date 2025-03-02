import React, { useState, useEffect } from 'react';

const url = 'http://127.0.0.1:3000/v1';

const fetchTeams = async (setTeams) => {
  try {
    const response = await fetch(url + '/teams');
    const responseData = await response.json();
    setTeams(responseData);
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};

const fetchLeagueNames = async (setLeagueNames) => {
  try {
    const response = await fetch (url + '/leaguename');
    const responseData = await response.json();
    setLeagueNames(responseData);
  } catch (error) {
    console.error('Error getting league names', error);
  }
}

const handleAddMatch = async (event) => {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const data = Object.fromEntries(formdata);
  console.log(data);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url + '/matches', fetchOptions);
    console.log(response);
    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
      //location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

const AddMatch = () => {
  const [teams, setTeams] = useState([]);
  const [leagueNames, setLeagueNames] = useState([]);

  useEffect(() => {
    fetchTeams(setTeams);
    fetchLeagueNames(setLeagueNames);
  }, []);

  return (
      <div className="w-2/6 flex flex-col m-3 add-match-mobile">
        <h1 className="font-myFont text-6xl">Add Match</h1>
        <div className="bg-slate-900 m-auto w-full mt-5 p-5 rounded">
          <form onSubmit={handleAddMatch} className="flex flex-col m-auto w-3/4">
            <label className="font-myFont text-4xl" htmlFor="homeTeam">Home Team</label>
            <select className="m-2 bg-white rounded text-black p-1 text-center" name="home_team">
              {teams.map((team) => (
                  <option key={team.id} value={team.id}>{team.team_name}</option>
              ))}
            </select>
            <label className="font-myFont text-4xl" htmlFor="awayTeam">Away Team</label>
            <select className="m-2 bg-white rounded text-black p-1 text-center" name="away_team">
              {teams.map((team) => (
                  <option key={team.id} value={team.id}>{team.team_name}</option>
              ))}
            </select>
            <label className="font-myFont text-4xl" htmlFor="date">Day and time</label>
            <input className="m-2 bg-white rounded text-black p-1 text-center" type="datetime-local" name="matchday" />
            <label className="font-myFont text-4xl" htmlFor="league_name">League</label>
            <select className="m-2 bg-white rounded text-black p-1 text-center" name="league_name">
              {leagueNames.map((league) => (
                  <option key={league.id} value={league.id}>{league.league_name}</option>
              ))}
            </select>
            <button className="font-myFont mt-10 text-4xl hover:underline"
                    type="submit">Add Match
            </button>
          </form>
        </div>
      </div>
  );
};

export default AddMatch;
