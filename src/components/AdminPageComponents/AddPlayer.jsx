import React, { useEffect, useState } from 'react';

const url = 'http://127.0.0.1:3000/v1';

const handleAddPlayer = async (event) => {
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
    const response = await fetch(url + '/players', fetchOptions);
    console.log(response);
    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

const AddPlayer = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };

      try {
        const response = await fetch(url + '/teams', fetchOptions);
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setTeams(responseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeams();
  }, []);

  return (
      <div className="w-2/6 flex flex-col m-3 add-player-mobile">
        <h1 className="font-myFont text-6xl">Add Player</h1>
        <div className="bg-slate-900 m-auto w-full mt-5 p-5 rounded">
          <form onSubmit={handleAddPlayer} className="flex flex-col m-auto w-3/4">
            <label className="font-myFont text-4xl" htmlFor="playerName">Player name</label>
            <input className="m-2 bg-white rounded text-black p-1 text-center" type="text" name="name" required />
            <label className="font-myFont text-4xl" htmlFor="team">Team</label>
            <select className="m-2 bg-white rounded text-black p-1 text-center" name="team_id" required>
              {teams.map((team) => (
                  <option key={team.id} value={team.id}>{team.team_name}</option>
              ))}
            </select>
            <button className="font-myFont mt-10 text-4xl hover:underline" type="submit">Add Player</button>
          </form>
        </div>
      </div>
  );
};

export default AddPlayer;
