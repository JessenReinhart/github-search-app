import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//hooks
import { useGitHubAPI } from './useGitHubAPI';

//types
import "@testing-library/jest-dom";
import '../types/jsdom-global.d.ts';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve(
    new Response(JSON.stringify({ items: [{ login: 'user1' }, { login: 'user2' }] }), {
      status: 200,
      headers: { 'Content-type': 'application/json' },
    })
  )
);

const TestComponent: React.FC = () => {
  const { loading, data, error, fetchData } = useGitHubAPI('testQuery');

  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading...' : 'Not loading'}</div>
      {data.map((item) => (
        <div key={item.login} data-testid="user-item">
          {item.login}
        </div>
      ))}
      {error && <div data-testid="error">{error}</div>}
      <button onClick={() => fetchData()}>Fetch Data</button>
    </div>
  );
};

describe('useGitHubAPI hook', () => {
  test('should fetch GitHub user data when fetchData is called', async () => {
    render(<TestComponent />);
    expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');

    userEvent.click(screen.getByText('Fetch Data'));
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');

    // Wait for the loading state to change and data to be displayed
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
    expect(screen.getByTestId('user-item')).toHaveTextContent('user1');
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });
});