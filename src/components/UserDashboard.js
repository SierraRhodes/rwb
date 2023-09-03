//After login, this component shows the user's dashboard with options to create, read, update, and delete their stories.import React, { useState } from 'react';
import React, { useState } from 'react';
import StoryItem from './StoryItem';
import Chapter from './Chapter';

function UserDashboard() {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: 'Sample Story 1',
      content: 'This is the content of the first sample story.',
      userId: 123, // Owner's user ID
      chapters: [
        {
          id: 101,
          title: 'Chapter 1',
          content: 'This is the content of Chapter 1.',
        },
        {
          id: 102,
          title: 'Chapter 2',
          content: 'This is the content of Chapter 2.',
        },
        // ... more chapters ...
      ],
    },
    {
      id: 2,
      title: 'Sample Story 2',
      content: 'This is the content of the second sample story.',
      userId: 456, // Owner's user ID
      chapters: [
        {
          id: 201,
          title: 'Chapter A',
          content: 'This is the content of Chapter A.',
        },
        {
          id: 202,
          title: 'Chapter B',
          content: 'This is the content of Chapter B.',
        },
        // ... more chapters ...
      ],
    },
    // ... more stories ...
  ]);

  const user = {
    id: 123, // The user's ID
  };

  const handleEdit = (editedStory) => {
    const updatedStories = stories.map(story =>
      story.id === editedStory.id ? editedStory : story
    );
    setStories(updatedStories);
    // Make API request to save changes
  };

  const handleDelete = (deletedStory) => {
    const updatedStories = stories.filter(story =>
      story.id !== deletedStory.id
    );
    setStories(updatedStories);
    // Make API request to delete story
  };

  return (
    <div className="user-dashboard">
      {stories.map(story => (
        <div key={story.id}>
          <StoryItem
            story={story}
            isOwner={story.userId === user.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {story.chapters.map(chapter => (
            <Chapter key={chapter.id} chapter={chapter} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
