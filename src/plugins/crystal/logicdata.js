// auto-write by dsl-crystal

"use strict";

var fs = require('fs');
var dbmgr = require('../base/dbmgr');

{{#if block_enum}}
//-------------------------------------------------------------------
// 枚举定义

{{#each block_enum}}
// {{comment}}
{{#each member}}
{{code}}
{{/each}}

{{#each member}}
{{code1}}
{{/each}}

{{/each}}
{{/if}}

//-------------------------------------------------------------------
// 静态表

{{#each csvloader}}
// {{comment}}
{
	var {{name}};
	let ct = JSON.parse(fs.readFileSync('json/{{filename}}', 'utf-8'));
	for (let ii = 0; ii < ct.length; ++ii) {
		{{name}}[ct[ii].{{memberkey}}] = ct[ii];
	}
}

{{/each}}

//-------------------------------------------------------------------
// 动态对象

{{#each block_struct}}
// {{comment}}
class {{name}} {
	// 构造函数
	constructor() {
		{{#each member}}
    	{{code}}
		{{/each}}
	}

{{#if indb}}

	// 读取数据库
	loaddb() {
		let dbclient = dbmgr.getDBClient('slots');
		let sql = util.format("select pid, name, adminkey, gem, gold, lockgem, playerlevel, playerexp, UNIX_TIMESTAMP(regtime) as regtime, UNIX_TIMESTAMP(lastlogintime) as lastlogintime from playerinfo where pid = %d", pid);
		{{#each inmsg}}
		msg.{{name}} = this.{{name}}; // {{comment}}
		{{/each}}
		return msg;
	}

	// 写入数据库
	savedb()
	{
		{{#each inmsg}}
		this.{{name}} = msg.{{name}}; // {{comment}}
		{{/each}}
	}
{{/if}}
{{#if inmsg}}

	// 返回消息
	tomsg() {
		let msg = {};
		{{#each inmsg}}
		msg.{{name}} = this.{{name}}; // {{comment}}
		{{/each}}
		return msg;
	}

	// 从消息赋值
	frommsg(msg) {
		{{#each inmsg}}
		this.{{name}} = msg.{{name}}; // {{comment}}
		{{/each}}
	}
{{/if}}
};

{{/each}}

//-------------------------------------------------------------------
// 服务器逻辑数据

{{#each mainobj.member}}
{{code}}
{{/each}}