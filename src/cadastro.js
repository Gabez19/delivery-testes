const banco = [];

function cadastrarCliente(nome, email, senha) {
  if (!nome || !email || !senha) return { sucesso: false, mensagem: 'Campos obrigatórios' };
  const cliente = { nome, email, senha };
  banco.push(cliente);
  return { sucesso: true, mensagem: 'Cadastro realizado', cliente };
}

module.exports = { cadastrarCliente, banco };
