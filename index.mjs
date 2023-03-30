/* eslint-disable */
var e=Math.pow,t=Array,n=t.prototype;function r(){return n.concat.apply([],arguments)}function i(e){return e[e.length-1]}var s=RegExp,c=Object,a=c.keys,u=c.create,o=t.isArray,p=c.defineProperty,f=c.setPrototypeOf;function l(e,t){return l=f?f.bind():function(e,t){return e.__proto__=t,e},l(e,t)}function h(){h=function(e,t){return new n(e,void 0,t)};var e=s.prototype,t=new WeakMap;function n(e,r,i){var c=new s(e,r);return t.set(c,i||t.get(e)),l(c,n.prototype)}function r(e,n){var r=t.get(n);return a(r).reduce((function(t,n){var i=r[n];if("number"==typeof i)t[n]=e[i];else{for(var s=0;void 0===e[i[s]]&&s+1<i.length;)s++;t[n]=e[i[s]]}return t}),u(null))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=u(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),p(e,"prototype",{writable:!1}),t&&l(e,t)}(n,s),n.prototype.exec=function(t){var n=e.exec.call(this,t);if(n){n.groups=r(n,this);var i=n.indices;i&&(i.groups=r(i,this))}return n},n.prototype[Symbol.replace]=function(n,i){if("string"==typeof i){var s=t.get(this);return e[Symbol.replace].call(this,n,i.replace(/\$<([^>]+)>/g,(function(e,t){var n=s[t];return"$"+(o(n)?n.join("$"):n)})))}if("function"==typeof i){var c=this;return e[Symbol.replace].call(this,n,(function(){var e=arguments;return"object"!=typeof e[e.length-1]&&(e=[].slice.call(e)).push(r(e,c)),i.apply(this,e)}))}return e[Symbol.replace].call(this,n,i)},h.apply(this,arguments)}var g=h(/^(\x2D?)((?:NaN)?)((?:Infinity)?)(\d*)[.,]?(\d*)e?([-+]?\d*)n?$/i,{neg:1,nan:2,inf:3,int:4,frc:5,exp:6}),y=/^0+/;function v(e){var t=(+e+"").match(g).groups,n=t.int,r=t.frc;return t.nan=!!t.nan,t.neg="-"===t.neg,t.inf=!!t.inf,t.int=(n+r).replace(y,""),t.exp=+t.exp-r.length,delete t.frc,t}function x(e){return e.nan?NaN:e.inf?e.neg?-1/0:1/0:e.neg?0-+((e.int||"0")+"e"+e.exp):+((e.int||"0")+"e"+e.exp)}function d(e,t){var n=v(e),r=v(t),i=n.exp,s=r.exp,c=(i>s?s-i:i-s)||i;n.exp-=c,r.exp-=c;var a=v(x(n)*x(r));return a.exp+=c+c,x(a)}function N(e,t){var n=v(e),r=v(t),i=n.exp,s=r.exp,c=(i>s?s-i:i-s)||i;return n.exp-=c,r.exp-=c,x(n)/x(r)}function b(e,t){var n=v(e),r=v(t),i=n.exp,s=r.exp,c=(i>s?s-i:i-s)||i;n.exp-=c,r.exp-=c;var a=v(x(n)%x(r));return a.exp+=c,x(a)}function w(e,t){var n=v(e),r=v(t),i=n.exp,s=r.exp,c=(i>s?s-i:i-s)||i;n.exp-=c,r.exp-=c;var a=v(x(n)+x(r));return a.exp+=c,x(a)}function m(e,t){return w(e,-t)}var k=/\?\??|\|\|?|\*\*?|&&?|<<|>>>?|[!=]=?=?|[<>]=?|(?<!\d\.?[eE])[-+]|[,:~^%/()[\]]/g,P=function(){function e(e){this.type="Program",this.is=e}return e.prototype.calc=function(e,t){return this.is?this.is.calc(e,t):NaN},e}(),$=function(){function e(e){this.type="Parenthesis",this.is=e}return e.prototype.calc=function(e,t){return this.is?this.is.calc(e,t):NaN},e}(),S=function(){function e(e,t,n){this.type="Conditional",this.is=n,this.isTrue=t,this.isFalse=e}return e.prototype.calc=function(e,t){var n=this.is,r=(this.isTrue,this.isFalse);return n?n.calc(e,t):r?r.calc(e,t):NaN},e}(),j=function(){function e(e){this.type="Constant",this.is=e}return e.prototype.calc=function(e,t){var n=this.is;return+(t&&n in t&&"function"!=typeof t[n]?t[n]:e&&n in e&&"function"!=typeof e[n]?e[n]:n)},e}();function A(e){return e.calc(this[0],this[1])}var C=function(){function e(e,t){this.type="Function",this.is=e,this.isArgs=t}return e.prototype.calc=function(e,t){var n=this.is,r=t&&n in t&&"function"==typeof t[n]?t[n]:e&&n in e&&"function"==typeof e[n]?e[n]:NaN;return r&&+r.apply(void 0,this.isArgs.map(A,[e,t]))},e}(),F=function(){function t(e,t,n){this.type="Operator",this.is=e,this.isLeft=n,this.isRight=t}return t.prototype.calc=function(t,n){var r=this.is,i=this.isLeft,s=this.isRight,c=i?i.calc(t,n):NaN,a=s?s.calc(t,n):NaN;if(!s)return i&&"%"===r?N(c,100):c;if(!i){if(s){if("-"===r)return-a;if("!"===r)return+!a;if("~"===r)return~a}return a}switch(r){case"**":return e(c,a);case"*":return d(c,a);case"/":return N(c,a);case"%":return b(c,a);case"+":return w(c,a);case"-":return w(c,-a);case"<<":return c<<a;case">>":return c>>a;case">>>":return c>>>a;case"<":return c<a?1:0;case"<=":return c<=a?1:0;case">":return c>a?1:0;case">=":return c>=a?1:0;case"=":case"==":case"===":return c===a?1:0;case"!=":case"!==":return c!==a?1:0;case"&":return c&a;case"^":return c^a;case"|":return c|a;case"&&":return c?a:c;case"||":return c||a;case"??":return c==c?c:a}return NaN},t}(),O={"!":14,"~":14,"**":13,"*":12,"/":12,"%":12,"+":11,"-":11,"<<":10,">>":10,">>>":10,"<":9,"<=":9,">":9,">=":9,"=":8,"==":8,"!=":8,"===":8,"!==":8,"&":7,"^":6,"|":5,"&&":4,"||":3,"??":3,"?":2,":":2,",":1};function _(e,t,n,s,c,a,u){if(a[t]&&a[t].length)for(var o,p=a[t],f=p.length;f-- >0;)if((o=p[f]-n)>-1&&o<e.length)return p.splice(f,1),r(_(e.slice(0,o),t,n,s,c,a,u),_(e.slice(o+1),t,n+o+1,s,c,a,u));if(c[t]&&c[t].length)for(var l,h,g=c[t],y=g.length;y-- >0;)if(l=g[y].f-n,h=g[y].s-n,l>-1&&l<e.length&&h>l)return g.splice(y,1),new S(i(r(_(e.slice(h+1),t,n+h+1,s,c,a,u))),i(r(_(e.slice(l+1,h),t,n+l+1,s,c,a,u))),i(r(_(e.slice(0,l),t,n,s,c,a,u))));if(u[t]&&u[t].length)for(var v,x=u[t],d=x.length;d-- >0;)if((v=x[d]-n)>-1&&v<e.length){if(d>0&&(O[e[v-1]]&&"%"!==e[v-1]||"%"===e[v]&&(!e[v+1]||O[e[v+1]])))continue;return x.splice(d,1),new F(e[v],i(r(_(e.slice(v+1),t,n+v+1,s,c,a,u))),i(r(_(e.slice(0,v),t,n,s,c,a,u))))}if(s[t]&&s[t].length)for(var N,b,w=s[t],m=w.length;m-- >0;)if(N=w[m].f-n,b=w[m].s-n,N>-1&&N<e.length&&b>N)return w.splice(m,1),"("===e[N]?new $(i(r(_(e.slice(N+1,b),t+1,n+N+1,s,c,a,u)))):new C(e[N],r(_(e.slice(N+2,b),t+1,n+N+2,s,c,a,u)));var k=e.join("");return k?new j(k):[]}function E(e,t,n,r){e[t]||(e[t]=[]),e[t][n]||(e[t][n]=[]),e[t][n][n===O["**"]?"unshift":"push"](r.length)}function R(e,t,n){E(e,t,O["*"],n),n.push("*")}function T(e){e="("+e+")",k.lastIndex=0;for(var t,s,c,a,u=[],o=0,p="",f=0,l=0,h={},g={},y={},v={},x={},d={},N={};a=k.exec(e);)switch(t=a[0]){case"[":l++;break;case"]":l--;break;default:if(0!==l)break;switch(a.index>o&&(s=e.slice(o,a.index).trim())&&(")"===p&&R(N,f,u),u.push(p=s)),t){case"(":g[f]||(g[f]=[]),g[f].push({f:u.length,s:-1}),p&&(/^[a-z][$\w]*$/.test(p)?(c=g[f]&&i(g[f]))&&c.f--:"("===p||O[p]||(R(N,f,u),(c=g[f]&&i(g[f]))&&c.f++)),f++;break;case")":(c=g[--f]&&i(g[f]))&&(c.s=u.length,(h[f]||(h[f]=[])).push(g[f].pop()));break;default:switch(")"!==p||O[t]||(R(N,f,u),p="*"),t){case",":x[f]||(x[f]=[]),x[f].push(u.length);break;case"?":v[f]||(v[f]=[]),v[f].push({f:u.length,s:-1});break;case":":(c=v[f]&&i(v[f]))&&(c.s=u.length,(y[f]||(y[f]=[])).push(v[f].pop()));break;default:E(N,f,O[t],u)}}u.push(p=t),o=a.index+t.length}for(var b in N){d[b]=[];for(var w=N[b],m=w.length;m-- >0;)w[m]&&n.push.apply(d[b],w[m])}return new P(i(r(_(u.slice(1,-1),1,1,h,y,x,d))))}export{S as NodeConditional,j as NodeConstant,C as NodeFunction,F as NodeOperator,$ as NodeParenthesis,P as NodeProgram,w as add,T as create,T as default,N as div,d as mul,v as num2raw,x as raw2num,b as rem,m as sub};
