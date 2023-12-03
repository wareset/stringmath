/* eslint-disable */
function t(){return Array.prototype.concat.apply([],arguments)}function e(t){return t[t.length-1]}Object.defineProperty(exports,"__esModule",{value:!0});var r=Object.is||function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e},n=/^(NaN)?([-]?)(Infinity)?(\d*)\.?(\d*)[eE]?([-+]?\d*)$/,s=/^0+/;function i(t){var e=(0!=(t=+t)||1/t>0?""+t:"-0").match(n);return{isNaN:!!e[1],isMinus:"-"===e[2],isInfinity:!!e[3],integer:(e[4]+e[5]).replace(s,""),exponent:+e[6]-e[5].length}}function a(t){return t.isNaN?NaN:t.isInfinity?t.isMinus?-1/0:1/0:+((t.isMinus?"-":"")+(t.integer||"0")+"e"+t.exponent)}function o(t,e){if(t=+t,0===(e=+e))return 1;if(e!=e||t!=t)return NaN;if(e===1/0)return t?-1===t||1===t?NaN:t>1||t<-1?e:0:0;if(e===-1/0)return t?-1===t||1===t?NaN:t>1||t<-1?0:-e:-e;e<0&&(t=h(1,t),e=-e);for(var r=1,n=0;++n<=e;)r=c(r,t);return(e=p(e,1-n))>0&&(r=0===(r=c(r,Math.pow(t,e)))?0:r<0?-r:r),r}function u(t,e){var r=t.exponent,n=e.exponent;return r>n?n:r}function c(t,e){var r=i(t=+t),n=i(e=+e),s=u(r,n);r.exponent-=s,n.exponent-=s;var o=i(a(r)*a(n));return o.exponent+=s+s,a(o)}function h(t,e){var r=i(t=+t),n=i(e=+e),s=u(r,n);return r.exponent-=s,n.exponent-=s,a(r)/a(n)}function l(t,e){var r=i(t=+t),n=i(e=+e),s=u(r,n);r.exponent-=s,n.exponent-=s;var o=i(a(r)%a(n));return o.exponent+=s,a(o)}function p(t,e){var r=i(t=+t),n=i(e=+e),s=u(r,n);r.exponent-=s,n.exponent-=s;var o=i(a(r)+a(n));return o.exponent+=s,a(o)}function N(t,e){var r=i(t=+t),n=i(e=+e),s=u(r,n);r.exponent-=s,n.exponent-=s;var o=i(a(r)-a(n));return o.exponent+=s,a(o)}class ProgramNode{constructor(t){this.type="Program",this.is=t}toArray(t){return this.is?this.is.toArray(t):["NaN"]}toString(){return""+(this.is||NaN)}calculate(){return this.is?this.is.calculate.apply(this.is,arguments):NaN}}class ParenthesisNode{constructor(t){this.type="Parenthesis",this.is=t}toArray(e){var r=this.is,n=t(r?r.toArray(e):"NaN");return e&&"("!==n[0]?t("(",n,")"):n}toString(){return"("+(this.is||NaN)+")"}calculate(){return this.is?this.is.calculate.apply(this.is,arguments):NaN}}class ConditionalNode{constructor(t,e,r){this.type="Conditional",this.is=r,this.isTrue=e,this.isFalse=t}toArray(e){var r=t(this.is?this.is.toArray(e):"NaN","?",this.isTrue?this.isTrue.toArray(e):"NaN",":",this.isFalse?this.isFalse.toArray(e):"NaN");return e?t("(",r,")"):r}toString(){return`${this.is||NaN} ? ${this.isTrue||NaN} : ${this.isFalse||NaN}`}calculate(){var t=this.is,e=this.isTrue,r=this.isFalse,n=arguments;return t?t.calculate.apply(t,n):r?r.calculate.apply(e,n):NaN}}class ConstantNode{constructor(t){this.type="Constant",this.is=t}toArray(){return[this.is]}toString(){return this.is}calculate(){for(var t=this.is,e=arguments,r=e.length;r-- >0;)if(t in e[r]&&"function"!=typeof e[r][t])return e[r][t];var n=+t;return n==n||"NaN"===t?n:t}}function f(e,r){return 0===r?e.toArray(this[0]):t(",",e.toArray(this[0]))}function d(t){return t.calculate.apply(t,this)}class FunctionNode{constructor(t,e){this.type="Function",this.is=t,this.isArgs=e}toArray(e){return t(this.is,"(",t.apply(void 0,this.isArgs.map(f,[e])),")")}toString(){return`${this.is}(${this.isArgs.join(", ")})`}calculate(){for(var t=this.is,e=arguments,r=e.length;r-- >0;)if(t in e[r]&&"function"==typeof e[r][t])return e[r][t].apply(void 0,this.isArgs.map(d,e));return NaN}}class OperatorNode{constructor(t,e,r){this.type="Operator",this.is=t,this.isLeft=r,this.isRight=e}toArray(e){var r=this.is,n=this.isLeft,s=this.isRight,i=n?n.toArray(e):["NaN"],a=s?s.toArray(e):["NaN"];return s?n?"!"===r||"~"===r?["NaN"]:e?t("(",i,r,a,")"):t(i,r,a):"!"===r||"~"===r||"-"===r?t(r,a):a:i}toString(){var t=this.is,e=this.isLeft,r=this.isRight,n=""+(e||NaN),s=""+(r||NaN);return r?e?"!"===t||"~"===t?"NaN":n+" "+t+" "+s:"!"===t||"~"===t||"-"===t?t+s:s:n}calculate(){var t,e=this.is,n=this.isLeft,s=this.isRight,i=arguments,a=n?n.calculate.apply(n,i):NaN,u=s?s.calculate.apply(s,i):NaN;if(!s)return a;for(var f=i.length;f-- >0;)if(e in i[f]&&"function"==typeof i[f][e]){t=i[f][e];break}if(!n)return"-"===e?t?t(0,u):-u:"!"===e?t?t(u):+!u:"~"===e?t?t(u):~u:u;if(t)return t(a,u);switch(e){case"**":return o(a,u);case"*":return c(a,u);case"/":return h(a,u);case"%":return l(a,u);case"+":return p(a,u);case"-":return N(a,u);case"<<":return a<<u;case">>":return a>>u;case">>>":return a>>>u;case"<":return a<u?1:0;case"<=":return a<=u?1:0;case">":return a>u?1:0;case">=":return a>=u?1:0;case"=":case"==":return a==u?1:0;case"===":return r(a,u)?1:0;case"!=":return a!=u?1:0;case"!==":return r(a,u)?0:1;case"&":return a&u;case"^":return a^u;case"|":return a|u;case"&&":return a?u:a;case"||":return a||u;case"??":return a==a?a:u}return NaN}}var g=/\?\??|\|\|?|\*\*?|&&?|<<|>>>?|[!=]=?=?|[<>]=?|(?<!\d\.?[eE])[-+]|[,:~^%/()[\]]/g,x={"!":14,"~":14,"**":13,"*":12,"/":12,"%":12,"+":11,"-":11,"<<":10,">>":10,">>>":10,"<":9,"<=":9,">":9,">=":9,"=":8,"==":8,"!=":8,"===":8,"!==":8,"&":7,"^":6,"|":5,"&&":4,"||":3,"??":3,"?":2,":":2,",":1};function y(r,n,s,i,a,o,u){if(o[n]&&o[n].length)for(var c,h=o[n],l=h.length;l-- >0;)if((c=h[l]-s)>-1&&c<r.length)return h.splice(l,1),t(y(r.slice(0,c),n,s,i,a,o,u),y(r.slice(c+1),n,s+c+1,i,a,o,u));if(a[n]&&a[n].length)for(var p,N,f=a[n],d=f.length;d-- >0;)if(p=f[d].f-s,N=f[d].s-s,p>-1&&p<r.length&&N>p)return f.splice(d,1),new ConditionalNode(e(t(y(r.slice(N+1),n,s+N+1,i,a,o,u))),e(t(y(r.slice(p+1,N),n,s+p+1,i,a,o,u))),e(t(y(r.slice(0,p),n,s,i,a,o,u))));if(u[n]&&u[n].length)for(var g,x=u[n],v=x.length;v-- >0;)if((g=x[v]-s)>-1&&g<r.length)return x.splice(v,1),new OperatorNode(r[g],e(t(y(r.slice(g+1),n,s+g+1,i,a,o,u))),e(t(y(r.slice(0,g),n,s,i,a,o,u))));if(i[n]&&i[n].length)for(var A,m,w=i[n],b=w.length;b-- >0;)if(A=w[b].f-s,m=w[b].s-s,A>-1&&A<r.length&&m>A)return w.splice(b,1),"("===r[A]?new ParenthesisNode(e(t(y(r.slice(A+1,m),n+1,s+A+1,i,a,o,u)))):new FunctionNode(r[A],t(y(r.slice(A+2,m),n+1,s+A+2,i,a,o,u)));var P=r.join("");return P?new ConstantNode(P):[]}function v(t,e,r,n){t[e]||(t[e]=[]),t[e][r]||(t[e][r]=[]),t[e][r][r===x["**"]?"unshift":"push"](n.length)}function A(t,e,r){v(t,e,x["*"],r),r.push("*")}function m(r){r="("+r+")",g.lastIndex=0;for(var n,s,i,a,o,u=[],c=0,h="",l=0,p=0,N={},f={},d={},m={},w=x["!"],b={},P={},C={};o=g.exec(r);)switch(n=o[0]){case"[":p++;break;case"]":p--;break;default:if(0!==p)break;switch(o.index>c&&(s=r.slice(c,o.index).trim())&&(")"===h&&A(C,l,u),u.push(h=s)),n){case"(":f[l]||(f[l]=[]),f[l].push({f:u.length,s:-1}),!h||"("===h||x[h]>0||(r[o.index-1].trim()&&"NaN"!==h&&""+ +h=="NaN"?(i=f[l]&&e(f[l]))&&i.f--:(A(C,l,u),(i=f[l]&&e(f[l]))&&i.f++)),l++;break;case")":(i=f[--l]&&e(f[l]))&&(i.s=u.length,(N[l]||(N[l]=[])).push(f[l].pop()));break;default:switch(")"!==h||x[n]>0||(A(C,l,u),h="*"),n){case",":b[l]||(b[l]=[]),b[l].push(u.length);break;case"?":m[l]||(m[l]=[]),m[l].push({f:u.length,s:-1});break;case":":(i=m[l]&&e(m[l]))&&(i.s=u.length,(d[l]||(d[l]=[])).push(m[l].pop()));break;default:if("("===h||x[h]>0){if("-"!==n&&"!"!==n&&"~"!==n){c=o.index+n.length;continue}a=++w}else a=x[n];v(C,l,a,u)}}c=o.index+n.length,u.push(h=n)}for(var F in C){P[F]=[];for(var k=C[F],O=k.length;O-- >0;)k[O]&&Array.prototype.push.apply(P[F],k[O])}return new ProgramNode(e(t(y(u.slice(1,-1),1,1,N,d,b,P))))}exports.ConditionalNode=ConditionalNode,exports.ConstantNode=ConstantNode,exports.FunctionNode=FunctionNode,exports.OperatorNode=OperatorNode,exports.ParenthesisNode=ParenthesisNode,exports.ProgramNode=ProgramNode,exports.add=p,exports.create=m,exports.default=m,exports.div=h,exports.exp=o,exports.mul=c,exports.num2raw=i,exports.raw2num=a,exports.rem=l,exports.sub=N;
