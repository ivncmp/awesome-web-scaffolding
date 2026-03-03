import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Awesome Web Scaffolding')).toBeInTheDocument();
  });

  it('renders example page by default', () => {
    render(<App />);
    expect(screen.getByText('Example Page')).toBeInTheDocument();
  });
});
