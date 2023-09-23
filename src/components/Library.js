import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const StoryListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StoryItem = styled.div`
  width: calc(17% - 20px); 
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
`;

const Title = styled.h2`
  text-align: center;
  margin: 20px 0;
  font-family: Arial, sans-serif;
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

  return (
    <div>
      <Title>Your Library</Title>
      <StoryListContainer>
        {userStories.map((story) => (
          <StoryItem key={story.id} onClick={() => handleStoryClick(story.id)}>
            <StoryImage src={story.imageURL} alt="Story Cover" />
            <h4>{story.title}</h4>
            <p>Chapters: {story.chapters ? story.chapters.length : 0}</p>
            <p>{truncateDescription(story.description, 30)}</p>
          </StoryItem>
        ))}
      </StoryListContainer>
    </div>
  );
}

export default Library;


