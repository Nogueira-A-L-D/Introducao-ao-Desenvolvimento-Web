const express = require('express');
const server = express();
const { readFile } = require('fs').promises;

const port = 8080;

server.use(express.static('public'));

server.get('/', async (request, response) => {
    response.send(await readFile('./index.html', 'utf8'));
});

server.get('/receitas/brigadeiro', async (request, response) => {
    response.send(await readFile('./receitas/brigadeiro.html', 'utf8'));
});

server.use(async (request, response) => {
    response.status(404).send(await readFile('./404.html', 'utf8'));
});

server.listen(process.env.PORT || port, () => console.log(`App available on http://localhost:${port}`));