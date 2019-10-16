const request = require('request');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const server = express();

server.use(cors());
server.use(bodyParser.json());

//ENDPOINTS

//Login: only email necessary
server.post('/login', (req, res) => {
    let loginEmail = req.body.email;

    if (loginEmail == undefined || loginEmail == "") {
        //No email in the request body
        res.status(400).send({
            "message": "No email address was provided"
        })
    } else {
        request('http://www.mocky.io/v2/5808862710000087232b75ac', (error, response, body) => {
            if (error) throw error
            else {
                //Get all data of user with the login email
                let allClients = JSON.parse(body).clients;
                let clientData = allClients.filter(client => client["email"] === loginEmail)[0]

                if (clientData) {
                    //Generate token for logged user
                    jwt.sign({
                        "email": clientData["email"],
                        "id": clientData["id"],
                        "name": clientData["name"],
                        "role": clientData["role"]
                    }, "jwtpassword", (err, token) => {
                        if (err) throw (err)
                        console.log("Login successful.")
                        res.status(200).send({
                            "token": token,
                        })
                    });
                } else {
                    //Email of user is not in the database
                    res.status(400).send({
                        "message": "Email provided is not valid."
                    })
                }
            }
        });
    }
})

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

//Get list of policies linked to a client name
server.get("/policiesOfClient/:clientName", (req, res) => {

    let authToken = req.headers["authorization"];
    authToken = authToken.replace("Bearer ", "")

    jwt.verify(authToken, "jwtpassword", (err, decoded) => {
        if (err) throw err
        else {
            //User is valid, but only admin can proceed
            if (decoded["role"] != "admin") {
                res.status(401).send({
                    "message": "Unauthorized user"
                })
            } else {
                request('http://www.mocky.io/v2/5808862710000087232b75ac', (error, response, clientsBody) => {
                    if (error) throw error
                    else {
                        let allClients = JSON.parse(clientsBody).clients;
                        let _name = req.params.clientName;
                        let clientData = allClients.filter(client => client["name"] === _name)[0];

                        if (clientData) {
                            request('http://www.mocky.io/v2/580891a4100000e8242b75c5', (error, response, policiesBody) => {
                                if (error) throw error
                                else {
                                    let allPolicies = JSON.parse(policiesBody).policies;
                                    let policiesOfUser = allPolicies.filter(policy => policy["clientId"] === clientData["id"]);

                                    if (policiesOfUser.length == 0) {
                                        //That client has no policies linked to them
                                        res.status(404).send({
                                            "message": "No policies linked to this client were found. Please check the name is correct"
                                        })
                                    } else {
                                        res.status(200).send({
                                            "data": policiesOfUser
                                        })
                                    }
                                }
                            });
                        } else {
                            res.status(404).send({
                                "message": "Client not found. Please check the name is correct"
                            })
                        }
                    }
                });
            }
        }
    })
})

//Get client data linked to a policy id
server.get("/policyClient/:policyId", (req, res) => {
    let authToken = req.headers["authorization"];
    authToken = authToken.replace("Bearer ", "")

    jwt.verify(authToken, "jwtpassword", (err, decoded) => {
        if (err) throw err
        else {

            //User is valid, but only admin can proceed
            if (decoded["role"] != "admin") {
                res.status(401).send({
                    "message": "Unauthorized user"
                })
            } else {
                request('http://www.mocky.io/v2/580891a4100000e8242b75c5', (error, response, policiesBody) => {

                    if (error) throw error
                    else {
                        let allPolicies = JSON.parse(policiesBody).policies
                        let _id = req.params.policyId;
                        let policyData = allPolicies.filter(policy => policy["id"] === _id)[0];

                        if (policyData) {
                            request('http://www.mocky.io/v2/5808862710000087232b75ac', (error, response, clientsBody) => {
                                if (error) throw error
                                else {
                                    let allClients = JSON.parse(clientsBody).clients
                                    let clientData = allClients.filter(client => client["id"] === policyData["clientId"])[0];
                                    if (clientData) {
                                        res.status(200).send({
                                            "data": clientData
                                        })
                                    } else {
                                        //That policy has no clients linked to them
                                        res.status(404).send({
                                            "message": "No clients linked to this policy were found. Please check the policy Id is correct"
                                        })
                                    }
                                }
                            })
                        } else {
                            res.status(404).send({
                                "message": "Policy not found. Please check the policy Id is correct"
                            })
                        }
                    }
                })
            }
        }
    })
})

server.listen(3000, () => {
    console.log('Listening on port 3000')
})