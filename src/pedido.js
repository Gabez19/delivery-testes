const { banco } = require('./db');

function criarPedido(idCliente, produtos) {
  // Validações
  if (!idCliente || !produtos || produtos.length === 0) {
    return { sucesso: false, mensagem: 'Dados do pedido incompletos' };
  }

  // Verifica se cliente existe
  const cliente = banco.clientes.find(c => c.id === idCliente);
  if (!cliente) {
    return { sucesso: false, mensagem: 'Cliente não encontrado' };
  }

  // Verifica se produtos existem (em um sistema real, validaria com o banco de dados)
  const produtosInvalidos = produtos.filter(p => !p.id || !p.nome || !p.preco);
  if (produtosInvalidos.length > 0) {
    return { sucesso: false, mensagem: 'Alguns produtos são inválidos' };
  }

  // Cria o pedido
  const pedido = {
    id: banco.pedidos.length + 1,
    idCliente,
    produtos: produtos.map(p => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      quantidade: p.quantidade || 1
    })),
    data: new Date().toISOString(),
    status: 'em preparo',
    enderecoEntrega: cliente.endereco || null
  };

  banco.pedidos.push(pedido);
  
  return { 
    sucesso: true, 
    mensagem: 'Pedido criado com sucesso', 
    pedido 
  };
}

// Função para buscar pedidos de um cliente
function buscarPedidosCliente(idCliente) {
  return banco.pedidos.filter(p => p.idCliente === idCliente);
}

module.exports = { criarPedido, buscarPedidosCliente };