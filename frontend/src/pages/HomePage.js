import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('username');
    if (stored) setUsername(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-brand">📚 Campus Resource Finder</div>
        <div className="nav-links">
          {username ? (
            <>
              <span style={{color:'white', marginRight:'12px'}}>👋 {username}</span>
              <button onClick={handleLogout} className="nav-btn">Logout</button>
            </>
) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/register" className="nav-btn nav-btn-primary">Register</Link>
            </>
          )}
        </div>
      </nav>

<section className="hero">
        <h1>Find Campus Resources Fast</h1>
        <p>Search for study spaces, tutoring centers, dining locations, and more.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for a resource..." />
          <button className="search-btn">Search</button>
        </div>
      </section>
      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          <div className="category-card">📖 Study Spaces</div>
          <div className="category-card">🎓 Tutoring</div>
          <div className="category-card">🍔 Dining</div>
          <div className="category-card">💻 Tech Resources</div>
          <div className="category-card">🏥 Health Services</div>
          <div className="category-card">🚌 Transportation</div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
