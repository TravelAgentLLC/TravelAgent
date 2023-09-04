import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  async function handleClick() {
    console.log('weClicked');
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    window.localStorage.setItem('user_id', data);
    navigate('/');
  }
  function handleUserChange(e) {
    setUsername(e.target.value);
    console.log(username);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div>
      <div className='login-form'>
        <h1 className='login-header'>LOGIN</h1>
        <input
          name='username'
          type='text'
          placeholder='username'
          onChange={handleUserChange}
          className='input-field'></input>
        <br />
        <input
          name='password'
          type='text'
          placeholder='password'
          onChange={handlePasswordChange}
          className='input-field'></input>
        <br />
        <button onClick={handleClick} className='login-button'>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
