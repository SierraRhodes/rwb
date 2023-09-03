import React, { useState } from 'react';

function Chapter({ chapter }) {
  const { title } = chapter;

  const [content, setContent] = useState(chapter.content);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="chapter">
      <h4>{title}</h4>
      <textarea
        value={content}
        onChange={handleContentChange}
        rows={6}
        cols={50}
        placeholder="Write your chapter content here..."
      />
    </div>
  );
}

export default Chapter;