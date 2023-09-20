import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const TitleInput = styled.input`
  margin-bottom: 20px; /* Add space between the title input and the editor */
  font-size: 18px; /* Increase font size for the title input */
  padding: 10px;


  border: none; /* Remove the border when the input is focused */

`;

const StyledQuillEditor = styled(ReactQuill)`
  .ql-container {
    border: none; /* Remove the border around the editor container */
  }

  .ql-toolbar {
    border: none; /* Remove the border around the editor tools */
  }

  .ql-editor {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    max-width: 100%;
    //padding: 20px;
    width: 800px;
    height: 600px;
    //border: none; /* Remove the border around the editor content */
  }
`;

const FormButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  
  transition: background-color 0.3s ease, transform 0.2s ease; /* Add a smooth transition for background color and transform */

  display: flex; /* Use flex to center the content both horizontally and vertically */
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05); /* Add a slight scale effect on hover */
  }
  
  &:active {
    transform: scale(0.95); /* Add a scale effect when the button is clicked */
  }
`;

const FormButtonContainer = styled.div`
padding: 20px;
`;

const SeparatorLine = styled.div`
  width: 60%;
  //border: 2px solid #ddd; /* Add a 1px solid gray border as the separator */
  margin: 5px 0; /* Add some vertical spacing around the separator */
`;

const WordCountContainer = styled.div`
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: left;
  margin-bottom: 10px;
`;

const WordCountText = styled.p`
  font-family: 'Roboto', sans-serif; /* Use a professional font family */
  font-size: 18px; /* Larger font size for readability */
  color: #333; /* Dark color for good contrast */
  text-align: left; /* Align the text to the left */
`;

const Input = styled.input`
  width: 170px; /* Adjust the width as needed */
  padding: 5px;
  text-align: center;
`;

const WordInput = styled.input`
  width: 200px; /* Adjust the width as needed */
  padding: 5px;
  text-align: center;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  justify-content: center; /* Center items horizontally */
  align-items: center; /* Center items vertically */
  padding: 10px;
  margin-left: 370px;
`;

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  justify-content: center; /* Center items horizontally */
  align-items: center; /* Center items vertically */
  padding: 10px;
  margin-left: 370px;
  `;

const LeftAlignedContainer = styled.div`
  display: flex;
  flex-direction: row; /* Arrange items horizontally */
  align-items: flex-start; /* Align items to the left */
  width: 100%;
`;

const Icon = styled.img`
  cursor: pointer;
  margin-right: 16px; /* Add spacing between icon and text */
  margin-left: 8px;
  width: 40px;
  height: 40px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row; /* Arrange items horizontally */
  width: 100%;

  margin-right: 80px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  background-color: #007BFF; /* Default background color */
  color: #fff; /* Default text color */

  &:hover {
    background-color: #0056b3; /* Hover background color */
    transform: scale(1.05); /* Add a slight scale effect on hover */
  }

  &:active {
    transform: scale(0.95); /* Add a scale effect when the button is clicked */
  }

  /* You can define additional styles for different button variants */
  &.primary {
    background-color: #007BFF;
  }

  &.secondary {
    background-color: #28a745;
  }

  &.danger {
    background-color: #dc3545;
  }
`;

const CountdownTitle = styled.h3`
  margin-left: 20px;
`;

const ProgressBar = styled.progress`
  width: 100%;
  appearance: none;
  height: 5px;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 5px;

  &::-webkit-progress-bar {
    background-color: #ddd; /* Background color for the progress bar container */
    border-radius: 10px;
  }

  &::-webkit-progress-value {
    background: linear-gradient(
      to right,
      rgba(255, 78, 80, 0.6),
      rgba(252, 145, 58, 0.6),
      rgba(249, 212, 35, 0.6),
      rgba(168, 255, 120, 0.6),
      rgba(120, 255, 214, 0.6),
      rgba(120, 214, 255, 0.6),
      rgba(168, 120, 255, 0.6),
      rgba(249, 120, 212, 0.6),
      rgba(255, 120, 168, 0.6),
      rgba(255, 120, 99, 0.6)
    ); /* Gradient of paler iridescent colors */
    border-radius: 10px;
  }
  
  &::-moz-progress-bar {
    background: linear-gradient(
      to right,
      rgba(255, 78, 80, 0.6),
      rgba(252, 145, 58, 0.6),
      rgba(249, 212, 35, 0.6),
      rgba(168, 255, 120, 0.6),
      rgba(120, 255, 214, 0.6),
      rgba(120, 214, 255, 0.6),
      rgba(168, 120, 255, 0.6),
      rgba(249, 120, 212, 0.6),
      rgba(255, 120, 168, 0.6),
      rgba(255, 120, 99, 0.6)
    ); /* Gradient of paler iridescent colors */
    border-radius: 10px;
  }
`;





