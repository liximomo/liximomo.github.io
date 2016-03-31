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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ImmerseScroller = __webpack_require__(2);

	var _ImmerseScroller2 = _interopRequireDefault(_ImmerseScroller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var headBar = document.querySelector('#site-header');
	// let immerseHeader = new ImmerseScroller({
	//   element: headBar,
	//   bedin: headBar - headBar.clientHeight,
	//   inClass: 'site-header--affixed',
	//   upClass: 'is-inView',
	//   downClass: 'is-hidden'
	// });
	// immerseHeader.init();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImmerseScroller = function () {
	    function ImmerseScroller() {
	        _classCallCheck(this, ImmerseScroller);

	        window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	            window.setTimeout(callback, 1000 / 60);
	        };
	        this.hooks = [];
	    }

	    _createClass(ImmerseScroller, [{
	        key: 'init',
	        value: function init() {
	            window.addEventListener('scroll', this.onScroll.bind(this), false);
	        }
	    }, {
	        key: 'register',
	        value: function register(anims) {
	            this.hooks.concat(anims);
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

	            if (isInRegion) {
	                this.element.classList.add(this.inClass);
	            } else {
	                this.element.classList.remove(this.inClass);
	            }

	            if (scrollOffset < 0) {
	                this.element.classList.remove(this.downClass);
	                this.element.classList.add(this.upClass);
	            } else {
	                this.element.classList.remove(this.upClass);
	                this.element.classList.add(this.downClass);
	            }
	            this.lastScrollY = currentScrollY;
	        }
	    }]);

	    return ImmerseScroller;
	}();

	exports.default = ImmerseScroller;

/***/ }
/******/ ]);