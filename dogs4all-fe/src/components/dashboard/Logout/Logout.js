import React, { useState, useEffect, Fragment } from 'react';
import SideBar from './../SideBar';
import './../Dashboard.css';

const Logout = () => {

  const [loading, setLoading] = useState(true);

  //on page load, check if user has a token
  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      window.location.replace('/login');
    } else {
      setLoading(false);
    }
  }, []);

  //call the api logout endpoint, remove token from user's local storage and load the login page
  const handleLogout = e => {
    e.preventDefault();

    fetch('/api/v1/users/auth/logout/', {
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
        window.location.replace('/login');
      });
  };

  return (
    <div>
    <SideBar />
      <div className="dashboard">
        {loading === false && (
          <Fragment>
            <h1>Logout</h1>
            <div className="body">
              <p>Are you sure you want to logout?</p>
              <input className="logout" type='button' value='Logout' onClick={handleLogout} />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default Logout;