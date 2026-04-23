import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPages.css';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    alert('Login feature coming in Milestone 2!');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>📚 Campus Resource Finder</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to access your saved resources</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="you@university.edu"
              value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password"
              value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Register here</Link></p>
        <p className="auth-switch"><Link to="/">← Back to Home</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
