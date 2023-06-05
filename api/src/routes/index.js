const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { PokemonRouter } = require()

const PokemonRouter = require('./PokemonRouter');
const TypeRouter = require('./TypeRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', PokemonRouter);
router.use('/types', TypeRouter);



module.exports = router;