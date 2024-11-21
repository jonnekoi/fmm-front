import {useState} from 'react';

const url = 'http://127.0.0.1:3000/v1';

const ManageLeagues = () => {
  const [isPublic, setIsPublic] = useState('true');
  const [errorMessage, setErrorMessage] = useState('');
  const [addErrorMessage, setAddErrorMessage] = useState('');

  const handleSelectChange = (event) => {
    setIsPublic(event.target.value);
  };

  const hanleAddLeague = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
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
  }


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
      <div className="w-1/6">
        <h1 className="font-myFont text-6xl pb-5">Create League</h1>
        <form onSubmit={hanleAddLeague} className="flex flex-col m-auto w-3/4 border-b pb-10">
          <label>League Name:</label>
          <input className="m-2 bg-white rounded text-black p-1 text-center"
                 type="text" id="name" name="name"
                 required></input>
          <label>Max Players:</label>
          <input className="m-2 bg-white rounded text-black p-1 text-center"
                 type="number" id="maxPlayers" name="maxPlayers" required
                 max="60"></input>
          <label>Public league?</label>
          <select name="isPublic" id="isPublic" className="m-2 bg-white rounded text-black p-1 text-center" onChange={handleSelectChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {isPublic === 'false' && (
              <div>
                <label htmlFor="leagueKey">Select league key:</label>
                <input className="m-2 bg-white rounded text-black p-1 text-center"
                       type="text" id="leagueKey" name="leagueKey"
                       required></input>
              </div>
          )}
          <button
              className="text-5xl text-slate-200 font-myFont hover:underline"
              type="submit">Create League
          </button>
          {addErrorMessage && (
              <p className="p-2 font-myFont text-3xl text-red-500">{addErrorMessage}</p>
          )}
        </form>
        <h1 className="pt-10 font-myFont text-6xl pb-5">Join League</h1>
        <form onSubmit={handleJoinLeague} className="flex flex-col m-auto w-3/4">
          <label>League Code:</label>
          <input className="m-2 bg-white rounded text-black p-1 text-center"
                 type="text" id="leagueCode" name="leagueCode"
                 required></input>
          <button
              className="text-5xl text-slate-200 font-myFont hover:underline"
              type="submit">Join League
          </button>
          {errorMessage && (
              <p className="p-2 font-myFont text-3xl text-red-500">{errorMessage}</p>
          )}
        </form>
      </div>
  );
}

export default ManageLeagues;
