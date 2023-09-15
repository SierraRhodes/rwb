import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  position: relative; /* Add relative positioning to the NavItems container */
`;

const NavItem = styled.div`
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; /* Position the dropdown below the NavItem */
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: ${props => (props.show ? 'block' : 'none')}; /* Control visibility based on 'show' prop */
`;

const DropdownMenuItem = styled.div`
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = () => {
  const [showWriteDropdown, setShowWriteDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const toggleWriteDropdown = () => {
    setShowWriteDropdown(prevState => !prevState);
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(prevState => !prevState);
  };

  const handleWriteOptionClick = (option) => {
    setSelectedOption(option);
    toggleWriteDropdown();
  };

  const navigateTo = (path) => {
    navigate(path);
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
        <NavItem>Live Streams</NavItem>
        <NavItem>Connect</NavItem>
        <NavItem onClick={toggleWriteDropdown}>Write</NavItem>
        {/* The DropdownMenu component for "Write" */}
        <DropdownMenu show={showWriteDropdown}>
          <DropdownMenuItem onClick={() => handleWriteOptionClick('create')}>
            <span onClick={() => navigateTo("/story-form")}>Create New Story</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleWriteOptionClick('edit')}>
            <span onClick={() => navigateTo("/story-list")}>Edit Existing Story</span>
          </DropdownMenuItem>
        </DropdownMenu>
        {/* End of DropdownMenu for "Write" */}
        <NavItem onClick={toggleAccountDropdown}>Account</NavItem>
        {/* The DropdownMenu component for "Account" */}
        <DropdownMenu show={showAccountDropdown}>
          <DropdownMenuItem onClick={() => navigateTo("/register")}>Create an Account</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/login")}>Log In</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/logout")}>Log Out</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/")}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/")}>Inbox</DropdownMenuItem>
        </DropdownMenu>
      </NavItems>
    </Navbar>
  );
};

export default Header;


