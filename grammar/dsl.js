/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,12],$V2=[1,7],$V3=[1,8],$V4=[1,9],$V5=[1,10],$V6=[1,11],$V7=[11,27],$V8=[5,8,11,15,16,17,18,19],$V9=[1,39],$Va=[1,41],$Vb=[1,33],$Vc=[1,34],$Vd=[1,35],$Ve=[1,38],$Vf=[1,40],$Vg=[1,46],$Vh=[1,47],$Vi=[1,48],$Vj=[1,49],$Vk=[1,50],$Vl=[1,51],$Vm=[1,52],$Vn=[1,56],$Vo=[14,35],$Vp=[14,35,42,43],$Vq=[14,35,42,43,45,46];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"block":4,"EOF":5,"blocknode":6,"lineblock":7,"COMMENTLINE":8,"codeblock":9,"typestr":10,"WORD_TYPE":11,"EQU":12,"statement":13,"SEMI":14,"TYPEDEF":15,"STRUCT":16,"TYPE_STRING":17,"TYPE_INT":18,"TYPE_TIME":19,"LB":20,"structinfo":21,"RB":22,"STATIC":23,"ENUM":24,"enuminfo":25,"structdefline":26,"WORD_VAR":27,"PRIMARY":28,"PRIMARY0":29,"PRIMARY1":30,"INDEX":31,"UNQIUE":32,"EXPAND":33,"LP":34,"RP":35,"REPEATED":36,"enumdefline":37,"AUTOINC":38,"NOW":39,"NULL":40,"term":41,"PLUS":42,"MINUS":43,"factor":44,"MULTIPLE":45,"DIVIDE":46,"NUMBER":47,"STRING":48,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"COMMENTLINE",11:"WORD_TYPE",12:"EQU",14:"SEMI",15:"TYPEDEF",16:"STRUCT",17:"TYPE_STRING",18:"TYPE_INT",19:"TYPE_TIME",20:"LB",22:"RB",23:"STATIC",24:"ENUM",27:"WORD_VAR",28:"PRIMARY",29:"PRIMARY0",30:"PRIMARY1",31:"INDEX",32:"UNQIUE",33:"EXPAND",34:"LP",35:"RP",36:"REPEATED",38:"AUTOINC",39:"NOW",40:"NULL",42:"PLUS",43:"MINUS",45:"MULTIPLE",46:"DIVIDE",47:"NUMBER",48:"STRING"},
productions_: [0,[3,2],[4,1],[4,2],[6,2],[6,2],[7,5],[7,4],[7,3],[10,1],[10,1],[10,1],[10,1],[9,6],[9,6],[9,6],[21,3],[21,4],[26,2],[26,4],[26,3],[26,5],[26,3],[26,5],[26,3],[26,5],[26,3],[26,5],[26,3],[26,5],[26,6],[26,3],[25,3],[25,4],[37,3],[13,1],[13,1],[13,1],[13,3],[13,3],[13,1],[41,3],[41,3],[41,1],[44,1],[44,1],[44,1],[44,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

        return $$[$0-1];
        
break;
case 2:
this.$ = [$$[$0]]
break;
case 3:
$$[$0].push($$[$0-1]); this.$ = $$[$0]
break;
case 4:
addVal($$[$0-1]); $$[$0-1].comment = fixComment($$[$0]); this.$ = $$[$0-1]
break;
case 5:
$$[$0].comment = fixComment($$[$0-1]); this.$ = $$[$0]
break;
case 6:
this.$ = {type: $$[$0-4].name, val: $$[$0-1], name: $$[$0-3]}
break;
case 7:
this.$ = {type: 'type', val: $$[$0-2].name, name: $$[$0-1]}
break;
case 8:
this.$ = {type: 'struct', val: '', name: $$[$0-1]}
break;
case 9:
this.$ = {type:'string', name: $$[$0]}
break;
case 10:
this.$ = {type:'int', name: $$[$0]}
break;
case 11:
this.$ = {type:'time', name: $$[$0]}
break;
case 12:
this.$ = {type:getVal($$[$0]), name: $$[$0]}
break;
case 13:
this.$ = {type: 'struct', val: $$[$0-2], name: $$[$0-4]}
break;
case 14:
this.$ = {type: 'static', val: $$[$0-2], name: $$[$0-4]}
break;
case 15:
this.$ = {type: 'enum', val: $$[$0-2], name: $$[$0-4]}
break;
case 16: case 32:
$$[$0-2].comment = fixComment($$[$0]); this.$ = [$$[$0-2]]
break;
case 17: case 33:
$$[$0-3].comment = fixComment($$[$0-1]); $$[$0].push($$[$0-3]); this.$ = $$[$0]
break;
case 18:
this.$ = {type: $$[$0-1].val, name: $$[$0], val: 0}
break;
case 19:
this.$ = {type: $$[$0-3].val, name: $$[$0-2], val: $$[$0]}
break;
case 20:
this.$ = {type: $$[$0-1].val, name: $$[$0], val: 0, type2: 'primary'}
break;
case 21:
this.$ = {type: $$[$0-3].val, name: $$[$0-2], val: $$[$0], type2: 'primary'}
break;
case 22:
this.$ = {type: $$[$0-1].val, name: $$[$0], val: 0, type2: 'primary0'}
break;
case 23:
this.$ = {type: $$[$0-3].val, name: $$[$0-2], val: $$[$0], type2: 'primary0'}
break;
case 24:
this.$ = {type: $$[$0-1].val, name: $$[$0], val: 0, type2: 'primary1'}
break;
case 25:
this.$ = {type: $$[$0-3].val, name: $$[$0-2], val: $$[$0], type2: 'primary1'}
break;
case 26:
this.$ = {type: $$[$0-1].val, name: $$[$0], val: 0, type2: 'index'}
break;
case 27:
this.$ = {type: $$[$0-3].val, name: $$[$0-2], val: $$[$0], type2: 'index'}
break;
case 28:
this.$ = {type: $$[$0-1].val, name: $$[$0], val: 0, type2: 'unique'}
break;
case 29:
this.$ = {type: $$[$0-3].val, name: $$[$0-2], val: $$[$0], type2: 'unique'}
break;
case 30:
this.$ = {type: $$[$0-1].val, name: $$[$0], val: 0, type2: 'expand', expand: $$[$0-3]}
break;
case 31:
this.$ = {type: $$[$0-2].val, name: $$[$0-1], val: 0, type2: 'repeated'}
break;
case 34:
this.$ = {type: 'int', name: $$[$0-2], val: $$[$0]}
break;
case 35: case 36: case 37:
this.$ = {type: $$[$0], name: $$[$0], val: $$[$0]}
break;
case 38:
this.$ = {type: $$[$0-2].type, name: $$[$0-2].name + ' + ' + $$[$0].name, val: $$[$0-2].val + $$[$0].val}
break;
case 39:
this.$ = {type: $$[$0-2].type, name: $$[$0-2].name + ' - ' + $$[$0].name, val: $$[$0-2].val - $$[$0].val}
break;
case 40: case 43:
this.$ = $$[$0]
break;
case 41:
this.$ = {type: $$[$0-2].type, name: $$[$0-2].name + ' * ' + $$[$0].name, val: $$[$0-2].val * $$[$0].val}
break;
case 42:
this.$ = {type: $$[$0-2].type, name: $$[$0-2].name + ' / ' + $$[$0].name, val: $$[$0-2].val / $$[$0].val}
break;
case 44:
this.$ = {type: 'int', name: $$[$0], val: parseFloat($$[$0])}
break;
case 45:
this.$ = {type: getType($$[$0]), name: $$[$0], val: getVal($$[$0])}
break;
case 46:
this.$ = {type: 'string', name: $$[$0], val: $$[$0].slice(1, -1)}
break;
case 47:
this.$ = {type: $$[$0-1].type, name: '(' + $$[$0-1].name + ')', val: $$[$0-1].val}
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:$V0,10:6,11:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6},{1:[3]},{5:[1,13]},{4:14,5:[2,2],6:3,7:4,8:$V0,10:6,11:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6},{8:[1,15]},{9:16,16:[1,17],23:[1,18],24:[1,19]},{11:[1,20]},{10:21,11:$V1,17:$V4,18:$V5,19:$V6},{11:[1,22]},o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),o($V7,[2,12]),{1:[2,1]},{5:[2,3]},o($V8,[2,4]),o($V8,[2,5]),{11:[1,23]},{11:[1,24]},{11:[1,25]},{12:[1,26]},{11:[1,27]},{14:[1,28]},{20:[1,29]},{20:[1,30]},{20:[1,31]},{13:32,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},{14:[1,42]},{8:[2,8]},{10:45,11:$V1,17:$V4,18:$V5,19:$V6,21:43,26:44,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,36:$Vm},{10:45,11:$V1,17:$V4,18:$V5,19:$V6,21:53,26:44,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,36:$Vm},{11:$Vn,25:54,37:55},{14:[1,57]},o($Vo,[2,35]),o($Vo,[2,36]),o($Vo,[2,37]),o($Vo,[2,40],{42:[1,58],43:[1,59]}),o($Vp,[2,43],{45:[1,60],46:[1,61]}),o($Vq,[2,44]),o($Vq,[2,45]),o($Vq,[2,46]),{13:62,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},{8:[2,7]},{22:[1,63]},{14:[1,64]},{27:[1,65]},{10:66,11:$V1,17:$V4,18:$V5,19:$V6},{10:67,11:$V1,17:$V4,18:$V5,19:$V6},{10:68,11:$V1,17:$V4,18:$V5,19:$V6},{10:69,11:$V1,17:$V4,18:$V5,19:$V6},{10:70,11:$V1,17:$V4,18:$V5,19:$V6},{34:[1,71]},{10:72,11:$V1,17:$V4,18:$V5,19:$V6},{22:[1,73]},{22:[1,74]},{14:[1,75]},{12:[1,76]},{8:[2,6]},{27:$V9,34:$Va,41:77,44:37,47:$Ve,48:$Vf},{27:$V9,34:$Va,41:78,44:37,47:$Ve,48:$Vf},{27:$V9,34:$Va,44:79,47:$Ve,48:$Vf},{27:$V9,34:$Va,44:80,47:$Ve,48:$Vf},{35:[1,81]},{14:[1,82]},{8:[1,83]},{12:[1,84],14:[2,18]},{27:[1,85]},{27:[1,86]},{27:[1,87]},{27:[1,88]},{27:[1,89]},{11:[1,90]},{27:[1,91]},{14:[1,92]},{14:[1,93]},{8:[1,94]},{13:95,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},o($Vo,[2,38]),o($Vo,[2,39]),o($Vp,[2,41]),o($Vp,[2,42]),o($Vq,[2,47]),o($V8,[2,13]),{10:45,11:$V1,17:$V4,18:$V5,19:$V6,21:96,22:[2,16],26:44,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,36:$Vm},{13:97,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},{12:[1,98],14:[2,20]},{12:[1,99],14:[2,22]},{12:[1,100],14:[2,24]},{12:[1,101],14:[2,26]},{12:[1,102],14:[2,28]},{35:[1,103]},{14:[2,31]},o($V8,[2,14]),o($V8,[2,15]),{11:$Vn,22:[2,32],25:104,37:55},{14:[2,34]},{22:[2,17]},{14:[2,19]},{13:105,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},{13:106,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},{13:107,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},{13:108,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},{13:109,27:$V9,34:$Va,38:$Vb,39:$Vc,40:$Vd,41:36,44:37,47:$Ve,48:$Vf},{10:110,11:$V1,17:$V4,18:$V5,19:$V6},{22:[2,33]},{14:[2,21]},{14:[2,23]},{14:[2,25]},{14:[2,27]},{14:[2,29]},{27:[1,111]},{14:[2,30]}],
defaultActions: {13:[2,1],14:[2,3],28:[2,8],42:[2,7],57:[2,6],91:[2,31],95:[2,34],96:[2,17],97:[2,19],104:[2,33],105:[2,21],106:[2,23],107:[2,25],108:[2,27],109:[2,29],111:[2,30]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    __onInit();
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

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

  function isCapitalWord(w) {
    var reg = new RegExp('[A-Z]+[_0-9A-Z]*');
    return reg.text(w);
  }

  function fixComment(comment) {
    return comment.slice(2).trim();
  }
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* skip whitespace */
break;
case 2:return "COMMENTLINE"
break;
case 3:return "PLUS"
break;
case 4:return "MINUS"
break;
case 5:return "MULTIPLE"
break;
case 6:return "DIVIDE"
break;
case 7:return "LP"
break;
case 8:return "RP"
break;
case 9:return "EQU"
break;
case 10:return "SEMI"
break;
case 11:return "STRUCT"
break;
case 12:return "PRIMARY"
break;
case 13:return "PRIMARY0"
break;
case 14:return "PRIMARY1"
break;
case 15:return "EXPAND"
break;
case 16:return "REPEATED"
break;
case 17:return "UNQIUE"
break;
case 18:return "INDEX"
break;
case 19:return "AUTOINC"
break;
case 20:return "NOW"
break;
case 21:return "NULL"
break;
case 22:return "STATIC"
break;
case 23:return "ENUM"
break;
case 24:return "LB"
break;
case 25:return "RB"
break;
case 26:return "TYPEDEF"
break;
case 27:return "TYPE_STRING"
break;
case 28:return "TYPE_INT"
break;
case 29:return "TYPE_TIME"
break;
case 30:return 47
break;
case 31:return 'NUMBER_INT'
break;
case 32:return 'NUMBER_FLOAT'
break;
case 33:return 11
break;
case 34:return 27
break;
case 35:return 48
break;
case 36:return 5
break;
case 37:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/,/^(?:\n|\r\n)/,/^(?:\/\/[^\n]*)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/[^\/])/,/^(?:\()/,/^(?:\))/,/^(?:=)/,/^(?:;)/,/^(?:struct\b)/,/^(?:primary\b)/,/^(?:primary0\b)/,/^(?:primary1\b)/,/^(?:expand\b)/,/^(?:repeated\b)/,/^(?:unique\b)/,/^(?:index\b)/,/^(?:AUTOINC\b)/,/^(?:NOW\b)/,/^(?:NULL\b)/,/^(?:static\b)/,/^(?:enum\b)/,/^(?:\{)/,/^(?:\})/,/^(?:typedef\b)/,/^(?:string\b)/,/^(?:int\b)/,/^(?:time\b)/,/^(?:0|0|[1-9]\d*\.\d*|[1-9]\d*\.\d*|0\.\d*|0\.\d*|[1-9]\d*|[1-9]\d*)/,/^(?:[1-9]\d*|[1-9]\d*)/,/^(?:[1-9]\d*\.\d*|[1-9]\d*\.\d*|0\.\d*|0\.\d*)/,/^(?:[A-Z]+[_0-9a-zA-Z]*)/,/^(?:[_a-z]+[_0-9a-zA-Z]*)/,/^(?:"[^\"]*"|'[^\']*')/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}