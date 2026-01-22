import Link from 'next/link';
import Image from 'next/image';
import { EvolutionChain, EvolutionDetail } from "@/lib/types";
import { capitalize, formatId } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Language, translations } from "@/lib/i18n";

interface EvolutionChainDisplayProps {
  chain: EvolutionChain;
  lang: Language;
}

export default function EvolutionChainDisplay({ chain, lang }: EvolutionChainDisplayProps) {
  const t = translations[lang];
  
  return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t.evolutionChain}</h3>
        <div className="flex flex-wrap items-center justify-center gap-8">
            <EvolutionNode node={chain.chain} />
        </div>
      </div>
  );
}

function EvolutionNode({ node }: { node: EvolutionDetail }) {
    const id = node.species.url.split('/').filter(Boolean).pop();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
        <div className="flex items-start gap-4">
            <Link href={`/${node.species.name}`} className="flex flex-col items-center group">
                 <div className="relative w-24 h-24 mb-2 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-all duration-300 cursor-pointer transform group-hover:scale-125">
                    <Image 
                        src={imageUrl} 
                        alt={node.species.name} 
                        fill 
                        className="object-contain p-2 drop-shadow-md" 
                    />
                 </div>
                 <span className="text-sm font-bold text-gray-700 group-hover:text-black capitalize">
                    {capitalize(node.species.name)}
                 </span>
                 <span className="text-xs text-gray-400">
                    {formatId(parseInt(id!))}
                 </span>
            </Link>
            
            {node.evolves_to.length > 0 && (
                <div className="flex flex-col gap-8">
                    {node.evolves_to.map((next, idx) => (
                        <div key={next.species.name} className="flex items-start gap-4">
                            <ArrowRight className="text-gray-300 w-6 h-6 mt-9" />
                            <EvolutionNode node={next} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
