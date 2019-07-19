var bcrypt = require('b-crypt');

module.exports = function(passport, Users) {
    var User = user;
    var LocalStrategy = require('passport').Strategy;

    passport.use('signup', new LocalStrategy(
        {
            emailField: 'USER_EMAIL',
            passwordField: 'PASSWORD',
            firstNameField: 'FIRST_NAME',
            lastNameField: 'LAST_NAME',
            passReqToCallback: true
        },
        function(req, emailField, passwordField, firstNameField, done) {
 
            var generateHash = function(passwordField) {
 
                return bCrypt.hashSync(passwordField, bCrypt.genSaltSync(8), null);
 
            };
 
            User.findOne({
                where: {
                    email: emailField
                }
            }).then(function(user) {
 
                if (user)
 
                {
 
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
 
                } else
 
                {
 
                    var userPassword = generateHash(passwordField);
 
                    var data =
 
                        {
                            email: emailField,
 
                            password: userPassword,
 
                            firstname: req.body.firstname,
 
                            lastname: req.body.lastname
 
                        };
 
                    User.create(data).then(function(newUser, created) {
 
                        if (!newUser) {
 
                            return done(null, false);
 
                        }
 
                        if (newUser) {
 
                            return done(null, newUser);
 
                        }
 
                    });
 
                }
 
            });
 
        }
 
    ));
 
}

