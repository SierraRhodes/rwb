import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(
    45deg,
    rgba(255, 204, 0, 0.9),   /* Adjust opacity (0.9) to make it paler */
    rgba(255, 153, 204, 0.9), /* Adjust opacity (0.9) to make it paler */
    rgba(204, 153, 255, 0.9), /* Adjust opacity (0.9) to make it paler */
    rgba(153, 204, 255, 0.9), /* Adjust opacity (0.9) to make it paler */
    rgba(102, 255, 204, 0.9)  /* Adjust opacity (0.9) to make it paler */
  );
  padding: 5px;
  border-radius: 20px;
  width: 40%;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  color: #ffffff;
  outline: none;
  margin-left: 10px;
  margin-right: 332px;
`;

const Button = styled.button`
background: linear-gradient(
  45deg, 
  rgba(153, 204, 255, 0.9), /* Adjust opacity (0.9) to make it paler */
  rgba(102, 255, 204, 0.9)
);
  border-radius: 40%;
  width: 30px;
  height: 30px;
  border: none;
  position: absolute;
  //top: 1%; /* Adjust the top and left values as needed */
  bottom: 22px;
  
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
  <div>
    <Button>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-box"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M11.25 1a.75.75 0 0 1 .75.75V3h2.5a.5.5 0 0 1 0 1H12v3.75a2.25 2.25 0 0 1-4.5 0V4H.75a.75.75 0 0 1-.75-.75V1a.75.75 0 0 1 .75-.75h13.5zM2 7.25A1.25 1.25 0 0 1 3.25 6h9.5A1.25 1.25 0 0 1 14 7.25V14H2V7.25z"
    />
  </svg>
  </Button>
</div>
  {/* End of magnifying glass icon */}
  
</Link>
    </SearchContainer>
  );
}

export default Search;
