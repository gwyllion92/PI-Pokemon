const cleanArrayDb = async (arr) => {
    const cleanedPokemons = [];
  
    for (const elem of arr) {
      const pokemon = {
        id: elem.id,
        name: elem.name,
        img: elem.img,
        types: []
      };
  
      const types = await elem.getTypes();
  
      for (const type of types) {
        pokemon.types.push(type.name);
      }
  
      cleanedPokemons.push(pokemon);
    }
  
    return cleanedPokemons;
  };
  
  module.exports = cleanArrayDb;  