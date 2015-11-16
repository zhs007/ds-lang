// auto-write by dsl-crystal

#include "logicdata.h"
#include "csvloader.h"

// 客户端数据

// getSingleton
static {{mainobj.name}}& {{mainobj.name}}::getSingleton()
{
    static {{mainobj.name}} s_obj;
    return s_obj;
}

// construct
{{mainobj.name}}::{{mainobj.name}}()
{
{{#each csvloader}}
    {
        // load {{filename}}
        CSVLoader csvloader;
        csvloader.load("{{filename}}");
        for (int y = 0; y < csvloader.getHeight(); ++y)
        {
            std::map<{{keytype}}, {{typename}}> val;
            {{#each member}}
            {{this}}
            {{/each}}
            val.first = val.second.{{memberkey}};
            {{name}}.insert(val);
        }
    }

{{/each}}
}



