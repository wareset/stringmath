/* eslint-disable */
Object.defineProperty(exports,"__esModule",{value:!0});var t=Array.prototype;function e(){return t.concat.apply([],arguments)}function n(t){return t[t.length-1]}var r=Object.is||function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e},i=Math.pow,s=/^(NaN)?([-]?)(Infinity)?(\d*)\.?(\d*)[eE]?([-+]?\d*)$/,a=/^0+/;function o(t){var e=(0!=(t=+t)||1/t>0?""+t:"-0").match(s);return{isNaN:!!e[1],isMinus:"-"===e[2],isInfinity:!!e[3],integer:(e[4]+e[5]).replace(a,""),exponent:+e[6]-e[5].length}}function u(t){return t.isNaN?NaN:t.isInfinity?t.isMinus?-1/0:1/0:+((t.isMinus?"-":"")+(t.integer||"0")+"e"+t.exponent)}function c(t,e){if(t=+t,0===(e=+e))return 1;if(e!=e||t!=t)return NaN;if(e===1/0)return t?-1===t||1===t?NaN:t>1||t<-1?e:0:0;if(e===-1/0)return t?-1===t||1===t?NaN:t>1||t<-1?0:-e:-e;e<0&&(t=p(1,t),e=-e);for(var n=1,r=0;++r<=e;)n=h(n,t);return(e=f(e,1-r))>0&&(n=h(n,i(t,e))),n}function h(t,e){var n=o(t),r=o(e),i=n.exponent,s=r.exponent,a=(i>s?s-i:i-s)||i;n.exponent-=a,r.exponent-=a;var c=o(u(n)*u(r));return c.exponent+=a+a,u(c)}function p(t,e){var n=o(t),r=o(e),i=n.exponent,s=r.exponent,a=(i>s?s-i:i-s)||i;return n.exponent-=a,r.exponent-=a,u(n)/u(r)}function l(t,e){var n=o(t),r=o(e),i=n.exponent,s=r.exponent,a=(i>s?s-i:i-s)||i;n.exponent-=a,r.exponent-=a;var c=o(u(n)%u(r));return c.exponent+=a,u(c)}function f(t,e){var n=o(t),r=o(e),i=n.exponent,s=r.exponent,a=(i>s?s-i:i-s)||i;n.exponent-=a,r.exponent-=a;var c=o(u(n)+u(r));return c.exponent+=a,u(c)}var N=/\?\??|\|\|?|\*\*?|&&?|<<|>>>?|[!=]=?=?|[<>]=?|(?<!\d\.?[eE])[-+]|[,:~^%/()[\]]/g,g=function(){function ProgramNode(t){this.type="Program",this.is=t}var t=ProgramNode.prototype;return t.toArray=function(t){return this.is?this.is.toArray(t):["NaN"]},t.toString=function(){return""+(this.is||NaN)},t.calculate=function(){return this.is?this.is.calculate.apply(this.is,arguments):NaN},ProgramNode}(),d=function(){function ParenthesisNode(t){this.type="Parenthesis",this.is=t}var t=ParenthesisNode.prototype;return t.toArray=function(t){var n=this.is,r=e(n?n.toArray(t):"NaN");return t&&"("!==r[0]?e("(",r,")"):r},t.toString=function(){return"("+(this.is||NaN)+")"},t.calculate=function(){return this.is?this.is.calculate.apply(this.is,arguments):NaN},ParenthesisNode}(),y=function(){function ConditionalNode(t,e,n){this.type="Conditional",this.is=n,this.isTrue=e,this.isFalse=t}var t=ConditionalNode.prototype;return t.toArray=function(t){var n=e(this.is?this.is.toArray(t):"NaN","?",this.isTrue?this.isTrue.toArray(t):"NaN",":",this.isFalse?this.isFalse.toArray(t):"NaN");return t?e("(",n,")"):n},t.toString=function(){return(this.is||NaN)+" ? "+(this.isTrue||NaN)+" : "+(this.isFalse||NaN)},t.calculate=function(){var t=this.is,e=this.isTrue,n=this.isFalse,r=arguments;return t?t.calculate.apply(t,r):n?n.calculate.apply(e,r):NaN},ConditionalNode}(),x=function(){function ConstantNode(t){this.type="Constant",this.is=t}var t=ConstantNode.prototype;return t.toArray=function(){return[this.is]},t.toString=function(){return this.is},t.calculate=function(){for(var t=this.is,e=arguments,n=e.length;n-- >0;)if(t in e[n]&&"function"!=typeof e[n])return+e[n][t];return+t},ConstantNode}();function v(t,n){return 0===n?t.toArray(this[0]):e(",",t.toArray(this[0]))}function A(t){return t.calculate.apply(t,this)}var w=function(){function FunctionNode(t,e){this.type="Function",this.is=t,this.isArgs=e}var t=FunctionNode.prototype;return t.toArray=function(t){return e(this.is,"(",e.apply(void 0,this.isArgs.map(v,[t])),")")},t.toString=function(){return this.is+"("+this.isArgs.join(", ")+")"},t.calculate=function(){for(var t=this.is,e=arguments,n=e.length;n-- >0;)if(t in e[n]&&"function"==typeof e[n][t])return+e[n][t].apply(void 0,this.isArgs.map(A,e));return NaN},FunctionNode}(),m=function(){function OperatorNode(t,e,n){this.type="Operator",this.is=t,this.isLeft=n,this.isRight=e}var t=OperatorNode.prototype;return t.toArray=function(t){var n=this.is,r=this.isLeft,i=this.isRight,s=r?r.toArray(t):["NaN"],a=i?i.toArray(t):["NaN"];return i?r?"!"===n||"~"===n?["NaN"]:t?e("(",s,n,a,")"):e(s,n,a):"!"===n||"~"===n||"-"===n?e(n,a):a:s},t.toString=function(){var t=this.is,e=this.isLeft,n=this.isRight,r=""+(e||NaN),i=""+(n||NaN);return n?e?"!"===t||"~"===t?"NaN":r+" "+t+" "+i:"!"===t||"~"===t||"-"===t?t+i:i:r},t.calculate=function(){var t,e=this.is,n=this.isLeft,i=this.isRight,s=arguments,a=n?n.calculate.apply(n,s):NaN,o=i?i.calculate.apply(i,s):NaN;if(!i)return a;for(var u=s.length;u-- >0;)if(e in s[u]&&"function"==typeof s[u][e]){t=s[u][e];break}if(!n)return"-"===e?t?+t(-o,0):-o:"!"===e?t?+t(o):+!o:"~"===e?t?+t(o):~o:o;if(t)return+t(a,o);switch(e){case"**":return c(a,o);case"*":return h(a,o);case"/":return p(a,o);case"%":return l(a,o);case"+":return f(a,o);case"-":return f(a,-o);case"<<":return a<<o;case">>":return a>>o;case">>>":return a>>>o;case"<":return a<o?1:0;case"<=":return a<=o?1:0;case">":return a>o?1:0;case">=":return a>=o?1:0;case"=":case"==":return a===o?1:0;case"===":return r(a,o)?1:0;case"!=":return a!==o?1:0;case"!==":return r(a,o)?0:1;case"&":return a&o;case"^":return a^o;case"|":return a|o;case"&&":return a?o:a;case"||":return a||o;case"??":return a==a?a:o}return NaN},OperatorNode}(),C={"!":14,"~":14,"**":13,"*":12,"/":12,"%":12,"+":11,"-":11,"<<":10,">>":10,">>>":10,"<":9,"<=":9,">":9,">=":9,"=":8,"==":8,"!=":8,"===":8,"!==":8,"&":7,"^":6,"|":5,"&&":4,"||":3,"??":3,"?":2,":":2,",":1};function O(t,r,i,s,a,o,u){if(o[r]&&o[r].length)for(var c,h=o[r],p=h.length;p-- >0;)if((c=h[p]-i)>-1&&c<t.length)return h.splice(p,1),e(O(t.slice(0,c),r,i,s,a,o,u),O(t.slice(c+1),r,i+c+1,s,a,o,u));if(a[r]&&a[r].length)for(var l,f,N=a[r],g=N.length;g-- >0;)if(l=N[g].f-i,f=N[g].s-i,l>-1&&l<t.length&&f>l)return N.splice(g,1),new y(n(e(O(t.slice(f+1),r,i+f+1,s,a,o,u))),n(e(O(t.slice(l+1,f),r,i+l+1,s,a,o,u))),n(e(O(t.slice(0,l),r,i,s,a,o,u))));if(u[r]&&u[r].length)for(var v,A=u[r],C=A.length;C-- >0;)if((v=A[C]-i)>-1&&v<t.length)return A.splice(C,1),new m(t[v],n(e(O(t.slice(v+1),r,i+v+1,s,a,o,u))),n(e(O(t.slice(0,v),r,i,s,a,o,u))));if(s[r]&&s[r].length)for(var b,P,F=s[r],R=F.length;R-- >0;)if(b=F[R].f-i,P=F[R].s-i,b>-1&&b<t.length&&P>b)return F.splice(R,1),"("===t[b]?new d(n(e(O(t.slice(b+1,P),r+1,i+b+1,s,a,o,u)))):new w(t[b],e(O(t.slice(b+2,P),r+1,i+b+2,s,a,o,u)));var S=t.join("");return S?new x(S):[]}function b(t,e,n,r){t[e]||(t[e]=[]),t[e][n]||(t[e][n]=[]),t[e][n][n===C["**"]?"unshift":"push"](r.length)}function P(t,e,n){b(t,e,C["*"],n),n.push("*")}function F(r){r="("+r+")",N.lastIndex=0;for(var i,s,a,o,u,c=[],h=0,p="",l=0,f=0,d={},y={},x={},v={},A=C["!"],w={},m={},F={};u=N.exec(r);)switch(i=u[0]){case"[":f++;break;case"]":f--;break;default:if(0!==f)break;switch(u.index>h&&(s=r.slice(h,u.index).trim())&&(")"===p&&P(F,l,c),c.push(p=s)),i){case"(":y[l]||(y[l]=[]),y[l].push({f:c.length,s:-1}),!p||"("===p||C[p]>0||(r[u.index-1].trim()&&"NaN"!==p&&""+ +p=="NaN"?(a=y[l]&&n(y[l]))&&a.f--:(P(F,l,c),(a=y[l]&&n(y[l]))&&a.f++)),l++;break;case")":(a=y[--l]&&n(y[l]))&&(a.s=c.length,(d[l]||(d[l]=[])).push(y[l].pop()));break;default:switch(")"!==p||C[i]>0||(P(F,l,c),p="*"),i){case",":w[l]||(w[l]=[]),w[l].push(c.length);break;case"?":v[l]||(v[l]=[]),v[l].push({f:c.length,s:-1});break;case":":(a=v[l]&&n(v[l]))&&(a.s=c.length,(x[l]||(x[l]=[])).push(v[l].pop()));break;default:if("("===p||C[p]>0){if("-"!==i&&"!"!==i&&"~"!==i){h=u.index+i.length;continue}o=++A}else o=C[i];b(F,l,o,c)}}h=u.index+i.length,c.push(p=8===C[i]?i[0]+"="+(i[2]||""):i)}for(var R in F){m[R]=[];for(var S=F[R],L=S.length;L-- >0;)S[L]&&t.push.apply(m[R],S[L])}return new g(n(e(O(c.slice(1,-1),1,1,d,x,w,m))))}exports.ConditionalNode=y,exports.ConstantNode=x,exports.FunctionNode=w,exports.OPERATORS={"(":"Opening parenthesis",")":"Closing parenthesis","!":"Logical NOT","~":"Bitwise NOT","**":"Exponentiation","*":"Multiplication","/":"Division","%":"Remainder","+":"Addition","-":"Subtraction","<<":"Bitwise left shift",">>":"Bitwise right shift",">>>":"Bitwise unsigned right shift","<":"Less than","<=":"Less than or equal",">":"Greater than",">=":"Greater than or equal","=":"Equality","==":"Equality","!=":"Inequality","===":"Strict equality","!==":"Strict inequality","&":"Bitwise AND","^":"Bitwise XOR","|":"Bitwise OR","&&":"Logical AND","||":"Logical OR","??":"Coalescing NaN","?":"Conditional TRUE",":":"Conditional FALSE",",":"Comma"},exports.OperatorNode=m,exports.ParenthesisNode=d,exports.ProgramNode=g,exports.add=f,exports.create=F,exports.default=F,exports.div=p,exports.exp=c,exports.mul=h,exports.num2raw=o,exports.raw2num=u,exports.rem=l,exports.sub=function(t,e){return f(t,-e)};
