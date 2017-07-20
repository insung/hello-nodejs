// references https://www.npmjs.com/package/pbkdf2-password

var express = require("express");
var app = express();
var bkfd2password = require("pbkdf2-password");
var hasher = bkfd2password();
var assert = require("assert");

app.get("/security/:password", function(req, res) {

    var opts = { password : req.params.password };

    hasher(opts, function(err, pass, salt, hash) {
        console.log(err, pass, salt, hash);
        // opts.salt = salt;
        // hasher(opts, function(err, pass, salt, hash2) {
        //     assert.deepEqual(hash2, hash);

        //     // password mismatch
        //     opts.password = "aaa";
        //     hasher(opts, function(err, pass, salt, hash2) {
        //         assert.notDeepEqual(hash2, hash);
        //         console.log("ok");
        //     });
        // });
        res.send("salt: " + salt);
    });
});

app.listen(3000, function () {
    console.log("port 3000 listen for hello-security...");
});
