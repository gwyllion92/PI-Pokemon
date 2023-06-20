import axios from "axios";


export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_TYPES = "GET_TYPES";

export const getPokemons =  () => {
    return async function(dispatch){
        const apiData = await axios.get("http://localhost:3001/pokemons/");
        const pokemons = apiData.data;

        dispatch({type: GET_POKEMONS, payload: pokemons})
    }
}

export const getPokemon =  (id) => {
    return async function(dispatch){
        const apiData = await axios.get("http://localhost:3001/pokemons/");
        const pokemon = apiData.data;

        dispatch({type: GET_POKEMON, payload: pokemon})
    }
}

export const getTypes =  () => {
  return async function(dispatch){
      const apiData = await axios.get("http://localhost:3001/types/");
      const types = apiData.data;

      dispatch({type: GET_TYPES, payload: types})
  }
}