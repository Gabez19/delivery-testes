const request = require('supertest');
const app = require('../api');

describe('CRUD de Produtos', () => {
  it('deve adicionar um novo produto', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({ nome: 'Pizza', preco: 30.00 });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('nome', 'Pizza');
  });
});