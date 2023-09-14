import React, { useState } from 'react';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firestore instance
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

function Chapter() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('storyId');
  const navigate = useNavigate(); // Add useNavigate hook

  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');

  const handleTitleChange = (event) => {
    setChapterTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setChapterContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a reference to the "chapters" subcollection within the specified story
      const storyRef = doc(db, 'stories', storyId);
      const chaptersRef = collection(storyRef, 'chapters');

      const newChapter = {
        title: chapterTitle,
        content: chapterContent,
      };

      const docRef = await addDoc(chaptersRef, newChapter);
      console.log('Chapter added with ID:', docRef.id);

      // Use navigate to go back to the story details page
      navigate(`/story-detail/${storyId}`); // Adjust the URL as needed

      // Clear the input fields after adding the chapter
      setChapterTitle('');
      setChapterContent('');
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  return (
    <form className="chapter" onSubmit={handleSubmit}>
      {/* Input field for editing the title */}
      <input
        type="text"
        value={chapterTitle}
        onChange={handleTitleChange}
        placeholder="Chapter Title"
      />
      {/* Textarea for editing the content */}
      <textarea
        value={chapterContent}
        onChange={handleContentChange}
        rows={6}
        cols={50}
        placeholder="Write your chapter content here..."
      />
      <button type="submit">Post Chapter</button>
    </form>
  );
}

export default Chapter;

