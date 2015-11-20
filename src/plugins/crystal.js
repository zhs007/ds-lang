/**
 * Created by zhs007 on 15/11/14.
 */

var base = require('../base');
var code = require('../code');
var path = require('path');
var fs = require('fs');

function getCPPType(name) {
    if (base.isBaseType(name)) {
        if (name == 'time') {
            return 'time_t';
        }
        else if (name == 'string') {
            return 'std::string';
        }
    }

    return name;
}

function getCPPType_funcparam(name, root) {
    var rtype = base.getRealType(name, root);
    if (base.isBaseType(rtype)) {
        if (name == 'time') {
            return 'time_t';
        }
        else if (name == 'string') {
            return 'const char*';
        }

        return name;
    }
    else if (base.isEnum(rtype, root)) {
        return rtype;
    }

    return name + '&';
}

// callback(isok, errinfo)
function clientcpp_exportTypedef(obj, root, callback, option) {
    var arr = ['typedef ' + obj.val + ' ' + obj.name + ';', '// ' + obj.comment];

    return arr;
}

// callback(isok, errinfo)
function clientcpp_exportEnum(obj, root, callback, option) {
    var enumobj = {name: obj.name, comment: obj.comment, member: []};
    var arr = [[], [], []];

    for (var i = 0; i < obj.val.length; ++i) {
        if (i == obj.val.length - 1) {
            arr[0].push(obj.val[i].name);
            arr[1].push('= ' + obj.val[i].val.val);
            arr[2].push('//' + obj.val[i].comment);
        }
        else {
            arr[0].push(obj.val[i].name);
            arr[1].push('= ' + obj.val[i].val.val + ',');
            arr[2].push('//' + obj.val[i].comment);
        }

        enumobj.member.push({name: obj.val[i].name, val: obj.val[i].val.val, comment: obj.val[i].comment});
    }

    arrcode = code.alignCodeEx(arr, '');
    for (var i = 0; i < arrcode.length; ++i) {
        enumobj.member[i].code = arrcode[i];
    }

    return enumobj;
}

// callback(isok, errinfo)
function clientcpp_exportStruct(obj, root, callback, option) {
    var structobj = {name: base.getNoUnderscoreName(obj.name), comment: obj.comment, member: []};
    var arr = [[], []];

    if (option.mainobj == obj.name) {
        return undefined;
    }

    var inmsg = false;
    if (obj.hasOwnProperty('inmessage') && obj.inmessage) {
        structobj.inmsg = [];
        inmsg = true;
    }

    base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (option.isclient) {
            if (cobj.name.name.indexOf('_') == 0) {
                return ;
            }
        }

        if (cobj.hasOwnProperty('type2')) {
            if (cobj.type2 == 'repeated') {
                arr[0].push('std::vector<' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '> ' + base.getNoUnderscoreName(cobj.name.name) + ';');
                arr[1].push('// ' + cobj.comment);

                return ;
            }
            else if(cobj.type2 == 'map') {
                arr[0].push('std::map<' + base.getStructMemberType(cobj.memberkey, cobj.type, root) + ', ' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '> ' + base.getNoUnderscoreName(cobj.name.name) + ';');
                arr[1].push('// ' + cobj.comment);

                return ;
            }
        }

        arr[0].push(base.getNoUnderscoreName(getCPPType(cobj.type)) + ' ' + base.getNoUnderscoreName(cobj.name.name) + ';');
        arr[1].push('// ' + cobj.comment);

        if (inmsg) {
            structobj.inmsg.push({code: base.getNoUnderscoreName(cobj.name.name) + ' = msg.' + base.getNoUnderscoreName(cobj.name.name) + '();'});
        }
    }, true);

    structobj.member = code.alignCodeEx(arr, '');

    return structobj;
}

