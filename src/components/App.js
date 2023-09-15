import React from 'react';
//import UserDashboard from './UserDashboard';
import StoryForm from './StoryForm';
import Header from './Header';
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import StoryDetail from "./StoryDetail";
import SplashPage from "./SplashPage";
import Chapter from "./Chapter";
import StoryContainer from "./StoryContainer";
import ChapterDetail from "./ChapterDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import styled, { ThemeProvider } from 'styled-components';



function App() {
  return (
    <div className="app">
       <Router>
      <Header />
      <Routes>
        <Route path= "/story-list" element={<StoryContainer />} /> 
        <Route path= "/chapter" element={<Chapter />} />
        <Route path="/story-detail/:id" element={<StoryDetail />} />
        <Route path="/chapter-detail/:storyId/:chapterId" element={<ChapterDetail />} />
        <Route path= "/register" element={<Register />} />
        <Route path= "/story-form" element={<StoryForm />} />
        <Route path= "/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SplashPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;







