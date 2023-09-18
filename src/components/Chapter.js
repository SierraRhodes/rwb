import React, { useState } from 'react';
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
  border: 2px solid white;


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
    padding: 20px;
    width: 800px;
    height: 800px;
    border: none; /* Remove the border around the editor content */
  }
`;

const FormButton = styled.button`
  background-color: #007BFF; /* Button background color */
  color: #fff; /* Button text color */
  border: none;
  padding: 10px 20px; /* Add padding to the button */
  border-radius: 5px; /* Add border radius to the button */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add a smooth transition on hover */

  display: center;
  justify-content: center; /* Horizontally center the button */
  align-items: center; /* Vertically center the button */

  &:hover {
    background-color: #0056b3; /* Change background color on hover */
  }
`;

function Chapter() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('storyId');
  const navigate = useNavigate();

  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');

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
        <TitleInput
          type="text"
          value={chapterTitle}
          onChange={handleTitleChange}
          placeholder="Chapter Title"
        />

        <StyledQuillEditor
          value={chapterContent}
          onChange={handleContentChange}
          placeholder="Write your chapter content here..."
        />
         <div>
      <FormButton type="submit">Post Chapter</FormButton>
      </div>
      </FormContainer>
     
    </form>
  );
}

export default Chapter;


