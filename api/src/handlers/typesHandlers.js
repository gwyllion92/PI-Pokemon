const getTypesFromDB = require("../controllers/typesControllers");


const getTypesHandler = async (req, res) => {
    try {
        const results = await getTypesFromDB();
        
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { getTypesHandler };