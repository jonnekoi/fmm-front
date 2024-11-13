import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const url = 'http://127.0.0.1:3000/v1';


const handleLogin = async (event, setError, navigate, setIsLoggedIn) => {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const data = Object.fromEntries(formdata);

  const fetchOption = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url + '/auth/login', fetchOption);
    const responseData = await response.json();
    if (response.ok) {
      const user = responseData.user;
      const username = user.username;
      const email = user.email;
      const name = user.name;
      const id = user.id;
      const token = responseData.token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('id', id);
      setIsLoggedIn(true);
      navigate('/');
    } else if (response.status === 401) {
      setError('Invalid username or password');
    }
  } catch (error) {
    console.log(error);
  }
}


const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();


  const goBack = () => {
    navigate('/');
  }

  return (
      <div className="bg-slate-900 w-1/5 m-auto border mt-10 p-5 rounded">
        <form className="flex flex-col m-auto w-3/4" onSubmit={(e) => handleLogin(e, setError, navigate, setIsLoggedIn)}>
          <label className="font-myFont text-3xl">Username</label>
          <input className="m-2 bg-white rounded text-black" type="text" name="username"/>
          <label className="font-myFont text-3xl">Password</label>
          <input className="m-2 bg-white rounded text-black" type="password" name="password"/>
          <button className="font-myFont text-5xl hover:underline" type="submit">Login</button>{error &&
        <p className="text-red-600 font-myFont text-3xl p-1">{error}</p>}
        </form>
          <button onClick={goBack} className="font-myFont text-5xl m-2 hover:underline" type="button">Return</button>
      </div>
  );
};

export default Login;
