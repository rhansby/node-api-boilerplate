var mongoose = require('mongoose'),
    helper = require('../helper');

// Schema:
var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, index: {
        unique: true,
        required: true
    }},
    password: {type: String, required: true}
}),
    User = mongoose.model('User', userSchema);

// Validations:
User.schema.path('email').validate(function(value) {
    // One or more chars + "@" + 1 or more chars + "." + 1 or more chars + [nothing else]:
    return /.+@.+\..+$/.test(value)
}, 'Invalid email address');

User.schema.path('name').validate(helper.isNotEmpty, 'name cannot be empty');
User.schema.path('password').validate(helper.isNotEmpty, 'password cannot be empty');

// Methods:
User.register = function(data, callback, errback) {
    var new_user = new User({
        name: data.name,
        email: data.email,
        password: data.password
    });

    new_user.save(function(err) {
        if (err) {
            return errback();
        }

        return callback(new_user);
    });
};

User.login = function(user_id, callback, errback) {
    User.findById(user_id, function(err, user) {
        if (! user || err) {
            return errback();
        }

        return callback(user);
    });
}

module.exports = User;
