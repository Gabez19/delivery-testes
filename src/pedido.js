const pedidos = [];

function criarPedido(cliente, produtos) {
  if (!cliente || !produtos || produtos.length === 0) return { sucesso: false };
  const pedido = {
    cliente,
    produtos,
    status: 'em preparo'
  };
  pedidos.push(pedido);
  return { sucesso: true, pedido };
}

module.exports = { criarPedido, pedidos };
