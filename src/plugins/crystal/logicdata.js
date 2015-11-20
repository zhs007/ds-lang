// auto-write by dsl-crystal

"use strict";

var fs = require('fs');

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
// 服务器逻辑数据

{{#each mainobj.member}}
{{code}}
{{/each}}