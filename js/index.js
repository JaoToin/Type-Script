// Isolamos o arquivo para evitar erros de escopo global no VS Code
// 2. Lista de Produtos
let listaDeProdutos = [];
// 3. Seleção dos elementos do DOM
const inputNome = document.querySelector('#inputNome'); // CORREÇÃO: Estava faltando!
const inputValor = document.querySelector('#inputValor');
const inputDescricao = document.querySelector('#inputDescricao');
const btnCadastrar = document.querySelector('#btnCadastrar');
const tabelaHTML = document.querySelector('#tabelaHTML');
const inputPesquisa = document.querySelector('#inputPesquisa'); // ADIÇÃO: Barra de pesquisa
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
// 7. Função para atualizar a tabela na tela e salvar 🔄
// Alterado para aceitar uma lista, facilitando a funcionalidade de pesquisa
function atualizarListaNaTela(listaParaMostrar = listaDeProdutos) {
    tabelaHTML.innerHTML = '';
    listaParaMostrar.forEach((produto) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td><strong>${produto.nome}</strong></td>
            <td>R$ ${Number(produto.valor).toFixed(2)}</td>
            <td>${produto.descricao}</td>
            <td>
                <button class="btn-remover" data-codigo="${produto.codigo}" style="background: red; color: white; border: none; padding: 5px; cursor: pointer; border-radius: 3px;">❌ Remover</button>
            </td>
        `;
        tabelaHTML.appendChild(tr);
    });
    salvarNoLocalStorage();
}
// 8. Evento de Cadastrar
btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault(); // Evita recarregar a página caso esteja dentro de uma tag <form>
    const nome = inputNome.value.trim();
    const valor = Number(inputValor.value);
    const descricao = inputDescricao.value.trim();
    if (!nome || !valor || !descricao) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    adicionarProduto(nome, valor, descricao);
    // Limpar inputs
    inputNome.value = '';
    inputValor.value = '';
    inputDescricao.value = '';
    inputNome.focus();
    atualizarListaNaTela();
});
// 9. Evento de Remover (aplicado na tabela)
tabelaHTML.addEventListener('click', (event) => {
    const elementoClicado = event.target;
    if (elementoClicado.classList.contains('btn-remover')) {
        const codigo = elementoClicado.getAttribute('data-codigo');
        if (codigo) {
            removerProduto(codigo);
            // Ao remover, se houver pesquisa ativa, o ideal é limpar a pesquisa ou refazer a tabela geral
            if (inputPesquisa)
                inputPesquisa.value = '';
            atualizarListaNaTela();
        }
    }
});
// 10. Evento de Pesquisa 🔍
if (inputPesquisa) {
    inputPesquisa.addEventListener('input', () => {
        const termoBusca = inputPesquisa.value.toLowerCase();
        const produtosFiltrados = listaDeProdutos.filter(produto => produto.nome.toLowerCase().includes(termoBusca) ||
            String(produto.codigo).includes(termoBusca));
        atualizarListaNaTela(produtosFiltrados);
    });
}
const listarProdutos = () => {
    return listaDeProdutos;
};
// 11. Inicialização da aplicação 🚀
carregarDoLocalStorage();
atualizarListaNaTela();
