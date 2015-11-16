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
function clientcpp_h_exportHead(curfile, projname, option) {
    var str = '// auto-write by dsl-crystal\r\n\r\n';
    str += '#ifndef __CRYSTAL_LOGICDATA_' + projname.toUpperCase() + '_H_AUTO__\r\n';
    str += '#define __CRYSTAL_LOGICDATA_' + projname.toUpperCase() + '_H_AUTO__\r\n';

    str += '\r\n';

    str += '#include "string"\r\n';
    str += '#include "map"\r\n';

    return str;
}

// callback(isok, errinfo)
function clientcpp_h_exportEnd(curfile, projname, option) {
    var str = '#endif // __CRYSTAL_LOGICDATA_' + projname.toUpperCase() + '_H_AUTO__';

    return str;
}

// callback(isok, errinfo)
function clientcpp_h_exportTypedef(curfile, obj, root, callback, option) {
    var arr = ['typedef ' + obj.val + ' ' + obj.name + ';', '// ' + obj.comment];

    return arr;
}

// callback(isok, errinfo)
function clientcpp_h_exportEnum(curfile, obj, root, callback, option) {
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
function clientcpp_h_exportStruct(curfile, obj, root, callback, option) {
    var str = '// ' + obj.comment + ' \r\n';
    var arr = [[], []];

    if (option.mainobj == obj.name) {
        str += 'class ' + base.getNoUnderscoreName(obj.name) + '{ \r\n';

        str += 'public:\r\n';
        str += '\t// getSingleton\r\n';
        str += '\tstatic ' + base.getNoUnderscoreName(obj.name) + '& getSingleton();\r\n';
        str += 'public:\r\n';

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

        str += code.alignCode(arr, '\t');

        str += 'private:\r\n';
        str += '\t// construct\r\n';
        str += '\t' + base.getNoUnderscoreName(obj.name) + '();\r\n';

        str += '};\r\n';
    }
    else {
        str += 'struct ' + base.getNoUnderscoreName(obj.name) + '{ \r\n';

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

        str += code.alignCode(arr, '\t');

        str += '};\r\n';
    }

    return str;
}

// callback(isok, errinfo)
function clientcpp_h_exportStatic(curfile, obj, root, callback, option) {
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
function clientcpp_cpp_exportHead(curfile, projname, option) {
    var str = '// auto-write by dsl-crystal\r\n\r\n';
    str += '#include "' + projname + '.h"\r\n';
    str += '#include "CSVLoader.h"\r\n';

    return str;
}

// callback(isok, errinfo)
function clientcpp_cpp_exportEnd(curfile, projname, option) {
    return ;
}

// callback(isok, errinfo)
function clientcpp_cpp_exportTypedef(curfile, obj, root, callback, option) {
    return ;
}

// callback(isok, errinfo)
function clientcpp_cpp_exportEnum(curfile, obj, root, callback, option) {
    return ;
}

// callback(isok, errinfo)
function clientcpp_cpp_exportStruct(curfile, obj, root, callback, option) {
    if (option.mainobj == obj.name) {
        var str = '// ' + obj.comment + ' \r\n\r\n';

        str += '// getSingleton \r\n';
        str += base.getNoUnderscoreName(obj.name) + '& ' + base.getNoUnderscoreName(obj.name) + '::getSingleton()\r\n';
        str += '{\r\n';
        str += '\tstatic ' + base.getNoUnderscoreName(obj.name) + ' s_obj;\r\n';
        str += '\treturn s_obj;\r\n';
        str += '}\r\n';

        str += '// construct \r\n';
        str += base.getNoUnderscoreName(obj.name) + '::' + base.getNoUnderscoreName(obj.name) + '()\r\n';
        str += '{\r\n';

        base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
            if (option.isclient) {
                if (cobj.name.name.indexOf('_') == 0) {
                    return;
                }
            }

            if (cobj.hasOwnProperty('type2')) {
                if (cobj.type2 == 'repeated') {
                    return ;
                }
                else if(cobj.type2 == 'map') {
                    if (base.isStatic(cobj.type, root)) {
                        str += '\t// load csv ' + cobj.type + '\r\n';
                        str += '\t{\r\n';

                        str += '\t\tCSVLoader csvloader;\r\n';
                        str += '\t\tcsvloader.load("' + base.getMemberName(cobj.type) + '.csv");\r\n';
                        str += '\t\tfor (int y = 0; y < csvloader.getHeight(); ++y)\r\n';
                        str += '\t\t{\r\n';
                        str += '\t\t\tstd::pair<' + base.getStructMemberType(cobj.memberkey, cobj.type, root) + ', ' + base.getNoUnderscoreName(getCPPType(cobj.type)) + '> val;\r\n';

                        base.forEachStruct(cobj.type, base.getGlobalObj(cobj.type, root), root, function (staticname, scobj, root) {
                            if (option.isclient) {
                                if (scobj.name.name.indexOf('_') == 0) {
                                    return;
                                }
                            }

                            var scvt = base.getRealType(scobj.type, root);
                            if (scvt == 'string') {
                                str += '\t\t\tval.second.' + scobj.name.name + ' = csvloader.get("' + scobj.name.name + '", y);\r\n'
                            }
                            else {
                                str += '\t\t\tval.second.' + scobj.name.name + ' = csvloader.get_int("' + scobj.name.name + '", y);\r\n'
                            }
                        });

                        str += '\t\t\tval.first = val.second.' + cobj.memberkey + ';\r\n';

                        str += '\t\t\t' + cobj.name.name + '.insert(val);\r\n';

                        str += '\t\t}\r\n';

                        str += '\t}\r\n';
                    }

                    return ;
                }
            }
        });

        str += '}\r\n';

        return str;
    }

    return ;
}

