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
var Contract = require('web3-eth-contract');


// Used for parsing application/JSON
app.use(bodyParser.json());

// Used for application/xwww-
app.use(bodyParser.urlencoded({ extended : true}));

// Used for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// Importing JSON File and converting to object
const fs = require('fs');
var DownBadJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'build/contracts/DownBad.json')));

// Connect to network via RPC
var provider = new Web3.providers.HttpProvider("http://localhost:8545");

// Read JSON and attach RPC connection
Contract.setProvider("http://localhost:8545");
var downBad = new Contract(DownBadJSON.abi, '0xf11fdf80785243e5bf04189d3ac8283e0d6bdbb6');

app.get('/', function(req, res){

  res.sendFile('index.html', {root: __dirname});
});

app.post('/joinDownBad', function(req, res){

  // Print input to console
  console.log('This is the requesting address: ' + req.body.address);
  downBad.methods.joinDownBad(req.body.address).send({from : req.body.address}).then((value) => {
    if(value.status){
      console.log("Successfully added user to DownBad!");
      res.status(204);
      res.send();
    }
  }).catch((error) => {
    console.log(error);
    res.send();
  });

});

app.listen(port || 3000, () => {console.log("Server is up...")});
