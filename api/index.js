const express = require('express');
const app = express();

app.use(express.json());

// Rota exemplo
app.get('/api/sala/entrar', (req, res) => {
    res.send('Rota de entrada funcionando!');
});

// Exporta o app para a Vercel
module.exports = app;