import React, { Component, useState } from 'react';

// HOL-12: Error Boundaries
// Exercise: Implement error boundaries to catch runtime errors gracefully

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ border: '2px solid red', padding: '1rem', borderRadius: '8px' }}>
          <h2>⚠️ Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}>
            Try Again
          </button>
          {this.props.fallback}
        </div>
      );
    }
    return this.props.children;
  }
}

// Buggy component that throws
function BuggyCounter() {
  const [count, setCount] = useState(0);
  if (count === 3) throw new Error('Counter reached dangerous value of 3!');
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment (crashes at 3)</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Error Boundary Demo</h1>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}

export default App;
