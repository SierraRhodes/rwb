import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StoryListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StoryItem = styled.div`
  width: calc(25% - 20px); /* 25% width for each story item with 20px gap */
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.h2`
  text-align: center; /* Center the text horizontally */
  margin: 20px 0; /* Center the text vertically with some top and bottom margin */
  font-family: Arial, sans-serif;
`;



function SearchResults( ) {
  const navigate = useNavigate();
  const { q } = useParams(); // Get the search query from the URL parameter
  console.log('Search query:', q);
  const [searchResults, setSearchResults] = useState([]);

  const handleStoryClick = (resultId) => {
    // Programmatically navigate to the story detail page
    navigate(`/story-detail/${resultId}`);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (q) {
          const storiesRef = collection(db, 'stories',); // Replace with your Firestore collection name

          // Create a query based on the search query
          const qRef = query(storiesRef, where('title', '>=', q));

          const querySnapshot = await getDocs(qRef);

          const results = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push(data);
          });

          setSearchResults(results);
          console.log('results', results);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [q]);

  return (
    <div>
      <Title>Search Results for "{q}"</Title>
      <StoryListContainer>
        {searchResults.map((result) => (
           <StoryItem key={result.id} onClick={() => handleStoryClick(result.id)}>
             <h3>{result.title}</h3>
             <p>Chapters: {result.chapters ? result.chapters.length : 0}</p>
         </StoryItem>
        ))}
      </StoryListContainer>
    </div>
  );
}

export default SearchResults;
