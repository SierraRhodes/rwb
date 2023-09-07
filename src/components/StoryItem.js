// StoryItem.js
import React from 'react';

function StoryItem({ story }) {
  return (
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
  );
}

export default StoryItem;
