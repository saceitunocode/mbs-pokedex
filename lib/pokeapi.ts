import { Pokemon, PokemonSpecies, EvolutionChain } from './types';

const API_BASE = 'https://pokeapi.co/api/v2';

// Cache 'force-cache' is default in Next.js GET fetch, but we can be explicit or use 'next: { revalidate: ... }'
// For static content like Pokemon, generic caching is good.

export async function getPokemonList(limit = 30, offset = 0): Promise<{ results: Pokemon[], total: number }> {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Failed to fetch pokemon list');
  const data = await res.json();

  // Fetch details for each pokemon to get image and types
  const promises = data.results.map(async (p: { name: string; url: string }) => {
    return getPokemonDetail(p.name);
  });

  const results = await Promise.all(promises);
  return { results, total: data.count };
}

export async function getPokemonDetail(idOrName: string | number): Promise<Pokemon> {
  const res = await fetch(`${API_BASE}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${idOrName}`);
  return res.json();
}

export async function getPokemonSpecies(idOrName: string | number): Promise<PokemonSpecies> {
  const res = await fetch(`${API_BASE}/pokemon-species/${idOrName}`);
  if (!res.ok) throw new Error(`Failed to fetch species ${idOrName}`);
  return res.json();
}

export async function getEvolutionChain(url: string): Promise<EvolutionChain> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch evolution chain`);
  return res.json();
}

/**
 * Helper to fetch pokemon data, handling cases where the name provided 
 * is a species name but the default variety has a different name (e.g. keldeo -> keldeo-ordinary)
 */
export async function getPokemonDetailWithFallback(idOrName: string | number): Promise<{ pokemon: Pokemon, species: PokemonSpecies }> {
  try {
    // 1. Try to fetch pokemon directly
    const pokemon = await getPokemonDetail(idOrName);
    // 2. If successful, we still need species for description/evolutions
    const species = await getPokemonSpecies(pokemon.species.name);
    return { pokemon, species };
  } catch (error) {
    // 3. If direct fetch fails, it might be a species name with a different default variety name
    try {
      const species = await getPokemonSpecies(idOrName);
      const defaultVariety = species.varieties.find(v => v.is_default);
      
      if (defaultVariety) {
        const pokemon = await getPokemonDetail(defaultVariety.pokemon.name);
        return { pokemon, species };
      }
      throw error; // Rethrow if no default variety found
    } catch (innerError) {
      throw error; // Rethrow original error if both fail
    }
  }
}

import { EnhancedEvolutionNode, EvolutionDetail } from './types';

export async function getEnhancedEvolutionChain(chain: EvolutionDetail): Promise<EnhancedEvolutionNode> {
  const speciesId = chain.species.url.split('/').filter(Boolean).pop();
  const species = await getPokemonSpecies(speciesId!);
  
  const varieties = species.varieties.map(v => ({
    name: v.pokemon.name,
    id: parseInt(v.pokemon.url.split('/').filter(Boolean).pop()!),
    isDefault: v.is_default
  }));

  const evolvesTo = await Promise.all(
    chain.evolves_to.map(next => getEnhancedEvolutionChain(next))
  );

  return {
    name: species.varieties.find(v => v.is_default)?.pokemon.name || chain.species.name,
    id: parseInt(speciesId!),
    varieties,
    evolvesTo
  };
}
