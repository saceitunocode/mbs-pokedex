'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

export function ViewModeSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = (searchParams.get('view') as ViewMode) || 'grid';

  const handleViewChange = (view: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-2xl p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
      <button
        onClick={() => handleViewChange('grid')}
        className={`flex items-center justify-center p-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
          currentView === 'grid'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="Grid view"
        title="Grid view"
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => handleViewChange('list')}
        className={`flex items-center justify-center p-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
          currentView === 'list'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="List view"
        title="List view"
      >
        <List size={20} />
      </button>
    </div>
  );
}