function Chapter() {
  const [wordVisible, setWordVisible] = useState(false);
  const [timerVisible, setTimerVisible] = useState(false);
  const [countdownVisible, setCountdownVisible] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('storyId');
  const navigate = useNavigate();

  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');

  const [wordCount, setWordCount] = useState(0);
  const [wordCountGoal, setWordCountGoal] = useState(1000); // Set the default word count goal
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Timer state
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);

  // Countdown timer state
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(60); // Set your initial countdown time in seconds
  const [countdownInput, setCountdownInput] = useState('00:01:00'); // Initial countdown input in "HH:MM:SS" format

  const toggleWordVisibility = () => {
    setWordVisible(!wordVisible);
  };

  const toggleTimerVisibility = () => {
    setTimerVisible(!timerVisible);
  };

  const toggleCountdownVisibility = () => {
    setCountdownVisible(!countdownVisible);
  };

  // Function to parse the countdown input and update the countdown state
  const updateCountdownFromInput = () => {
    const parts = countdownInput.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      setCountdown(timeToSeconds(hours, minutes, seconds));
    }
  };

  // Function to format seconds to "HH:MM:SS" format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Function to format hours, minutes, and seconds to seconds
  const timeToSeconds = (hours, minutes, seconds) => {
    return (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);
  };

  // Toggle countdown timer activity
  const toggleCountdown = () => {
    if (isCountdownActive) {
      setIsCountdownActive(false);
      updateCountdownFromInput(); // Update countdown based on input when stopping
    } else {
      setIsCountdownActive(true);
    }
  };

  useEffect(() => {
    let countdownIntervalId;

    if (isCountdownActive) {
      countdownIntervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(countdownIntervalId);
            // Start your timer when countdown reaches 0 (if needed)
            // You can add your logic here
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdownIntervalId);
      // Uncomment this line if needed to clear the timer interval
      // clearInterval(timerInterval);
    }

    return () => {
      clearInterval(countdownIntervalId);
      // Uncomment this line if needed to clear the timer interval
      // clearInterval(timerInterval);
    };
  }, [isCountdownActive]);


  // Toggle timer activity
  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      // Reset the timer when it's stopped
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    // Function to count words in the chapter's content
    const countWords = (text) => {
      const words = text.split(/\s+/);
      return words.filter((word) => word.length > 0).length;
    };

    // Calculate word count whenever the chapter content changes
    setWordCount(countWords(chapterContent));
  }, [chapterContent]);

  const handleWordCountGoalChange = (event) => {
    setWordCountGoal(parseInt(event.target.value, 10)); // Parse the input value to an integer
  };

  useEffect(() => {
    // Calculate progress percentage based on word count and word count goal
    const calculatedPercentage = (wordCount / wordCountGoal) * 100;
    setProgressPercentage(calculatedPercentage);
  }, [wordCount, wordCountGoal]);


  const handleTitleChange = (event) => {
    setChapterTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setChapterContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const storyRef = doc(db, 'stories', storyId);
      const chaptersRef = collection(storyRef, 'chapters');

      const newChapter = {
        title: chapterTitle,
        content: chapterContent,
      };

      const docRef = await addDoc(chaptersRef, newChapter);
      console.log('Chapter added with ID:', docRef.id);

      navigate(`/story-detail/${storyId}`);
      setChapterTitle('');
      setChapterContent('');
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  return (

 
    <form className="chapter" onSubmit={handleSubmit}>
      <FormContainer>
        <LeftAlignedContainer>
        <WordCountContainer>
        {wordVisible && (
    <div>
      <WordCountText>{wordCount} words</WordCountText>
      <WordCountText>Word Count Goal: {wordCountGoal}</WordCountText>
      <WordInput
        type="number"
        value={wordCountGoal}
        onChange={handleWordCountGoalChange}
        placeholder="Word Count Goal"
        required
      />
    </div>
  )}
          
        </WordCountContainer>
        <TimerContainer>
        {timerVisible && (
        <div>
          <h3>{formatTime(timer)}</h3>
          <Button
          type="button"
          onClick={toggleTimer}
          >
          {isActive ? "Stop Timer" : "Start Timer"}
          </Button>
        </div>
        )}
          </TimerContainer>
          <CountdownContainer>
          {countdownVisible && (
    <div>
      <CountdownTitle>
        {isCountdownActive
          ? formatTime(countdown)
          : countdownInput}
      </CountdownTitle>
      <Input
        type="text"
        value={countdownInput}
        onChange={(e) => setCountdownInput(e.target.value)}
        placeholder="HH:MM:SS"
      />
      <Button
        type="button"
        onClick={toggleCountdown}
      >
        {isCountdownActive ? "Stop Countdown" : "Start Countdown"}
      </Button>
    </div>
  )}
          </CountdownContainer>
        </LeftAlignedContainer>
        
        <TitleInput
          type="text"
          value={chapterTitle}
          onChange={handleTitleChange}
          placeholder="Chapter Title"
          required
        />
        <SeparatorLine>
        <ProgressBar
        value={progressPercentage}
        max="100"
      />
            </SeparatorLine>
       <aside>
        <IconContainer>
          <Icon src="logo512.png" alt="Word" onClick={toggleWordVisibility} />
          <Icon src="logo512.png" alt="Timer" onClick={toggleTimerVisibility} />
          <Icon src="logo512.png" alt="Countdown" onClick={toggleCountdownVisibility} />
          </IconContainer>
        </aside>
        <StyledQuillEditor
          value={chapterContent}
          onChange={handleContentChange}
          placeholder="Write your chapter content here..."
        />
        <FormButtonContainer>
      <FormButton type="submit">Post Chapter</FormButton>
      </FormButtonContainer>
      </FormContainer>
     
    </form>
  );
}

export default Chapter;


