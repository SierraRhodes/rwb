import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const TitleInput = styled.input`
  margin-bottom: 20px; /* Add space between the title input and the editor */
  font-size: 18px; /* Increase font size for the title input */
  padding: 10px;
  border: none; /* Remove the border when the input is focused */

`;

const TitleInput2 = styled.input`
  margin-bottom: 20px;
  font-size: 18px;
  padding: 10px;
  display: flex;
  text-align: center; /* Center-align the text */
  border: none;
`;

const StyledQuillEditor = styled(ReactQuill)`
  .ql-container {
    border: none; /* Remove the border around the editor container */
  }

  .ql-toolbar {
    border: none; /* Remove the border around the editor tools */
  }

  .ql-editor {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    max-width: 100%;
    //padding: 20px;
    width: 800px;
    height: 600px;
    //border: none; /* Remove the border around the editor content */
  }
`;

const StyledQuillEditor2 = styled(ReactQuill)`
  .ql-container {
    border: none; /* Remove the border around the editor container */
  }

  .ql-toolbar {
    display: none;
    border: none; /* Remove the border around the editor tools */
  }

  .ql-editor {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    max-width: 100%;
    //padding: 20px;
    width: 800px;
    height: 600px;
    //border: none; /* Remove the border around the editor content */
  }
`;

const SeparatorLine = styled.hr`
  width: 60%;
  border: 2px solid #ddd; /* Add a 1px solid gray border as the separator */
  margin: 5px 0; /* Add some vertical spacing around the separator */
`;

const FormButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  
  transition: background-color 0.3s ease, transform 0.2s ease; /* Add a smooth transition for background color and transform */

  display: flex-right; /* Use flex to center the content both horizontally and vertically */
  justify-content: center;


  &:hover {
    background-color: #0056b3;
    transform: scale(1.05); /* Add a slight scale effect on hover */
  }
  
  &:active {
    transform: scale(0.95); /* Add a scale effect when the button is clicked */
  }
`;

const FormButtonContainer = styled.div`
  padding: 20px 0; /* Add vertical spacing above and below the buttons */
  display: flex;
  flex-direction: row; /* Stack the buttons vertically */
  align-items: center; /* Center-align the buttons horizontally */
  gap: 10px;
`;

function ChapterDetail() {
  const { storyId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editedChapter, setEditedChapter] = useState({}); // Store edited chapter data
  const [isOwner, setIsOwner] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storyDocRef = doc(db, 'stories', storyId);
    const chapterDocRef = doc(storyDocRef, 'chapters', chapterId);

    const fetchChapter = async () => {
      try {
        const chapterDoc = await getDoc(chapterDocRef);

        if (chapterDoc.exists()) {
          const chapterData = chapterDoc.data();
          setChapter({
            id: chapterDoc.id,
            title: chapterData.title,
            content: chapterData.content,
            // Add other chapter properties as needed
          });
          // Initialize editedChapter with the current chapter data
          setEditedChapter({
            title: chapterData.title,
            content: chapterData.content,
          });

          // Check if the current user is the owner
          const storyDoc = await getDoc(storyDocRef);
          if (storyDoc.exists()) {
            const storyData = storyDoc.data();
            if (auth.currentUser && auth.currentUser.uid === storyData.userId) {
              setIsOwner(true);
            }
          }
        } else {
          console.error('Chapter not found.');
        }
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    };

    fetchChapter();
  }, [storyId, chapterId]);

  const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html);
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveClick = async () => {
    try {
      const chapterDocRef = doc(db, 'stories', storyId, 'chapters', chapterId);
      await updateDoc(chapterDocRef, editedChapter); // Use editedChapter data for update

      setIsEditing(false); // Disable editing mode after saving

      // Reload the chapter data after saving (optional)
      // You can also perform a different action after saving
      const reloadedChapterDoc = await getDoc(chapterDocRef);
      const reloadedChapterData = reloadedChapterDoc.data();
      setChapter({
        id: reloadedChapterDoc.id,
        title: reloadedChapterData.title,
        content: reloadedChapterData.content,
      });
    } catch (error) {
      console.error('Error updating chapter:', error);
    }
  };

  const handleCancelClick = () => {
    // Reset editedChapter and exit editing mode when canceled
    setEditedChapter({
      title: chapter.title,
      content: chapter.content,
    });
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this chapter?');

    if (confirmDelete) {
      try {
        const chapterDocRef = doc(db, 'stories', storyId, 'chapters', chapterId);
        await deleteDoc(chapterDocRef);

        // Redirect or perform any other actions after deleting
        navigate(`/story-detail/${storyId}`);
      } catch (error) {
        console.error('Error deleting chapter:', error);
      }
    }
  };

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <FormContainer>
          <TitleInput
            type="text"
            value={editedChapter.title}
            onChange={(e) => setEditedChapter({ ...editedChapter, title: e.target.value })}
          />
          <SeparatorLine/>
          <StyledQuillEditor
            value={editedChapter.content}
            onChange={(value) => setEditedChapter({ ...editedChapter, content: value })}
          />
          <FormButtonContainer>
          <FormButton onClick={handleSaveClick}>Save</FormButton>
          <FormButton onClick={handleDeleteClick}>Delete</FormButton>
          <FormButton onClick={handleCancelClick}>Cancel</FormButton>
          </FormButtonContainer>
        </FormContainer>
      ) : (
        <FormContainer>
          <TitleInput2
          value={chapter.title}
          readOnly={true} // Prevent editing the title
        />
        <SeparatorLine />
          <StyledQuillEditor2
            readOnly={true} // Prevent editing when not in editing mode
            value={chapter.content}
          />
          {isOwner && (
          <FormButton onClick={handleEditClick}>Edit</FormButton>
          )}
        </FormContainer>
      )}
    </div>
  );
}

export default ChapterDetail;

