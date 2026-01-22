import { Pokemon, PokemonSpecies, EvolutionChain } from './types';
import { ITEMS_PER_PAGE, REGION_RANGES } from './constants';

const API_BASE = 'https://pokeapi.co/api/v2';

// Cache 'force-cache' is default in Next.js GET fetch, but we can be explicit or use 'next: { revalidate: ... }'
// For static content like Pokemon, generic caching is good.

export async function getPokemonList(limit = ITEMS_PER_PAGE, offset = 0): Promise<{ results: Pokemon[], total: number }> {
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

export async function searchPokemon(query: string, types?: string, limit = ITEMS_PER_PAGE, offset = 0, regions?: string): Promise<{ results: Pokemon[], total: number }> {
  let filtered: { name: string; url: string }[] = [];

  if (types) {
    const typeList = types.split(',').filter(Boolean);
    const typeResults = await Promise.all(
      typeList.map(async (t) => {
        const res = await fetch(`${API_BASE}/type/${t}`);
        if (!res.ok) throw new Error(`Failed to fetch pokemon of type ${t}`);
        const data = await res.json();
        return data.pokemon.map((p: { pokemon: { name: string; url: string } }) => p.pokemon);
      })
    );

    // Initial filtered list is the first type's results
    if (typeResults.length > 0) {
      filtered = typeResults[0];
      // Intersect with subsequent type results
      for (let i = 1; i < typeResults.length; i++) {
        const currentTypePokemon = new Set(typeResults[i].map((p: any) => p.name));
        filtered = filtered.filter(p => currentTypePokemon.has(p.name));
      }
    }
  } else {
    // Otherwise fetch all pokemon names for searching (up to Kanto/Johto/Hoenn limit or reasonable max)
    // 1025 is current max national dex, safe enough to fetch all for client-side filtering if optimized, 
    // but here we just fetch 2000 to be safe.
    const res = await fetch(`${API_BASE}/pokemon?limit=2000`);
    if (!res.ok) throw new Error('Failed to fetch pokemon search list');
    const data = await res.json();
    filtered = data.results;
  }

  // Filter by regions (ID range)
  if (regions) {
    const regionList = regions.split(',').filter(Boolean);
    const validRanges = regionList.map(r => REGION_RANGES[r]).filter(Boolean);
    
    if (validRanges.length > 0) {
      filtered = filtered.filter((p: { url: string }) => {
        const id = parseInt(p.url.split('/').filter(Boolean).pop()!);
        return validRanges.some(([start, end]) => id >= start && id <= end);
      });
    }
  }

  // Filter by query if provided
  if (query) {
    filtered = filtered.filter((p: { name: string }) => 
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Apply pagination
  const listToFetch = filtered.slice(offset, offset + limit);
  const promises = listToFetch.map(async (p: { name: string }) => {
    return getPokemonDetail(p.name);
  });

  const results = await Promise.all(promises);
  return { results, total: filtered.length };
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
