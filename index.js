import express from "express"
import cors from 'cors'
import { atualizarEmpresa, atualizarProduto, criarEmpresa, criarProduto, criarResponsavel, deletarEmpresa, deletarProduto, deletarResponsavel } from "./banco_dados/conection.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 4548;



//ROTAS
    //ROTA CRIAR RESPONSÁVEL
        app.post("/create/responsavel", async (req, res) => {
            const { nome, telefone, email, cpf } = req.body;
            if(!nome || !telefone || !email || !cpf || nome.trim() === "" || telefone.trim() === "" || email.trim() === "" || cpf.trim() === ""){
                return res.status(400).json({
                    message: "Todos os dados são obrigatórios!"
                })
            }

            try {
                const newMessage = await criarResponsavel(nome, telefone, email, cpf);
                res.status(201).json({
                    messagem: "Responsável criado com sucesso",
                    data: newMessage,
                })
            } catch (err) {
                res.status(508).json({
                    message: "Erro ao criar responsável",
                    error: err.message,
                })
            }
        })

    //ROTA CRIAR EMPRESA
        app.post("/create/empresa", async (req, res) => {
            const { nomeEmpresa, responsavelId } = req.body;
    
            if(!nomeEmpresa || responsavelId == null || nomeEmpresa.trim() === ""){
                return res.status(500).json({
                    message: "Todos os dados são obrigatórios para criar a empresa" 
                })               
            }
            const id = parseInt(responsavelId, 10);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "responsavelId deve ser um número inteiro válido",
                });
            }

             try {
                    const newMessage = await criarEmpresa(nomeEmpresa, id)
                    res.status(201).json({
                        message: "Empresa criada e ligada ao seu responsável sucesso",
                        data: newMessage,
                    })
                } catch (error) {
                    res.status(500).json({
                        message: "Erro ao criar Empresa",
                        error: error.message,
                    })
                }            
        })
    //ROTA CRIAR PRODUTO
        app.post("/create/produto", async (req, res) => {
            const { nomeProduto, descricao, preco, empresaId } = req.body;

            if(!nomeProduto || !preco || empresaId == null || nomeProduto.trim() === ""){
                return res.status(400).json({
                    message: "Todos os dados são obrigatórios para cadastrar o produto"
                })
            }

            const id = parseInt(empresaId, 10)
            if(isNaN(id)){
                return res.status(400).json({
                    message: "empresaId deve ser um número inteiro válido",
                });
            }
            const valor = parseFloat(preco);
            if (isNaN(valor)) {
                return res.status(400).json({
                    message: "preco deve ser um número válido",
                });
            }

            try {
                const newMessage = await criarProduto(nomeProduto, descricao, valor, id)
                res.status(200).json({
                    message: "Produto criado e registrado a sua empresa",
                    data:newMessage,
                })             
            } catch (error) {
                res.status(500).json({
                    message: "Erro ao criar produto",
                    error: error.message
                })
            }
        })

    //ROTA DELETAR PRODUTO
        app.delete("/produto/delete/:id", async (req, res) =>{
            const { id } = req.params;
            
            try {
                const newMessage = await deletarProduto(id);

                res.status(200).json({
                    message: "Produto deletado com sucesso",
                    data: newMessage,
                })
            } catch (error) {
               res.status(500).json({
                message: "Erro ao deletar produto",
                error: error.message,
               }) 
            }
        })

    //ROTA DELETAR EMPRESA
        app.delete("/empresa/delete/:id", async (req, res) => {
            const { id } = req.params;

            try {
                const newMessage = await deletarEmpresa(id);

                res.status(200).json({
                    message: "Empresa deletado com sucesso",
                    data: newMessage,
                })
            } catch (error) {
                res.status(500).json({
                    message: "Erro ao deletar empresa",
                    error: error.message,
                })
            }
        })

    //ROTA DELETA RESPONSÁVEL
        app.delete("/responsavel/delete/:id", async (req, res) => {
            const { id } = req.params;

            try {
                const newMessage = await deletarResponsavel(id);

                res.status(200).json({
                    message: "Responsável deletado com sucesso",
                    data: newMessage,
                })
            } catch (error) {
                res.status(500).json({
                    message: "Erro ao deletar responsável",
                    error: error.message,
                })
            }
        })

    //ROTA ATUALIZAR OU MODIFICAR
        app.put("/produto/atualizar/:id", async (req, res) => {
            const { id } = req.params;

            try {
                const { nome, descricao, valor} = req.body
                              
                const newMessage = await atualizarProduto(id, nome, descricao, valor)
                res.status(200).json({
                    message: "Produto atualizado",
                    data: newMessage,
                })
            } catch (error) {
                res.status(500).json({
                    message: "Erro ao atualizar produto",
                    error: error.message,
                })
            }
        })

    //ROTA ATUALIZAR EMPRESA
        app.put("/empresa/atualizar/:id", async (req, res) =>{
            const { id } = req.params;

            try {
                const { nomeEmpresa, responsavelId } = req.body
                
                const newMessage = await atualizarEmpresa(id, nomeEmpresa, responsavelId)
                res.status(200).json({
                    message: "Dados da empresa atualizado",
                    data: newMessage
                })
            } catch (error) {
                res.status(500).json({
                    message: "Erro para atualizar os dados da empresa",
                    error: error.message,
                })
            }
        })


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

