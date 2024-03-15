// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReviewsList from "./components/ReviewsList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")));
  const [isDark, setIsDark] = useState(true);  // Theme state
  const toggleTheme = () => setIsDark(!isDark);  // Toggle function

  return (
    <div className="App" style={{ backgroundColor: isDark ? '#00008B' : '#87CEEB', minHeight: '100vh', color: isDark ? 'white' : 'black' }}>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/reviews" element={<ReviewsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
