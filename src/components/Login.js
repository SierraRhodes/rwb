//Allows users to log in to access private stories.
import React, { useState } from 'react';
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword  } from "firebase/auth";
import styled from 'styled-components';

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

  &:hover {
    background-color: #0056b3;
  }
`;

function Login() {


  const [signInSuccess, setSignInSuccess] = useState(null); 


  function doLogin(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully logged in ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error logging in: ${error.message}!`)

      })
  }
  return (
    <React.Fragment>
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
          placeholder='email' />
        <FormInput 
          type='password'
          name='signInPassword'
          placeholder='Password' />
       <FormButton type= 'submit'>Log in!</FormButton>
      </form>
      </FormSection>
      </FormContainer>
    </React.Fragment>
  );
}

export default Login