import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import generateMockUserData from './generateMockUserData';
//types
import "@testing-library/jest-dom";

jest.mock('../hooks/useGitHubAPI', () => ({
  useGitHubAPI: () => ({
    loading: false,
    data: [generateMockUserData()], // Use the generated mock data
    error: null,
    fetchData: jest.fn(),
    fetchGitHubRepositories: jest.fn(),
    detail: [],
    loadingDetail: false,
  }),
}));

test('displays search results when the form is submitted', async () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/🔎 Enter username.../i);
  const searchButton = screen.getByRole('button', { name: /search/i });

  // Enter a username in the input field and submit the form
  fireEvent.change(inputElement, { target: { value: 'exampleUser' } });
  fireEvent.click(searchButton);

  // Wait for the results to appear
  await waitFor(() => {
    expect(screen.getByText(/Showing results for 'exampleUser'/i)).toBeInTheDocument();
  });
});
