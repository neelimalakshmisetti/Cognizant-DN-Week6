import React, { useState } from 'react';

// HOL-3: State and useState Hook
// Exercise: Build an interactive counter and a toggle component

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset     = () => setCount(0);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function Toggle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="toggle">
      <button onClick={() => setIsVisible(prev => !prev)}>
        {isVisible ? 'Hide' : 'Show'} Message
      </button>
      {isVisible && <p>🎉 You toggled me!</p>}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>State & useState Hook Demo</h1>
      <Counter />
      <Toggle />
    </div>
  );
}

export default App;
