import React, { useState, useEffect } from 'react';
import Register from './Register';
import Join from './Join';
import styled from 'styled-components';

// Create a styled component to cover the entire viewport
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

const Title = styled.h4`
  font-size: 50px;
  color: white; /* Change the color to your desired text color */
  font-weight: bold; /* Make the text bold */
  text-transform: uppercase; /* Uppercase text */
  letter-spacing: 2px; /* Add letter spacing for a professional look */
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

function SplashPage() {
const [wordIndex, setWordIndex] = useState(0);
const words = ["old", "lack", "rown"]; // Words for the slot machine

useEffect(() => {
  const interval = setInterval(() => {
    setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  }, 4000); // Change word every 4 seconds

  return () => clearInterval(interval);
}, []);

const currentWord = words[wordIndex];

return (
  <FullScreenContainer>
    {/* <TitleContainer>
    <Title>
        Reading While B{currentWord.split('').map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </Title>
    </TitleContainer> */}
    <Register />
    <div id="join">
        <Join />
      </div>

  </FullScreenContainer>
);
}

export default SplashPage;