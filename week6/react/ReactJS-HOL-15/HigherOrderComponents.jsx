import React, { useState, useEffect } from 'react';

// HOL-15: Higher Order Components (HOCs)
// Exercise: Create HOCs for authentication, loading, and logging

// HOC 1: withAuth – protect routes
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = localStorage.getItem('token') !== null;
    if (!isAuthenticated) return <div>🔒 Please log in to view this page.</div>;
    return <WrappedComponent {...props} />;
  };
}

// HOC 2: withLoading – show spinner while loading
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <div>⏳ Loading...</div>;
    return <WrappedComponent {...props} />;
  };
}

// HOC 3: withLogger – log props on render
function withLogger(WrappedComponent) {
  return function WithLoggerComponent(props) {
    useEffect(() => {
      console.log(`[withLogger] ${WrappedComponent.name} rendered with props:`, props);
    });
    return <WrappedComponent {...props} />;
  };
}

// ── Example Usage ─────────────────────────────────────────────
function Dashboard({ user }) {
  return <div><h2>Welcome, {user}!</h2><p>Your protected dashboard.</p></div>;
}

function UserProfile({ name, email }) {
  return <div><h3>{name}</h3><p>{email}</p></div>;
}

const ProtectedDashboard = withAuth(withLogger(Dashboard));
const UserProfileWithLoading = withLoading(UserProfile);

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 2000); }, []);

  return (
    <div>
      <h1>Higher Order Components Demo</h1>
      <ProtectedDashboard user="Neelima" />
      <UserProfileWithLoading isLoading={loading} name="Alice" email="alice@example.com" />
    </div>
  );
}

export default App;
