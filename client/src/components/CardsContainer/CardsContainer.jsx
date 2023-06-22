import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = ({ currentPage, pokemonsPerPage }) => {
  const pokemons = useSelector(state => state.pokemons);

  

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className={style.container}>
      {currentPokemons.map(pokemon => (
        <Card className={style.card}
          key={pokemon.id}
          name={capitalizeFirstLetter(pokemon.name)}
          image={pokemon.image}
          types={pokemon.types.map(type => capitalizeFirstLetter(type))}
        />
      ))}
    </div>
  );
};

export default CardsContainer;