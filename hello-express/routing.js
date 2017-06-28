// reference site: expressjs.com/ko/guide/routing.html
var express = require('express');
var app = express();

// response with 'hello world' when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world!');
});

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section...');
    next(); // pass control to the next handler
});

app.get('/random.text', function (req, res) {
    res.send('<h1>random.text ...</h1>');
});

// abcd, abxxxcd ...
app.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
});

// 2개 이상의 콜백 함수는 하나의 라우트를 처리할 수 있습니다(next 오브젝트를 반드시 지정해야 함).
app.get('/example/b', function(req, res, next) {
    console.log('the response will be sent by the next function ..');
    next();
}, function (req, res) {
    res.send('hello from b!');
});

// 하나의 콜백 함수 배열은 하나의 라우트를 처리할 수 있습니다.
var cb0 = function (req, res, next) {
    console.log('<h4>cb0</h4>');
    next();
}

var cb1 = function (req, res, next) {
    console.log('<h3>cb1</h3>');
    next();
}

var cb2 = function (req, res) {
    res.send('hello c!');
}

app.get('/example/c', [cb0, cb1, cb2]);

// 정적 파일 라우팅 : img 라는 폴더를 라우팅
app.use(express.static('img'));

app.get('/img', function (req, res) {
    res.send('hello static! <img src="/example.png">');
});

// app.route() 이용하면 라우트 경로에 대하여 체인 가능한 라우트 핸들러를 작성할 수 있습니다. 
app.route('/book')
    .get(function (req, res) {
        res.send('Get');
    })
    .post(function (req, res) {
        res.send('Post');
    })
    .put(function (req, res) {
        res.send('Put');
    });

// express.Router 예제
var birds = require('./birds');
app.use('/birds', birds);

app.listen(3000, function() {
    console.log('listen port 3000..');
});