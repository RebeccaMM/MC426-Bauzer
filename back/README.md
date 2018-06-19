Antes de executar: npm install

Para executar faça: node server.js
OU npm start na pasta /back


### Fluxo para adicionar um novo endpoint (exemplificando com Usuario):

- Dentro da pasta 'query', criar o arquivo usuarioDAO.js, que conterá o método
que executa a query do BD;

- Criar o arquivo usuario.js, o nosso controller, que executa o método declarado
em usuarioDAO, e retorna o json de resultado ou uma mensagem de erro;

- No arquivo router.js:
incluir o controller usuario: var usuario = require('./usuario');
dentro do método defineRoutes, incluir a rota para a execução do seu novo método:
app.get('/usuario', usuario.get);

***

### Método GET:

Exemplo de endpoint sem parâmetro: /usuario

Exemplo de endpoint com parâmetro: /usuario/:id


### Método POST:

Exemplo de endpoint: /usuario/login

Para testar pelo Postman:

- método: POST
- URL: http://localhost:8081/usuario/login
- Adicionar ao Body: (selecionar Raw, tipo JSON)
```json
{
	"username": "marina",
	"senha": "123"
}
```
- Send
- Se o login existir no banco, deve retornar 200: ':top:'; se não existir, deve retornar 403: 'Usuario ou senha invalidos'


**That's all, folks (:**
