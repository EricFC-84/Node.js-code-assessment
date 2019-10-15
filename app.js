const request = require('request');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

server.use(cors());
server.use(bodyParser.json());

//ENDPOINTS

//Get list of all clients
server.get("/clients", (req, res) => {

    request('http://www.mocky.io/v2/5808862710000087232b75ac', (error, response, body) => {
        if (error) throw error
        else {
            res.send(body)
        }
    });
})

//Get list of all policies
server.get("/policies", (req, res) => {

    request('http://www.mocky.io/v2/580891a4100000e8242b75c5', (error, response, body) => {
        if (error) throw error
        else {
            res.send(body)
        }
    });
})

server.listen(3000, () => {
    console.log('Listening on port 3000')
})