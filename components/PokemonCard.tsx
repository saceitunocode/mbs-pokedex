import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/lib/types';
import { capitalize, formatId } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <Link 
      href={`/${pokemon.name}`} 
      className="group relative block bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 overflow-hidden border border-gray-100"
    >
      {/* Watermark ID - Large, centered behind image */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <span className="text-[10rem] font-black text-gray-100 opacity-60">
          #{pokemon.id.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Image */}
        <div className="relative w-44 h-44 mb-2 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
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
          <span className="bg-gray-100 text-[10px] font-bold text-gray-500 px-2 py-1 rounded-full">
            {formatId(pokemon.id)}
          </span>
          <h2 className="text-2xl font-black text-gray-900 uppercase">
            {pokemon.name}
          </h2>
        </div>

        {/* Types */}
        <div className="flex gap-2 mb-6">
          {pokemon.types.map((t) => (
            <span 
              key={t.type.name} 
              className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold text-white uppercase tracking-wider ${TYPE_COLORS[t.type.name] || 'bg-gray-400'}`}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Physical Stats Pills */}
        <div className="flex gap-4">
            <div className='bg-gray-100 px-4 py-1.5 rounded-full'>
                 <span className='text-xs font-bold text-gray-700 uppercase'>
                    {pokemon.height / 10}M
                 </span>
            </div>
            <div className='bg-gray-100 px-4 py-1.5 rounded-full'>
                 <span className='text-xs font-bold text-gray-700 uppercase'>
                    {pokemon.weight / 10}KG
                 </span>
            </div>
        </div>
      </div>
    </Link>
  );
}

