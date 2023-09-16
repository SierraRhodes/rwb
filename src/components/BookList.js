import React, { useState, useEffect } from 'react';
import Search from './Search'; 

function BookList() {
  const [stories, setStories] = useState([]); 
  const [filteredStories, setFilteredStories] = useState([]); // Filtered stories based on search query

  useEffect(() => {
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
