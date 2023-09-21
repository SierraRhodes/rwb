import React from 'react';
import styled from 'styled-components';

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ButtonContainer = styled.div`
display: flex;
padding: 20px 0; /* Add vertical spacing above and below the buttons */
gap: 30px;
margin-left: 50px;
`;

const Button = styled.button`
background: linear-gradient(
  45deg,
  #ff0000,
  #ff9900,
  #ffff00,
  #00ff00,
  #0099ff,
  #9900ff,
  #ff00ff
); /* Rainbow-like gradient background */
background-size: 200% 200%;
color: black;
font-weight: bold;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
transition: background 0.5s ease;

&:hover {
  background-position: right center;
}
`;

const DeleteConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <DialogOverlay>
      <DialogBox>
        <p>Are you sure you want to delete this story?</p>
        <ButtonContainer>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </ButtonContainer>
      </DialogBox>
    </DialogOverlay>
  );
};

export default DeleteConfirmationDialog;