// callback(isok, errinfo)
function clientcpp_cpp_exportStatic(curfile, obj, root, callback, option) {
    return ;
}

// callback(isok, errinfo)
function clientcpp_exportHead(curfile, projname, option) {
    if (curfile.tag == 'h') {
        return clientcpp_h_exportHead(curfile, projname, option);
    }
    else if (curfile.tag == 'cpp') {
        return clientcpp_cpp_exportHead(curfile, projname, option);
    }
}

// callback(isok, errinfo)
function clientcpp_exportEnd(curfile, projname, option) {
    if (curfile.tag == 'h') {
        return clientcpp_h_exportEnd(curfile, projname, option);
    }
    else if (curfile.tag == 'cpp') {
        return clientcpp_cpp_exportEnd(curfile, projname, option);
    }
}

// callback(isok, errinfo)
function clientcpp_exportTypedef(curfile, obj, root, callback, option) {
    if (curfile.tag == 'h') {
        return clientcpp_h_exportTypedef(curfile, obj, root, callback, option);
    }
    else if (curfile.tag == 'cpp') {
        return clientcpp_cpp_exportTypedef(curfile, obj, root, callback, option);
    }
}

// callback(isok, errinfo)
function clientcpp_exportEnum(curfile, obj, root, callback, option) {
    if (curfile.tag == 'h') {
        return clientcpp_h_exportEnum(curfile, obj, root, callback, option);
    }
    else if (curfile.tag == 'cpp') {
        return clientcpp_cpp_exportEnum(curfile, obj, root, callback, option);
    }
}

// callback(isok, errinfo)
function clientcpp_exportStruct(curfile, obj, root, callback, option) {
    if (curfile.tag == 'h') {
        return clientcpp_h_exportStruct(curfile, obj, root, callback, option);
    }
    else if (curfile.tag == 'cpp') {
        return clientcpp_cpp_exportStruct(curfile, obj, root, callback, option);
    }
}

// callback(isok, errinfo)
function clientcpp_exportStatic(curfile, obj, root, callback, option) {
    if (curfile.tag == 'h') {
        return clientcpp_h_exportStatic(curfile, obj, root, callback, option);
    }
    else if (curfile.tag == 'cpp') {
        return clientcpp_cpp_exportStatic(curfile, obj, root, callback, option);
    }
}

function clientcpp_getExportFile(projname, option) {
    return [
        {tag: 'h', filename: projname + '.h'},
        {tag: 'cpp', filename: projname + '.cpp'}
    ];
}

exports.plugins_clientcpp = {
    exportHead: clientcpp_exportHead,
    exportEnd: clientcpp_exportEnd,
    exportTypedef: clientcpp_exportTypedef,
    exportEnum: clientcpp_exportEnum,
    exportStruct: clientcpp_exportStruct,
    exportStatic:clientcpp_exportStatic,
    getExportFile: clientcpp_getExportFile
};
