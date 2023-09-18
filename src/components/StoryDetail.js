//Shows the full details of a selected stories when the user clicks on a specific stories in the list.
//Such as the description and the chapters 

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


// Create a styled component for the form container
const FormContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Align items to the top */
  padding: 20px; /* Add padding around the entire form container */
  //border: 2px black solid;
  //background: black;
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
  width: auto;
  height: 100%;
`;

const BookCoverContainer = styled.div`
  margin-left: 50px;
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
  margin-right: 10px; /* Add margin to space out the buttons */

  &:hover {
    background-color: #0056b3;
  }
`;


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  gap: 10px; /* Add spacing between the buttons */
`;

function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStory, setEditedStory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyDocRef = doc(db, 'stories', id);
        const storyDoc = await getDoc(storyDocRef);

        if (storyDoc.exists()) {
          const storyData = storyDoc.data();
          setStory({
            id: storyDoc.id,
            title: storyData.title,
            description: storyData.description,
            genre: storyData.genre,
          });

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

  const handleEditStoryClick = () => {
    setIsEditing(true);
    // Initialize editedStory with the current story data
    setEditedStory({
      title: story.title,
      description: story.description,
      genre: story.genre,
    });
  };

  const handleSaveStoryClick = async () => {
    try {
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
      });
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  const handleCancelStoryClick = () => {
    setIsEditing(false);
    // Reset editedStory to the current story data
    setEditedStory({
      title: story.title,
      description: story.description,
      genre: story.genre,
    });
  };

  const handleDeleteStoryClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this story?');

    if (confirmDelete) {
      try {
        const storyDocRef = doc(db, 'stories', id);
        await deleteDoc(storyDocRef);
        // Redirect or perform any other actions after deleting
        navigate('/story-list');
      } catch (error) {
        console.error('Error deleting story:', error);
      }
    }
  };

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isEditing ? (
          <FormContainer>
          <BookCoverContainer className="book-cover">
          <Aside>
            <BookCover src="crystaltexture.webp" alt="Upload Book Cover" /> {/* Replace with the actual image path */}
          </Aside>
          </BookCoverContainer>
          <FormSection>
          <FormLabel htmlFor="title">Title</FormLabel>
          <FormInput
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
          <FormInput
            type="text"
            value={editedStory.genre}
            onChange={(e) => setEditedStory({ ...editedStory, genre: e.target.value })}
          />
          <div>
          <FormButton onClick={handleSaveStoryClick}>Save</FormButton>
          <FormButton onClick={handleDeleteStoryClick}>Delete</FormButton>
          <FormButton onClick={handleCancelStoryClick}>Cancel</FormButton>
          </div>
          </FormSection>
        </FormContainer>
      ) : (
        <div>
        <BookCoverContainer className="book-cover">
          <Aside>
            <BookCover src="crystaltexture.webp" alt="Upload Book Cover" />
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

          <h5>Chapters</h5>
          {chapters.length > 0 ? (
            <ul>
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <h4>
                    <Link to={`/chapter-detail/${story.id}/${chapter.id}`}>{chapter.title}</Link>
                  </h4>
                </li>
              ))}
            </ul>
          ) : (
            <><p>No chapters available for this story.</p></>
          
          )}
          </FormSection>
          <ButtonContainer>
            <FormButton onClick={handleEditStoryClick}>Edit Story</FormButton>
            <FormButton onClick={handleDeleteStoryClick}>Delete Story</FormButton>
            <FormButton onClick={() => navigate(`/chapter?storyId=${story.id}`)}>Add Chapter</FormButton>
            <FormButton onClick={() => navigate('/story-list')}>Back to Story List</FormButton>
          </ButtonContainer>
          </FormContainer>  
          </div>  
      )}
    </div>
  );
}

export default StoryDetails;

