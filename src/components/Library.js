import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'; // Import doc and getDoc

const LibraryContainer = styled.div`
  width: ${props => (props.expanded ? '300px' : '50px')};
  height: 84.5%;
  background-color: #333;
  transition: width 0.3s;
  overflow: hidden;
  position: absolute;
  right: 0;
`;

function Library() {
  const [userStories, setUserStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLibrary = async () => {
      // Check if the user is authenticated
      if (!auth.currentUser) {
        console.log('Login!');
        return;
      }

      const libraryQuery = collection(db, 'users', auth.currentUser.uid, 'library');

      try {
        const querySnapshot = await getDocs(libraryQuery);
        const userLibraryData = [];

        for (const docRef of querySnapshot.docs) {
          const storyId = docRef.id; // Use the library document ID as the storyId

          // Reference to the story document in the "stories" collection
          const storyRef = doc(db, 'stories', storyId);
          const storySnapshot = await getDoc(storyRef);

          console.log(storyId);

          if (storySnapshot.exists()) {
            const storyData = storySnapshot.data();
            userLibraryData.push({
              id: storyId,
              title: storyData.title, // Get the story title
              // Include other story details as needed
              // For example, if you have "userId," "chapters," "imageURL," add them here
            });
          } else {
            // Handle the case where no matching story was found
            console.log('No matching story found for library document:', storyId);
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
      <h2>Your Library</h2>
      <ul>
        {userStories.map((story) => (
          <li key={story.id}>
            <h3>{story.title}</h3>
            {/* Display other story details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Library;









// const Library = () => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleLibrary = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <AppContainer>
//       <LibraryContainer expanded={expanded}>
//         {expanded && (
//           <div>
//            <li>Book 1</li>
//            <li>Book 2</li>
//            <li>Book 3</li>
//           </div>
//         )}
//         <ToggleButton onClick={toggleLibrary}>
//           {expanded ? 'Collapse' : 'Library'}
//         </ToggleButton>
//       </LibraryContainer>
//     </AppContainer>
//   );
// };

//export default Library;

