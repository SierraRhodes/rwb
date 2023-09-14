//Shows the full details of a selected stories when the user clicks on a specific stories in the list.
//Such as the summary and the chapters 

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

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
            summary: storyData.summary,
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
      summary: story.summary,
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
        summary: reloadedStoryData.summary,
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
      summary: story.summary,
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
        <div>
          <input
            type="text"
            value={editedStory.title}
            onChange={(e) => setEditedStory({ ...editedStory, title: e.target.value })}
          />
          <input
            type="text"
            value={editedStory.summary}
            onChange={(e) => setEditedStory({ ...editedStory, summary: e.target.value })}
          />
          <input
            type="text"
            value={editedStory.genre}
            onChange={(e) => setEditedStory({ ...editedStory, genre: e.target.value })}
          />
          <button onClick={handleSaveStoryClick}>Save</button>
          <button onClick={handleDeleteStoryClick}>Delete</button>
          <button onClick={handleCancelStoryClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{story.title}</h2>
          <h3>Summary</h3>
          {story.summary && <p>{story.summary}</p>}
          {story.genre && <p>{story.genre}</p>}

          <h3>Chapters:</h3>
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
            <p>No chapters available for this story.</p>
          )}

          <h3>
            <Link to="/story-list">Back to Story List</Link>
          </h3>
          <h3>
            <button onClick={handleEditStoryClick}>Edit Story</button>
            <button onClick={handleDeleteStoryClick}>Delete Story</button>
          </h3>
        </div>
      )}
    </div>
  );
}

export default StoryDetails;


