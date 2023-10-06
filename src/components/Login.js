//Allows users to log in to access private stories.
import React, { useState } from 'react';
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword  } from "firebase/auth";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';


const FullScreenContainer = styled.div`
  //position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('/ruby.png'); /* Set the image as the background */
  background-size: cover; /* Ensure the image covers the entire container */
  background-position: center; /* Center the image within the container */
  background-repeat: no-repeat; /* Prevent image repetition */
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  //align-items: center;
  color: white; /* Set text color to white for readability */
  font-size: 24px; /* Adjust font size as needed */
  // Add styles for the animation
  h3, h4 {
    overflow: hidden;
    white-space: nowrap;
  }
  h3 span, h4 span {
    display: inline-block;
    animation: flicker 4s linear infinite alternate;
  }

  @keyframes flicker {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  // Add styles for the animation
  h3, h4 {
    overflow: hidden;
    white-space: nowrap;
  }
  h3 span, h4 span {
    display: inline-block;
    opacity: 0;
    animation: fillIn 4s steps(5) infinite alternate;
  }

  @keyframes fillIn {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  padding: 20px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  height: 400px;
  width: 400px;
  margin-left: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  border: 2px solid white;
  /* Center the inputs and button horizontally within the FormSection */
  text-align: center;
`;


const FormInput = styled.input`
  width: 80%;
  padding: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  color: #333;
`;

const FormButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  padding-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 18px;

  &:hover {
    background-color: #0056b3;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [signInSuccess, setSignInSuccess] = useState(null); 


  function doLogin(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully logged in ${userCredential.user.email}!`)
        navigate('/story-list')})
      .catch((error) => {
        setSignInSuccess(`There was an error logging in: ${error.message}!`)
      
      })
  }
  return (
    <React.Fragment>
      <FullScreenContainer>
      <FormContainer>
    <FormSection>
    {signInSuccess}
      <div>
        <h3>Log in</h3>
      </div>
      <form onSubmit={doLogin}>
        <FormInput
          type='text'
          name='signInEmail'
          placeholder='Email' />
        <FormInput 
          type='password'
          name='signInPassword'
          placeholder='Password' />
         <h6>Not registered? Register <Link to="/">here</Link></h6>
       <FormButton type= 'submit'>Log in!</FormButton>
      </form>
      </FormSection>
      </FormContainer>
      </FullScreenContainer>
    </React.Fragment>
  );
}

export default Login