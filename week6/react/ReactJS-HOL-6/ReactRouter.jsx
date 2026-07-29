import React from 'react';
// HOL-6: React Router – Client-side Navigation
// Exercise: Set up routes for Home, About, and Dashboard pages
// npm install react-router-dom

// import { BrowserRouter as Router, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>🏠 Home Page</h2>
    <p>Welcome to the React Router hands-on exercise!</p>
  </div>
);

const About = () => (
  <div>
    <h2>ℹ️ About Page</h2>
    <p>This app demonstrates React Router v6 navigation.</p>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>📊 Dashboard</h2>
    <p>Protected content would go here.</p>
  </div>
);

// Usage (wrap with <Router>):
// <Routes>
//   <Route path="/"          element={<Home />} />
//   <Route path="/about"     element={<About />} />
//   <Route path="/dashboard" element={<Dashboard />} />
// </Routes>

export { Home, About, Dashboard };
