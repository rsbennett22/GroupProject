import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  //check if user has a token in local storage, load dashboard if they do
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('/dashboard');
    } else {
      //if not, load page elements
      setLoading(false);
    }
  }, []);

  //when user submits login form, check email and password against db to see if credentials match
  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    fetch('/api/users/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        //give use a token
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          window.location.replace('/dashboard');
        } else {
          setEmail('');
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      {loading === false && <h1>Login</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <div className="loginForm">
          <form onSubmit={onSubmit}>
            <label htmlFor='email'>Email address:</label> <br />
            <input
              name='email'
              type='email'
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />{' '}
            <br />
            <label htmlFor='password'>Password:</label> <br />
            <input
              name='password'
              type='password'
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />{' '}
            <br />
            <br />
            <input type='submit' value='Login' className="loginButtonLogin" />
            <br />
            <p className="signupPrompt">Don't have an account? <a href='/signup'>Signup</a></p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
