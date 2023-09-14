import React, { useEffect, useState } from 'react';
import StoryList from './StoryList';
import { db, auth } from '../firebase'; // Import your Firestore and Firebase Authentication instances
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

function StoryContainer() {
  const [user, setUser] = useState(null);
  const [stories, setStories] = useState([]);
 

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
      // If no user is authenticated, set user state to null
      setUser(null);
    }
  };

  // Function to fetch stories from Firestore
  const fetchStories = async () => {
    try {
      // Reference the 'stories' collection in Firestore
      const storiesRef = collection(db, 'stories');

      // Fetch all documents (stories) from the collection
      const querySnapshot = await getDocs(storiesRef);

      // Initialize an array to store the fetched stories
      const fetchedStories = [];

      // Iterate through the documents and extract data
      querySnapshot.forEach((doc) => {
        const storyData = doc.data();
        fetchedStories.push({
          id: doc.id,
          title: storyData.title,
          // Add other story properties as needed
        });
      });

      console.log("stories:", fetchedStories);

      // Update the 'stories' state with the fetched data
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
      {/* Pass the 'user' and 'stories' props to the 'StoryList' component */}
      <StoryList stories={stories} user={user}  />
    </div>
  );
}

export default StoryContainer;