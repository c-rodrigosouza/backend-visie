/* OBS IMPORTANTE: Na descrição do projeto solicitava que fosse retornado do banco de dados
as colunas 'nome' e 'data de admissão' da tabela pessoas, porém não existia a coluna 'data de admissão'
na tabela, então foram utilizadas as outras colunas que haviam no banco. */

async function connect() {
  // Dados do banco (Geralmente não enviado para o Github, mas deixei para ser visto no teste).
  const user = 'visie_user'
  const pass = 'visie_pass'
  const url = 'db4free.net'
  const dataBase ='visie_db'

  // Caso já exista uma conexão, irá manter a existente ao invés de criar uma nova.
  if (global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  // Realizando a conexão com o banco utilizando mysql2.
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(`mysql://${user}:${pass}@${url}/${dataBase}`);
  global.connection = connection;
  return connection;
}

// Função que retorna os dados das pessoas na tabela 'pessoas' no banco de dados..
async function selectPessoas() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT nome, rg, cpf, funcao, id FROM pessoas;');
  return rows;
}

// Função que insere novas pessoas na tabela 'pessoas'.
async function insertPessoas(pessoa){
  const conn = await connect();
  const sql = 'INSERT INTO pessoas(nome,rg,cpf,funcao) VALUES (?,?,?,?);';
  const values = [pessoa.nome, pessoa.rg, pessoa.cpf, pessoa.funcao];
  return await conn.query(sql, values);
}

// função que deleta alguma pessoa na tabela 'pessoas'
async function deletePessoa(id){
    const conn = await connect();
    const sql = 'DELETE FROM pessoas where id=?;';
    return await conn.query(sql, [id]);
}

module.exports = { selectPessoas, insertPessoas, deletePessoa }