// callback(isok, errinfo)
function clientcpp_exportStatic(obj, root, callback, option) {
    var structobj = {name: base.getNoUnderscoreName(obj.name), comment: obj.comment, member: []};
    var arr = [[], []];

    if (option.mainobj == obj.name) {
        return undefined;
    }

    if (obj.hasOwnProperty('inmessage') && obj.inmessage) {
        structobj.inmsg = true;
    }

    base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (option.isclient) {
            if (cobj.name.name.indexOf('_') == 0) {
                return ;
            }
        }

        if (cobj.hasOwnProperty('type2')) {
            if (cobj.type2 == 'repeated') {
                arr[0].push('std::vector<' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '> ' + base.getNoUnderscoreName(cobj.name.name) + ';');
                arr[1].push('// ' + cobj.comment);

                return ;
            }
            else if(cobj.type2 == 'map') {
                arr[0].push('std::map<' + base.getStructMemberType(cobj.memberkey, cobj.type, root) + ', ' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '> ' + base.getNoUnderscoreName(cobj.name.name) + ';');
                arr[1].push('// ' + cobj.comment);

                return ;
            }
        }

        arr[0].push(base.getNoUnderscoreName(getCPPType(cobj.type)) + ' ' + base.getNoUnderscoreName(cobj.name.name) + ';');
        arr[1].push('// ' + cobj.comment);
    }, true);

    structobj.member = code.alignCodeEx(arr, '');

    return structobj;
}

// callback(isok, errinfo)
function clientcpp_exportMainObj(obj, root, callback, option) {
    var mainobj = {name: base.getNoUnderscoreName(obj.name), comment: obj.comment, member: []};
    var arr = [[], []];
    var member = [];

    base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (option.isclient) {
            if (cobj.name.name.indexOf('_') == 0) {
                return ;
            }
        }

        if (cobj.hasOwnProperty('type2')) {
            if (cobj.type2 == 'repeated') {
                arr[0].push('std::vector<' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '> ' + base.getNoUnderscoreName(cobj.name.name) + ';');
                arr[1].push('// ' + cobj.comment);

                member.push({name: base.getNoUnderscoreName(cobj.name.name), type: 'std::vector<' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '>'});

                return ;
            }
            else if(cobj.type2 == 'map') {
                arr[0].push('std::map<' + base.getStructMemberType(cobj.memberkey, cobj.type, root) + ', ' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '> ' + base.getNoUnderscoreName(cobj.name.name) + ';');
                arr[1].push('// ' + cobj.comment);

                member.push({name: base.getNoUnderscoreName(cobj.name.name), type: 'std::map<' + base.getStructMemberType(cobj.memberkey, cobj.type, root) + ', ' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '>'});

                return ;
            }
        }

        arr[0].push(base.getNoUnderscoreName(getCPPType(cobj.type)) + ' ' + base.getNoUnderscoreName(cobj.name.name) + ';');
        arr[1].push('// ' + cobj.comment);

        member.push({name: base.getNoUnderscoreName(cobj.name.name), type: base.getNoUnderscoreName(getCPPType(cobj.type))});
    });

    var arrcode = code.alignCodeEx(arr, '');
    for (var ii = 0; ii < arrcode.length; ++ii) {
        member[ii].code = arrcode[ii];
    }

    mainobj.member = member;

    return mainobj;
}

function clientcpp_exportCSVLoader(memberobj, root, callback, option) {
    var csvloader = {
        name: memberobj.name.name,
        filename: base.getMemberName(memberobj.type) + '.csv',
        keytype: base.getStructMemberType(memberobj.memberkey, memberobj.type, root),
        typename: base.getNoUnderscoreName(getCPPType(memberobj.type)),
        memberkey: memberobj.memberkey,
        comment: memberobj.comment,
        member: []
    };

    base.forEachStruct(memberobj.type, base.getGlobalObj(memberobj.type, root), root, function (staticname, scobj, root) {
        if (option.isclient) {
            if (scobj.name.name.indexOf('_') == 0) {
                return;
            }
        }

        var curmember = {};

        curmember.name = scobj.name.name;

        var scvt = base.getRealType(scobj.type, root);
        if (scvt == 'string') {
            curmember.code = 'val.second.' + scobj.name.name + ' = csvloader.get("' + scobj.name.name + '", y);';
        }
        else {
            curmember.code = 'val.second.' + scobj.name.name + ' = csvloader.get_int("' + scobj.name.name + '", y);';
        }

        csvloader.member.push(curmember);
    });

    return csvloader;
}

