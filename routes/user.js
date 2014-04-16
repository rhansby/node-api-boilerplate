var restify = require('restify'),
    helper = require('../helper'),
    User = require('../models/user.js');

module.exports.getUser = function(req, res, next) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if (! user || err) {
            return next(new restify.ResourceNotFoundError('User with id: <' + req.params.id + '> not found.'));
        }

        res.send({
            name: user.name,
            email: user.email
        });
        return next();
    });
};

module.exports.createUser = function(req, res, next) {
    var data = {
        name: req.params.name,
        email: req.params.email,
        password: req.params.password
    };

    var new_user = new User(data);

    new_user.save(function(err) {
        if (err) {
            return next(new restify.InvalidArgumentError('User creation failed.'));
        }

        res.send(201, {id: new_user._id});
        return next();
    });
};
