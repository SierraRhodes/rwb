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
  width: calc(25% - 20px); /* 25% width for each story item with 20px gap */
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  //border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.h2`
  text-align: center; /* Center the text horizontally */
  margin: 20px 0; /* Center the text vertically with some top and bottom margin */
  font-family: Arial, sans-serif; 
`;



function StoryList({ stories, user }) {
  const navigate = useNavigate();

  const userStories = Array.isArray(stories) ? stories.filter((story) => story.userId === user.id) : [];
  console.log('stories', userStories);
  console.log('user', user);

  const handleStoryClick = (storyId) => {
    // Programmatically navigate to the story detail page
    navigate(`/story-detail/${storyId}`);
  };

  return (
    <div>
      <Title>My Stories</Title>
      <StoryListContainer>
        {stories.map((story) => (
          <StoryItem
            key={story.id}
            onClick={() => handleStoryClick(story.id)}
          >
            <h3>{story.title}</h3>
            <h4>Chapters:</h4>
            <ul>
              {story.chapters &&
                story.chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <h5>{chapter.title}</h5>
                  </li>
                ))}
            </ul>
          </StoryItem>
        ))}
      </StoryListContainer>
    </div>
  );
}

export default StoryList;

