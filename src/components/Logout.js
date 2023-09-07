import React, { useState } from 'react';
import { auth } from "../firebase.js";
import {signOut } from "firebase/auth";

function Logout() {  

  const [signOutSuccess, setSignOutSuccess] = useState(null); 

  function doLogout() { 
    signOut(auth)
    .then(function() {
      setSignOutSuccess("You have successfully logged out!");
    }).catch(function(error){
      setSignOutSuccess(`There was an error signing out: ${error.messsage}!`)
    });
  }
  return (
    <React.Fragment>
    <h1>Log Out</h1>
    {signOutSuccess}
    <br />
    <button onClick={doLogout}>Log out</button>
    </React.Fragment>
  );
}


export default Logout