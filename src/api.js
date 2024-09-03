const express = require('express');
const app = express();
const router = express.Router();
const token = require('./util/token')
const salaController = require('./controllers/salaControllers')

// Middleware para processamento de JSON e URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para a página inicial
router.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>");
});

// Rota para informações sobre a API
router.get('/sobre', (req, res) => {
    res.status(200).send({
        "nome": "API - CHAT",
        "versão": "0.1.0",
        "autor": "Tales Rizzii"
    });
});

// Rota para listar salas

// Rota para listar salas
router.get('/salas', async (req, res) => {
    const secretKey = 'inter'; // Mesma chave secreta usada na geração
    try {
        const tokenValido = await token.checkToken(req.headers.token, req.headers.iduser, secretKey, req.headers.nick);

        if (tokenValido) {
            await salaController.get(req, res); // Chama a função get do controlador para listar salas
        } else {
            res.status(401).send({msg: "Seu usuário não foi autorizado, verifique."});
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        res.status(500).send({msg: "Erro interno do servidor."});
    }
});


module.exports = router;


// Rota para entrar em uma sala
router.post('/entrar', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');

    try {
        let resp = await usuarioController.entrar(req.body.nick);
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send({ msg: "Erro ao entrar" });
    }
});

// Rota para entrar na sala com verificação do token
router.post('/salas/entrar', async (req, res) => {
    const tokenValido = await token.checkToken(req.headers.token, req.headers.iduser, secretKey, req.headers.nick);
    const salaController = require('./controllers/salaControllers');

    try {
        const autorizado = await token.checkToken(req.body.token, req.body.iduser, 'inter');
        if (!autorizado) {
            return res.status(401).send({ msg: "Acesso não autorizado" });
        }

        let resp = await salaController.entrar(req.body.iduser, req.query.idsala);
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send({ msg: "Erro ao entrar na sala" });
    }
});

// Usa o router nas rotas principais
app.use('/', router);

module.exports = app;
