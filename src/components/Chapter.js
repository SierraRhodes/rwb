import React, { useState } from 'react';

function Chapter({ chapter, onUpdateChapter }) {
  // Destructure the title and content from the chapter prop
  const { id, title, content } = chapter || { id: '', title: '', content: '' };

  // State to store the title and content
  const [chapterTitle, setChapterTitle] = useState(title);
  const [chapterContent, setChapterContent] = useState(content);

  // Handler for title changes
  const handleTitleChange = (event) => {
    setChapterTitle(event.target.value);
  };

  // Handler for content changes
  const handleContentChange = (event) => {
    setChapterContent(event.target.value);
  };

  // Handler for submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new chapter object with the updated title and content
    const updatedChapter = {
      id,
      title: chapterTitle,
      content: chapterContent,
    };

    // Call the onUpdateChapter callback to update the chapter
    onUpdateChapter(updatedChapter);
  };

  return (
    <form className="chapter" onSubmit={handleSubmit}>
      {/* Input field for editing the title */}
      <input
        type="text"
        value={chapterTitle}
        onChange={handleTitleChange}
        placeholder="Chapter Title"
      />
      {/* Textarea for editing the content */}
      <textarea
        value={chapterContent}
        onChange={handleContentChange}
        rows={6}
        cols={50}
        placeholder="Write your chapter content here..."
      />
      <button type="submit">Update Chapter</button>
    </form>
  );
}

export default Chapter;

