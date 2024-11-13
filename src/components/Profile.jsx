import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


const url = 'http://127.0.0.1:3000/v1';

const submitChanges = async (event, setError) => {
  event.preventDefault();
  const id = sessionStorage.getItem('id');
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url + `/users/${id}`, fetchOptions)
    if (response.status === 200) {
      await sessionStorage.setItem('name', data.name);
      await sessionStorage.setItem('username', data.username);
      await sessionStorage.setItem('email', data.email);
      location.reload();
    } else if (response.status === 409) {
      setError('Username is not available!');
    }
  } catch (error) {
    console.log(error);

  }
}


const Profile = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentName = sessionStorage.getItem('name');
    const currentUsername = sessionStorage.getItem('username');
    const currentEmail = sessionStorage.getItem('email');
    setName(currentName);
    setUsername(currentUsername);
    setEmail(currentEmail);
  }, []);

  const goBack = () => {
    navigate('/');
  }


  return (
      <div className="bg-slate-900 w-1/5 m-auto mt-10 p-5 rounded border profile-mobile">
        <h1 className="font-myFont text-6xl">Account</h1>
        <form onSubmit={(e) => submitChanges(e, setError)} className="flex flex-col m-auto w-3/4 profile-form">
          <label className="font-myFont text-3xl">Change name</label>
          <input className="m-2 bg-white rounded text-black" type="text"
                 name="name" value={name}
                 onChange={(e) => setName(e.target.value)}/>
          <label className="font-myFont text-3xl">Change username</label>
          <input className="m-2 bg-white rounded text-black" type="text"
                 name="username" value={username}
                 onChange={(e) => setUsername((e.target.value))}/>
          <label className="font-myFont text-3xl">Change email</label>
          <input className="m-2 bg-white rounded text-black" type="text"
                 name="email" value={email}
                 onChange={(e) => setEmail(e.target.value)}/>
          {error && <p className="text-red-600 font-myFont text-3xl p-1">{error}</p>}
          <button className="font-myFont text-5xl hover:underline"
                  type="submit">Save changes
          </button>
        </form>
        <button onClick={goBack} className="font-myFont text-5xl m-2 hover:underline" type="button">Return
        </button>
      </div>
  );
};

export default Profile;
