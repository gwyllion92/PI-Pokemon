const cleanArray = (arr) => arr.map(elem=>{
    return{
        name: elem.name,
        created: false
    };
});

module.exports = cleanArray;