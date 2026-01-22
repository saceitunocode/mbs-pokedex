'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  lang: Language;
}

export default function Pagination({ currentPage, totalPages, lang }: PaginationProps) {
  const t = translations[lang];
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `/?${params.toString()}`;
  };

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + 4);

      if (end === totalPages) {
        start = Math.max(1, end - 4);
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col items-center gap-6 mt-12 py-8">
      <div className="flex items-center gap-2">
        {/* First Page */}
        <PaginationButton 
          href={createPageUrl(1)} 
          disabled={currentPage === 1}
          icon={<ChevronsLeft size={18} />}
          label={t.first}
        />

        {/* Previous Page */}
        <PaginationButton 
          href={createPageUrl(currentPage - 1)} 
          disabled={currentPage === 1}
          icon={<ChevronLeft size={18} />}
          label={t.previous}
        />

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-2 px-4 border-x border-gray-100 mx-2">
          {pages[0] > 1 && <span className="text-gray-400 px-2 text-sm">...</span>}
          {pages.map((p) => (
            <Link
              key={p}
              href={createPageUrl(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
                currentPage === p
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {p}
            </Link>
          ))}
          {pages[pages.length - 1] < totalPages && <span className="text-gray-400 px-2 text-sm">...</span>}
        </div>

        {/* Current Page Mobile */}
        <div className="sm:hidden flex items-center justify-center w-12 h-10 bg-indigo-50 text-indigo-700 rounded-xl font-bold mx-2">
           {currentPage}
        </div>

        {/* Next Page */}
        <PaginationButton 
          href={createPageUrl(currentPage + 1)} 
          disabled={currentPage === totalPages}
          icon={<ChevronRight size={18} />}
          label={t.next}
          iconPosition="right"
        />

        {/* Last Page */}
        <PaginationButton 
          href={createPageUrl(totalPages)} 
          disabled={currentPage === totalPages}
          icon={<ChevronsRight size={18} />}
          label={t.last}
          iconPosition="right"
        />
      </div>

      <span className="text-sm font-medium text-gray-400">
        {t.page} {currentPage} / {totalPages}
      </span>
    </div>
  );
}

function PaginationButton({ 
    href, 
    disabled, 
    icon, 
    label, 
    iconPosition = 'left' 
}: { 
    href: string; 
    disabled: boolean; 
    icon: React.ReactNode; 
    label: string;
    iconPosition?: 'left' | 'right';
}) {
  if (disabled) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-300 rounded-xl cursor-not-allowed border border-gray-100 transition-colors">
        {iconPosition === 'left' && icon}
        <span className="text-xs font-bold uppercase hidden md:inline">{label}</span>
        {iconPosition === 'right' && icon}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 bg-white text-gray-600 rounded-xl border border-gray-100 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
    >
      {iconPosition === 'left' && icon}
      <span className="text-xs font-bold uppercase hidden md:inline">{label}</span>
      {iconPosition === 'right' && icon}
    </Link>
  );
}
