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
    }

    enumobj.member = code.alignCodeEx(arr, '');

    return enumobj;
}

// callback(isok, errinfo)
function clientcpp_exportStruct(obj, root, callback, option) {
    var structobj = {name: base.getNoUnderscoreName(obj.name), comment: obj.comment, member: []};
    var arr = [[], []];

    if (option.mainobj == obj.name) {
        return undefined;
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
    });

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
    });

    structobj.member = code.alignCodeEx(arr, '');

    return structobj;
}

// callback(isok, errinfo)
function clientcpp_exportMainObj(obj, root, callback, option) {
    var mainobj = {name: base.getNoUnderscoreName(obj.name), comment: obj.comment, member: []};
    var arr = [[], []];

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
    });

    mainobj.member = code.alignCodeEx(arr, '');

    return mainobj;
}

function clientcpp_exportCSVLoader(memberobj, root, callback, option) {
    var csvloader = {
        name: memberobj.name.name,
        filename: base.getMemberName(memberobj.type) + '.csv',
        keytype: base.getStructMemberType(memberobj.memberkey, memberobj.type, root),
        typename: base.getNoUnderscoreName(getCPPType(memberobj.type)),
        memberkey: memberobj.memberkey,
        member: []
    };

    base.forEachStruct(memberobj.type, base.getGlobalObj(memberobj.type, root), root, function (staticname, scobj, root) {
        if (option.isclient) {
            if (scobj.name.name.indexOf('_') == 0) {
                return;
            }
        }

        var scvt = base.getRealType(scobj.type, root);
        if (scvt == 'string') {
            csvloader.member.push('val.second.' + scobj.name.name + ' = csvloader.get("' + scobj.name.name + '", y);');
        }
        else {
            csvloader.member.push('val.second.' + scobj.name.name + ' = csvloader.get_int("' + scobj.name.name + '", y);');
        }
    });

    return csvloader;
}

function clientcpp_getTemplate(projname, option) {
    return [
        {filename: 'logicdata.h', buff: fs.readFileSync(path.join(__dirname, '/crystal/logicdata.h'), 'utf-8')},
        {filename: 'logicdata.cpp', buff: fs.readFileSync(path.join(__dirname, '/crystal/logicdata.cpp'), 'utf-8')},
        {filename: 'csvloader.h', buff: fs.readFileSync(path.join(__dirname, '/crystal/csvloader.h'), 'utf-8')},
        {filename: 'csvloader.cpp', buff: fs.readFileSync(path.join(__dirname, '/crystal/csvloader.cpp'), 'utf-8')},
        {filename: 'wsclient.h', buff: fs.readFileSync(path.join(__dirname, '/crystal/wsclient.h'), 'utf-8')},
        {filename: 'wsclient.cpp', buff: fs.readFileSync(path.join(__dirname, '/crystal/wsclient.cpp'), 'utf-8')},
        {filename: 'lockimp.h', buff: fs.readFileSync(path.join(__dirname, '/crystal/lockimp.h'), 'utf-8')},
        {filename: 'lockimp.cpp', buff: fs.readFileSync(path.join(__dirname, '/crystal/lockimp.cpp'), 'utf-8')}
    ];
}

exports.plugins_clientcpp = {
    exportTypedef: clientcpp_exportTypedef,
    exportEnum: clientcpp_exportEnum,
    exportStruct: clientcpp_exportStruct,
    exportStatic:clientcpp_exportStatic,
    exportMainObj: clientcpp_exportMainObj,
    exportCSVLoader: clientcpp_exportCSVLoader,
    getTemplate: clientcpp_getTemplate
};
