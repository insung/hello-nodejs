var express = require('express'),
    app = express();
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

app.use(passport.initialize());

passport.use(new FacebookStrategy({
        clientID: '150569682186659',
        clientSecret: 'aa4b6b809d1627e8b7b1bc92d1b7f159',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToekn, refreshToekn, profile, done) {
        console.log(accessToekn, refreshToekn, profile);
        return done(null, profile);
    }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', 
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.get('/login', function(req, res) {
    res.send('<a href="/auth/facebook">login with facebook</a>');
});

app.listen(3000);