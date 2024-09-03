const db = require("./db");

async function registrarUsuario(nick) {
    return await db.insertOne("usuarios",{"nick": nick});
};



let buscarUsuario = async (_id) => {
    let user = await db.findOne("usuarios", _id);
    return user;
};
  
  
async function alterarUsuario(user) {
    return await db.updateOne("usuarios", user, { _id: user._id });
}
 
module.exports = {registrarUsuario, buscarUsuario, alterarUsuario};
