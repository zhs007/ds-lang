/**
 * Created by zhs007 on 15/11/13.
 */

var base = require('./base');

function addExportObj(obj, root, lstexport, option) {
    if (base.isBaseType(obj.type)) {
        return lstexport;
    }

    if (obj.type == 'type') {
        if (!base.isBaseType(obj.val)) {
            var curobj = base.getGlobalObj(obj.val);
            lstexport = addExportObj(curobj, root, lstexport);
        }
    }
    else if (obj.type == 'enum') {

    }
    else {
        for (var i = 0; i < obj.val.length; ++i) {
            if (!base.isBaseType(obj.val[i].type)) {
                if (option.isclient) {
                    if (obj.val[i].name.name.indexOf('_') == 0) {
                        continue ;
                    }
                }

                var curobj = base.getGlobalObj(obj.val[i].type, root);
                lstexport = addExportObj(curobj, root, lstexport, option);
            }
        }
    }

    if (lstexport.indexOf(obj.name) == -1) {
        lstexport.push(obj.name);
    }

    return lstexport;
}

// plugins = {exportTypedef: func, exportEnum: func, exportStruct: func, exportStatic:func}
// callback(isok, errinfo)
function exportCode(root, plugins, objname, callback, option) {
    if (option == undefined) {
        option = {isclient: false};
    }
    else {
        if (!option.hasOwnProperty('isclient')) {
            option.isclient = false;
        }
    }

    var lstexport = [];
    var obj = base.getGlobalObj(objname, root);
    if (obj != undefined) {
        lstexport = addExportObj(obj, root, lstexport, option);
    }

    if (plugins != undefined) {
        var str = '';
        var typedefarr = undefined;
        for (var i = 0; i < lstexport.length; ++i) {
            var obj = base.getGlobalObj(lstexport[i], root);
            if (obj != undefined) {
                if (obj.type == 'type') {
                    var cs = plugins.exportTypedef(obj, root, callback, option);
                    if (cs != undefined) {
                        if (typedefarr == undefined) {
                            typedefarr = [];
                            for (var ai = 0; ai < cs.length; ++ai) {
                                typedefarr.push([]);
                            }
                        }

                        for (var ai = 0; ai < cs.length; ++ai) {
                            typedefarr[ai].push(cs[ai]);
                        }
                    }
                }
            }
        }

        if (typedefarr != undefined) {
            str += alignCode(typedefarr, '');
        }

        str += '\r\n';

        for (var i = 0; i < lstexport.length; ++i) {
            var obj = base.getGlobalObj(lstexport[i], root);
            if (obj != undefined) {
                if (obj.type == 'enum') {
                    var cs = plugins.exportEnum(obj, root, callback, option);
                    if (cs != undefined) {
                        str += cs;
                        str += '\r\n';
                    }
                }
            }
        }

        for (var i = 0; i < lstexport.length; ++i) {
            var obj = base.getGlobalObj(lstexport[i], root);
            if (obj != undefined) {
                if (obj.type == 'struct') {
                    var cs = plugins.exportStruct(obj, root, callback, option);
                    if (cs != undefined) {
                        str += cs;
                        str += '\r\n';
                    }
                }
                else if (obj.type == 'static') {
                    var cs = plugins.exportStatic(obj, root, callback, option);
                    if (cs != undefined) {
                        str += cs;
                        str += '\r\n';
                    }
                }
            }
        }

        return str;
    }

    return undefined;
}

function alignCode(arr, beginstr) {
    var str = '';
    var lenarr = [];

    for (var i = 0; i < arr.length; ++i) {
        var cl = 0;
        for (var j = 0; j < arr[i].length; ++j) {
            if (cl < arr[i][j].length) {
                cl = arr[i][j].length;
            }
        }

        lenarr.push(cl);
    }

    for (var i = 0; i < arr[0].length; ++i) {
        str += beginstr;

        for (var j = 0; j < arr.length; ++j) {
            str += arr[j][i];

            if (j < arr.length - 1) {
                for (k = arr[j][i].length; k < lenarr[j] + 1; ++k) {
                    str += ' ';
                }
            }
        }

        str += '\r\n';
    }

    return str;
}

exports.exportCode = exportCode;
exports.alignCode = alignCode;