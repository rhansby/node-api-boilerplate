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
server.use(restify.authorizationParser());

// Authentication. If you do not need authentication in your API,
// remove this line and calls to passport.authenticate() in routes.
var passport = require('./authenticate').initialize(server);

// Routes:
var user = require('./routes/user');

// Unprotected endpoint:
server.post('/users', user.createUser);

// Protected endpoint:
server.post('/users/login', passport.authenticate('basic', {session: false}), user.login);

server.on('NotFound', function(req, res) {
    res.send(404);
})

// Begin listening:
server.listen(8000, 'localhost', function() {
    connectToDB();
    console.log('%s listening at %s', server.name, server.url);
});
