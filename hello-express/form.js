var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// exmpale for jade template
app.set('view engine', 'jade');
app.set('views', './views');

// set bodyparser
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/form', function (req, res) {
    res.render('form');
});

app.get('/form_receiver', function(req, res) {
    var title = req.query.title;
    var desc = req.query.description;
    res.send(title + ', ' + desc);
});

app.post('/form_receiver', function(req, res) {
    console.log(req.body);
    
    res.send('hello post title: ' + req.body.title + ', description: ' + req.body.description);
});

app.listen(3000, function() {
    console.log('listen port 3000..');
});