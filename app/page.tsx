import { getPokemonList, searchPokemon } from '@/lib/pokeapi';
import PokemonCard from '@/components/PokemonCard';
import { cookies } from 'next/headers';
import { getLanguage, translations } from '@/lib/i18n';
import Pagination from '@/components/Pagination';
import { ViewModeSelector, ViewMode } from '@/components/ViewModeSelector';
import PokemonListItem from '@/components/PokemonListItem';

import { ITEMS_PER_PAGE } from '@/lib/constants';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string, q?: string, type?: string, region?: string, view?: string };
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const query = params?.q || '';
  const type = params?.type || '';
  const region = params?.region || '';
  const viewMode = (params?.view as ViewMode) || 'grid';
  const limit = ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;

  // Use searchPokemon if any filter (search, type, or region) is active to handle logic correctly
  // getPokemonList is only for simple paginated access without filtering
  const { results: pokemonList, total } = (query || type || region)
    ? await searchPokemon(query, type, limit, offset, region)
    : await getPokemonList(limit, offset);
  
  const totalPages = Math.ceil(total / limit);

  const cookieStore = await cookies();
  const lang = getLanguage(cookieStore);
  const t = translations[lang];

  return (
    <div className="space-y-8">
      {/* View Mode Selector */}
      <div className="flex justify-end">
        <ViewModeSelector />
      </div>

      {pokemonList.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {pokemonList.map((pokemon) => (
                <PokemonListItem key={pokemon.id} pokemon={pokemon} lang={lang} />
              ))}
            </div>
          )}

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
