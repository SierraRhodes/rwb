//Displays a list of stories available to read. This can include both private and public stories.
import React from 'react';
import { Link } from "react-router-dom";

function StoryList({ stories, user }) {
  const userStories = Array.isArray(stories) ? stories.filter((story) => story.userId === user.id) : [];
  console.log("stories", userStories);
  console.log("user", user);

  return (
    <div>
      <h2>Your Stories</h2>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <h3><Link to={`/story-detail/${story.id}`}>{story.title}</Link></h3>
            <h4>Chapters:</h4>
            <ul>
              {story.chapters && story.chapters.map((chapter) => (
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

