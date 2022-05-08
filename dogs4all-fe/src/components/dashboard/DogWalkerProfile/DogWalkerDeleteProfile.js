import React, { useState, useEffect, setState, Fragment } from 'react';
import { isValid, fix } from 'postcode';
import SideBar from './../SideBar';
import './../Dashboard.css';

const DogWalkerDeleteProfile = () => {
	const [username, setUserName] = useState('');
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [createdProfile, setCreatedProfile] = useState(true);
	const [errors, setErrors] = useState(false);
  	const [loading, setLoading] = useState(true);
  	const [profilePK, setProfilePK] = useState(-1); 

  	useEffect(() => {
	    if (localStorage.getItem('token') === null) {
	      window.location.replace('/login');
	    } 
	    else {
	    	fetch('http://127.0.0.1:8000/api/users/auth/user/', {
		        method: 'GET',
		        headers: {
		          'Content-Type': 'application/json',
		          Authorization: `Token ${localStorage.getItem('token')}`
		        }})
	    		.then(res => res.json())
			    .then(data => {
			    	setCreatedProfile(data.createdDogWalkerProfile);
			    	setFirstName(data.first_name);
			    	setLastName(data.last_name);
			    	setEmail(data.email);
					setUserName(data.username);
        		});
        		setLoading(false);
    		};
	}, []);	

  	useEffect(()=>{
  		console.log("created: "+createdProfile);
  		if(!createdProfile)
  		{
  			window.location.replace('/dogWalkerCreateProfile');
  		}
  	},[createdProfile])

	const deleteProfile = () => {
		//send patch request to set has profile to false
		const user = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			username: username,
			createdDogWalkerProfile: false
		}
		fetch('http://127.0.0.1:8000/api/users/auth/user/', {
	        method: 'PATCH',
	        headers: {
	          'Content-Type': 'application/json',
	          Authorization: `Token ${localStorage.getItem('token')}`,
	        },
	    	body: JSON.stringify(user)
	    });
		fetch('http://127.0.0.1:8000/api/dogWalkers/'+username, {
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