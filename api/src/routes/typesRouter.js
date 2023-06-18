const { Router } = require("express");
const typesRouter = Router();
const { getTypesHandler } = require("../handlers/typesHandlers");

typesRouter.get("/", getTypesHandler);


module.exports = typesRouter;