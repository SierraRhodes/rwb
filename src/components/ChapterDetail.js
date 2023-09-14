import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';


function ChapterDetail() {
  const { storyId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editedChapter, setEditedChapter] = useState({}); // Store edited chapter data
  const navigate = useNavigate();

  useEffect(() => {
    const storyDocRef = doc(db, 'stories', storyId);
    const chapterDocRef = doc(storyDocRef, 'chapters', chapterId);

    const fetchChapter = async () => {
      try {
        const chapterDoc = await getDoc(chapterDocRef);

        if (chapterDoc.exists()) {
          const chapterData = chapterDoc.data();
          setChapter({
            id: chapterDoc.id,
            title: chapterData.title,
            content: chapterData.content,
            // Add other chapter properties as needed
          });
          // Initialize editedChapter with the current chapter data
          setEditedChapter({
            title: chapterData.title,
            content: chapterData.content,
          });
        } else {
          console.error('Chapter not found.');
        }
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    };

    fetchChapter();
  }, [storyId, chapterId]);

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveClick = async () => {
    try {
      const chapterDocRef = doc(db, 'stories', storyId, 'chapters', chapterId);
      await updateDoc(chapterDocRef, editedChapter); // Use editedChapter data for update

      setIsEditing(false); // Disable editing mode after saving

      // Reload the chapter data after saving (optional)
      // You can also perform a different action after saving
      const reloadedChapterDoc = await getDoc(chapterDocRef);
      const reloadedChapterData = reloadedChapterDoc.data();
      setChapter({
        id: reloadedChapterDoc.id,
        title: reloadedChapterData.title,
        content: reloadedChapterData.content,
      });
    } catch (error) {
      console.error('Error updating chapter:', error);
    }
  };

  const handleCancelClick = () => {
    // Reset editedChapter and exit editing mode when canceled
    setEditedChapter({
      title: chapter.title,
      content: chapter.content,
    });
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this chapter?');

    if (confirmDelete) {
      try {
        const chapterDocRef = doc(db, 'stories', storyId, 'chapters', chapterId);
        await deleteDoc(chapterDocRef);

        // Redirect or perform any other actions after deleting
        navigate(`/story-detail/${storyId}`);
      } catch (error) {
        console.error('Error deleting chapter:', error);
      }
    }
  };

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedChapter.title}
            onChange={(e) => setEditedChapter({ ...editedChapter, title: e.target.value })}
          />
          <textarea
            value={editedChapter.content}
            onChange={(e) => setEditedChapter({ ...editedChapter, content: e.target.value })}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleDeleteClick}>Delete</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{chapter.title}</h2>
          <p>{chapter.content}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default ChapterDetail;

