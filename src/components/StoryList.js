//Displays a list of stories available to read. This can include both private and public stories.
import React from 'react';
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
  font-size: 40px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
`;

const StoryImage = styled.img`
  max-width: 100%; /* Ensure the image doesn't exceed the container width */
  max-height: 100%; /* Ensure the image doesn't exceed the container height */
  width: auto; /* Allow the image to scale width proportionally */
  height: auto; /* Allow the image to scale height proportionally */
  display: block; /* Remove any extra spacing below the image */
  aspect-ratio: 6/9; /* Enforce a 16:9 aspect ratio */
`;

function StoryList({ stories, user }) {
  const navigate = useNavigate();

  const userStories = Array.isArray(stories) ? stories.filter((story) => story.userId === user.id) : [];

  const handleStoryClick = (storyId) => {
    // Programmatically navigate to the story detail page
    navigate(`/story-detail/${storyId}?imageURL=${encodeURIComponent(storyId.imageURL)}`);
  };

  return (
    <div>
      <Title>My Stories</Title>
      <StoryListContainer>
        {userStories.map((story) => (
          <StoryItem key={story.id} onClick={() => handleStoryClick(story.id)}>
            <StoryImage src={story.imageURL} alt="Story Cover" />
            <h3>{story.title}</h3>
            <p>Chapters: {story.chapters ? story.chapters.length : 0}</p>
          </StoryItem>
        ))}
      </StoryListContainer>
    </div>
  );
}

export default StoryList;


