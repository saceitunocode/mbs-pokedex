'use client';

import { usePathname } from 'next/navigation';
import { PokedexHeader } from './PokedexLayout';

interface PokedexHeaderWrapperProps {
  title: string;
  rightElements: React.ReactNode;
  searchBar?: React.ReactNode;
  filters?: React.ReactNode;
}

export function PokedexHeaderWrapper({ title, rightElements, searchBar, filters }: PokedexHeaderWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return <PokedexHeader title={title} rightElements={rightElements} searchBar={searchBar} filters={filters} disabled={!isHomePage} />;
}
