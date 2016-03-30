/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImmerseScroller = function () {
	    function ImmerseScroller(element) {
	        var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var end = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];

	        _classCallCheck(this, ImmerseScroller);

	        window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	            window.setTimeout(callback, 1000 / 60);
	        };
	        this.latestKnownScrollY = 0;
	        this.lastScrollY = 0;
	        this.delta = 5;
	        this.ticking = false;
	        this.element = element;
	        this.start = start;
	        this.end = end;
	    }

	    _createClass(ImmerseScroller, [{
	        key: 'init',
	        value: function init() {
	            window.addEventListener('scroll', this.onScroll.bind(this), false);
	        }
	    }, {
	        key: 'onScroll',
	        value: function onScroll() {
	            this.latestKnownScrollY = window.scrollY;
	            this.requestTick();
	        }
	    }, {
	        key: 'requestTick',
	        value: function requestTick() {
	            if (!this.ticking) {
	                window.requestAnimFrame(this.update.bind(this));
	            }
	            this.ticking = true;
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var currentScrollY = this.latestKnownScrollY;
	            var scrollOffset = currentScrollY - this.lastScrollY;
	            this.ticking = false;
	            var isInRegion = currentScrollY >= this.start && (this.end < 0 || currentScrollY <= this.end - window.innerHeight);
	            if (Math.abs(scrollOffset) <= this.delta) {
	                return;
	            }
	            if (scrollOffset < 0 && isInRegion) {
	                this.element.classList.remove('is-hidden');
	                this.element.classList.add('is-inView');
	            } else {
	                this.element.classList.remove('is-inView');
	                this.element.classList.add('is-hidden');
	            }
	            this.lastScrollY = currentScrollY;
	        }
	    }]);

	    return ImmerseScroller;
	}();

	exports.default = ImmerseScroller;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Popover = __webpack_require__(4);

	var _Popover2 = _interopRequireDefault(_Popover);

	var _ImmerseScroller = __webpack_require__(2);

	var _ImmerseScroller2 = _interopRequireDefault(_ImmerseScroller);

	var _viewHelp = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pop = document.querySelector('#sharePopOver');
	new _Popover2.default('#shareBtn', pop, 20);
	new _Popover2.default('#shareBtnOnBar', pop, 20, document.querySelector('.postActionsBar-container'));
	var actionFooter = document.querySelector('.postActionsFooter');
	// let articleBegin = getPosition(document.querySelector('.main-post')).y;
	var actionBegin = (0, _viewHelp.getPosition)(actionFooter).y;
	var immerseActionFooter = new _ImmerseScroller2.default(document.querySelector('.postActionsBar-content'), 0, actionBegin);
	immerseActionFooter.init();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _viewHelp = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Popover = function () {
	  function Popover(toggle, popover) {
	    var offset = arguments.length <= 2 || arguments[2] === undefined ? 5 : arguments[2];
	    var container = arguments.length <= 3 || arguments[3] === undefined ? document.body : arguments[3];
	    var direction = arguments.length <= 4 || arguments[4] === undefined ? 'top' : arguments[4];

	    _classCallCheck(this, Popover);

	    this.toggle = document.querySelector(toggle);
	    this.popover = popover;
	    this.direction = direction;
	    this.offset = offset;
	    this.container = container;
	    this.popover.remove();
	    this.popover.style.position = 'absolute';
	    this.popover.style.display = 'block';
	    this.toggle.addEventListener('click', this.handleToggle.bind(this), false);
	  }

	  _createClass(Popover, [{
	    key: 'show',
	    value: function show(toggle) {
	      var pos = (0, _viewHelp.getPosition)(this.toggle, this.container);
	      var rect = toggle.getBoundingClientRect();
	      pos.height = rect.height;
	      pos.width = rect.width;

	      this.popover.style.visibility = 'hidden';
	      this.container.appendChild(this.popover);

	      var actualWidth = this.popover.clientWidth;
	      var actualHeight = this.popover.clientHeight + this.offset;

	      var tp = null;
	      switch (this.direction) {
	        case 'bottom':
	          tp = { top: pos.y + pos.height, left: pos.x + pos.width / 2 - actualWidth / 2 };
	          break;
	        case 'top':
	          tp = { top: pos.y - actualHeight, left: pos.x + pos.width / 2 - actualWidth / 2 };
	          break;
	        case 'left':
	          tp = { top: pos.y + pos.height / 2 - actualHeight / 2, left: pos.x - actualWidth };
	          break;
	        case 'right':
	          tp = { top: pos.y + pos.height / 2 - actualHeight / 2, left: pos.x + pos.width };
	          break;
	      }

	      this.popover.style.top = tp.top + 'px';
	      this.popover.style.left = tp.left + 'px';
	      this.popover.style.visibility = 'visible';
	      return;
	    }
	  }, {
	    key: 'handleToggle',
	    value: function handleToggle(event) {
	      if (this.popover.parentElement) {
	        this.popover.remove();
	      } else {
	        this.show(event.currentTarget);
	      }
	    }
	  }]);

	  return Popover;
	}();

	exports.default = Popover;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isInView = isInView;
	exports.getPosition = getPosition;
	/**
	  *  browser view helper 
	  * 
	  */

	function isInView(element) {
	  var docViewTop = window.scrollY;
	  var docViewBottom = docViewTop + window.innerHeight;

	  var elemTop = element.offsetTop;
	  var elemBottom = elemTop + element.clientHeight;

	  return elemBottom <= docViewBottom && elemTop >= docViewTop;
	}

	function getPosition(el) {
	  var relateTo = arguments.length <= 1 || arguments[1] === undefined ? document.body : arguments[1];

	  var xPos = 0;
	  var yPos = 0;
	  while (el && el !== relateTo) {
	    if (el.tagName == "BODY") {
	      // deal with browser quirks with body/window/document and page scroll
	      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
	      var yScroll = el.scrollTop || document.documentElement.scrollTop;

	      xPos += el.offsetLeft - xScroll + el.clientLeft;
	      yPos += el.offsetTop - yScroll + el.clientTop;
	    } else {
	      // for all other non-BODY elements
	      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
	      yPos += el.offsetTop - el.scrollTop + el.clientTop;
	    }

	    el = el.offsetParent;
	  }
	  return {
	    x: xPos,
	    y: yPos
	  };
	}

/***/ }
/******/ ]);