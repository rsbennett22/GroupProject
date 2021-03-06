import React, { useState, useEffect, Fragment } from 'react';
import { isValid, fix } from 'postcode';
import SideBar from './../SideBar';
import './../Dashboard.css';

const DogWalkerEditProfile = () => {

	const [createdProfile, setCreatedProfile] = useState(true);
	const [username, setUserName] = useState('');
	const uploadedImage = React.useRef(null);
	const imageUploader = React.useRef(null);
	const [email, setEmail] = useState('');
	const [postcode, setPostcode] = useState('');
	const [price, setPrice] = useState('');
	const [userInfo, setUserInfo] = useState('');
	const [minWeight, setMinWeight] = useState('');
	const [maxWeight, setMaxWeight] = useState('');
  	const [loading, setLoading] = useState(true);
  	const [fullName, setUserFullName] = useState('');
  	const [isAvailable, setIsAvailable] = useState(false);
  	const [acptPup, setAcptPup] = useState(false);
  	const [profilePK, setProfilePK] = useState(-1);
  	const [isVerified, setIsVerified] = useState(true);
  	const [avblFrom, setAvblFrom] = useState('');
  	const [avblTo, setAvblTo] = useState('');
  	const [minDate, setMinDate] = useState('');

  	//on page load, check if user has a token, then get the user's info
  	useEffect(() => {
	    if (localStorage.getItem('token') === null) {
	      window.location.replace('/login');
	    } 
	    else {
	    	fetch('/api/v1/users/auth/user/', {
		        method: 'GET',
		        headers: {
		          'Content-Type': 'application/json',
		          Authorization: `Token ${localStorage.getItem('token')}`
		        }})
	    		.then(res => res.json())
			    .then(data => {
			    	setIsVerified(data.account_verified);
			    	setCreatedProfile(data.createdDogWalkerProfile);
			    	setEmail(data.email);
					setUserName(data.username);
        		});
    		};
	}, []);	

  	//check if user is verified, load dashboard page if not
  	useEffect(()=>{
  		if(!isVerified){
  			window.location.replace('/dashboard');
  		}
  	},[isVerified])

  	//check if user has created a dogWalker profile, load profile info, if not load create dogWalker page
  	useEffect(()=>{
  		if(!createdProfile){
  			window.location.replace('/dogWalkerCreateProfile');
  		}
  		else{
  			//if has created a profile, get dogWalker profile info using the user's username with api endpoint
  			fetch('/api/v1/dogWalker/'+username, {
	        method: 'GET',
	        headers: {
	          'Content-Type': 'application/json',
	          Authorization: `Token ${localStorage.getItem('token')}`
	        }
	      }).then(res => res.json())
	        .then(profileData => {
	        	setUserFullName(profileData.name);
	        	setEmail(profileData.email);
	        	setPostcode(profileData.postcode);
	        	setPrice(profileData.price);
	        	setUserInfo(profileData.usr_info);
	        	setIsAvailable(profileData.is_available);
	        	setMinWeight(profileData.min_weight);
	        	setMaxWeight(profileData.max_weight);
	        	setAcptPup(profileData.acpt_pup);
	        	setProfilePK(profileData.pk);
	        	setAvblFrom(profileData.avbl_from);
	        	setAvblTo(profileData.avbl_to);
	        	setMinDate(profileData.avbl_from);
	        });

	  		setLoading(false);
	  	}
  	},[username, createdProfile])

  	//doesn't work - does set the image correctly but doesn't work with api requests
  	const handleImageUpload = e => {
  		var imageDiv = document.getElementById('userImage').children;
  		const [file] = e.target.files;
  		if(file) {
  			const reader = new FileReader();
  			const { current } = uploadedImage;
  			current.file = file;
  			if(current.file.size<500000){
  				imageDiv[4].innerText='';
	  			reader.onload = e => {
	  				current.src = e.target.result;
	  			};
	  			reader.readAsDataURL(file);
	  		}
	  		else{
	  			console.log("file too big");
	  			//console.log(imageDiv);
	  			imageDiv[4].innerText = "Error! Image must be less than 500kb";
	  		}
  		}
  	};

  	//when user modifies postcode field, correct the formatting with fix() and remove any previous errors
  	const postCodeChange = e => {
  		setPostcode(fix(e.target.value));
  		resetPostcodeError();
  	}

  	//hides any errors from postcode input
  	const resetPostcodeError = () => {
  		var postCodeField = document.getElementById('dogWalkerCreateForm').elements[3];
  		postCodeField.id = "postcode"
  	};

  	//check values of fields in form, send the data to backend via api endpoint to update the user's dogWalker profile
  	const editDogWalkerProfile = e => {
  		e.preventDefault();

  		//validate inputs
  		var isAvailable = false;
  		var acptPup = false;
  		var postCodeField = document.getElementById('dogWalkerEditForm').elements[3];
  		var isAvailableBtn = document.getElementById('dogWalkerEditForm').elements[6];
  		var acptPupBtn = document.getElementById('dogWalkerEditForm').elements[9];
  		if(isAvailableBtn.checked)
  		{
  			//console.log("Has availability");
  			isAvailable = true;
  		}
  		else{
  			//console.log("No availability");
  			isAvailable = false;
  		}
  		if(acptPupBtn.checked)
  		{
  			//console.log("Accepts puppies");
  			acptPup = true;
  		}
  		else {
  			//console.log("Doesn't accept puppies");
  			acptPup = false;
  		}
  		if(!isValid(postcode))
  		{
  			postCodeField.id = "postcodeInvalid";
  			//return console.log("Invalid postcode");
  		}
  		else {
  			postCodeField.id = "postcode";
  		}
  		//If passes validation checks, edit dogWalker profile and post
  		const user = {
  			username: username,
  			name: fullName,
  			email: email,
  			postcode: postcode,
  			price: price,
  			usr_info: userInfo,
  			is_available: isAvailable,
  			avbl_from: avblFrom,
  			avbl_to: avblTo,
  			min_weight: minWeight,
  			max_weight: maxWeight,
  			acpt_pup: acptPup,
  			usr_img: handleImageUpload,
  		};
  		fetch('/api/v1/dogWalker/'+username, {
  			method: 'PUT',
  			headers: {
        		'Content-Type': 'application/json',
        		Authorization: `Token ${localStorage.getItem('token')}`
      		},
  			body: JSON.stringify(user)
  		}).catch(err =>{
  			console.log(err);
  		});
  		alert("Profile updated successfully!");
  		window.location.replace('/dashboard');
	}  

	//once page is loaded, depending on value of isAvailable, set whether checkbox is checked or not
	const setIsAvblCheckbox = () => {
		try{
  			var isAvailableBtn = document.getElementById('dogWalkerEditForm').elements[6];
  			//set checked value
  			if(isAvailable === true){
  				isAvailableBtn.checked=true;
  			}
  			else{
  				isAvailableBtn.checked=false;
  			}
  		}
  		catch(err){
  			//console.log("undefined");
  		}
	}
	
	//once page is loaded, depending on value of acptPup, set whether checkbox is checked or not
	const setAcptPupCheckbox = () => {
		try{
  			var acptPupBtn = document.getElementById('dogWalkerEditForm').elements[9];
  			//set checked value
  			if(acptPup === true){
  				acptPupBtn.checked=true;
  			}
  			else{
  				acptPupBtn.checked=false;
  			}
  		}
  		catch(err){
  			//console.log("undefined");
  		}
	}

	return (
	<div>
	  <SideBar />
	  <div className="dashboard">
	    <h1>Account Details</h1>
	    {!loading ?(
	    <Fragment>
	    <div id="leftCol" className="body">
	      <h5>Edit Your Profile</h5>{isAvailable}
	      <form id="dogWalkerEditForm" onSubmit={editDogWalkerProfile}>
	      	<div className="userImage" id="userImage">
	      		<label htmlFor='profile_picture'>Profile Picture:</label> <br />
		      	<img alt="" ref={uploadedImage}/>
	          	<input
		            name='profile_picture'
		            type='file'
		            accept="image/jpeg, image/png"
		            onChange={handleImageUpload}
		            ref={imageUploader}
		            alt="Profile picture"
		            required
		        />{' '}
		        <p name="errorMessage"></p>
		        {imageUploader.name}
		        <br />
		    </div>
		    <div className="dogWalkerForm">
		        <label htmlFor='name'>Name:</label> <br />
		          <input
		            name='name'
		            type='text'
		            value={fullName}
		            onChange={e => setUserFullName(e.target.value)}
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
		        <label htmlFor='postcode'>Postcode:</label> <br />
		        <input
		          id="postcode"
		          name='postcode'
		          type='text'
		          maxLength="8"
		          value={postcode}
		          onChange={e=>postCodeChange(e)}
		          required
		        />{' '}
		        <br />
		        <label htmlFor='price'>Price of Service:</label> <br />
		        <input
		          name='price_of_service'
		          type='number'
		          step="0.01"
		          value={price}
		          min="0"
		          onChange={e => setPrice(e.target.value)}
		          required
		        />{' '}
		        <br />
		        <label htmlFor='info'>Your Info:</label> <br />
		        <textarea
		          name='info'
		          type='text'
		          maxLength="500"
		          cols="50"
		          rows="6"
		          value={userInfo}
		          onChange={e => setUserInfo(e.target.value)}
		          required
		        />{' '}
		        <br />
		        <label htmlFor='has_availability'>Do You Have Availability:</label> <br />
		        <input
					id="isAvailableBtn"
		          	name='isAvailable'
		          	type='checkbox'
		        />{' '}
		        {setIsAvblCheckbox()}
		        <br />
		        <label htmlFor='available_from'>When are you available from:</label> <br />
		        <input
		        	name='available_from'
		        	type='date'
		        	min={minDate}
		        	value={avblFrom}
		        	onChange={e=>setAvblFrom(e.target.value)}
		          	required
		        />{' '}
		        <br />
		        <label htmlFor='available_to'>When are you available to:</label> <br />
		        <input
		        	name='available_to'
		        	type='date'
		        	min={avblFrom}
		        	value={avblTo}
		        	onChange={e=>setAvblTo(e.target.value)}
		          	required
		        />{' '}
		        <br />
		        <label htmlFor='minWeight'>Minimum Dog Weight:</label> <br />
		        <input
		          name='minWeight'
		          type='number'
		          value={minWeight}
		          setp="1"
		          min="0"
		          onChange={e => setMinWeight(e.target.value)}
		          required
		        />{' '}
		        <br />
		        <label htmlFor='maxWeight'>Maximum Dog Weight:</label> <br />
		        <input
		          name='minWeight'
		          type='number'
		          value={maxWeight}
		          step="1"
		          min={minWeight}
		          onChange={e => {setMaxWeight(e.target.value)}}
		          required
		        />{' '}
		        <br />
		        <label htmlFor='accept_puppy'>Do You Walk Puppies:</label> <br />
		        <input
		          id="actpPupBtn"
		          name='acptPup'
		          type='checkbox'
		        />{' '}
		        {setAcptPupCheckbox()}
		        <br />
		        <input id="editDogWalkerbtn" type='submit' value='Update Profile' />
		        <br />
		        <input id="deleteBtn" type='button' value='Delete Profile' onClick={()=>window.location.replace('/dogWalkerDeleteProfile')} />
		        <br /><br /><br /><br />
		    </div>
		  </form>
	    </div>
	    </Fragment>
	    ):(<p>Loading...</p>)}
	  </div>
	</div>
	);
};
export default DogWalkerEditProfile;