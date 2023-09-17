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
  width: 40%;

  .diamond-icon {
    font-size: 20px; /* Adjust the size as needed */
    margin-right: 4px; /* Adjust the spacing between the icon and text */
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
  {/* Magnifying glass icon using inline SVG */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-search"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M10.742 9.344a6.5 6.5 0 1 0-1.397 1.398h0l-.001.001A6.5 6.5 0 0 0 10.742 9.344zM11 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"
    />
  </svg>
  {/* End of magnifying glass icon */}
  Search
</Link>
    </SearchContainer>
  );
}

export default Search;
