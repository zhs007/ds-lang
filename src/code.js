/**
 * Created by zhs007 on 15/11/13.
 */

var base = require('./base');
var fs = require('fs');

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

function procStaticTable(objname, root, option) {
    var obj = base.getGlobalObj(objname, root);
    if (obj != undefined) {
        for (var i = 0; i < obj.val.length; ++i) {
            if (option.isclient) {
                if (obj.val[i].name.name.indexOf('_') == 0) {
                    continue ;
                }
            }

            if (base.isStatic(obj.val[i].type, root)) {
                obj.hasstatic = true;
            }
            else if (base.isStruct(obj.val[i].type, root)) {
                var cobj = procStaticTable(obj.val[i].type, root, option);
                if (cobj != undefined) {
                    if (cobj.hasOwnProperty('hasstatic') && cobj.hasstatic) {
                        obj.hasstatic = true;
                    }
                }
            }
        }
    }

    return obj;
}

// plugins = {exportHead: func, exportEnd: func, exportTypedef: func, exportEnum: func, exportStruct: func, exportStatic: func, getExportFile: func}
// callback(isok, errinfo)
function exportCode(projname, root, plugins, objname, callback, option) {
    if (option == undefined) {
        option = {isclient: false, mainobj: objname};
    }
    else {
        if (!option.hasOwnProperty('isclient')) {
            option.isclient = false;
        }

        option.mainobj = objname;
    }

    var lstexport = [];
    var obj = base.getGlobalObj(objname, root);
    if (obj != undefined) {
        lstexport = addExportObj(obj, root, lstexport, option);
    }

    procStaticTable(objname, root, option);

    if (plugins != undefined) {
        var filearr = plugins.getExportFile(projname, option);
        for (var fi = 0; fi < filearr.length; ++fi) {
            var curfile = filearr[fi];
            var str = '';

            str += plugins.exportHead(curfile, projname, option);

            str += '\r\n\r\n';

            var typedefarr = undefined;
            for (var i = 0; i < lstexport.length; ++i) {
                var obj = base.getGlobalObj(lstexport[i], root);
                if (obj != undefined) {
                    if (obj.type == 'type') {
                        var cs = plugins.exportTypedef(curfile, obj, root, callback, option);
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
                str += '\r\n';
            }

            for (var i = 0; i < lstexport.length; ++i) {
                var obj = base.getGlobalObj(lstexport[i], root);
                if (obj != undefined) {
                    if (obj.type == 'enum') {
                        var cs = plugins.exportEnum(curfile, obj, root, callback, option);
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
                        var cs = plugins.exportStruct(curfile, obj, root, callback, option);
                        if (cs != undefined) {
                            str += cs;
                            str += '\r\n';
                        }
                    }
                    else if (obj.type == 'static') {
                        var cs = plugins.exportStatic(curfile, obj, root, callback, option);
                        if (cs != undefined) {
                            str += cs;
                            str += '\r\n';
                        }
                    }
                }
            }

            str += '\r\n\r\n';

            var cs = plugins.exportEnd(curfile, projname, option);
            if (cs != undefined) {
                str += cs;
            }

            fs.writeFileSync(curfile.filename, str, 'utf-8');

            console.log(curfile.filename + ' OK!');
        }

        return filearr;
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