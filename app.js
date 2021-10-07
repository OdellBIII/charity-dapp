const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer();

const app = new express();
const contract = require('truffle-contract');
const path = require('path');
const Web3 = require('Web3');


// Used for parsing application/JSON
app.use(bodyParser.json());

// Used for application/xwww-
app.use(bodyParser.urlencoded({ extended : true}));

// Used for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// Importing JSON File and converting to object
const fs = require('fs');
var DownBadJSON;
fs.readFile(path.join(__dirname, 'build/contracts/DownBad.json'), "utf8", (err, jsonString) => {
  if(err){
    console.log("File read failed:", err);
    return ;
  }
  console.log("JSON File read:", jsonString)
  DownBadJSON = JSON.parse(jsonString);
});

// Connect to network via RPC
var provider = new Web3.providers.HttpProvider("http://localhost:8545");

// Read JSON and attach RPC connection
var Contract = require('web3-eth-contract');
Contract.setProvider("http://localhost:8545");


//var downBadContract = new Contract(DownBadJSON);
app.get('/', function(req, res){

  res.sendFile('index.html', {root: __dirname});
});

app.post('/joinDownBad', function(req, res){

  // Print input to console
  console.log(req.body);
});

app.listen(port || 3000, () => {console.log("Server is up...")});
