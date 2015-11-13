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

function getRealType(str, root) {
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
function forEachStruct(structname, obj, root, callback) {
    for (var i = 0; i < obj.val.length; ++i) {
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
        if (root[i].name == str) {
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

exports.isBaseType = isBaseType;
exports.isType = isType;
exports.getRealType = getRealType;
exports.getMemberName = getMemberName;
exports.isEnum = isEnum;
exports.isStruct = isStruct;
exports.isStatic = isStatic;
exports.hasMember = hasMember;
exports.hasMemberEx = hasMemberEx;
exports.getGlobalObj = getGlobalObj;
exports.getEnumMemberRealName = getEnumMemberRealName;
exports.isExportTypeString = isExportTypeString;
exports.countMember = countMember;
exports.forEachStruct = forEachStruct;
exports.countGlobalObj = countGlobalObj;
exports.getNoUnderscoreName = getNoUnderscoreName;