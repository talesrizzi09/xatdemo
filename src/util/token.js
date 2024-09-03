const jwt = require('jsonwebtoken');

// Função para verificar o token
async function checkToken(token, id, key, nick) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                resolve(false);
            } else {
                resolve(decoded.id === id);
            }
        });
    });
}

// Função para gerar o token
async function setToken (id, key, nick) {
    console.log("id: "+id);
    console.log("nick: "+nick);

    if (id && nick) {
        // Inclui tanto o id quanto o nick no payload do token
        return jwt.sign({ id, nick }, key, { expiresIn: 28800 });
    }
    return false;
};

module.exports = {
    checkToken,
    setToken
};
