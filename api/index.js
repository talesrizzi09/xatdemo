const express = require('express');
const app = express();

// Configuração básica do middleware
app.use(express.json());

// Definição das suas rotas
app.get('/api/sala/entrar', (req, res) => {
    res.send('Rota de entrada funcionando!');
});

app.get('/api/salas', (req, res) => {
    res.send('Listar todas as salas');
});

// Exportando o app para ser usado pelo Vercel
module.exports = app;

// Exporta para o Vercel
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}