import { GET_POKEMONS, GET_POKEMON, GET_TYPES } from "./actions";

const initialState = {
    pokemons: [],
    pokemon: [],
    types: []
};

const reducer = (state= initialState, action) => {
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state, 
                pokemons: action.payload,
            }
        case GET_POKEMON:
            return{
                ...state,
                pokemon: action.payload
            }
            case GET_TYPES:
                return {
                  ...state,
                  types: action.payload,
                };
        default:
            return {...state};
    }
}


export default reducer;