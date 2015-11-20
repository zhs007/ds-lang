/**
 * Created by zhs007 on 15/11/9.
 */

var fs = require('fs');

var rMemberName = new RegExp('[a-z]+[_0-9a-z]*');
var rExportTypeString = new RegExp('[A-Z]+[_0-9a-zA-Z]*');

function getMemberName(str) {
    return rMemberName.exec(str.toLowerCase());
}

function isExportTypeString(str) {
    return rExportTypeString.exec(str) == str;
}

function isBaseType(str) {
    if (str == 'int') {
        return true;
    }
    else if (str == 'string') {
        return true;
    }
    else if (str == 'time') {
        return true;
    }
    else if (str == 'bool') {
        return true;
    }
    else if (str == 'bytes') {
        return true;
    }

    return false;
}

function isType(str, root) {
    if (isBaseType(str)) {
        return true;
    }

    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str) {
            if (root[i].type == 'type' || root[i].type == 'struct' || root[i].type == 'enum' || root[i].type == 'static' || root[i].type == 'message') {
                return true;
            }
        }
    }

    return false;
}


function getRealType_Enum(str, root) {
    if (isBaseType(str)) {
        return str;
    }

    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str) {
            if (root[i].type == 'enum') {
                return 'int';
            }

            if (root[i].type == 'struct' || root[i].type == 'message' || root[i].type == 'static') {
                return root[i].name;
            }

            if (root[i].type == 'type') {
                return getRealType_Enum(root[i].val);
            }
        }
    }

    return '[ERR]';
}

function getRealType(str, root) {
    if (isBaseType(str)) {
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
                return getRealType(root[i].val);
            }
        }
    }

    return '[ERR]';
}

function isEnum(str, root) {
    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str) {
            if (root[i].type == 'enum') {
                return true;
            }
        }
    }

    return false;
}

function isStruct(str, root) {
    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str) {
            if (root[i].type == 'struct') {
                return true;
            }
        }
    }

    return false;
}

function isStatic(str, root) {
    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str) {
            if (root[i].type == 'static') {
                return true;
            }
        }
    }

    return false;
}

function hasMember2(str, obj, root) {
    var ii = str.indexOf('.');
    if (ii < 0) {
        return hasMember(str, obj, root);
    }

    if (ii == 0) {
        return false;
    }

    var curtype = undefined;
    var cur = str.slice(0, ii);
    forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (cur == cobj.name.name) {
            curtype = cobj.type;
        }
    });

    if (curtype != undefined) {
        return hasMember2(str.slice(ii + 1), getGlobalObj(curtype, root), root);
    }

    return false;
}

function hasMember(str, obj, root) {
    for (var i = 0; i < obj.val.length; ++i) {
        if (obj.val[i].type2 == 'expand' && !obj.val[i].hasOwnProperty('expand') && isStruct(obj.val[i].type, root)) {
            var cobj = getGlobalObj(obj.val[i].type, root);
            if (cobj != undefined) {
                if (hasMember(str, cobj, root)) {
                    return true;
                }
            }
        }
        else if (obj.val[i].name.name == str) {
            return true;
        }
    }

    return false;
}

function countMember(str, obj, root) {
    var nums = 0;

    for (var i = 0; i < obj.val.length; ++i) {
        if (obj.val[i].type2 == 'expand' && !obj.val[i].hasOwnProperty('expand') && isStruct(obj.val[i].type, root)) {
            var cobj = getGlobalObj(obj.val[i].type, root);
            if (cobj != undefined) {
                nums += hasMember(str, cobj, root);
            }
        }
        else if (obj.val[i].name.name == str) {
            nums += 1;
        }
    }

    return nums;
}

function hasMemberEx(str, noexpand, obj, root) {
    for (var i = 0; i < obj.val.length; ++i) {
        if (obj.val[i].type2 == 'expand' && !obj.val[i].hasOwnProperty('expand') && obj.val[i].type != noexpand && isStruct(obj.val[i].type, root)) {
            var cobj = getGlobalObj(obj.val[i].type, root);
            if (cobj != undefined) {
                if (hasMember(str, cobj, root)) {
                    return true;
                }
            }
        }
        else if (obj.val[i].name.name == str) {
            return true;
        }
    }

    return false;
}

function getGlobalObj(str, root) {
    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str) {
            return root[i];
        }
    }

    return undefined;
}

function getEnumMemberRealName(str, enumname) {
    return str.slice(enumname.length + 1).toLowerCase();
}

// callback(structname, obj, root)
function forEachStruct(structname, obj, root, callback, noexline) {
    if (noexline == undefined) {
        noexline = false;
    }

    for (var i = 0; i < obj.val.length; ++i) {
        if (noexline && obj.val[i].name.name.indexOf('_') == 0) {
            continue ;
        }

        if (obj.val[i].hasOwnProperty('type2') && obj.val[i].type2 == 'expand') {
            if (!obj.val[i].hasOwnProperty('expand')) {
                forEachStruct(structname, getGlobalObj(obj.val[i].type, root), root, callback);
            }
            else {
                var expandobj = getGlobalObj(obj.val[i].expand, root);
                for (var eoi = 0; eoi < expandobj.val.length; ++eoi) {
                    callback(structname, {
                        name: {name: getEnumMemberRealName(expandobj.val[eoi].name, expandobj.name)},
                        type: obj.val[i].type,
                        comment: expandobj.val[eoi].comment}, root);
                }
            }
        }
        else {
            if (obj.name != structname && obj.val[i].hasOwnProperty('type2') && obj.val[i].type2 == 'primary') {
                callback(structname, {
                    name: obj.val[i].name,
                    val: obj.val[i].val,
                    type: obj.val[i].type,
                    type2: 'unique'
                }, root);
            }
            else {
                callback(structname, obj.val[i], root);
            }
        }
    }
}

