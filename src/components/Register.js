//Provides a form for users to create new accounts.
//Allows users to log in to access private stories.
import React, { useState } from 'react';
import { auth, db } from '../firebase.js'; // Import your Firestore instance
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import styled from 'styled-components'; 
import { Link } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  padding: 20px;
`;

const FormSection = styled.div`
  display: flex; /* Make it a flex container */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  height: 400px;
  width: 400px;
  margin-left: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
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

  display: flex;
  justify-content: center;
  align-items: center;


  &:hover {
    background-color: #0056b3;
  }
`;

function Register() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);

  async function doSignUp(event) {
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

    try {
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user", user);
      // Check username availability in your "usernames" collection
      // const usernameRef = db.collection('usernames').doc(username);
      //const usernamesRef = collection(db, 'usernames').doc(username);
      // const usernameDoc = await usernameRef.get();

      // if (usernameDoc.exists) {
      //   setSignUpSuccess('Username is already taken.');
      //   return;
      // }

      // // Username is available, store it in the "usernames" collection
      // await usernameRef.set({ uid: user.uid });
      // console.log('Username added to "usernames" collection.');

      // Set the display name (username) for the user
      await updateProfile(user, { displayName: username });

      setSignUpSuccess(`You've successfully registered as ${username}!`);
    } catch (error) {
      setSignUpSuccess(`There was an error registering: ${error.message}`);
    }
  }


  return (
    <React.Fragment>
      <FormContainer>
      {signUpSuccess}
      <form onSubmit={doSignUp}>
        <FormSection>
          <div>
        <h3>Become a Gem!</h3>
        </div>
        <FormInput
          type="text"
          name="email"
          placeholder="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <h6>Already have an account? Log in <Link to="/login">here</Link></h6>
        <FormButton type="submit">Register!</FormButton>
        </FormSection>
      </form>
      </FormContainer>
    </React.Fragment>
  );
}

export default Register;
