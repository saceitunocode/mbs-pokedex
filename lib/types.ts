export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export interface EvolutionDetail {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionDetail[];
}

export interface EvolutionChain {
  chain: EvolutionDetail;
}

export interface EnhancedEvolutionNode {
  name: string;
  id: number;
  varieties: {
    name: string;
    id: number;
    isDefault: boolean;
  }[];
  evolvesTo: EnhancedEvolutionNode[];
}
