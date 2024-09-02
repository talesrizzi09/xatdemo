const db = require("./db");  

async function listarSalas() {
    let salas = await db.findAll("salas");
    return salas;
}  