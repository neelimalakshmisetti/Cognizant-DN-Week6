import React, { useState, useMemo, useCallback, memo } from 'react';

// HOL-13: Performance Optimization – useMemo, useCallback, React.memo
// Exercise: Prevent unnecessary re-renders in a large list

const ExpensiveItem = memo(({ item, onSelect }) => {
  console.log(`Rendering item: ${item.id}`);
  return (
    <li onClick={() => onSelect(item)}>
      {item.name} — ${item.price.toFixed(2)}
    </li>
  );
});

function ProductList() {
  const [filter, setFilter]     = useState('');
  const [selected, setSelected] = useState(null);
  const [count, setCount]       = useState(0);

  // Simulated large dataset
  const products = useMemo(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.random() * 100,
      category: i % 3 === 0 ? 'electronics' : i % 3 === 1 ? 'clothing' : 'food',
    })), []);

  const filtered = useMemo(() =>
    products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())),
    [products, filter]);

  // useCallback prevents onSelect from being recreated on every render
  const handleSelect = useCallback((item) => setSelected(item), []);

  return (
    <div>
      <h1>Performance Optimization Demo</h1>
      <p>Renders: {count} <button onClick={() => setCount(c => c + 1)}>Force Re-render</button></p>
      <input placeholder="Filter products..." value={filter} onChange={e => setFilter(e.target.value)} />
      {selected && <p>Selected: <strong>{selected.name}</strong></p>}
      <ul>
        {filtered.slice(0, 20).map(item => (
          <ExpensiveItem key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </ul>
      <p>Showing {Math.min(20, filtered.length)} of {filtered.length} products</p>
    </div>
  );
}

export default ProductList;
