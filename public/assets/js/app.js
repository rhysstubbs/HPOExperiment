/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"/js/app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"/js/vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var HPO_containers_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! HPO/containers/App */ \"./assets/js/containers/App.jsx\");\n/**\n * app.js\n *\n * This is the entry file for the application, only setup and boilerplate\n * code.\n */\n// Import all the third party stuff\n\n // Import root app container\n\n\nvar WRAPPER = 'app'; // Render application\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var MOUNT_NODE = document.getElementById(WRAPPER);\n\n  if (MOUNT_NODE !== null) {\n    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HPO_containers_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)), MOUNT_NODE);\n  }\n});\n\n//# sourceURL=webpack:///./assets/js/app.js?");

/***/ }),

/***/ "./assets/js/classes/player.jsx":
/*!**************************************!*\
  !*** ./assets/js/classes/player.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Player =\n/*#__PURE__*/\nfunction () {\n  function Player(genome, x, y, w, h) {\n    _classCallCheck(this, Player);\n\n    this.x = x;\n    this.y = y;\n    this.vx = 0;\n    this.vy = 0;\n    this.r = 6;\n    this.WIDTH = w;\n    this.HEIGHT = h;\n    this.MAX_SPEED = 5;\n    this.SCORE_RADIUS = 100;\n    this.brain = genome;\n    this.brain.score = 0;\n  }\n\n  _createClass(Player, [{\n    key: \"update\",\n    value: function update() {\n      var input = this.detect();\n      var output = this.brain.activate(input);\n      var moveangle = output[0] * 2 * window['p'].PI; // Calculate next position\n\n      this.ax = Math.cos(moveangle);\n      this.ay = Math.sin(moveangle);\n      this.vx += this.ax;\n      this.vy += this.ay; // Limit speeds to maximum speed\n\n      this.vx = this.vx > this.MAX_SPEED ? this.MAX_SPEED : this.vx < -this.MAX_SPEED ? -this.MAX_SPEED : this.vx;\n      this.vy = this.vy > this.MAX_SPEED ? this.MAX_SPEED : this.vy < -this.MAX_SPEED ? -this.MAX_SPEED : this.vy;\n      this.x += this.vx;\n      this.y += this.vy; // Limit position to width and height\n\n      this.x = this.x >= this.WIDTH ? this.WIDTH : this.x <= 0 ? 0 : this.x;\n      this.y = this.y >= this.HEIGHT ? this.HEIGHT : this.y <= 0 ? 0 : this.y;\n\n      if (this.x === 0 || this.x === this.WIDTH) {\n        this.vx = -this.vx;\n      }\n\n      if (this.y === 0 || this.y === this.HEIGHT) {\n        this.vy = -this.vy;\n      }\n\n      this.score();\n    }\n    /**\n     * Calculate fitness of this players genome\n     */\n\n  }, {\n    key: \"score\",\n    value: function score() {\n      var dist = window['p'].distance(this.x, this.y, window['walker'].x, window['walker'].y);\n\n      if (!isNaN(dist) && dist < this.SCORE_RADIUS) {\n        this.brain.score += this.SCORE_RADIUS - dist;\n      } // Replace highest score to visualise\n\n\n      window.highestScore = this.brain.score > window.highestScore ? this.brain.score : window.highestScore;\n    }\n    /**\n     * Display the player on the field, parts borrowed from the CodingTrain\n     */\n\n  }, {\n    key: \"show\",\n    value: function show() {\n      // Draw a triangle rotated in the direction of velocity\n      var angle = window['p'].angleToPoint(this.x, this.y, this.x + this.vx, this.y + this.vy) + window['p'].HALF_PI;\n      var color = window['p'].activationColor(this.brain.score, window.highestScore);\n      window['p'].push();\n      window['p'].translate(this.x, this.y);\n      window['p'].rotate(angle);\n      window['p'].fill(color);\n      window['p'].beginShape();\n      window['p'].vertex(0, -this.r * 2);\n      window['p'].vertex(-this.r, this.r * 2);\n      window['p'].vertex(this.r, this.r * 2);\n      window['p'].endShape(window['p'].CLOSE);\n      window['p'].pop();\n    }\n    /**\n     * Detect and normalize inputs\n     */\n\n  }, {\n    key: \"detect\",\n    value: function detect() {\n      var dist = Math.sqrt(this.x, this.y, window['walker'].x, window['walker'].y) / Math.sqrt(Math.pow(this.WIDTH, 2) + Math.pow(this.HEIGHT, 2));\n      var targetAngle = window['p'].angleToPoint(this.x, this.y, window['walker'].x, window['walker'].y) / window['p'].TWO_PI;\n      var vx = (this.vx + this.MAX_SPEED) / this.MAX_SPEED;\n      var vy = (this.vy + this.MAX_SPEED) / this.MAX_SPEED;\n      var tvx = (window['walker'].vx + this.MAX_SPEED) / this.MAX_SPEED;\n      var tvy = (window['walker'].vy + this.MAX_SPEED) / this.MAX_SPEED; // NaN checking\n\n      targetAngle = isNaN(targetAngle) ? 0 : targetAngle;\n      dist = isNaN(dist) ? 0 : dist;\n      return [vx, vy, tvx, tvy, targetAngle, dist];\n    }\n  }]);\n\n  return Player;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./assets/js/classes/player.jsx?");

/***/ }),

/***/ "./assets/js/classes/walker.jsx":
/*!**************************************!*\
  !*** ./assets/js/classes/walker.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Walker =\n/*#__PURE__*/\nfunction () {\n  function Walker(x, y) {\n    _classCallCheck(this, Walker);\n\n    this.x = x;\n    this.y = y;\n    this.vx = 0;\n    this.vy = 0;\n    this.WIDTH = 900;\n    this.HEIGHT = 500;\n    this.MAX_SPEED = 5;\n    this.SCORE_RADIUS = 100;\n    this.r = 10;\n    this.angle = Math.random() * Math.PI * 2;\n  }\n\n  _createClass(Walker, [{\n    key: \"update\",\n    value: function update() {\n      if (Math.random() > 0.5) {\n        this.angle += Math.random() * 2 - 1;\n      } // Calculate next position\n\n\n      this.ax = Math.cos(this.angle);\n      this.ay = Math.sin(this.angle);\n      this.vx += this.ax;\n      this.vy += this.ay; // Limit speeds to maximum speed\n\n      this.vx = this.vx > this.MAX_SPEED / 2 ? this.MAX_SPEED / 2 : this.vx < -this.MAX_SPEED / 2 ? -this.MAX_SPEED / 2 : this.vx;\n      this.vy = this.vy > this.MAX_SPEED / 2 ? this.MAX_SPEED / 2 : this.vy < -this.MAX_SPEED / 2 ? -this.MAX_SPEED / 2 : this.vy;\n      this.x += this.vx;\n      this.y += this.vy; // Limit position to width and height\n\n      this.x = this.x >= this.WIDTH ? this.WIDTH : this.x <= 0 ? 0 : this.x;\n      this.y = this.y >= this.HEIGHT ? this.HEIGHT : this.y <= 0 ? 0 : this.y;\n\n      if (this.x === 0 || this.x === this.WIDTH) {\n        this.vx = -this.vx;\n        this.angle += Math.PI;\n      }\n\n      if (this.y === 0 || this.y === this.HEIGHT) {\n        this.vy = -this.vy;\n        this.angle += Math.PI;\n      }\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      this.x = this.WIDTH / 2;\n      this.y = this.HEIGHT / 2;\n      this.vx = 0;\n      this.vy = 0;\n      this.angle = Math.random() * Math.PI * 2;\n    }\n  }, {\n    key: \"show\",\n    value: function show() {\n      window['p'].fill(0);\n      window['p'].ellipse(this.x, this.y, this.r * 2); // Score radius\n\n      window['p'].noFill();\n      window['p'].stroke('lightgreen');\n      window['p'].strokeWeight(2);\n      window['p'].ellipse(this.x, this.y, this.SCORE_RADIUS * 2);\n      window['p'].noStroke();\n    }\n  }]);\n\n  return Walker;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Walker);\n\n//# sourceURL=webpack:///./assets/js/classes/walker.jsx?");

/***/ }),

/***/ "./assets/js/containers/App.jsx":
/*!**************************************!*\
  !*** ./assets/js/containers/App.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var HPO_containers_simulation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! HPO/containers/simulation */ \"./assets/js/containers/simulation.jsx\");\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Button */ \"./node_modules/react-bootstrap/Button.js\");\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Container */ \"./node_modules/react-bootstrap/Container.js\");\n/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap/Row */ \"./node_modules/react-bootstrap/Row.js\");\n/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap/Col */ \"./node_modules/react-bootstrap/Col.js\");\n/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n *\n * App\n *\n * This component is the skeleton around the actual page\n */\n\n\n\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(App, _React$Component);\n\n  function App(props) {\n    var _this;\n\n    _classCallCheck(this, App);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_this), \"handleClick\", function () {\n      var currentState = _this.state.active;\n\n      _this.setState({\n        active: !currentState\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"update\", function (e) {\n      var keys = e.detail;\n      Object.keys(keys).forEach(function (key) {\n        var val = keys[key];\n\n        _this.setState(_defineProperty({}, key, val));\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"componentDidMount\", function () {\n      window.addEventListener(\"generationUpdate\", _this.update);\n    });\n\n    _this.state = {\n      active: true,\n      generation: null,\n      averageScore: null,\n      fittestScore: null\n    };\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_3___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HPO_containers_simulation__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        active: this.state.active,\n        width: 900,\n        height: 500\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, \"Generation: \", this.state.generation), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, \"Average Score: \", this.state.averageScore), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, \"Best Score: \", this.state.fittestScore))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {\n        onClick: this.handleClick,\n        variant: \"primary\"\n      }, this.state.active ? 'Pause' : 'Resume')))));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nApp.defaultProps = {};\nApp.propTypes = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./assets/js/containers/App.jsx?");

/***/ }),

