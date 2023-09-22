import React, { useState, useEffect } from 'react';
import {db, auth } from '../firebase';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';

function formatTimestamp(timestamp) {
  const currentDate = new Date();
  const commentDate = new Date(timestamp);
  const timeDifference = currentDate - commentDate;

  // Calculate the number of seconds, minutes, hours, and years
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years === 1 ? '' : 's'} ago`;
  } else if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }
}

function Comments({ chapterId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const user = auth.currentUser; // Get the current user from Firebase Authentication

  // Function to add a new comment
  const addComment = async () => {
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
      timestamp: new Date().toISOString(),
      chapterId: chapterId,
    };

    try {
      // Add the new comment to Firestore
      const commentsRef = collection(db, 'comments');
      await addDoc(commentsRef, newComment);
      console.log('Comment added to Firestore');

      // Add the new comment to the existing comments array
      setComments([...comments, newComment]);

      // Clear the comment text input after adding a comment
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment to Firestore:', error);
    }
  };

  const fetchCommentsForChapter = async () => {
    try {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('chapterId', '==', chapterId));
      const querySnapshot = await getDocs(q);
      const commentsData = [];

      querySnapshot.forEach((doc) => {
        const comment = doc.data();
        commentsData.push(comment);
      });

      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

    // Use useEffect to fetch comments when the component mounts or when chapterId changes
    useEffect(() => {
      fetchCommentsForChapter(); // Fetch comments for the specific chapter
    }, [chapterId]);

 // Function to fetch comments from Firestore
const fetchComments = async () => {
  try {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('chapterId', '==', chapterId)); // Filter by chapterId
    const querySnapshot = await getDocs(q);
    const commentsData = [];

    querySnapshot.forEach((doc) => {
      const comment = doc.data();
      commentsData.push(comment);
    });

    setComments(commentsData);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

useEffect(() => {
  fetchComments(); // Fetch comments
}, [chapterId]);

return (
  <div>
    <h2>Comments</h2>
    <div>
      {/* Display existing comments */}
      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.text}</p>
          <p>
            <strong>{comment.author}</strong> - {formatTimestamp(comment.timestamp)}
          </p>
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

