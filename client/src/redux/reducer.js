import { GET_POKEMONS, GET_POKEMON, FILTER_BY_TYPE } from "./actions";

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
            case FILTER_BY_TYPE:
                return {
                  ...state,
                  pokemons: action.payload,
                };
        default:
            return {...state};
    }
}


export default reducer;