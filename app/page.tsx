import Link from 'next/link';
import { getPokemonList } from '@/lib/pokeapi';
import PokemonCard from '@/components/PokemonCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 30;
  const offset = (page - 1) * limit;

  const pokemonList = await getPokemonList(limit, offset);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Pokedex</h1>
        <span className="text-sm font-medium text-gray-400">Page {page}</span>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-12 py-8">
        {page > 1 && (
          <Link 
            href={`/?page=${page - 1}`}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeft size={20} />
            Previous
          </Link>
        )}
        
        <Link 
            href={`/?page=${page + 1}`}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Next
            <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
}
