import React, { useState, useEffect } from 'react';
import SideBar from './../SideBar';
import './Verify.css';
import './../Dashboard.css';

const UserVerify = () => {

  const [inputCode, setInputCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUsername] = useState('');

  //check if user has a token and the account is verified
  useEffect(()=>{
    if (localStorage.getItem('token') === null) {
      window.location.replace('/login');
    } else {
      fetch('/api/v1/users/auth/user/', {
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
      fetch('/api/v1/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUsername(data.username);
          setServerCode(data.activation_code);
      });
    }
  },[isVerified])

  //when user changes input in the verification input field, update constant inputCode and hide the error message
  const codeChange = e => {
    setInputCode(e.target.value)
    var errorMessage = document.getElementById('validateError');
    errorMessage.innerText="";
  }

  //on form submit, check if user input matches server activation code
  const onSubmit = e => {
    e.preventDefault();

    if(inputCode === serverCode){
      //if codes match, patch user account to set verified to true
      const user = {
        account_verified: true
      }
      fetch('/api/v1/users/auth/user/', {
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

  //send a request to server to resend verification email
  const resendCode = () => {
    fetch('/api/users/resend-code/?username='+userName, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      });
    //update serverCode
    fetch('/api/v1/users/auth/user/', {
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
    alert("Verification email resent, check your inbox!");
  }

  return (
    <div>
    <SideBar />
      <div className='dashboard'>
        <h1>Verify Your Account</h1>
        <div id='leftCol' className='body'>
          <h5>Enter code from the verification email</h5>
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
              <br />
              <input type='button' value='Resend Verification Code' className='verifyResend' onClick={()=>resendCode()}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserVerify;