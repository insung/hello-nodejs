var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = function(passport) {
    // passport 초기화
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // user 역직렬화
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // local strategy 사용
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // 소문자로 전환
        
        process.nextTick(function() {
            User.findOne({ 'local.email' : email }, function(err, user) {
                // 에러 발생 시
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Wohh! Wrong password.'));
                else
                    return done(null, user); // 모든 것이 문제 없다면 user 가져오기
            });
        });
    }));

    // local strategy 등록
    passport.use('local-signup', new LocalStrategy({
        // 사용자명과 패스워드의 기본값을 'email' 과 'password' 로 변경
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase();
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'local.email' : email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Wohh! the email is alreadytaken.'));
                    } else {
                        var newUser = new User();
                        // req.body 로 부터 사용자명 가져오기
                        newUser.local.name = req.body.name;
                        newUser.local.email = email;
                        newUser.local.passport = newUser.generateHash(password);
                        // 데이터 저장
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });                
            } else {
                return done(null, req.user);
            }
        });
    }));
};