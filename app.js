const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer();

const app = new express();
const path = require('path');


// Used for parsing application/JSON
app.use(bodyParser.json());

// Used for application/xwww-
app.use(bodyParser.urlencoded({ extended : true}));

// Used for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// Importing JSON File and converting to object
const fs = require('fs');

app.get('/', function(req, res){

  res.sendFile('index.html', {root: __dirname});
});

app.listen(port || 3000, () => {console.log("Server is up...")});
