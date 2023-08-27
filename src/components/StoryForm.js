//A form for creating or updating stories. It may contain fields like title, content, and privacy settings.
import React, { useState } from 'react';
import axios from 'axios';

function StoryForm(){
  <h1>Create a Story</h1>
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  //Add genre
  //Change content to summary

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStory = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    try {
      const response = await axios.post('/api/stories', newStory); // Adjust the API endpoint URL
      console.log('Story created successfully:', response.data);
      // Display success message to user
    } catch (error) {
      console.error('Error creating story:', error);
      // Display error message to the user 
    }
  };

  return (
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
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
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
  );
}

export default StoryForm;
