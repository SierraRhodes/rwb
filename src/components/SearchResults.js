import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  width: calc(17% - 20px); /* 25% width for each story item with 20px gap */
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #fff;
  color: #333;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2), 0 0 30px rgba(255, 255, 255, 0.2);
  }

  h3 {
    font-size: 24px; /* Increase title font size */
    font-weight: bold; /* Make title bold */
    margin-bottom: 10px; /* Add some space below the title */
    color: #333; /* Choose a different color for the title */
  }
`;

const Title = styled.h2`
  text-align: center;
  margin: 20px 0;
  font-family: Arial, sans-serif;
`;

const StoryImage = styled.img`
  width: 200px;
  height: 300px;
`;

function SearchResults() {
  const navigate = useNavigate();
  const { q } = useParams();
  console.log('Search query:', q);
  const [searchResults, setSearchResults] = useState([]);

  const handleStoryClick = (resultId) => {
    navigate(`/story-detail/${resultId}`);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (q) {
          const storiesRef = collection(db, 'stories');
          const qRef = query(storiesRef, where('title', '>=', q));
          const querySnapshot = await getDocs(qRef);

          const results = [];
          for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const storyId = doc.id;
            const chaptersRef = collection(db, 'stories', storyId, 'chapters');
            const chaptersSnapshot = await getDocs(chaptersRef);
            const chapters = chaptersSnapshot.docs.map((chapterDoc) => chapterDoc.data());
            
            results.push({
              id: storyId,
              title: data.title,
              imageURL: data.imageURL,
              genre: data.genre,
              chapters: chapters,
            });
          }

          setSearchResults(results);
          console.log('results', results);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  

    fetchSearchResults();
  }, [q]);
  console.log('results', searchResults);


  return (
    <div>
      <Title>Search Results for "{q}"</Title>
      <StoryListContainer>
        {searchResults.map((result) => (
          <StoryItem key={result.id} onClick={() => handleStoryClick(result.id)}>
            <StoryImage src={result.imageURL} alt="Story Cover" />
            <h3>{result.title}</h3>
            <p>Genre: {result.genre}</p>
            <p>Chapters: {result.chapters ? result.chapters.length : 0}</p>
          </StoryItem>
        ))}
      </StoryListContainer>
    </div>
  );
}

export default SearchResults;
