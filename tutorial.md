PASSO A PASSO PARA RODAR O PROJETO DELIVERY

1. INSTALAÇÃO
- Tenha Node.js instalado (versão 14+)
- Baixe ou extraia os arquivos do projeto numa pasta

2. CONFIGURAÇÃO INICIAL
Abra o terminal na pasta do projeto e execute:
npm install express

3. INICIAR O SERVIDOR BACKEND
Execute no terminal:
node api.js
O servidor rodará em http://localhost:3000

4. ABRIR O FRONTEND
Abra o arquivo index.html no navegador:
- Clique 2x no arquivo OU
- Use a extensão Live Server do VS Code

5. USO DO SISTEMA
- Na tela inicial:
  * Cadastre um usuário (nome, email e CEP)
  * Faça login usando o email cadastrado
- Após login:
  * Adicione produtos (nome e preço)
  * Edite ou exclua produtos existentes

6. REINICIAR O SISTEMA
- Para limpar todos os dados:
  * Pressione Ctrl+C no terminal
  * Execute node api.js novamente

7. TESTES (OPCIONAL)
Para testar a API diretamente:
- Use ferramentas como Postman ou Insomnia
- Envie requisições para:
  * POST /usuarios (cadastro)
  * POST /login
  * GET/POST/PUT/DELETE /produtos

OBSERVAÇÕES:
- Dados são salvos apenas em memória (perdidos ao reiniciar)
- Login simplificado (não usa senha)
- Projeto acadêmico básico