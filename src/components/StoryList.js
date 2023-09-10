//Displays a list of stories available to read. This can include both private and public stories.
import React from 'react';

function StoryList({ stories, user }) {
  const userStories = Array.isArray(stories) ? stories.filter((story) => story.userId === user.id) : [];

  return (
    <div>
      <h2>Your Stories</h2>
      <ul>
        {userStories.map((story) => (
          <li key={story.id}>
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <h4>Chapters:</h4>
            <ul>
              {story.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <h5>{chapter.title}</h5>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoryList;
