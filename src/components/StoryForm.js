//A form for creating or updating stories. It may contain fields like title, content, and privacy settings.
import React, { useState } from 'react';
import { db, auth } from '../firebase'; // Import your Firestore instance
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components for styling

// Create a styled component for the form container
const FormContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: flex-start; /* Align items to the top */
  padding: 20px; /* Add padding around the entire form container */
  border: 2px black solid;
`;

// Create a styled component for the book cover image (aside)
const Aside = styled.aside`
  flex: 0; /* Make the aside not grow */
  max-width: 300px; /* Adjust the max width as needed */
  margin-right: 200px; /* Increase spacing between the aside and form */
  border: 2px black solid;
  height: 400px;
`;

const BookCover = styled.img`
  max-width: 300px; /* Adjust the image size as needed */
  height: 400px;
  margin-right: 20px; /* Increase spacing between the aside and form */
`;

// Create a styled component for the form section containing title, description, genre, and tags
const FormSection = styled.div`
  flex: 1; /* Take up remaining space */
  padding: 20px; /* Add padding around the form section */
  background-color: rgba(255, 255, 255, 0.1); /* Add a background color */
  border-radius: 10px; /* Add border radius for a rounded look */
  justify-content: center; /* Center horizontally */
`;

// Style the form labels
const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px; /* Add spacing between labels */
  font-weight: bold;
`;

// Style the form inputs and textarea
const FormInput = styled.input`
  width: 50%;
  padding: 10px; /* Add padding to inputs */
  margin-bottom: 20px; /* Add spacing between inputs */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 5px; /* Add border radius */
  background-color: transparent; /* Make the background transparent */
  color: #333; /* Set text color */
`;

const FormTextarea = styled.textarea`
  width: 50%;
  height: 200px; /* Set a fixed height for the textarea */
  padding: 10px; /* Add padding to textarea */
  margin-bottom: 20px; /* Add spacing between textarea and other inputs */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 5px; /* Add border radius */
  background-color: transparent; /* Make the background transparent */
  color: #333; /* Set text color */
  resize: none; /* Disable textarea resizing */
  overflow-y: auto; /* Enable vertical scrolling when content overflows the fixed height */
`;
// Style the button
const FormButton = styled.button`
  background-color: #007BFF; /* Button background color */
  color: #fff; /* Button text color */
  border: none;
  padding: 10px 20px; /* Add padding to the button */
  border-radius: 5px; /* Add border radius to the button */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add a smooth transition on hover */

  display: flex;
  justify-content: center; /* Horizontally center the button */
  align-items: center; /* Vertically center the button */

  &:hover {
    background-color: #0056b3; /* Change background color on hover */
  }
`;

const BookCoverContainer = styled.div`
  margin-left: 50px;
  padding: 20px; /* Add padding to the book cover container */
  display: left;
`;

// Style the success message
const SuccessMessage = styled.div`
  background-color: #5cb85c; /* Success message background color */
  color: #fff; /* Success message text color */
  padding: 10px; /* Add padding to the success message */
  border-radius: 5px; /* Add border radius */
  margin-bottom: 20px; /* Add spacing between the message and other elements */
`;

function StoryForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [genre, setGenre] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = auth.currentUser;
    const newStory = {
      title,
      description,
      genre,
      tags: tags.split(',').map((tag) => tag.trim()),
      userId: user.uid,
    };

    try {
      const docRef = await addDoc(collection(db, 'stories'), newStory);
      console.log('Document written with ID: ', docRef.id);
      setSuccessMessage(`Story created successfully!`);
      navigate('/story-list');
    } catch (error) {
      console.error('Error creating story:', error);
      // Display error message to the user
    }
  };

  return (
    <FormContainer>
      <BookCoverContainer className="book-cover">
      <Aside>
        <BookCover src="crystaltexture.webp" alt="Upload Book Cover" /> {/* Replace with the actual image path */}
      </Aside>
      </BookCoverContainer>
      <FormSection>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <FormLabel htmlFor="title">Title</FormLabel>
            <FormInput
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormTextarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>
          <div>
            <FormLabel htmlFor="genre">Genre</FormLabel>
            <FormInput
              type="text"
              id="genre"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            />
          </div>
          <div>
            <FormLabel htmlFor="tags">Tags (comma-separated)</FormLabel>
            <FormInput
              type="text"
              id="tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
            />
          </div>
          <FormButton type="submit">Create Story</FormButton>
        </form>
      </FormSection>
    </FormContainer>
  );
}

export default StoryForm;
