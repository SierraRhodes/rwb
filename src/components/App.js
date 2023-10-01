import React, { useState, useEffect } from 'react';
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
import Library from "./Library";
import SearchResults from "./SearchResults";
import BookList from "./BookList";
import Join from "./Join";
import Footer from "./Footer";
import GlobalStyle from './GlobalStyle';
//import styled, { ThemeProvider } from 'styled-components';



function App() {
  const [showJoin, setShowJoin] = useState(false);

  useEffect(() => {
    // Listen for scroll events and check if the user has scrolled to a certain position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const joinSection = document.getElementById('join'); // Change this ID to match your Join section

      if (joinSection) {
        const joinSectionOffset = joinSection.offsetTop;

        // Adjust this threshold as needed to control when the Join section becomes visible
        const threshold = 10; // Adjust as needed

        // If the user scrolls past the threshold, show the Join section
        if (scrollY > joinSectionOffset - threshold) {
          setShowJoin(true);
        } else {
          setShowJoin(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
    

       <Router>
      <Header />
      {showJoin && <Join />}
      <Routes>
        <Route path="/join" id="join" element={<Join />} />
        <Route path="/library" element={<Library />} />
        <Route path="/book-list" element={<BookList />} />
        <Route path="/search/:q" element={<SearchResults />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path= "/story-list" element={<StoryContainer />} /> 
        <Route path= "/chapter" element={<Chapter />} />
        <Route path="/story-detail/:id" element={<StoryDetail />} />
        <Route path="/chapter-detail/:storyId/:chapterId" element={<ChapterDetail />} />
        <Route path= "/register" element={<Register />} />
        <Route path= "/story-form" element={<StoryForm />} />
        <Route path= "/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" id="home" element={<SplashPage />} />
      </Routes>
    </Router>
    {/* <FooterContainer>
    <Footer />
    </FooterContainer> */}
    </div>
    
  );
}

export default App;







