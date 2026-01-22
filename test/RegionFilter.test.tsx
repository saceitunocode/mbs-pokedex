import { render, screen, fireEvent } from '@testing-library/react';
import { RegionFilter } from '@/components/RegionFilter';
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

describe('RegionFilter', () => {
  it('renders pokemon regions after opening dropdown', () => {
    render(<RegionFilter lang="en" />);
    
    // Open dropdown
    fireEvent.click(screen.getByLabelText(/filter by region/i));
    
    // Check for some common regions
    expect(screen.getByText('Kanto')).toBeInTheDocument();
    expect(screen.getByText('Johto')).toBeInTheDocument();
    expect(screen.getByText('Hoenn')).toBeInTheDocument();
  });

  it('renders correctly for Spanish language after opening dropdown', () => {
    render(<RegionFilter lang="es" />);
    
    // Open dropdown
    fireEvent.click(screen.getByLabelText(/filter by region/i));
    
    // Check for translated regions (though names are mostly proper nouns, we check they exist)
    expect(screen.getByText('Kanto')).toBeInTheDocument();
    expect(screen.getAllByText('Todas las regiones')[0]).toBeInTheDocument();
  });
});
