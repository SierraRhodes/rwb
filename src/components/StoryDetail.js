//Shows the full details of a selected stories when the user clicks on a specific stories in the list.
//Such as the summary and the chapters 

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from "react-router-dom";

function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        // Reference the specific story document using the 'id' parameter
        const storyDocRef = doc(db, 'stories', id);

        // Fetch the story document
        const storyDoc = await getDoc(storyDocRef);

        if (storyDoc.exists()) {
          // Extract the story data from the document and set it in the state
          const storyData = storyDoc.data();
          setStory({
            id: storyDoc.id,
            title: storyData.title,
            summary: storyData.summary,
            genre: storyData.genre,
            // Add other story properties as needed
          });
        } else {
          // Handle the case where the story with the provided ID doesn't exist
          console.error('Story not found.');
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, [id]);

  // Add a conditional check to ensure 'story' is not null before accessing its properties
  if (!story) {
    return <div>Loading...</div>; // You can add a loading indicator if needed.
  }

  return (
    <div>
      <h2>{story.title}</h2>
      <h3>Summary</h3>
      {story.summary && <p>{story.summary}</p>}
      {story.genre && <p>{story.genre}</p>}

      <h3>Chapters:</h3>
      {story.chapters && story.chapters.length > 0 ? (
        <ul>
          {story.chapters.map((chapter) => (
            <li key={chapter.id}>
              <h4>{chapter.title}</h4>
              {chapter.content && <p>{chapter.content}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chapters available for this story.</p>
      )}

<h3><Link to="/story-list">Back to Story List</Link></h3>
<h3><Link to={`/chapter?storyId=${story.id}`}>Add Chapter</Link></h3>
    </div>
  );
}



export default StoryDetails;
