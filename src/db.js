const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria/abre o banco de dados localmente
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

// Criação das tabelas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    cep TEXT,
    senha TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL
  )`);
});

// Funções de acesso

exports.addUsuario = (usuario, callback) => {
  const { nome, email, cep, senha } = usuario;
  db.run(
    `INSERT INTO usuarios (nome, email, cep, senha) VALUES (?, ?, ?, ?)`,
    [nome, email, cep, senha],
    function (err) {
      callback(err, this?.lastID);
    }
  );
};

exports.getUsuarioByEmail = (email, callback) => {
  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], callback);
};

exports.addProduto = (produto, callback) => {
  db.run(
    `INSERT INTO produtos (nome, preco) VALUES (?, ?)`,
    [produto.nome, produto.preco],
    function (err) {
      callback(err, this?.lastID);
    }
  );
};

exports.getProdutos = (callback) => {
  db.all(`SELECT * FROM produtos`, callback);
};

exports.updateProduto = (id, produto, callback) => {
  db.run(
    `UPDATE produtos SET nome = ?, preco = ? WHERE id = ?`,
    [produto.nome, produto.preco, id],
    function (err) {
      callback(err, this?.changes);
    }
  );
};

exports.deleteProduto = (id, callback) => {
  db.run(`DELETE FROM produtos WHERE id = ?`, [id], function (err) {
    callback(err, this?.changes);
  });
};
