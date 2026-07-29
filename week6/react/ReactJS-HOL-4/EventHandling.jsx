import React, { useState } from 'react';

// HOL-4: Event Handling in React
// Exercise: Handle click, keyboard, and form submit events

function EventDemo() {
  const [log, setLog]   = useState([]);
  const [input, setInput] = useState('');

  const addLog = (msg) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const handleClick    = ()  => addLog('Button clicked!');
  const handleKeyDown  = (e) => addLog(`Key pressed: ${e.key}`);
  const handleSubmit   = (e) => { e.preventDefault(); addLog(`Form submitted: "${input}"`); setInput(''); };
  const handleHover    = ()  => addLog('Mouse entered button');

  return (
    <div>
      <h1>Event Handling Demo</h1>

      <button onClick={handleClick} onMouseEnter={handleHover}>
        Click Me
      </button>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type something and press Enter"
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Event Log:</h3>
      <ul>
        {log.map((entry, i) => <li key={i}>{entry}</li>)}
      </ul>
    </div>
  );
}

export default EventDemo;
