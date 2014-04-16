var restify,
    server,
    mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect('mongodb://localhost/node-api-boilerplate');
};

mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.on('disconnected', function() {
    connectToDB();
});

// Routes:
var user = require('./routes/user');

restify = require('restify');
restify.defaultResponseHeaders = function(data) {
    this.header('content-type', 'application/json');
};

server = restify.createServer({
    name: 'node-api-boilerplate'
});

server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.authorizationParser()); // TODO: implement authorization

server.get('/', function(req, res) {
    res.send({message: 'Hello, World'});
});

server.get('/users/:id', user.getUser);
server.post('/users', user.createUser);

server.on('NotFound', function(req, res) {
    res.send(404);
})

// Begin listening:
server.listen(8000, 'localhost', function() {
    connectToDB();
    console.log('%s listening at %s', server.name, server.url);
});
