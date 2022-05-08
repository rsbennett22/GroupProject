import React, { useState, useEffect, Fragment } from 'react';
import SideBar from './SideBar';
import './Dashboard.css';

const Dashboard = () => {
  const [user_fname,setUserFName] = useState('');
  const [user_lname,setUserLName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('/login');
    } else {
      fetch('http://127.0.0.1:8000/api/users/auth/user/', {
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
          setLoading(false);
        });
    }
  }, []);

  const loadAccountDetails = () => {
    console.log("clicked account details button");
    var body = document.getElementById("body");
    body.innerText="Account details";
  }

  function loadLogout(){
    console.log("clicked logout button");
    var body = document.getElementById("body");
    body.innerText="Are you sure you want to logout?";
  }
  return (
    <div>
      <SideBar />
      <div className="dashboard">
        <h1>My Account</h1>
        <div id="body" className="body">
          <p>
            Hello <b>{user_fname} {user_lname}</b> (not <b>{user_fname} {user_lname}</b>? <a href="/logout">Log out</a>)
          </p>
          <p>
            From your account dashboard you can view your <a href="/dogWalkerProfile">Dog Walker Profile</a>, view your <a href="/dogTrainerProfile">Dog Trainer Profile</a> and <a href="/me">edit your account details</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;