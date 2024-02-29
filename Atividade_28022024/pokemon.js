const fs = require('fs/promises');

async function escreverArquivo(nomeArquivo, dados) {
    await fs.appendFile(nomeArquivo, dados + '\n');
}

async function lerArquivo(nomeArquivo) {
    return fs.readFile(nomeArquivo, 'utf-8');
}

async function getPokemonData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const { results } = await response.json();

    for (let i = 0; i < results.length; i++) {
        const url = results[i].url;
        const resposta = await fetch(url);
        const data = await resposta.json();

        const pokemonInfo = {
            nome: data.name,
            tipos: data.types.map(type => type.type.name),
            peso: data.weight,
            altura: data.height,
            numero_dex: data.id,
            link_Sprite: data.sprites.back_default
        };

        const pokemonData = JSON.stringify(pokemonInfo, null, 2);
        await escreverArquivo('pokemon.json', pokemonData);
    }

    return lerArquivo('pokemon.json');
}

getPokemonData()
    .then(dadosPokemonSalvo => {
        console.log("Conteúdo do arquivo pokemon: ", dadosPokemonSalvo);
    })
    .catch(error => {
        console.error("Erro ao executar o Get", error);
    });
