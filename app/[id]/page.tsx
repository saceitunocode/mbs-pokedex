import Link from 'next/link';
import Image from 'next/image';
import { getPokemonDetail, getPokemonSpecies, getEvolutionChain } from '@/lib/pokeapi';
import PokemonStats from '@/components/PokemonStats';
import EvolutionChainDisplay from '@/components/EvolutionChainDisplay';
import { TYPE_COLORS } from '@/lib/constants';
import { capitalize, formatId } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  try {
    const pokemon = await getPokemonDetail(id);
    return {
      title: `${capitalize(pokemon.name)} | Pokedex MVP`,
      description: `Detailed stats and evolution chain for ${capitalize(pokemon.name)}.`,
    };
  } catch (e) {
    return {
      title: 'Pokemon Not Found',
    };
  }
}

export default async function PokemonDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  
  // Parallel fetch for data
  try {
      const pokemon = await getPokemonDetail(id);
      const species = await getPokemonSpecies(id);
      const evolution = await getEvolutionChain(species.evolution_chain.url);

      const description = species.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
      )?.flavor_text.replace(/\f/g, ' ');

      return (
        <div className="max-w-4xl mx-auto space-y-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium mb-4"
          >
            <ChevronLeft size={20} />
            Back to Pokedex
          </Link>

          {/* Header Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-center p-8 relative">
              {/* Back Name Watermark */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10rem] font-bold text-gray-50 opacity-50 whitespace-nowrap select-none z-0">
                  {pokemon.name.toUpperCase()}
              </div>

              <div className="relative z-10">
                  <div className="relative w-64 h-64 mx-auto mb-6">
                      <Image 
                          src={pokemon.sprites.other['official-artwork'].front_default} 
                          alt={pokemon.name}
                          fill
                          className="object-contain drop-shadow-xl"
                          priority
                      />
                  </div>

                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{capitalize(pokemon.name)}</h1>
                  <p className="text-gray-400 font-bold text-xl mb-6">{formatId(pokemon.id)}</p>

                  <div className="flex justify-center gap-3 mb-8">
                      {pokemon.types.map((t) => (
                          <span 
                              key={t.type.name} 
                              className={`px-6 py-2 rounded-full text-sm font-bold text-white uppercase tracking-wider shadow-sm ${TYPE_COLORS[t.type.name] || 'bg-gray-400'}`}
                          >
                              {t.type.name}
                          </span>
                      ))}
                  </div>

                  {/* Physical Stats */}
                  <div className="flex justify-center gap-12 text-gray-600">
                      <div className="flex flex-col">
                          <span className="text-2xl font-bold text-gray-800">{pokemon.weight / 10} KG</span>
                          <span className="text-xs uppercase tracking-wide text-gray-400 font-bold">Weight</span>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-2xl font-bold text-gray-800">{pokemon.height / 10} M</span>
                          <span className="text-xs uppercase tracking-wide text-gray-400 font-bold">Height</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* About / Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Description */}
             <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                      {description || "No description available."}
                  </p>
             </div>

             {/* Stats */}
             <PokemonStats stats={pokemon.stats} />
          </div>

          {/* Evolution */}
          <EvolutionChainDisplay chain={evolution} />
        </div>
      );
  } catch (error) {
      // In case of error (e.g. not found), render 404
      // Log error internally if possible
      console.error(error);
      notFound();
  }
}
