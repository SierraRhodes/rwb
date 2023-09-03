//Represents a single story in the list. It displays basic information like title and content and may include options for editing or deleting the story (if the user is the owner).
import React from 'react';

function StoryItem({ story, isOwner, onEdit, onDelete }) {
  const { title, content } = story;

  return (
    <React.Fragment>
      <div className="story-item">
        <h3>{title}</h3>
        <p>{content}</p>

        {isOwner && (
          <div className="options">
            <button onClick={() => onEdit(story)}>Edit</button>
            <button onClick={() => onDelete(story)}>Delete</button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default StoryItem;
