import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Search from "./Search";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 20px;
  position: relative;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  background: linear-gradient(45deg, #ffcc00, #ff99cc, #cc99ff, #99ccff, #66ffcc);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #000; /* Text color when not hovered */
  transition: background-position 0.3s, color 0.3s;
  align-items: center;

  .diamond-icon {
    font-size: 20px; /* Adjust the size as needed */
    margin-right: 8px; /* Adjust the spacing between the icon and text */
  }

  &:hover {
    background-position: 100% 0;
    color: #fff; /* Text color on hover */
  }
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
  background: linear-gradient(45deg, #ffcc00, #ff99cc, #cc99ff, #99ccff, #66ffcc);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #000; /* Text color when not hovered */

  transition: background-position 0.3s, color 0.3s;

  &:hover {
    background-position: 100% 0;
    color: #fff; /* Text color on hover */
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

  const handleSearch = (query) => {
    // Implement your search logic here, e.g., navigate to search results
    navigate(`/search?q=${query}`);
  };

  return (
    <Navbar>
      <Logo><i className="bi bi-gem diamond-icon"></i>RWB</Logo>
      <Search onSearch={handleSearch} />
        
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
          <DropdownMenuItem onClick={() => navigateTo("/library")}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/")}>Inbox</DropdownMenuItem>
        </DropdownMenu>
      </NavItems>
    </Navbar>
  );
};

export default Header;


