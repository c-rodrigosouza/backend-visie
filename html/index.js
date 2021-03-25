
// Porta em que será feito as alterações/consultas. Alterar caso tenha alterado no backend.
const porta = 3000

// Função que atualiza a lista de usuários. Utilizada ao carregar a página e ao fazer alguma alteração no banco de dados.
function atualizarLista() {
  // fazendo a consulta na API.
  fetch(`http://localhost:${porta}/pessoas`)
    .then((response) => response.json())
    .then((json) => {
      lista = ""
      json.forEach((ele, ind) => {
        lista = lista + `<tr>
      <td>${ele.nome.split(' ')[0]}</td>
      <td>${ele.rg}</td>
      <td>${ele.cpf}</td>
      <td>${ele.funcao}</td>
      <td class="delete-button" onclick="deletarItem(${ele.id})">Deletar Registro</td>
      </tr>`
      })

      // Criando a tabela no HTML.
      document.querySelector('.tabela-de-pessoas').innerHTML = `
    <tr>
    <th colspan="5" class="titulo-tabela">Tabela de Pessoas</th>
    </tr>
    <tr>
    <th class="titulo-tabela">Nome</th>
    <th class="titulo-tabela">RG</th>
    <th class="titulo-tabela">CPF</th>
    <th class="titulo-tabela">Função</th>
    <th class="titulo-tabela"></th>
    </tr>
    ${lista}`
    });
}

// Executando a atualização da lista assim que carrega a página
atualizarLista()


// Função para cadastrar novo usuário. Envia os dados para a API e quando recebe o retorno utiliza a função atualizarLista() para atualizar a lista com o novo cadastro.
function cadastrarNovoUsuario() {
  if (isNaN(document.querySelector('#funcao').value)) {
    alert('No campo "Função" deve ser digitado um número.')
    return
  }
  document.querySelector('#cadastro input[type="button"]').className = "carregando"
  form = {
    "nome": document.querySelector('#nome').value,
    "rg": document.querySelector('#rg').value,
    "cpf": document.querySelector('#cpf').value,
    "funcao": document.querySelector('#funcao').value
  }
  fetch(`http://localhost:${porta}/cadastrar`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(form)
  })
    .then((response) => response.json())
    .then((json) => {
      atualizarLista()
      document.querySelector('#cadastro input[type="button"]').className = ""
    });
}

// Função para deletar algum item da lista. Envia o ID do item para a API e atualiza a lista (atualizarLista()) quando recebe o retorno.
function deletarItem(item){
  fetch(`http://localhost:${porta}/delete`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "DELETE",
    body: JSON.stringify({id: item})
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.msg)
      atualizarLista()
    })
}