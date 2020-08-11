const express = require('express');
const http = require('http');

var app = express();
const PORT = 8080;
app.set('port', PORT);
app.get('/', (request, response) => {response.sendFile(__dirname + '/LinearAlgebra.wasm');});

var server = http.Server(app);
server.listen(PORT, () => {console.log("serving on port",PORT);});
