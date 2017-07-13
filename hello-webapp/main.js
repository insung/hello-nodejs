const express = require('express');
const app = express();
const fs = require('fs');

// /usr URL 경로에 uploads 폴더를 바인딩
app.use('/usr', express.static('uploads'));

const multer = require('multer');

// destination 과 filename 을 여기서 정의
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});

var upload = multer({ storage: _storage });

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

        // res.send('Hi! ' + title + ' file created.');
        res.redirect('/list/' + title)
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

app.get('/upload', function(req, res) {
    res.render('upload');
});

app.post('/upload', upload.single('userfile'), function(req, res) {
    
    res.send('uploaded : ' + req.file);
});
// end of routing

// listen
app.listen('3000', function() {
    console.log('listen port 3000...');
});
// end of listen