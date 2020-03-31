const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    (username, password, done) => {
        UserModel.findOne({ email: username }, (err, user) => {
            if(err){
                return done(err);
            }
            if(!user || !user.validPassword(password)){
                done(null, false, { 
                    message: 'Incorrect email or password provided.'
                })
            }
            return done(null, user);
        });
    }
));