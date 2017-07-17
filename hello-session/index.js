var express = require('express');
var session = require('express-session')
var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/count', function(req, res) {
    if (req.session.count)
        req.session.count++;
    else
        req.session.count = 1;

    res.send('hi session cnt: ' + req.session.count);
});

app.listen(3000, function() {
    console.log('listen port 3000 for hello session example..');
});