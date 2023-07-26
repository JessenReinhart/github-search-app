import { render, screen } from '@testing-library/react';
import App from '../App';
//types
import "@testing-library/jest-dom";

test('renders without errors', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/🔎 Enter username.../i)).toBeInTheDocument();
});
