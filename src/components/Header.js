import React, { useState, useEffect, useRef } from 'react';
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
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: ${props => (props.show ? 'block' : 'none')}; /* Control visibility based on 'show' prop */

  /* Add dynamic positioning */
  transform-origin: top;
  transform: translateY(5px); /* Adjust the distance between the NavItem and the dropdown */

  /* Adjust the dropdown width and z-index as needed */
  min-width: 200px;
  z-index: 1;
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
  const [dropdownPosition, setDropdownPosition] = useState({ top: '100%', left: '0' });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);


  useEffect(() => {
    // Add a click event listener to the window to handle clicks outside of the dropdown menus
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside of the dropdown menus, so close them
        setShowWriteDropdown(false);
        setShowAccountDropdown(false);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleWriteDropdown = () => {
    setShowWriteDropdown((prevState) => !prevState);
    setShowAccountDropdown(false);
    setDropdownPosition({ top: '100%', left: '0' }); // Reset dropdown position
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown((prevState) => !prevState);
    setShowWriteDropdown(false);
    setDropdownPosition({ top: '100%', left: '0' }); // Reset dropdown position
  };

  const handleWriteOptionClick = (option) => {
    setSelectedOption(option);
    toggleWriteDropdown();
  };

  const handleAccountOptionClick = (option) => {
    setSelectedOption(option);
    toggleAccountDropdown();
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
      <Logo>
        <i className="bi bi-gem diamond-icon"></i>RWB
      </Logo>
      <Search onSearch={handleSearch} />

      <NavItems>
        <NavItem>Live Streams</NavItem>
        <NavItem>Connect</NavItem>
        <NavItem onClick={toggleWriteDropdown}>Write</NavItem>
        {/* The DropdownMenu component for "Write" */}
        <DropdownMenu show={showWriteDropdown} style={dropdownPosition}>
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
        <DropdownMenu show={showAccountDropdown} style={dropdownPosition}>
          <DropdownMenuItem onClick={() => handleAccountOptionClick('login')}>
            <span onClick={() => navigateTo("/login")}>Log In</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAccountOptionClick('logout')}>
            <span onClick={() => navigateTo("/logout")}>Log Out</span>
          </DropdownMenuItem>
          <hr></hr>
          <DropdownMenuItem onClick={() => handleAccountOptionClick('library')}>
            <span onClick={() => navigateTo("/library")}>Library</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAccountOptionClick('profile')}>
            <span onClick={() => navigateTo("/")}>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAccountOptionClick('inbox')}>
            <span onClick={() => navigateTo("/")}>Inbox</span>
          </DropdownMenuItem>
        </DropdownMenu>
        {/* End of DropdownMenu for "Account" */}
      </NavItems>
    </Navbar>
  );
};

export default Header;

