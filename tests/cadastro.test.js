const { cadastrarCliente, banco } = require('../src/cadastro');

describe('CT001 – Cadastro de Cliente com Sucesso', () => {
  test('Deve cadastrar cliente com nome, email e senha válidos', () => {
    const resultado = cadastrarCliente('Maria', 'maria@email.com', 'senha123');

    expect(resultado.sucesso).toBe(true);
    expect(resultado.mensagem).toBe('Cadastro realizado');
    expect(banco.length).toBe(1);
    expect(banco[0].email).toBe('maria@email.com');
  });
});
