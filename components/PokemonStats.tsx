import { PokemonStat } from "@/lib/types";
import { capitalize } from "@/lib/utils";

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const STAT_NAMES_MAP: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Base Stats</h3>
      <div className="space-y-3">
        {stats.map((s) => {
          const name = STAT_NAMES_MAP[s.stat.name] || capitalize(s.stat.name);
          const percentage = Math.min((s.base_stat / 255) * 100, 100);
          
          return (
            <div key={s.stat.name} className="flex items-center gap-4">
              <span className="w-20 text-sm font-bold text-gray-500">{name}</span>
              <span className="w-8 text-sm font-bold text-gray-800 text-right">{s.base_stat}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${s.base_stat > 100 ? 'bg-green-500' : s.base_stat > 50 ? 'bg-blue-500' : 'bg-red-500'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
