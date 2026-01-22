export function capitalize(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatId(id: number) {
  return `#${id.toString().padStart(3, '0')}`;
}

export function getPokemonImage(pokemon: any) {
  return pokemon.sprites.other?.['official-artwork']?.front_default || 
         pokemon.sprites.front_default || 
         null;
}
