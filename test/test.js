var should = require('should'),
    mongoose = require('mongoose'),
    User = require('../models/user');

mongoose.connect('mongodb://localhost/node-api-boilerplate-test');

describe('User', function() {
    var user_mock = {
        name: 'User Name',
        email: 'user@email.com',
        password: 'hunter2'
    };

    beforeEach(function(done) {
        User.register(
            user_mock,
            // Need wrapping function because this callback is given an argument
            function onSuccess() {
                done();
            },
            done
        );
    });

    afterEach(function(done){
        User.remove({}, function() {
            done();
        });
    });

    describe('#register()', function() {
        it('should return a valid user object and create a user in the database when valid user details are given', function(done) {
            User.remove({}, function() {
                User.register(
                    user_mock,
                    function onSuccess(user) {
                        user.name.should.equal(user_mock.name);
                        user.email.should.equal(user_mock.email);
                        user.password.should.equal(user_mock.password);

                        User.findById(user._id, function(err, user) {
                            if (! user || err) {
                                throw('bad');
                            }
                            done();
                        })
                    },
                    function onError() {
                        throw('Error creating user');
                        done();
                    }
                );
            });
        });

        it('should not permit users with duplicate emails', function(done) {
            User.register(
                user_mock,
                function onSuccess() {
                    throw('Created user with duplicate email');
                    done();
                },
                done
            );
        });
    });
});

