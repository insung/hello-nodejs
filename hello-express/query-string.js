var express = require('express');
var app = express();

app.get('/topic', function (req, res) {
    // res.send('name: ' + req.query.name + ', param: ' + req.query.param);
    // res.send(req.params.name);

    var topics = [
        'topic 1',
        'topic 2',
        'topic 3'
    ];

    console.log(req.query.topicid);

    var output = `
    <a href="/topic?topicid=0">topic 1</a><br />
    <a href="/topic?topicid=1">topic 2</a><br />
    <a href="/topic?topicid=2">topic 3</a><br /><br />
    ${topics[req.query.topicid]}
    `;

    res.send(output);
});

app.listen(3000, function () {
    console.log('listen port 3000... query string...');
});