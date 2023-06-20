const cleanArray = (arr) => arr.map(elem=>{
    return{
        name: elem.name,
        url: elem.url
    };
});

module.exports = cleanArray;