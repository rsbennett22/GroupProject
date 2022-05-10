import React, { useState, useEffect, setState, Fragment } from 'react';
import { isValid, fix } from 'postcode';
import SideBar from './../SideBar';
import './../Dashboard.css';

const DogWalkerEditProfile = () => {
	const [createdProfile, setCreatedProfile] = useState(true);
	const [username, setUserName] = useState('');
	const [first_name, setUserFName] = useState('');
	const [last_name, setUserLName] = useState('');
	const uploadedImage = React.useRef(null);
	const imageUploader = React.useRef(null);
	const [email, setEmail] = useState('');
	const [postcode, setPostcode] = useState('');
	const [price, setPrice] = useState('');
	const [userInfo, setUserInfo] = useState('');
	const [minWeight, setMinWeight] = useState('');
	const [maxWeight, setMaxWeight] = useState('');
	const [errors, setErrors] = useState(false);
  	const [loading, setLoading] = useState(true);
  	const [fullName, setUserFullName] = useState('');
  	const [isAvailable, setIsAvailable] = useState(false);
  	const [acptPup, setAcptPup] = useState(false);
  	const [profilePK, setProfilePK] = useState(-1);
  	const [base64Img, setBase64Img] = useState('');
  	const [isVerified, setIsVerified] = useState(false);

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
			    	setIsVerified(data.account_verified);
			    	setCreatedProfile(data.createdDogWalkerProfile);
			    	setEmail(data.email);
					setUserName(data.username);
        		});
    		};
	}, []);	

  	useEffect(()=>{
  		if(!isVerified){
  			window.location.replace('/dashboard');
  		}
  	},[isVerified])

  	useEffect(()=>{
  		console.log("created: "+createdProfile);
  		if(!createdProfile){
  			window.location.replace('/dogWalkerCreateProfile');
  		}
  		else{
	  		getProfileInfo();
	  		setLoading(false);
	  	}
  	},[username])


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

  	const postCodeChange = e => {
  		setPostcode(fix(e.target.value));
  		resetPostcodeError();
  	}

  	const resetPostcodeError = () => {
  		var postCodeField = document.getElementById('dogWalkerCreateForm').elements[3];
  		postCodeField.id = "postcode"
  	};

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
  			min_weight: minWeight,
  			max_weight: maxWeight,
  			acpt_pup: acptPup,
  			usr_img: handleImageUpload,
  		};
  		fetch('http://127.0.0.1:8000/api/dogWalkers/'+profilePK, {
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

	const getProfileInfo = () => {
		fetch('http://127.0.0.1:8000/api/dogWalkers/'+username, {
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
	        });
	}

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
		      	<img ref={uploadedImage} />
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