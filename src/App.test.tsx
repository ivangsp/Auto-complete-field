import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
  test('renders with textinput ', () => {
    render(<App />);
    expect(
      screen.getByRole('textbox', {
        name: /Search country by Name:/i,
      })
    );
  });
});
