/**
 * Created by zhs007 on 15/11/9.
 */

var base = require('./base');
var code = require('./code');

function getTableName(str) {
    return str.toLowerCase();
}

// callback(isok, err)
function exportTable(obj, callback, root) {
    if (obj.type == 'struct') {
        var isautoinc = false;
        var autoincval = 1;
        var str = "--" + obj.comment + '\r\n';
        str += "CREATE TABLE IF NOT EXISTS `" + getTableName(obj.name) + "` (" + '\r\n';

        var lastcomment = '';

        var lstmember = [];
        base.forEachStruct(obj.name, obj, root, function (structname, memberobj, root) {
            lstmember.push(memberobj);
        });

        var validindex = [];
        for (var i = 0; i < lstmember.length; ++i) {
            var membername = lstmember[i].name.name;
            // type
            var t = base.getRealType(lstmember[i].type, root);
            if (t == '[ERR]') {
                callback(false, 'struct ' + obj.name + '.' + membername + ': type is Error!');

                return ;
            }
            else if (t == 'int') {
                validindex.push(i);
            }
            else if (t == 'string') {
                validindex.push(i);
            }
            else if (t == 'time') {
                validindex.push(i);
            }
            else if (base.isStruct(t, root)) {

            }
            else {
                callback(false, 'struct ' + obj.name + '.' + membername + ': type not defined!');

                return ;
            }
        }

        var keyblocknums = 0;

        // PRIMARY & INDEX
        for (var i = 0; i < lstmember.length; ++i) {
            if (lstmember[i].hasOwnProperty('type2')) {
                var membername = lstmember[i].name.name;
                var fn = base.getMemberName(membername);

                if (lstmember[i].type2 == 'primary') {
                    keyblocknums++;
                }
                else if (lstmember[i].type2 == 'primary0' || lstmember[i].type2 == 'primary1' || lstmember[i].type2 == 'index') {
                    keyblocknums++;
                }
                if (lstmember[i].type2 == 'unique') {
                    keyblocknums++;
                }
            }
        }

        var tarr = [[], []];
        for (var k = 0; k < validindex.length; ++k) {
            var i = validindex[k];
            var membername = lstmember[i].name.name;
            var fn = base.getMemberName(membername);

            // name
            var cstr = "`" + fn + "` ";

            // type
            var t = base.getRealType(lstmember[i].type, root);
            if (t == '[ERR]') {
                callback(false, 'struct ' + obj.name + '.' + membername + ': type is Error!');

                return ;
            }
            else if (t == 'int') {
                cstr += "int ";
            }
            else if (t == 'string') {
                cstr += "varchar ";
            }
            else if (t == 'time') {
                cstr += "timestamp ";
            }
            else {
                callback(false, 'struct ' + obj.name + '.' + membername + ': type not defined!');

                return ;
            }

            // NULL
            if (typeof(lstmember[i].val) == 'object' && lstmember[i].val.type == 'NULL') {
                cstr += 'NULL';
            }
            else {
                cstr += 'NOT NULL';
            }

            // AUTO_INCREMENT
            if (typeof(lstmember[i].val) == 'object' && lstmember[i].val.val == 'AUTOINC') {
                cstr += ' AUTO_INCREMENT';
                isautoinc = true;

                if (lstmember[i].val.hasOwnProperty('autoinc')) {
                    autoincval = lstmember[i].val.autoinc;
                }
            }
            // DEFAULT CURRENT_TIMESTAMP
            else if (typeof(lstmember[i].val) == 'object' && lstmember[i].val.val == 'NOW') {
                cstr += ' DEFAULT CURRENT_TIMESTAMP';
            }

            if (k < validindex.length - 1 || keyblocknums > 0) {
                cstr += ',';
            }

            tarr[0].push(cstr);
            tarr[1].push('--' + lstmember[i].comment);
        }

        str += code.alignCode(tarr, '  ');

        // PRIMARY & INDEX
        if (keyblocknums > 0) {
            for (var i = 0; i < lstmember.length; ++i) {
                if (lstmember[i].hasOwnProperty('type2')) {
                    var membername = lstmember[i].name.name;
                    var fn = base.getMemberName(membername);
                    var newline = false;

                    if (lstmember[i].type2 == 'primary') {
                        str += "  PRIMARY KEY (`" + fn + "`)";
                        newline = true;
                    }
                    else if (lstmember[i].type2 == 'primary0' || lstmember[i].type2 == 'primary1' || lstmember[i].type2 == 'index') {
                        str += "  KEY (`" + fn + "`)";
                        newline = true;
                    }
                    if (lstmember[i].type2 == 'unique') {
                        str += "  UNIQUE (`" + fn + "`)";
                        newline = true;
                    }

                    if (newline) {
                        keyblocknums--;

                        if (keyblocknums > 0) {
                            str += ',\r\n';
                        }
                        else {
                            str += '\r\n';
                        }
                    }
                }
            }
        }

        str += ") ENGINE=InnoDB DEFAULT CHARSET=utf8";

        if (isautoinc) {
            str += ' AUTO_INCREMENT=' + autoincval;
        }

        str += ';\r\n';

        return str;
    }
}

// callback(isok, err)
function exportSql(obj, callback) {
    var str = '';
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; ++i) {
            if (obj[i].type == 'struct' && base.isExportTypeString(obj[i].name)) {
                var cs = exportTable(obj[i], callback, obj);
                if (cs == undefined) {
                    return ;
                }

                str += cs + '\r\n';
            }
        }

        return str;
    }

    return ;
}

exports.exportSql = exportSql;