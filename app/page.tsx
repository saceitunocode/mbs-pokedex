import { getPokemonList, searchPokemon } from '@/lib/pokeapi';
import PokemonCard from '@/components/PokemonCard';
import { cookies } from 'next/headers';
import { getLanguage, translations } from '@/lib/i18n';
import LanguageSelector from '@/components/LanguageSelector';
import Pagination from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { TypeFilter } from '@/components/TypeFilter';
import ThemeSelector from '@/components/ThemeSelector';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string, q?: string, type?: string };
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const query = params?.q || '';
  const type = params?.type || '';
  const limit = 27;
  const offset = (page - 1) * limit;

  const { results: pokemonList, total } = (query || type)
    ? await searchPokemon(query, type, limit, offset)
    : await getPokemonList(limit, offset);
  
  const totalPages = Math.ceil(total / limit);

  const cookieStore = await cookies();
  const lang = getLanguage(cookieStore);
  const t = translations[lang];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-8 mb-12">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-200 tracking-tight">{t.pokedex}</h1>
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector currentLang={lang} />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full h-full items-start">
          <div className="flex-2 w-full">
            <SearchBar placeholder={t.searchPlaceholder} />
          </div>
          <div className="flex-1 w-full">
            <TypeFilter lang={lang} />
          </div>
        </div>
      </header>

      {pokemonList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} lang={lang} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            lang={lang} 
          />
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
            {query ? `${t.noResults} "${query}"` : t.noResults}
          </p>
        </div>
      )}
    </div>
  );
}
