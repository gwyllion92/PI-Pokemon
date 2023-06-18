const { createPokemon, getPokemonById, getAllPokemons, searchPokemonByName } = require("../controllers/pokemonsControllers");


const getPokemonsHandler = async (req, res) => {
    const { name } = req.query;

    try {
        const results = name ? await searchPokemonByName(name.toLowerCase()) : await getAllPokemons();
        
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getPokemonHandler = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "bdd" : "api";
    
    try {
        const pokemon = await getPokemonById(id, source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createPokemonHandler = async (req, res) => {
    const { name, img, health, attack, defense, speed, height, weight, types } = req.body
    
    try {
        if (types.length < 2) {
            throw new Error("You must provide at least 2 types for your new Pokemon");
        }
        const newPokemon = await createPokemon (name, img, health, attack, defense, speed, height, weight, types)

        res.status(201).send("Pokémon created successfully");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getPokemonsHandler,
    getPokemonHandler,
    createPokemonHandler
}