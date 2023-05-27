import { render, screen } from '@testing-library/react';
import App from './App.js';

test('renders learn react link', () => {
  render(<App />, document.getElementById('root'))
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
