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

app.use('/salas', router.get('/salas', async (req, res)=>{
    const salaControllers = require("./controllers/salaControllers");
    const resp = await salaControllers.get();
    res.status(200).send(resp);
}));

module.exports=app;