//Displays the footer section
import React from 'react';
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterText>&copy; 2023 RWB. All rights reserved.</FooterText>
    </FooterContainer>
  );
}

export default Footer;