import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/lib/types';
import { formatId, getPokemonImage } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';
import { Language, translations } from '@/lib/i18n';

interface PokemonListItemProps {
  pokemon: Pokemon;
  lang: Language;
}

export default function PokemonListItem({ pokemon, lang }: PokemonListItemProps) {
  const imageUrl = getPokemonImage(pokemon);
  const t = translations[lang];

  return (
    <Link 
      href={`/${pokemon.name}`} 
      className="group relative flex items-center gap-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Watermark ID - Background */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <span 
          className="font-black text-gray-100 dark:text-gray-900 opacity-40 dark:opacity-10"
          style={{ fontSize: '4rem' }}
        >
          {formatId(pokemon.id)}
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-6 w-full">
        {/* Image */}
        <div className="relative w-24 h-24 shrink-0 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
           {imageUrl && (
             <Image 
               src={imageUrl} 
               alt={pokemon.name} 
               fill 
               className="object-contain"
               sizes="96px"
             />
           )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Name and ID */}
          <div className="flex items-center gap-3">
            <span className="bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full">
              {formatId(pokemon.id)}
            </span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 uppercase transition-colors duration-200">
              {pokemon.name}
            </h2>
          </div>

          {/* Types */}
          <div className="flex gap-2 shrink-0">
            {pokemon.types.map((ty) => (
              <span 
                key={ty.type.name} 
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold text-white uppercase tracking-wider ${TYPE_COLORS[ty.type.name] || 'bg-gray-400'}`}
              >
                {t.types[ty.type.name as keyof typeof t.types] || ty.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
