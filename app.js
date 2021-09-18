const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = new express();

app.get('/', function(req, res){

  res.sendFile('index.html', {root: __dirname});
});

app.listen(port || 3000, () => {console.log("Server is up...")});
