var _ = require('underscore');
var arr = [3,6,9,1,2];

console.log(arr[0]);
console.log(_.first(arr));

console.log(arr[arr.length - 1]);
console.log(_.last(arr));

console.log(_.range(0, 30, 5));
console.log(_.random(0, 1000));