import Link from 'next/link';
import Image from 'next/image';
import { EvolutionChain, EvolutionDetail } from "@/lib/types";
import { capitalize, formatId } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface EvolutionChainDisplayProps {
  chain: EvolutionChain;
}

export default function EvolutionChainDisplay({ chain }: EvolutionChainDisplayProps) {
  // Flatten chain for easy display
  const traverseChain = (node: EvolutionDetail, result: any[] = []) => {
    // Extract ID from species URL: https://pokeapi.co/api/v2/pokemon-species/1/
    const id = node.species.url.split('/').filter(Boolean).pop();
    
    result.push({
      id: parseInt(id!),
      name: node.species.name,
    });

    if (node.evolves_to.length > 0) {
      // Branching evolutions (e.g. Eevee) could be multiple. MVP: handle multiple.
      // But standard display is usually linear. We'll show all `evolves_to` nodes.
      // If multiple, maybe parallel? 
      // For simple MVP flat list, let's just take the first path or recursion for all branches?
      // Let's support branches by structure.
      // Actually, flattening might be confusing for Eevee.
      // Let's recursive render instead.
      return result;
    }
    return result;
  };
  
  // Actually, recursive React component is better for tree structure.
  
  return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Evolution Chain</h3>
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
        <div className="flex items-center gap-4">
            <Link href={`/${node.species.name}`} className="flex flex-col items-center group">
                 <div className="relative w-24 h-24 mb-2 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors cursor-pointer">
                    <Image 
                        src={imageUrl} 
                        alt={node.species.name} 
                        fill 
                        className="object-contain p-2" 
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
                        <div key={next.species.name} className="flex items-center gap-4">
                            <ArrowRight className="text-gray-300 w-6 h-6" />
                            <EvolutionNode node={next} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
