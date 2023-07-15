const express = require('express');
const { MongoClient } = require('mongodb');
const server = express();
const { readFile } = require('fs').promises;
const ejs = require('ejs');
const uri = require("./atlas_uri");
const port = 8080;

const client = new MongoClient(uri);
const dataBaseName = "recipe_site";
const collectionName = "recipes";

server.set('view engine', 'ejs');

server.use(express.static('public'));

server.get('/', async (request, response) => {
    response.send(await readFile('./index.html', 'utf8'));
});

server.get('/receitas*', async (request, response) => {
    const name = request.path.split("/").pop();
    console.log(`Connection: ${client}`);
    upperName = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(`Name: ${upperName}`);
    data = await client.db(dataBaseName).collection(collectionName).findOne({ nome: upperName });
    console.log(`Found ${data.nome}`);
    console.log(`Imagem ${data.imagem}`);
    response.render('recipe', data);
    //response.send(await readFile('./receitas/recipe.html', 'utf8'));
});

server.use(async (request, response) => {
    response.status(404).send(await readFile('./404.html', 'utf8'));
});

server.listen(process.env.PORT || port, () => console.log(`App available on http://localhost:${port}`));

