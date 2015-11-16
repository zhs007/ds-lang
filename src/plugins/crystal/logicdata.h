// auto-write by dsl-crystal

#ifndef __{{projname_up}}_CRYSTAL_LOGICDATA_H__
#define __{{projname_up}}_CRYSTAL_LOGICDATA_H__

#include "string"
#include "map"

{{#if block_typedef}}
//-------------------------------------------------------------------
// 基本类型定义

{{#each block_typedef}}
{{this}}
{{/each}}
{{/if}}

{{#if block_enum}}
//-------------------------------------------------------------------
// 枚举定义

{{#each block_enum}}
// {{comment}}
enum {{name}}{
{{#each member}}
    {{this}}
{{/each}}
};

{{/each}}
{{/if}}

{{#if block_struct}}
//-------------------------------------------------------------------
// 结构定义

{{#each block_struct}}
// {{comment}}
struct {{name}}{
{{#each member}}
    {{this}}
{{/each}}
};

{{/each}}
{{/if}}

//-------------------------------------------------------------------
// 客户端逻辑数据

// 客户端数据
class {{mainobj.name}}{
public:
    // getSingleton
    static {{mainobj.name}}& getSingleton();
public:
{{#each mainobj.member}}
    {{this}}
{{/each}}
private:
    // construct
    {{mainobj.name}}();
};



#endif // __{{projname_up}}_CRYSTAL_LOGICDATA_H__