export type PokemonBasicInfo = {
  name: string;
  url: string;
};

export type APIBasicResponse = {
  results: PokemonBasicInfo[];
};

export type APIPokemonDetailsResponse = {
  abilities: { ability: { name: string } }[];
  sprites: { front_default: string };
  stats: { base_stat: number; stat: { url: string } }[];
};
