import React, { useState, useEffect } from 'react';
import './Signup.css';

const Signup = () => {

  const [first_name, setFName] = useState('');
  const [last_name, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  //check if user has token, if they do, load the dashboard
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  //when user clicks submit button, send required info to db via api to create a new user
  const onSubmit = e => {
    e.preventDefault();

    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password1: password1,
      password2: password2
    };

    fetch('/api/users/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        //give user a key once signed up
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          window.location.replace('/dashboard');
        } else {
          setFName('');
          setLName('');
          setEmail('');
          setPassword1('');
          setPassword2('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      {loading === false && <h1>Signup</h1>}
      {errors === true && <h2>Cannot signup with provided credentials</h2>}
      <div className="signupForm">
        <form onSubmit={onSubmit}>
          <label htmlFor='first_name'>First Name:</label> <br />
            <input
              name='first_name'
              type='text'
              value={first_name}
              onChange={e => setFName(e.target.value)}
              required
          />{' '}
          <br />
          <label htmlFor='last_name'>Last Name:</label> <br />
            <input
              name='last_name'
              type='text'
              value={last_name}
              onChange={e => setLName(e.target.value)}
              required
          />{' '}
          <br />
          <label htmlFor='email'>Email address:</label> <br />
          <input
            name='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />{' '}
          <br />
          <label htmlFor='password1'>Password:</label> <br />
          <input
            name='password1'
            type='password'
            value={password1}
            onChange={e => setPassword1(e.target.value)}
            required
          />{' '}
          <br />
          <label htmlFor='password2'>Confirm password:</label> <br />
          <input
            name='password2'
            type='password'
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
          />{' '}
          <br /><br />
          <input type='submit' value='Signup' className="signupButtonSignup" />
          <p className='loginPrompt'>Already have an account? <a href='/login'>Login</a></p>
          <br /><br />
        </form>
      </div>
    </div>
  );
};

export default Signup;
