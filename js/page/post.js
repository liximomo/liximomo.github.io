!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="http://localhost:4001/js/page/",e(e.s=9)}([function(t,e,n){"use strict";function o(t,e,n,o){return t.addEventListener?void t.addEventListener(e,n,o):void t.attachEvent("on"+e,function(){n.call(t)})}function i(t,e,o,i,s){var a=void 0!==s&&s,f=n.i(r.a)(t)?[t]:document.querySelectorAll(t),l=function(t){t.addEventListener(e,function(t){for(var e=t.target;e&&e!==this;e=e.parentNode){var n=!1;if(e.matches?n=e.matches(o):e.webkitMatchesSelector?n=e.webkitMatchesSelector(o):e.mozMatchesSelector?n=e.mozMatchesSelector(o):e.msMatchesSelector?n=e.msMatchesSelector(o):e.oMatchesSelector&&(n=e.oMatchesSelector(o)),n){i.call(e,t);break}}},a)};Array.prototype.forEach.call(f,l)}var r=n(1);e.a=o,e.b=i},function(t,e,n){"use strict";function o(t){var e=document.createElement("div");e.innerHTML=t.replace(/^\s+|\s+$/g,"");var n=void 0;return n=1===e.childNodes.length?e.childNodes[0]:Array.prototype.slice.call(e.childNodes),e.innerHTML="",n}function i(t){return"object"===("undefined"==typeof HTMLElement?"undefined":r(HTMLElement))?t instanceof HTMLElement:t&&"object"===("undefined"==typeof t?"undefined":r(t))&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName}e.b=o,e.a=i;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t}},function(t,e,n){"use strict";function o(t){return t.replace(t[0],t[0].toUpperCase())}function i(t){var e={},n=["transition","webkitTransition","mozTransition","OTransition"],o=["transform","webkitTransform","mozTransform","OTransform"],i={transition:"transitionend",mozTransition:"transitionend",webkitTransition:"webkitTransitionEnd",OTransition:"oTransitionEnd"};return n.some(function(n){if(void 0!==t.style[n])return e.transitionProp=n,e.transEndEvent=i[n],!0}),o.some(function(n){if(void 0!==t.style[n])return e.transformProp=n,e.transformCssProp=n.replace(/(.*)Transform/,"-$1-transform"),!0}),e}function r(t,e,n){var i=t.style,r={},a=function(t){n&&(r[t]=i[t]||""),s.forEach(function(n){return i[""+n+o(t)]=e[t]}),i[t]=e[t]};for(var f in e)a(f);return r}e.a=r,n.d(e,"b",function(){return f});var s=["webkit","moz","ms","o"],a=document.createElement("div"),f=i(a);a=null},function(t,e,n){"use strict";function o(){var t=document,e=t.createElement("script");e.src="//l-x.disqus.com/embed.js",e.setAttribute("data-timestamp",+new Date),(t.head||t.body).appendChild(e)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(6),s=(n(7),n(2)),a=n(4);new a.a(".post","tooltip",{selector:"[data-tooltip]",classPrefix:"tooltip",template:'<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',renderTemplate:function(t,e){t.querySelector(".tooltip-inner").textContent=e.getAttribute("data-tooltip")}});var f=document.querySelector("#siteHeader"),l=document.querySelector("#headerBar"),h=document.querySelector("#hugeTitle"),c=f.clientHeight,u=l.clientHeight,d=getComputedStyle(h),p=parseInt(d.top,10),g=p-u+14,m=c-u,v=document.querySelector("#disqus_thread"),y=n.i(r.a)(v).y,b=y-window.innerHeight,w=!1,C=0,E=new i.a;E.updateContext(function(t){var e={},n=window.scrollY;return e.windowY=n,e.offsetY=n-C,C=n,e}).action(function(t){var e=t.windowY;t.offsetY;e>m?n.i(s.a)(l,{background:"inherit"}):n.i(s.a)(l,{background:"transparent"}),e>g?f.classList.add("is-reveal"):f.classList.remove("is-reveal")}).action(function(t){var e=t.windowY,n=t.offsetY;e<c?l.classList.remove("is-hidden"):n>0?l.classList.add("is-hidden"):Math.abs(n)>=20&&l.classList.remove("is-hidden")}).action(function(t){t.windowY,t.offsetY;!w&&scrollY>b&&(o(),w=!0)}).attachTo(window,"scroll")},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(8),r=n.n(i),s=n(1),a=n(0),f=n(2),l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c={target:!1,enabled:!1,pinned:!1,abutted:!1,"out-of-bounds":!1},u={left:"right",right:"left",top:"bottom",bottom:"top",middle:"middle",center:"center"},d={triggers:["hover","click"],selector:null,classPrefix:"popover",template:'<div class="popover" role="popover"><div class="popover-inner"></div></div>',renderTemplate:function(t,e){t.querySelector(".popover-inner").textContent=e.getAttribute("data-content")},attachment:"top center",delay:0,duration:.2,offset:"0 0",container:document.body},p=function(){function t(e,i){var r=this;o(this,t),this.ishover=!1,this.pending=!1,this.status=-1,this.pendingAction=null,this.timeout=null,this.config=i,this.container=this.config.container,this.target=e,this.pop=n.i(s.b)(this.config.template),this.pop.style.opacity=0,this.pop.style[f.b.transitionProp]="opacity "+this.config.duration+"s cubic-bezier(0.4, 0, 0, 1)",this.config.renderTemplate(this.pop,this.target);var a=this.config.attachment.split(" ");a[0]=u[a[0]],a=a.join(" "),this.dropAttach=a,this.complete=null,this._transEnd=function(){r.pending=!1,r.complete&&r.complete(),("hide"===r.pendingAction&&r.status||"show"===r.pendingAction&&!r.status)&&r.timeout(),r.timeout=null,r.pendingAction=null},this.pop.addEventListener(f.b.transEndEvent,this._transEnd)}return h(t,[{key:"show",value:function(t){var e=this;if(this.pending)return this.pendingAction="show",void(this.timeout=function(){return e.show(t)});if(this.pending=!0,this.complete=function(){e.status=1},"hover"===t.name)this.ishover=!0;else if("click"===t.name&&this.ishover)return;this.container.appendChild(this.pop),this.tether=new r.a({element:this.pop,target:this.target,attachment:this.dropAttach,targetAttachment:this.config.attachment,classes:c,classPrefix:this.config.classPrefix,offset:this.config.offset,constraints:this.config.constraints}),this.tether.position(),setTimeout(function(){e.pop.style.opacity=.9},this.config.delay)}},{key:"hide",value:function(t){var e=this;return this.pending?(this.pendingAction="hide",void(this.timeout=function(){return e.hide(t)})):(this.pending=!0,this.complete=function(){e.status=0,e.container.removeChild(e.pop)},"hover"===t.name?this.ishover=!1:"click"===t.name,this.tether.destroy(),void(this.pop.style.opacity=0))}}]),t}(),g=function(){function t(e,n,i){o(this,t),"string"==typeof e?this.elements=document.querySelectorAll(e):this.elements=[].concat(e),this.config=l({},d,i),this.elements.forEach(this._setListeners.bind(this))}return h(t,[{key:"_toggle",value:function(t,e){var n=this._getElementContext(t);n.isShow?this._enter(t,e):this._leave(t,e)}},{key:"_enter",value:function(t,e){var n=this._getElementContext(t);n.show(e)}},{key:"_leave",value:function(t,e){var n=this._getElementContext(t);n.hide(e)}},{key:"_getElementContext",value:function(t){return t._popContext||(t._popContext=new p(t,this.config)),t._popContext}},{key:"_setListeners",value:function(t){var e=this,n=this;this.config.triggers.forEach(function(o){if("click"===o)e._setListener(t,o,function(){n._toggle(this,{name:"click"})});else if("hover"===o){var i="mouseover",r="mouseout";e._setListener(t,i,function(){n._enter(this,{name:"hover"})}),e._setListener(t,r,function(){n._leave(this,{name:"hover"})})}})}},{key:"_setListener",value:function(t,e,o){this.config.selector?n.i(a.b)(t,e,this.config.selector,o):n.i(a.a)(t,e,o)}}]),t}();e.a=g},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(0),r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();window.requestAnimFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};var s=function(){function t(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=n.eventName,r=n.hooks,s=void 0===r?[]:r,a=n.updateContext,f=void 0===a?function(){}:a,l=n.element;o(this,t),this.handle=function(t){e.context=e.nextContext.call(e.element,t),e.requestTick()},this.eventName=i,this.hooks=[].concat(s),this.nextContext=f,this.context={},this.ticking=!1,this.element=l}return r(t,[{key:"attachTo",value:function(t,e){return this.element=t,this.eventName=e,n.i(i.a)(this.element,this.eventName,this.handle,!1),this}},{key:"updateContext",value:function(t){return this.nextContext=t,this}},{key:"action",value:function(t){return this.hooks=this.hooks.concat(t),this}},{key:"requestTick",value:function(){this.ticking||window.requestAnimFrame(this.update.bind(this)),this.ticking=!0}},{key:"update",value:function(){var t=this;this.ticking=!1,this.hooks.forEach(function(e){return e.call(t.element,t.context)})}}]),t}();e.a=s},function(t,e,n){"use strict";function o(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,n=0,o=0;t&&t!==e;){if("BODY"==t.tagName){var i=t.scrollLeft||document.documentElement.scrollLeft,r=t.scrollTop||document.documentElement.scrollTop;n+=t.offsetLeft-i+t.clientLeft,o+=t.offsetTop-r+t.clientTop}else n+=t.offsetLeft-t.scrollLeft+t.clientLeft,o+=t.offsetTop-t.scrollTop+t.clientTop;t=t.offsetParent}return{x:n,y:o}}e.a=o},function(t,e,n){"use strict"},function(t,e,n){var o,i;/*! tether 1.4.0 */
!function(r,s){o=s,i="function"==typeof o?o.call(e,n,e,t):o,!(void 0!==i&&(t.exports=i))}(this,function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){var e=t.getBoundingClientRect(),n={};for(var o in e)n[o]=e[o];if(t.ownerDocument!==document){var r=t.ownerDocument.defaultView.frameElement;if(r){var s=i(r);n.top+=s.top,n.bottom+=s.top,n.left+=s.left,n.right+=s.left}}return n}function r(t){var e=getComputedStyle(t)||{},n=e.position,o=[];if("fixed"===n)return[t];for(var i=t;(i=i.parentNode)&&i&&1===i.nodeType;){var r=void 0;try{r=getComputedStyle(i)}catch(t){}if("undefined"==typeof r||null===r)return o.push(i),o;var s=r,a=s.overflow,f=s.overflowX,l=s.overflowY;/(auto|scroll)/.test(a+l+f)&&("absolute"!==n||["relative","absolute","fixed"].indexOf(r.position)>=0)&&o.push(i)}return o.push(t.ownerDocument.body),t.ownerDocument!==document&&o.push(t.ownerDocument.defaultView),o}function s(){T&&document.body.removeChild(T),T=null}function a(t){var e=void 0;t===document?(e=document,t=document.documentElement):e=t.ownerDocument;var n=e.documentElement,o=i(t),r=S();return o.top-=r.top,o.left-=r.left,"undefined"==typeof o.width&&(o.width=document.body.scrollWidth-o.left-o.right),"undefined"==typeof o.height&&(o.height=document.body.scrollHeight-o.top-o.bottom),o.top=o.top-n.clientTop,o.left=o.left-n.clientLeft,o.right=e.body.clientWidth-o.width-o.left,o.bottom=e.body.clientHeight-o.height-o.top,o}function f(t){return t.offsetParent||document.documentElement}function l(){if(_)return _;var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");h(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);var n=t.offsetWidth;e.style.overflow="scroll";var o=t.offsetWidth;n===o&&(o=e.clientWidth),document.body.removeChild(e);var i=n-o;return _={width:i,height:i}}function h(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=[];return Array.prototype.push.apply(e,arguments),e.slice(1).forEach(function(e){if(e)for(var n in e)({}).hasOwnProperty.call(e,n)&&(t[n]=e[n])}),t}function c(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.remove(e)});else{var n=new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi"),o=p(t).replace(n," ");g(t,o)}}function u(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.add(e)});else{c(t,e);var n=p(t)+(" "+e);g(t,n)}}function d(t,e){if("undefined"!=typeof t.classList)return t.classList.contains(e);var n=p(t);return new RegExp("(^| )"+e+"( |$)","gi").test(n)}function p(t){return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString?t.className.baseVal:t.className}function g(t,e){t.setAttribute("class",e)}function m(t,e,n){n.forEach(function(n){e.indexOf(n)===-1&&d(t,n)&&c(t,n)}),e.forEach(function(e){d(t,e)||u(t,e)})}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function y(t,e){var n=arguments.length<=2||void 0===arguments[2]?1:arguments[2];return t+n>=e&&e>=t-n}function b(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function w(){for(var t={top:0,left:0},e=arguments.length,n=Array(e),o=0;o<e;o++)n[o]=arguments[o];return n.forEach(function(e){var n=e.top,o=e.left;"string"==typeof n&&(n=parseFloat(n,10)),"string"==typeof o&&(o=parseFloat(o,10)),t.top+=n,t.left+=o}),t}function C(t,e){return"string"==typeof t.left&&t.left.indexOf("%")!==-1&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&t.top.indexOf("%")!==-1&&(t.top=parseFloat(t.top,10)/100*e.height),t}function E(t,e){return"scrollParent"===e?e=t.scrollParents[0]:"window"===e&&(e=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),e===document&&(e=e.documentElement),"undefined"!=typeof e.nodeType&&!function(){var t=e,n=a(e),o=n,i=getComputedStyle(e);if(e=[o.left,o.top,n.width+o.left,n.height+o.top],t.ownerDocument!==document){var r=t.ownerDocument.defaultView;e[0]+=r.pageXOffset,e[1]+=r.pageYOffset,e[2]+=r.pageXOffset,e[3]+=r.pageYOffset}G.forEach(function(t,n){t=t[0].toUpperCase()+t.substr(1),"Top"===t||"Left"===t?e[n]+=parseFloat(i["border"+t+"Width"]):e[n]-=parseFloat(i["border"+t+"Width"])})}(),e}var O=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),x=void 0;"undefined"==typeof x&&(x={modules:[]});var T=null,k=function(){var t=0;return function(){return++t}}(),A={},S=function(){var t=T;t&&document.body.contains(t)||(t=document.createElement("div"),t.setAttribute("data-tether-id",k()),h(t.style,{top:0,left:0,position:"absolute"}),document.body.appendChild(t),T=t);var e=t.getAttribute("data-tether-id");return"undefined"==typeof A[e]&&(A[e]=i(t),M(function(){delete A[e]})),A[e]},_=null,L=[],M=function(t){L.push(t)},P=function(){for(var t=void 0;t=L.pop();)t()},j=function(){function t(){o(this,t)}return O(t,[{key:"on",value:function(t,e,n){var o=!(arguments.length<=3||void 0===arguments[3])&&arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[t]&&(this.bindings[t]=[]),this.bindings[t].push({handler:e,ctx:n,once:o})}},{key:"once",value:function(t,e,n){this.on(t,e,n,!0)}},{key:"off",value:function(t,e){if("undefined"!=typeof this.bindings&&"undefined"!=typeof this.bindings[t])if("undefined"==typeof e)delete this.bindings[t];else for(var n=0;n<this.bindings[t].length;)this.bindings[t][n].handler===e?this.bindings[t].splice(n,1):++n}},{key:"trigger",value:function(t){if("undefined"!=typeof this.bindings&&this.bindings[t]){for(var e=0,n=arguments.length,o=Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];for(;e<this.bindings[t].length;){var r=this.bindings[t][e],s=r.handler,a=r.ctx,f=r.once,l=a;"undefined"==typeof l&&(l=this),s.apply(l,o),f?this.bindings[t].splice(e,1):++e}}}}]),t}();x.Utils={getActualBoundingClientRect:i,getScrollParents:r,getBounds:a,getOffsetParent:f,extend:h,addClass:u,removeClass:c,hasClass:d,updateClasses:m,defer:M,flush:P,uniqueId:k,Evented:j,getScrollBarSize:l,removeUtilElements:s};var Y=function(){function t(t,e){var n=[],o=!0,i=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);o=!0);}catch(t){i=!0,r=t}finally{try{!o&&a.return&&a.return()}finally{if(i)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),O=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),z=function(t,e,n){for(var o=!0;o;){var i=t,r=e,s=n;o=!1,null===i&&(i=Function.prototype);var a=Object.getOwnPropertyDescriptor(i,r);if(void 0!==a){if("value"in a)return a.value;var f=a.get;if(void 0===f)return;return f.call(s)}var l=Object.getPrototypeOf(i);if(null===l)return;t=l,e=r,n=s,o=!0,a=l=void 0}};if("undefined"==typeof x)throw new Error("You must include the utils.js file before tether.js");var W=x.Utils,r=W.getScrollParents,a=W.getBounds,f=W.getOffsetParent,h=W.extend,u=W.addClass,c=W.removeClass,m=W.updateClasses,M=W.defer,P=W.flush,l=W.getScrollBarSize,s=W.removeUtilElements,H=function(){if("undefined"==typeof document)return"";for(var t=document.createElement("div"),e=["transform","WebkitTransform","OTransform","MozTransform","msTransform"],n=0;n<e.length;++n){var o=e[n];if(void 0!==t.style[o])return o}}(),q=[],B=function(){q.forEach(function(t){t.position(!1)}),P()};!function(){var t=null,e=null,n=null,o=function o(){return"undefined"!=typeof e&&e>16?(e=Math.min(e-16,250),void(n=setTimeout(o,250))):void("undefined"!=typeof t&&b()-t<10||(null!=n&&(clearTimeout(n),n=null),t=b(),B(),e=b()-t))};"undefined"!=typeof window&&"undefined"!=typeof window.addEventListener&&["resize","scroll","touchmove"].forEach(function(t){window.addEventListener(t,o)})}();var F={center:"center",left:"right",right:"left"},N={middle:"middle",top:"bottom",bottom:"top"},D={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},X=function(t,e){var n=t.left,o=t.top;return"auto"===n&&(n=F[e.left]),"auto"===o&&(o=N[e.top]),{left:n,top:o}},R=function(t){var e=t.left,n=t.top;return"undefined"!=typeof D[t.left]&&(e=D[t.left]),"undefined"!=typeof D[t.top]&&(n=D[t.top]),{left:e,top:n}},U=function(t){var e=t.split(" "),n=Y(e,2),o=n[0],i=n[1];return{top:o,left:i}},V=U,I=function(t){function e(t){var n=this;o(this,e),z(Object.getPrototypeOf(e.prototype),"constructor",this).call(this),this.position=this.position.bind(this),q.push(this),this.history=[],this.setOptions(t,!1),x.modules.forEach(function(t){"undefined"!=typeof t.initialize&&t.initialize.call(n)}),this.position()}return v(e,t),O(e,[{key:"getClass",value:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=this.options.classes;return"undefined"!=typeof e&&e[t]?this.options.classes[t]:this.options.classPrefix?this.options.classPrefix+"-"+t:t}},{key:"setOptions",value:function(t){var e=this,n=arguments.length<=1||void 0===arguments[1]||arguments[1],o={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=h(o,t);var i=this.options,s=i.element,a=i.target,f=i.targetModifier;if(this.element=s,this.target=a,this.targetModifier=f,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(t){if("undefined"==typeof e[t])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof e[t].jquery?e[t]=e[t][0]:"string"==typeof e[t]&&(e[t]=document.querySelector(e[t]))}),u(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&u(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=V(this.options.targetAttachment),this.attachment=V(this.options.attachment),this.offset=U(this.options.offset),this.targetOffset=U(this.options.targetOffset),"undefined"!=typeof this.scrollParents&&this.disable(),"scroll-handle"===this.targetModifier?this.scrollParents=[this.target]:this.scrollParents=r(this.target),this.options.enabled!==!1&&this.enable(n)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return a(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var t=a(this.target),e={height:t.height,width:t.width,top:t.top,left:t.left};return e.height=Math.min(e.height,t.height-(pageYOffset-t.top)),e.height=Math.min(e.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),e.height=Math.min(innerHeight,e.height),e.height-=2,e.width=Math.min(e.width,t.width-(pageXOffset-t.left)),e.width=Math.min(e.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),e.width=Math.min(innerWidth,e.width),e.width-=2,e.top<pageYOffset&&(e.top=pageYOffset),e.left<pageXOffset&&(e.left=pageXOffset),e}if("scroll-handle"===this.targetModifier){var t=void 0,n=this.target;n===document.body?(n=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=a(n);var o=getComputedStyle(n),i=n.scrollWidth>n.clientWidth||[o.overflow,o.overflowX].indexOf("scroll")>=0||this.target!==document.body,r=0;i&&(r=15);var s=t.height-parseFloat(o.borderTopWidth)-parseFloat(o.borderBottomWidth)-r,e={width:15,height:.975*s*(s/n.scrollHeight),left:t.left+t.width-parseFloat(o.borderLeftWidth)-15},f=0;s<408&&this.target===document.body&&(f=-11e-5*Math.pow(s,2)-.00727*s+22.58),this.target!==document.body&&(e.height=Math.max(e.height,24));var l=this.target.scrollTop/(n.scrollHeight-s);return e.top=l*(s-e.height-f)+t.top+parseFloat(o.borderTopWidth),this.target===document.body&&(e.height=Math.max(e.height,24)),e}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(t,e){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]}},{key:"enable",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]||arguments[0];this.options.addTargetClasses!==!1&&u(this.target,this.getClass("enabled")),u(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParents.forEach(function(e){e!==t.target.ownerDocument&&e.addEventListener("scroll",t.position)}),e&&this.position()}},{key:"disable",value:function(){var t=this;c(this.target,this.getClass("enabled")),c(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParents&&this.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.position)})}},{key:"destroy",value:function(){var t=this;this.disable(),q.forEach(function(e,n){e===t&&q.splice(n,1)}),0===q.length&&s()}},{key:"updateAttachClasses",value:function(t,e){var n=this;t=t||this.attachment,e=e||this.targetAttachment;var o=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var i=this._addAttachClasses;t.top&&i.push(this.getClass("element-attached")+"-"+t.top),t.left&&i.push(this.getClass("element-attached")+"-"+t.left),e.top&&i.push(this.getClass("target-attached")+"-"+e.top),e.left&&i.push(this.getClass("target-attached")+"-"+e.left);var r=[];o.forEach(function(t){r.push(n.getClass("element-attached")+"-"+t),r.push(n.getClass("target-attached")+"-"+t)}),M(function(){"undefined"!=typeof n._addAttachClasses&&(m(n.element,n._addAttachClasses,r),n.options.addTargetClasses!==!1&&m(n.target,n._addAttachClasses,r),delete n._addAttachClasses)})}},{key:"position",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]||arguments[0];if(this.enabled){this.clearCache();var n=X(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,n);var o=this.cache("element-bounds",function(){return a(t.element)}),i=o.width,r=o.height;if(0===i&&0===r&&"undefined"!=typeof this.lastSize){var s=this.lastSize;i=s.width,r=s.height}else this.lastSize={width:i,height:r};var h=this.cache("target-bounds",function(){return t.getTargetBounds()}),c=h,u=C(R(this.attachment),{width:i,height:r}),d=C(R(n),c),p=C(this.offset,{width:i,height:r}),g=C(this.targetOffset,c);u=w(u,p),d=w(d,g);for(var m=h.left+d.left-u.left,v=h.top+d.top-u.top,y=0;y<x.modules.length;++y){var b=x.modules[y],E=b.position.call(this,{left:m,top:v,targetAttachment:n,targetPos:h,elementPos:o,offset:u,targetOffset:d,manualOffset:p,manualTargetOffset:g,scrollbarSize:A,attachment:this.attachment});if(E===!1)return!1;"undefined"!=typeof E&&"object"==typeof E&&(v=E.top,m=E.left)}var O={page:{top:v,left:m},viewport:{top:v-pageYOffset,bottom:pageYOffset-v-r+innerHeight,left:m-pageXOffset,right:pageXOffset-m-i+innerWidth}},T=this.target.ownerDocument,k=T.defaultView,A=void 0;return k.innerHeight>T.documentElement.clientHeight&&(A=this.cache("scrollbar-size",l),O.viewport.bottom-=A.height),k.innerWidth>T.documentElement.clientWidth&&(A=this.cache("scrollbar-size",l),O.viewport.right-=A.width),["","static"].indexOf(T.body.style.position)!==-1&&["","static"].indexOf(T.body.parentElement.style.position)!==-1||(O.page.bottom=T.body.scrollHeight-v-r,O.page.right=T.body.scrollWidth-m-i),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var e=t.cache("target-offsetparent",function(){return f(t.target)}),n=t.cache("target-offsetparent-bounds",function(){return a(e)}),o=getComputedStyle(e),i=n,r={};if(["Top","Left","Bottom","Right"].forEach(function(t){r[t.toLowerCase()]=parseFloat(o["border"+t+"Width"])}),n.right=T.body.scrollWidth-n.left-i.width+r.right,n.bottom=T.body.scrollHeight-n.top-i.height+r.bottom,O.page.top>=n.top+r.top&&O.page.bottom>=n.bottom&&O.page.left>=n.left+r.left&&O.page.right>=n.right){var s=e.scrollTop,l=e.scrollLeft;O.offset={top:O.page.top-n.top+s-r.top,left:O.page.left-n.left+l-r.left}}}(),this.move(O),this.history.unshift(O),this.history.length>3&&this.history.pop(),e&&P(),!0}}},{key:"move",value:function(t){var e=this;if("undefined"!=typeof this.element.parentNode){var n={};for(var o in t){n[o]={};for(var i in t[o]){for(var r=!1,s=0;s<this.history.length;++s){var a=this.history[s];if("undefined"!=typeof a[o]&&!y(a[o][i],t[o][i])){r=!0;break}}r||(n[o][i]=!0)}}var l={top:"",left:"",right:"",bottom:""},c=function(t,n){var o="undefined"!=typeof e.options.optimizations,i=o?e.options.optimizations.gpu:null;if(i!==!1){var r=void 0,s=void 0;if(t.top?(l.top=0,r=n.top):(l.bottom=0,r=-n.bottom),t.left?(l.left=0,s=n.left):(l.right=0,s=-n.right),window.matchMedia){var a=window.matchMedia("only screen and (min-resolution: 1.3dppx)").matches||window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3)").matches;a||(s=Math.round(s),r=Math.round(r))}l[H]="translateX("+s+"px) translateY("+r+"px)","msTransform"!==H&&(l[H]+=" translateZ(0)")}else t.top?l.top=n.top+"px":l.bottom=n.bottom+"px",t.left?l.left=n.left+"px":l.right=n.right+"px"},u=!1;if((n.page.top||n.page.bottom)&&(n.page.left||n.page.right)?(l.position="absolute",c(n.page,t.page)):(n.viewport.top||n.viewport.bottom)&&(n.viewport.left||n.viewport.right)?(l.position="fixed",c(n.viewport,t.viewport)):"undefined"!=typeof n.offset&&n.offset.top&&n.offset.left?!function(){l.position="absolute";var o=e.cache("target-offsetparent",function(){return f(e.target)});f(e.element)!==o&&M(function(){e.element.parentNode.removeChild(e.element),o.appendChild(e.element)}),c(n.offset,t.offset),u=!0}():(l.position="absolute",c({top:!0,left:!0},t.page)),!u)if(this.options.bodyElement)this.options.bodyElement.appendChild(this.element);else{for(var d=!0,p=this.element.parentNode;p&&1===p.nodeType&&"BODY"!==p.tagName;){if("static"!==getComputedStyle(p).position){d=!1;break}p=p.parentNode}d||(this.element.parentNode.removeChild(this.element),this.element.ownerDocument.body.appendChild(this.element))}var g={},m=!1;for(var i in l){var v=l[i],b=this.element.style[i];b!==v&&(m=!0,g[i]=v)}m&&M(function(){h(e.element.style,g),e.trigger("repositioned")})}}}]),e}(j);I.modules=[],x.position=B;var $=h(I,x),Y=function(){function t(t,e){var n=[],o=!0,i=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);o=!0);}catch(t){i=!0,r=t}finally{try{!o&&a.return&&a.return()}finally{if(i)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),W=x.Utils,a=W.getBounds,h=W.extend,m=W.updateClasses,M=W.defer,G=["left","top","right","bottom"];x.modules.push({position:function(t){var e=this,n=t.top,o=t.left,i=t.targetAttachment;if(!this.options.constraints)return!0;var r=this.cache("element-bounds",function(){return a(e.element)}),s=r.height,f=r.width;if(0===f&&0===s&&"undefined"!=typeof this.lastSize){var l=this.lastSize;f=l.width,s=l.height}var c=this.cache("target-bounds",function(){return e.getTargetBounds()}),u=c.height,d=c.width,p=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(t){var e=t.outOfBoundsClass,n=t.pinnedClass;e&&p.push(e),n&&p.push(n)}),p.forEach(function(t){["left","top","right","bottom"].forEach(function(e){p.push(t+"-"+e)})});var g=[],v=h({},i),y=h({},this.attachment);return this.options.constraints.forEach(function(t){var r=t.to,a=t.attachment,l=t.pin;"undefined"==typeof a&&(a="");var h=void 0,c=void 0;if(a.indexOf(" ")>=0){var p=a.split(" "),m=Y(p,2);c=m[0],h=m[1]}else h=c=a;var b=E(e,r);"target"!==c&&"both"!==c||(n<b[1]&&"top"===v.top&&(n+=u,v.top="bottom"),n+s>b[3]&&"bottom"===v.top&&(n-=u,v.top="top")),"together"===c&&("top"===v.top&&("bottom"===y.top&&n<b[1]?(n+=u,v.top="bottom",n+=s,y.top="top"):"top"===y.top&&n+s>b[3]&&n-(s-u)>=b[1]&&(n-=s-u,v.top="bottom",y.top="bottom")),"bottom"===v.top&&("top"===y.top&&n+s>b[3]?(n-=u,v.top="top",n-=s,y.top="bottom"):"bottom"===y.top&&n<b[1]&&n+(2*s-u)<=b[3]&&(n+=s-u,v.top="top",y.top="top")),"middle"===v.top&&(n+s>b[3]&&"top"===y.top?(n-=s,y.top="bottom"):n<b[1]&&"bottom"===y.top&&(n+=s,y.top="top"))),"target"!==h&&"both"!==h||(o<b[0]&&"left"===v.left&&(o+=d,v.left="right"),o+f>b[2]&&"right"===v.left&&(o-=d,v.left="left")),"together"===h&&(o<b[0]&&"left"===v.left?"right"===y.left?(o+=d,v.left="right",o+=f,y.left="left"):"left"===y.left&&(o+=d,v.left="right",o-=f,y.left="right"):o+f>b[2]&&"right"===v.left?"left"===y.left?(o-=d,v.left="left",o-=f,y.left="right"):"right"===y.left&&(o-=d,v.left="left",o+=f,y.left="left"):"center"===v.left&&(o+f>b[2]&&"left"===y.left?(o-=f,y.left="right"):o<b[0]&&"right"===y.left&&(o+=f,y.left="left"))),"element"!==c&&"both"!==c||(n<b[1]&&"bottom"===y.top&&(n+=s,y.top="top"),n+s>b[3]&&"top"===y.top&&(n-=s,y.top="bottom")),"element"!==h&&"both"!==h||(o<b[0]&&("right"===y.left?(o+=f,y.left="left"):"center"===y.left&&(o+=f/2,y.left="left")),o+f>b[2]&&("left"===y.left?(o-=f,y.left="right"):"center"===y.left&&(o-=f/2,y.left="right"))),"string"==typeof l?l=l.split(",").map(function(t){return t.trim()}):l===!0&&(l=["top","left","right","bottom"]),l=l||[];var w=[],C=[];n<b[1]&&(l.indexOf("top")>=0?(n=b[1],w.push("top")):C.push("top")),n+s>b[3]&&(l.indexOf("bottom")>=0?(n=b[3]-s,w.push("bottom")):C.push("bottom")),o<b[0]&&(l.indexOf("left")>=0?(o=b[0],w.push("left")):C.push("left")),o+f>b[2]&&(l.indexOf("right")>=0?(o=b[2]-f,w.push("right")):C.push("right")),w.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.pinnedClass?e.options.pinnedClass:e.getClass("pinned"),g.push(t),w.forEach(function(e){g.push(t+"-"+e)})}(),C.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.outOfBoundsClass?e.options.outOfBoundsClass:e.getClass("out-of-bounds"),g.push(t),C.forEach(function(e){g.push(t+"-"+e)})}(),(w.indexOf("left")>=0||w.indexOf("right")>=0)&&(y.left=v.left=!1),(w.indexOf("top")>=0||w.indexOf("bottom")>=0)&&(y.top=v.top=!1),v.top===i.top&&v.left===i.left&&y.top===e.attachment.top&&y.left===e.attachment.left||(e.updateAttachClasses(y,v),e.trigger("update",{attachment:y,targetAttachment:v}))}),M(function(){e.options.addTargetClasses!==!1&&m(e.target,g,p),m(e.element,g,p)}),{top:n,left:o}}});var W=x.Utils,a=W.getBounds,m=W.updateClasses,M=W.defer;x.modules.push({position:function(t){var e=this,n=t.top,o=t.left,i=this.cache("element-bounds",function(){return a(e.element)}),r=i.height,s=i.width,f=this.getTargetBounds(),l=n+r,h=o+s,c=[];n<=f.bottom&&l>=f.top&&["left","right"].forEach(function(t){var e=f[t];e!==o&&e!==h||c.push(t)}),o<=f.right&&h>=f.left&&["top","bottom"].forEach(function(t){var e=f[t];e!==n&&e!==l||c.push(t)});var u=[],d=[],p=["left","top","right","bottom"];return u.push(this.getClass("abutted")),p.forEach(function(t){u.push(e.getClass("abutted")+"-"+t)}),c.length&&d.push(this.getClass("abutted")),c.forEach(function(t){d.push(e.getClass("abutted")+"-"+t)}),M(function(){e.options.addTargetClasses!==!1&&m(e.target,d,u),m(e.element,d,u)}),!0}});var Y=function(){function t(t,e){var n=[],o=!0,i=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);o=!0);}catch(t){i=!0,r=t}finally{try{!o&&a.return&&a.return()}finally{if(i)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return x.modules.push({position:function(t){var e=t.top,n=t.left;if(this.options.shift){var o=this.options.shift;"function"==typeof this.options.shift&&(o=this.options.shift.call(this,{top:e,left:n}));var i=void 0,r=void 0;if("string"==typeof o){o=o.split(" "),o[1]=o[1]||o[0];var s=o,a=Y(s,2);i=a[0],r=a[1],i=parseFloat(i,10),r=parseFloat(r,10)}else i=o.top,r=o.left;return e+=i,n+=r,{top:e,left:n}}}}),$})},function(t,e,n){t.exports=n(3)}]);