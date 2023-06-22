import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../redux/actions";
import { useEffect } from "react";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemon(id));
  }, [dispatch, id]);

  if (!pokemon || !pokemon.name) {
    // Agrega una comprobación adicional para verificar pokemon.name
    return null;
  }

  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();
  const typeClass = pokemon.types?.[0] || "";

  const capTypes = pokemon.types.map((type) => {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    return capitalizedType;
  });

  const kiloWeight = pokemon.weight / 10;

  return (
    <div className={`${style.detailContainer} ${style[typeClass]}`}>
      <h1>{capitalizedName}</h1>
      <img className={style.imagen} src={pokemon.image} alt={pokemon.name} />
      <p>HP: {pokemon.health}</p>
      <p>Attack: {pokemon.attack}</p>
      <p>Defense: {pokemon.defense}</p>
      <p>Speed: {pokemon.speed}</p>
      <p>Height: {pokemon.height} cm</p>
      <p>Weight: {kiloWeight} kg</p>
      <p>Types: {capTypes.join(", ")}</p>
    </div>
  );
};

export default Detail;