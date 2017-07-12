const express = require('express');
const app = express();
const fs = require('fs');

// body-parser for post method
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// end of body-parser

// view engine for jade
app.locals.pretty = true;
app.set('views', './template');
app.set('view engine', 'jade');
// end of jade

// routing
app.get('/new', function(req, res) {
    res.render('new');
});

app.post('/topic', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    
    // file
    fs.writeFile('file/' + title, description, function(err) {
        if (err) {
            console.log('error occured');
            res.status(500).send('Internal Server Error');
        }

        res.send('Hi! ' + title + ' file created.');
    });
});

app.get(['/list', '/list/:id'], function(req, res) {
    fs.readdir('file', function(err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        var id = req.params.id;

        if (id) {
            fs.readFile('file/' + id, 'utf-8', function(err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }

                res.render('view', { files:files, title:id, description:data });
            });
        }
        else {
            res.render('view', { files:files, title:'welcome', description:'hello' });
        }
    });
});
// end of routing

// listen
app.listen('3000', function() {
    console.log('listen port 3000...');
});
// end of listen