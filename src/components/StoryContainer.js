import React, { useEffect, useState } from 'react';
import StoryList from './StoryList';
import {useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore'; 
function StoryContainer() {
  const [user, setUser] = useState(null);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
 

  // Function to fetch user data
  const fetchUser = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // If a user is authenticated, set the user state
      setUser({
        id: currentUser.uid,
        displayName: currentUser.displayName,
        // Add other user data as needed
      });
    } else {
      if (!auth.currentUser) {
        navigate(`/login`);
        return;
      }
      setUser(null);
    }
  };

  // Function to fetch stories from Firestore
 // Function to fetch stories from Firestore with chapters
const fetchStories = async () => {
  try {
    const storiesRef = collection(db, 'stories');
    const querySnapshot = await getDocs(storiesRef);
    const fetchedStories = [];

    for (const doc of querySnapshot.docs) {
      const storyData = doc.data();
      const storyId = doc.id;

      // Fetch chapters for the current story
      const chaptersRef = collection(db, 'stories', storyId, 'chapters');
      const chaptersSnapshot = await getDocs(chaptersRef);
      const fetchedChapters = [];

      chaptersSnapshot.forEach((chapterDoc) => {
        const chapterData = chapterDoc.data();
        fetchedChapters.push({
          id: chapterDoc.id,
          title: chapterData.title,
          imageURL: storyData.imageURL,
          // Add other chapter properties as needed
        });
      });

      fetchedStories.push({
        id: storyId,
        title: storyData.title,
        userId: storyData.userId,
        chapters: fetchedChapters,
        imageURL: storyData.imageURL, 
      });
    }

    setStories(fetchedStories);
  } catch (error) {
    console.error('Error fetching stories:', error);
  }
};


  useEffect(() => {
    fetchUser(); // Fetch user data
    fetchStories(); // Fetch stories
  }, []);
  return (
    <div>
      {/* Passes the 'user' and 'stories' props to the 'StoryList' component */}
      <StoryList stories={stories} user={user} />
    </div>
    
  );
}

export default StoryContainer;
