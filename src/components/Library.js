import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';

const StoryListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StoryItem = styled.div`
  width: calc(17% - 20px); /* 25% width for each story item with 20px gap */
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #fff;
  color: #333;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2), 0 0 30px rgba(255, 255, 255, 0.2);
  }

  h4 {
    font-size: 24px; /* Increase title font size */
    font-weight: bold; /* Make title bold */
    margin-bottom: 10px; /* Add some space below the title */
    color: #333; /* Choose a different color for the title */
  }

  // /* Place the Delete button at the bottom */
  // .delete-button {
  //   margin-top: auto;
  // }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: white;
    color: black;
  }
  margin-top: 5px;
`

const Title = styled.h2`
  text-align: center;
  margin: 20px 0;
  font-family: Arial, sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
`;

const StoryImage = styled.img`
  max-width: 100%; /* Ensure the image doesn't exceed the container width */
  max-height: 100%; /* Ensure the image doesn't exceed the container height */
  width: auto; /* Allow the image to scale width proportionally */
  height: auto; /* Allow the image to scale height proportionally */
  display: block; /* Remove any extra spacing below the image */
  aspect-ratio: 6/9; /* Enforce a 16:9 aspect ratio */
`;


function Library() {
  const [userStories, setUserStories] = useState([]);
  const navigate = useNavigate();

  const handleStoryClick = (resultId) => {
    navigate(`/story-detail/${resultId}`);
  };

  function truncateDescription(description, maxLength) {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substr(0, maxLength) + '...';
  }
  

  useEffect(() => {
    // Fetching user's library with chapters
// Fetching user's library with chapters
const fetchUserLibrary = async () => {
  if (!auth.currentUser) {
    navigate(`/login`);
    return;
  }

  const libraryQuery = collection(db, 'users', auth.currentUser.uid, 'library');

  try {
    const querySnapshot = await getDocs(libraryQuery);
    const userLibraryData = [];

    for (const docRef of querySnapshot.docs) {
      const storyId = docRef.id;
      const storyRef = doc(db, 'stories', storyId);

      try {
        const storySnapshot = await getDoc(storyRef);

        if (storySnapshot.exists()) {
          const storyData = storySnapshot.data();

          // Fetch chapters for the specific story
          const chaptersQuery = collection(storyRef, 'chapters');
          const chaptersSnapshot = await getDocs(chaptersQuery);
          const chapters = chaptersSnapshot.docs.map((chapterDoc) => chapterDoc.data());
          
          console.log(chaptersQuery);
          console.log('chapters', chaptersSnapshot);

          userLibraryData.push({
            id: storyId,
            title: storyData.title,
            genre: storyData.genre,
            imageURL: storyData.imageURL,
            description: storyData.description,
            chapters: chapters,
          });
        } else {
          console.log('No matching story found for library document:', storyId);
        }
      } catch (error) {
        console.error('Error fetching story data:', error);
      }
    }

    setUserStories(userLibraryData);
    console.log('stories', userLibraryData);
  } catch (error) {
    console.error('Error fetching user library:', error);
  }
};


    fetchUserLibrary();
  }, []);

  const handleDeleteStory = async (storyId) => {
    try {
      // Remove the story from the user's library
      await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'library', storyId));
  
      // Update the state to remove the deleted story from the user's library
      setUserStories((prevUserStories) => prevUserStories.filter((story) => story.id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  return (
    <div>
      <Title> My Library</Title>
      <StoryListContainer>
        {userStories.map((story) => (
          <StoryItem key={story.id} onClick={() => handleStoryClick(story.id)}>
            <StoryImage src={story.imageURL} alt="Story Cover" />
            <h4>{story.title}</h4>
            <p>Chapters: {story.chapters ? story.chapters.length : 0}</p>
            {/* <p>{truncateDescription(story.description, 30)}</p> */}
            <Button id="delete-button" onClick={() => handleDeleteStory(story.id)}>Remove</Button>
          </StoryItem>
        ))}
      </StoryListContainer>
    </div>
  );
}

export default Library;


