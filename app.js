const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = new express();
const contract = require('truffle-contract');
const path = require('path');
const Web3 = require('Web3');
const DownBadJSON = require(path.join(__dirname, 'build/contracts/DownBad.json'));

// Connect to network via RPC
var provider = new Web.providers.HttpProvider("http://localhost:8545");


// Read JSON and attach RPC connection
var DownBad = contract(DownBadJSON);
DownBad.setProvider(provider);

app.get('/', function(req, res){

  res.sendFile('index.html', {root: __dirname});
});

app.put('/joinDownBad', function(req, res){

  joinDownBad();
});

app.listen(port || 3000, () => {console.log("Server is up...")});
