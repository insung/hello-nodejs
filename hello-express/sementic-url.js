// sementic url = restful
var express = require('express');
var app = express();

app.get('/sementic/:p_id', function (req, res) {
    var sementic = [
        'sementic 1',
        'sementic 2',
        'sementic 3'
    ];

    res.send(sementic[req.params.p_id]);
});

app.get('/sementic/:p_id/:op_id', function (req, res) {
    var sementic = [
        'sementic 1',
        'sementic 2',
        'sementic 3'
    ];

    res.send(sementic[req.params.p_id] + ', ' + req.params.op_id);
});

app.listen(3000, function () {
    console.log('listen port 3000... sementic url');
});