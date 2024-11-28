import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const url = 'http://127.0.0.1:3000/v1';

const handleSubmit = async (event, setError, navigate, setIsLoggedIn) => {
  event.preventDefault();
  const password = event.target.password.value;
  const confirmPassword = event.target.confirmPassword.value;

  if (password !== confirmPassword) {
    setError('Passwords do not match!');
    return;
  }

  event.preventDefault();
  const formdata = new FormData(event.target);
  const data = Object.fromEntries(formdata);
  data.access = "user";

  const fetchOption = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url + '/users/register', fetchOption);
    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
      const { username, token, email, name, id } = responseData;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('id', id);
      setIsLoggedIn(true);
      navigate('/');
    } else if (response.status === 409) {
      setError('Username already exists!');
    }
  } catch (error) {
    console.log(error);
  }
};

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();


  return (
      <div
          className="bg-slate-900 w-1/4 m-auto mt-10 p-5  register-component">
        <h1 className="font-myFont text-6xl text-center">Register</h1>
        <form className="flex flex-col items-center m-auto w-3/4"
              onSubmit={(e) => handleSubmit(e, setError, navigate,
                  setIsLoggedIn)}>
          <input className="form-input" type="text"
                 name="name" placeholder="Enter your name..."/>
          <input className="form-input" type="text"
                 name="username" placeholder="Choose your username"/>
          <input className="form-input" type="password"
                 name="password" placeholder="Enter your password..."/>
          <input className="form-input" type="password"
                 name="confirmPassword" placeholder="Repeat your password..."/>
          <input className="form-input" type="text"
                 name="email" placeholder="Enter your email..."/>
          <button className="form-button mt-5"
                  type="submit">Register
          </button>
          {error &&
              <p className="text-red-600 font-myFont text-3xl p-1">{error}</p>}
        </form>
      </div>
  );
};

export default Register;
