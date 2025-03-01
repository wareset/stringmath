/* eslint-disable */
function t(t){return t?t.toArray():[NaN]}function e(t,e){return t?t.calculate.apply(t,e):NaN}function r(t){return"function"==typeof t}var n=Object.hasOwn||function(t,e){return Object.prototype.hasOwnProperty.call(t,e)};class ProgramNode{constructor(t){this.type="Program",this.nodeChild=t}toArray(){return t(this.nodeChild)}toString(){return""+(this.nodeChild||NaN)}calculate(...t){return e(this.nodeChild,t)}}class ConditionNode{constructor(t,e,r){this.type="Condition",this.nodeIf=t,this.nodeThen=e,this.nodeElse=r}toArray(){return["("].concat(t(this.nodeIf),"?",t(this.nodeThen),":",t(this.nodeElse),")")}toString(){return`(${this.nodeIf||NaN} ? ${this.nodeThen||NaN} : ${this.nodeElse||NaN})`}calculate(...t){return e(this.nodeIf,t)?e(this.nodeThen,t):e(this.nodeElse,t)}}class VariableNode{constructor(t){this.type="Variable",this.variable=t}toArray(){return[this.variable]}toString(){return""+this.variable}calculate(...t){for(var e,r=t.length,a=this.variable;r-- >0;)if(n(e=t[r],a))return e[a];return NaN}}class ConstantNode{constructor(t){this.type="Constant",this.constant=t}toArray(){return[this.constant]}toString(){return""+this.constant}calculate(){return this.constant}}class FunctionNode{constructor(t,e){this.type="Function",this.function=t,this.nodeListOfArgs=e}toArray(){return[this.function+"("].concat(Array.prototype.concat.apply([],this.nodeListOfArgs.map((function(e,r){return 0===r?t(e):[","].concat(t(e))}))),")")}toString(){return`${this.function}(${this.nodeListOfArgs.join(", ")})`}calculate(...t){for(var e,a=this.function,o=t.length;o-- >0;)if(n(e=t[o],a)&&r(e=e[a]))return e.apply(void 0,this.nodeListOfArgs.map((function(t){return t?t.calculate.apply(t,this):NaN}),t));return NaN}}class OperatorNode{constructor(t,e,r){this.type="Operator",this.operator=t,this.nodeLeft=e,this.nodeRight=r}toArray(){var e=this.operator,r=this.nodeLeft,n=this.nodeRight;return n?r?"!"===e||"~"===e?[NaN]:["("].concat(t(r),e,t(n),")"):"!"===e||"~"===e||"-"===e||"+"===e?[e].concat(t(n)):t(n):t(r)}toString(){var t=this.operator,e=this.nodeLeft,r=this.nodeRight,n=""+(e||NaN),a=""+(r||NaN);return r?e?"!"===t||"~"===t?"NaN":`(${n} ${t} ${a})`:"!"===t||"~"===t||"-"===t||"+"===t?t+a:a:n}calculate(...t){var a=this.operator,o=this.nodeLeft,s=this.nodeRight,i=e(o,t);if(!s)return i;for(var c,u,h=e(s,t),l=t.length;l-- >0;)if(n(u=t[l],a)&&r(u=u[a])){c=u;break}if(!o){switch(a){case"!":return c?c(h):+!+h;case"~":return c?c(h):~+h;case"+":return c?c(void 0,h):+h;case"-":return c?c(void 0,h):-h}return h}if(c)return c(i,h);switch(i=+i,h=+h,a){case"**":return Math.pow(i,h);case"*":return i*h;case"/":return i/h;case"%":return i%h;case"+":return i+h;case"-":return i-h;case"<<":return i<<h;case">>":return i>>h;case">>>":return i>>>h;case"<":return i<h?1:0;case"<=":return i<=h?1:0;case">":return i>h?1:0;case">=":return i>=h?1:0;case"==":return i==h?1:0;case"=":case"===":return i===h?1:0;case"!=":return i!=h?1:0;case"!==":return i!==h?1:0;case"&":return i&h;case"^":return i^h;case"|":return i|h;case"&&":return i?h:i;case"||":return i||h;case"??":return i==i?i:h}return NaN}}var a=/\?\??|\|\|?|\*\*?|&&?|<<|>>>?|[!=]=?=?|[<>]=?|(?<!\d\.?[eE])[-+]|[-+](?!\d)|[,:~^%/()[\]]/g,o={"!":14,"~":14,"**":13,"*":12,"/":12,"%":12,"+":11,"-":11,"<<":10,">>":10,">>>":10,"<":9,"<=":9,">":9,">=":9,"=":8,"==":8,"!=":8,"===":8,"!==":8,"&":7,"^":6,"|":5,"&&":4,"||":3,"??":3,"?":2,":":2,",":1};function s(t){return t[t.length-1]}function i(t,e,r,n,a,o,c){var u,h,l,d;if(o[e]&&o[e].length)for(h=(u=o[e]).length;h-- >0;)if((l=u[h]-r)>-1&&l<t.length)return u.splice(h,1),[].concat(i(t.slice(0,l),e,r,n,a,o,c),i(t.slice(l+1),e,r+l+1,n,a,o,c));if(a[e]&&a[e].length)for(h=(u=a[e]).length;h-- >0;)if((l=u[h].f-r)>-1&&l<t.length&&(d=u[h].s-r)>l){u.splice(h,1);var f=s([].concat(i(t.slice(d+1),e,r+d+1,n,a,o,c))),p=s([].concat(i(t.slice(l+1,d),e,r+l+1,n,a,o,c))),N=s([].concat(i(t.slice(0,l),e,r,n,a,o,c)));return new ConditionNode(N,p,f)}if(c[e]&&c[e].length)for(h=(u=c[e]).length;h-- >0;)if((l=u[h]-r)>-1&&l<t.length){u.splice(h,1);var g=s([].concat(i(t.slice(l+1),e,r+l+1,n,a,o,c))),y=s([].concat(i(t.slice(0,l),e,r,n,a,o,c)));return new OperatorNode(t[l],y,g)}if(n[e]&&n[e].length)for(h=(u=n[e]).length;h-- >0;)if((l=u[h].f-r)>-1&&l<t.length&&(d=u[h].s-r)>l)return u.splice(h,1),"("===t[l]?s([].concat(i(t.slice(l+1,d),e+1,r+l+1,n,a,o,c))):new FunctionNode(t[l],[].concat(i(t.slice(l+2,d),e+1,r+l+2,n,a,o,c)));return(d=t.join(""))?(l=+d)!==l&&"NaN"!==d?new VariableNode(d):new ConstantNode(l):[]}function c(t,e,r,n){t[e]||(t[e]=[]),t[e][r]||(t[e][r]=[]),t[e][r][r===o["**"]?"unshift":"push"](n.length)}function u(t,e,r){c(t,e,o["*"],r),r.push("*")}function h(t){t="("+t+")",a.lastIndex=0;for(var e,r,n,h,l,d=[],f=0,p="",N=0,g=0,y={},v={},b={},w={},A=o["!"],C={},O={},k={};l=a.exec(t);)switch(e=l[0]){case"[":g++;break;case"]":g--;break;default:if(0!==g)break;switch(l.index>f&&(r=t.slice(f,l.index).trim())&&(")"===p&&u(k,N,d),d.push(p=r)),e){case"(":(v[N]||(v[N]=[])).push({f:d.length,s:-1}),!p||"("===p||o[p]>0||(t[l.index-1].trim()&&"NaN"!==p&&""+ +p=="NaN"?(n=v[N]&&s(v[N]))&&n.f--:(u(k,N,d),(n=v[N]&&s(v[N]))&&n.f++)),N++;break;case")":(n=v[--N]&&s(v[N]))&&(n.s=d.length,(y[N]||(y[N]=[])).push(v[N].pop()));break;default:switch(")"!==p||o[e]>0||(u(k,N,d),p="*"),e){case",":(C[N]||(C[N]=[])).push(d.length);break;case"?":(w[N]||(w[N]=[])).push({f:d.length,s:-1});break;case":":(n=w[N]&&s(w[N]))&&(n.s=d.length,(b[N]||(b[N]=[])).push(w[N].pop()));break;default:if("("===p||o[p]>0){if("+"!==e&&"-"!==e&&"!"!==e&&"~"!==e){f=l.index+e.length;continue}h=++A}else h=o[e];c(k,N,h,d)}}f=l.index+e.length,d.push(p=e)}var m=Array.prototype.push;for(var x in k){O[x]=[];for(var L=k[x],$=L.length;$-- >0;)L[$]&&m.apply(O[x],L[$])}return new ProgramNode(s([].concat(i(d.slice(1,-1),1,1,y,b,C,O))))}export{ConditionNode,ConstantNode,FunctionNode,OperatorNode,ProgramNode,VariableNode,h as default};
