const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const db = require('./src/db');

app.use(express.json());

// Servir index.html diretamente
app.use(express.static(path.join(__dirname)));

// Cadastro de usuário
app.post('/usuarios', (req, res) => {
  const { nome, email, cep } = req.body;
  if (!nome || !email || !cep) {
    return res.status(400).json({ erro: 'Preencha nome, email e cep' });
  }

  db.addUsuario({ nome, email, cep, senha: '' }, (err, id) => {
    if (err) {
      return res.status(400).json({ erro: 'Erro ao cadastrar: ' + err.message });
    }
    res.status(201).json({ id });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ erro: 'Email é obrigatório' });
  }

  db.getUsuarioByEmail(email, (err, usuario) => {
    if (err) return res.status(500).json({ erro: 'Erro no servidor' });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ usuario });
  });
});

// Adicionar produto
app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || isNaN(preco)) {
    return res.status(400).json({ erro: 'Nome e preço válidos são obrigatórios' });
  }

  db.addProduto({ nome, preco }, (err, id) => {
    if (err) return res.status(500).json({ erro: 'Erro ao adicionar produto' });
    res.status(201).json({ id });
  });
});

// Listar produtos
app.get('/produtos', (req, res) => {
  db.getProdutos((err, produtos) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produtos' });
    res.json(produtos);
  });
});

// Atualizar produto
app.put('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const { nome, preco } = req.body;

  if (!nome || isNaN(preco)) {
    return res.status(400).json({ erro: 'Nome e preço válidos são obrigatórios' });
  }

  db.updateProduto(id, { nome, preco }, (err, changes) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar produto' });
    res.json({ atualizado: changes > 0 });
  });
});

// Excluir produto
app.delete('/produtos/:id', (req, res) => {
  const id = req.params.id;

  db.deleteProduto(id, (err, changes) => {
    if (err) return res.status(500).json({ erro: 'Erro ao excluir produto' });
    res.json({ excluido: changes > 0 });
  });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
