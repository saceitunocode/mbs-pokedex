import Link from 'next/link';
import Image from 'next/image';
import { EnhancedEvolutionNode } from "@/lib/types";
import { capitalize, formatId } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Language, translations } from "@/lib/i18n";

interface EvolutionChainDisplayProps {
  chain: EnhancedEvolutionNode;
  lang: Language;
}

export default function EvolutionChainDisplay({ chain, lang }: EvolutionChainDisplayProps) {
  const t = translations[lang];
  
  return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="text-xl font-bold text-gray-800 mb-6 px-2">{t.evolutionChain}</h3>
        <div className="flex justify-center w-full">
            <div className="inline-flex items-center gap-6 p-4 overflow-x-auto min-w-full lg:min-w-0 no-scrollbar">
                <EvolutionNode node={chain} />
            </div>
        </div>
      </div>
  );
}

function PokemonItem({ variety, speciesId, isPrimary = false }: { variety: any, speciesId: number, isPrimary?: boolean }) {
    return (
        <Link 
            href={`/${variety.name}`} 
            className={`flex flex-col items-center group transition-all duration-300 ${isPrimary ? 'scale-110 z-10' : 'scale-95 opacity-70 hover:opacity-100 hover:scale-105'}`}
        >
            {/* The Circle - Center of this item is the center of this circle */}
            <div className="relative w-24 h-24 bg-gray-50 rounded-full group-hover:bg-white transition-all duration-500 cursor-pointer border-2 border-transparent group-hover:border-indigo-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] group-hover:shadow-xl flex items-center justify-center z-10">
                <Image 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${variety.id}.png`} 
                    alt={variety.name} 
                    fill 
                    className="object-contain p-2 drop-shadow-md transition-transform duration-300 group-hover:scale-110" 
                />
            </div>
            
            {/* Metadata Area - Fixed height (64px / h-16) matches top padding */}
            <div className="flex flex-col items-center justify-center h-16 text-center px-2 mt-2">
                <span className="text-[11px] font-black text-gray-800 uppercase tracking-tighter leading-tight line-clamp-2">
                    {variety.name.replace(/-/g, ' ')}
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase mt-1">
                    {formatId(speciesId)}
                </span>
            </div>
        </Link>
    );
}

function EvolutionNode({ node }: { node: EnhancedEvolutionNode }) {
    const defaultVariety = node.varieties.find(v => v.isDefault);
    const otherVarieties = node.varieties.filter(v => !v.isDefault);

    return (
        <div className="flex items-center gap-2">
            {/* 1. Primary species node */}
            {defaultVariety && (
                <PokemonItem variety={defaultVariety} speciesId={node.id} />
            )}

            {/* 2. Variants (Megas, etc.) of THIS species */}
            {otherVarieties.length > 0 && (
                <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-24 shrink-0"> 
                        <ArrowRight className="text-gray-200 w-6 h-6 group-hover:text-indigo-300 transition-colors" />
                    </div>
                    {/* Spacer to match PokemonItem metadata height (h-16 + mt-2) */}
                    <div className="h-16 mt-2" aria-hidden="true" />
                </div>
                    <div className="flex flex-col gap-2">
                        {otherVarieties.map((v) => (
                            <PokemonItem key={v.name} variety={v} speciesId={node.id} />
                        ))}
                    </div>
                </div>
            )}
            
            {/* 3. Next evolutions */}
            {node.evolvesTo.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-4">
                        {node.evolvesTo.map((next) => (
                            <div key={next.name} className="flex items-center gap-2">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center w-10 h-24 shrink-0">
                                        <ArrowRight className="text-gray-200 w-6 h-6" />
                                    </div>
                                    <div className="h-16 mt-2" aria-hidden="true" />
                                </div>
                                <EvolutionNode node={next} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}


