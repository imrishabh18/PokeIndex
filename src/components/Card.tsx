import { useNavigate } from "react-router-dom";
import { pokemonListProps } from "./Home";

type pokemonCardProps = pokemonListProps & {
  id: number;
};

type abilityProps = {
  ability: pokemonListProps;
};

const Card = ({ name, id, url }: pokemonCardProps) => {
  const navigate = useNavigate();
  const fetchDetails = async () => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const jsonResp = await data.json();
    const value: pokemonListProps[] = jsonResp.abilities.map((item: abilityProps) => {
      return item.ability;
    });
    navigate("/pokemon", {
      state: {
        abilities: value,
        id: id,
        pokemonName: name,
      },
    });
  };

  return (
    <div
      className="w-[250px] border-2 border-black border-solid flex flex-col justify-center items-center m-5 p-5 rounded-md
    cursor-pointer
    "
      onClick={fetchDetails}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt="pokemon"
        width={100}
        height={100}
      />
      <p className="pt-10">{name.toLocaleUpperCase()}</p>
    </div>
  );
};

export default Card;
