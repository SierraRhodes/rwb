//Allows users to log in to access private stories.
import React, { useState } from 'react';
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword  } from "firebase/auth";

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
    <h1>Log in!</h1>
    {signInSuccess}
      <form onSubmit={doLogin}>
        <input
          type='text'
          name='signInEmail'
          placeholder='email' />
        <input 
          type='password'
          name='signInPassword'
          placeholder='Password' />
          <button type= 'submit'>Log in!</button>
      </form>
    </React.Fragment>
  );
}

export default Login