function clientcpp_exportSendMsg(msgobj, root, callback, option) {
    var msg = {
        msgname: msgobj.name,
        rname: base.getRealMsgName(msgobj.name),
        comment: msgobj.comment,
        funcparam: '',
        msgid: 'MSGID_REQ_' + base.getRealMsgName(msgobj.name).toUpperCase(),
        member: []
    };

    var isfirst = true;

    base.forEachStruct(msgobj.name, base.getGlobalObj(msgobj.name, root), root, function (staticname, scobj, root) {
        if (option.isclient) {
            if (scobj.name.name.indexOf('_') == 0) {
                return;
            }
        }

        if (!isfirst) {
            msg.funcparam += ', ';
        }

        isfirst = false;

        msg.funcparam += getCPPType_funcparam(scobj.type, root);
        msg.funcparam += ' ' + scobj.name.name;

        msg.member.push({name: scobj.name.name, type: scobj.type});
    });

    return msg;
}

function clientcpp_exportOnMsg(msgobj, root, callback, option) {
    var msg = {
        msgname: msgobj.name,
        rname: base.getRealMsgName(msgobj.name),
        comment: msgobj.comment,
        msgid: 'MSGID_RES_' + base.getRealMsgName(msgobj.name).toUpperCase(),
        member: []
    };

    base.forEachStruct(msgobj.name, base.getGlobalObj(msgobj.name, root), root, function (staticname, scobj, root) {
        if (option.isclient) {
            if (scobj.name.name.indexOf('_') == 0) {
                return;
            }
        }

        if (scobj.name.hasOwnProperty('data')) {
            //var cdobj = base.getMember(base.getGlobalObj(option.mainobj, root), scobj.name.data, root);
            //if (cdobj != undefined) {
            msg.member.push({name: scobj.name.name, type: scobj.type, data: scobj.name.data});
            //}
        }
    });

    return msg;
}

function clientcpp_getTemplate(projname, option) {
    return '/crystal/clientcpp.json';
}

exports.plugins_clientcpp = {
    exportTypedef: clientcpp_exportTypedef,
    exportEnum: clientcpp_exportEnum,
    exportStruct: clientcpp_exportStruct,
    exportStatic:clientcpp_exportStatic,
    exportMainObj: clientcpp_exportMainObj,
    exportCSVLoader: clientcpp_exportCSVLoader,
    exportSendMsg: clientcpp_exportSendMsg,
    exportOnMsg: clientcpp_exportOnMsg,
    getTemplate: clientcpp_getTemplate
};




// callback(isok, errinfo)
function servjs_exportTypedef(obj, root, callback, option) {
    return ;
}

// callback(isok, errinfo)
function servjs_exportEnum(obj, root, callback, option) {
    var enumobj = {name: obj.name, comment: obj.comment, member: []};
    var arr = [[], [], []];
    var arr1 = [[], [], []];

    for (var i = 0; i < obj.val.length; ++i) {
        arr[0].push('var ' + obj.val[i].name);
        arr[1].push('= ' + obj.val[i].val.val + ';');
        arr[2].push('//' + obj.val[i].comment);

        arr1[0].push('exports.' + obj.val[i].name);
        arr1[1].push('= ' + obj.val[i].name + ';');
        arr1[2].push('//' + obj.val[i].comment);

        enumobj.member.push({name: obj.val[i].name, val: obj.val[i].val.val, comment: obj.val[i].comment});
    }

    arrcode = code.alignCodeEx(arr, '');
    arr1code = code.alignCodeEx(arr1, '');
    for (var i = 0; i < arrcode.length; ++i) {
        enumobj.member[i].code = arrcode[i];
        enumobj.member[i].code1 = arr1code[i];
    }

    return enumobj;
}

// callback(isok, errinfo)
function servjs_exportStruct(obj, root, callback, option) {
    var structobj = {name: base.getNoUnderscoreName(obj.name), comment: obj.comment, member: []};
    var arr = [[], []];

    if (option.mainobj == obj.name) {
        return undefined;
    }

    base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        var curval = base.getMemberDefaultVal(obj, cobj, root);

        if (curval == undefined) {
            arr[0].push('this.' + base.getNoUnderscoreName(cobj.name.name) + ';');
        }
        else {
            arr[0].push('this.' + base.getNoUnderscoreName(cobj.name.name) + ' = ' + curval + ';');
        }
        arr[1].push('//' + cobj.comment);

        structobj.member.push({name: base.getNoUnderscoreName(cobj.name.name), val: curval, comment: cobj.comment});
    });

    arrcode = code.alignCodeEx(arr, '');
    for (var i = 0; i < arrcode.length; ++i) {
        structobj.member[i].code = arrcode[i];
    }

    return structobj;
}

