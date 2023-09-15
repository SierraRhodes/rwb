import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(
    45deg,
    #ffcc00,
    #ff99cc,
    #cc99ff,
    #99ccff,
    #66ffcc
  ); /* Apply a gradient background */
  padding: 5px;
  border-radius: 20px;

  .diamond-icon {
    font-size: 20px; /* Adjust the size as needed */
    margin-right: 8px; /* Adjust the spacing between the icon and text */
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  color: #ffffff;
  outline: none;
  margin-left: 10px;
`;

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');


  return (
    <SearchContainer>
      {/* <i className="bi bi-gem diamond-icon "></i> */}
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {/* Add a Link to SearchResults */}
      <Link to={`/search/${searchQuery}`} className="search-link">
        Search
      </Link>
    </SearchContainer>
  );
}

export default Search;
