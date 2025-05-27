const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const clientes = [];

app.post('/clientes', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios' });
  }

  const cliente = { nome, email, senha };
  clientes.push(cliente);

  res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso', cliente });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

module.exports = app; // para testes
