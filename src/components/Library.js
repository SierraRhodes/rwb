import React, { useState } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
`;

const LibraryContainer = styled.div`
  width: ${props => (props.expanded ? '300px' : '50px')};
  height: 84.5%;
  background-color: #333;
  transition: width 0.3s;
  overflow: hidden;
  position: absolute;
  right: 0;
`;

const ToggleButton = styled.button`
  width: 100%;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
`;

const Library = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleLibrary = () => {
    setExpanded(!expanded);
  };

  return (
    <AppContainer>
      <LibraryContainer expanded={expanded}>
        {expanded && (
          <div>
           <li>Book 1</li>
           <li>Book 2</li>
           <li>Book 3</li>
          </div>
        )}
        <ToggleButton onClick={toggleLibrary}>
          {expanded ? 'Collapse' : 'Library'}
        </ToggleButton>
      </LibraryContainer>
    </AppContainer>
  );
};

export default Library;

