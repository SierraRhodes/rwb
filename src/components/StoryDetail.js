//Shows the full details of a selected stories when the user clicks on a specific stories in the list.
//Such as the description and the chapters 

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db, auth, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import DeleteConfirmation from './DeleteConfirmation';

const FormContainer3 = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Align items to the top */
  padding: 20px; /* Add padding around the entire form container */
`;

// Create a styled component for the form section containing title, description, genre, and tags
const FormSection2 = styled.div`
  flex: 1;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  justify-content: center;
  margin-right: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
`;

// Style the form inputs and textarea
const FormInput2 = styled.input`
  width: 90%;
  padding: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  color: #333;
`;

// Style the button
const FormButton3 = styled.button`
background-color: #007BFF;
color: #fff;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;
display: center;
justify-content: center;
align-items: center;
margin-right: 0px; /* Add margin to space out the buttons */
width: 150px;
margin-left: 50px;
&:hover {
  background-color: #0056b3;
}
`;

// Create a styled component for the form container
const FormContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Align items to the top */
  padding: 20px; /* Add padding around the entire form container */
  //border: 2px black solid;
  width: 970px;
  margin-left: 172px;
  
  //background: black;
`;

const FormContainer2 = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  padding: 20px; /* Add padding around the entire form container */
  //border: 2px black solid;
  width: 970px;
  margin-left: 172px;
  
  //background: black;
`;

const ChapterContainer = styled.div`
  display: flex;
  flex-direction: column; /* Display items in a column */
  padding: 10px;
  //border: 2px black solid;
  width: 970px;
  margin-left: 162 px;
  // background: black;
  margin-bottom: 5px;
`;

const ChapterItem = styled.div`
  width: 93%;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0px;
  margin-right: 100px; /* Adjust the left margin as needed */
 
`;

const ChapterContentTitle = styled.div`
  margin-bottom: 90px;

`;

// Create a styled component for the book cover image (aside)
const Aside = styled.aside`
  width: 300px;
  height: 500px;
  margin-left: 120px;
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

const BookCoverContainer = styled.div`
  margin-left: 60px;
  padding: 20px; /* Add padding to the book cover container */
  display: left;
`;

// Create a styled component for the form section containing title, description, genre, and tags
const FormSection = styled.div`
  flex: 1;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  justify-content: center;
  //border: 2px solid black;
  margin-right: 80px;

  /* Add a box shadow that transitions from black to white */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
`;


// Style the form labels
const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px; /* Add spacing between labels */
  font-weight: bold;
`;

// Style the form inputs and textarea
const FormInput = styled.input`
  width: 90%;
  padding: 10px; /* Add padding to inputs */
  margin-bottom: 20px; /* Add spacing between inputs */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 5px; /* Add border radius */
  background-color: transparent; /* Make the background transparent */
  color: #333; /* Set text color */
`;

const FormTextarea = styled.textarea`
  width: 90%;
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
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: center;
  justify-content: center;
  align-items: center;
  margin-right: 0px; /* Add margin to space out the buttons */
  width: 200px;
  &:hover {
    background-color: #0056b3;
  }
`;

const FormButton2 = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: center;
  justify-content: center;
  align-items: center;
  margin-right: 0px; /* Add margin to space out the buttons */
  width: 1550px;
  &:hover {
    background-color: #0056b3;
  }
`;


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row; /* Stack items vertically */
  gap: 10px; /* Add spacing between the buttons */
  margin: 2px;

`;

const ButtonContainer2 = styled.div`
  display: flex;
  flex-direction: row; /* Stack items vertically */
  gap: 10px; /* Add spacing between the buttons */
  margin-left: 120px;
  margin-bottom: 20px;

