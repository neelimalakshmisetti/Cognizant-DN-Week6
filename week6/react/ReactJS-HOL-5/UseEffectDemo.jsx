import React, { useState, useEffect } from 'react';

// HOL-5: useEffect Hook
// Exercise: Fetch data on mount, run side effects on state change, and clean up

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // cleanup
  }, [running]);

  return (
    <div>
      <h2>Timer: {seconds}s</h2>
      <button onClick={() => setRunning(r => !r)}>{running ? 'Pause' : 'Start'}</button>
      <button onClick={() => { setRunning(false); setSeconds(0); }}>Reset</button>
    </div>
  );
}

function DataFetcher() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    const timer = setTimeout(() => {
      setData({ id: 1, title: 'Sample Post', body: 'This simulates fetched data.' });
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p>Loading data...</p>;
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>useEffect Hook Demo</h1>
      <Timer />
      <hr />
      <DataFetcher />
    </div>
  );
}

export default App;
