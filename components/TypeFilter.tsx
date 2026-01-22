'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { translations, Language } from '@/lib/i18n';
import { TYPE_COLORS } from '@/lib/constants';
import { Filter, ChevronDown } from 'lucide-react';

export function TypeFilter({ lang }: { lang: Language }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedTypes = searchParams.get('type')?.split(',').filter(Boolean) || [];

  const handleTypeToggle = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newTypes: string[];
    
    if (type === '') {
      newTypes = [];
    } else {
      if (selectedTypes.includes(type)) {
        newTypes = selectedTypes.filter(t => t !== type);
      } else {
        newTypes = [...selectedTypes, type];
      }
    }

    if (newTypes.length > 0) {
      params.set('type', newTypes.join(','));
    } else {
      params.delete('type');
    }
    
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const t = translations[lang];
  const types = Object.entries(t.types).sort((a, b) => a[1].localeCompare(b[1]));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-11 pr-4 h-[60px] bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 flex items-center justify-between text-gray-700 dark:text-gray-200 font-medium group"
        aria-label="Filter by type"
      >
        <div className="absolute left-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200">
          <Filter size={20} />
        </div>
        
        <div className="flex flex-wrap gap-1.5 items-center mr-2 overflow-hidden">
          {selectedTypes.length > 0 ? (
            <>
              {selectedTypes.slice(0, 1).map(type => (
                <span key={type} className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold text-white uppercase tracking-wider ${TYPE_COLORS[type]} truncate max-w-[100px]`}>
                  {t.types[type as keyof typeof t.types]}
                </span>
              ))}
              {selectedTypes.length > 1 && (
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold whitespace-nowrap">
                  +{selectedTypes.length - 1}
                </span>
              )}
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{t.allTypes}</span>
          )}
        </div>

        <ChevronDown size={20} className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl z-50 max-h-[400px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t.allTypes}</span>
              {selectedTypes.length > 0 && (
                <button 
                  onClick={() => handleTypeToggle('')}
                  className="text-[10px] font-bold text-blue-500 hover:text-blue-600 uppercase"
                >
                  {lang === 'es' ? 'Limpiar' : 'Clear'}
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-0.5">
              {types.map(([key, label]) => {
                const isActive = selectedTypes.includes(key);
                const colorClass = TYPE_COLORS[key] || 'bg-gray-400';
                
                return (
                  <button
                    key={key}
                    onClick={() => handleTypeToggle(key)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all group/item
                      ${isActive ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                  >
                    <div className={`relative w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center
                      ${isActive ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 group-hover/item:border-gray-300 dark:group-hover/item:border-gray-600'}`}>
                      {isActive && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-wider ${colorClass} min-w-[80px] text-center shadow-sm`}>
                      {label}
                    </span>
                    
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
