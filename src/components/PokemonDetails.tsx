import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { APIPokemonDetailsResponse } from "../types";

export const PokemonDetails = ({
  isVisible,
  handleExpandCollapse,
  name,
  detailsEndpoint,
}: {
  isVisible: boolean;
  handleExpandCollapse: (name: string) => void;
  name: string;
  detailsEndpoint: string;
}) => {
  const { data: pokemonDetailsResponseData, isFetching } =
    useQuery<APIPokemonDetailsResponse>({
      queryKey: [`detailsKey-${name}`],
      queryFn: () => {
        return fetch(detailsEndpoint).then((response) => response.json());
      },
      enabled: isVisible,
    });

  return (
    <li>
      <div className="listItem" onClick={() => handleExpandCollapse?.(name)}>
        {name.substring(0, 1).toLocaleUpperCase() + name.substring(1)}
      </div>
      {isVisible && (
        <div>
          {isFetching ? (
            <span>Loading...</span>
          ) : (
            <ul>
              {pokemonDetailsResponseData?.sprites?.front_default && (
                <img src={pokemonDetailsResponseData.sprites.front_default} />
              )}
              <br />
              <div className="gap">
                <div className="gap">Abilities:</div>
                {pokemonDetailsResponseData?.abilities?.map((item) => (
                  <li key={item?.ability?.name}>{item?.ability?.name}</li>
                ))}
              </div>
              <div className="gap">
                <div className="gap">Base Stats:</div>
                {pokemonDetailsResponseData?.stats?.map(
                  (item, index, array) => (
                    <Fragment key={item.stat.url}>
                      {item?.base_stat}
                      {index !== array.length - 1 && ", "}
                    </Fragment>
                  )
                )}
              </div>
            </ul>
          )}
        </div>
      )}
    </li>
  );
};
