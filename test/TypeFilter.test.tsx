import { render, screen, fireEvent } from '@testing-library/react';
import { TypeFilter } from '@/components/TypeFilter';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(''),
    toString: () => '',
  }),
  usePathname: () => '/',
}));

describe('TypeFilter', () => {
  it('renders all pokemon types after opening dropdown', () => {
    render(<TypeFilter lang="en" />);
    
    // Open dropdown
    fireEvent.click(screen.getByLabelText(/filter by type/i));
    
    // Check for some common types
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
  });

  it('renders correctly for Spanish language after opening dropdown', () => {
    render(<TypeFilter lang="es" />);
    
    // Open dropdown
    fireEvent.click(screen.getByLabelText(/filter by type/i));
    
    expect(screen.getByText('Fuego')).toBeInTheDocument();
    expect(screen.getByText('Agua')).toBeInTheDocument();
  });
});
