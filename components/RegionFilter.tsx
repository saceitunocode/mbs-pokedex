'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { translations, Language } from '@/lib/i18n';
import { Map, ChevronDown } from 'lucide-react';
import { REGIONS } from '@/lib/constants';

export function RegionFilter({ lang }: { lang: Language }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedRegions = searchParams.get('region')?.split(',').filter(Boolean) || [];

  const handleRegionToggle = (region: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newRegions: string[];
    
    if (region === '') {
      newRegions = [];
    } else {
      if (selectedRegions.includes(region)) {
        newRegions = selectedRegions.filter(r => r !== region);
      } else {
        newRegions = [...selectedRegions, region];
      }
    }

    if (newRegions.length > 0) {
      params.set('region', newRegions.join(','));
    } else {
      params.delete('region');
    }
    
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const t = translations[lang];

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
        className="w-full pl-11 pr-4 min-h-[60px] py-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 flex items-center justify-between text-gray-700 dark:text-gray-200 font-medium group"
        aria-label="Filter by region"
      >
        <div className="absolute left-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200">
          <Map size={20} />
        </div>
        
        <div className="flex flex-wrap gap-1.5 items-center mr-2 py-1">
          {selectedRegions.length > 0 ? (
            selectedRegions.map(region => (
              <span key={region} className="px-3 py-1 rounded-full text-[10px] font-extrabold text-white bg-indigo-600 uppercase tracking-wider shadow-sm">
                {t.regions[region as keyof typeof t.regions]}
              </span>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{t.allRegions}</span>
          )}
        </div>

        <ChevronDown size={20} className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[400px] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t.allRegions}</span>
              {selectedRegions.length > 0 && (
                <button 
                  onClick={() => handleRegionToggle('')}
                  className="text-[10px] font-bold text-blue-500 hover:text-blue-600 uppercase"
                >
                  {lang === 'es' ? 'Limpiar' : 'Clear'}
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-0.5">
              {REGIONS.map((region) => {
                const isActive = selectedRegions.includes(region);
                
                return (
                  <button
                    key={region}
                    onClick={() => handleRegionToggle(region)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all group/item
                      ${isActive ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                  >
                    <div className={`relative w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center
                      ${isActive ? 'bg-indigo-600 border-indigo-600' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 group-hover/item:border-gray-300 dark:group-hover/item:border-gray-600'}`}>
                      {isActive && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <span className={`text-sm ${isActive ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>
                      {t.regions[region]}
                    </span>
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
