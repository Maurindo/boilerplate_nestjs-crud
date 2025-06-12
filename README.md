# 🏢 API RESTful de Gerenciamento de Empresas, Produtos e Responsáveis

Este projeto é uma API backend construída com **Node.js**, **Express** e **Prisma ORM**, desenvolvida com foco em boas práticas, organização de código e clareza nos fluxos CRUD. Ideal para cenários onde empresas possuem responsáveis e produtos relacionados.

---

## 🚀 Objetivo

Oferecer uma estrutura backend robusta para gerenciar:

- **Responsáveis** (com nome, telefone, e-mail e CPF)
- **Empresas** (ligadas a um responsável)
- **Produtos** (com nome, descrição, preço e pertencente a uma empresa)

---

## 🔧 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL via Docker] (ou SQLite/PostgreSQL opcional)
- [CORS + JSON Middleware]

---

## 🧠 O que você vai encontrar

- ✅ Arquitetura clara separando a lógica de banco (`conection.js`) e rotas (`server.js`)
- ✅ Tratamento de erros e validação de dados (tipos, campos obrigatórios, mensagens claras)
- ✅ Uso correto de relacionamentos no Prisma (1-N entre Empresa e Produtos, e Empresa-Responsável)
- ✅ Código pronto para ser escalado, testado e conectado ao frontend

---

## 📦 Endpoints

### Responsável
| Método | Rota                      | Descrição                     |
|--------|---------------------------|-------------------------------|
| POST   | `/create/responsavel`     | Cria um novo responsável      |
| DELETE | `/responsavel/delete/:id` | Deleta um responsável         |

### Empresa
| Método | Rota                      | Descrição                     |
|--------|---------------------------|-------------------------------|
| POST   | `/create/empresa`         | Cria uma nova empresa         |
| PUT    | `/empresa/atualizar/:id`  | Atualiza dados da empresa     |
| DELETE | `/empresa/delete/:id`     | Remove uma empresa            |

### Produto
| Método | Rota                       | Descrição                      |
|--------|----------------------------|--------------------------------|
| POST   | `/create/produto`          | Cadastra um novo produto       |
| PUT    | `/produto/atualizar/:id`   | Atualiza um produto            |
| DELETE | `/produto/delete/:id`      | Exclui um produto              |

---

## 🐳 Usando Docker + MySQL

Este projeto utiliza um banco **MySQL rodando via Docker** para facilitar o desenvolvimento e garantir um ambiente consistente.

### 🔗 Variável de ambiente `.env`:

```env
DATABASE_URL="mysql://root:094710@172.17.0.2:3306/crud"

🚀 Subindo o container do MySQL com Docker


docker run --name mysql-crud \
-e MYSQL_ROOT_PASSWORD=094710 \
-e MYSQL_DATABASE=crud \
-p 3306:3306 \
-d mysql:8


```


### 🗃️ Estrutura de Diretórios

``` 
📁 Estrutura de Diretórios

.
├── banco_dados
│   └── conection.js     # Funções Prisma para CRUD e validações
├── server.js            # Configuração do Express, middlewares e rotas
├── .env                 # Variáveis de ambiente (ex: DATABASE_URL)
├── package.json         # Dependências e scripts do projeto
├── README.md            # Documentação do projeto
└── prisma
    └── schema.prisma    # Definição do modelo de dados e relações
