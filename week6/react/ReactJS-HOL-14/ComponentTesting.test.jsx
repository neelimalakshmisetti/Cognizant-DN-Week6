// HOL-14: Testing with Jest and React Testing Library
// Exercise: Write unit tests for React components
// npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Component under test ──────────────────────────────────────
function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  return (
    <div>
      <p data-testid="count-display">Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(c => c - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ── Tests ─────────────────────────────────────────────────────
describe('Counter Component', () => {
  test('renders initial count', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 5');
  });

  test('increments count on button click', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByText('Increment'));
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 1');
  });

  test('decrements count on button click', async () => {
    render(<Counter initialCount={3} />);
    await userEvent.click(screen.getByText('Decrement'));
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 2');
  });

  test('resets count to zero', async () => {
    render(<Counter initialCount={10} />);
    await userEvent.click(screen.getByText('Reset'));
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 0');
  });
});
