/**
 * Created by zhs007 on 15/11/9.
 */

var base = require('./base');

var rFieldString = new RegExp('[a-z]+[_0-9a-z]*');

function getTableName(str) {
    return str.toLowerCase();
}

// callback(isok, err)
function exportTable(obj, callback, root) {
    if (obj.type == 'struct') {
        var isautoinc = false;
        var str = "--" + obj.comment + '\r\n';
        str += "CREATE TABLE IF NOT EXISTS `" + getTableName(obj.name) + "` (" + '\r\n';

        var lastcomment = '';

        for (var i = 0; i < obj.val.length; ++i) {
            var fn = base.getMemberName(obj.val[i].name);
            // name
            str += "`" + fn + "` ";

            // type
            var t = base.getRealType(obj.val[i].type, root);
            if (t == '[ERR]') {
                callback(false, 'struct ' + obj.name + '.' + obj.val[i].name + ': type is Error!');

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
                callback(false, 'struct ' + obj.name + '.' + obj.val[i].name + ': type not defined!');

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
            }
            // DEFAULT CURRENT_TIMESTAMP
            else if (typeof(obj.val[i].val) == 'object' && obj.val[i].val.val == 'NOW') {
                str += ' DEFAULT CURRENT_TIMESTAMP';
            }

            if (i < obj.val.length - 1) {
                str += ', --' + obj.val[i].comment + '\r\n';
            }
            else {
                lastcomment = ' --' + obj.val[i].comment + '\r\n';
            }
        }

        // PRIMARY & INDEX
        for (var i = 0; i < obj.val.length; ++i) {
            if (obj.val[i].hasOwnProperty('type2')) {
                var fn = base.getMemberName(obj.val[i].name);

                if (obj.val[i].type2 == 'primary') {
                    str += ",";
                    str += lastcomment;
                    lastcomment = '\r\n';
                    str += "PRIMARY KEY (`" + fn + "`)";
                }
                else if (obj.val[i].type2 == 'primary0' || obj.val[i].type2 == 'primary1' || obj.val[i].type2 == 'index') {
                    str += ",";
                    str += lastcomment;
                    lastcomment = '\r\n';
                    str += "KEY (`" + fn + "`)";
                }
                if (obj.val[i].type2 == 'unique') {
                    str += ",";
                    str += lastcomment;
                    lastcomment = '\r\n';
                    str += "UNIQUE (`" + fn + "`)";
                }
            }
        }

        str += lastcomment;

        str += ") ENGINE=InnoDB DEFAULT CHARSET=utf8";

        if (isautoinc) {
            str += ' AUTO_INCREMENT=1';
        }

        str += ';';

        return str;
    }
}

function exportSql(obj, callback) {
    var str = '';
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; ++i) {
            if (obj[i].type == 'struct') {
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