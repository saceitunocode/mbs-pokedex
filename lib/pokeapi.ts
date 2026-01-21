import { Pokemon, PokemonSpecies, EvolutionChain } from './types';

const API_BASE = 'https://pokeapi.co/api/v2';

// Cache 'force-cache' is default in Next.js GET fetch, but we can be explicit or use 'next: { revalidate: ... }'
// For static content like Pokemon, generic caching is good.

export async function getPokemonList(limit = 30, offset = 0): Promise<Pokemon[]> {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Failed to fetch pokemon list');
  const data = await res.json();

  // Fetch details for each pokemon to get image and types
  const promises = data.results.map(async (p: { name: string; url: string }) => {
    // Extract ID for efficiency if needed, but we need full data
    // optimization: If we only display ID, Name, Image, Type, we technically only need those.
    // But 'getPokemonDetail' returns full object.
    return getPokemonDetail(p.name);
  });

  return Promise.all(promises);
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
