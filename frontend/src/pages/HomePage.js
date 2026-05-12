import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import API_URL from '../api';

function HomePage() {
  const [username, setUsername] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('username');
    if (stored) setUsername(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };

  const handleSearch = async () => {
    if (!query) return;
    setSearching(true);
    setSearchError('');
    setResults([]);
    try {
      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setSearchError('Search failed');
      }
    } catch (err) {
      setSearchError('Could not connect to server');
    }
    setSearching(false);
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
          <input
            type="text"
            placeholder="Search for a resource..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </section>
      {searchError && <p style={{textAlign:'center', color:'red', padding:'16px'}}>{searchError}</p>}
      {results.length > 0 && (
        <section className="categories">
          <h2>Search Results</h2>
          <div className="results-list">
            {results.map((r, i) => (
              <div key={i} className="result-card">
                <p>{r.name}</p>
                <small>Lat: {r.lat}, Lon: {r.lon}</small>
              </div>
            ))}
          </div>
        </section>
      )}
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
