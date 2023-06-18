const { Type } = require("../db");

const getTypesFromDB = async () => {
    const databaseTypes = await Type.findAll();

    return databaseTypes;
}


module.exports = getTypesFromDB;