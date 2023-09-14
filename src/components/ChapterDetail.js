import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ChapterDetail() {
  const { storyId, chapterId } = useParams(); // Updated to include both storyId and chapterId
  const [chapter, setChapter] = useState(null);

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
        } else {
          console.error('Chapter not found.');
        }
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    };

    fetchChapter();
  }, [storyId, chapterId]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{chapter.title}</h2>
      <p>{chapter.content}</p>
      {/* Add other chapter details as needed */}
    </div>
  );
}

export default ChapterDetail;
