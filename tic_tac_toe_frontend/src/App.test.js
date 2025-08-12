import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders title and initial status', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByText(/Next: X/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Restart Game/i })).toBeInTheDocument();
});

test('places X then O on subsequent clicks', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /Cell/i });
  expect(cells).toHaveLength(9);

  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('X');

  fireEvent.click(cells[1]);
  expect(cells[1]).toHaveTextContent('O');
});

test('restart button resets the board', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /Cell/i });
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[1]); // O

  fireEvent.click(screen.getByRole('button', { name: /Restart the current game/i }));
  cells.forEach((cell) => {
    expect(cell).toHaveTextContent('');
  });

  expect(screen.getByText(/Next: X/i)).toBeInTheDocument();
});
