var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');

var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/count', function(req, res) {
    if (req.session.count)
        req.session.count++;
    else
        req.session.count = 1;

    res.send('hi session cnt: ' + req.session.count);
});

app.get('/auth/login', function(req, res) {
    var output = `
    <form action="/auth/login" method="post">
      <p>
        <input type="text" name="username" placeholder="username" />
      </p>
      <p>
        <input type="password" name="password" placeholder="password" />
      </p>
      <p>
        <input type="submit" />
      </p>
    </form>`;

    res.send(output);
});

app.post('/auth/login', function(req, res) {
    res.send(req.body.username);
});

app.listen(3000, function() {
    console.log('listen port 3000 for hello session example..');
});