function countGlobalObj(str, root) {
    var nums = 0;
    for (var i = 0; i < root.length; ++i) {
        if (getNoUnderscoreName(root[i].name) == getNoUnderscoreName(str)) {
            nums++;
        }
    }

    return nums;
}

function getNoUnderscoreName(name) {
    if (name.indexOf('_') == 0) {
        return getNoUnderscoreName(name.slice(1));
    }

    return name;
}

function loadJson(filename) {
    if (fs.existsSync(filename)) {
        var str = fs.readFileSync(filename, 'utf-8');
        return JSON.parse(str);
    }

    return undefined;
}

//function isStaticStruct(name, root) {
//    var obj = getGlobalObj(name, root);
//    if (obj != undefined) {
//        if (obj.type == 'static') {
//            return true;
//        }
//
//        if (obj.type == 'struct') {
//            for (var i = 0; i < obj.val.length; ++i) {
//                if (isBaseType(obj.val[i].type)) {
//                    if (!(obj.val[i].hasOwnProperty('type2') && obj.val[i].type2 == 'primary')) {
//                        return false;
//                    }
//                }
//                else {
//                    if (!isStaticStruct(obj.val[i].type, root)) {
//                        return false;
//                    }
//                }
//            }
//
//            return true;
//        }
//    }
//
//    return false;
//}

function getStructMemberType(membername, structname, root) {
    var obj = getGlobalObj(structname, root);
    if (obj != undefined) {
        if (obj.type == 'message' || obj.type == 'struct' || obj.type == 'static') {
            for (var i = 0; i < obj.val.length; ++i) {
                if (obj.val[i].name.name == membername) {
                    return obj.val[i].type;
                }
            }
        }
    }

    return undefined;
}

function isResMsg(name) {
    return name.indexOf('Res_') == 0;
}

function isReqMsg(name) {
    return name.indexOf('Req_') == 0;
}

function getRealMsgName(name) {
    if (isResMsg(name)) {
        return name.slice(4);
    }
    else if (isReqMsg(name)) {
        return name.slice(4);
    }

    return name;
}

function buildEnumReqMemberName(name) {
    return 'MSGID_REQ_' + name.slice(4).toUpperCase();
}

function buildEnumResMemberName(name) {
    return 'MSGID_RES_' + name.slice(4).toUpperCase();
}

function getMemberDefaultVal(obj, member, root) {
    var curtype = getRealType(member.type, root);
    if (isBaseType(curtype)) {
        if (member.hasOwnProperty('val')) {
            if ('AUTOINC' == member.val.val) {
                return 0;
            }
            else if ('NOW' == member.val.val) {
                return 'Date.now()';
            }
        }

        if ('string' == curtype) {
            return '""';
        }

        return 0;
    }

    if (member.hasOwnProperty('val')) {
        return member.val.name;
    }

    return ;
}

// 根据名字取到成员
function getMember(obj, name, root) {
    var ii = str.indexOf('.');
    if (ii < 0) {
        var curobj = undefined;
        forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
            if (name == cobj.name.name) {
                curobj = cobj;
            }
        });

        return curobj;
    }

    if (ii == 0) {
        return ;
    }

    var curtype = undefined;
    var cur = str.slice(0, ii);
    forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (cur == cobj.name.name) {
            curtype = cobj.type;
        }
    });

    if (curtype != undefined) {
        return getMember(getGlobalObj(curtype, root), str.slice(ii + 1), root);
    }

    return ;
}

// 为结构增加标识
function setInMessage(obj, root) {
    obj.inmessage = true;

    if (obj.type == 'static' || obj.type == 'struct' || obj.type == 'message') {
        for (var i = 0; i < obj.val.length; ++i) {
            var cval = obj.val[i];
            if (cval.hasOwnProperty('type2') && 'expand' == cval.type2) {
                continue ;
            }

            var mytype = getRealType(cval.type, root);
            if (isBaseType(mytype)) {
                continue ;
            }

            setInMessage(getGlobalObj(mytype, root), root);
        }
    }
}

// 为所有消息内结构增加标识
function procInMessage(root) {
    for (var i = 0; i < root.length; ++i) {
        if ('message' == root[i].type) {
            setInMessage(root[i], root);
        }
    }

    return root;
}

exports.isBaseType = isBaseType;
exports.isType = isType;
exports.getRealType = getRealType;
exports.getRealType_Enum = getRealType_Enum;
exports.getMemberName = getMemberName;
exports.isEnum = isEnum;
exports.isStruct = isStruct;
exports.isStatic = isStatic;
exports.hasMember = hasMember;
exports.hasMember2 = hasMember2;
exports.hasMemberEx = hasMemberEx;
exports.getGlobalObj = getGlobalObj;
exports.getEnumMemberRealName = getEnumMemberRealName;
exports.isExportTypeString = isExportTypeString;
exports.countMember = countMember;
exports.forEachStruct = forEachStruct;
exports.countGlobalObj = countGlobalObj;
exports.getNoUnderscoreName = getNoUnderscoreName;
exports.loadJson = loadJson;
//exports.isStaticStruct = isStaticStruct;
exports.getStructMemberType = getStructMemberType;
exports.isResMsg = isResMsg;
exports.getRealMsgName = getRealMsgName;
exports.isReqMsg = isReqMsg;
exports.buildEnumReqMemberName = buildEnumReqMemberName;
exports.buildEnumResMemberName = buildEnumResMemberName;
exports.getMemberDefaultVal = getMemberDefaultVal;
exports.getMember = getMember;
exports.procInMessage = procInMessage;