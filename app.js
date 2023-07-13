const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
    console.log('requested url: --V')
    if (req.url.indexOf('.css') != -1) {

        fs.readFile('./styles.css', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            res.end();
        });

    }
    if (req.url === '/') {
        fs.readFile("./index.html", function (err, data) {
            if (err) throw err;
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
    else if (req.url === '/receitas/brigadeiro.html') {
        fs.readFile('./receitas/brigadeiro.html', function (err, data) {
            if (err) throw err;
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
    else {
        fs.readFile('./404.html', function (err, data) {
            if (err) throw err;
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }

    if (req.url.indexOf('.js') != -1) { //req.url has the pathname, check if it conatins '.js'
        if (req.url === '/receitas/brigadeiro.html') {
            fs.readFile('./receitas/reviewrecipe.js', function (err, data) {
                if (err) console.log(err);
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.write(data);
                res.end();
            });
        }
    }
})

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});