import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

// Mock de next/navigation
const mockPush = vi.fn();
const mockGet = vi.fn();
const mockToString = vi.fn(() => '');

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockGet,
    toString: mockToString,
  }),
  usePathname: () => '/',
}));

describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar placeholder="Search Pokemon" />);
    const input = screen.getByPlaceholderText(/search pokemon/i);
    expect(input).toBeInTheDocument();
  });

  it('updates the input value when typing', () => {
    render(<SearchBar placeholder="Search Pokemon" />);
    const input = screen.getByPlaceholderText(/search pokemon/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pikachu' } });
    expect(input.value).toBe('Pikachu');
  });

  it('does not call router.push if the value is the same as the search param', () => {
    vi.useFakeTimers();
    mockPush.mockClear();
    mockGet.mockReturnValue('pikachu');
    mockToString.mockReturnValue('q=pikachu');

    render(<SearchBar placeholder="Search Pokemon" />);
    
    vi.advanceTimersByTime(300);
    
    expect(mockPush).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
