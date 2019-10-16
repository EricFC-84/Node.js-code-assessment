# **WEB-API: Node.js code assessment**

Web API that manages some information regarding insurance policies and company clients.

## Dependencies

**1) Request:** library that simplifies http calls. Used to get the data from the given urls in the assessment

**2) Express:** web framework to create the server

**3) Cors:** middleware to enable CORS. Used in case testing will be done from an external front-end

**4) Body-parser:** middleware to parse bodies of incoming requests

**5) jsonwebtoken:** library that allos us the creation and verification of authorization tokens

## How to use this repository

1) Clone or download repository

2) Install dependencies
    - npm install
3) Run the server
    - node app.js
        - Default listening port is 3000.

## Additional considerations

- In order to get the information necessary for those endpoints that require parameters, we included 2 general endpoints that returns us all clients or policies information.
- For the JWT to work, we need a secret password that is used for both signing and verification. This password should be in a `secrets.json` file, but for ease the testing of this assessment, a basic password `jwtpassword` was included in the code. This should be replaced by the password in the secrets.json file, and this file read and parsed using `filesystem' read synchronous function.

# Endpoints

## **Login**

* **URL**

    /login

* **Method:**

  `POST`

* **Authorization**

    none 

* **Body**

    Only user email is required for login in this assessment.
    - Example: `{"email": "manningblankenship@quotezart.com"}`

* **Success Response:**
    - **Code:** 200
    - Response example:
    ```
        {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaXRuZXlibGFua2Vuc2hpcEBxdW90ZXphcnQuY29tIiwiaWQiOiJhMGVjZTVkYi1jZDE0LTRmMjEtODEyZi05NjY2MzNlN2JlODYiLCJuYW1lIjoiQnJpdG5leSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU3MTIxNzY0NX0.e5kRqYttMmTHTorTC39PkPlivI5yFAA3D7oi-RuEJGU"
        }
    ```

    - This token will be used in the headers of our request in order to get access to 2 of the endpoints in this assessment.

* **Error Response:**

    *Email is not provided in the body*
    - **Code:** 400
    - **Content:**
    ```
        "message": "No email address was provided."
    ```

    *Email is not one from the clients list*
    - **Code:** 400
    - **Content:**
    ```
        "message": "Email provided is not valid."
    ```

## **Clients**

* **URL**

    /clients

* **Method:**

  `GET`

* **Authorization**

    none 

* **Body**

    none

* **Success Response:**
    - **Code:** 200
    - Response example:
    ```
        [{
        "id":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
        "name":"Manning",
        "email":"manningblankenship@quotezart.com",
        "role":"admin"
        },
        {
        "id":"a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
        "name":"Barnett",
        "email":"barnettblankenship@quotezart.com",
        "role":"user"
        }]
    ```

## **Get client data filtered by client Id**

* **URL**

    /clientID/:id

* **Method:**

  `GET`

* **Authorization**

    none 

* **Body**

    none

*  **URL Params**

   **Required:**

   `id = [string]`

   Example:
   `/client/a3b8d425-2b60-4ad7-becc-bedf2ef860bd`

* **Success Response:**
    - **Code:** 200
    - **Content:**
    ```        
        {
        "id":"a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
        "name":"Barnett",
        "email":"barnettblankenship@quotezart.com",
        "role":"user"
        }
    ```

* **Error Response:**
 - **Code:** 404
    - **Content:**
    ```
        "message": "Client not found. Please check the ID is correct."
    ```



## **Get client data filtered by client name**

* **URL**

    /clientName/:name

* **Method:**

  `GET`

* **Authorization**

    none 

* **Body**

    none

*  **URL Params**

   **Required:**

   `name = [string]`

   Example:
   `/client/Barnett`

* **Success Response:**
    - **Code:** 200
    - **Content:**
    ```        
        {
        "id":"a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
        "name":"Barnett",
        "email":"barnettblankenship@quotezart.com",
        "role":"user"
        }
    ```

* **Error Response:**
    - **Code:** 404
    - **Content:**
    ```
        "message": "Client not found. Please check the name is correct."
    ```


## **Policies**

* **URL**

    /policies

* **Method:**

  `GET`

* **Authorization**

    none 

* **Body**

    none

* **Success Response:**
    - **Code:** 200
    - Response example:
    ```
        [{
        "id":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
        "name":"Manning",
        "email":"manningblankenship@quotezart.com",
        "role":"admin"
        },
        {
        "id":"a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
        "name":"Barnett",
        "email":"barnettblankenship@quotezart.com",
        "role":"user"
        }]
    ```

## **Get list of policies linked to a client name**

* **URL**

    /policiesOfClient/:clientName

* **Method:**

  `GET`

* **Authorization**

    Only users with the role `admin` can get information from this endpoing

    To get this information, an authorization token has to be included in the headers of the request

    - *HEADERS*
        - `KEY`: Authorization
        - `VALUE`: Bearer + /blank_space/ + /login_token/

    - Example:
        ```
            {'Authorization': Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaXRuZXlibGFua2Vuc2hpcEBxdW90ZXphcnQuY29tIiwiaWQiOiJhMGVjZTVkYi1jZDE0LTRmMjEtODEyZi05NjY2MzNlN2JlODYiLCJuYW1lIjoiQnJpdG5leSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU3MTE3MTc5Mn0.mNeDw5DTU-19o0c3ke_3TEUOBxHzqRoIebU48RfvRl8
            }
        ```
        
        - This token is from a user that has the `admin` role, so it can be used to get information from this endpoint.

* **Body**

    none

*  **URL Params**

   **Required:**

   `clientName = [string]`

   Example:
   `/policiesOfClient/Britney`

* **Success Response:**
    - **Code:** 200
    - **Content:**
    ```        
        {
            "data": [
            {
                "id": "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
                "amountInsured": 399.89,
                "email": "inesblankenship@quotezart.com",
                "inceptionDate": "2015-07-06T06:55:49Z",
                "installmentPayment": true,
                "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
            },
            (...)
            {
                "id": "0df3bcef-7a14-4dd7-a42d-fa209d0d5804",
                "amountInsured": 705.14,
                "email": "inesblankenship@quotezart.com",
                "inceptionDate": "2014-05-11T12:28:41Z",
                "installmentPayment": false,
                "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
            }
            ]
        }
    ```

* **Error Response:**

    *Token is not provided*
    - **Code:** 401
    - **Content:**
    ```
        "message": "Unauthorized user. Authentication token is required."
    ```

    *Token provided is not valid*
    - **Code:** 401
    - **Content:**
    ```
        "message": "Unauthorized user. Token provided is not valid."
    ```

    *Token provided is not from a user with `admin` role.*
    - **Code:** 401
    - **Content:**
    ```
        "message": "Unauthorized user."
    ```

    *Name of the client in the url is not correct*
    - **Code:** 404
    - **Content:**
    ```
        "message": "Client not found. Please check the name is correct."
    ```

    *Client selected has no policies linked*
    - **Code:** 404
    - **Content:**
    ```
        "message": "No policies linked to this client were found. Please check the name is correct."
    ```



## **Get client data linked to a policy id**

* **URL**

    /policyClient/:policyId

* **Method:**

  `GET`

* **Authorization**

    Only users with the role `admin` can get information from this endpoing

    To get this information, an authorization token has to be included in the headers of the request

    - *HEADERS*
        - `KEY`: Authorization
        - `VALUE`: Bearer + /blank_space/ + /login_token/

    - Example:
        ```
            {'Authorization': Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaXRuZXlibGFua2Vuc2hpcEBxdW90ZXphcnQuY29tIiwiaWQiOiJhMGVjZTVkYi1jZDE0LTRmMjEtODEyZi05NjY2MzNlN2JlODYiLCJuYW1lIjoiQnJpdG5leSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU3MTE3MTc5Mn0.mNeDw5DTU-19o0c3ke_3TEUOBxHzqRoIebU48RfvRl8
            }
        ```
        
        - This token is from a user that has the `admin` role, so it can be used to get information from this endpoint.

* **Body**

    none

*  **URL Params**

   **Required:**

   `policyId = [string]`

   Example:
   `/policyClient/64cceef9-3a01-49ae-a23b-3761b604800b`

* **Success Response:**
    - **Code:** 200
    - **Content:**
    ```        
        {
            "data": {
                "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
                "name": "Manning",
                "email": "manningblankenship@quotezart.com",
                "role": "admin"
            }
        }
    ```

* **Error Response:**

    *Token is not provided*
    - **Code:** 401
    - **Content:**
    ```
        "message": "Unauthorized user. Authentication token is required."
    ```
    *Token provided is not valid*
    - **Code:** 401
    - **Content:**
    ```
        "message": "Unauthorized user. Token provided is not valid."
    ```

    *Token provided is not from a user with `admin` role.*
    - **Code:** 401
    - **Content:**
    ```
        "message": "Unauthorized user."
    ```

    *Name of the client in the url is not correct*
    - **Code:** 404
    - **Content:**
    ```
        "message": "Policy not found. Please check the policy Id is correct."
    ```

    *Client selected has no policies linked*
    - **Code:** 404
    - **Content:**
    ```
        "message": "No clients linked to this policy were found. Please check the policy Id is correct."
    ```

# Possible improvements

As we were provided with 2 different urls which contain all the data necessary to make this API work, we used http calls to get all that data.

Therefore, first improvement would be to access this data without a request call.

Easiest way could be saving that data into two JSON files and access using the `filesystem` *read* function, to asynchronally read this information from the files.

- Having all the data in files can also be interesting for testing purposes, as we can access all Id's and names in order to test the endpoints in an easier way.

Best possible improvement would be the use of a database, specially `MongoDB`, as the information we already have is in JSON format.

1) Create a Schema for Clients and Policies

2) Connect our server to Atlas database

3) Update code, changing each request for a "find" or "findOne" function with the specifip parameters of each endpoint