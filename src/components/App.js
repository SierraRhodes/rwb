import React from 'react';
import UserDashboard from './UserDashboard';
import StoryForm from './StoryForm';
import Header from './Header';
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
       <Router>
      <Header />
      <Routes>
        <Route path= "/register" element={<Register/>} />
        <Route path= "/story-form" element={<StoryForm />} />
        <Route path= "/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserDashboard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;







