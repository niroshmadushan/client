import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import img1 from './ConnexIT.png'
import { apilinkmain } from './api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apilinkmain}/login`, { username, password });
      const { token, cnt} = response.data;
      console.log(token,cnt);
      localStorage.setItem('token', token);
      localStorage.setItem('cnt', cnt);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='lg'>
      <hr></hr>
      <img src={img1}></img>
         {error && <div className='err'>{error}</div>}
      <h2>ConnexIT Admin Portal Login</h2>
      
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
       
      </form>
      {/* <a href="/register">Register</a> */}
      <hr></hr>
    </div>
  );
};

export default Login;
