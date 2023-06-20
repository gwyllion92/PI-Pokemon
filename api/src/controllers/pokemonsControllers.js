const { Pokemon } = require("../db");
const axios = require("axios");
const cleanArray = require("../helpers/cleanArray");
const cleanArrayDb = require("../helpers/clearnArrayDb");
const getTypesFromDB = require("../controllers/typesControllers");
const cleanDetails = require("../helpers/cleanDetails");


const createPokemon = async (name, img, health, attack, defense, speed, height, weight, types) => {
    const newPokemon = await Pokemon.create({name, img, health, attack, defense, speed, height, weight});
    
    const typesRaw = await getTypesFromDB();
    const filteredTypes = typesRaw.filter((type) => types.includes(type.id));


    types.forEach(async (type) => {
        await newPokemon.addType(type);
    });
}

const getPokemonById = async (id, source) => {
    const pokemon = source==="api" ?
    (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data :
    await Pokemon.findByPk(id);

    const cleanPokemon = cleanDetails(pokemon)

    return cleanPokemon;
}

const getAllPokemons = async () => {
    const databasePokemonsRaw = await Pokemon.findAll();
    const databasePokemons = await cleanArrayDb(databasePokemonsRaw);
    
    const apiPokemonsRaw = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=120")).data.results;
    const apiPokemons = cleanArray(apiPokemonsRaw);
    
    const detailedPokemons = await Promise.all(apiPokemons.map(async (pokemon) => {
    const response = await axios.get(pokemon.url);
    const detailedData = response.data;

    return {
        id: detailedData.id,
        name: detailedData.name,
        image: detailedData.sprites.front_default,
        types: detailedData.types.map((typeData) => typeData.type.name)
        };
      }));

    return [...databasePokemons, ...detailedPokemons];
} 

const searchPokemonByName = async (name) => {
    const capitalizedName = name.charAt(0).toUpperCase();
    const databasePokemons = await Pokemon.findAll({ where: { capitalizedName }});

    const apiPokemonsRaw = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=120")).data.results;
    const apiPokemons = cleanArray(apiPokemonsRaw);

    const filteredApi = apiPokemons.filter((pokemon) => pokemon.name === name);

    return [...databasePokemons, ...filteredApi];
};


module.exports = { createPokemon, getPokemonById, getAllPokemons, searchPokemonByName };