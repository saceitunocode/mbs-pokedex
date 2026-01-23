import Link from 'next/link';
import Image from 'next/image';
import { getEvolutionChain, getPokemonDetailWithFallback, getEnhancedEvolutionChain } from '@/lib/pokeapi';
import PokemonStats from '@/components/PokemonStats';
import EvolutionChainDisplay from '@/components/EvolutionChainDisplay';
import { TYPE_COLORS, TYPE_HEXES } from '@/lib/constants';
import { capitalize, formatId, getPokemonImage } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLanguage, translations } from '@/lib/i18n';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeSelector from '@/components/ThemeSelector';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  try {
    const { pokemon } = await getPokemonDetailWithFallback(id);
    return {
      title: `${capitalize(pokemon.name)} | Pokedex MVP`,
      description: `Detailed stats and evolution chain for ${capitalize(pokemon.name)}.`,
    };
  } catch {
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
  
  const cookieStore = await cookies();
  const lang = getLanguage(cookieStore);
  const t = translations[lang];

  // Parallel fetch for data
  let pokemon, species, enhancedEvolution, description;
  
  try {
      const data = await getPokemonDetailWithFallback(id);
      pokemon = data.pokemon;
      species = data.species;
      const evolutionData = await getEvolutionChain(species.evolution_chain.url);
      enhancedEvolution = await getEnhancedEvolutionChain(evolutionData.chain);

      description = (
          species.flavor_text_entries.find((entry) => entry.language.name === lang) ||
          species.flavor_text_entries.find((entry) => entry.language.name === 'en')
      )?.flavor_text.replace(/\f/g, ' ');
  } catch (error) {
      console.error(error);
      notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors font-medium"
        >
          <ChevronLeft size={20} />
          {t.backToPokedex}
        </Link>
        <div className="flex items-center gap-3">
          <ThemeSelector />
          <LanguageSelector currentLang={lang} />
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden text-center p-8 relative transition-colors duration-200">
          {/* Dynamic Background Layer */}
          <div 
              className="absolute top-0 inset-x-0 h-1/2 opacity-30 z-0"
              style={{
                  background: pokemon.types.length > 1
                      ? `linear-gradient(135deg, ${TYPE_HEXES[pokemon.types[0].type.name] || '#94a3b8'} 50%, ${TYPE_HEXES[pokemon.types[1].type.name] || '#94a3b8'} 50%)`
                      : (TYPE_HEXES[pokemon.types[0].type.name] || '#94a3b8')
              }}
          />

          {/* Back Name Watermark */}
          <div 
              className="absolute top-0 inset-x-0 h-1/2 flex items-center justify-center font-bold text-gray-50 dark:text-gray-900 opacity-50 dark:opacity-20 whitespace-nowrap select-none z-0 overflow-hidden"
          >
              <span style={{ fontSize: `${Math.min(10, 60 / pokemon.name.length)}rem` }}>
                  {pokemon.name.toUpperCase()}
              </span>
          </div>

          <div className="relative z-10 py-4">
              <div className="relative w-80 h-80 mx-auto mb-6 flex items-center justify-center">
                  {(() => {
                    const imageUrl = getPokemonImage(pokemon);
                    return imageUrl && (
                      <Image 
                          src={imageUrl} 
                          alt={pokemon.name}
                          fill
                          className="object-contain drop-shadow-2xl z-20 scale-125"
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    );
                  })()}
              </div>

              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-200">{capitalize(pokemon.name)}</h1>
              <div className="mb-6">
                  <span className="bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full shadow-sm">
                    {formatId(pokemon.id)}
                  </span>
              </div>

              <div className="flex justify-center gap-3 mb-8">
                   {pokemon.types.map((ty) => (
                      <span 
                          key={ty.type.name} 
                          className={`px-6 py-2 rounded-full text-sm font-bold text-white uppercase tracking-wider shadow-sm ${TYPE_COLORS[ty.type.name] || 'bg-gray-400'}`}
                      >
                          {t.types[ty.type.name as keyof typeof t.types] || ty.type.name}
                      </span>
                  ))}
              </div>


          </div>
      </div>

      {/* About / Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Description */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-colors duration-200">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t.about}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-4">
                  {description || t.noDescription}
              </p>

              <div className="flex-1 flex flex-col justify-center pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center text-center">
                          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{pokemon.height / 10} M</span>
                          <span className="text-xs uppercase tracking-wide text-gray-400 font-bold">{t.height}</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{pokemon.weight / 10} KG</span>
                          <span className="text-xs uppercase tracking-wide text-gray-400 font-bold">{t.weight}</span>
                      </div>
                  </div>
              </div>
         </div>

         {/* Stats */}
         <PokemonStats stats={pokemon.stats} lang={lang} />
      </div>

      {/* Evolution */}
      <EvolutionChainDisplay chain={enhancedEvolution} lang={lang} />
    </div>
  );
}
