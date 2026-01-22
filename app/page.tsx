import { getPokemonList } from '@/lib/pokeapi';
import PokemonCard from '@/components/PokemonCard';
import { cookies } from 'next/headers';
import { getLanguage, translations } from '@/lib/i18n';
import LanguageSelector from '@/components/LanguageSelector';
import Pagination from '@/components/Pagination';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 30;
  const offset = (page - 1) * limit;

  const { results: pokemonList, total } = await getPokemonList(limit, offset);
  const totalPages = Math.ceil(total / limit);

  const cookieStore = await cookies();
  const lang = getLanguage(cookieStore);
  const t = translations[lang];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">{t.pokedex}</h1>
        <div className="flex items-center gap-6">
          <LanguageSelector currentLang={lang} />
        </div>
      </header>

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
    </div>
  );
}
