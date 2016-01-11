#!/usr/local/bin/node

var fs = require('fs');
var obj = {
    id: process.argv[2],
    name: process.argv[3],
    path: process.argv[4]
};
var scripts = fs.readdirSync('./build');
for (var i in scripts) {
    require('./build/' + scripts[i])(obj);
}
