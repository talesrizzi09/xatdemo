const token = require("../util/token.js");
const ususaioModel = require("../model/usuarioModel.js");

exports.entrar = async(nick)=>{
    let resp = await ususaioModel.registrarUsuario(nick);
    if (resp.insertedId) {
        return {
            "idUser":resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''),nick),
            "nick":nick
        };
    };
};