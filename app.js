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

//Get client data filtered by client Id
server.get("/clientID/:id", (req, res) => {
    let _id = req.params.id

    request('http://www.mocky.io/v2/5808862710000087232b75ac', (error, response, body) => {
        if (error) throw error
        else {
            let allClients = JSON.parse(body).clients
            let clientData = allClients.filter(client => client["id"] === _id)[0];

            if (clientData) {
                res.status(200).send({
                    "data": clientData
                })
            } else {
                res.status(404).send({
                    "message": "Client not found. Please check the ID is correct"
                })
            }
        }
    });
})

//Get client data filtered by client name
server.get("/clientName/:name", (req, res) => {
    let _name = req.params.name

    request('http://www.mocky.io/v2/5808862710000087232b75ac', (error, response, body) => {
        if (error) throw error
        else {
            let allClients = JSON.parse(body).clients
            let clientData = allClients.filter(client => client["name"] === _name)[0];

            if (clientData) {
                res.status(200).send({
                    "data": clientData
                })
            } else {
                res.status(404).send({
                    "message": "Client not found. Please check the name is correct"
                })
            }
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