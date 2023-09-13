//A form for creating or updating stories. It may contain fields like title, content, and privacy settings.
import React, { useState } from 'react';
import { db, auth } from '../firebase'; // Import your Firestore instance
import { collection, addDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

function StoryForm() {


  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [genre, setGenre] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const user = auth.currentUser;
    const newStory = {
      title,
      summary,
      genre,
      tags: tags.split(',').map(tag => tag.trim()),
      userId: user.uid,
    };

    try {
      const docRef = await addDoc(collection(db, 'stories'), newStory);
      console.log('Document written with ID: ', docRef.id);
      setSuccessMessage(`Story created succesfully!`)
      navigate('/story-list');
    } catch (error) {
      console.error('Error creating story:', error);
      // Display error message to the user 
    }
  };

  return (
    <div>
       {successMessage && <div className="success-message">{successMessage}</div>}
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="summary">Summary:</label>
        <textarea
          id="summary"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
        />
      </div>
      <button type="submit">Create Story</button>
    </form>
    </div>

  );
}

export default StoryForm;
