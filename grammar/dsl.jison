/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
\n|\r\n               /* skip whitespace */
\/\/[^\n]*            return "COMMENTLINE"
"+"                   return "PLUS"
"-"                   return "MINUS"
"*"                   return "MULTIPLE"
\/[^\/]               return "DIVIDE"
"("                   return "LP"
")"                   return "RP"
"="                   return "EQU"
";"                   return "SEMI"
"."                   return "PT"
"message"             return "MESSAGE"
"struct"              return "STRUCT"
"primary"             return "PRIMARY"
"primary0"            return "PRIMARY0"
"primary1"            return "PRIMARY1"
"expand"              return "EXPAND"
"repeated"            return "REPEATED"
"unique"              return "UNQIUE"
"index"               return "INDEX"
"AUTOINC"             return "AUTOINC"
"NOW"                 return "NOW"
"NULL"                return "NULL"
"static"              return "STATIC"
"enum"                return "ENUM"
"{"                   return "LB"
"}"                   return "RB"
"typedef"             return "TYPEDEF"
"string"              return "TYPE_STRING"
"int"                 return "TYPE_INT"
"time"                return "TYPE_TIME"
"bytes"               return "TYPE_BYTES"
"bool"                return "TYPE_BOOL"
"true"                return "BOOL_TRUE"
"false"               return "BOOL_FALSE"
0|-0|-[1-9]\d*\.\d*|[1-9]\d*\.\d*|-0\.\d*|0\.\d*|[1-9]\d*|-[1-9]\d*    return 'NUMBER'
[1-9]\d*|-[1-9]\d*    return 'NUMBER_INT'
-[1-9]\d*\.\d*|[1-9]\d*\.\d*|-0\.\d*|0\.\d*    return 'NUMBER_FLOAT'
[_a-zA-Z]+[_0-9a-zA-Z]* return 'WORD'
\"[^\"]*\"|\'[^\']*\' return 'STRING'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
  var mapval = {};

  function __onInit() {
    //console.log('_onInit()');
    mapval = {};
  }

  function addVal(o) {
    mapval[o.name] = o;

    return o;
  }

  function getVal(objname) {
    if (mapval.hasOwnProperty(objname)) {
      return mapval[objname].val;
    }

    return 0;
  }

  function getType(objname) {
    if (mapval.hasOwnProperty(objname)) {
      return mapval[objname].type;
    }

    return 'int';
  }

  function fixComment(comment) {
    return comment.slice(2).trim();
  }
%}

%start expressions

%% /* language grammar */

expressions
    : block EOF
        {
        return $1;
        }
    ;

block:
  blocknode {$$ = [$1]}
  |
  blocknode block {$2.push($1); $$ = $2}
  ;

blocknode:
  lineblock COMMENTLINE {addVal($1); $1.comment = fixComment($2); $$ = $1}
  |
  COMMENTLINE codeblock {$2.comment = fixComment($1); $$ = $2}
  ;

lineblock:
  typestr WORD EQU statementex SEMI {$$ = {type: $1.name, val: $4, name: $2}}
  |
  TYPEDEF typestr WORD SEMI {$$ = {type: 'type', val: $2.name, name: $3}}
  |
  STRUCT WORD SEMI {$$ = {type: 'struct', val: '', name: $2}}
  ;

typestr:
  TYPE_STRING {$$ = {type:'string', name: $1}}
  |
  TYPE_INT {$$ = {type:'int', name: $1}}
  |
  TYPE_TIME {$$ = {type:'time', name: $1}}
  |
  TYPE_BYTES {$$ = {type:'bytes', name: $1}}
  |
  TYPE_BOOL {$$ = {type:'bool', name: $1}}
  |
  WORD {$$ = {type:getVal($1), name: $1}}
  ;

codeblock:
  STRUCT WORD LB structinfo RB SEMI {$$ = {type: 'struct', val: $4, name: $2}}
  |
  STATIC WORD LB structinfo RB SEMI {$$ = {type: 'static', val: $4, name: $2}}
  |
  ENUM WORD LB enuminfo RB SEMI {$$ = {type: 'enum', val: $4, name: $2}}
  |
  MESSAGE WORD LB structinfo RB SEMI {$$ = {type: 'message', val: $4, name: $2}}
  ;

structinfo:
  structdefline SEMI COMMENTLINE {$1.comment = fixComment($3); $$ = [$1]}
  |
  structdefline SEMI COMMENTLINE structinfo {$1.comment = fixComment($3); $4.push($1); $$ = $4}
  ;

