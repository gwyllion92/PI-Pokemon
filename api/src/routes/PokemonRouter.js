// GET | /pokemons Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.

// GET | /pokemons/:idPokemon Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon. El pokemon es recibido por parámetro (ID). Tiene que incluir los datos del tipo de pokemon al que está asociado. Debe funcionar tanto para los pokemones de la API como para los de la base de datos.

// GET | /pokemons/name?="..." Esta ruta debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query. Debe poder buscarlo independientemente de mayúsculas o minúsculas. Si no existe el pokemon, debe mostrar un mensaje adecuado. Debe buscar tanto los de la API como los de la base de datos.

const PokemonRouter = require('express').Router();
const { Op } = require('sequelize');
const axios = require('axios');
const { Pokemon, Type } = require('../db');


PokemonRouter.get('/', async (req, res) => {
    try {
        const pokemonsDB = await Pokemon.findAll();

        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokemonsAPI = response.data.results;

        const combinedPokemons = [...pokemonsDB, ...pokemonsAPI];

        return res.status(200).json(combinedPokemons)       
    } 
    catch (error) {
        res.status(500).json({ error: "We can't find any pokemons" });
    }
});

PokemonRouter.get('/name', async (req, res) => {
    const { name } = req.query;
    const nameLowerCase = name.toLowerCase();

    try {
        if (nameLowerCase) {
            // Buscamos en la DB
            const pokemonsDB = await Pokemon.findAll({
                where: { name: { [Op.substring]: nameLowerCase } }
            });

            // Obtenemos los detalles del Pokémon de la API
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameLowerCase}`);
            const pokemonAPI = response.data;

            res.status(200).json([...pokemonsDB, pokemonAPI]);
        } else {
            res.status(400).json({ error: 'Missing name parameter' });
        }
    } catch (error) {
        res.status(500).json({ error: "Sorry, we can't fid a pokemon with that name" });
    }
});




module.exports =PokemonRouter;