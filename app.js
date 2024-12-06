const express = require('express');
const { MongoClient } = require('mongodb');
const server = express();
const { readFile } = require('fs').promises;
const ejs = require('ejs');

require('dotenv').config();

const port = 8080;
const client = new MongoClient(process.env.URI);
const dataBaseName = "recipe_site";
const collectionName = "recipes";

server.set('view engine', 'ejs');

server.use(express.static('public'));

server.get('/', async (request, response) => {
    //response.send(await readFile('./views/index.ejs', 'utf8'));
    data = await client.db(dataBaseName).collection(collectionName).find({},{nome: 1}).toArray();
    response.render('index',data);
});

server.get('/receitas*', async (request, response) => {
    const name = request.path.split("/").pop();
    const decodedName = decodeURIComponent(name); // Decodifica e substitui %20 por espaço
    upperName = decodedName.charAt(0).toUpperCase() + decodedName.slice(1);
    data = await client.db(dataBaseName).collection(collectionName).findOne({ nome: upperName });
    //data.imagem = "data:image/svg+xml;base64, " + data.imagem;
    response.render('recipe', data);
});

server.use(async (request, response) => {
    response.status(404).send(await readFile('./404.html', 'utf8'));
});

server.listen(process.env.PORT || port, () => console.log(`App available on http://localhost:${port}`));

