#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var process = require('process');
var glob = require('glob');
var dslcore = require('dsl-core');
//var dsl = require('../grammar/dsl');
//var grammar = require('../src/grammar');
//var base = require('../src/base');
//var sql = require('../src/sql');
//var excel = require('../src/excel');
//var protobuf = require('../src/protobuf');
var argv = require('yargs')
    .option('sql', {
        alias : 'sql',
        demand: false,
        describe: 'output sql',
        type: 'boolean'
    })
    .option('excel', {
        alias : 'excel',
        demand: false,
        describe: 'output excel',
        type: 'boolean'
    })
    .option('pb', {
        alias : 'protobuf',
        demand: false,
        describe: 'output protobuf',
        type: 'boolean'
    })
    .option('v', {
        alias : 'ver',
        demand: false,
        describe: 'ver',
        type: 'boolean'
    })
    .usage('Usage: dslang input-filename')
    .example('dslang input-filename', 'dslang input-filename')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

var basearr = argv._;

if (argv.ver) {
    var pkgfile = path.join(__dirname, '../package.json');
    var strPackage = fs.readFileSync(pkgfile).toString();
    var pkg = JSON.parse(strPackage);

    console.log('dslang ver ' + pkg.version);

    process.exit(1);
}

if (basearr == undefined || basearr.length != 1) {
    console.log('Usage: dslang input-filename');

    process.exit(1);
}

var filename = basearr[0];
var ptindex = basearr[0].lastIndexOf('.');
if (ptindex > 0) {
    filename = basearr[0].slice(0, ptindex);
}

if (fs.existsSync(basearr[0])) {
    console.log('no file ' + basearr[0]);

    process.exit(1);
}

var input = fs.readFileSync(basearr[0], 'utf-8');
var ret = dslcore.compile(input);

var grammarok = dslcore.checkGrammar(ret, function (isok, err) {
    if (!isok) {
        console.log('Error => ' + err);
    }
});

if (!grammarok) {
    console.log('Error => checkGrammar()');

    process.exit(1);
}

ret = dslcore.procInMessage(ret);
ret = dslcore.reverseObj(ret);

console.log('dslang compile finished!');
fs.writeFileSync(filename + '.json', JSON.stringify(ret), 'utf-8');
console.log('output file is ' + filename + '.json');

if (argv.sql) {
    var sqlstr = dslcore.exportSql(ret, function (isok, err) {
        if (!isok) {
            console.log('Error => ' + err);
        }
    });

    if (sqlstr == undefined) {
        console.log('Error => exportSql()');

        process.exit(1);
    }

    fs.writeFileSync(filename + '.sql', sqlstr, 'utf-8');
    console.log('output file is ' + filename + '.sql');
}

if (argv.excel) {
    dslcore.exportExcel(filename, ret, function (isok, err) {
        if (!isok) {
            console.log('Error => ' + err);
        }
    });

    console.log('output path is ' + filename);
}

if (argv.protobuf) {
    var pbstr = dslcore.exportProtobuf(filename, ret, function (isok, err) {
        if (!isok) {
            console.log('Error => ' + err);
        }
    });

    if (pbstr == undefined) {
        console.log('Error => exportProtobuf()');

        process.exit(1);
    }

    fs.writeFileSync(filename + '.proto', pbstr, 'utf-8');
    console.log('output file is ' + filename + '.proto');
}