import React, { useState, useEffect, Fragment } from 'react';
import SideBar from './SideBar';
import './Dashboard.css';

const Dashboard = () => {

  const [user_fname,setUserFName] = useState('');
  const [user_lname,setUserLName] = useState('');
  const [createdProfile, setCreatedProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  //check if user has token and is verified
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
          setIsVerified(data.account_verified)
          setCreatedProfile(data.createdDogWalkerProfile);
          setUserFName(data.first_name);
          setUserLName(data.last_name);
        });
    }
  }, []);

  useEffect(()=>{
    setLoading(false);
  },[createdProfile])

  //if account not verified, set the body of the dashboard page to display info for account not verified, else, load normal page
  return (
    <div>
      <SideBar />
      <div className="dashboard">
      {loading === false}
        <h1>My Account</h1>
        <div id="body" className="body">
          <p>
            Hello <b>{user_fname} {user_lname}</b> (not <b>{user_fname} {user_lname}</b>? <a href="/logout">Log out</a>)
          </p>
          {isVerified === true ? (
            <Fragment>
            {createdProfile === false ? (
              <Fragment>
                <p>
                  From your account dashboard you can view your <a href="/dogWalkerCreateProfile">Dog Walker Profile</a>, view your <a href="/dogTrainerProfile">Dog Trainer Profile</a> and <a href="/me">edit your account details</a>.
                </p>
              </Fragment>
              ):(
              <Fragment>
                <p>
                  From your account dashboard you can view your <a href="/dogWalkerEditProfile">Dog Walker Profile</a>, view your <a href="/dogTrainerProfile">Dog Trainer Profile</a> and <a href="/me">edit your account details</a>.
                </p>
              </Fragment>
              )}
              </Fragment>
              ):(
              <p>Your account isn't verified! Verify it <a href='/verify'>here</a></p>)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;