import React, { useEffect, useState, Fragment } from 'react';
import './Dashboard.css';

const SideBar = () => {

	const [createdProfile, setCreatedProfile] = useState(false);
	const [isVerifed, setIsVerified] = useState(false);

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
          setCreatedProfile(data.createdDogWalkerProfile);
          setIsVerified(data.account_verified);
        });
        //console.log(createdProfile);
    }
  }, []);

	const setCurrentActive = (id) => {
		var element = document.getElementById(id);
		element.className="menuDiv_active";
	}

	return (
		<div>
			{isVerifed === true ?(
				<Fragment>
				{createdProfile === false ? (
				<Fragment>
				    <div className="dashboard">
				      <div className="sidebar">
				        <h5>
				          <a href="/dashboard" className="link">
				            <div id="menu_dashboard">
				            	Dashboard
				            </div>
				          </a>
				        </h5>
				        <hr></hr>
				        <h6>
				          <a href="/me" className="link">
				            <div id="me" className="menuDiv">
				              Account Details
				            </div>
				          </a>
				        </h6>
				        <hr></hr>
				        <h6>
				          <a href="/dogWalkerCreateProfile" className="link">
				            <div id="dogWalkerProfile" className="menuDiv">
				              Dog Walker Profile
				            </div>
				          </a>
				        </h6>
				        <hr></hr>
				        <h6>
				          <a href="#" className="link">
				            <div id="dogTrainerProfile" className="menuDiv">
				              Dog Trainer Profile
				            </div>
				          </a>
				        </h6>
				        <hr></hr>
				        <h6>
				          <a href="/logout" className="link">
				            <div id="logout" className="menuDiv">
				              Logout
				            </div>
				          </a>
				        </h6>
				      </div> 
				     </div>
			     </Fragment>
			     ):(
			     <Fragment>
			     	<div className="dashboard">
				      <div className="sidebar">
				        <h5>
				          <a href="/dashboard" className="link">
				            <div id="menu_dashboard">
				            	Dashboard
				            </div>
				          </a>
				        </h5>
				        <hr></hr>
				        <h6>
				          <a href="/me" className="link">
				            <div id="me" className="menuDiv">
				              Account Details
				            </div>
				          </a>
				        </h6>
				        <hr></hr>
				        <h6>
				          <a href="/dogWalkerEditProfile" className="link">
				            <div id="dogWalkerProfile" className="menuDiv">
				              Dog Walker Profile
				            </div>
				          </a>
				        </h6>
				        <hr></hr>
				        <h6>
				          <a href="#" className="link">
				            <div id="dogTrainerProfile" className="menuDiv">
				              Dog Trainer Profile
				            </div>
				          </a>
				        </h6>
				        <hr></hr>
				        <h6>
				          <a href="/logout" className="link">
				            <div id="logout" className="menuDiv">
				              Logout
				            </div>
				          </a>
				        </h6>
				      </div> 
				     </div>
			     </Fragment>
			     )}
			     </Fragment>
			    ):(
			    	<Fragment>
				    <div className="dashboard">
				      <div className="sidebar">
				        <h5>
				          <a href="/dashboard" className="link">
				            <div id="menu_dashboard">
				            	Dashboard
				            </div>
				          </a>
				        </h5>
				        <hr></hr>
				        <h6>
				          <a href="/me" className="link">
				            <div id="me" className="menuDiv">
				              Account Details
				            </div>
				          </a>
				        </h6>
				         <hr></hr>
				        <h6>
				          <a href="/verify" className="link">
				            <div id="verify" className="menuDiv">
				              Verify Account
				            </div>
				          </a>
				        </h6>
				        <hr></hr>
				        <h6>
				          <a href="/logout" className="link">
				            <div id="logout" className="menuDiv">
				              Logout
				            </div>
				          </a>
				        </h6>
				      </div> 
				     </div>
			     </Fragment>
			    )}
	     </div>
  );
}
export default SideBar;