/***/ "./assets/js/containers/simulation.jsx":
/*!*********************************************!*\
  !*** ./assets/js/containers/simulation.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_neat) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_p5_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-p5-wrapper */ \"./node_modules/react-p5-wrapper/lib/P5Wrapper.js\");\n/* harmony import */ var react_p5_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_p5_wrapper__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var HPO_sketches_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! HPO/sketches/index */ \"./assets/js/sketches/index.js\");\n/* harmony import */ var neataptic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! neataptic */ \"./node_modules/neataptic/src/neataptic.js\");\n/* harmony import */ var neataptic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(neataptic__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var HPO_classes_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! HPO/classes/player */ \"./assets/js/classes/player.jsx\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var HPO_classes_walker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! HPO/classes/walker */ \"./assets/js/classes/walker.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar Neat = window['neataptic'].Neat;\nvar Methods = window['neataptic'].methods;\n\nvar Simulation =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Simulation, _React$Component);\n\n  function Simulation(props) {\n    var _this;\n\n    _classCallCheck(this, Simulation);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Simulation).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_this), \"initNeat\", function () {\n      window['walker'] = new HPO_classes_walker__WEBPACK_IMPORTED_MODULE_6__[\"default\"](_this.props.width / 2, _this.props.height / 2, _this.props.width, _this.props.height);\n      window['players'] = [];\n      __webpack_provided_window_dot_neat = new Neat(6, 1, null, {\n        mutation: [Methods.mutation.ADD_NODE, Methods.mutation.SUB_NODE, Methods.mutation.ADD_CONN, Methods.mutation.SUB_CONN, Methods.mutation.MOD_WEIGHT, Methods.mutation.MOD_BIAS, Methods.mutation.MOD_ACTIVATION, Methods.mutation.ADD_GATE, Methods.mutation.SUB_GATE, Methods.mutation.ADD_SELF_CONN, Methods.mutation.SUB_SELF_CONN, Methods.mutation.ADD_BACK_CONN, Methods.mutation.SUB_BACK_CONN],\n        popsize: _this.PLAYER_AMOUNT,\n        mutationRate: _this.MUTATION_RATE,\n        elitism: _this.ELITISM\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"startEvaluation\", function () {\n      window['players'] = [];\n      window['highestScore'] = 0;\n\n      for (var genome in __webpack_provided_window_dot_neat.population) {\n        genome = __webpack_provided_window_dot_neat.population[genome];\n        var newPlayer = new HPO_classes_player__WEBPACK_IMPORTED_MODULE_4__[\"default\"](genome, _this.props.width / 2, _this.props.height / 2, _this.props.width, _this.props.height);\n        window['players'].push(newPlayer);\n      }\n\n      window['walker'].reset();\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"endEvaluation\", function () {\n      var event = new CustomEvent('generationUpdate', {\n        detail: {\n          generation: __webpack_provided_window_dot_neat.generation,\n          averageScore: Math.round(__webpack_provided_window_dot_neat.getAverage()),\n          fittestScore: Math.round(__webpack_provided_window_dot_neat.getFittest().score)\n        }\n      }); // Networks shouldn't get too big\n\n      for (var genome in __webpack_provided_window_dot_neat.population) {\n        genome = __webpack_provided_window_dot_neat.population[genome];\n        genome.score -= genome.nodes.length * _this.SCORE_RADIUS / 10;\n      } // Sort the population by score\n\n\n      __webpack_provided_window_dot_neat.sort(); // Init new pop\n\n      var newPopulation = []; // Elitism\n\n      for (var i = 0; i < __webpack_provided_window_dot_neat.elitism; i++) {\n        newPopulation.push(__webpack_provided_window_dot_neat.population[i]);\n      } // Breed the next individuals\n\n\n      for (var _i = 0; _i < __webpack_provided_window_dot_neat.popsize - __webpack_provided_window_dot_neat.elitism; _i++) {\n        newPopulation.push(__webpack_provided_window_dot_neat.getOffspring());\n      } // Replace the old population with the new population\n\n\n      __webpack_provided_window_dot_neat.population = newPopulation;\n      __webpack_provided_window_dot_neat.mutate();\n      __webpack_provided_window_dot_neat.generation++; // Dispatch the event.\n\n      window.dispatchEvent(event);\n\n      _this.startEvaluation();\n    });\n\n    _this.SCORE_RADIUS = 100;\n    _this.PLAYER_AMOUNT = Math.round(2.3e-4 * props.width * props.height);\n    _this.ITERATIONS = 250;\n    _this.MUTATION_RATE = 0.3;\n    _this.ELITISM = Math.round(0.1 * _this.PLAYER_AMOUNT);\n    _this.state = {\n      active: true,\n      stateSketch: HPO_sketches_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n    };\n    return _this;\n  }\n\n  _createClass(Simulation, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_p5_wrapper__WEBPACK_IMPORTED_MODULE_1___default.a, {\n        sketch: this.state.stateSketch,\n        status: this.props.active,\n        initNeat: this.initNeat,\n        startEvaluation: this.startEvaluation,\n        endEvaluation: this.endEvaluation.bind(this),\n        width: this.props.width,\n        height: this.props.height,\n        iterations: this.ITERATIONS\n      }));\n    }\n  }]);\n\n  return Simulation;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nSimulation.defaultProps = {\n  active: true,\n  width: 900,\n  height: 500\n};\nSimulation.propTypes = {\n  active: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,\n  width: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,\n  height: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Simulation);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! neataptic */ \"./node_modules/neataptic/src/neataptic.js\")))\n\n//# sourceURL=webpack:///./assets/js/containers/simulation.jsx?");

