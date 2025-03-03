import {useEffect, useState} from 'react';
import profilepic from '../../assets/profilepic.png';

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


const ProfileComponent = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');


  // SESSIONSTORAGE FOR USERNAME, NAME, EMAIL FOR DEVELOPMENT PURPOSES
  useEffect(() => {
    const currentName = sessionStorage.getItem('name');
    const currentUsername = sessionStorage.getItem('username');
    const currentEmail = sessionStorage.getItem('email');
    setName(currentName);
    setUsername(currentUsername);
    setEmail(currentEmail);
  }, []);



  return (
      <div className="bg-slate-900 w-1/4 m-7 p-5 profile-mobile profile-component">
        <h1 className="font-myFont text-6xl mb-10">Account</h1>
        <img src={profilepic} alt="profilepic" className="md:w-40 md:h-40 m-auto profile-pic-mobile"/>
        <form onSubmit={(e) => submitChanges(e, setError)}
              className="bg-slate-900 w-full m-auto mt-5 rounded flex flex-col items-center">
          <label className="poppins-font text-2xl">Change name</label>
          <input className="form-input" type="text"
                 name="name" value={name}
                 onChange={(e) => setName(e.target.value)}/>
          <label className="poppins-font text-2xl">Change username</label>
          <input className="form-input" type="text"
                 name="username" value={username}
                 onChange={(e) => setUsername((e.target.value))}/>
          <label className="poppins-font text-2xl">Change email</label>
          <input className="form-input" type="text"
                 name="email" value={email}
                 onChange={(e) => setEmail(e.target.value)}/>
          {error && <p className="text-red-600 font-myFont text-3xl p-1">{error}</p>}
          <button className="button m-2"
                  type="submit">Save changes
          </button>
        </form>
      </div>
  );
};

export default ProfileComponent;
