#!/usr/bin/env node

var PLUGINS_NAME = 'crystal';
var PLUGINS_CLI_NAME = 'dsl-crystal';

var plugins = require('../src/plugins/' + PLUGINS_NAME);
var fs = require('fs');
var process = require('process');
var base = require('../src/base');
var code = require('../src/code');
var argv = require('yargs')
    .option('clientcpp', {
        alias : 'clientcpp',
        demand: false,
        describe: 'output client cpp code',
        type: 'boolean'
    })
    .option('servjs', {
        alias : 'servjs',
        demand: false,
        describe: 'output serv js code',
        type: 'boolean'
    })
    .usage('Usage: ' + PLUGINS_CLI_NAME + ' input-filename')
    .example(PLUGINS_CLI_NAME + ' input-filename', PLUGINS_CLI_NAME + ' input-filename')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

var basearr = argv._;

if (basearr == undefined || basearr.length != 1) {
    console.log('Usage: ' + PLUGINS_CLI_NAME + ' input-filename');

    process.exit(1);
}

var filename = basearr[0];
var ptindex = basearr[0].lastIndexOf('.');
if (ptindex > 0) {
    filename = basearr[0].slice(0, ptindex);
}

if (!fs.existsSync(basearr[0])) {
    console.log('file ' + basearr[0] + ' not found.');

    process.exit(1);
}

var root = base.loadJson(basearr[0]);
if (root == undefined) {
    console.log('file ' + basearr[0] + ' fail!');

    process.exit(1);
}

if (argv.clientcpp) {
    var filearr = code.exportCode(filename, root, plugins.plugins_clientcpp, '_ClientData', function (isok, errinfo) {
        if (!isok) {
            console.log('clientcpp err : ' + errinfo);

            process.exit(1);
        }
    }, {isclient: true});
}

if (argv.servjs) {
    var filearr = code.exportCode(filename, root, plugins.plugins_servjs, '_ServiceData', function (isok, errinfo) {
        if (!isok) {
            console.log('servjs err : ' + errinfo);

            process.exit(1);
        }
    }, {isclient: false});
}