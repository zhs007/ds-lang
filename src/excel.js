/**
 * Created by zhs007 on 15/11/9.
 */

var fs = require('fs');
var base = require('./base');
var xlsx = require('node-xlsx');

function exportStatic(path, obj, callback, root) {
    var arr = [];
    arr.push({name: obj.name, data: []});

    var comment = [];
    var head = [];

    base.forEachStruct(obj.name, obj, root, function (structname, memberobj, root) {
        comment.push(memberobj.comment);
        head.push(memberobj.name.name);
    });

    arr[0].data.push(comment);
    arr[0].data.push(head);

    var exceldata = xlsx.build(arr);
    fs.writeFileSync(path, exceldata, 'binary');
}

function exportExcel(path, obj, callback) {

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; ++i) {
            if (obj[i].type == 'static') {
                var fn = base.getMemberName(obj[i].name);

                exportStatic(path + '/' + fn + '.xlsx', obj[i], callback, obj);
            }
        }

        return ;
    }
}

exports.exportExcel = exportExcel;