// Parent component that wraps both StoryForm and StoryList
import React, { useState, useEffect } from 'react';
import StoryForm from './StoryForm';
import StoryList from './StoryList';
import { db, auth } from '../firebase'; // Import your Firestore instance
import { collection, addDoc, getDocs } from 'firebase/firestore'; 

function UpdateStoryList() {
  const [stories, setStories] = useState([]);
  const user = auth.currentUser; // Replace with your user information

  useEffect(() => {
    // Load stories when the component mounts
    const loadStories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'stories'));
        const loadedStories = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Ensure that 'chapters' is always defined as an array
          data.chapters = data.chapters || [];
          loadedStories.push({ id: doc.id, ...data });
        });
        setStories(loadedStories);
      } catch (error) {
        console.error('Error loading stories:', error);
      }
    };
  
    loadStories();
  }, []);
  
  const addStoryToList = (newStory) => {
    // Initialize 'chapters' property if it's undefined
    newStory.chapters = newStory.chapters || [];
    // Add the new story to the list of stories
    setStories((prevStories) => [...prevStories, newStory]);
  };

  return (
    <div>
      <StoryForm addStoryToList={addStoryToList} />
      <StoryList stories={stories} user={user} />
    </div>
  );
}

export default UpdateStoryList;
