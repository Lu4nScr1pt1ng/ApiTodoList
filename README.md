# Projeto API REST

Uma API REST com autenticação jwt tem um CRUD para a criação de um app de todolist, cada usuario terá suas proprias informação na db

# Usado no projeto

- Node.js
- Javascript
- Express
- MongoDB
- JWT
- CRUD


# Como rodar

Para instalar todas as dependencias

- npm i

Esse projeto utiliza dotenv pra colocar informação sobre o MongoDB, porta para rodar o servidor e um secret para hash.

Exemplo do que colocar no .env

Pode ser usado um cluster gratuito do MongoDB

/.env

PORT=3333 <br />
DATABASE_URL=mongodb+srv://exemeplo/exemplo <br />
SECRET=algoaleatorioasvezesnaokkk333daw3421d23*3¨$ <br />

Com o dotenv configurado basta executar um:

- npm run start

Toda resposta da API será em JSON!

# Endpoints AUTH

### Registrar novo usuario:

Faça uma requisição "POST" para a rota "/auth/register" com um body JSON contendo:

{
	"name": "Luandev",
	"email": "luan@dev.com",
	"password": "luandev",
	"confirmpassword": "luandev"
}

Exemplo: 

![register new user](/docs/register.png)


### Fazer login em um usuario:

Aqui retornara o token unico para ser aproveitado!

Faça uma requisição "POST" para a rota "/auth/login" com um body JSON contendo:

{
	"email": "luan@dev.com",
	"password": "luandev"
}

Exemplo: 

![login](/docs/login.png)


### Pegar informação do usuario logado:

Retornara inforamação completas dos usuario menos a senha

Rota privada - precisa do token ja inserido

Faça uma requisição "GET" para a rota "/auth/user"

Exemplo:

![show user info](/docs/usershow.png)


### Endpoints TodoLIST

Para conseguir acessar os endpoint do TODO todas as rotas são protegidas (precisa do token informado no endpoint de login)


### Mostrar todas as tarefas 

Vai mostrar todas as tasks do usuario logado 

Faça uma requisição "GET" para "/board"

Exemplo: 

![show all task](/docs/boardindex.png)

### Criar nova tarefa

Para criar uma nova tarefa e guarda no banco de dados

Faça uma requisição "POST" para "/board/task/new" com o body JSON:

{
	"text": "aqui vem o texto da tarefa"
}

Exemplo: 

![new task](/docs/newtask.png)

### Deleter uma tarefa

Para deletar apenas uma tarefa.
id da tarefa é passado pela url

Faça uma requisição "DELETE" para "/board/task/:id" 

Exemplo: 

![new task](/docs/deletetask.png)

### Exibir uma task 

Retorna apenas uma tarefa pelo id dela
id da tarefa é passada pela url

Faça uma requisição "GET" para "/board/task/:id" 

Exemplo: 

![show one task](/docs/showone.png)


