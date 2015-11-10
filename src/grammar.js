/**
 * Created by zhs007 on 15/11/9.
 */

var base = require('./base');

var rTypeString = new RegExp('[A-Z]+[_0-9a-zA-Z]*');
var rVarString = new RegExp('[_a-z]+[_0-9a-zA-Z]*');
var rEnumString = new RegExp('[A-Z]+[_0-9A-Z]*');

function isTypeString(str) {
    return rTypeString.exec(str) == str;
}

function isVarString(str) {
    return rVarString.exec(str) == str;
}

function isEnumString(str) {
    return rEnumString.exec(str) == str;
}

//function isBaseType(str) {
//    if (str == 'int') {
//        return true;
//    }
//    else if (str == 'string') {
//        return true;
//    }
//    else if (str == 'time') {
//        return true;
//    }
//
//    return false;
//}
//
//function isType(root, str) {
//    if (isBaseType(str)) {
//        return true;
//    }
//
//    for (var i = 0; i < root.length; ++i) {
//        if (root[i].name == str && (root[i].type == 'type' || root[i].type == 'struct' || root[i].type == 'enum')) {
//            return true;
//        }
//    }
//
//    return false;
//}

// callback(isok, err)
function checkStructMember(structname, obj, callback, root) {
    if (!isVarString(obj.name)) {
        callback(false, structname + '.' + obj.name + ': The first letter should be lowercase.');

        return false;
    }

    if (!base.isType(root, obj.type)) {
        callback(false, structname + '.' + obj.name + ': ' + obj.type + ' not defined.');

        return false;
    }

    if (obj.type == 'time') {
        if (obj.hasOwnProperty('val')) {
            if (typeof(obj.val) == 'object') {
                if (obj.val.type == 'NULL') {
                    return true;
                }
                else if (obj.val.type == 'time' && obj.val.val == 'NOW') {
                    return true;
                }
            }

            callback(false, structname + '.' + obj.name + ': default is not NULL or NOW.');

            return false;
        }
    }
    else if (obj.type == 'int') {
        if (obj.hasOwnProperty('val')) {
            if (typeof(obj.val) == 'object') {
                if (obj.val.type == 'int' && obj.val.val == 'AUTOINC') {
                    if (obj.type2 != 'primary') {
                        callback(false, structname + '.' + obj.name + ': AUTOINC is primary.');

                        return false;
                    }
                }
            }
        }
    }

    return true;
}

// callback(isok, err)
function checkStruct(obj, callback, root) {
    if (obj.type == 'struct' || obj.type == 'static') {
        if (!isTypeString(obj.name)) {
            callback(false, 'struct ' + obj.name + ': The first letter should be capitalized.');

            return false;
        }

        for (var i = 0; i < obj.val.length; ++i) {
            if (!checkStructMember(obj.name, obj.val[i], callback, root)) {
                return false;
            }
        }
    }

    return true;
}

// callback(isok, err)
function checkEnumMember(enumname, enumarr, obj, callback) {
    if (!isEnumString(obj.name)) {
        callback(false, enumname + '.' + obj.name + ': All letters should be capitalized.');

        return false;
    }

    if (obj.type != 'int') {
        callback(false, enumname + '.' + obj.name + ': This member is not int.');

        return false;
    }

    if (obj.name.indexOf(enumname + '_') != 0) {
        callback(false, enumname + '.' + obj.name + ': This member is begin ' + enumname + '_.');

        return false;
    }

    if (enumarr.indexOf(obj.val) >= 0) {
        callback(false, enumname + '.' + obj.name + ': This member\'s val is used.');

        return false;
    }

    return true;
}

// callback(isok, err)
function checkEnum(obj, callback) {
    if (obj.type == 'enum') {
        if (!rEnumString(obj.name)) {
            callback(false, 'enum ' + obj.name + ': All letters should be capitalized.');

            return false;
        }

        var enumarr = [];

        for (var i = 0; i < obj.val.length; ++i) {
            if (!checkEnumMember(obj.name, enumarr, obj.val[i], callback)) {
                return false;
            }

            enumarr.push(obj.val[i].val);
        }
    }

    return true;
}

// callback(isok, err)
function checkType(obj, callback, root) {
    if (obj.type == 'type') {
        if (!isTypeString(obj.name)) {
            callback(false, 'global type ' + obj.name + ': The first letter should be capitalized.');

            return false;
        }

        if (!base.isType(root, obj.name)) {
            callback(false, 'global type ' + obj.name + ': ' + obj.name + ' not defined.');

            return false;
        }
    }

    return true;
}

// callback(isok, err)
function checkGrammar(obj, callback) {
    if (Array.isArray(obj)) {

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i].type == 'struct' || obj.type == 'static') {
                checkStruct(obj[i], callback, obj);
            }
            else if (obj.type == 'enum') {
                checkEnum(obj[i], callback);
            }
            else if (obj.type == 'type') {
                checkType(obj[i], callback, obj);
            }
        }

        return true;
    }

    callback(false, 'empty file!');

    return false;
}

exports.checkGrammar = checkGrammar;