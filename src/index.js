const express = require("express");
const path = require("path");


const cors = require('cors');
const router = require('./routes');
const app = express();
const server = require('http').createServer(app);

app.use(cors());

app.use(express.json());

app.use('/', router);

server.listen(3003, function() {
  console.info(server.address());
});

