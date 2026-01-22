'use client';

import { useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface LanguageSelectorProps {
  currentLang: Language;
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const router = useRouter();

  const toggleLanguage = (lang: Language) => {
    // Set cookie
    document.cookie = `lang=${lang}; path=/; max-age=31536000`; // 1 year
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 p-1 shadow-sm">
      <button
        onClick={() => toggleLanguage('es')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          currentLang === 'es' 
            ? 'bg-indigo-600 text-white shadow-md' 
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          currentLang === 'en' 
            ? 'bg-indigo-600 text-white shadow-md' 
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
        }`}
      >
        EN
      </button>
    </div>
  );
}
