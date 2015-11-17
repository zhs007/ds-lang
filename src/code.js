/**
 * Created by zhs007 on 15/11/13.
 */

var base = require('./base');
var fs = require('fs');
var handlebars = require('handlebars');

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

function replaceStr(str) {
    while(str.indexOf('&lt;') >= 0) {
        str = str.replace('&lt;', '<');
    }

    while(str.indexOf('&gt;') >= 0) {
        str = str.replace('&gt;', '>');
    }

    while(str.indexOf('&quot;') >= 0) {
        str = str.replace('&quot;', '"');
    }

    while(str.indexOf('&#x3D;') >= 0) {
        str = str.replace('&#x3D;', '=');
    }

    return str;
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
        if (!fs.existsSync(projname)) {
            fs.mkdirSync(projname);
        }

        var tmparr = plugins.getTemplate(projname, option);
        if (tmparr != undefined) {
            var curparams = {projname_up: projname.toUpperCase(), projname: projname};

            //------------------------------------------------------------------------------------
            // typedef

            curparams.block_typedef = [];

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
                curparams.block_typedef = alignCodeEx(typedefarr, '');
            }

            //------------------------------------------------------------------------------------
            // enum

            curparams.block_enum = [];

            for (var i = 0; i < lstexport.length; ++i) {
                var obj = base.getGlobalObj(lstexport[i], root);
                if (obj != undefined) {
                    if (obj.type == 'enum') {
                        var enumobj = plugins.exportEnum(obj, root, callback, option);
                        if (enumobj != undefined) {
                            curparams.block_enum.push(enumobj);
                        }
                    }
                }
            }

            //------------------------------------------------------------------------------------
            // struct

            curparams.block_struct = [];
            curparams.csvloader = [];

            for (var i = 0; i < lstexport.length; ++i) {
                var obj = base.getGlobalObj(lstexport[i], root);
                if (obj != undefined) {
                    if (obj.name == objname) {
                        var mainobj = plugins.exportMainObj(obj, root, callback, option);
                        if (mainobj != undefined) {
                            curparams.mainobj = mainobj;
                        }

                        base.forEachStruct(obj.name, obj, root, function (structname, cobj, root) {
                            if (option.isclient) {
                                if (cobj.name.name.indexOf('_') == 0) {
                                    return;
                                }
                            }

                            if (base.isStatic(cobj.type, root)) {
                                var csvloader = plugins.exportCSVLoader(cobj, root, callback, option);
                                if (csvloader != undefined) {
                                    curparams.csvloader.push(csvloader);
                                }
                            }
                        });
                    }
                    else if (obj.type == 'struct') {
                        var structobj = plugins.exportStruct(obj, root, callback, option);
                        if (structobj != undefined) {
                            curparams.block_struct.push(structobj);
                        }
                    }
                    else if (obj.type == 'static') {
                        var structobj = plugins.exportStatic(obj, root, callback, option);
                        if (structobj != undefined) {
                            curparams.block_struct.push(structobj);
                        }
                    }
                }
            }

            for (var ti = 0; ti < tmparr.length; ++ti) {
                var curtemplate = handlebars.compile(tmparr[ti].buff);
                var strbuf = curtemplate(curparams);
                strbuf = replaceStr(strbuf);
                fs.writeFileSync(projname + '/' + tmparr[ti].filename, strbuf, 'utf-8');
            }
        }

        return tmparr;
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

function alignCodeEx(arr, beginstr) {
    var strarr = [];
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
        strarr.push('');

        strarr[i] += beginstr;

        for (var j = 0; j < arr.length; ++j) {
            strarr[i] += arr[j][i];

            if (j < arr.length - 1) {
                for (k = arr[j][i].length; k < lenarr[j] + 1; ++k) {
                    strarr[i] += ' ';
                }
            }
        }
    }

    return strarr;
}

exports.exportCode = exportCode;
exports.alignCode = alignCode;
exports.alignCodeEx = alignCodeEx;