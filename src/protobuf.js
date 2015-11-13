/**
 * Created by zhs007 on 15/11/12.
 */

var base = require('./base');

function isResMsg(name) {
    return name.indexOf('Res_') == 0;
}

function isReqMsg(name) {
    return name.indexOf('Req_') == 0;
}

function buildEnumReqMemberName(name) {
    return 'MSGID_REQ_' + name.slice(4).toUpperCase();
}

function buildEnumResMemberName(name) {
    return 'MSGID_RES_' + name.slice(4).toUpperCase();
}

function exportEnumMsgID(lstreq, reqid, lstres, resid) {
    var str = '// 消息ID定义 \r\n';
    str += 'enum MSGID {\r\n\r\n';

    str += '\t//---------------------------------------------------- \r\n';
    str += '\t// 客户端发送的消息 \r\n';
    for (var i = 0; i < lstreq.length; ++i) {
        str += '\t' + buildEnumReqMemberName(lstreq[i].name) + ' = ' + reqid + '; // ' + lstreq[i].comment + '\r\n';
        reqid++;
    }

    str += '\r\n';

    str += '\t//---------------------------------------------------- \r\n';
    str += '\t// 服务器发送的消息 \r\n';
    for (var i = 0; i < lstres.length; ++i) {
        str += '\t' + buildEnumResMemberName(lstres[i].name) + ' = ' + resid + '; // ' + lstres[i].comment + '\r\n';
        resid++;
    }

    str += '\r\n';

    str += '}\r\n\r\n';

    return str;
}

function getPBRealType(str, root) {
    if (str == 'MsgID') {
        return 'MSGID';
    }

    if (base.isBaseType(str)) {
        if (str == 'int') {
            return 'int32';
        }

        return str;
    }

    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str) {
            if (root[i].type == 'enum') {
                return root[i].name;
            }

            if (root[i].type == 'struct' || root[i].type == 'message' || root[i].type == 'static') {
                return root[i].name;
            }

            if (root[i].type == 'type') {
                return getPBRealType(root[i].val);
            }
        }
    }

    return '[ERR]';
}

function getFirstType(member) {
    if (member.hasOwnProperty('type2')) {
        if (member.type2 == 'repeated') {
            return 'repeated';
        }
    }

    if (member.hasOwnProperty('val') && member.val.val == 'NULL') {
        return 'optional';
    }

    return 'required';
}

function exportMsg(msg, callback, root) {
    var str = '// ' + msg.comment + ' \r\n';
    str += 'message ' + msg.name + ' {\r\n';

    var beginid = 1;

    for (var i = 0; i < msg.val.length; ++i) {
        str += '\t' + getFirstType(msg.val[i]);
        str += ' ' + getPBRealType(msg.val[i].type, root);
        str += ' ' + msg.val[i].name.name + ' = ' + beginid + '; // ' + msg.val[i].comment;

        beginid++;

        str += '\r\n';
    }

    str += '}\r\n'

    return str;
}

// callback(isok, err)
function exportProtobuf(pkgname, obj, callback) {
    var lstexport = [];
    var lstreq = [];
    var lstres = [];

    if (Array.isArray(obj)) {
        var str = 'package ' + pkgname + ';\r\n\r\n';

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i].type == 'message') {
                if (isResMsg(obj[i].name)) {
                    lstres.push({name: obj[i].name, comment: obj[i].comment});
                }
                else if (isReqMsg(obj[i].name)) {
                    lstreq.push({name: obj[i].name, comment: obj[i].comment});
                }
            }
        }

        str += exportEnumMsgID(lstreq, base.getGlobalObj('REQ_MSGID_BEGIN', obj).val.val, lstres, base.getGlobalObj('RES_MSGID_BEGIN', obj).val.val);

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i].type == 'message') {
                var cs = exportMsg(obj[i], callback, obj);
                if (cs == undefined) {
                    return ;
                }

                str += cs + '\r\n';
            }
        }

        return str;
    }

    return undefined;
}

exports.exportProtobuf = exportProtobuf;