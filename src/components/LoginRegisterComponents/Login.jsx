import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

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
      if (user) {
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
        if (user.access === "admin") {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('User data is missing in the response');
      }
    } else if (response.status === 401) {
      setError('Invalid username or password');
    } else {
      setError('An error occurred during login');
    }
  } catch (error) {
    console.log(error);
    setError('An error occurred during login');
  }
}


const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();


  return (
      <div className="m-10">
        <div className="bg-slate-900 w-1/4 m-auto p-5 rounded login-component">
          <h1 className="font-myFont text-6xl text-center">Login</h1>
          <form className="flex flex-col items-center m-auto w-3/4" onSubmit={(e) => handleLogin(e, setError, navigate, setIsLoggedIn)}>
            <input className="form-input" type="text" name="username" placeholder="Enter your username..."/>
            <input className="form-input" type="password" name="password" placeholder="Enter your password..."/>
            <button className="form-button mt-5" type="submit">Login</button>{error &&
          <p className="text-red-600 font-myFont text-3xl p-1">{error}</p>}
          </form>
        </div>
      </div>
  );
};

export default Login;
