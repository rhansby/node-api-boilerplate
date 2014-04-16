node-api-boilerplate
====================

Boilerplate for creating Node.js APIs. Built on Restify and Mongoose.

## Installation

* Install Node.js: [http://nodejs.org/download/](http://nodejs.org/download/)
* Install MongoDB: [http://www.mongodb.org/downloads/](http://www.mongodb.org/downloads)
* Run the following command in this project's root directory:

    $ npm install

## Usage

### Server

    $ mongod &
    $ nodemon server.js

### Sample Client Usage

    $ echo '{"name": "User Name", "email": "user@email.com", "password": "hunter2"}' > data.json
    $ curl -X POST -isd @data.json http://localhost:8000/users --header "Content-Type:application/json"

### License

    The MIT License (MIT) Copyright (c) 2014 Ryan Hansberry @rhansby

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
