import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';
function Homepage() {
  return (
    <div className="homepage">
      <h1>Welcome to the Homepage</h1>
      <nav className="nav-links">
        <Link to="/admin" className="nav-link">Admin</Link>
        <Link to="/user" className="nav-link">User</Link>
      </nav>
    </div>
  );
}

export default Homepage;