`;


function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStory, setEditedStory] = useState({});
  const [newImage, setNewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isOwner, setIsOwner] = useState(false); 
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  

  useEffect(() => {
    const fetchStory = async () => {
      try {
        // Fetch story data from Firebase
        const storyDocRef = doc(db, 'stories', id);
        const storyDoc = await getDoc(storyDocRef);
  
        if (storyDoc.exists()) {
          const storyData = storyDoc.data();
          setStory({
            id: storyDoc.id,
            title: storyData.title,
            description: storyData.description,
            genre: storyData.genre,
            imageURL: storyData.imageURL,
          });
  
          // Check if the current user is the owner
          if (auth.currentUser && auth.currentUser.uid === storyData.userId) {
            setIsOwner(true);
          }
  
          // Fetch chapter data related to the story
          const chaptersRef = collection(storyDocRef, 'chapters');
          const chapterQuerySnapshot = await getDocs(chaptersRef);
          const chapterData = [];
          chapterQuerySnapshot.forEach((doc) => {
            chapterData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setChapters(chapterData);
        } else {
          console.error('Story not found.');
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };
  
    fetchStory();
  }, [id]);


  if (!story) {
    return <div>Loading...</div>;
  }

  const handleAddToLibraryClick = async () => {
    if (!user) {
      // User is not authenticated, handle accordingly (e.g., show a login prompt)
      return;
    }
  
    try {
      // Get the user's UID
      const userId = user.uid;
  
      // Reference to the user's library collection in Firestore
      const userLibraryRef = collection(db, 'users', userId, 'library');
  
      // Check if the story is already in the user's library
      const userLibrarySnapshot = await getDocs(userLibraryRef);
  
      if (!userLibrarySnapshot.docs.some((doc) => doc.id === story.id)) {
        // Add the story to the user's library
        await setDoc(doc(userLibraryRef, story.id), {});
  
        // Display a success message or update the UI as needed
        console.log('Story added to library successfully!');
      } else {
        // The story is already in the library
        console.log('Story is already in your library.');
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error adding story to library:', error);
    }
  };

  const handleEditStoryClick = () => {
    setIsEditing(true);
    // Initialize editedStory with the current story data
    setEditedStory({
      title: story.title,
      description: story.description,
      genre: story.genre,
      imageURL: story.imageURL,
    });
  };

  const handleSaveStoryClick = async () => {
    try {
      // Check if a new image has been uploaded
      if (newImage) {
        // Upload the new image to Firebase Storage
        const storageRef = ref(storage, `story_images/${id}/${newImage.name}`);
        const uploadTask = uploadBytes(storageRef, newImage);

        // Wait for the upload to complete
        await uploadTask;

        // Get the download URL of the uploaded image
        const imageURL = await getDownloadURL(storageRef);

        // Update the edited story data with the new imageURL
        setEditedStory({ ...editedStory, imageURL });
      }

      // Update the story data in Firestore with the editedStory
      const storyDocRef = doc(db, 'stories', id);
      await updateDoc(storyDocRef, editedStory);
      setIsEditing(false);

      // Reload the story data after saving (optional)
      const reloadedStoryDoc = await getDoc(storyDocRef);
      const reloadedStoryData = reloadedStoryDoc.data();
      setStory({
        id: reloadedStoryDoc.id,
        title: reloadedStoryData.title,
        description: reloadedStoryData.description,
        genre: reloadedStoryData.genre,
        imageURL: reloadedStoryData.imageURL,
      });
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setNewImage(file);
  
    // Create a reference for the new image in Firebase Storage
    const storageRef = ref(storage, `story_images/${id}/${file.name}`);
    
    // Upload the new image to Firebase Storage
    const uploadTask = uploadBytes(storageRef, file);
  
    try {
      // Wait for the upload to complete
      await uploadTask;
  
      // Get the download URL of the uploaded image
      const imageURL = await getDownloadURL(storageRef);
  
      // Update the editedStory data and also the BookCover src
      setEditedStory({ ...editedStory, imageURL });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleCancelStoryClick = () => {
    setIsEditing(false);
    // Reset editedStory to the current story data
    setEditedStory({
      title: story.title,
      description: story.description,
      genre: story.genre,
      imageURL: story.imageURL,
    });
  };

  const handleDeleteStoryClick = () => {
    // Open the custom confirmation dialog
    setIsConfirmDialogOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    // Close the custom confirmation dialog
    setIsConfirmDialogOpen(false);
  
    try {
      const storyDocRef = doc(db, 'stories', id);
      await deleteDoc(storyDocRef);
      // Redirect or perform any other actions after deleting
      navigate('/story-list');
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false);
  };



  return (
    <div>
      {isEditing ? (
          <FormContainer3>
          <BookCoverContainer className="book-cover">
          <Aside>
          <label htmlFor="imageUpload">
    <BookCover
      src={editedStory.imageURL || story.imageURL}
      alt="Story Cover"
      onClick={handleImageClick}
    />
  </label>
  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    ref={fileInputRef}
    id="imageUpload"
    style={{ display: 'none' }} // Hide the input element
  />
          </Aside>
          </BookCoverContainer>
          <FormSection2>
          <FormLabel htmlFor="title">Title</FormLabel>
          <FormInput2
            type="text"
            value={editedStory.title}
            onChange={(e) => setEditedStory({ ...editedStory, title: e.target.value })}
          />
          <FormLabel htmlFor="title">Description</FormLabel>
          <FormTextarea
            type="text"
            value={editedStory.description}
            onChange={(e) => setEditedStory({ ...editedStory, description: e.target.value })}
          />
          <FormLabel htmlFor="title">Genre</FormLabel>
          <FormInput2
            type="text"
            value={editedStory.genre}
            onChange={(e) => setEditedStory({ ...editedStory, genre: e.target.value })}
          />
          <div>
          <FormButton3 onClick={handleSaveStoryClick}>Save</FormButton3>
          <FormButton3 onClick={handleDeleteStoryClick}>Delete</FormButton3>
          <FormButton3 onClick={handleCancelStoryClick}>Cancel</FormButton3>
          </div>
          </FormSection2>
        </FormContainer3>
      ) : (
        <div>
              <ButtonContainer>
           <FormButton2 onClick={handleAddToLibraryClick}>Add to Library</FormButton2> 
          </ButtonContainer>
        <BookCoverContainer className="book-cover">
          <div>
        <ButtonContainer2>
          {isOwner && (
            <FormButton onClick={handleEditStoryClick}>Edit Story</FormButton>
          )}
           {isOwner && (
            <FormButton onClick={handleDeleteStoryClick}>Delete Story</FormButton>
           )}
           {isOwner && (
            <FormButton onClick={() => navigate(`/chapter?storyId=${story.id}`)}>Add Chapter</FormButton>
           )}
           {isOwner && (
            <FormButton onClick={() => navigate('/story-list')}>Back to Story List</FormButton>
            )}
           
          </ButtonContainer2>
          </div>
          <Aside>
            <BookCover src={story.imageURL} alt="Upload Book Cover" />
          </Aside>
          
        </BookCoverContainer>
        <FormContainer>
          <FormSection>
           <h5>Title</h5>
          {story.title && <p>{story.title}</p>}
          <h5>Description</h5>
          {story.description && <p>{story.description}</p>}
          <h5>Genre</h5>
          {story.genre && <p>{story.genre}</p>}
          </FormSection>
          </FormContainer>
          <FormContainer2>
          {chapters.length > 0 ? (
            <ChapterContainer>
               <h4>Table of Contents</h4>
               {chapters
                .slice() // Create a shallow copy of the array
                .sort((a, b) => chapters.indexOf(a) - chapters.indexOf(b)) // Sort based on index
                .map((chapter) => (
                 <ChapterItem key={chapter.id} onClick={() => navigate(`/chapter-detail/${story.id}/${chapter.id}`)}>
                  <h4>
                    {chapter.title}
                  </h4>
                </ChapterItem>
              ))}
            </ChapterContainer>
          ) : (
            <><p>No chapters available for this story.</p></>
          )}
          </FormContainer2>
        
          {/* <ButtonContainer>
          {isOwner && (
            <FormButton onClick={handleEditStoryClick}>Edit Story</FormButton>
          )}
           {isOwner && (
            <FormButton onClick={handleDeleteStoryClick}>Delete Story</FormButton>
           )}
           {isOwner && (
            <FormButton onClick={() => navigate(`/chapter?storyId=${story.id}`)}>Add Chapter</FormButton>
           )}
           {isOwner && (
            <FormButton onClick={() => navigate('/story-list')}>Back to Story List</FormButton>
            )}
           
          </ButtonContainer> */}
  
          </div>  
      )}
      <DeleteConfirmation
      isOpen={isConfirmDialogOpen}
      onCancel={handleCancelDelete}
      onConfirm={handleConfirmDelete}
    />
    </div>
    
  );
}

export default StoryDetails;

