const express = require("express"); 
const app = express(); 
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', (req, res)=>{
    res.status(200).send("<h1>API - CHAT</h1>")
}))

app.use('/', router.get('/sobre',(req, res, next)=>{
    res.status(200).send({
        "nome":"API - CHAT",
        "versão":"0.1.0",
        "autor":"Tales Rizzii"
    });
}));

app.use("/salas",router.get("/salas", async (req, res,next) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    const test = await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick);
    console.log(test)
    if (test) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(401).send({msg:"Usuário não autorizado"});
    }
})); 

app.use("/entrar", router.post("/entrar", async(req, res, next) => {
    const usuarioController = require("./controllers/usuarioController.js");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

module.exports=app;
