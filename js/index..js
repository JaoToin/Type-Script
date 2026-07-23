// Isolamos o arquivo para evitar erros de escopo global no VS Code
// 2. Lista de Produtos
let listaDeProdutos = [];
// 3. Seleção dos elementos do DOM
const inputNome = document.querySelector('#inputNome');
const inputValor = document.querySelector('#inputValor');
const inputDescricao = document.querySelector('#inputDescricao');
const btnCadastrar = document.querySelector('#btnCadastrar');
// Seleção alterada para a tbody da tabela
const tabelaHTML = document.querySelector('#tabelaHTML');
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
function atualizarListaNaTela() {
    tabelaHTML.innerHTML = '';
    listaDeProdutos.forEach((produto) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td><strong>${produto.nome}</strong></td>
            <td>R$ ${Number(produto.valor).toFixed(2)}</td>
            <td>${produto.descricao}</td>
            <td>
                <button class="btn-remover" data-codigo="${produto.codigo}">❌ Remover</button>
            </td>
        `;
        tabelaHTML.appendChild(tr);
    });
    salvarNoLocalStorage();
}
// 8. Evento de Cadastrar
btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault(); // Evita recarregar a página caso esteja dentro de uma tag <form>
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
// 9. Evento de Remover (aplicado na tabela)
tabelaHTML.addEventListener('click', (event) => {
    const elementoClicado = event.target;
    if (elementoClicado.classList.contains('btn-remover')) {
        const codigo = elementoClicado.getAttribute('data-codigo');
        if (codigo) {
            removerProduto(codigo);
            atualizarListaNaTela();
        }
    }
});
const listarProdutos = () => {
    return listaDeProdutos;
};
// 10. Inicialização da aplicação 🚀
carregarDoLocalStorage();
atualizarListaNaTela();
