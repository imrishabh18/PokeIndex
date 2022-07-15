import { useEffect, useState } from "react";
import Card from "./Card";

export type pokemonListProps = {
  name: string;
  url: string;
};

const Home = () => {
  const [pokemonList, setPokemonList] = useState<pokemonListProps[]>([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((res) => res.json())
      .then((data) => setPokemonList([...data.results]));
  }, []);
  return (
    <div className="flex flex-col justify-center items-center bg-green-200">
      <h2 className="text-4xl py-2">Pokemon Index</h2>
      <div className="w-3/5 flex flex-wrap justify-around">
        {pokemonList.map((e: pokemonListProps, i: number) => {
          return <Card id={i + 1} name={e.name} url={e.url} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Home;
