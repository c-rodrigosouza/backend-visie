const express = require('express')
const app = express()
const db = require("./db");

// Porta do servidor, alterar aqui caso queira utilizar outra porta.
const porta = 3000

const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Função que retorna o JSON com os dados das pessoas.
app.get('/pessoas', (req, res) => {
  (async () => {
    const clientes = await db.selectPessoas();
    res.send(clientes)
    console.log('Uma consulta foi realizada no banco de dados.')
  })();
})

// Função que realiza o cadastro de novas pessoas
app.post('/cadastrar', (req, res) => {
  (async () => {
    const result = await db.insertPessoas({ nome: req.body.nome, rg: req.body.rg, cpf: req.body.cpf, funcao: req.body.funcao });
    res.send({"msg": "Dados gravados."})
    console.log('Foi adicionado 1 registro ao banco de dados.')
  })();
})

// Função que deleta pessoas.
app.delete('/delete', (req, res) => {
  (async () => {
    const result3 = await db.deletePessoa(req.body.id);
    res.send({"msg" : `Registro deletado com sucesso.`})
    console.log('Foi deletado 1 registro do banco de dados.')
  })()
})

app.listen(porta, () => {
  console.log(`Executando backend na porta ${porta}`)
})