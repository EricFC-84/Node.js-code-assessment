# **WEB-API: Node.js code assessment**

Web API that manages some information regarding insurance policies and company clients.

## Dependencies

**1) Request:** library that simplifies http calls. Used to get the data from the given urls in the assessment

**2) Express:** web framework to create the server

**3) Cors:** middleware to enable CORS. Used in case testing will be done from an external front-end

**4) Body-parser:** middleware to parse bodies of incoming requests

## How to use this repository

1) Clone or download repository

2) Install dependencies
    - npm install
3) Run the server
    - node app.js
        - Default listening port is 3000.

## Additional considerations

- (Will be updated)

# Endpoints

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
   ``/client/a3b8d425-2b60-4ad7-becc-bedf2ef860bd``

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
        "message": "Client not found. Please check the ID is correct"
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

   `id = [string]`

   Example:
   ``/client/Barnett``

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
        "message": "Client not found. Please check the name is correct"
    ```


# Possible improvements

As we were provided with 2 different urls which contain all the data necessary to make this API work, we used http calls to get all that data.

Best possible improvement would be the use of a database, specially MongoDB, as the information we already have is in JSON format.

1) Create a Schema for Clients and Policies

2) Connect our server to Atlas database

3) Update code, changing each request for a "find" or "findOne" function with the specifip parameters of each endpoint