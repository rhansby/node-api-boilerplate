node-api-boilerplate
====================

Boilerplate for creating Node.js APIs. Built on Mongoose, Restify, and Passport.

## Important Note on Authentication

Currently, the authentication scheme this project uses **does not** use encryption of any kind, and can easily be sniffed. It **is not** recommended to deploy this software "as is" in production if user information is stored. **Developers should use this project with HTTPS/SSL to encrypt traffic.**

## Installation

Install Node.js: [http://nodejs.org/download/](http://nodejs.org/download/)

Install MongoDB: [http://www.mongodb.org/downloads/](http://www.mongodb.org/downloads)

Run the following command in this project's root directory:

    $ npm install

## Usage

### Server

    $ mongod &
    $ node server.js

### Sample Client Usage

    $ echo '{"name": "User Name", "email": "user@email.com", "password": "hunter2"}' > data.json
    $ curl -X POST -isd @data.json http://localhost:8000/users --header "Content-Type:application/json"

    HTTP/1.1 201 Created
    Content-Type: application/json
    ...
    {"id":"534edbe63900bd3a22f18202"}

By default, the server expects authentication to be performed via [basic access authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). The server expects a Base64 encoding of the string "[username]:[password]" in the request header. For example (using the previously returned id):

    Base64("534edbe63900bd3a22f18202:hunter2") == "NTM0ZWRiZTYzOTAwYmQzYTIyZjE4MjAyOmh1bnRlcjI="

Your client will need to implement this processing and encoding (unless you choose an authentication scheme other than basic access authentication).

An example request, with authentication credentials:

    $ curl -H "Authorization: Basic NTM0ZWRiZTYzOTAwYmQzYTIyZjE4MjAyOmh1bnRlcjI=" -X POST -is http://localhost:8000/users/login

    HTTP/1.1 200 OK
    Content-Type: application/json
    ...
    {"name":"User Name","email":"user@email.com"}

Bad requests will be rejected:

    $ curl -H "Authorization: Basic bad-token" -X POST -is http://localhost:8000/users/login

    HTTP/1.1 401 Unauthorized
    WWW-Authenticate: Basic realm="Users"
    ...
    Unauthorized

## License

The MIT License (MIT) Copyright (c) 2014 Ryan Hansberry @rhansby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
