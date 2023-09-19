//A form for creating or updating stories. It may contain fields like title, content, and privacy settings.
import React, { useState } from 'react';
import { db, auth, storage } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


// Create a styled component for the form container
const FormContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Align items to the top */
  padding: 20px; /* Add padding around the entire form container */
`;

// Create a styled component for the book cover image (aside)
const Aside = styled.aside`
  width: 300px;
  height: 500px;
  margin-right: 20px;
  //border: 2px black solid;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Hide any overflowing content */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
`;

const BookCover = styled.img`
  width: 300px;
  height: 500px;
`;

// Create a styled component for the form section containing title, description, genre, and tags
const FormSection = styled.div`
  flex: 1;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  justify-content: center;
  margin-right: 80px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
`;

// Style the form labels
const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: bold;
`;

// Style the form inputs and textarea
const FormInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  color: #333;
`;

const FormTextarea = styled.textarea`
  width: 90%;
  height: 200px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  color: #333;
  resize: none;
  overflow-y: auto;
`;

// Style the button
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

const BookCoverContainer = styled.div`
  margin-left: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function StoryForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [genre, setGenre] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [image, setImage] = useState(null); // Add state for the selected image
  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const user = auth.currentUser;
  
    try {
      if (image) {
        // Convert the data URL to a binary blob
        const reader = new FileReader();
        reader.onload = async (event) => {
          const dataURL = event.target.result;
          const blob = dataURItoBlob(dataURL);
  
          // Upload the binary blob to Firebase Storage
          const storageRef = ref(storage, `book_covers/${image.name}`);
          await uploadBytes(storageRef, blob);
  
          // Get the download URL for the uploaded image
          const imageUrl = await getDownloadURL(storageRef);
          console.log('image', imageUrl);
  
          const newStory = {
            title,
            description,
            genre,
            tags: tags.split(',').map((tag) => tag.trim()),
            userId: user.uid,
            imageURL: imageUrl, // Store the imageURL in Firestore
          };
  
          // Add the newStory to Firestore
          const docRef = await addDoc(collection(db, 'stories'), newStory);
          console.log('Document written with ID: ', docRef.id);
          setSuccessMessage(`Story created successfully!`);
          navigate('/story-list');
        };
  
        reader.readAsDataURL(image);
      } else {
        console.error('Please select an image for the story.');
      }
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };
  
  // Function to convert data URL to blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <FormContainer>
      <BookCoverContainer>
        <Aside>
          <label htmlFor="image" className="upload-label">
            {image ? (
              <BookCover src={URL.createObjectURL(image)} alt="Book Cover" />
            ) : (
              <div className="upload-placeholder">
                <span>Click to upload a book cover</span>
              </div>
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            required         
          />
        </Aside>
      </BookCoverContainer>
      <FormSection>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <h5><FormLabel htmlFor="title">Title</FormLabel></h5>
            <FormInput
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div>
            <h5><FormLabel htmlFor="description">Description</FormLabel></h5>
            <FormTextarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>
          <div>
            <h5><FormLabel htmlFor="genre">Genre</FormLabel></h5>
            <FormInput
              type="text"
              id="genre"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            />
          </div>
          <div>
            <h5><FormLabel htmlFor="tags">Tags (comma-separated)</FormLabel></h5>
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

