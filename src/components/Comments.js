// Comments.js
// Comments.js

import React, { useState } from 'react';
import { auth } from '../firebase'; // Import the Firebase auth object

function Comments() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const user = auth.currentUser; // Get the current user from Firebase Authentication

  // Function to add a new comment
  const addComment = () => {
    if (!user) {
      alert('Please sign in to add a comment.');
      return;
    }

    if (!commentText) {
      alert('Please enter a comment.');
      return;
    }

    const newComment = {
      text: commentText,
      author: user.displayName, // Use the user's display name
      timestamp: new Date().toLocaleString(),
    };

    // Add the new comment to the existing comments array
    setComments([...comments, newComment]);

    // Clear the comment text input after adding a comment
    setCommentText('');
  };

  return (
    <div>
      <h2>Comments</h2>
      <div>
        {/* Display existing comments */}
        {comments.map((comment, index) => (
          <div key={index}>
            <p><strong>{comment.author}</strong> - {comment.timestamp}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div>
        {/* Add a form for users to submit new comments */}
        <textarea
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default Comments;

