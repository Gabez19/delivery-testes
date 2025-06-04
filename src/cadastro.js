const { banco } = require('./db'); // Vamos criar um módulo de banco de dados compartilhado

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validarSenha(senha) {
  return senha.length >= 6;
}

function cadastrarCliente(nome, email, senha) {
  // Validações
  if (!nome || !email || !senha) {
    return { sucesso: false, mensagem: 'Todos os campos são obrigatórios' };
  }

  if (!validarEmail(email)) {
    return { sucesso: false, mensagem: 'Email inválido' };
  }

  if (!validarSenha(senha)) {
    return { sucesso: false, mensagem: 'Senha deve ter pelo menos 6 caracteres' };
  }

  // Verifica se email já existe
  if (banco.clientes.some(cliente => cliente.email === email)) {
    return { sucesso: false, mensagem: 'Email já cadastrado' };
  }

  // Cria o cliente (em produção, a senha deve ser hasheada)
  const cliente = { 
    id: banco.clientes.length + 1,
    nome, 
    email, 
    senha,
    role: 'cliente' // Define o papel do usuário
  };

  banco.clientes.push(cliente);
  
  return { 
    sucesso: true, 
    mensagem: 'Cadastro realizado com sucesso', 
    cliente: { ...cliente, senha: undefined } // Não retorna a senha
  };
}

module.exports = { cadastrarCliente };