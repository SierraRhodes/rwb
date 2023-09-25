import React, { useState, useEffect } from 'react';
import {db, auth } from '../firebase';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import styled from "styled-components";

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  //border: 2px solid black;
`;

const CommentItem = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
  gap: 15px;
  // width: calc(105% - 20px);
  width: 350px;
  height: 100px; /* Fixed height */
  margin-bottom: 20px;
  overflow-y: auto !important; /* Add a vertical scrollbar when content overflows */
`;

const FormContainer3 = styled.div`
  
 //border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  background:  #f8f8f8;
`;

const Textarea = styled.textarea`
  background-color: #f8f8f8; 
  border: 2px solid #ddd; 
  border-radius: 20px; 
  margin-top: 15px;
  padding: 10px; 
  width: 100%; 
  box-sizing: border-box;
  resize: none;
  overflow-y: auto;
`;

const Icon = styled.img`
  cursor: pointer;
  margin-right: 16px; /* Add spacing between icon and text */
  margin-left: 8px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row; /* Arrange items horizontally */
  width: 100%;

  margin-right: 100px;
`;

const Button = styled.button`
background-color: black;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
font-size: 16px;
cursor: pointer;
transition: background-color 0.3s ease, color 0.3s ease;

&:hover {
  background-color: white;
  color: black;
}

margin-top: 5px;
`;

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
  <FormContainer3>
    <CommentContainer>
    <div>
      {/* Add a form for users to submit new comments */}
      <Textarea
        placeholder="Add a comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Icon src="/airplane.png" onClick={addComment}/>
    </div>
      {comments.map((comment, index) => (
        <CommentItem key={index}>
          <p>{comment.text}</p>
          <p>
            <strong>{comment.author}</strong> - {formatTimestamp(comment.timestamp)}
          </p>
        </CommentItem>
      ))}
    </CommentContainer>
  </FormContainer3>
);
}

export default Comments;

