const { criarPedido, pedidos } = require('../src/pedido');

describe('CT002 – Pedido com Produtos no Carrinho', () => {
  test('Deve criar pedido com status "em preparo"', () => {
    const cliente = { nome: 'Maria', email: 'maria@email.com' };
    const produtos = [{ nome: 'Alface', preco: 2.50 }, { nome: 'Tomate', preco: 3.00 }];
    const resultado = criarPedido(cliente, produtos);

    expect(resultado.sucesso).toBe(true);
    expect(resultado.pedido.status).toBe('em preparo');
    expect(pedidos.length).toBe(1);
    expect(pedidos[0].produtos.length).toBe(2);
  });
});
