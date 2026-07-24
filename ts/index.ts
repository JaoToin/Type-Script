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
const inputNome = document.querySelector('#inputNome') as HTMLInputElement; // CORREÇÃO: Estava faltando!
const inputValor = document.querySelector('#inputValor') as HTMLInputElement;
const inputDescricao = document.querySelector('#inputDescricao') as HTMLInputElement;
const btnCadastrar = document.querySelector('#btnCadastrar') as HTMLButtonElement;
const tabelaHTML = document.querySelector('#tabelaHTML') as HTMLTableSectionElement;
const inputPesquisa = document.querySelector('#inputPesquisa') as HTMLInputElement; // ADIÇÃO: Barra de pesquisa

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

// 7. Função para atualizar a tabela na tela e salvar 🔄
// Alterado para aceitar uma lista, facilitando a funcionalidade de pesquisa
function atualizarListaNaTela(listaParaMostrar: Produto[] = listaDeProdutos): void {
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
btnCadastrar.addEventListener('click', (event: Event) => {
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
tabelaHTML.addEventListener('click', (event: Event) => {
    const elementoClicado = event.target as HTMLElement;

    if (elementoClicado.classList.contains('btn-remover')) {
        const codigo = elementoClicado.getAttribute('data-codigo');

        if (codigo) {
            removerProduto(codigo);
            // Ao remover, se houver pesquisa ativa, o ideal é limpar a pesquisa ou refazer a tabela geral
            if (inputPesquisa) inputPesquisa.value = ''; 
            atualizarListaNaTela();
        }
    }
});

// 10. Evento de Pesquisa 🔍
if (inputPesquisa) {
    inputPesquisa.addEventListener('input', () => {
        const termoBusca = inputPesquisa.value.toLowerCase();
        
        const produtosFiltrados = listaDeProdutos.filter(produto => 
            produto.nome.toLowerCase().includes(termoBusca) || 
            String(produto.codigo).includes(termoBusca)
        );

        atualizarListaNaTela(produtosFiltrados);
    });
}

const listarProdutos = () => {
    return listaDeProdutos;
};

// 11. Inicialização da aplicação 🚀
carregarDoLocalStorage();
atualizarListaNaTela();

// Isola o arquivo no VS Code sem gerar sintaxe de módulo que quebra o navegador
export {}