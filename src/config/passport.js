const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

//Usamos LocalStrategy para el login
passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password'
    },
    async (user, password, done) => {
        const usuario = await User.findOne({ user: user });
        if (!usuario) {
            return done(null, false, {
                message: 'User not found'
            })
        } else {
            const match = await usuario.matchPassword(password);
            if (match) {
                return done(null, usuario);
            } else {
                return done(null, false, {
                    message: 'Incorrect password'
                });
            }
        }
    }));

    //funciones requeridas por passport
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});