import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/lib/types';
import { capitalize, formatId, getPokemonImage } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';
import { Language, translations } from '@/lib/i18n';

interface PokemonCardProps {
  pokemon: Pokemon;
  lang: Language;
}

export default function PokemonCard({ pokemon, lang }: PokemonCardProps) {
  const imageUrl = getPokemonImage(pokemon);
  const t = translations[lang];

  return (
    <Link 
      href={`/${pokemon.name}`} 
      className="group relative block bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Watermark ID - Large, centered behind image */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <span 
          className="font-black text-gray-100 dark:text-gray-900 opacity-60 dark:opacity-20"
          style={{ fontSize: `${Math.min(10, 35 / (formatId(pokemon.id).length + 1))}rem` }}
        >
          {formatId(pokemon.id)}
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Image */}
        <div className="relative w-44 h-44 mb-2 transform group-hover:scale-150 transition-transform duration-300 drop-shadow-md">
           {imageUrl && (
             <Image 
               src={imageUrl} 
               alt={pokemon.name} 
               fill 
               className="object-contain"
               sizes="(max-width: 768px) 100vw, 300px"
             />
           )}
        </div>

        {/* Name Row with Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full">
            {formatId(pokemon.id)}
          </span>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 uppercase transition-colors duration-200">
            {pokemon.name}
          </h2>
        </div>

        {/* Types */}
        <div className="flex gap-2 mb-6">
          {pokemon.types.map((ty) => (
            <span 
              key={ty.type.name} 
              className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold text-white uppercase tracking-wider ${TYPE_COLORS[ty.type.name] || 'bg-gray-400'}`}
            >
              {(t as any).types?.[ty.type.name] || ty.type.name}
            </span>
          ))}
        </div>


      </div>
    </Link>
  );
}

