import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 20px;
  position: relative;
`;

const Logo = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  display: inline-block;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px;
  border-radius: 20px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  color: #ffffff;
  outline: none;
  margin-left: 10px;
`;

const NavItems = styled.div`
  display: flex;
  gap: 20px;
`;


const NavItem = styled.div`
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const Header = () => {
  const [showWriteDropdown, setShowWriteDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleWriteDropdown = () => {
    console.log("toggleWriteDropdown called");
    setShowWriteDropdown(prevState => !prevState);
  };

  const handleWriteOptionClick = (option) => {
    console.log("handleWriteOptionClick called with option:", option);
    setSelectedOption(option);
    toggleWriteDropdown();

    
  };
  return (
    <Navbar>
      <Logo>RWB</Logo>
      <SearchContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M6.571 12.586a6.5 6.5 0 1 0-1.985-1.985L.5 13.071l1.414 1.414 10.1-10.1a6.5 6.5 0 0 0-1.443-1.44l-10.1 10.1L.5 13.071z" />
        </svg>
        <SearchInput type="text" placeholder="Search..." />
      </SearchContainer>
      <NavItems>
        <NavItem onClick={toggleWriteDropdown}>Write</NavItem>
        <NavItem>Live Streams</NavItem>
        <NavItem>Connect</NavItem>
        <NavItem>Log In</NavItem>
        <NavItem>Log Out</NavItem>
      </NavItems>
      <Dropdown show={showWriteDropdown}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleWriteOptionClick('create')}>
            Create New Story
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleWriteOptionClick('edit')}>
            Edit Existing Story
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default Header;
