import React from 'react';
import UserDashboard from './UserDashboard';
import Header from './Header';
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
       <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserDashboard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;