/***/ }),

/***/ "./assets/js/sketches/index.js":
/*!*************************************!*\
  !*** ./assets/js/sketches/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return sketch; });\nvar initNeat,\n    startEvaluation,\n    endEvaluation,\n    iterations,\n    HEIGHT,\n    WIDTH = null;\nfunction sketch(p) {\n  var iteration = 0;\n  var active = false;\n  /**\n   * Core P5.js functions\n   */\n\n  p.setup = function () {\n    window['p'] = p;\n    p.createCanvas(WIDTH, HEIGHT);\n    initNeat();\n    startEvaluation();\n\n    if (active) {\n      p.loop();\n    } else {\n      p.noLoop();\n    }\n  };\n\n  p.draw = function () {\n    p.clear();\n    p.squareGrid();\n\n    if (active) {\n      if (iteration === iterations) {\n        endEvaluation();\n        iteration = 0;\n      }\n\n      window['players'].forEach(function (player) {\n        player.update();\n        player.show();\n      });\n      window['walker'].update();\n      window['walker'].show();\n      iteration++;\n    } else {\n      p.textSize(44);\n      p.textAlign(p.CENTER, p.CENTER);\n      p.fill(255);\n      p.text('Paused', WIDTH / 2, HEIGHT / 2);\n    }\n  };\n\n  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {\n    if (props.hasOwnProperty(\"status\")) {\n      active = props.status;\n    }\n\n    if (props.hasOwnProperty(\"initNeat\")) {\n      initNeat = props.initNeat;\n    }\n\n    if (props.hasOwnProperty(\"startEvaluation\")) {\n      startEvaluation = props.startEvaluation;\n    }\n\n    if (props.hasOwnProperty(\"endEvaluation\")) {\n      endEvaluation = props.endEvaluation;\n    }\n\n    if (props.hasOwnProperty(\"width\")) {\n      WIDTH = props.width;\n    }\n\n    if (props.hasOwnProperty(\"height\")) {\n      HEIGHT = props.height;\n    }\n\n    if (props.hasOwnProperty(\"iterations\")) {\n      iterations = props.iterations;\n    }\n\n    if (props.hasOwnProperty(\"width\")) {\n      WIDTH = props.width;\n    }\n\n    if (props.hasOwnProperty(\"height\")) {\n      HEIGHT = props.height;\n    }\n  }; //-----------------------------------------------------------\n\n  /**\n   * Draw a square grid with grey lines\n   */\n\n\n  p.squareGrid = function () {\n    p.stroke(204, 204, 204, 160);\n    p.strokeWeight(1);\n\n    for (var x = 0; x <= WIDTH / 20; x++) {\n      p.line(x * 20 + 20, 0, x * 20 + 20, HEIGHT);\n    }\n\n    for (var y = 0; y <= HEIGHT / 20; y++) {\n      p.line(0, y * 20 + 20, WIDTH, y * 20 + 20);\n    }\n\n    p.fill(255, 255, 255, 100);\n    p.rect(0, 0, WIDTH, HEIGHT);\n    p.noStroke();\n  };\n  /**\n   * Calculate distance between two points\n   */\n\n\n  p.distance = function (x1, y1, x2, y2) {\n    var dx = x1 - x2;\n    var dy = y1 - y2;\n    return Math.sqrt(dx * dx + dy * dy);\n  };\n  /**\n   * Get a relative color between red and green\n   */\n\n\n  p.activationColor = function (value, max) {\n    var power = 1 - Math.min(value / max, 1);\n    var color = [255, 255, 0];\n\n    if (power < 0.5) {\n      color[0] = 2 * power * 255;\n    } else {\n      color[1] = (1.0 - 2 * (power - 0.5)) * 255;\n    }\n\n    return color;\n  };\n  /**\n   * Get the angle from one point to another\n   */\n\n\n  p.angleToPoint = function (x1, y1, x2, y2) {\n    var d = this.distance(x1, y1, x2, y2);\n    var dx = (x2 - x1) / d;\n    var dy = (y2 - y1) / d;\n    var a = Math.acos(dx);\n    a = dy < 0 ? 2 * Math.PI - a : a;\n    return a;\n  };\n}\n\n//# sourceURL=webpack:///./assets/js/sketches/index.js?");

/***/ }),

/***/ "./assets/scss/app.scss":
/*!******************************!*\
  !*** ./assets/scss/app.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./assets/scss/app.scss?");

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./assets/js/app.js ./assets/scss/app.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/rhys/Desktop/Projects/git-repositories/HPOExperiment/resources/assets/js/app.js */\"./assets/js/app.js\");\nmodule.exports = __webpack_require__(/*! /Users/rhys/Desktop/Projects/git-repositories/HPOExperiment/resources/assets/scss/app.scss */\"./assets/scss/app.scss\");\n\n\n//# sourceURL=webpack:///multi_./assets/js/app.js_./assets/scss/app.scss?");

/***/ })

/******/ });