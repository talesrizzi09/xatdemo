const salaModel = require('../model/salaModel');

async function get(req, res) {
  console.log("Chamando listarSalas...");
  try {
      let salas = await salaModel.listarSalas();  // Chama a função listarSalas
      console.log("Salas obtidas:", JSON.stringify(salas, null, 2));  // Exibe de forma legível
      res.status(200).send(salas);  // Envia a resposta com as salas
  } catch (error) {
      console.error("Erro ao listar salas:", error);
      res.status(500).send({msg: "Erro ao listar salas."});
  }
}

module.exports = {
  get
};



exports.entrar = async (iduser, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel = require('../model/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    console.log(sala);
    console.log(user);
    user.sala={_id:sala._id, nome:sala.nome, tipo:sala.tipo};
    if (await usuarioModel.alterarUsuario(user)) {
      return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
};

exports.enviarMensagem = async (nick, msg, idsala) => {
    const sala = await salaModel.buscarSala(idsala);

    if (!sala.msgs) {
      sala.msgs=[];
    }

    timestamp=Date.now();

    sala.msgs.push(
      {
        timestamp:timestamp,
        msg:msg,
        nick:nick
      }
    );

    let resp = await salaModel.atualizarMensagens(sala);

    return {"msg":"OK", "timestamp":timestamp};
};

exports.buscarMensagens = async (idsala, timestamp) => {
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    
    return {
      "timestamp":mensagens[mensagens.length - 1].timestamp,
      "msgs":mensagens
    };
};