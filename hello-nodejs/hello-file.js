const fs = require('fs');

console.log('file 1');

// sync
var data = fs.readFileSync('c:\\temp\\abc.txt', 'utf8');
console.log(data);

console.log('file 2');

//async
fs.readFile('c:\\temp\\abc.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('file 3');
    console.log(data);
});

console.log('file 4');

