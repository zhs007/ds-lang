/**
 * Created by zhs007 on 15/11/14.
 */

var base = require('../base');
var code = require('../code');

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
    var str = '// ' + obj.comment + ' \r\n';
    var arr = [[], [], []];

    str += 'enum ' + obj.name + '{ \r\n';

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

    str += code.alignCode(arr, '\t');

    str += '};\r\n';

    return str;
}

// callback(isok, errinfo)
function clientcpp_exportStruct(obj, root, callback, option) {
    var str = '// ' + obj.comment + ' \r\n';
    var arr = [[], []];

    str += 'struct ' + base.getNoUnderscoreName(obj.name) + '{ \r\n';

    base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (option.isclient) {
            if (cobj.name.name.indexOf('_') == 0) {
                return ;
            }
        }

        arr[0].push(base.getNoUnderscoreName(getCPPType(cobj.type)) + ' ' + base.getNoUnderscoreName(cobj.name.name) + ';');
        arr[1].push('// ' + cobj.comment);
    });

    str += code.alignCode(arr, '\t');

    str += '};\r\n';

    return str;
}

// callback(isok, errinfo)
function clientcpp_exportStatic(obj, root, callback, option) {
    var str = '// ' + obj.comment + ' \r\n';
    var arr = [[], []];

    str += 'struct ' + base.getNoUnderscoreName(obj.name) + '{ \r\n';

    base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
        if (option.isclient) {
            if (cobj.name.name.indexOf('_') == 0) {
                return ;
            }
        }

        arr[0].push(base.getNoUnderscoreName(getCPPType(cobj.type)) + ' ' + base.getNoUnderscoreName(cobj.name.name) + ';');
        arr[1].push('// ' + cobj.comment);
    });

    str += code.alignCode(arr, '\t');

    str += '};\r\n';

    return str;
}

exports.plugins_clientcpp = {exportTypedef: clientcpp_exportTypedef, exportEnum: clientcpp_exportEnum, exportStruct: clientcpp_exportStruct, exportStatic:clientcpp_exportStatic};
