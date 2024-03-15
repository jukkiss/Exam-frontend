import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

const Navbar = ({ isAuthenticated, setIsAuthenticated, toggleTheme }) => {

  const handleClick = (e) => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Retrieve user from localStorage safely
  const getUserEmail = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user.email; // Now it's safe to access email
    }
    return ''; // Default value if user isn't found
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {isAuthenticated && (
            <div>
              <span>{getUserEmail()}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
           <button onClick={toggleTheme}>Toggle Theme</button> {/* Theme toggle button */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
