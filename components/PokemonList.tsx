import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PokemonBasicInfo } from "../types";
import { PokemonDetails } from "./PokemonDetails";

const endpoint = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20";

export const PokemonList = () => {
  const { data: pokemonListResponseData } = useQuery({
    queryKey: ["listKey"],
    queryFn: () => {
      return fetch(endpoint).then((response) => response.json());
    },
  });
  const [openedPokemons, setOpenedPokemons] = useState<string[]>([]);

  const isVisible = (name: string) => {
    return openedPokemons.some((pokemonName) => pokemonName === name);
  };

  const handleExpandCollapse = (name: string) => {
    if (isVisible(name)) {
      setOpenedPokemons((openedPokemons) =>
        openedPokemons.filter((pokemonName) => pokemonName !== name)
      );
    } else {
      setOpenedPokemons((openedPokemons) => openedPokemons.concat(name));
    }
  };

  return (
    <ul>
      {pokemonListResponseData?.results?.map((item: PokemonBasicInfo) => (
        <PokemonDetails
          key={item.url}
          name={item.name}
          detailsEndpoint={item.url}
          isVisible={isVisible(item.name)}
          handleExpandCollapse={handleExpandCollapse}
        />
      ))}
    </ul>
  );
};
