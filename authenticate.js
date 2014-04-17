var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    User = require('./models/user');

// TODO: support option to use basic or token-based strategy
module.exports.initialize = function(server) {
    if (! server) {
        console.error('Need to supply server as argument.')
        return null;
    }

    server.use(passport.initialize());

    passport.use(new BasicStrategy(
        function(user_id, password, done) {
            User.findById(user_id, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (! user) {
                    return done(null, false, {message: 'Incorrect user ID.'});
                }
                if (user.password !== password) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            });
        }
    ));

    return passport;
}
