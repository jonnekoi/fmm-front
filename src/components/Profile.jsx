import React, {useEffect, useState} from 'react';

const url = 'http://127.0.0.1:3000/v1';

const submitChanges = async (event) => {
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
    const responseData = await response.json();
    if (response.status === 200) {
      sessionStorage.setItem('name', data.name);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('email', data.email);
    } else {
      console.log(responseData);
    }
  } catch (error) {
    console.log(error);

  }
}


const Profile = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const currentName = sessionStorage.getItem('name');
    const currentUsername = sessionStorage.getItem('username');
    const currentEmail = sessionStorage.getItem('email');
    setName(currentName);
    setUsername(currentUsername);
    setEmail(currentEmail);
  }, []);


  return (
      <div className="bg-slate-900 w-1/5 m-auto mt-10 p-5 rounded border">
        <h1 className="font-myFont text-6xl">Account</h1>
        <form onSubmit={submitChanges} className="flex flex-col m-auto w-3/4">
          <label className="font-myFont text-3xl" >Change name</label>
          <input className="m-2 bg-white rounded text-black" type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)}/>
          <label className="font-myFont text-3xl">Change username</label>
          <input className="m-2 bg-white rounded text-black" type="text" name="username" value={username} onChange={(e)=> setUsername((e.target.value))}/>
          <label className="font-myFont text-3xl">Change email</label>
          <input className="m-2 bg-white rounded text-black" type="text" name="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
          <button className="font-myFont text-5xl hover:underline" type="submit">Save changes</button>
        </form>
      </div>
  );
};


export default Profile;
