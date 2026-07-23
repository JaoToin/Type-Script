// Isolamos o arquivo para evitar erros de escopo global no VS Code

// 1. Modelo do Produto (Interface)
interface Produto {
    nome: string;
    valor: number;
    descricao: string;
    codigo: string | number;
}

// 2. Lista de Produtos
let listaDeProdutos: Produto[] = [];

// 3. Seleção dos elementos do DOM
const inputNome = document.querySelector('#inputNome') as HTMLInputElement;
const inputValor = document.querySelector('#inputValor') as HTMLInputElement;
const inputDescricao = document.querySelector('#inputDescricao') as HTMLInputElement;
const btnCadastrar = document.querySelector('#btnCadastrar') as HTMLButtonElement;
const listaHTML = document.querySelector('#listaHTML') as HTMLUListElement;

// 4. Funções para o localStorage 💾
function salvarNoLocalStorage(): void {
    localStorage.setItem('produtos', JSON.stringify(listaDeProdutos));
}

function carregarDoLocalStorage(): void {
    const dadosSalvos = localStorage.getItem('produtos');
    if (dadosSalvos) {
        listaDeProdutos = JSON.parse(dadosSalvos);
    }
}

// 5. Função para adicionar produto ➕
function adicionarProduto(nome: string, valor: number, descricao: string): void {
    const codigoAleatorio = Math.floor(Math.random() * 10000);

    const novoProduto: Produto = {
        nome: nome,
        valor: valor,
        descricao: descricao,
        codigo: codigoAleatorio
    };

    listaDeProdutos.push(novoProduto);
}

// 6. Função para remover produto pelo código 🗑️
function removerProduto(codigoParaRemover: string | number): void {
    listaDeProdutos = listaDeProdutos.filter(
        (produto) => String(produto.codigo) !== String(codigoParaRemover)
    );
}

// 7. Função para atualizar a lista na tela e salvar 🔄
function atualizarListaNaTela(): void {
    listaHTML.innerHTML = '';

    listaDeProdutos.forEach((produto) => {
        const li = document.createElement('li');

        // Number(produto.valor) garante que o toFixed(2) funcione mesmo se o localStorage tiver salvo como string antigamente
        li.innerHTML = `
      <strong>${produto.nome}</strong> - R$ ${Number(produto.valor).toFixed(2)} <br>
      <small>${produto.descricao}</small> | <em>Código: ${produto.codigo}</em>
      <button class="btn-remover" data-codigo="${produto.codigo}">❌ Remover</button>
    `;

        listaHTML.appendChild(li);
    });

    salvarNoLocalStorage();
}

// 8. Evento de Cadastrar
btnCadastrar.addEventListener('click', (event: Event) => {
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

// 9. Evento de Remover
listaHTML.addEventListener('click', (event: Event) => {
    const elementoClicado = event.target as HTMLElement;

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

// Isola o arquivo no VS Code sem gerar sintaxe de módulo que quebra o navegador
export {};