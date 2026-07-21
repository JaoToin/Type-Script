// 2. Lista de Produtos
let listaDeProdutos = [];
// 3. Seleção dos elementos do DOM
const inputNome = document.querySelector('#inputNome');
const inputValor = document.querySelector('#inputValor');
const inputDescricao = document.querySelector('#inputDescricao');
const btnCadastrar = document.querySelector('#btnCadastrar');
const listaHTML = document.querySelector('#listaHTML');
// 4. Funções para o localStorage 💾
function salvarNoLocalStorage() {
    localStorage.setItem('produtos', JSON.stringify(listaDeProdutos));
}
function carregarDoLocalStorage() {
    const dadosSalvos = localStorage.getItem('produtos');
    if (dadosSalvos) {
        listaDeProdutos = JSON.parse(dadosSalvos);
    }
}
// 5. Função para adicionar produto ➕
function adicionarProduto(nome, valor, descricao) {
    const codigoAleatorio = Math.floor(Math.random() * 10000);
    const novoProduto = {
        nome: nome,
        valor: valor,
        descricao: descricao,
        codigo: codigoAleatorio
    };
    listaDeProdutos.push(novoProduto);
}
// 6. Função para remover produto pelo código 🗑️
function removerProduto(codigoParaRemover) {
    listaDeProdutos = listaDeProdutos.filter((produto) => String(produto.codigo) !== String(codigoParaRemover));
}
// 7. Função para atualizar a lista na tela e salvar 🔄
function atualizarListaNaTela() {
    listaHTML.innerHTML = '';
    listaDeProdutos.forEach((produto) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <strong>${produto.nome}</strong> - R$ ${produto.valor.toFixed(2)} <br>
      <small>${produto.descricao}</small> | <em>Código: ${produto.codigo}</em>
      <button class="btn-remover" data-codigo="${produto.codigo}">❌ Remover</button>
    `;
        listaHTML.appendChild(li);
    });
    // Salva no navegador sempre que a tela for atualizada!
    salvarNoLocalStorage();
}
// 8. Evento de Cadastrar
btnCadastrar.addEventListener('click', () => {
    const nome = inputNome.value;
    const valor = Number(inputValor.value);
    const descricao = inputDescricao.value;
    if (!nome || !valor || !descricao) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    adicionarProduto(nome, valor, descricao);
    // Limpar inputs
    inputNome.value = '';
    inputValor.value = '';
    inputDescricao.value = '';
    atualizarListaNaTela();
});
// 9. Evento de Remover
listaHTML.addEventListener('click', (event) => {
    const elementoClicado = event.target;
    if (elementoClicado.classList.contains('btn-remover')) {
        const codigo = elementoClicado.getAttribute('data-codigo');
        if (codigo) {
            removerProduto(codigo);
            atualizarListaNaTela();
        }
    }
});
// 10. Inicialização da aplicação 🚀
carregarDoLocalStorage();
atualizarListaNaTela();
export {};
