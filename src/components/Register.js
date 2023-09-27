//Provides a form for users to create new accounts.
//Allows users to log in to access private stories.
import React, { useState } from 'react';
import { auth, db } from '../firebase.js'; // Import your Firestore instance
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import styled from 'styled-components'; 
import { Link, useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  padding: 20px;
  border: 2px black solid;
  background: black;
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
  margin-top: 20px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  border: 2px solid white;
`;

const FormInput = styled.input`
  width: 80%;
  padding: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  color: white;
  
`;

const FormButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  padding-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 18px;
  transition: background-color 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;


  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.div`
 margin-top: 10px;
 padding-top: 10px;
 font-size: 24px;
 font-weight: bold;
`;

const FormButtonContainer = styled.div`
 margin-bottom: 10px;
`;

function Register() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const navigate = useNavigate();

  async function doSignUp(event) {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const username = formData.username;

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

      // Set the display name (username) for the user
      await updateProfile(user, { displayName: username });

      setSignUpSuccess(`You've successfully registered as ${username}!`);

      // Reset the form data to clear the input fields
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
      });

      navigate('/login');

    } catch (error) {
      setSignUpSuccess(`There was an error registering: ${error.message}`);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <FormContainer>
        <h5> a haven for marginalized and underrepresented voices, a place meticulously designed to empower, celebrate, and amplify your unique stories. 
</h5>
        <form onSubmit={doSignUp}>
          <FormSection>
            <Title>
              <h3>Become a Gem</h3>
              {signUpSuccess}
            </Title>
            <FormInput
              type="text"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <FormInput
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            <h6>Already have an account? Log in <Link to="/login">here</Link></h6>
            <FormButtonContainer>
            <FormButton type="submit">Register</FormButton>
            </FormButtonContainer>
          </FormSection>
        </form>
      </FormContainer>
    </React.Fragment>
  );
}

export default Register;
