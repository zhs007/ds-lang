// auto-write by dsl-crystal

"use strict";

{{#if block_enum}}
//-------------------------------------------------------------------
// 枚举定义

{{#each block_enum}}
// {{comment}}
{{#each member}}
{{this}}
{{/each}}

{{/each}}
{{/if}}