const token = require("../util/token");
const usuarioModel = require("../model/usuarioModel");
console.log('Importando usuarioModel...');
console.log('usuarioModel importado:', usuarioModel);

exports.entrar = async(nick)=>{
    let resp = await usuarioModel.registrarUsuario(nick);
    if (resp.insertedId) {
        return {
            "idUser": resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''),nick),
            "nick": nick
        };
    };
};

exports.sairChat=async(iduser)=>{
    let resp = await usuarioModel.removerUsuario(iduser)
    return ("Saiu do chat")
}