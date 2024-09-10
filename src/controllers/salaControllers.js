const { Timestamp } = require('mongodb');
const salaModel = require('../model/salaModel');
const usuarioModel = require('../model/usuarioModel');

exports.get=async(req, res)=>{
    return await salaModel.listarSalas()
}

exports.enviarMensagem = async (nick, msg, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    if (!Array.isArray(sala.msgs)) {
        sala.msgs = [];
    }

    timestamp = Date.now()
    sala.msgs.push(
        {
            nick: nick,
            msg: msg,
            timestamp: timestamp
        }
    )
    console.log(sala)
    return { "msg": "OK", "timestamp":timestamp};
}


exports.entrar = async (iduser, idsala) => {
  console.log("ID do usuário:", iduser);
  console.log("ID da sala:", idsala);

  if (!iduser || !idsala) {
      throw new Error("Parâmetros iduser ou idsala estão ausentes.");
  }

  // Verifica se a sala existe
  const sala = await salaModel.buscarSala(idsala);
  console.log("Sala encontrada:", sala);
  if (!sala) {
      throw new Error("Sala não encontrada.");
  }

  // Verifica se o usuário existe
  let user = await usuarioModel.buscarUsuario(iduser);
  console.log("Usuário encontrado:", user);
  if (!user) {
      throw new Error("Usuário não encontrado.");
  }

  // Atualiza o usuário com as informações da sala
  user.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo };
  console.log("Usuário atualizado:", user);
  const resultado = await usuarioModel.alterarUsuario(user);

  if (resultado) {
      return { msg: "OK", timestamp: Date.now() };
  }

  throw new Error("Falha ao alterar usuário.");
};


exports.buscarMensagens = async (idsala, timestamp)=>{
    let mensagens=await salaModel.buscarMensagens(idsala, timestamp);
    return {
      "timestamp":mensagens[mensagens.length - 1].timestamp,
      "msgs":mensagens
    };
  }  

exports.sair = async (iduser, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel = require('../model/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    user.sala = {}
    await usuarioModel.alterarUsuario(user);
    if (await usuarioModel.alterarUsuario(user)) {
        return { msg: "Saiu da sala", timestamp: timestamp = Date.now() };
    }
}