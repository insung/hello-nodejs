var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());

app.get('/cookie', function(req, res) {
    var count = 1;

    if (req.cookies.count) {
        count += parseInt(req.cookies.count);
    } 
    res.cookie('count', count);
    res.send('count: ' + req.cookies.count );
});

// product array
var products = {
    1: { title: 'product 1'},
    2: { title: 'product 2'}
};

app.get('/product', function(req, res) {

    var output = 
    `<h4>product list</h4>
    <ul>`;

    for(var name in products) {
        output += 
        `<li>
            <a href="/cart/${name}"> ${products[name].title} </a>
          </li>`
    }

    output += 
        `</ul>
        <br /><br />
        <a href="/cart">go to cart</a>`;
    
    res.send(output)
});

app.get(['/cart', '/cart/:id'], function(req, res) {

    if (!req.params.id) {
        var cart = req.cookies.cart;
        if (!cart) { res.send('the cart empty') }
        else {
            var output = `<h1>Cart List</h1>`;
            for(var id in cart) {
                output += 
                `<li> 
                ${products[id].title} 
                : ${cart[id]} </li>`;
            }
            res.send(`<ul>${output}</ul> <a href="/product">go to product</a>`);
        }
    } else {
        var id = req.params.id;

        if (req.cookies.cart) { var cart = req.cookies.cart; }
        else { var cart = {}; }

        if (!cart[id]) cart[id] = 0;    

        cart[id] = parseInt(cart[id]) + 1;

        res.cookie('cart', cart);
        res.redirect('/cart');
    }
});

app.listen(3000, function() {
    console.log('listen port 3000 for hello-cookie..');
});
