import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import fetchMock from 'jest-fetch-mock';

test('renders upload', () => {
  render(<App />);
  const linkElement = screen.getByText(/Upload/i);
  expect(linkElement).toBeInTheDocument();

})

test('check fetch api response succesfully received', async () => {
  const mockData = {
    todos: [
      { id: 1, title: 'Learn React', completed: false },
      { id: 2, title: 'Build a project with JSON Server', completed: true }
    ]
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  render(<App />);

  // API'den gelen veriyi bekleyelim
  await waitFor(() => screen.getByText(/Learn React - Not Completed/i));

  // API'den gelen veriyi ekranda doğru şekilde görmek için kontrol edelim
  const todoItemElement = screen.getByText(/Learn React - Not Completed/i);
  expect(todoItemElement).toBeInTheDocument()
}
)