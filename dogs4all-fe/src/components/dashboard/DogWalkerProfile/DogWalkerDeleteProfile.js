import React, { useState, useEffect } from 'react';
import SideBar from './../SideBar';
import './../Dashboard.css';

const DogWalkerDeleteProfile = () => {

	const [username, setUserName] = useState('');
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [createdProfile, setCreatedProfile] = useState(true);
	const [loading, setLoading] = useState(true);
	const [isVerified, setIsVerified] = useState(true);

	//on page load, check if user has a token, if they do, GET logged in user's info
	useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('/login');
    } 
    else {
    	fetch('/api/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }})
  		.then(res => res.json())
	    .then(data => {
	    	setIsVerified(data.account_verified);
	    	setFirstName(data.first_name);
	    	setLastName(data.last_name);
	    	setEmail(data.email);
				setUserName(data.username);
				setCreatedProfile(data.createdDogWalkerProfile);
    		});
  	};
	}, []);	

	//check if account is verified, load dashboard if not
	useEffect(()=>{
		if(!isVerified){
			window.location.replace('/dashboard');
		}
	},[isVerified])

	//check if user has created a dogWalker profile, if not load create profile page
	useEffect(()=>{
		//console.log("created: "+createdProfile);
		if(!createdProfile)
		{
			window.location.replace('/dogWalkerCreateProfile');
		}
		else{
			setLoading(false);
		}
	},[createdProfile])

	//send api request to: set createdDogWalkerProfile to false and delete the user's created dogWalker profile using the user's username
	const deleteProfile = () => {
		//send patch request to set has profile to false
		const user = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			username: username,
			createdDogWalkerProfile: false
		}
		fetch('/api/users/auth/user/', {
	        method: 'PATCH',
	        headers: {
	          'Content-Type': 'application/json',
	          Authorization: `Token ${localStorage.getItem('token')}`,
	        },
	    	body: JSON.stringify(user)
	    });
		fetch('/api/dogWalkers/'+username, {
	        method: 'DELETE',
	        headers: {
	          'Content-Type': 'application/json',
	          Authorization: `Token ${localStorage.getItem('token')}`
	        }
	    });
	    alert("Profile deleted successfully!");
	    window.location.replace('/dashboard');
    }

	return (
	<div>
	{loading===false}
	  <SideBar />
	  <div className="dashboard">
	    <h1>Delete Account</h1>
	    <div id="leftCol" className="body">
	    	<h5>Are you sure you want to delete your profile?</h5>
	    	<input type="button" value="Cancel" className="cancelDelete" onClick={()=>window.location.replace('/dogWalkerEditProfile')}/>
	    	<input type="button" value="Delete Profile" className="confirmDelete" onClick={()=>deleteProfile()}/>
	    </div>
	   </div>
	</div>
	);
};
export default DogWalkerDeleteProfile;