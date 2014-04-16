var mongoose = require('mongoose'),
    helper = require('../helper');

var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}),
    User = mongoose.model('User', userSchema);

User.schema.path('email').validate(function(value) {
    // One or more chars + "@" + 1 or more chars + "." + 1 or more chars + [nothing else]:
    return /.+@.+\..+$/.test(value)
}, 'Invalid email address');

User.schema.path('name').validate(helper.isNotEmpty, 'name cannot be empty');
User.schema.path('password').validate(helper.isNotEmpty, 'password cannot be empty');

module.exports = User;
