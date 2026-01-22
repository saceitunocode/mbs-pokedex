import { PokemonStat } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { Language, translations } from "@/lib/i18n";

interface PokemonStatsProps {
  stats: PokemonStat[];
  lang: Language;
}

export default function PokemonStats({ stats, lang }: PokemonStatsProps) {
  const t = translations[lang];

  const STAT_NAMES_MAP: Record<string, string> = {
    hp: t.hp,
    attack: t.attack,
    defense: t.defense,
    'special-attack': t.specialAttack,
    'special-defense': t.specialDefense,
    speed: t.speed,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t.baseStats}</h3>
      <div className="space-y-3">
        {stats.map((s) => {
          const name = STAT_NAMES_MAP[s.stat.name] || capitalize(s.stat.name);
          const percentage = Math.min((s.base_stat / 255) * 100, 100);
          
          return (
            <div key={s.stat.name} className="flex items-center gap-4">
              <span className="w-20 text-sm font-bold text-gray-500 dark:text-gray-400">{name}</span>
              <span className="w-8 text-sm font-bold text-gray-800 dark:text-gray-100 text-right">{s.base_stat}</span>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${s.base_stat > 100 ? 'bg-green-500' : s.base_stat > 50 ? 'bg-blue-500' : 'bg-red-500'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Stat */}
      {(() => {
        const total = stats.reduce((acc, s) => acc + s.base_stat, 0);
        const totalPercentage = Math.min((total / 720) * 100, 100);
        return (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <span className="w-20 text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider">{t.total}</span>
            <span className="w-8 text-sm font-black text-gray-900 dark:text-white text-right">{total}</span>
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${totalPercentage}%` }}
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
}
