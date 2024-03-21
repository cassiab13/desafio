const produtos = [
    { nome: "Caneta", quantidade: 20, valor: 2.50 },
    { nome: "Caderno", quantidade: 10, valor: 15.00 },
    { nome: "Tesoura", quantidade: 35, valor: 5.50 },
    { nome: "Impressora", quantidade: 2, valor: 699.99 },
    { nome: "Celular", quantidade: 3, valor: 1500 },
    { nome: "Tenis", quantidade: 1, valor: 2000 },
    { nome: "Caneca", quantidade: 8, valor: 35 },
]

//Percorrer o array de produtos e retornar um novo array com 3 produtos escolhidos de forma aleatória 
//e não pode haver repetição de produtos

function percorrerArray(array) {
    let produtosEscolhidos = [];
    let numerosSorteados = [];

    while (produtosEscolhidos.length < 3) {
        let numeros = Math.floor(Math.random() * array.length);
        if (!numerosSorteados.includes(numeros)) {
            numerosSorteados.push(numeros);
            produtosEscolhidos.push(array[numeros]);
        }
    }

    console.log(produtosEscolhidos);
}

percorrerArray(produtos);

//map, find, filter, reduce
const filteredProducts = produtos.filter((produtos) => produtos.valor > 10);
console.log(filteredProducts);

const  mappedProducts = produtos.map((produtos) => produtos.quantidade * produtos.valor);
console.log(mappedProducts);

const findProduct = produtos.find((produtos) => produtos.nome == 'Tenis');
console.log(findProduct);


const reducedProduct = produtos.reduce((ac, produto) => {
    return ac + (produto.valor * produto.quantidade)}, 0
);
console.log(`Valor total da compra: ${reducedProduct}`);