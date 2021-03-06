# ds-lang
数据建模语言。

主要用于我们自己的工作流。

工作流
---
* **建模语言 [ds-lang](https://github.com/zhs007/ds-lang)** - 建模后，可以生成sql脚本、excel配置文件、protobuf文件。
* **excel配置文件导出工具 [xlsx2csv](https://github.com/zhs007/xlsx2csv)** - 填好excel配置文件后，我们可以将excel文件导出到csv，配合生成的代码，实现excel文件自动展开到内存中。

why
---
对于程序员来说，数据建模，最方便的还是写代码，定义一个struct，是最简单直接的了，而写sql语句之类的，甚至操作phpmyadmin，都是一件很麻烦的事情，更何况，操作完phpmyadmin以后，还是要写一遍struct，甚至还要写中间代码，这部分工作几乎是重复劳动。

为什么不能写一个struct，就把数据库建好，然后把各种代码自动生成出来呢？

不管是mysql，还是redis，甚至是既有mysql持久化又有redis缓存，其实数据建模本身几乎是无差异的。

上面就是这个建模语言的初衷。

其实有了建模数据以后，我们还可以用这个数据做很多自动化编码的工作，省时省事而且降低人为编码的错误率。

进一步来说，我们还会有一系列的工具，做更多的自动化可视化流程，可以影响到策划、美术、测试、运营等等。

我们需要的只是一些更好读的中间数据，而ds-lang做的仅仅是更方便的产生这一批好读的中间数据。

更新说明
---
* **0.6.6**
 * 增加 **float** 的支持。但是，考虑到浮点数的精确性问题，不建议使用浮点数，不到必要时刻，建议使用整数最后程序里面作为万分数来使用。

* **0.6.3**
 * 增加 **--ver** 参数，查看版本号。
 * 增加对文件是否存在的检查。

* **0.6.2**
 * 增加 **VER** 的宏，必须要声明，采用 **1512280** 的格式，其中前面6位是年月日，最后一位是今日的版本号，也就是一天最多只能有10个有效版本。
 * **excel导出** 时，会兼容老版本。
 * 增加 **DELETE** 关键字，前置删除属性用。

* **0.6.1**
 * 导出的**excel**表格里，会在**tab页**里加入**枚举表**，方便编辑查阅。

* **0.6.0**
 * 将内核部分独立成一个新项目 **[dsl-core](https://github.com/zhs007/dsl-core)** 。

* **0.5.2**
 * 使用**[handlebars](https://github.com/wycats/handlebars.js/)**重构代码生成部分。
 * 支持crystal导出NodeJS服务端代码。
 * 支持枚举直接做默认值。
 * 修正展开子结构时没有考虑下划线的bug。

* **0.5.1**
 * 代码生成时，对齐代码。
 * 调整了代码生成器插件的部分接口。
 * 支持crystal框架的代码生成。
 * 代码生成插件支持多文件的生成。
 * 支持crystal导出C++客户端代码。

* **0.5.0**
 * 加入代码生成功能。
 * 规范了后续代码生成插件的制作方式。

* **0.3.2**
 * 对重名做了更严格的检查，下划线开头不能算一个单独的名字。
 * 增加 **map** 关键字，主要用于数据管理层。

* **0.3.1**
 * 对消息协议进一步支持。
 * 支持导出**protobuf**。
 * 增加关键字**bytes**，表示二进制数据流类型。
 * 增加关键字**bool**，表示bool类型。
 * 增加关键字**true**和**false**。

* **0.3.0**
 * 增加**message**关键字，用来处理消息协议。
 * 增加**struct**名字前加下划线，不单独为数据库建表的约定。
 * 增加对普通结构体成员**expand**的语法支持，就是直接展开子结构体，而少一层查找关系，一定程度上可以用来实现类继承的设计。
 * 增加设置**AUTOINC**的初值。

 ```
	primary PlayerID pid = AUTOINC(10000);		// 角色唯一标识，10000开始
``` 

* **0.2.5**
 * 调整解析顺序，改成和输入顺序一致。
 * 修正输出excel文件时重复创建目录失败的bug。
 * 增加对静态表枚举展开(**expand**)的支持（暂不支持动态表的枚举展开）。
 * 增加结构内数组主索引字段的语法支持。

 ```
repeated PlayerGameInfo(pid) _gameinfo;	// 游戏信息
```

 * 修正小bug若干。

* **0.2.4**
 * 增强语法检验。
 * 增加命令行参数**--sql**，能直接输出sql语句。
 * 增加命令行参数**--excel**，能将**static**表导出成excel文件。

* **0.2.3**
 * 修正npm发布项目的bug，**package.json**文件需要**latest**属性。

* **0.2.2**
 * 修正命令行工具的bug。

* **0.2.1**
 * 增加 NULL 关键字，用于结构属性，表示该属性可以没有值。
 * 明确了基本默认值。

* **0.2.0**
 * 增加对结构声明的语法支持。

 ```
struct MAGInfo;		// MAG磁力下载站
```

 * 完善注释的解析，去掉了前后无意义字符（whitespace）。
 * 增加命名规范的支持。
 * 增加 unique 关键字，用于唯一且不是主键的索引。
 * 增加 AUTOINC 关键字，用于结构中，主键的默认值。
 * 增加 NOW 关键字，用于结构中，时间属性的默认值。

* **0.1.0**
 * 制定基本的语法规则。
 * 解析器。

语法
---
第一次构建一种语言，非常的没有经验，基本上是按照类C语法做的，部分参考google的protobuf，在使用方面，更多的借鉴动态语言，譬如结构默认值就是直接写在结构里了。

原则上，是**强类型**、**强注释**、**强编码规范**的，语法符合大部分人的编码习惯，不反人类。

* **强类型** - 每个对象或变量都是先给定类型的，也鼓励大家用typedef定义新的类型，譬如把ID和int分开（其实本质上ID也就是int）。

 ```
typedef int ID;	// 定义ID类型，实际上是int
```

* **强注释** - 必须有注释，否则编译不过。因为这是一个建模语言，基本上每个结构每个属性都应该有注释，一定要让人看明白。

* **强编码规范** - 在语言层面强化编码规范，譬如golang这样的，我个人是认同这个方案的。一些最基本的东西需要遵循一定的规范，遵循规范的同时，其实可以带来一些编码的畅快感（少输入）。

基本语法：

* **typedef** - 类型重定向，也就是C里面的typedef。
* **struct** - 结构体，类似C的struct定义，唯一的差别就是支持默认值，直接在声明里写就可以了。
* **static** - 静态结构体定义，类struct，只是明确的表示，这是一个静态配置表。
* **enum** - 枚举，枚举其实是一组常量的集合，语法上和C有些不同。枚举必须大写，而且枚举内容必须是大写枚举加下划线开头，而且枚举是以分号分隔的，每一行定义必须显示的写好对应int值。枚举的值是可以在后面直接使用的。

 ```
// 英雄属性枚举
enum HEROATTR{
	HEROATTR_VIT = 0;	// 体力 - vitality
	HEROATTR_STA = 1;	// 耐力 - stamina
	HEROATTR_STR = 2;	// 力量 - strength
	HEROATTR_INT = 3;	// 智力 - intelligence
	HEROATTR_DEX = 4;	// 敏捷 - dexterity
	HEROATTR_CRIT = 5;	// 暴击 - critical		
	HEROATTR_PARR = 6;	// 格挡 - parry
	HEROATTR_HIT = 7;	// 命中 - hit
	HEROATTR_MISS = 8;	// 闪避 - miss
};
```

* **全局变量** - 任何定义在结构体和静态表之外的单独变量都是全局变量。全局变量必须由大写字母、下划线、数字组成，且必须以大写字母打头。
* **结构声明** - 可以在结构体定义以前，声明一个结构体，主要用于A依赖B，B依赖A的情况。

 ```
struct MAGInfo;		// MAG磁力下载站
```

 > **注意：**结构声明的注释如果和后面定义的不一样，会拿定义的注释覆盖注释。

* **结构属性前缀** - 对于结构体来说，有一组简单的前缀，可以方便后续工作流的更好工作。
 * **primary** - 主键，也就是这个结构体的唯一标识，如果最后会选择sql数据库落地的话，这个也就是数据库的主键了。
 * **联合主键** - primary0、primary1，也就是多个主键一起构成联合主键。
 * **index** - 索引，逻辑上，可能会需要根据该属性做查找工作，在数据库里也就是要为他建索引。
 * **unique** - 唯一的索引，是一个全局唯一的索引。
 * **枚举展开** - 会有很多时候，我们需要一个特定意义的数组，每个单元是一个特殊含义（也就是有一个枚举做数组下标）。我们可以通过一个简单的前缀做到这点。

 ```
expand(HEROATTR) int heroattr;		// 英雄属性数组，根据HEROATTR展开
```

 * **数组** - 类似protobuf的数组。

 ```
repeated HeroInfo lsthero;			// 英雄列表
```

 * **单根树状数组** - 在游戏里，存在着大量的单根树状结构，譬如一个角色带着一堆宝宝，每个宝宝身上都还有一堆装备，每件装备上还有一堆宝石等，这种单根树状结构会自动被正确识别上层主键加载。

 ```
	repeated PlayerGameInfo(pid) _gameinfo;	// 游戏信息
```

* **结构属性默认值** - 结构属性可以给一个默认值。
 * **基本默认值** - 基本类型都有一个基本的默认值，如果整数类的，默认值是0，字符串则是一个空字符串。
 * **常量默认值** - 就是一个常量，或者前面已经定义好的枚举值，如果是数值型的，可以有四则运算。
 * **默认没有值** - 主要也是数据库用的，默认该属性没有值，用 NULL 来表示。当前版本下，内存中是一定有值的，也就是基本默认值。
 * **自增长整数** - 数据库常用的，我们可以用 AUTOINC 来表示。这个只能用于主键。

 ```
	primary PlayerID pid = AUTOINC;		// 角色唯一标识
``` 

 * **当前时间** - 也是数据库常用的，我们可以用 NOW 来表示。一般来说，数据库只允许一列用这个属性，而我们不存在这种要求。

 ```
	time regtime = NOW;					// 注册时间
	time lastlogintime = NOW;			// 最后一次登录时间
```

* **通信协议** - 通信协议是很重要的一部分内容，通信协议是message，成员变量的定义方式基本上和struct一样。
 * **通信协议的基本概念** - 一般来说，通信协议分为2部分，一个是通信协议标识，我们定义为MsgID，另外一个是通信协议结构定义，也就是我们的message定义。
 * **自动生成MsgID** - 只要按照我们的命名规范来定义协议，我们就可以自动生成MsgID，并保证全局唯一易于维护更新方便。
 * **协议的命名** - 客户端发出的协议必须以 **Req_** 开头，服务器发出的协议必须以 **Res_** 开头。这样命名以后，会自动生成2组MsgID。
 * **控制MsgID的区间** - 我们可以重载全局变量 **REQ_MSGID_BEGIN** 和 **RES_MSGID_BEGIN** 来重新定义服务器和客户端的消息起点，默认是10000和20000开始排列。
 * **重载MsgID类型** - 默认的**MsgID**是**int**的，我们也可以重载**MsgID**类型。

* **命名规范** - 命名有一定的要求。
 * **枚举类型命名** - 枚举名只能是大写字母和下划线，且不能以下划线开头。
 * **枚举值命名** - 枚举值一定是枚举类型名加下划线开头。
 * **类型命名** - 类型命名一定是大写字母开头。
 * **类型属性命名** - 类型属性一定是小写字母或者下划线开头。
 * **客户端不需要看到的属性** - 类型属性中，如果有部分属性是客户端不需要看到的，下划线开头。
 * **全局变量命名** - 全局变量一定由大写字母和下划线组成，且不能由下划线开头。
 * **下划线开头的名字** - 下划线开头的名字有特殊的意义，因此2个名字如果一个下划线开头，一个没有下划线开头的，算重名处理。

基本变量类型：

* **int** - 整数，32位整数，有符号
* **int64** - 64位整数，有符号
* **time** - 时间戳，32位，最大到2038年
* **float** - 浮点数，32位
* **string** - 字符串，一般来说，不建议超过256字符
* **info** - 长字符串
* **bytes** - 二进制数据流
* **bool** - bool类型，只有2个值，就是 **true** 和 **false**

例子：

```

int MAX_LEVEL = 80;			// 最大等级

typedef int HeroExpType;	// 英雄经验类型

// 英雄属性枚举，枚举必须大写，而且枚举内容必须是大写枚举加下划线开头
enum HEROATTR{
	HEROATTR_VIT = 0;	// 体力 - vitality
	HEROATTR_STA = 1;	// 耐力 - stamina
	HEROATTR_STR = 2;	// 力量 - strength
	HEROATTR_INT = 3;	// 智力 - intelligence
	HEROATTR_DEX = 4;	// 敏捷 - dexterity
	HEROATTR_CRIT = 5;	// 暴击 - critical		
	HEROATTR_PARR = 6;	// 格挡 - parry
	HEROATTR_HIT = 7;	// 命中 - hit
	HEROATTR_MISS = 8;	// 闪避 - miss
};

// 英雄技能枚举
enum HEROSKILL{
	HEROSKILL_SKILLID1 = 0;		// 普通技能1
	HEROSKILL_SKILLID2 = 1;		// 普通技能2
	HEROSKILL_SKILLID3 = 2;		// 普通技能3
	
	HEROSKILL_BSKILLID1 = 3;	// 条件技能1
	HEROSKILL_BSKILLID2 = 4;	// 条件技能2
	
	HEROSKILL_MSKILLID1 = 5;	// 主动技能1
};

// 玩家经验表
static PlayerExp{
	primary int playerlevel;	// 玩家等级
	
	index int totalplayerexp;	// 玩家当前等级需要的总经验（不算当前等级需要的经验）
	
	int playerexp;				// 玩家当前等级升级需要的经验
};

// 英雄经验表
static HeroExp{
	primary0 HeroExpType heroexptype;	// 英雄经验类型
	primary1 int herolevel;				// 英雄等级
	
	index int totalheroexp;				// 英雄当前等级需要的总经验（不算当前等级需要的经验）
	
	int heroexp;						// 英雄当前等级升级需要的经验
};

// 英雄基本配置表
static HeroBase{
	primary int heroid;					// 英雄唯一标识
	
	HeroExpType heroexptype;			// 英雄经验类型
	
	expand(HEROATTR) int heroattr;		// 英雄属性数组，根据HEROATTR展开
	expand(HEROSKILL) int heroskill;	// 英雄属性数组，根据HEROSKILL展开
};

// 英雄装备信息
struct HeroEquInfo{
	primary int equid;					// 装备唯一标识
};

// 英雄信息
struct HeroInfo{
	primary int heroid;					// 英雄唯一标识
	
	int herolevel;						// 英雄等级
	int heroexp;						// 英雄当前经验
	
	expand(HEROATTR) int heroattr;		// 英雄属性数组，根据HEROATTR展开
	expand(HEROSKILL) int heroskill;	// 英雄属性数组，根据HEROSKILL展开
	
	repeated HeroEquInfo lstequ;		// 英雄列表
};

// 角色基本信息
struct PlayerInfo{
	primary int pid;					// 角色唯一标识
	
	string name;						// 角色名
	time regtime;						// 注册时间
	time lastlogintime;					// 最后一次登录时间
	
	int playerlevel;					// 角色等级
	int playerexp;						// 角色经验
	
	int gold;							// 金币
	int gem;							// 钻石	
	
	repeated HeroInfo lsthero;			// 英雄列表
};

```

数据类型
---
由于ds-lang支持**typedef**，所以可以根据类型建立起数据之间的联系。

为了更方便的自动建立各模块之间的联系，多用**typedef**吧。

```
typedef int PlayerID;		// 玩家ID类型
typedef int RoomID;			// 房间ID类型
typedef int Gem;			// 钻石类型
typedef int Gold;			// 金币类型
typedef int PlayerLevel;	// 玩家等级类型
typedef int PlayerExp;		// 玩家经验类型
```

自动生成代码
---
我们的自动代码生成是插件方式的，其实就是根据生成的json文件来做代码生成。这里我们提供了我们项目的几种方式，你也可以根据你自己项目需要来实现适合你们项目的代码生成插件。

* **HeyServ 框架** - 服务器是基于**PHP**的，**HTTP**短连接，客户端有一套**Cocos2d**的实现，包含**c++**和**lua**。
* **Crystal 框架** - 服务器基于**Nodejs**的分布式服务器框架，**WebSocket**长连接，客户端也有一套**Cocos2d**的实现，包含**c++**和**lua**。

数据存储级别
---
我们定义数据存储级别为```DB -> CACHE -> SERVICE -> CLIENT```4个级别，我们认为SERVICE的数据是最完整的。

下划线打头的结构成员是不同步到客户端的。

下划线打头的结构体是不生成独立的表或记录的。

自动的ID排布和版本管理
---
ds-lang为了简化编码，大量的使用了自动的ID排布，譬如message和MSGID的自动生成。这样自动的ID排布，最大的问题就在版本同步上了，那我们应该怎样做版本管理呢？

前面也说过ds-lang只是我们工作流的一部分，我们有一整套提交比对机制，保证版本同步，后续的工具也会逐步开放给大家的，譬如修改了数据建模，会自动生成差异化的sql脚本，供你同步sql数据库，也会主动修改excel文件内容，增减列。

> 注：理论上我们是不建议做删除数据的操作的，不能确定这一定是个合适的操作，所以后续版本会增加 DELETE 前缀。还会提供一个强制清理的命令，一次性清理所有不要的数据。

jison
---
grammar目录内的dsl.jison文件就是jison的语法文件，可以通过命令行命令生成出dsl.js文件。

```
jison dsl.jison
```

但是，为了能多次使用解释器，我们还加了一个初始化接口，最好在dsl.js文件里面显示的调用一下。

```
parse: function parse(input) {
    __onInit();
```

至于jison的安装，可以参考[jison](https://github.com/zaach/jison)相关文档。

如果对jison语法有兴趣，也可以看看我的另外一个项目[jison-demo](https://github.com/zhs007/jison-demo)，这里面有一些基础的例子，基本上ds-lang就是基于这些例子完善起来的。

二次开发
---
ds-lang的二次开发有2种方式：

1. ds-lang是用jison生成的建模语言，相关的命令行工具和语法文件都是开源的，可以直接修改工具和语法文件获得新的支持。
2. ds-lang会生成一个json格式文件，这个文件其实是非常好读的，也可以基于这个输出文件做后续的二次开发。

如果你有更好的想法，也可以和我们联系。

使用到的第三方库
---

* 使用**[jison](https://github.com/zaach/jison)**做语法分析。
* 使用**[yargs](https://github.com/bcoe/yargs)**模块简化命令行工具的开发。
* 使用**[node-xlsx](https://github.com/mgcrea/node-xlsx)**模块生成xlsx文件。
* 使用**[handlebars](https://github.com/wycats/handlebars.js/)**模板做基本代码模板。