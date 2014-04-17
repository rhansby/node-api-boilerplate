var restify = require('restify'),
    helper = require('../helper'),
    User = require('../models/user.js');

module.exports.login = function(req, res, next) {
    User.login(
        req.authorization.basic.username,
        function(user) {
            res.send({
                name: user.name,
                email: user.email
            });
            return next();
        },
        function() {
            return next(new restify.InternalError('Something went wrong.'));
        }
    );
};

module.exports.register = function(req, res, next) {
    User.register(
        req.params,
        function onSuccess(user) {
            res.send(201, {id: user._id});
            return next();
        },
        function onError() {
            return next(new restify.InvalidArgumentError('User creation failed.'));
        }
    );
};
