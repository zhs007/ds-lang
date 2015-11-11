/**
 * Created by zhs007 on 15/11/9.
 */

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

function getRealType(str, root) {
    if (isBaseType(str)) {
        return str;
    }

    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str) {
            if (root[i].type == 'enum') {
                return 'int';
            }

            if (root[i].type == 'struct') {
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

function hasMember(str, obj) {
    for (var i = 0; i < obj.val.length; ++i) {
        if (obj.val[i].name.name == str) {
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

exports.isBaseType = isBaseType;
exports.isType = isType;
exports.getRealType = getRealType;
exports.getMemberName = getMemberName;
exports.isEnum = isEnum;
exports.isStruct = isStruct;
exports.isStatic = isStatic;
exports.hasMember = hasMember;
exports.getGlobalObj = getGlobalObj;
exports.getEnumMemberRealName = getEnumMemberRealName;
exports.isExportTypeString = isExportTypeString;