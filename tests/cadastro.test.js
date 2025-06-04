const request = require('supertest');
const app = require('../api');

describe('Cadastro de Usuário', () => {
  it('deve cadastrar um novo usuário com nome, email e CEP', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'Teste', email: 'teste@email.com', cep: '12345678' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('usuario');
    expect(res.body.usuario).toHaveProperty('email', 'teste@email.com');
  });
});