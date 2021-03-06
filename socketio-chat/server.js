var app = require('express')();
var server = require('http').createServer(app);

// http server를 socket.io server로 upgrade 한다.
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var _ = require('underscore');

// support JSON request
app.use(bodyParser.json());

// index.html 로 전송
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// random chat room 으로 이동
app.get('/rand-chat', function(req, res) {
    res.sendFile(__dirname + '/views/rand-chat.html');
});

// socket.io namespace 설정
var nsp = io.of('/my-namespace');

// connection 이 되면 event handler function 의 인자로 socket 이 들어옴
nsp.on('connection', function(socket) {

    //////// login ////////
    socket.on('login', function(data) {
        // console.log('userid: ' + data.userid + ', name: ' + data.name + ' logged in');

        // socket 에 사용자 정보를 저장
        socket.name = data.name;
        socket.userid = data.userid;

        // 접속한 모든 사용자에게 메시지를 전송
        //io.emit('login', data.name);
        socket.broadcast.emit('login', data.name);
    });

    //////// chat ////////
    socket.on('chat', function(data) {
        // console.log('socket.userid: ' + socket.userid + ', data.msg: ' + data.msg);

        var msg = {
            from: {
                name: socket.name,
                userid: socket.userid
            },
            msg: data.msg
        };

        // 메시지 전송한 사용자를 제외한 모든 사용자에게 메시지를 전송
        nsp.emit('chat', msg);
    });

    //////// disconnect ////////
    socket.on('forceDisconnect', function() {
        socket.disconnect();
    });

    socket.on('disconnect', function() {
        if (socket.name)
            console.log('user disconnected: %s', socket.name);
    });
});

server.listen(3000, function() {
    console.log('listening port 3000');
});