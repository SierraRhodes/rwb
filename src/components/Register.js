//Provides a form for users to create new accounts.
//Allows users to log in to access private stories.
import React, { useState } from 'react';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Register() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const username = event.target.username.value;

    // Check if passwords match
    if (password !== confirmPassword) {
      setSignUpSuccess('Passwords do not match.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // You can set the username in the user's profile here
        // For example, using Firebase Authentication's updateProfile method
        const user = userCredential.user;
        return updateProfile(user, { displayName: username })
          .then(() => {
            setSignUpSuccess(`You've successfully registered as ${username}!`);
          })
          .catch((error) => {
            setSignUpSuccess(`There was an error setting the username: ${error.message}`);
          });
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error registering: ${error.message}`);
      });
      console.log('usernames', username);
  }

  return (
    <React.Fragment>
      <h1>Become a Gem!</h1>
      {signUpSuccess}
      <form onSubmit={doSignUp}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <button type="submit">Register!</button>
      </form>
    </React.Fragment>
  );
}

export default Register;
