import React from 'react';

const url = 'http://127.0.0.1:3000/v1';

const handleAddTeam = async (event) => {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const data = Object.fromEntries(formdata);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url + '/teams', fetchOptions);
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

const AddTeam = () => {
  return (
      <div className="w-2/6 flex flex-col m-3 add-team-mobile">
        <h1 className="font-myFont text-6xl">Add Team</h1>
        <div className="bg-slate-900 m-auto w-full border mt-5 p-5 rounded">
          <form onSubmit={handleAddTeam} className="flex flex-col m-auto w-3/4">
            <label className="font-myFont text-4xl" htmlFor="teamName">Team Name</label>
            <input className="m-2 bg-white rounded text-black p-1 text-center" type="text" name="name" required />
            <button className="font-myFont mt-10 text-4xl hover:underline" type="submit">Add Team</button>
          </form>
        </div>
      </div>
  );
};

export default AddTeam;
