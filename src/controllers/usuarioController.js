const token = require("../util/token");
const usuarioModel = require("../model/usuarioModel");

exports.entrar = async (nick) => {
    let resp = await usuarioModel.registrarUsuario(nick);
    if (resp.insertedId) {
        const secretKey = 'inter'; // Defina sua chave secreta aqui ou use uma variável de ambiente

        return {
            "idUser": resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''), secretKey, nick),
            "nick": nick
        };
    };
};
