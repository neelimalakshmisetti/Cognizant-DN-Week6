import React, { createContext, useContext, useState } from 'react';

// HOL-7: Context API – Global State without Prop Drilling
// Exercise: Create a Theme context and consume it in deeply nested components

const ThemeContext = createContext();
const UserContext  = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header style={{ background: theme === 'dark' ? '#333' : '#eee', padding: '1rem' }}>
      <h1>Context API Demo ({theme} mode)</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}

function Content() {
  const { theme } = useContext(ThemeContext);
  return (
    <main style={{ background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#000', padding: '1rem' }}>
      <p>Theme-aware content. Current theme: <strong>{theme}</strong></p>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}

export default App;