structdefline:
  typestr varname {$$ = {type: $1.name, name: $2}}
  |
  typestr LP WORD RP varname {$$ = {type: $1.name, name: $5, memberkey: $3}}
  |
  typestr varname EQU statementex {$$ = {type: $1.name, name: $2, val: $4}}
  |
  PRIMARY typestr varname {$$ = {type: $2.name, name: $3, type2: 'primary'}}
  |
  PRIMARY typestr varname EQU statementex {$$ = {type: $2.name, name: $3, val: $5, type2: 'primary'}}
  |
  PRIMARY0 typestr varname {$$ = {type: $2.name, name: $3, type2: 'primary0'}}
  |
  PRIMARY0 typestr varname EQU statementex {$$ = {type: $2.name, name: $3, val: $5, type2: 'primary0'}}
  |
  PRIMARY1 typestr varname {$$ = {type: $2.name, name: $3, type2: 'primary1'}}
  |
  PRIMARY1 typestr varname EQU statementex {$$ = {type: $2.name, name: $3, val: $5, type2: 'primary1'}}
  |
  INDEX typestr varname {$$ = {type: $2.name, name: $3, type2: 'index'}}
  |
  INDEX typestr varname EQU statementex {$$ = {type: $2.name, name: $3, val: $5, type2: 'index'}}
  |
  UNQIUE typestr varname {$$ = {type: $2.name, name: $3, type2: 'unique'}}
  |
  UNQIUE typestr varname EQU statementex {$$ = {type: $2.name, name: $3, val: $5, type2: 'unique'}}
  |
  EXPAND LP WORD RP typestr varname {$$ = {type: $5.name, name: $6, type2: 'expand', expand: $3}}
  |
  EXPAND typestr varname {$$ = {type: $2.name, name: $3, type2: 'expand'}}
  |
  REPEATED typestr varname {$$ = {type: $2.name, name: $3, type2: 'repeated'}}
  |
  REPEATED typestr LP WORD RP varname {$$ = {type: $2.name, name: $6, type2: 'repeated', memberkey: $4}}
  ;

varname:
  WORD {$$ = {name: $1}}
  |
  WORD LP dataval RP {$$ = {name: $1, data: $3}}
  ;

dataval:
  WORD {$$ = $1}
  |
  WORD PT dataval {$$ = $1 + '.' + $3}
  ;

enuminfo:
  enumdefline SEMI COMMENTLINE {$1.comment = fixComment($3); $$ = [$1]}
  |
  enumdefline SEMI COMMENTLINE enuminfo {$1.comment = fixComment($3); $4.push($1); $$ = $4}
  ;

enumdefline:
  WORD EQU statementex {$$ = {type: 'int', name: $1, val: $3}}
  ;

statementex:
  AUTOINC {$$ = {type: 'int', name: $1, val: $1}}
  |
  AUTOINC LP statement RP {$$ = {type: 'int', name: $1, val: $1, autoinc: $3.val}}
  |
  NOW {$$ = {type: 'time', name: $1, val: $1}}
  |
  NULL {$$ = {type: $1, name: $1, val: $1}}
  |
  BOOL_TRUE {$$ = {type: 'bool', name: $1, val: true}}
  |
  BOOL_FALSE {$$ = {type: 'bool', name: $1, val: false}}
  |
  statement {$$ = $1}
  ;

statement:
  term PLUS term {$$ = {type: $1.type, name: $1.name + ' + ' + $3.name, val: $1.val + $3.val}}
  |
  term MINUS term {$$ = {type: $1.type, name: $1.name + ' - ' + $3.name, val: $1.val - $3.val}}
  |
  term {$$ = $1}
  ;

term:
  factor MULTIPLE factor {$$ = {type: $1.type, name: $1.name + ' * ' + $3.name, val: $1.val * $3.val}}
  |
  factor DIVIDE factor {$$ = {type: $1.type, name: $1.name + ' / ' + $3.name, val: $1.val / $3.val}}
  |
  factor {$$ = $1}
  ;

factor:
  NUMBER {$$ = {type: 'int', name: $1, val: parseFloat($1)}}
  |
  WORD {$$ = {type: getType($1), name: $1, val: getVal($1)}}
  |
  STRING {$$ = {type: 'string', name: $1, val: $1.slice(1, -1)}}
  |
  LP statement RP {$$ = {type: $2.type, name: '(' + $2.name + ')', val: $2.val}}
  ;
