import { cookies } from 'next/headers';
import { getLanguage, translations } from '@/lib/i18n';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeSelector from '@/components/ThemeSelector';
import { PokedexHeaderWrapper } from '@/components/PokedexHeaderWrapper';
import { SearchBar } from '@/components/SearchBar';
import { TypeFilter } from '@/components/TypeFilter';
import { RegionFilter } from '@/components/RegionFilter';

export async function GlobalPokedexHeader() {
  const cookieStore = await cookies();
  const lang = getLanguage(cookieStore);
  const t = translations[lang];

  return (
    <PokedexHeaderWrapper 
      title={t.pokedex}
      rightElements={
        <div className="flex items-center gap-3">
          <ThemeSelector />
          <LanguageSelector currentLang={lang} />
        </div>
      }
      searchBar={<SearchBar placeholder={t.searchPlaceholder} />}
      filters={
        <>
          <div className="w-full md:col-span-1">
            <TypeFilter lang={lang} />
          </div>
          <div className="w-full md:col-span-1">
            <RegionFilter lang={lang} />
          </div>
        </>
      }
    />
  );
}
