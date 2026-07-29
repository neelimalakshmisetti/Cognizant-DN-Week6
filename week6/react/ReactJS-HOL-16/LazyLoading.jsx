import React, { Suspense, lazy, useState } from 'react';

// HOL-16: Lazy Loading and Code Splitting
// Exercise: Implement React.lazy and Suspense for performance

// Lazy-loaded components
const HeavyChart    = lazy(() => import('./HeavyChart'));
const HeavyTable    = lazy(() => import('./HeavyTable'));
const HeavySettings = lazy(() => import('./HeavySettings'));

const TABS = ['Chart', 'Table', 'Settings'];

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{
        width: '40px', height: '40px',
        border: '4px solid #ccc', borderTop: '4px solid #007bff',
        borderRadius: '50%', animation: 'spin 1s linear infinite',
      }} />
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('Chart');

  return (
    <div>
      <h1>Lazy Loading Demo</h1>
      <p>Components are only loaded when their tab is first activated.</p>
      <nav>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ fontWeight: activeTab === tab ? 'bold' : 'normal', margin: '0 0.5rem' }}
          >
            {tab}
          </button>
        ))}
      </nav>
      <Suspense fallback={<LoadingSpinner />}>
        {activeTab === 'Chart'    && <HeavyChart />}
        {activeTab === 'Table'    && <HeavyTable />}
        {activeTab === 'Settings' && <HeavySettings />}
      </Suspense>
    </div>
  );
}

export default App;
