// Importando módulos
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Criando a aplicação Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectando ao MongoDB (substitua pela sua string de conexão)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definindo a porta do servidor
const port = process.env.PORT || 3000;

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de chat!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
