const cleanDetails = (props) => {
    const types = props.types.map((type) => type.type.name);
    
    return pokemon = {
    name: props.name,
    img: props.front_default,
    health: props.stats[0].base_stat,
    attack: props.stats[1].base_stat,
    defense: props.stats[2].base_stat,
    speed: props.stats[5].base_stat,
    height: props.name,
    weight: props.weight,
    types: types
    };
}


module.exports = cleanDetails;