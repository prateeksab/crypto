var foo = require('./add.js');
var chain = require('./chainLink.js');
const x = foo(10,20);
const y = await chain();
console.log(y);
console.log(x);

