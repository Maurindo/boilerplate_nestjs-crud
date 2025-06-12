import { PrismaClient } from"@prisma/client";
const prisma = new PrismaClient();


//CRIAR RESPONSÁVEL
export async function criarResponsavel(nome, telefone, email, cpf) {
    await prisma.responsavel.create({
        data:{
            nome: nome,
            telefone: telefone,
            email: email,
            cpf: cpf
        }
    })
}

//CRIAR EMPRESA
export async function criarEmpresa(nomeEmpresa, responsavelId) {
    const id = parseInt(responsavelId, 10)
    if(isNaN(id)){
        throw new Error("responsavel deve ter um número inteiro")
    }
    await prisma.empresa.create({
        data:{
            nome:nomeEmpresa,
            responsavel:{
                connect: {id},
            }
        }
    })
}

//CRIAR PRODUTO
export async function criarProduto(nomeProduto, descricao, preco, empresaId) {
    const valor = parseFloat(preco)
    if (isNaN(valor)) {
      throw new Error('preco deve ser um número válido');
    }
    const id = parseInt(empresaId, 10)
    
    await prisma.produto.create({
        data:{
            nome:nomeProduto,
            descricao:descricao || null,
            preco:valor,
            empresa:{
                connect:{id},
                },
            }
        })

}

//DELETA PRODUTO
export async function deletarProduto(identificar) {
    const id = parseInt(identificar)
    if (isNaN(id)){
        throw new Error("O id do produto deve ser um número inteiro")
    }
    await prisma.produto.delete({
        where:{
            id:id,
        },
    })
}

//DELETAR EMPRESA
export async function deletarEmpresa(identificar) {
     const id = parseInt(identificar)
    if (isNaN(id)){
        throw new Error("O id da empresa deve ser um número inteiro")
    }
    await prisma.empresa.delete({
        where:{
            id:id,
        },
    })
}

//DELETAR RESPONSÁVEL
export async function deletarResponsavel(identificar) {
    const id = parseInt(identificar)
    if (isNaN(id)){
        throw new Error("O id do responsável deve ser um número inteiro")
    }
    await prisma.responsavel.delete({
        where:{
            id:id,
        },
    })
}

//ATUALIZAR OU MODIFICAR PRODUTO
export async function atualizarProduto(identificar, nome, descricao, valor) {
    const id = parseInt(identificar)
    const preco = parseFloat(
    String(valor)
      .replace("R$", "")
      .replace(",", ".")
      .trim()
  );
    if (isNaN(preco)) {
      throw new Error(`Preço deve ser um número válido ${valor},,,,${preco}`);
    }
    if(isNaN(id)){
        throw new Error("O id do produto deve ser um número inteiro")
    }
    await prisma.produto.update({
        where:{
            id:id,
        },data:{
            nome:nome,
            descricao:descricao || null,
            preco:preco,

        }
    })    
}

//ATUALIZAR NOME DA EMPRESA
export async function atualizarEmpresa(identificador, nome, responsavel) {
    const id = parseInt(identificador, 10)
    const responsavelId = parseInt(responsavel, 10)
    //console.log(nome)
    await prisma.empresa.update({
        where:{id:id},
        data:{
            nome:nome,
            responsavel:{
                connect:{id:responsavelId}
            }
        }
    })
}