const jwt = require('jsonwebtoken');

async function checkToken (token, id, key, nick) {
    return jwt.verify(token, key, (err, decoded) => {
        let autorizacao = false;
        if (err) {
            autorizacao = false;
        }
        if (decoded) {
            if (decoded.id == id) {
                autorizacao = true;
            }
            else {
                autorizacao = false;
            }
        }
        return autorizacao;
    }
)};

async function setToken (id, key, nick) {
    console.log("id: "+id);
    console.log("nick: "+nick);

    if (id) {
        return jwt.sign({id}, key, nick, {expiresIn: 28800});
    }
    return false;
};

module.exports = {
    checkToken,
    setToken
};