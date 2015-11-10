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
0|-0|-[1-9]\d*\.\d*|[1-9]\d*\.\d*|-0\.\d*|0\.\d*|[1-9]\d*|-[1-9]\d*    return 'NUMBER'
[1-9]\d*|-[1-9]\d*    return 'NUMBER_INT'
-[1-9]\d*\.\d*|[1-9]\d*\.\d*|-0\.\d*|0\.\d*    return 'NUMBER_FLOAT'
[A-Z]+[_0-9a-zA-Z]* return 'WORD_TYPE'
[_a-z]+[_0-9a-zA-Z]* return 'WORD_VAR'
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
  typestr WORD_TYPE EQU statement SEMI {$$ = {type: $1.name, val: $4, name: $2}}
  |
  TYPEDEF typestr WORD_TYPE SEMI {$$ = {type: 'type', val: $2.name, name: $3}}
  |
  STRUCT WORD_TYPE SEMI {$$ = {type: 'struct', val: '', name: $2}}
  ;

typestr:
  TYPE_STRING {$$ = {type:'string', name: $1}}
  |
  TYPE_INT {$$ = {type:'int', name: $1}}
  |
  TYPE_TIME {$$ = {type:'time', name: $1}}
  |
  WORD_TYPE {$$ = {type:getVal($1), name: $1}}
  ;

codeblock:
  STRUCT WORD_TYPE LB structinfo RB SEMI {$$ = {type: 'struct', val: $4, name: $2}}
  |
  STATIC WORD_TYPE LB structinfo RB SEMI {$$ = {type: 'static', val: $4, name: $2}}
  |
  ENUM WORD_TYPE LB enuminfo RB SEMI {$$ = {type: 'enum', val: $4, name: $2}}
  ;

structinfo:
  structdefline SEMI COMMENTLINE {$1.comment = fixComment($3); $$ = [$1]}
  |
  structdefline SEMI COMMENTLINE structinfo {$1.comment = fixComment($3); $4.push($1); $$ = $4}
  ;

structdefline:
  typestr WORD_VAR {$$ = {type: $1.name, name: $2}}
  |
  typestr WORD_VAR EQU statement {$$ = {type: $1.name, name: $2, val: $4}}
  |
  PRIMARY typestr WORD_VAR {$$ = {type: $2.name, name: $3, type2: 'primary'}}
  |
  PRIMARY typestr WORD_VAR EQU statement {$$ = {type: $2.name, name: $3, val: $5, type2: 'primary'}}
  |
  PRIMARY0 typestr WORD_VAR {$$ = {type: $2.name, name: $3, type2: 'primary0'}}
  |
  PRIMARY0 typestr WORD_VAR EQU statement {$$ = {type: $2.name, name: $3, val: $5, type2: 'primary0'}}
  |
  PRIMARY1 typestr WORD_VAR {$$ = {type: $2.name, name: $3, type2: 'primary1'}}
  |
  PRIMARY1 typestr WORD_VAR EQU statement {$$ = {type: $2.name, name: $3, val: $5, type2: 'primary1'}}
  |
  INDEX typestr WORD_VAR {$$ = {type: $2.name, name: $3, type2: 'index'}}
  |
  INDEX typestr WORD_VAR EQU statement {$$ = {type: $2.name, name: $3, val: $5, type2: 'index'}}
  |
  UNQIUE typestr WORD_VAR {$$ = {type: $2.name, name: $3, type2: 'unique'}}
  |
  UNQIUE typestr WORD_VAR EQU statement {$$ = {type: $2.name, name: $3, val: $5, type2: 'unique'}}
  |
  EXPAND LP WORD_TYPE RP typestr WORD_VAR {$$ = {type: $5.name, name: $6, type2: 'expand', expand: $3}}
  |
  REPEATED typestr WORD_VAR {$$ = {type: $1.name, name: $2, type2: 'repeated'}}
  ;

enuminfo:
  enumdefline SEMI COMMENTLINE {$1.comment = fixComment($3); $$ = [$1]}
  |
  enumdefline SEMI COMMENTLINE enuminfo {$1.comment = fixComment($3); $4.push($1); $$ = $4}
  ;

enumdefline:
  WORD_TYPE EQU statement {$$ = {type: 'int', name: $1, val: $3}}
  ;

statement:
  AUTOINC {$$ = {type: 'int', name: $1, val: $1}}
  |
  NOW {$$ = {type: 'time', name: $1, val: $1}}
  |
  NULL {$$ = {type: $1, name: $1, val: $1}}
  |
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
  WORD_VAR {$$ = {type: getType($1), name: $1, val: getVal($1)}}
  |
  STRING {$$ = {type: 'string', name: $1, val: $1.slice(1, -1)}}
  |
  LP statement RP {$$ = {type: $2.type, name: '(' + $2.name + ')', val: $2.val}}
  ;
