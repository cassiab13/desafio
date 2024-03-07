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

// function percorrerArray (array){
//     let produtosEscolhidos = [];
//     let numerosSorteados = [];

//     while (produtosEscolhidos.length < 3){
//         let numeros = Math.floor(Math.random() * 6);
//         if(!produtosEscolhidos.includes(array[numeros])){
//             produtosEscolhidos.push(array[numeros])
//         }   
//      console.log(produtosEscolhidos);
//     } 
    
// }

// percorrerArray();

//map, find, filter, reduce

function getRandomValuesFromArray(array, randomQuantity){
    if(randomQuantity > array.length){ return "Deu ruim"}

    let randomProducts = [];

    while(randomProducts.length < randomQuantity){
        let randomNumber = Math.floor(Math.random() * array.length);
        if(!randomProducts.includes(array[randomNumber]));
            randomProducts.push(array[randomNumber]);
    }
    return randomProducts;
}

