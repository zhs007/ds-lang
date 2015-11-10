/**
 * Created by zhs007 on 15/11/9.
 */

var rMemberName = new RegExp('[a-z]+[_0-9a-z]*');

function getMemberName(str) {
    return rMemberName.exec(str.toLowerCase());
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

function isType(root, str) {
    if (isBaseType(str)) {
        return true;
    }

    for (var i = 0; i < root.length; ++i) {
        if (root[i].name == str && (root[i].type == 'type' || root[i].type == 'struct' || root[i].type == 'enum')) {
            return true;
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

exports.isBaseType = isBaseType;
exports.isType = isType;
exports.getRealType = getRealType;
exports.getMemberName = getMemberName;