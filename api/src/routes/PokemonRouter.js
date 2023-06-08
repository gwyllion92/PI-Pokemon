const PokemonRouter = require('express').Router();
const { Op } = require('sequelize');
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { v4: uuidv4 } = require('uuid');


PokemonRouter.get('/', async (req, res) => {
    try {
        const pokemonsDB = await Pokemon.findAll();

        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=60%22");
        const pokemonsAPI = response.data.results;

        const combinedPokemons = [...pokemonsDB, ...pokemonsAPI];

        return res.status(200).json(combinedPokemons)       
    } 
    catch (error) {
      console.log(err.message);
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

            // Obtenemos los pokemons según el nombre de la API
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameLowerCase}`);
            const pokemonAPI = response.data;

            res.status(200).json([...pokemonsDB, pokemonAPI]);
        } else {
            res.status(400).json({ error: 'Missing name parameter' });
        }
    } catch (error) {
        return res.status(500).json({ error: "Sorry, we can't fid a pokemon with that name" });
    }
});

PokemonRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if(id){
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokemonById = response.data;

            // Obtenemos los 'type' del pokemon
            const types = pokemonById.types.map((type) => type.type.name);

            // Aquí puedes agregar la lógica para obtener información del Pokémon desde la base de datos si está disponible.

            const pokemonDetails = {
                id: pokemonById.id,
                name: pokemonById.name,
                types: types,
            };

            return res.status(200).json(pokemonDetails);
        }
        else{
            return res.status(500).json({ error: "The id has not been entered correctly" });
        }
    } 
    catch (error) {
        return res.status(500).json({ error: "There is no pokemon that matches the id entered" });
    }
});


// POST | /pokemons Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados. Toda la información debe ser recibida por body. Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos).

PokemonRouter.post('/', async (req, res) => {
  try {
    const { name, image, health, attack, defense, speed, height, weight, TypeID } = req.body;
  
    console.log(name);
    console.log(image);
    console.log(health);
    console.log(attack);
    console.log(defense);
    console.log(speed);
    console.log(height);
    console.log(weight);
    console.log(TypeID);

    if(!name || !image || !health || !attack || !defense || !speed || !height || !weight || !TypeID){
      return res.status(400).send("Missing information");
    }

    const parsedHealth = Number.parseInt(health);
    const parsedAttack = Number.parseInt(attack);
    const parsedDefense = Number.parseInt(defense);
    const parsedSpeed = Number.parseInt(speed);
    const parsedHeight = Number.parseInt(height);
    const parsedWeight = Number.parseInt(weight);


    const obj ={
      name,
      image,
      health,
      attack,
      defense,
      speed,
      height,
      weight
    };

    const newPokemon = await Pokemon.create(obj);
    console.log(newPokemon);

    const dbTypes = await Type.findAll({
        where:{
            id: TypeID
        }
    })

    await newPokemon.addTypes(dbTypes);
    console.log(newPokemon);

    return res.status(200).json(newPokemon);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating the pokemon ' });
  }
});




module.exports =PokemonRouter;