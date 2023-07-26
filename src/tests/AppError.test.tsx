import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
//types
import "@testing-library/jest-dom";

jest.mock('../hooks/useGitHubAPI', () => ({
  useGitHubAPI: () => ({
    loading: false,
    data: [],
    error: 'Error fetching data from GitHub API',
    fetchData: jest.fn(),
    detail: [],
    loadingDetail: false,
    fetchGitHubRepositories: jest.fn(),
  }),
}));

test('displays error message when there is an error', () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/🔎 Enter username.../i);
  const searchButton = screen.getByRole('button', { name: /search/i });

  // Enter a username in the input field and submit the form
  fireEvent.change(inputElement, { target: { value: 'exampleUser' } });
  fireEvent.click(searchButton);

  // Check that the error message is displayed
  expect(screen.getByText(/Error: Error fetching data from GitHub API/i)).toBeInTheDocument();
});
