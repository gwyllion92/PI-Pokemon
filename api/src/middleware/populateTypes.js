const axios = require('axios');
const { Type } = require('../db');

async function populateTypes() {
  try {
    const api = await axios.get('https://pokeapi.co/api/v2/type');
    const apiTypes = api.data.results.map(e => e.name);
    
    for (let i = 0; i < apiTypes.length; i++) {
      await Type.findOrCreate({
        where: { name: apiTypes[i], id: i }
      });
    }
    
    console.log('Types Loaded..');
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = populateTypes;