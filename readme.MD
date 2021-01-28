# API TypeScript Cars

## Stack
Como linguagem de programação foi usado o typescript (usando o runtime nodeJS) com o objetivo de reduzir os possíveis erros de tipagem e trazer mais confiabilidade entre as comunicações de interface.

Para o gerenciamento dos dados foi ultilizado dois bancos, o Postgres como relacional para o tratamento de dados sobre usuário e gerenciamento das autenticações + criação do Json Web Token para proteger as demais rotas. Já para a gestão e armazenamento de dados mais flexíveis foi ultilizado o MongoDB.

### Sobre os pacotes:
- Express: Servidor HTTP,
- TypeORM: Para abstração da connectividade e querys no Postgres
- Mongoose: Para abstração da connectividade e querys no MongoDB
- JWT: Proteção nas rotas usando o Json Web Token
- BcryptJS: para a criptografia de conteúdos sensíveis

### Sobre a arquitetura:
Para facilitar a manutenção, desacoplamos todos os arquivos de código contidos na pasta `/src` usando os seguintes critérios:

- `/@types`: tipagem de interfaces de pacotes dependentes;
- `index.ts`: inicializador do servidor HTTP + Bancos de dados
- `routes.ts`: gerenciamento dos métodos e atividades de cada rotas
- `/database`: Arquivos de conexão com o banco de dados + migrations do Postgres
-  `/app`: arquivos que contém as regras de funcionamento do app;
- `/app/models`: Schema dos dados a serem salvos nos bancos de dados
- `app/controllers`: Atividades realizadas com cada um dos modelos de dados no banco de dados
- `app/middlewares`: Atividades realizadas durente as requisições, como a protenção das rotas por exemplo
```
.
├── ormconfig.json
├── readme.MD
├── src
│   ├── @types
│   │   └── express.d.ts
│   ├── app
│   │   ├── controllers
│   │   │   ├── AuthController.ts
│   │   │   ├── CarController.ts
│   │   │   └── UserController.ts
│   │   ├── middlewares
│   │   │   └── authMiddleware.ts
│   │   └── models
│   │       ├── Cars.ts
│   │       └── Users.ts
│   ├── database
│   │   ├── connectMongo.ts
│   │   ├── connectPostgres.ts
│   │   └── migrations
│   │       └── 1611755400993-CreateUsersTable.ts
│   ├── index.ts
│   └── routes.ts
└── tsconfig.json
```

## Rotas:
Usando modelos REST para o desenvolvimento das rotas, temos apenas 3 endpoints, sendo estes: `cars`, `users`, `auth`.

- `POST /cars`: adicionar novo carro
- `POST /users`: adicionar novo usuário
- `POST /auth`: realizar autenticação
- `GET /cars`: visualizar carros
-  `GET /cars`: visualizar usuários, possível apenas se você tem uma conta admin
- `PUT /cars`: editar algum carro, possível se foi adicionado por você ou se você tem conta admin
- `DELETE /cars`: deletar algum carro, possível se foi adicionado por você ou se você tem conta admin
