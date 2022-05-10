import React, { useState, useEffect } from 'react';
import SideBar from './../SideBar';
import './../Dashboard.css';

const Me = () => {

  const [first_name, setUserFName] = useState('');
  const [last_name, setUserLName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [new_password1, setNewPasswordOne] = useState('');
  const [new_password2, setNewPasswordTwo] = useState('');
  const [old_password, setOldPassword]= useState('');

  //update current logged in user's info when submit clicked
  const onSubmitCreds = e => {
    e.preventDefault();

    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email
    };
    fetch('/api/users/auth/user/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(user)
    });
    alert("Successfully updated account details!");
    window.location.replace('/dashboard');
  }

  //update users password, remove token, load logout page
  const onSubmitPass = e => {
    e.preventDefault();

    const passwords = {
      new_password1: new_password1,
      new_password2: new_password2,
      old_password: old_password
    };
    fetch('/api/users/auth/password/change/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(passwords)
    }).then(res => res.json())
      .then(data => {
        if(data.detail==="New password has been saved.")
          {
            console.log("Password successfully changed")
            //log the user out
            fetch('/api/users/auth/logout/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${localStorage.getItem('token')}`
            }
            })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              localStorage.clear();
              alert("Successfully changed password!");
              window.location.replace('/login');
            });
          }
        }
      );
  }

  //on page load, check if user has a token, then get the logged in user's info
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('/login');
    } else {
      fetch('/api/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserFName(data.first_name);
          setUserLName(data.last_name);
          setEmail(data.email);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      <SideBar />
      <div className="dashboard">
        <h1>Account Details</h1>
        <div id="leftCol" className="body">
          {loading === false}
          <h5>Update your credentials:</h5>
          <form onSubmit={onSubmitCreds}>
            <label htmlFor='first_name'>First Name:</label> <br />
              <input
                name='first_name'
                type='text'
                value={first_name}
                onChange={e => setUserFName(e.target.value)}
                required
            />{' '}
            <br />
            <label htmlFor='last_name'>Last Name:</label> <br />
              <input
                name='last_name'
                type='text'
                value={last_name}
                onChange={e => setUserLName(e.target.value)}
                required
            />{' '}
            <br />
            <label htmlFor='email'>Email Address:</label> <br />
            <input
              name='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />{' '}
            <br />
            <input id="btn" type='submit' value='Update' />
          </form>
        </div>
        <div id="rightCol" className="body">
          {loading === false}
          <h5>Change your password:</h5>
          <form onSubmit={onSubmitPass}>
            <label htmlFor='old_password'>Current Password:</label> <br />
            <input
              name='old_password'
              type='password'
              value={old_password}
              onChange={e => setOldPassword(e.target.value)}
              required
            />{' '}
            <br />
            <label htmlFor='new_password1'>New Password:</label> <br />
              <input
                name='new_password1'
                type='password'
                value={new_password1}
                onChange={e => setNewPasswordOne(e.target.value)}
                required
            />{' '}
            <br />
            <label htmlFor='new_password2'>Confirm New Password:</label> <br />
              <input
                name='new_password2'
                type='password'
                value={new_password2}
                onChange={e => setNewPasswordTwo(e.target.value)}
                required
            />{' '}
            <br />
            <input id="btn" type='submit' value='Submit' />
          </form>
        </div>
        <br />
      </div>
    </div>
  );
};
export default Me;