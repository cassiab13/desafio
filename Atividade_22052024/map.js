const produtos = [
    { nome: "Maçã", categoria: "Fruta" },
    { nome: "Banana", categoria: "Fruta" },
    { nome: "Cenoura", categoria: "Legume" },
    { nome: "Brocolis", categoria: "Legume" },
]

const categoriaMap = new Map();
for (const produto of produtos) {
    const categoria = produto.categoria;
    if(!categoriaMap.has(categoria)){
        categoriaMap.set(categoria, [])
    }
    categoriaMap.get(categoria).push(produto)
}
    
console.log(categoriaMap)
