import { useState } from 'react';

const url = 'http://127.0.0.1:3000/v1';

const ManageLeagues = () => {
  const [isPublic, setIsPublic] = useState('true');
  const [errorMessage, setErrorMessage] = useState('');
  const [addErrorMessage, setAddErrorMessage] = useState('');
  const [showCreateLeague, setShowCreateLeague] = useState(false);
  const [showJoinLeague, setShowJoinLeague] = useState(true); // Default to show Join League

  const handleSelectChange = (event) => {
    setIsPublic(event.target.value);
  };

  const handleAddLeague = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    console.log(data);
    if (data.isPublic === 'true') {
      delete data.leagueKey;
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url + '/leagues', fetchOptions);
      if (response.status === 409) {
        setAddErrorMessage('Name or key already exist');
      } else if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinLeague = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    const code = data.leagueCode;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    try {
      const response = await fetch(url + `/leagues/${code}`, fetchOptions);
      if (response.status === 409) {
        setErrorMessage('Already in this league');
      } else if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="m-5 w-1/3 manage-leagues-mobile">
        {/* Toggle visibility of Join League form */}
        <h1
            className="font-myFont text-6xl pb-5 cursor-pointer"
            onClick={() => {
              setShowJoinLeague(true);
              setShowCreateLeague(false); // Close Create League when Join League is opened
            }}
        >
          Join League
        </h1>
        {showJoinLeague && (
            <form
                onSubmit={handleJoinLeague}
                className="flex bg-slate-900 border p-5 flex-col m-auto w-3/4"
            >
              <label>League Code:</label>
              <input
                  className="m-2 bg-white rounded text-black p-1 text-center"
                  type="text"
                  id="leagueCode"
                  name="leagueCode"
                  required
              />
              <button
                  className="text-5xl text-slate-200 font-myFont hover:underline"
                  type="submit"
              >
                Join League
              </button>
              {errorMessage && (
                  <p className="p-2 font-myFont text-3xl text-red-500">
                    {errorMessage}
                  </p>
              )}
            </form>
        )}

        {/* Toggle visibility of Create League form */}
        <h1
            className="pt-10 font-myFont text-6xl pb-5 cursor-pointer"
            onClick={() => {
              setShowCreateLeague(true);
              setShowJoinLeague(false); // Close Join League when Create League is opened
            }}
        >
          Create League
        </h1>
        {showCreateLeague && (
            <form
                onSubmit={handleAddLeague}
                className="flex bg-slate-900 border flex-col w-3/4 m-auto pb-10 p-5"
            >
              <label>League Name:</label>
              <input
                  className="m-2 bg-white rounded text-black p-1 text-center"
                  type="text"
                  id="name"
                  name="name"
                  required
              />
              <label>Max Players:</label>
              <input
                  className="m-2 bg-white rounded text-black p-1 text-center"
                  type="number"
                  id="maxPlayers"
                  name="maxPlayers"
                  required
                  max="60"
              />
              <label>League Duration</label>
              <select
                  name="duration"
                  id="duration"
                  className="m-2 bg-white rounded text-black p-1 text-center"
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="120">120 days</option>
                <option value="365">365 days</option>
              </select>
              <label>Public league?</label>
              <select
                  name="isPublic"
                  id="isPublic"
                  className="m-2 bg-white rounded text-black p-1 text-center"
                  onChange={handleSelectChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {isPublic === 'false' && (
                  <div>
                    <label htmlFor="leagueKey">Select league key:</label>
                    <input
                        className="m-2 bg-white rounded text-black p-1 text-center"
                        type="text"
                        id="leagueKey"
                        name="leagueKey"
                        required
                    />
                  </div>
              )}
              <label>Description</label>
              <textarea
                  name="desci"
                  className="m-2 bg-white rounded text-black p-1 text-center"
              ></textarea>
              <button
                  className="text-5xl text-slate-200 font-myFont hover:underline"
                  type="submit"
              >
                Create League
              </button>
              {addErrorMessage && (
                  <p className="p-2 font-myFont text-3xl text-red-500">
                    {addErrorMessage}
                  </p>
              )}
            </form>
        )}
      </div>
  );
};

export default ManageLeagues;
