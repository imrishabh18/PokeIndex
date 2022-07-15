import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { pokemonListProps } from "./Home";

type abilitiesProps = {
  id: number;
  pokemonName: string;
  abilities: pokemonListProps[] & {
    description: string;
  };
};

type effectProps = {
  effect: string;
  language: {
    name: string;
    url?: string;
  };
};

const Pokemon = () => {
  const location = useLocation();
  const state = location.state as abilitiesProps;
  const abilitiesArr = state.abilities;
  const id = state.id;
  const pokemonName = state.pokemonName;

  const [descriptionArr, setDescriptionArr] = useState<string[]>([]);

  useEffect(() => {
    abilitiesArr.forEach((item) => {
      fetch(item.url)
        .then((res) => res.json())
        .then((data) => {
          data.effect_entries.forEach((ele: effectProps) => {
            if (ele.language.name === "en") {
              setDescriptionArr((prev) => [...prev, ele.effect]);
            }
          });
        });
    });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen items-center pt-20 bg-green-200">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        width={200}
        height={200}
        alt="pokemon"
      />
      <h2 className="text-3xl mt-10 font-bold">{pokemonName.toUpperCase()}</h2>
      <div className="flex flex-col w-1/2 items-left border-2 border-black border-solid rounded-md p-10 mt-10">
        <h2 className="text-red-700 text-3xl font-bold">Abilities: </h2>
        {abilitiesArr.map((item, indx) => {
          return (
            <div className="w-3/4 py-3" key={indx}>
              <li className="font-bold text-xl">{item.name.toUpperCase()}</li>
              <p>{descriptionArr[indx + 1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pokemon;