// callback(isok, errinfo)
function servjs_exportStatic(obj, root, callback, option) {
    return ;
}

// callback(isok, errinfo)
function servjs_exportMainObj(obj, root, callback, option) {
    var mainobj = {name: base.getNoUnderscoreName(obj.name), comment: obj.comment, member: []};

    base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (option.isclient) {
            if (cobj.name.name.indexOf('_') == 0) {
                return ;
            }
        }

        mainobj.member.push({
            name: base.getNoUnderscoreName(cobj.name.name),
            type: cobj.type,
            code: 'exports.' + base.getNoUnderscoreName(cobj.name.name) + ' = ' + base.getNoUnderscoreName(cobj.name.name) + '; // ' + cobj.comment
        });
    });

    return mainobj;
}

function servjs_exportCSVLoader(memberobj, root, callback, option) {
    var csvloader = {
        name: memberobj.name.name,
        filename: base.getMemberName(memberobj.type) + '.json',
        keytype: base.getStructMemberType(memberobj.memberkey, memberobj.type, root),
        typename: base.getNoUnderscoreName(getCPPType(memberobj.type)),
        memberkey: memberobj.memberkey,
        comment: memberobj.comment,
        member: []
    };

    base.forEachStruct(memberobj.type, base.getGlobalObj(memberobj.type, root), root, function (staticname, scobj, root) {
        if (option.isclient) {
            if (scobj.name.name.indexOf('_') == 0) {
                return;
            }
        }

        var curmember = {name: scobj.name.name, code: ''};

        csvloader.member.push(curmember);
    });

    return csvloader;
}

function servjs_exportSendMsg(msgobj, root, callback, option) {
    var msg = {
        msgname: msgobj.name,
        rname: base.getRealMsgName(msgobj.name),
        comment: msgobj.comment,
        funcparam: '',
        msgid: 'MSGID_REQ_' + base.getRealMsgName(msgobj.name).toUpperCase(),
        member: []
    };

    var isfirst = true;

    base.forEachStruct(msgobj.name, base.getGlobalObj(msgobj.name, root), root, function (staticname, scobj, root) {
        if (option.isclient) {
            if (scobj.name.name.indexOf('_') == 0) {
                return;
            }
        }

        if (!isfirst) {
            msg.funcparam += ', ';
        }

        isfirst = false;

        msg.funcparam += getCPPType_funcparam(scobj.type, root);
        msg.funcparam += ' ' + scobj.name.name;

        msg.member.push({name: scobj.name.name, type: scobj.type});
    });

    return msg;
}

function servjs_exportOnMsg(msgobj, root, callback, option) {
    var msg = {
        msgname: msgobj.name,
        rname: base.getRealMsgName(msgobj.name),
        comment: msgobj.comment,
        msgid: 'MSGID_RES_' + base.getRealMsgName(msgobj.name).toUpperCase(),
        member: []
    };

    base.forEachStruct(msgobj.name, base.getGlobalObj(msgobj.name, root), root, function (staticname, scobj, root) {
        if (option.isclient) {
            if (scobj.name.name.indexOf('_') == 0) {
                return;
            }
        }

        if (scobj.name.hasOwnProperty('data')) {
            msg.member.push({name: scobj.name.name, type: scobj.type, data: scobj.name.data});
        }
    });

    return msg;
}

function servjs_getTemplate(projname, option) {
    return '/crystal/servjs.json';
}

exports.plugins_servjs = {
    exportTypedef: servjs_exportTypedef,
    exportEnum: servjs_exportEnum,
    exportStruct: servjs_exportStruct,
    exportStatic: servjs_exportStatic,
    exportMainObj: servjs_exportMainObj,
    exportCSVLoader: servjs_exportCSVLoader,
    exportSendMsg: servjs_exportSendMsg,
    exportOnMsg: servjs_exportOnMsg,
    getTemplate: servjs_getTemplate
};
