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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,14],$V2=[1,7],$V3=[1,8],$V4=[1,9],$V5=[1,10],$V6=[1,11],$V7=[1,12],$V8=[1,13],$V9=[11,31],$Va=[5,8,11,15,16,17,18,19,20,21],$Vb=[1,47],$Vc=[1,49],$Vd=[1,38],$Ve=[1,39],$Vf=[1,40],$Vg=[1,41],$Vh=[1,42],$Vi=[1,46],$Vj=[1,48],$Vk=[1,54],$Vl=[1,55],$Vm=[1,56],$Vn=[1,57],$Vo=[1,58],$Vp=[1,59],$Vq=[1,60],$Vr=[1,64],$Vs=[14,32],$Vt=[14,32,50,51],$Vu=[14,32,50,51,53,54],$Vv=[1,77],$Vw=[12,14],$Vx=[1,121];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"block":4,"EOF":5,"blocknode":6,"lineblock":7,"COMMENTLINE":8,"codeblock":9,"typestr":10,"WORD":11,"EQU":12,"statementex":13,"SEMI":14,"TYPEDEF":15,"STRUCT":16,"TYPE_STRING":17,"TYPE_INT":18,"TYPE_TIME":19,"TYPE_BYTES":20,"TYPE_BOOL":21,"LB":22,"structinfo":23,"RB":24,"STATIC":25,"ENUM":26,"enuminfo":27,"MESSAGE":28,"structdefline":29,"varname":30,"LP":31,"RP":32,"PRIMARY":33,"PRIMARY0":34,"PRIMARY1":35,"INDEX":36,"UNQIUE":37,"EXPAND":38,"REPEATED":39,"dataval":40,"PT":41,"enumdefline":42,"AUTOINC":43,"statement":44,"NOW":45,"NULL":46,"BOOL_TRUE":47,"BOOL_FALSE":48,"term":49,"PLUS":50,"MINUS":51,"factor":52,"MULTIPLE":53,"DIVIDE":54,"NUMBER":55,"STRING":56,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"COMMENTLINE",11:"WORD",12:"EQU",14:"SEMI",15:"TYPEDEF",16:"STRUCT",17:"TYPE_STRING",18:"TYPE_INT",19:"TYPE_TIME",20:"TYPE_BYTES",21:"TYPE_BOOL",22:"LB",24:"RB",25:"STATIC",26:"ENUM",28:"MESSAGE",31:"LP",32:"RP",33:"PRIMARY",34:"PRIMARY0",35:"PRIMARY1",36:"INDEX",37:"UNQIUE",38:"EXPAND",39:"REPEATED",41:"PT",43:"AUTOINC",45:"NOW",46:"NULL",47:"BOOL_TRUE",48:"BOOL_FALSE",50:"PLUS",51:"MINUS",53:"MULTIPLE",54:"DIVIDE",55:"NUMBER",56:"STRING"},
productions_: [0,[3,2],[4,1],[4,2],[6,2],[6,2],[7,5],[7,4],[7,3],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[9,6],[9,6],[9,6],[9,6],[23,3],[23,4],[29,2],[29,5],[29,4],[29,3],[29,5],[29,3],[29,5],[29,3],[29,5],[29,3],[29,5],[29,3],[29,5],[29,6],[29,3],[29,3],[29,6],[30,1],[30,4],[40,1],[40,3],[27,3],[27,4],[42,3],[13,1],[13,4],[13,1],[13,1],[13,1],[13,1],[13,1],[44,3],[44,3],[44,1],[49,3],[49,3],[49,1],[52,1],[52,1],[52,1],[52,3]],
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
this.$ = {type:'bytes', name: $$[$0]}
break;
case 13:
this.$ = {type:'bool', name: $$[$0]}
break;
case 14:
this.$ = {type:getVal($$[$0]), name: $$[$0]}
break;
case 15:
this.$ = {type: 'struct', val: $$[$0-2], name: $$[$0-4]}
break;
case 16:
this.$ = {type: 'static', val: $$[$0-2], name: $$[$0-4]}
break;
case 17:
this.$ = {type: 'enum', val: $$[$0-2], name: $$[$0-4]}
break;
case 18:
this.$ = {type: 'message', val: $$[$0-2], name: $$[$0-4]}
break;
case 19: case 42:
$$[$0-2].comment = fixComment($$[$0]); this.$ = [$$[$0-2]]
break;
case 20: case 43:
$$[$0-3].comment = fixComment($$[$0-1]); $$[$0].push($$[$0-3]); this.$ = $$[$0]
break;
case 21:
this.$ = {type: $$[$0-1].name, name: $$[$0]}
break;
case 22:
this.$ = {type: $$[$0-4].name, name: $$[$0], memberkey: $$[$0-2]}
break;
case 23:
this.$ = {type: $$[$0-3].name, name: $$[$0-2], val: $$[$0]}
break;
case 24:
this.$ = {type: $$[$0-1].name, name: $$[$0], type2: 'primary'}
break;
case 25:
this.$ = {type: $$[$0-3].name, name: $$[$0-2], val: $$[$0], type2: 'primary'}
break;
case 26:
this.$ = {type: $$[$0-1].name, name: $$[$0], type2: 'primary0'}
break;
case 27:
this.$ = {type: $$[$0-3].name, name: $$[$0-2], val: $$[$0], type2: 'primary0'}
break;
case 28:
this.$ = {type: $$[$0-1].name, name: $$[$0], type2: 'primary1'}
break;
case 29:
this.$ = {type: $$[$0-3].name, name: $$[$0-2], val: $$[$0], type2: 'primary1'}
break;
case 30:
this.$ = {type: $$[$0-1].name, name: $$[$0], type2: 'index'}
break;
case 31:
this.$ = {type: $$[$0-3].name, name: $$[$0-2], val: $$[$0], type2: 'index'}
break;
case 32:
this.$ = {type: $$[$0-1].name, name: $$[$0], type2: 'unique'}
break;
case 33:
this.$ = {type: $$[$0-3].name, name: $$[$0-2], val: $$[$0], type2: 'unique'}
break;
case 34:
this.$ = {type: $$[$0-1].name, name: $$[$0], type2: 'expand', expand: $$[$0-3]}
break;
case 35:
this.$ = {type: $$[$0-1].name, name: $$[$0], type2: 'expand'}
break;
case 36:
this.$ = {type: $$[$0-1].name, name: $$[$0], type2: 'repeated'}
break;
case 37:
this.$ = {type: $$[$0-4].name, name: $$[$0], type2: 'repeated', memberkey: $$[$0-2]}
break;
case 38:
this.$ = {name: $$[$0]}
break;
case 39:
this.$ = {name: $$[$0-3], data: $$[$0-1]}
break;
case 40: case 51: case 54: case 57:
this.$ = $$[$0]
break;
case 41:
this.$ = $$[$0-2] + '.' + $$[$0]
break;
case 44:
this.$ = {type: 'int', name: $$[$0-2], val: $$[$0]}
break;
case 45:
this.$ = {type: 'int', name: $$[$0], val: $$[$0]}
break;
case 46:
this.$ = {type: 'int', name: $$[$0-3], val: $$[$0-3], autoinc: $$[$0-1].val}
break;
case 47:
this.$ = {type: 'time', name: $$[$0], val: $$[$0]}
break;
case 48:
this.$ = {type: $$[$0], name: $$[$0], val: $$[$0]}
break;
case 49:
this.$ = {type: 'bool', name: $$[$0], val: true}
break;
case 50:
this.$ = {type: 'bool', name: $$[$0], val: false}
break;
case 52:
this.$ = {type: $$[$0-2].type, name: $$[$0-2].name + ' + ' + $$[$0].name, val: $$[$0-2].val + $$[$0].val}
break;
case 53:
this.$ = {type: $$[$0-2].type, name: $$[$0-2].name + ' - ' + $$[$0].name, val: $$[$0-2].val - $$[$0].val}
break;
case 55:
this.$ = {type: $$[$0-2].type, name: $$[$0-2].name + ' * ' + $$[$0].name, val: $$[$0-2].val * $$[$0].val}
break;
case 56:
this.$ = {type: $$[$0-2].type, name: $$[$0-2].name + ' / ' + $$[$0].name, val: $$[$0-2].val / $$[$0].val}
break;
case 58:
this.$ = {type: 'int', name: $$[$0], val: parseFloat($$[$0])}
break;
case 59:
this.$ = {type: getType($$[$0]), name: $$[$0], val: getVal($$[$0])}
break;
case 60:
this.$ = {type: 'string', name: $$[$0], val: $$[$0].slice(1, -1)}
break;
case 61:
this.$ = {type: $$[$0-1].type, name: '(' + $$[$0-1].name + ')', val: $$[$0-1].val}
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:$V0,10:6,11:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{1:[3]},{5:[1,15]},{4:16,5:[2,2],6:3,7:4,8:$V0,10:6,11:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{8:[1,17]},{9:18,16:[1,19],25:[1,20],26:[1,21],28:[1,22]},{11:[1,23]},{10:24,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{11:[1,25]},o($V9,[2,9]),o($V9,[2,10]),o($V9,[2,11]),o($V9,[2,12]),o($V9,[2,13]),o($V9,[2,14]),{1:[2,1]},{5:[2,3]},o($Va,[2,4]),o($Va,[2,5]),{11:[1,26]},{11:[1,27]},{11:[1,28]},{11:[1,29]},{12:[1,30]},{11:[1,31]},{14:[1,32]},{22:[1,33]},{22:[1,34]},{22:[1,35]},{22:[1,36]},{11:$Vb,13:37,31:$Vc,43:$Vd,44:43,45:$Ve,46:$Vf,47:$Vg,48:$Vh,49:44,52:45,55:$Vi,56:$Vj},{14:[1,50]},{8:[2,8]},{10:53,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8,23:51,29:52,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq},{10:53,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8,23:61,29:52,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq},{11:$Vr,27:62,42:63},{10:53,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8,23:65,29:52,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq},{14:[1,66]},{14:[2,45],31:[1,67]},{14:[2,47]},{14:[2,48]},{14:[2,49]},{14:[2,50]},{14:[2,51]},o($Vs,[2,54],{50:[1,68],51:[1,69]}),o($Vt,[2,57],{53:[1,70],54:[1,71]}),o($Vu,[2,58]),o($Vu,[2,59]),o($Vu,[2,60]),{11:$Vb,31:$Vc,44:72,49:44,52:45,55:$Vi,56:$Vj},{8:[2,7]},{24:[1,73]},{14:[1,74]},{11:$Vv,30:75,31:[1,76]},{10:78,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{10:79,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{10:80,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{10:81,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{10:82,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{10:84,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8,31:[1,83]},{10:85,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{24:[1,86]},{24:[1,87]},{14:[1,88]},{12:[1,89]},{24:[1,90]},{8:[2,6]},{11:$Vb,31:$Vc,44:91,49:44,52:45,55:$Vi,56:$Vj},{11:$Vb,31:$Vc,49:92,52:45,55:$Vi,56:$Vj},{11:$Vb,31:$Vc,49:93,52:45,55:$Vi,56:$Vj},{11:$Vb,31:$Vc,52:94,55:$Vi,56:$Vj},{11:$Vb,31:$Vc,52:95,55:$Vi,56:$Vj},{32:[1,96]},{14:[1,97]},{8:[1,98]},{12:[1,99],14:[2,21]},{11:[1,100]},o($Vw,[2,38],{31:[1,101]}),{11:$Vv,30:102},{11:$Vv,30:103},{11:$Vv,30:104},{11:$Vv,30:105},{11:$Vv,30:106},{11:[1,107]},{11:$Vv,30:108},{11:$Vv,30:109,31:[1,110]},{14:[1,111]},{14:[1,112]},{8:[1,113]},{11:$Vb,13:114,31:$Vc,43:$Vd,44:43,45:$Ve,46:$Vf,47:$Vg,48:$Vh,49:44,52:45,55:$Vi,56:$Vj},{14:[1,115]},{32:[1,116]},o($Vs,[2,52]),o($Vs,[2,53]),o($Vt,[2,55]),o($Vt,[2,56]),o($Vu,[2,61]),o($Va,[2,15]),{10:53,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8,23:117,24:[2,19],29:52,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq},{11:$Vb,13:118,31:$Vc,43:$Vd,44:43,45:$Ve,46:$Vf,47:$Vg,48:$Vh,49:44,52:45,55:$Vi,56:$Vj},{32:[1,119]},{11:$Vx,40:120},{12:[1,122],14:[2,24]},{12:[1,123],14:[2,26]},{12:[1,124],14:[2,28]},{12:[1,125],14:[2,30]},{12:[1,126],14:[2,32]},{32:[1,127]},{14:[2,35]},{14:[2,36]},{11:[1,128]},o($Va,[2,16]),o($Va,[2,17]),{11:$Vr,24:[2,42],27:129,42:63},{14:[2,44]},o($Va,[2,18]),{14:[2,46]},{24:[2,20]},{14:[2,23]},{11:$Vv,30:130},{32:[1,131]},{32:[2,40],41:[1,132]},{11:$Vb,13:133,31:$Vc,43:$Vd,44:43,45:$Ve,46:$Vf,47:$Vg,48:$Vh,49:44,52:45,55:$Vi,56:$Vj},{11:$Vb,13:134,31:$Vc,43:$Vd,44:43,45:$Ve,46:$Vf,47:$Vg,48:$Vh,49:44,52:45,55:$Vi,56:$Vj},{11:$Vb,13:135,31:$Vc,43:$Vd,44:43,45:$Ve,46:$Vf,47:$Vg,48:$Vh,49:44,52:45,55:$Vi,56:$Vj},{11:$Vb,13:136,31:$Vc,43:$Vd,44:43,45:$Ve,46:$Vf,47:$Vg,48:$Vh,49:44,52:45,55:$Vi,56:$Vj},{11:$Vb,13:137,31:$Vc,43:$Vd,44:43,45:$Ve,46:$Vf,47:$Vg,48:$Vh,49:44,52:45,55:$Vi,56:$Vj},{10:138,11:$V1,17:$V4,18:$V5,19:$V6,20:$V7,21:$V8},{32:[1,139]},{24:[2,43]},{14:[2,22]},o($Vw,[2,39]),{11:$Vx,40:140},{14:[2,25]},{14:[2,27]},{14:[2,29]},{14:[2,31]},{14:[2,33]},{11:$Vv,30:141},{11:$Vv,30:142},{32:[2,41]},{14:[2,34]},{14:[2,37]}],
defaultActions: {15:[2,1],16:[2,3],32:[2,8],39:[2,47],40:[2,48],41:[2,49],42:[2,50],43:[2,51],50:[2,7],66:[2,6],108:[2,35],109:[2,36],114:[2,44],116:[2,46],117:[2,20],118:[2,23],129:[2,43],130:[2,22],133:[2,25],134:[2,27],135:[2,29],136:[2,31],137:[2,33],140:[2,41],141:[2,34],142:[2,37]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
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
case 11:return "PT"
break;
case 12:return "MESSAGE"
break;
case 13:return "STRUCT"
break;
case 14:return "PRIMARY"
break;
case 15:return "PRIMARY0"
break;
case 16:return "PRIMARY1"
break;
case 17:return "EXPAND"
break;
case 18:return "REPEATED"
break;
case 19:return "UNQIUE"
break;
case 20:return "INDEX"
break;
case 21:return "AUTOINC"
break;
case 22:return "NOW"
break;
case 23:return "NULL"
break;
case 24:return "STATIC"
break;
case 25:return "ENUM"
break;
case 26:return "LB"
break;
case 27:return "RB"
break;
case 28:return "TYPEDEF"
break;
case 29:return "TYPE_STRING"
break;
case 30:return "TYPE_INT"
break;
case 31:return "TYPE_TIME"
break;
case 32:return "TYPE_BYTES"
break;
case 33:return "TYPE_BOOL"
break;
case 34:return "BOOL_TRUE"
break;
case 35:return "BOOL_FALSE"
break;
case 36:return 55
break;
case 37:return 'NUMBER_INT'
break;
case 38:return 'NUMBER_FLOAT'
break;
case 39:return 11
break;
case 40:return 56
break;
case 41:return 5
break;
case 42:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/,/^(?:\n|\r\n)/,/^(?:\/\/[^\n]*)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/[^\/])/,/^(?:\()/,/^(?:\))/,/^(?:=)/,/^(?:;)/,/^(?:\.)/,/^(?:message\b)/,/^(?:struct\b)/,/^(?:primary\b)/,/^(?:primary0\b)/,/^(?:primary1\b)/,/^(?:expand\b)/,/^(?:repeated\b)/,/^(?:unique\b)/,/^(?:index\b)/,/^(?:AUTOINC\b)/,/^(?:NOW\b)/,/^(?:NULL\b)/,/^(?:static\b)/,/^(?:enum\b)/,/^(?:\{)/,/^(?:\})/,/^(?:typedef\b)/,/^(?:string\b)/,/^(?:int\b)/,/^(?:time\b)/,/^(?:bytes\b)/,/^(?:bool\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:0|0|[1-9]\d*\.\d*|[1-9]\d*\.\d*|0\.\d*|0\.\d*|[1-9]\d*|[1-9]\d*)/,/^(?:[1-9]\d*|[1-9]\d*)/,/^(?:[1-9]\d*\.\d*|[1-9]\d*\.\d*|0\.\d*|0\.\d*)/,/^(?:[_a-zA-Z]+[_0-9a-zA-Z]*)/,/^(?:"[^\"]*"|'[^\']*')/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],"inclusive":true}}
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