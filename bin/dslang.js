#!/usr/bin/env node

var fs = require('fs');
var process = require('process');
var glob = require('glob');
var dsl = require('../grammar/dsl');
var argv = require('yargs')
    .usage('Usage: dslang input-filename')
    .example('dslang input-filename', 'dslang input-filename')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

var basearr = argv._;

if (basearr == undefined || basearr.length != 1) {
    console.log('Usage: dslang input-filename');

    process.exit(1);
}

var filename = basearr[0];
var ptindex = basearr[0].lastIndexOf('.');
if (ptindex > 0) {
    filename = basearr[0].slice(0, ptindex);
}

var input = fs.readFileSync(basearr[0], 'utf-8');
var ret = dsl.parse(input);

console.log('dslang compile finished! output file is ' + filename + '.json');

fs.writeFileSync(filename + '.json', JSON.stringify(ret), 'utf-8');