import React, { useState, useEffect } from 'react';
import { isValid, fix } from 'postcode';
import SideBar from './../SideBar';
import './../Dashboard.css';

const DogWalkerCreateProfile = () => {

	const [createdProfile, setCreatedProfile] = useState(false);
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
	const [isVerified, setIsVerified] = useState(true);
	const [avblFrom, setAvblFrom] = useState('');
	const [avblTo, setAvblTo] = useState('');
	const current = new Date();
	//const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
	const day = ("0"+current.getDate()).slice(-2);
	const month = ("0"+(current.getMonth()+1)).slice(-2);
	const date = current.getFullYear()+"-"+month+"-"+day;


	//function works for setting image
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

	//when user changes postcode field, 'fix' input (ensures the input in correct format), reset any errors with postcode
	const postCodeChange = e => {
		setPostcode(fix(e.target.value));
		resetPostcodeError();
	}

	//reset postcode field back to no-error state
	const resetPostcodeError = () => {
		var postCodeField = document.getElementById('dogWalkerCreateForm').elements[3];
		postCodeField.id = "postcode"
	};

	//check values of fields in form, send a POST request to api endpoint with data to create a dogWalker profile
	const createDogWalkerProfile = e => {
		e.preventDefault();

		//validate inputs
		var isAvailable = false;
		var acptPup = false;
		var postCodeField = document.getElementById('dogWalkerCreateForm').elements[3];
		var isAvailableBtn = document.getElementById('dogWalkerCreateForm').elements[6];
		var acptPupBtn = document.getElementById('dogWalkerCreateForm').elements[11];

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
			return console.log("Invalid postcode");
		}
		else {
			postCodeField.id = "postcode";
		}
		//If passes validation checks, create a new dogWalker profile and assign the pk of the new profile to the user
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
		fetch('/api/v1/dogWalker/create', {
			method: 'POST',
			headers: {
      		'Content-Type': 'application/json',
      		Authorization: `Token ${localStorage.getItem('token')}`,
    		},
			body: JSON.stringify(user)
		}).catch(err =>{
			console.log(err);
		});

		//set the createdDogWalkerProfile attribute in the user info to true, load the dashboard
		const updateUser = {
	      createdDogWalkerProfile:true
	    };
	    fetch('/api/v1/users/auth/user/', {
	      method: 'PATCH',
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Token ${localStorage.getItem('token')}`,
	      },
	      body: JSON.stringify(updateUser)
	    });
	    alert("Profile created successfully!");
	    window.location.replace('/dashboard');
	}  

	//on page load get the logged in user's info
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
        }
      }).then(res => res.json())
        .then(data => {
        	setIsVerified(data.account_verified);
					setEmail(data.email);
					setUserName(data.username);
					setUserFullName(data.first_name+" "+data.last_name);
					setCreatedProfile(data.createdDogWalkerProfile);
         });
        //console.log(date);
    	};
	}, []);	

	//once isVerified attribute has been set, check value, if not verified, load the dashboard
	useEffect(()=>{
		if(!isVerified){
			window.location.replace('/dashboard');
		}
	},[isVerified])

	//once createdProfile is set, check value, if true, load edit profile page
	useEffect(()=>{
		if(createdProfile)
		{
			window.location.replace('/dogWalkerEditProfile');
		}
		else{
      setAvblFrom(date);
			setLoading(false);
		}
	},[createdProfile, date])

	return (
	<div>
	  <SideBar />
	  <div className="dashboard">
	    <h1>Account Details</h1>
	    <div id="leftCol" className="body">
	      {loading === false}
	      <h5>Create a Dog Walker Profile</h5>
	      <form id="dogWalkerCreateForm" onSubmit={createDogWalkerProfile}>
	      	<div className="userImage" id="userImage">
	      		<label htmlFor='profile_picture'>Profile Picture:</label> <br />
		      	<img alt="" ref={uploadedImage} />
	          	<input
		            name='profile_picture'
		            type='file'
		            accept="image/*"
		            onChange={handleImageUpload}
		            ref={imageUploader}
		            alt="Profile picture"
		            required
		        />{' '}
		        <p name="errorMessage"></p>
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
		          maxlength="8"
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
		          maxlength="500"
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
		        <br />
		        <label htmlFor='available_from'>When are you available from:</label> <br />
		        <input
		        	name='available_from'
		        	type='date'
		        	min='2022-05-12'
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
		        <br />
		        <input id="createDogWalkerbtn" type='submit' value='Create Profile' />
		        <br /><br /><br /><br />
		    </div>
		  </form>
	    </div>
	  </div>
	</div>
	);
};
export default DogWalkerCreateProfile;