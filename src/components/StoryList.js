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
  width: calc(18% - 20px); /* 25% width for each story item with 20px gap */
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

const StoryImage = styled.img`
  width: 200px; /* Set the width to 100px */
  height: 300px; /* Set the height to 200px */
`;

function StoryList({ stories, user }) {
  const navigate = useNavigate();

  const userStories = Array.isArray(stories) ? stories.filter((story) => story.userId === user.id) : [];
  console.log("what stories", stories);
  console.log('stories', userStories);
  console.log('user', user);

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


