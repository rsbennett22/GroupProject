import React, { useState, useEffect } from 'react';
import SideBar from './../../dashboard/SideBar';
import './Verify.css';

const UserVerify = () => {

  //input field for user to enter the verification code
  //check if code entered matches code stored
  //if does, set verified to true

  const [inputCode, setInputCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  //check if account is verified
  useEffect(()=>{
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
          setIsVerified(data.account_verified);
        });
    }
  },[]);

  //if verified, load dashboard page
  useEffect(()=>{
    if(isVerified){
      window.location.replace('/dashboard');
    }
    else{
      //if not verified, set the value of the server auth code
      fetch('http://127.0.0.1:8000/api/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setServerCode(data.activation_code);
      });
    }
  },[isVerified])

  const codeChange = e => {
    setInputCode(e.target.value)
    var errorMessage = document.getElementById('validateError');
    errorMessage.innerText="";
  }

  //on form submit, check if user input matches server activation code
  const onSubmit = e => {
    e.preventDefault();

    if(inputCode == serverCode){
      //if codes match, patch user account to set verified to true
      const user = {
        account_verified: true
      }
      fetch('http://127.0.0.1:8000/api/users/auth/user/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(user)
      });
      alert("Successfully verified account!");
      window.location.replace('/dashboard');
    }
    else{
      //display an invalid error code
      var errorMessage = document.getElementById('validateError');
      errorMessage.innerText="Invalid code!";
    }

  }

  return (
    <div>
    <SideBar />
      <h1>Verify Your Account</h1>
      <div className='verifyForm'>
        <form onSubmit={onSubmit}>
          <label htmlFor='verification_code'>Verification Code:</label> <br />
              <input
                name='verification_code'
                type='text'
                value={inputCode}
                onChange={e => codeChange(e)}
                required
            />{' '}
            <p className='validateError' id='validateError'></p>
            <input type='submit' value='Submit' className='submitButton' />
        </form>
      </div>
    </div>
  );
};

export default UserVerify;