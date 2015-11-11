/**
 * Created by zhs007 on 15/11/9.
 */

var base = require('./base');

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

        var validindex = [];
        for (var i = 0; i < obj.val.length; ++i) {
            var membername = obj.val[i].name.name;
            // type
            var t = base.getRealType(obj.val[i].type, root);
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


        for (var k = 0; k < validindex.length; ++k) {
            var i = validindex[k];
            var membername = obj.val[i].name.name;
            var fn = base.getMemberName(membername);

            // name
            str += "  `" + fn + "` ";

            // type
            var t = base.getRealType(obj.val[i].type, root);
            if (t == '[ERR]') {
                callback(false, 'struct ' + obj.name + '.' + membername + ': type is Error!');

                return ;
            }
            else if (t == 'int') {
                str += "int ";
            }
            else if (t == 'string') {
                str += "varchar ";
            }
            else if (t == 'time') {
                str += "timestamp ";
            }
            else {
                callback(false, 'struct ' + obj.name + '.' + membername + ': type not defined!');

                return ;
            }

            // NULL
            if (typeof(obj.val[i].val) == 'object' && obj.val[i].val.type == 'NULL') {
                str += 'NULL';
            }
            else {
                str += 'NOT NULL';
            }

            // AUTO_INCREMENT
            if (typeof(obj.val[i].val) == 'object' && obj.val[i].val.val == 'AUTOINC') {
                str += ' AUTO_INCREMENT';
                isautoinc = true;

                if (obj.val[i].val.hasOwnProperty('autoinc')) {
                    autoincval = obj.val[i].val.autoinc;
                }
            }
            // DEFAULT CURRENT_TIMESTAMP
            else if (typeof(obj.val[i].val) == 'object' && obj.val[i].val.val == 'NOW') {
                str += ' DEFAULT CURRENT_TIMESTAMP';
            }

            if (k < validindex.length - 1) {
                str += ', --' + obj.val[i].comment + '\r\n';
            }
            else {
                lastcomment = ' --' + obj.val[i].comment + '\r\n';
            }
        }

        // PRIMARY & INDEX
        for (var i = 0; i < obj.val.length; ++i) {
            if (obj.val[i].hasOwnProperty('type2')) {
                var membername = obj.val[i].name.name;
                var fn = base.getMemberName(membername);

                if (obj.val[i].type2 == 'primary') {
                    str += ",";
                    str += lastcomment;
                    lastcomment = '\r\n';
                    str += "  PRIMARY KEY (`" + fn + "`)";
                }
                else if (obj.val[i].type2 == 'primary0' || obj.val[i].type2 == 'primary1' || obj.val[i].type2 == 'index') {
                    str += ",";
                    str += lastcomment;
                    lastcomment = '\r\n';
                    str += "  KEY (`" + fn + "`)";
                }
                if (obj.val[i].type2 == 'unique') {
                    str += ",";
                    str += lastcomment;
                    lastcomment = '\r\n';
                    str += "  UNIQUE (`" + fn + "`)";
                }
            }
        }

        str += lastcomment;

        str += ") ENGINE=InnoDB DEFAULT CHARSET=utf8";

        if (isautoinc) {
            str += ' AUTO_INCREMENT=' + autoincval;
        }

        str += ';\r\n';

        return str;
    }
}

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