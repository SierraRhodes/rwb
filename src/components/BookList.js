import React, { useState, useEffect } from 'react';
import Search from './Search'; // Import the Search component

function BookList() {
  const [stories, setStories] = useState([]); // Replace with your story data
  const [filteredStories, setFilteredStories] = useState([]); // Filtered stories based on search query

  useEffect(() => {
    // Replace 'your_api_endpoint_here' with the actual URL of your API endpoint for stories
    fetch('/stories') // Replace with the correct API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response data is an array of stories
        setStories(data);
        setFilteredStories(data); // Initialize filteredStories with all stories
      })
      .catch((error) => {
        console.error('Error fetching story data:', error);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = stories.filter((story) =>
      story.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStories(filtered);
  };

  return (
    <div>
      <h2>Story List</h2>
      <Search onSearch={handleSearch} />
      <ul>
        {filteredStories.map((story) => (
          <li key={story.id}>{story.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
