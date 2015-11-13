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

    str += '\t//--------------------------------------------------------------------------- \r\n';
    str += '\t// 客户端发送的消息 \r\n';
    for (var i = 0; i < lstreq.length; ++i) {
        str += '\t' + buildEnumReqMemberName(lstreq[i].name) + ' = ' + reqid + '; // ' + lstreq[i].comment + '\r\n';
        reqid++;
    }

    str += '\r\n';

    str += '\t//--------------------------------------------------------------------------- \r\n';
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
        else if (str == 'time') {
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

function exportMember(obj, lstexport, root) {
    base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (cobj.name.name.indexOf('_') != 0) {
            if (base.isEnum(cobj.type, root)) {
                if (lstexport.indexOf(cobj.type) < 0) {
                    lstexport.push(cobj.type);
                }
            }
            else if (base.isStruct(cobj.type, root) || base.isStatic(cobj.type, root)) {

                if (lstexport.indexOf(cobj.type) < 0) {
                    lstexport = exportMember(base.getGlobalObj(cobj.type, root), lstexport, root);
                }

                if (lstexport.indexOf(cobj.type) < 0) {
                    lstexport.push(cobj.type);
                }
            }
        }
    });

    return lstexport;
}

function exportEnum(obj, callback, root) {
    var str = '// ' + obj.comment + ' \r\n';
    str += 'enum ' + obj.name + ' {\r\n';

    for (var i = 0; i < obj.val.length; ++i) {
        str += '\t' + obj.val[i].name + ' = ' + obj.val[i].val.val + '; // ' + obj.val[i].comment;

        str += '\r\n';
    }

    str += '}\r\n'

    return str;
}

function exportMsg(msg, callback, root) {
    var str = '// ' + msg.comment + ' \r\n';
    str += 'message ' + base.getNoUnderscoreName(msg.name) + ' {\r\n';

    var beginid = 1;

    base.forEachStruct(msg.name, msg, root, function (structname, obj, root) {
        if (obj.name.name.indexOf('_') != 0) {
            str += '\t' + getFirstType(obj);
            str += ' ' + base.getNoUnderscoreName(getPBRealType(obj.type, root));
            str += ' ' + obj.name.name + ' = ' + beginid + '; // ' + obj.comment;

            beginid++;

            str += '\r\n';
        }
    });

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
                lstexport = exportMember(obj[i], lstexport, obj);
            }
        }

        for (var i = 0; i < lstexport.length; ++i) {
            var co = base.getGlobalObj(lstexport[i], obj);
            if (co.type == 'enum') {
                var cs = exportEnum(co, callback, obj);
                if (cs == undefined) {
                    return ;
                }

                str += cs + '\r\n';
            }
            else {
                var cs = exportMsg(co, callback, obj);
                if (cs == undefined) {
                    return ;
                }

                str += cs + '\r\n';
            }
        }

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