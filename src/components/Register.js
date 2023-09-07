//Provides a form for users to create new accounts.
//Allows users to log in to access private stories.
import React, { useState } from 'react';

import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register(){
  const [signUpSuccess, setSignUpSuccess] = useState(null); 


  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully registered ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error registering: ${error.message}!`)

      })
  }
  return (
    <React.Fragment>
    <h1>Become a Gem!</h1>
    {signUpSuccess}
    <form onSubmit ={doSignUp}>
      <input 
        type= 'text'
        name= 'email'
        placeholder='email' />
      <input
        type='password'
        name='password'
        placeholder="Password"/>
      <button type= 'submit'>Register!</button>


    </form>
    </React.Fragment>
  );
}

export default Register