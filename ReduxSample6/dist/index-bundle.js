/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 107);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(122));



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * An IThemingInstruction can specify a rawString to be preserved or a theme slot and a default value
 * to use if that slot is not specified by the theme.
 */

Object.defineProperty(exports, "__esModule", { value: true });
// IE needs to inject styles using cssText. However, we need to evaluate this lazily, so this
// value will initialize as undefined, and later will be set once on first loadStyles injection.
var _injectStylesWithCssText;
// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
// load-themed-styles hosted on the page.
var _root = (typeof window === 'undefined') ? global : window; // tslint:disable-line:no-any
var _themeState = _root.__themeState__ = _root.__themeState__ || {
    theme: undefined,
    lastStyleElement: undefined,
    registeredStyles: []
};
/**
 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
 */
// tslint:disable-next-line:max-line-length
var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
/** Maximum style text length, for supporting IE style restrictions. */
var MAX_STYLE_CONTENT_SIZE = 10000;
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load
 * event is fired.
 * @param {string | ThemableArray} styles Themable style text to register.
 */
function loadStyles(styles) {
    var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
    if (_injectStylesWithCssText === undefined) {
        _injectStylesWithCssText = shouldUseCssText();
    }
    applyThemableStyles(styleParts);
}
exports.loadStyles = loadStyles;
/**
 * Allows for customizable loadStyles logic. e.g. for server side rendering application
 * @param {(processedStyles: string, rawStyles?: string | ThemableArray) => void}
 * a loadStyles callback that gets called when styles are loaded or reloaded
 */
function configureLoadStyles(loadStyles) {
    _themeState.loadStyles = loadStyles;
}
exports.configureLoadStyles = configureLoadStyles;
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
 * is fired.
 * @param {string} styleText Style to register.
 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
 */
function applyThemableStyles(stylesArray, styleRecord) {
    if (_themeState.loadStyles) {
        _themeState.loadStyles(resolveThemableArray(stylesArray), stylesArray);
    }
    else {
        _injectStylesWithCssText ?
            registerStylesIE(stylesArray, styleRecord) :
            registerStyles(stylesArray, styleRecord);
    }
}
/**
 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
 * replaced.
 * @param {theme} theme JSON object of theme tokens to values.
 */
function loadTheme(theme) {
    _themeState.theme = theme;
    // reload styles.
    reloadStyles();
}
exports.loadTheme = loadTheme;
/**
 * Clear already registered style elements and style records in theme_State object
 */
function clearStyles() {
    _themeState.registeredStyles.forEach(function (styleRecord) {
        var styleElement = styleRecord && styleRecord.styleElement;
        if (styleElement && styleElement.parentElement) {
            styleElement.parentElement.removeChild(styleElement);
        }
    });
    _themeState.registeredStyles = [];
}
exports.clearStyles = clearStyles;
/**
 * Reloads styles.
 */
function reloadStyles() {
    if (_themeState.theme) {
        for (var _i = 0, _a = _themeState.registeredStyles; _i < _a.length; _i++) {
            var styleRecord = _a[_i];
            applyThemableStyles(styleRecord.themableStyle, styleRecord);
        }
    }
}
/**
 * Find theme tokens and replaces them with provided theme values.
 * @param {string} styles Tokenized styles to fix.
 */
function detokenize(styles) {
    if (styles) {
        styles = resolveThemableArray(splitStyles(styles));
    }
    return styles;
}
exports.detokenize = detokenize;
/**
 * Resolves ThemingInstruction objects in an array and joins the result into a string.
 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
 */
function resolveThemableArray(splitStyleArray) {
    var theme = _themeState.theme;
    // Resolve the array of theming instructions to an array of strings.
    // Then join the array to produce the final CSS string.
    var resolvedArray = (splitStyleArray || []).map(function (currentValue) {
        var themeSlot = currentValue.theme;
        if (themeSlot) {
            // A theming annotation. Resolve it.
            var themedValue = theme ? theme[themeSlot] : undefined;
            var defaultValue = currentValue.defaultValue || 'inherit';
            // Warn to console if we hit an unthemed value even when themes are provided, unless "DEBUG" is false
            // Allow the themedValue to be undefined to explicitly request the default value.
            if (theme && !themedValue && console && !(themeSlot in theme) && (typeof DEBUG === 'undefined' || DEBUG)) {
                console.warn("Theming value not provided for \"" + themeSlot + "\". Falling back to \"" + defaultValue + "\".");
            }
            return themedValue || defaultValue;
        }
        else {
            // A non-themable string. Preserve it.
            return currentValue.rawString;
        }
    });
    return resolvedArray.join('');
}
/**
 * Split tokenized CSS into an array of strings and theme specification objects
 * @param {string} styles Tokenized styles to split.
 */
function splitStyles(styles) {
    var result = [];
    if (styles) {
        var pos = 0; // Current position in styles.
        var tokenMatch = void 0; // tslint:disable-line:no-null-keyword
        while (tokenMatch = _themeTokenRegex.exec(styles)) {
            var matchIndex = tokenMatch.index;
            if (matchIndex > pos) {
                result.push({
                    rawString: styles.substring(pos, matchIndex)
                });
            }
            result.push({
                theme: tokenMatch[1],
                defaultValue: tokenMatch[2] // May be undefined
            });
            // index of the first character after the current match
            pos = _themeTokenRegex.lastIndex;
        }
        // Push the rest of the string after the last match.
        result.push({
            rawString: styles.substring(pos)
        });
    }
    return result;
}
exports.splitStyles = splitStyles;
/**
 * Registers a set of style text. If it is registered too early, we will register it when the
 * window.load event is fired.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStyles(styleArray, styleRecord) {
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(resolveThemableArray(styleArray)));
    if (styleRecord) {
        head.replaceChild(styleElement, styleRecord.styleElement);
        styleRecord.styleElement = styleElement;
    }
    else {
        head.appendChild(styleElement);
    }
    if (!styleRecord) {
        _themeState.registeredStyles.push({
            styleElement: styleElement,
            themableStyle: styleArray
        });
    }
}
/**
 * Registers a set of style text, for IE 9 and below, which has a ~30 style element limit so we need
 * to register slightly differently.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStylesIE(styleArray, styleRecord) {
    var head = document.getElementsByTagName('head')[0];
    var registeredStyles = _themeState.registeredStyles;
    var lastStyleElement = _themeState.lastStyleElement;
    var stylesheet = lastStyleElement ? lastStyleElement.styleSheet : undefined;
    var lastStyleContent = stylesheet ? stylesheet.cssText : '';
    var lastRegisteredStyle = registeredStyles[registeredStyles.length - 1];
    var resolvedStyleText = resolveThemableArray(styleArray);
    if (!lastStyleElement || (lastStyleContent.length + resolvedStyleText.length) > MAX_STYLE_CONTENT_SIZE) {
        lastStyleElement = document.createElement('style');
        lastStyleElement.type = 'text/css';
        if (styleRecord) {
            head.replaceChild(lastStyleElement, styleRecord.styleElement);
            styleRecord.styleElement = lastStyleElement;
        }
        else {
            head.appendChild(lastStyleElement);
        }
        if (!styleRecord) {
            lastRegisteredStyle = {
                styleElement: lastStyleElement,
                themableStyle: styleArray
            };
            registeredStyles.push(lastRegisteredStyle);
        }
    }
    lastStyleElement.styleSheet.cssText += detokenize(resolvedStyleText);
    Array.prototype.push.apply(lastRegisteredStyle.themableStyle, styleArray); // concat in-place
    // Preserve the theme state.
    _themeState.lastStyleElement = lastStyleElement;
}
/**
 * Checks to see if styleSheet exists as a property off of a style element.
 * This will determine if style registration should be done via cssText (<= IE9) or not
 */
function shouldUseCssText() {
    var useCSSText = false;
    if (typeof document !== 'undefined') {
        var emptyStyle = document.createElement('style');
        emptyStyle.type = 'text/css';
        useCSSText = !!emptyStyle.styleSheet;
    }
    return useCSSText;
}


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(242)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(241)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MemoryRouter__ = __webpack_require__(266);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__MemoryRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Prompt__ = __webpack_require__(267);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__Prompt__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Redirect__ = __webpack_require__(268);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Route__ = __webpack_require__(85);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__Route__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(41);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__Router__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__StaticRouter__ = __webpack_require__(269);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__StaticRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Switch__ = __webpack_require__(270);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__Switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__matchPath__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__matchPath__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__withRouter__ = __webpack_require__(271);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_8__withRouter__["a"]; });



















/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sym; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return TASK; });
/* unused harmony export HELPER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return CANCEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return SAGA_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SELF_CANCELLATION; });
/* unused harmony export konst */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return kTrue; });
/* unused harmony export kFalse */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ident; });
/* harmony export (immutable) */ __webpack_exports__["b"] = check;
/* unused harmony export hasOwn */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return object; });
/* harmony export (immutable) */ __webpack_exports__["m"] = remove;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return array; });
/* harmony export (immutable) */ __webpack_exports__["s"] = deferred;
/* harmony export (immutable) */ __webpack_exports__["t"] = arrayOfDeffered;
/* harmony export (immutable) */ __webpack_exports__["j"] = delay;
/* harmony export (immutable) */ __webpack_exports__["u"] = createMockTask;
/* unused harmony export autoInc */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return uid; });
/* harmony export (immutable) */ __webpack_exports__["i"] = makeIterator;
/* harmony export (immutable) */ __webpack_exports__["w"] = log;
/* harmony export (immutable) */ __webpack_exports__["d"] = deprecate;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return updateIncentive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return internalErr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return createSetContextWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return wrapSagaDispatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return cloneableGenerator; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sym = function sym(id) {
  return '@@redux-saga/' + id;
};

var TASK = sym('TASK');
var HELPER = sym('HELPER');
var MATCH = sym('MATCH');
var CANCEL = sym('CANCEL_PROMISE');
var SAGA_ACTION = sym('SAGA_ACTION');
var SELF_CANCELLATION = sym('SELF_CANCELLATION');
var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue = konst(true);
var kFalse = konst(false);
var noop = function noop() {};
var ident = function ident(v) {
  return v;
};

function check(value, predicate, error) {
  if (!predicate(value)) {
    log('error', 'uncaught at check', error);
    throw new Error(error);
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object, property) {
  return is.notUndef(object) && hasOwnProperty.call(object, property);
}

var is = {
  undef: function undef(v) {
    return v === null || v === undefined;
  },
  notUndef: function notUndef(v) {
    return v !== null && v !== undefined;
  },
  func: function func(f) {
    return typeof f === 'function';
  },
  number: function number(n) {
    return typeof n === 'number';
  },
  string: function string(s) {
    return typeof s === 'string';
  },
  array: Array.isArray,
  object: function object(obj) {
    return obj && !is.array(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  },
  promise: function promise(p) {
    return p && is.func(p.then);
  },
  iterator: function iterator(it) {
    return it && is.func(it.next) && is.func(it.throw);
  },
  iterable: function iterable(it) {
    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
  },
  task: function task(t) {
    return t && t[TASK];
  },
  observable: function observable(ob) {
    return ob && is.func(ob.subscribe);
  },
  buffer: function buffer(buf) {
    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
  },
  pattern: function pattern(pat) {
    return pat && (is.string(pat) || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
  },
  channel: function channel(ch) {
    return ch && is.func(ch.take) && is.func(ch.close);
  },
  helper: function helper(it) {
    return it && it[HELPER];
  },
  stringableFunc: function stringableFunc(f) {
    return is.func(f) && hasOwn(f, 'toString');
  }
};

var object = {
  assign: function assign(target, source) {
    for (var i in source) {
      if (hasOwn(source, i)) {
        target[i] = source[i];
      }
    }
  }
};

function remove(array, item) {
  var index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

var array = {
  'from': function from(obj) {
    var arr = Array(obj.length);
    for (var i in obj) {
      if (hasOwn(obj, i)) {
        arr[i] = obj[i];
      }
    }
    return arr;
  }
};

function deferred() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var def = _extends({}, props);
  var promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  def.promise = promise;
  return def;
}

function arrayOfDeffered(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(deferred());
  }
  return arr;
}

function delay(ms) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var timeoutId = void 0;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(function () {
      return resolve(val);
    }, ms);
  });

  promise[CANCEL] = function () {
    return clearTimeout(timeoutId);
  };

  return promise;
}

function createMockTask() {
  var _ref;

  var running = true;
  var _result = void 0,
      _error = void 0;

  return _ref = {}, _ref[TASK] = true, _ref.isRunning = function isRunning() {
    return running;
  }, _ref.result = function result() {
    return _result;
  }, _ref.error = function error() {
    return _error;
  }, _ref.setRunning = function setRunning(b) {
    return running = b;
  }, _ref.setResult = function setResult(r) {
    return _result = r;
  }, _ref.setError = function setError(e) {
    return _error = e;
  }, _ref;
}

function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    return ++seed;
  };
}

var uid = autoInc();

var kThrow = function kThrow(err) {
  throw err;
};
var kReturn = function kReturn(value) {
  return { value: value, done: true };
};
function makeIterator(next) {
  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isHelper = arguments[3];

  var iterator = { name: name, next: next, throw: thro, return: kReturn };

  if (isHelper) {
    iterator[HELPER] = true;
  }
  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }
  return iterator;
}

/**
  Print error in a useful way whether in a browser environment
  (with expandable error stack traces), or in a node.js environment
  (text-only log output)
 **/
function log(level, message) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*eslint-disable no-console*/
  if (typeof window === 'undefined') {
    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
  } else {
    console[level](message, error);
  }
}

function deprecate(fn, deprecationWarning) {
  return function () {
    if (process.env.NODE_ENV === 'development') log('warn', deprecationWarning);
    return fn.apply(undefined, arguments);
  };
}

var updateIncentive = function updateIncentive(deprecated, preferred) {
  return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
};

var internalErr = function internalErr(err) {
  return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
};

var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + 'setContext(props): argument ' + props + ' is not a plain object';
};

var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    return dispatch(Object.defineProperty(action, SAGA_ACTION, { value: true }));
  };
};

var cloneableGenerator = function cloneableGenerator(generatorFunc) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var history = [];
    var gen = generatorFunc.apply(undefined, args);
    return {
      next: function next(arg) {
        history.push(arg);
        return gen.next(arg);
      },
      clone: function clone() {
        var clonedGen = cloneableGenerator(generatorFunc).apply(undefined, args);
        history.forEach(function (arg) {
          return clonedGen.next(arg);
        });
        return clonedGen;
      },
      return: function _return(value) {
        return gen.return(value);
      },
      throw: function _throw(exception) {
        return gen.throw(exception);
      }
    };
  };
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Provider__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connect_connect__ = __webpack_require__(244);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Provider__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "connectAdvanced", function() { return __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return __WEBPACK_IMPORTED_MODULE_2__connect_connect__["a"]; });






/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(186));



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalHint;
(function (DirectionalHint) {
    /**
     * Appear above the target element, with the left edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["topLeftEdge"] = 0] = "topLeftEdge";
    /**
     * Appear above the target element, with the centers of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["topCenter"] = 1] = "topCenter";
    /**
     * Appear above the target element, with the right edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["topRightEdge"] = 2] = "topRightEdge";
    /**
     * Appear above the target element, aligning with the target element such that the callout tends toward the center of the screen.
     */
    DirectionalHint[DirectionalHint["topAutoEdge"] = 3] = "topAutoEdge";
    /**
     * Appear below the target element, with the left edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["bottomLeftEdge"] = 4] = "bottomLeftEdge";
    /**
     * Appear below the target element, with the centers of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["bottomCenter"] = 5] = "bottomCenter";
    /**
     * Appear below the target element, with the right edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["bottomRightEdge"] = 6] = "bottomRightEdge";
    /**
     * Appear below the target element, aligning with the target element such that the callout tends toward the center of the screen.
     */
    DirectionalHint[DirectionalHint["bottomAutoEdge"] = 7] = "bottomAutoEdge";
    /**
     * Appear to the left of the target element, with the top edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["leftTopEdge"] = 8] = "leftTopEdge";
    /**
     * Appear to the left of the target element, with the centers of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["leftCenter"] = 9] = "leftCenter";
    /**
     * Appear to the left of the target element, with the bottom edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["leftBottomEdge"] = 10] = "leftBottomEdge";
    /**
     * Appear to the right of the target element, with the top edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["rightTopEdge"] = 11] = "rightTopEdge";
    /**
     * Appear to the right of the target element, with the centers of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["rightCenter"] = 12] = "rightCenter";
    /**
     * Appear to the right of the target element, with the bottom edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["rightBottomEdge"] = 13] = "rightBottomEdge";
})(DirectionalHint = exports.DirectionalHint || (exports.DirectionalHint = {}));



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var Icon_1 = __webpack_require__(17);
var DirectionalHint_1 = __webpack_require__(9);
var ContextualMenu_1 = __webpack_require__(58);
var stylesImport = __webpack_require__(154);
var styles = stylesImport;
var BaseButton = (function (_super) {
    __extends(BaseButton, _super);
    function BaseButton(props, rootClassName) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({
            rootProps: null,
            icon: 'iconProps',
            menuIconName: 'menuIconProps'
        });
        _this._labelId = Utilities_1.getId();
        _this._descriptionId = Utilities_1.getId();
        _this._ariaDescriptionId = Utilities_1.getId();
        _this.state = {
            menuProps: null
        };
        return _this;
    }
    BaseButton.prototype.render = function () {
        var _a = this.props, description = _a.description, ariaLabel = _a.ariaLabel, ariaDescription = _a.ariaDescription, href = _a.href, disabled = _a.disabled, classNames = _a.classNames;
        var _b = this, _ariaDescriptionId = _b._ariaDescriptionId, _labelId = _b._labelId, _descriptionId = _b._descriptionId;
        var renderAsAnchor = !!href;
        var tag = renderAsAnchor ? 'a' : 'button';
        var nativeProps = Utilities_1.getNativeProps(Utilities_1.assign({}, this.props.rootProps, this.props), renderAsAnchor ? Utilities_1.anchorProperties : Utilities_1.buttonProperties, [
            'disabled' // Let disabled buttons be focused and styled as disabled.
        ]);
        // Check for ariaDescription, description or aria-describedby in the native props to determine source of aria-describedby
        // otherwise default to null.
        var ariaDescribedBy;
        if (ariaDescription) {
            ariaDescribedBy = _ariaDescriptionId;
        }
        else if (description) {
            ariaDescribedBy = _descriptionId;
        }
        else if (nativeProps['aria-describedby']) {
            ariaDescribedBy = nativeProps['aria-describedby'];
        }
        else {
            ariaDescribedBy = null;
        }
        var buttonProps = Utilities_1.assign(nativeProps, {
            className: Utilities_1.css(styles.root, this.props.className, classNames.base, classNames.variant, classNames.root, (_c = {
                    'disabled': disabled
                },
                _c[classNames.isDisabled] = disabled,
                _c[classNames.isEnabled] = !disabled,
                _c)),
            ref: this._resolveRef('_buttonElement'),
            'disabled': disabled,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabel ? null : _labelId,
            'aria-describedby': ariaDescribedBy,
            'aria-disabled': disabled
        });
        // Override onClick if contextualMenuItems passed in. Eventually allow _onToggleMenu to
        // be assigned to split button click if onClick already has a value
        if (this.props.menuProps) {
            Utilities_1.assign(buttonProps, { 'onClick': this._onToggleMenu });
        }
        return this._onRenderContent(tag, buttonProps);
        var _c;
    };
    BaseButton.prototype.focus = function () {
        if (this._buttonElement) {
            this._buttonElement.focus();
        }
    };
    BaseButton.prototype._onRenderContent = function (tag, buttonProps) {
        var props = this.props;
        var classNames = props.classNames, menuIconName = props.menuIconName, menuProps = props.menuProps, _a = props.onRenderIcon, onRenderIcon = _a === void 0 ? this._onRenderIcon : _a, _b = props.onRenderText, onRenderText = _b === void 0 ? this._onRenderText : _b, _c = props.onRenderDescription, onRenderDescription = _c === void 0 ? this._onRenderDescription : _c, _d = props.onRenderAriaDescription, onRenderAriaDescription = _d === void 0 ? this._onRenderAriaDescription : _d, _e = props.onRenderChildren, onRenderChildren = _e === void 0 ? this._onRenderChildren : _e, _f = props.onRenderMenu, onRenderMenu = _f === void 0 ? this._onRenderMenu : _f, _g = props.onRenderMenuIcon, onRenderMenuIcon = _g === void 0 ? this._onRenderMenuIcon : _g;
        var className = Utilities_1.css(classNames.base + '-flexContainer', styles.flexContainer, classNames.flexContainer);
        return React.createElement(tag, buttonProps, React.createElement('div', { className: className }, onRenderIcon(props, this._onRenderIcon), onRenderText(props, this._onRenderText), onRenderDescription(props, this._onRenderDescription), onRenderAriaDescription(props, this._onRenderAriaDescription), onRenderChildren(props, this._onRenderChildren), (menuProps || menuIconName || this.props.onRenderMenuIcon) && onRenderMenuIcon(this.props, this._onRenderMenuIcon), this.state.menuProps && onRenderMenu(menuProps, this._onRenderMenu)));
    };
    BaseButton.prototype._onRenderIcon = function (buttonProps, defaultRender) {
        var _a = this.props, classNames = _a.classNames, icon = _a.icon, iconProps = _a.iconProps;
        if (icon || iconProps) {
            iconProps = iconProps || {
                iconName: icon
            };
        }
        return iconProps && (React.createElement(Icon_1.Icon, __assign({}, iconProps, { className: Utilities_1.css(classNames.base + "-icon", classNames.icon, iconProps.className) })));
    };
    BaseButton.prototype._onRenderText = function () {
        var _a = this.props, classNames = _a.classNames, children = _a.children, text = _a.text;
        // For backwards compat, we should continue to take in the text content from children.
        if (text === undefined && typeof (children) === 'string') {
            text = children;
        }
        return text && (React.createElement("span", { className: Utilities_1.css(classNames.base + "-label", classNames.label), id: this._labelId }, text));
    };
    BaseButton.prototype._onRenderChildren = function () {
        var children = this.props.children;
        // If children is just a string, either it or the text will be rendered via onRenderLabel
        // If children is another component, it will be rendered after text
        if (typeof (children) === 'string') {
            return null;
        }
        return children;
    };
    BaseButton.prototype._onRenderDescription = function () {
        var _a = this.props, classNames = _a.classNames, description = _a.description;
        // ms-Button-description is only shown when the button type is compound.
        // In other cases it will not be displayed.
        return description ? (React.createElement("span", { className: Utilities_1.css(classNames.base + "-description", classNames.description), id: this._descriptionId }, description)) : (null);
    };
    BaseButton.prototype._onRenderAriaDescription = function () {
        var ariaDescription = this.props.ariaDescription;
        // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
        // otherwise it will be assigned to descriptionSpan.
        return ariaDescription ? (React.createElement("span", { className: styles.screenReaderOnly, id: this._ariaDescriptionId }, ariaDescription)) : (null);
    };
    BaseButton.prototype._onRenderMenuIcon = function (props) {
        var _a = this.props, classNames = _a.classNames, menuIconProps = _a.menuIconProps, menuIconName = _a.menuIconName;
        if (menuIconProps === undefined) {
            menuIconProps = {
                iconName: menuIconName === undefined ? 'ChevronDown' : menuIconName
            };
        }
        return (menuIconProps ?
            React.createElement(Icon_1.Icon, __assign({}, menuIconProps, { className: Utilities_1.css(classNames.base + "-icon", classNames.menuIcon, menuIconProps.className) }))
            :
                null);
    };
    BaseButton.prototype._onRenderMenu = function (menuProps) {
        return (React.createElement(ContextualMenu_1.ContextualMenu, { className: Utilities_1.css('ms-BaseButton-menuHost'), isBeakVisible: true, directionalHint: DirectionalHint_1.DirectionalHint.bottomLeftEdge, items: menuProps.items, target: this._buttonElement, labelElementId: this._labelId, onDismiss: this._onToggleMenu }));
    };
    BaseButton.prototype._onToggleMenu = function () {
        var menuProps = this.props.menuProps;
        var currentMenuProps = this.state.menuProps;
        this.setState({ menuProps: currentMenuProps ? null : menuProps });
    };
    return BaseButton;
}(Utilities_1.BaseComponent));
BaseButton.defaultProps = {
    classNames: {
        base: 'ms-Button',
        variant: '',
        isEnabled: '',
        isDisabled: ''
    }
};
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderIcon", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderText", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderChildren", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderDescription", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderAriaDescription", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderMenuIcon", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderMenu", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onToggleMenu", null);
exports.BaseButton = BaseButton;



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(13));
__export(__webpack_require__(235));
__export(__webpack_require__(76));
__export(__webpack_require__(236));



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECTION_CHANGE = 'change';
var SelectionMode;
(function (SelectionMode) {
    SelectionMode[SelectionMode["none"] = 0] = "none";
    SelectionMode[SelectionMode["single"] = 1] = "single";
    SelectionMode[SelectionMode["multiple"] = 2] = "multiple";
})(SelectionMode = exports.SelectionMode || (exports.SelectionMode = {}));
var SelectionDirection;
(function (SelectionDirection) {
    SelectionDirection[SelectionDirection["horizontal"] = 0] = "horizontal";
    SelectionDirection[SelectionDirection["vertical"] = 1] = "vertical";
})(SelectionDirection = exports.SelectionDirection || (exports.SelectionDirection = {}));



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets the virtual parent of an element.
 * Pass `undefined` as the `parent` to clear the virtual parent.
 *
 * @export
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 */
function setVirtualParent(child, parent) {
    var virtualChild = child;
    var virtualParent = parent;
    if (!virtualChild._virtual) {
        virtualChild._virtual = {
            children: []
        };
    }
    var oldParent = virtualChild._virtual.parent;
    if (oldParent && oldParent !== parent) {
        // Remove the child from its old parent.
        var index = oldParent._virtual.children.indexOf(virtualChild);
        if (index > -1) {
            oldParent._virtual.children.splice(index, 1);
        }
    }
    virtualChild._virtual.parent = virtualParent || undefined;
    if (virtualParent) {
        if (!virtualParent._virtual) {
            virtualParent._virtual = {
                children: []
            };
        }
        virtualParent._virtual.children.push(virtualChild);
    }
}
exports.setVirtualParent = setVirtualParent;
function getVirtualParent(child) {
    var parent;
    if (child && isVirtualElement(child)) {
        parent = child._virtual.parent;
    }
    return parent;
}
exports.getVirtualParent = getVirtualParent;
/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @export
 * @param {HTMLElement} child
 * @param {boolean} [allowVirtualParents=true]
 * @returns {HTMLElement}
 */
function getParent(child, allowVirtualParents) {
    if (allowVirtualParents === void 0) { allowVirtualParents = true; }
    return child && (allowVirtualParents && getVirtualParent(child) ||
        child.parentNode && child.parentNode);
}
exports.getParent = getParent;
/**
 * Determines whether or not a parent element contains a given child element.
 * If `allowVirtualParents` is true, this method may return `true` if the child
 * has the parent in its virtual element hierarchy.
 *
 * @export
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @param {boolean} [allowVirtualParents=true]
 * @returns {boolean}
 */
function elementContains(parent, child, allowVirtualParents) {
    if (allowVirtualParents === void 0) { allowVirtualParents = true; }
    var isContained = false;
    if (parent && child) {
        if (allowVirtualParents) {
            isContained = false;
            while (child) {
                var nextParent = getParent(child);
                if (nextParent === parent) {
                    isContained = true;
                    break;
                }
                child = nextParent;
            }
        }
        else if (parent.contains) {
            isContained = parent.contains(child);
        }
    }
    return isContained;
}
exports.elementContains = elementContains;
var _isSSR = false;
/** Helper to set ssr mode to simulate no window object returned from getWindow helper. */
function setSSR(isEnabled) {
    _isSSR = isEnabled;
}
exports.setSSR = setSSR;
/** Helper to get the window object. */
function getWindow(rootElement) {
    if (_isSSR) {
        return undefined;
    }
    else {
        return (rootElement &&
            rootElement.ownerDocument &&
            rootElement.ownerDocument.defaultView ?
            rootElement.ownerDocument.defaultView :
            window);
    }
}
exports.getWindow = getWindow;
/** Helper to get the document object. */
function getDocument(rootElement) {
    if (_isSSR) {
        return undefined;
    }
    else {
        return rootElement && rootElement.ownerDocument ? rootElement.ownerDocument : document;
    }
}
exports.getDocument = getDocument;
/** Helper to get bounding client rect, works with window. */
function getRect(element) {
    var rect;
    if (element) {
        if (element === window) {
            rect = {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                right: window.innerWidth,
                bottom: window.innerHeight
            };
        }
        else if (element.getBoundingClientRect) {
            rect = element.getBoundingClientRect();
        }
    }
    return rect;
}
exports.getRect = getRect;
/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @param {(HTMLElement | IVirtualElement)} element
 * @returns {element is IVirtualElement}
 */
function isVirtualElement(element) {
    return element && !!element._virtual;
}



/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var stripPrefix = exports.stripPrefix = function stripPrefix(path, prefix) {
  return path.indexOf(prefix) === 0 ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  pathname = decodeURI(pathname);

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = encodeURI(pathname || '/');

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(197));



/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SidePanelActions_1 = __webpack_require__(98);
exports.openPanel = SidePanelActions_1.openPanel;
exports.closePanel = SidePanelActions_1.closePanel;
exports.addUser = SidePanelActions_1.addUser;
const UserGridActions_1 = __webpack_require__(99);
exports.addEntry = UserGridActions_1.addEntry;
exports.getSelectionState = UserGridActions_1.getSelectionState;
exports.fetchUserData = UserGridActions_1.fetchUserData;
exports.getUsers = UserGridActions_1.getUsers;
const CounterActions_1 = __webpack_require__(97);
exports.incrementCounter = CounterActions_1.incrementCounter;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum to describe how a particular column header behaves.... This enum is used to
 * to specify the property IColumn:columnActionsMode.
 * If IColumn:columnActionsMode is undefined, then it's equivalent to ColumnActionsMode.clickable
 */
var ColumnActionsMode;
(function (ColumnActionsMode) {
    /**
     * Renders the column header as disabled.
     */
    ColumnActionsMode[ColumnActionsMode["disabled"] = 0] = "disabled";
    /**
     * Renders the column header is clickable.
     */
    ColumnActionsMode[ColumnActionsMode["clickable"] = 1] = "clickable";
    /**
     * Renders the column header ias clickable and displays the dropdown cheveron.
     */
    ColumnActionsMode[ColumnActionsMode["hasDropdown"] = 2] = "hasDropdown";
})(ColumnActionsMode = exports.ColumnActionsMode || (exports.ColumnActionsMode = {}));
var ConstrainMode;
(function (ConstrainMode) {
    /** If specified, lets the content grow which allows the page to manage scrolling. */
    ConstrainMode[ConstrainMode["unconstrained"] = 0] = "unconstrained";
    /**
     * If specified, constrains the list to the given layout space.
     */
    ConstrainMode[ConstrainMode["horizontalConstrained"] = 1] = "horizontalConstrained";
})(ConstrainMode = exports.ConstrainMode || (exports.ConstrainMode = {}));
var DetailsListLayoutMode;
(function (DetailsListLayoutMode) {
    /**
     * Lets the user resize columns and makes not attempt to fit them.
     */
    DetailsListLayoutMode[DetailsListLayoutMode["fixedColumns"] = 0] = "fixedColumns";
    /**
     * Manages which columns are visible, tries to size them according to their min/max rules and drops
     * off columns that can't fit and have isCollapsable set.
     */
    DetailsListLayoutMode[DetailsListLayoutMode["justified"] = 1] = "justified";
})(DetailsListLayoutMode = exports.DetailsListLayoutMode || (exports.DetailsListLayoutMode = {}));
var CheckboxVisibility;
(function (CheckboxVisibility) {
    /**
     * Visible on hover.
     */
    CheckboxVisibility[CheckboxVisibility["onHover"] = 0] = "onHover";
    /**
     * Visible always.
     */
    CheckboxVisibility[CheckboxVisibility["always"] = 1] = "always";
    /**
     * Hide checkboxes.
     */
    CheckboxVisibility[CheckboxVisibility["hidden"] = 2] = "hidden";
})(CheckboxVisibility = exports.CheckboxVisibility || (exports.CheckboxVisibility = {}));



/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(191);
var styles = stylesImport;
var SPACER_WIDTH = 36;
exports.GroupSpacer = function (props) {
    return props.count > 0 && (React.createElement("span", { className: Utilities_1.css('ms-GroupSpacer', styles.root), style: { width: props.count * SPACER_WIDTH } }));
};



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BUFFER_OVERFLOW */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buffers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(6);


var BUFFER_OVERFLOW = 'Channel\'s Buffer overflow!';

var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;

var zeroBuffer = { isEmpty: __WEBPACK_IMPORTED_MODULE_0__utils__["k" /* kTrue */], put: __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */], take: __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */] };

function ringBuffer() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var overflowAction = arguments[1];

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];
    while (length) {
      items.push(take());
    }
    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit = void 0;
        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);
          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;
          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;

            arr = flush();

            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;

            arr.length = doubledLimit;
            limit = doubledLimit;

            push(it);
            break;
          default:
          // DROP
        }
      }
    },
    take: take, flush: flush
  };
}

var buffers = {
  none: function none() {
    return zeroBuffer;
  },
  fixed: function fixed(limit) {
    return ringBuffer(limit, ON_OVERFLOW_THROW);
  },
  dropping: function dropping(limit) {
    return ringBuffer(limit, ON_OVERFLOW_DROP);
  },
  sliding: function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  },
  expanding: function expanding(initialSize) {
    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
  }
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isEnd; });
/* harmony export (immutable) */ __webpack_exports__["f"] = emitter;
/* unused harmony export INVALID_BUFFER */
/* unused harmony export UNDEFINED_INPUT_ERROR */
/* harmony export (immutable) */ __webpack_exports__["c"] = channel;
/* harmony export (immutable) */ __webpack_exports__["b"] = eventChannel;
/* harmony export (immutable) */ __webpack_exports__["d"] = stdChannel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buffers__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler__ = __webpack_require__(89);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
var END = { type: CHANNEL_END_TYPE };
var isEnd = function isEnd(a) {
  return a && a.type === CHANNEL_END_TYPE;
};

function emitter() {
  var subscribers = [];

  function subscribe(sub) {
    subscribers.push(sub);
    return function () {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* remove */])(subscribers, sub);
    };
  }

  function emit(item) {
    var arr = subscribers.slice();
    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i](item);
    }
  }

  return {
    subscribe: subscribe,
    emit: emit
  };
}

var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = 'Saga was provided with an undefined action';

if (process.env.NODE_ENV !== 'production') {
  UNDEFINED_INPUT_ERROR += '\nHints:\n    - check that your Action Creator returns a non-undefined value\n    - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n  ';
}

function channel() {
  var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_1__buffers__["a" /* buffers */].fixed();

  var closed = false;
  var takers = [];

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].buffer, INVALID_BUFFER);

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* internalErr */])('Cannot have a closed channel with pending takers');
    }
    if (takers.length && !buffer.isEmpty()) {
      throw __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* internalErr */])('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    checkForbiddenStates();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(input, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, UNDEFINED_INPUT_ERROR);
    if (closed) {
      return;
    }
    if (!takers.length) {
      return buffer.put(input);
    }
    for (var i = 0; i < takers.length; i++) {
      var cb = takers[i];
      if (!cb[__WEBPACK_IMPORTED_MODULE_0__utils__["o" /* MATCH */]] || cb[__WEBPACK_IMPORTED_MODULE_0__utils__["o" /* MATCH */]](input)) {
        takers.splice(i, 1);
        return cb(input);
      }
    }
  }

  function take(cb) {
    checkForbiddenStates();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(cb, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func, 'channel.take\'s callback must be a function');

    if (closed && buffer.isEmpty()) {
      cb(END);
    } else if (!buffer.isEmpty()) {
      cb(buffer.take());
    } else {
      takers.push(cb);
      cb.cancel = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* remove */])(takers, cb);
      };
    }
  }

  function flush(cb) {
    checkForbiddenStates(); // TODO: check if some new state should be forbidden now
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(cb, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func, 'channel.flush\' callback must be a function');
    if (closed && buffer.isEmpty()) {
      cb(END);
      return;
    }
    cb(buffer.flush());
  }

  function close() {
    checkForbiddenStates();
    if (!closed) {
      closed = true;
      if (takers.length) {
        var arr = takers;
        takers = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          arr[i](END);
        }
      }
    }
  }

  return { take: take, put: put, flush: flush, close: close,
    get __takers__() {
      return takers;
    },
    get __closed__() {
      return closed;
    }
  };
}

function eventChannel(subscribe) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __WEBPACK_IMPORTED_MODULE_1__buffers__["a" /* buffers */].none();
  var matcher = arguments[2];

  /**
    should be if(typeof matcher !== undefined) instead?
    see PR #273 for a background discussion
  **/
  if (arguments.length > 2) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(matcher, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func, 'Invalid match function passed to eventChannel');
  }

  var chan = channel(buffer);
  var close = function close() {
    if (!chan.__closed__) {
      if (unsubscribe) {
        unsubscribe();
      }
      chan.close();
    }
  };
  var unsubscribe = subscribe(function (input) {
    if (isEnd(input)) {
      close();
      return;
    }
    if (matcher && !matcher(input)) {
      return;
    }
    chan.put(input);
  });
  if (chan.__closed__) {
    unsubscribe();
  }

  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(unsubscribe)) {
    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
  }

  return {
    take: chan.take,
    flush: chan.flush,
    close: close
  };
}

function stdChannel(subscribe) {
  var chan = eventChannel(function (cb) {
    return subscribe(function (input) {
      if (input[__WEBPACK_IMPORTED_MODULE_0__utils__["p" /* SAGA_ACTION */]]) {
        cb(input);
        return;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__scheduler__["a" /* asap */])(function () {
        return cb(input);
      });
    });
  });

  return _extends({}, chan, {
    take: function take(cb, matcher) {
      if (arguments.length > 1) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(matcher, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func, 'channel.take\'s matcher argument must be a function');
        cb[__WEBPACK_IMPORTED_MODULE_0__utils__["o" /* MATCH */]] = matcher;
      }
      chan.take(cb);
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = take;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return takem; });
/* harmony export (immutable) */ __webpack_exports__["c"] = put;
/* harmony export (immutable) */ __webpack_exports__["d"] = all;
/* harmony export (immutable) */ __webpack_exports__["e"] = race;
/* harmony export (immutable) */ __webpack_exports__["f"] = call;
/* harmony export (immutable) */ __webpack_exports__["g"] = apply;
/* harmony export (immutable) */ __webpack_exports__["h"] = cps;
/* harmony export (immutable) */ __webpack_exports__["i"] = fork;
/* harmony export (immutable) */ __webpack_exports__["j"] = spawn;
/* harmony export (immutable) */ __webpack_exports__["k"] = join;
/* harmony export (immutable) */ __webpack_exports__["l"] = cancel;
/* harmony export (immutable) */ __webpack_exports__["m"] = select;
/* harmony export (immutable) */ __webpack_exports__["n"] = actionChannel;
/* harmony export (immutable) */ __webpack_exports__["o"] = cancelled;
/* harmony export (immutable) */ __webpack_exports__["p"] = flush;
/* harmony export (immutable) */ __webpack_exports__["q"] = getContext;
/* harmony export (immutable) */ __webpack_exports__["r"] = setContext;
/* harmony export (immutable) */ __webpack_exports__["s"] = takeEvery;
/* harmony export (immutable) */ __webpack_exports__["t"] = takeLatest;
/* harmony export (immutable) */ __webpack_exports__["u"] = throttle;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return asEffect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sagaHelpers__ = __webpack_require__(88);



var IO = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* sym */])('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
};

function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(arguments[0], __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].pattern(patternOrChannel)) {
    return effect(TAKE, { pattern: patternOrChannel });
  }
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].channel(patternOrChannel)) {
    return effect(TAKE, { channel: patternOrChannel });
  }
  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

take.maybe = function () {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
};

var takem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* deprecate */])(take.maybe, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* updateIncentive */])('takem', 'take.maybe'));

function put(channel, action) {
  if (arguments.length > 1) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'put(channel, action): argument channel is undefined');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(action, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'put(channel, action): argument action is undefined');
  } else {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }
  return effect(PUT, { channel: channel, action: action });
}

put.resolve = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].resolve = true;
  return eff;
};

put.sync = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* deprecate */])(put.resolve, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* updateIncentive */])('put.sync', 'put.resolve'));

function all(effects) {
  return effect(ALL, effects);
}

function race(effects) {
  return effect(RACE, effects);
}

function getFnCallDesc(meth, fn, args) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(fn, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, meth + ': argument fn is undefined');

  var context = null;
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].array(fn)) {
    var _fn = fn;
    context = _fn[0];
    fn = _fn[1];
  } else if (fn.fn) {
    var _fn2 = fn;
    context = _fn2.context;
    fn = _fn2.fn;
  }
  if (context && __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].string(fn) && __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(context[fn])) {
    fn = context[fn];
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(fn, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func, meth + ': argument ' + fn + ' is not a function');

  return { context: context, fn: fn, args: args };
}

function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}

function apply(context, fn) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
}

function cps(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return effect(CPS, getFnCallDesc('cps', fn, args));
}

function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}

function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  var eff = fork.apply(undefined, [fn].concat(args));
  eff[FORK].detached = true;
  return eff;
}

function join() {
  for (var _len5 = arguments.length, tasks = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    tasks[_key5] = arguments[_key5];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return join(t);
    }));
  }
  var task = tasks[0];
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'join(task): argument task is undefined');
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].task, 'join(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  return effect(JOIN, task);
}

function cancel() {
  for (var _len6 = arguments.length, tasks = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    tasks[_key6] = arguments[_key6];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return cancel(t);
    }));
  }
  var task = tasks[0];
  if (tasks.length === 1) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'cancel(task): argument task is undefined');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(task, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].task, 'cancel(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  }
  return effect(CANCEL, task || __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* SELF_CANCELLATION */]);
}

function select(selector) {
  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    args[_key7 - 1] = arguments[_key7];
  }

  if (arguments.length === 0) {
    selector = __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* ident */];
  } else {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(selector, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'select(selector,[...]): argument selector is undefined');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(selector, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func, 'select(selector,[...]): argument ' + selector + ' is not a function');
  }
  return effect(SELECT, { selector: selector, args: args });
}

/**
  channel(pattern, [buffer])    => creates an event channel for store actions
**/
function actionChannel(pattern, buffer) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(pattern, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
  if (arguments.length > 1) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(buffer, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
  }
  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
}

function cancelled() {
  return effect(CANCELLED, {});
}

function flush(channel) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(channel, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].channel, 'flush(channel): argument ' + channel + ' is not valid channel');
  return effect(FLUSH, channel);
}

function getContext(prop) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(prop, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].string, 'getContext(prop): argument ' + prop + ' is not a string');
  return effect(GET_CONTEXT, prop);
}

function setContext(props) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].object, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* createSetContextWarning */])(null, props));
  return effect(SET_CONTEXT, props);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len8 = arguments.length, args = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
    args[_key8 - 2] = arguments[_key8];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["a" /* takeEveryHelper */], patternOrChannel, worker].concat(args));
}

function takeLatest(patternOrChannel, worker) {
  for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
    args[_key9 - 2] = arguments[_key9];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["b" /* takeLatestHelper */], patternOrChannel, worker].concat(args));
}

function throttle(ms, pattern, worker) {
  for (var _len10 = arguments.length, args = Array(_len10 > 3 ? _len10 - 3 : 0), _key10 = 3; _key10 < _len10; _key10++) {
    args[_key10 - 3] = arguments[_key10];
  }

  return fork.apply(undefined, [__WEBPACK_IMPORTED_MODULE_1__sagaHelpers__["c" /* throttleHelper */], ms, pattern, worker].concat(args));
}

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[IO] && effect[type];
  };
};

var asEffect = {
  take: createAsEffectType(TAKE),
  put: createAsEffectType(PUT),
  all: createAsEffectType(ALL),
  race: createAsEffectType(RACE),
  call: createAsEffectType(CALL),
  cps: createAsEffectType(CPS),
  fork: createAsEffectType(FORK),
  join: createAsEffectType(JOIN),
  cancel: createAsEffectType(CANCEL),
  select: createAsEffectType(SELECT),
  actionChannel: createAsEffectType(ACTION_CHANNEL),
  cancelled: createAsEffectType(CANCELLED),
  flush: createAsEffectType(FLUSH),
  getContext: createAsEffectType(GET_CONTEXT),
  setContext: createAsEffectType(SET_CONTEXT)
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConnectedRouter__ = __webpack_require__(264);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectedRouter", function() { return __WEBPACK_IMPORTED_MODULE_0__ConnectedRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(84);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LOCATION_CHANGE", function() { return __WEBPACK_IMPORTED_MODULE_1__reducer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routerReducer", function() { return __WEBPACK_IMPORTED_MODULE_1__reducer__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(83);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CALL_HISTORY_METHOD", function() { return __WEBPACK_IMPORTED_MODULE_2__actions__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "push", function() { return __WEBPACK_IMPORTED_MODULE_2__actions__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return __WEBPACK_IMPORTED_MODULE_2__actions__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "go", function() { return __WEBPACK_IMPORTED_MODULE_2__actions__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "goBack", function() { return __WEBPACK_IMPORTED_MODULE_2__actions__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "goForward", function() { return __WEBPACK_IMPORTED_MODULE_2__actions__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routerActions", function() { return __WEBPACK_IMPORTED_MODULE_2__actions__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middleware__ = __webpack_require__(265);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "routerMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__middleware__["a"]; });








/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* tslint:disable:no-string-literal */

Object.defineProperty(exports, "__esModule", { value: true });
/** An instance of EventGroup allows anything with a handle to it to trigger events on it.
 *  If the target is an HTMLElement, the event will be attached to the element and can be
 *  triggered as usual (like clicking for onclick).
 *  The event can be triggered by calling EventGroup.raise() here. If the target is an
 *  HTMLElement, the event gets raised and is handled by the browser. Otherwise, it gets
 *  handled here in EventGroup, and the handler is called in the context of the parent
 *  (which is passed in in the constructor).
 */
var EventGroup = (function () {
    /** parent: the context in which events attached to non-HTMLElements are called */
    function EventGroup(parent) {
        this._id = EventGroup._uniqueId++;
        this._parent = parent;
        this._eventRecords = [];
    }
    /** For IE8, bubbleEvent is ignored here and must be dealt with by the handler.
     *  Events raised here by default have bubbling set to false and cancelable set to true.
     *  This applies also to built-in events being raised manually here on HTMLElements,
     *  which may lead to unexpected behavior if it differs from the defaults.
     */
    EventGroup.raise = function (target, eventName, eventArgs, bubbleEvent) {
        var retVal;
        if (EventGroup._isElement(target)) {
            if (document.createEvent) {
                var ev = document.createEvent('HTMLEvents');
                ev.initEvent(eventName, bubbleEvent, true);
                ev['args'] = eventArgs;
                retVal = target.dispatchEvent(ev);
            }
            else if (document['createEventObject']) {
                var evObj = document['createEventObject'](eventArgs);
                // cannot set cancelBubble on evObj, fireEvent will overwrite it
                target.fireEvent('on' + eventName, evObj);
            }
        }
        else {
            while (target && retVal !== false) {
                var events = target.__events__;
                var eventRecords = events ? events[eventName] : null;
                for (var id in eventRecords) {
                    if (eventRecords.hasOwnProperty(id)) {
                        var eventRecordList = eventRecords[id];
                        for (var listIndex = 0; retVal !== false && listIndex < eventRecordList.length; listIndex++) {
                            var record = eventRecordList[listIndex];
                            if (record.objectCallback) {
                                retVal = record.objectCallback.call(record.parent, eventArgs);
                            }
                        }
                    }
                }
                // If the target has a parent, bubble the event up.
                target = bubbleEvent ? target.parent : null;
            }
        }
        return retVal;
    };
    EventGroup.isObserved = function (target, eventName) {
        var events = target && target.__events__;
        return !!events && !!events[eventName];
    };
    /** Check to see if the target has declared support of the given event. */
    EventGroup.isDeclared = function (target, eventName) {
        var declaredEvents = target && target.__declaredEvents;
        return !!declaredEvents && !!declaredEvents[eventName];
    };
    EventGroup.stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    };
    EventGroup._isElement = function (target) {
        return !!target && (target.addEventListener || target instanceof HTMLElement);
    };
    EventGroup.prototype.dispose = function () {
        if (!this._isDisposed) {
            this._isDisposed = true;
            this.off();
            this._parent = null;
        }
    };
    /** On the target, attach a set of events, where the events object is a name to function mapping. */
    EventGroup.prototype.onAll = function (target, events, useCapture) {
        for (var eventName in events) {
            if (events.hasOwnProperty(eventName)) {
                this.on(target, eventName, events[eventName], useCapture);
            }
        }
    };
    /** On the target, attach an event whose handler will be called in the context of the parent
     * of this instance of EventGroup.
     */
    EventGroup.prototype.on = function (target, eventName, callback, useCapture) {
        var _this = this;
        if (eventName.indexOf(',') > -1) {
            var events = eventName.split(/[ ,]+/);
            for (var i = 0; i < events.length; i++) {
                this.on(target, events[i], callback, useCapture);
            }
        }
        else {
            var parent_1 = this._parent;
            var eventRecord = {
                target: target,
                eventName: eventName,
                parent: parent_1,
                callback: callback,
                objectCallback: null,
                elementCallback: null,
                useCapture: useCapture
            };
            // Initialize and wire up the record on the target, so that it can call the callback if the event fires.
            var events = (target.__events__ = target.__events__ || {});
            events[eventName] = events[eventName] || {
                count: 0
            };
            events[eventName][this._id] = events[eventName][this._id] || [];
            events[eventName][this._id].push(eventRecord);
            events[eventName].count++;
            if (EventGroup._isElement(target)) {
                var processElementEvent = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (_this._isDisposed) {
                        return;
                    }
                    var result;
                    try {
                        result = callback.apply(parent_1, args);
                        if (result === false && args[0]) {
                            var e = args[0];
                            if (e.preventDefault) {
                                e.preventDefault();
                            }
                            if (e.stopPropagation) {
                                e.stopPropagation();
                            }
                            e.cancelBubble = true;
                        }
                    }
                    catch (e) {
                        /* ErrorHelper.log(e); */
                    }
                    return result;
                };
                eventRecord.elementCallback = processElementEvent;
                if (target.addEventListener) {
                    /* tslint:disable:ban-native-functions */
                    target.addEventListener(eventName, processElementEvent, useCapture);
                    /* tslint:enable:ban-native-functions */
                }
                else if (target.attachEvent) {
                    target.attachEvent('on' + eventName, processElementEvent);
                }
            }
            else {
                var processObjectEvent = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (_this._isDisposed) {
                        return;
                    }
                    return callback.apply(parent_1, args);
                };
                eventRecord.objectCallback = processObjectEvent;
            }
            // Remember the record locally, so that it can be removed.
            this._eventRecords.push(eventRecord);
        }
    };
    EventGroup.prototype.off = function (target, eventName, callback, useCapture) {
        for (var i = 0; i < this._eventRecords.length; i++) {
            var eventRecord = this._eventRecords[i];
            if ((!target || target === eventRecord.target) &&
                (!eventName || eventName === eventRecord.eventName) &&
                (!callback || callback === eventRecord.callback) &&
                ((typeof useCapture !== 'boolean') || useCapture === eventRecord.useCapture)) {
                var events = eventRecord.target.__events__;
                var targetArrayLookup = events[eventRecord.eventName];
                var targetArray = targetArrayLookup ? targetArrayLookup[this._id] : null;
                // We may have already target's entries, so check for null.
                if (targetArray) {
                    if (targetArray.length === 1 || !callback) {
                        targetArrayLookup.count -= targetArray.length;
                        delete events[eventRecord.eventName][this._id];
                    }
                    else {
                        targetArrayLookup.count--;
                        targetArray.splice(targetArray.indexOf(eventRecord), 1);
                    }
                    if (!targetArrayLookup.count) {
                        delete events[eventRecord.eventName];
                    }
                }
                if (eventRecord.elementCallback) {
                    if (eventRecord.target.removeEventListener) {
                        eventRecord.target.removeEventListener(eventRecord.eventName, eventRecord.elementCallback, eventRecord.useCapture);
                    }
                    else if (eventRecord.target.detachEvent) {
                        eventRecord.target.detachEvent('on' + eventRecord.eventName, eventRecord.elementCallback);
                    }
                }
                this._eventRecords.splice(i--, 1);
            }
        }
    };
    /** Trigger the given event in the context of this instance of EventGroup. */
    EventGroup.prototype.raise = function (eventName, eventArgs, bubbleEvent) {
        return EventGroup.raise(this._parent, eventName, eventArgs, bubbleEvent);
    };
    /** Declare an event as being supported by this instance of EventGroup. */
    EventGroup.prototype.declare = function (event) {
        var declaredEvents = this._parent.__declaredEvents = this._parent.__declaredEvents || {};
        if (typeof event === 'string') {
            declaredEvents[event] = true;
        }
        else {
            for (var i = 0; i < event.length; i++) {
                declaredEvents[event[i]] = true;
            }
        }
    };
    return EventGroup;
}());
EventGroup._uniqueId = 0;
exports.EventGroup = EventGroup;



/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
// Initialize global window id.
var CURRENT_ID_PROPERTY = '__currentId__';
var _global = (typeof window !== 'undefined' && window) || process;
if (_global[CURRENT_ID_PROPERTY] === undefined) {
    _global[CURRENT_ID_PROPERTY] = 0;
}
function checkProperties(a, b) {
    for (var propName in a) {
        if (a.hasOwnProperty(propName)) {
            if (!b.hasOwnProperty(propName) || (b[propName] !== a[propName])) {
                return false;
            }
        }
    }
    return true;
}
// Compare a to b and b to a
function shallowCompare(a, b) {
    return checkProperties(a, b) && checkProperties(b, a);
}
exports.shallowCompare = shallowCompare;
/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for target members.
 *
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
function assign(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return filteredAssign.apply(this, [null, target].concat(args));
}
exports.assign = assign;
/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @params filteredAssign {Function} A callback function that tests if the property should be assigned.
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
function filteredAssign(isAllowed, target) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    target = target || {};
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var sourceObject = args_1[_a];
        if (sourceObject) {
            for (var propName in sourceObject) {
                if (sourceObject.hasOwnProperty(propName) &&
                    !isAllowed || isAllowed(propName)) {
                    target[propName] = sourceObject[propName];
                }
            }
        }
    }
    return target;
}
exports.filteredAssign = filteredAssign;
/** Generates a unique id in the global scope (this spans across duplicate copies of the same library.) */
function getId(prefix) {
    var index = _global[CURRENT_ID_PROPERTY]++;
    return (prefix || '') + index;
}
exports.getId = getId;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolvePathname = __webpack_require__(276);

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__(277);

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__(10);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(161));



/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(168));



/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(180));



/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(211));



/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_9df26d3c',
    rootIsSelected: 'rootIsSelected_9df26d3c',
    rootIsContentUnselectable: 'rootIsContentUnselectable_9df26d3c',
    cell: 'cell_9df26d3c',
    isMultiline: 'isMultiline_9df26d3c',
    fields: 'fields_9df26d3c',
    check: 'check_9df26d3c',
    checkDisabled: 'checkDisabled_9df26d3c',
    rootIsCheckVisible: 'rootIsCheckVisible_9df26d3c',
    cellMeasurer: 'cellMeasurer_9df26d3c',
    checkSpacer: 'checkSpacer_9df26d3c',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_9df26d3c{display:inline-block;min-width:100%;min-height:36px;margin:1px 0;vertical-align:top;white-space:nowrap;padding:0;box-sizing:border-box;background:0 0;border:none;vertical-align:top;line-height:16px}.root_9df26d3c::-moz-focus-inner{border:0}.root_9df26d3c{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_9df26d3c:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}html[dir=ltr] .root_9df26d3c{text-align:left}html[dir=rtl] .root_9df26d3c{text-align:right}.root_9df26d3c:hover{background:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": "}.rootIsSelected_9df26d3c{background:" }, { "theme": "neutralQuaternary", "defaultValue": "#d0d0d0" }, { "rawString": "}.rootIsSelected_9df26d3c:hover{background:" }, { "theme": "neutralQuaternaryAlt", "defaultValue": "#dadada" }, { "rawString": "}.rootIsContentUnselectable_9df26d3c{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.cell_9df26d3c{display:inline-block;position:relative;box-sizing:border-box;padding:10px 0;margin:0 8px;min-height:36px;vertical-align:top;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cell_9df26d3c>button{max-width:100%}.isMultiline_9df26d3c{white-space:normal;word-break:break-word;text-overflow:clip}.fields_9df26d3c{display:inline-block}.check_9df26d3c{display:inline-block;cursor:default;padding:6px;box-sizing:border-box;vertical-align:top;background:0 0;border:none;opacity:0}.check_9df26d3c::-moz-focus-inner{border:0}.check_9df26d3c{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .check_9df26d3c:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.checkDisabled_9df26d3c{visibility:hidden}.rootIsCheckVisible_9df26d3c .check_9df26d3c,.rootIsSelected_9df26d3c .check_9df26d3c,.root_9df26d3c:hover .check_9df26d3c{opacity:1}.cellMeasurer_9df26d3c .cell_9df26d3c{overflow:visible;white-space:nowrap}.checkSpacer_9df26d3c{display:inline-block;height:20px;width:20px}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(26);
/* tslint:enable:no-unused-variable */
var Fabric_1 = __webpack_require__(145);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(204);
var styles = stylesImport;
var _layersByHostId = {};
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(props) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({
            onLayerMounted: 'onLayerDidMount'
        });
        if (_this.props.hostId) {
            if (!_layersByHostId[_this.props.hostId]) {
                _layersByHostId[_this.props.hostId] = [];
            }
            _layersByHostId[_this.props.hostId].push(_this);
        }
        return _this;
    }
    /**
     * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
     * care about the specific host.
     */
    Layer.notifyHostChanged = function (id) {
        if (_layersByHostId[id]) {
            _layersByHostId[id].forEach(function (layer) { return layer.forceUpdate(); });
        }
    };
    Layer.prototype.componentDidMount = function () {
        this.componentDidUpdate();
    };
    Layer.prototype.componentWillUnmount = function () {
        var _this = this;
        this._removeLayerElement();
        if (this.props.hostId) {
            _layersByHostId[this.props.hostId] = _layersByHostId[this.props.hostId].filter(function (layer) { return layer !== _this; });
            if (!_layersByHostId[this.props.hostId].length) {
                delete _layersByHostId[this.props.hostId];
            }
        }
    };
    Layer.prototype.componentDidUpdate = function () {
        var _this = this;
        var host = this._getHost();
        if (host !== this._host) {
            this._removeLayerElement();
        }
        if (host) {
            this._host = host;
            if (!this._layerElement) {
                var doc = Utilities_1.getDocument(this._rootElement);
                this._layerElement = doc.createElement('div');
                this._layerElement.className = Utilities_1.css('ms-Layer', (_a = {},
                    _a['ms-Layer--fixed ' + styles.rootIsFixed] = !this.props.hostId,
                    _a));
                host.appendChild(this._layerElement);
                Utilities_1.setVirtualParent(this._layerElement, this._rootElement);
            }
            // Using this 'unstable' method allows us to retain the React context across the layer projection.
            ReactDOM.unstable_renderSubtreeIntoContainer(this, React.createElement(Fabric_1.Fabric, { className: Utilities_1.css('ms-Layer-content', styles.content) }, this.props.children), this._layerElement, function () {
                if (!_this._hasMounted) {
                    _this._hasMounted = true;
                    // TODO: @deprecated cleanup required.
                    if (_this.props.onLayerMounted) {
                        _this.props.onLayerMounted();
                    }
                    _this.props.onLayerDidMount();
                }
            });
        }
        var _a;
    };
    Layer.prototype.render = function () {
        return (React.createElement("span", { className: 'ms-Layer', ref: this._resolveRef('_rootElement') }));
    };
    Layer.prototype._removeLayerElement = function () {
        if (this._layerElement) {
            this.props.onLayerWillUnmount();
            ReactDOM.unmountComponentAtNode(this._layerElement);
            var parentNode = this._layerElement.parentNode;
            if (parentNode) {
                parentNode.removeChild(this._layerElement);
            }
            this._layerElement = undefined;
            this._hasMounted = false;
        }
    };
    Layer.prototype._getHost = function () {
        var hostId = this.props.hostId;
        var doc = Utilities_1.getDocument(this._rootElement);
        if (hostId) {
            return doc.getElementById(hostId);
        }
        else {
            return doc.body;
        }
    };
    return Layer;
}(Utilities_1.BaseComponent));
Layer.defaultProps = {
    onLayerDidMount: function () { return undefined; },
    onLayerWillUnmount: function () { return undefined; }
};
exports.Layer = Layer;



/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






/**
 * The public API for putting history on context.
 */

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props.history.location.pathname)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Router.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  };

  Router.prototype.computeMatch = function computeMatch(pathname) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/'
    };
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        history = _props.history;


    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(children == null || __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.count(children) === 1, 'A <Router> may have only one child element');

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(function () {
      _this2.setState({
        match: _this2.computeMatch(history.location.pathname)
      });
    });
  };

  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(this.props.history === nextProps.history, 'You cannot change <Router history>');
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Router.prototype.render = function render() {
    var children = this.props.children;

    return children ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(children) : null;
  };

  return Router;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

Router.propTypes = {
  history: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node
};
Router.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object
};
Router.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Router);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path_to_regexp__);


var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = '' + options.end + options.strict;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var keys = [];
  var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default()(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof options === 'string') options = { path: options };

  var _options = options,
      _options$path = _options.path,
      path = _options$path === undefined ? '/' : _options$path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict;

  var _compilePath = compilePath(path, { end: exact, strict: strict }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var url = match[0],
      values = match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path: path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

/* harmony default export */ __webpack_exports__["a"] = (matchPath);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_io__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takem", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "race", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "call", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cps", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fork", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "spawn", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "join", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "actionChannel", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cancelled", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["o"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeLatest", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_io__["u"]; });


/***/ }),
/* 44 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(10);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(16);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(31);

var _PathUtils = __webpack_require__(15);

var _createTransitionManager = __webpack_require__(32);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = (0, _DOMUtils.supportsHistory)();
  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);

    return _extends({}, (0, _PathUtils.parsePath)(path), {
      state: state,
      key: key
    });
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + (0, _PathUtils.createPath)(location);
  };

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createBrowserHistory;

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__ = __webpack_require__(252);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HashRouter__ = __webpack_require__(253);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return __WEBPACK_IMPORTED_MODULE_1__HashRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Link__ = __webpack_require__(82);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_2__Link__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__ = __webpack_require__(254);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NavLink__ = __webpack_require__(255);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return __WEBPACK_IMPORTED_MODULE_4__NavLink__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Prompt__ = __webpack_require__(256);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return __WEBPACK_IMPORTED_MODULE_5__Prompt__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Redirect__ = __webpack_require__(257);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return __WEBPACK_IMPORTED_MODULE_6__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Route__ = __webpack_require__(258);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return __WEBPACK_IMPORTED_MODULE_7__Route__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Router__ = __webpack_require__(259);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_8__Router__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__StaticRouter__ = __webpack_require__(260);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return __WEBPACK_IMPORTED_MODULE_9__StaticRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Switch__ = __webpack_require__(261);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return __WEBPACK_IMPORTED_MODULE_10__Switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__matchPath__ = __webpack_require__(262);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return __WEBPACK_IMPORTED_MODULE_11__matchPath__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__withRouter__ = __webpack_require__(263);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return __WEBPACK_IMPORTED_MODULE_12__withRouter__["a"]; });



























/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_redux_1 = __webpack_require__(7);
const actions_1 = __webpack_require__(19);
const CommandBar_1 = __webpack_require__(144);
;
;
;
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch) => ({
    displayForm: () => {
        dispatch(actions_1.addUser());
    }
});
class CommandBarNonFocusableItemsExample extends React.Component {
    render() {
        let itemsNonFocusable = [
            {
                key: 'newItem',
                name: 'New',
                icon: 'Add',
                ariaLabel: 'New. Use left and right arrow keys to navigate',
                onClick: () => { return; },
                items: [
                    {
                        key: 'addUser',
                        name: this.props.text === '' || this.props.text === 'No items selected'
                            ? 'Add New User' : 'Edit Selected User',
                        icon: 'Add',
                        onClick: () => { this.props.displayForm(); },
                    }
                ]
            }
        ];
        return (React.createElement("div", null,
            React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: true, items: itemsNonFocusable })));
    }
}
exports.UserCommandBar = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CommandBarNonFocusableItemsExample);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Bugs often appear in async code when stuff gets disposed, but async operations don't get canceled.
 * This Async helper class solves these issues by tying async code to the lifetime of a disposable object.
 *
 * Usage: Anything class extending from BaseModel can access this helper via this.async. Otherwise create a
 * new instance of the class and remember to call dispose() during your code's dispose handler.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var Async = (function () {
    function Async(parent, onError) {
        this._timeoutIds = null;
        this._immediateIds = null;
        this._intervalIds = null;
        this._animationFrameIds = null;
        this._isDisposed = false;
        this._parent = parent || null;
        this._onErrorHandler = onError;
        this._noop = function () { };
    }
    /**
     * Dispose function, clears all async operations.
     */
    Async.prototype.dispose = function () {
        var id;
        this._isDisposed = true;
        this._parent = null;
        // Clear timeouts.
        if (this._timeoutIds) {
            for (id in this._timeoutIds) {
                if (this._timeoutIds.hasOwnProperty(id)) {
                    this.clearTimeout(id);
                }
            }
            this._timeoutIds = null;
        }
        // Clear immediates.
        if (this._immediateIds) {
            for (id in this._immediateIds) {
                if (this._immediateIds.hasOwnProperty(id)) {
                    this.clearImmediate(id);
                }
            }
            this._immediateIds = null;
        }
        // Clear intervals.
        if (this._intervalIds) {
            for (id in this._intervalIds) {
                if (this._intervalIds.hasOwnProperty(id)) {
                    this.clearInterval(id);
                }
            }
            this._intervalIds = null;
        }
        // Clear animation frames.
        if (this._animationFrameIds) {
            for (id in this._animationFrameIds) {
                if (this._animationFrameIds.hasOwnProperty(id)) {
                    this.cancelAnimationFrame(id);
                }
            }
            this._animationFrameIds = null;
        }
    };
    /**
     * SetTimeout override, which will auto cancel the timeout during dispose.
     * @param callback Callback to execute.
     * @param duration Duration in milliseconds.
     * @return The setTimeout id.
     */
    Async.prototype.setTimeout = function (callback, duration) {
        var _this = this;
        var timeoutId = 0;
        if (!this._isDisposed) {
            if (!this._timeoutIds) {
                this._timeoutIds = {};
            }
            /* tslint:disable:ban-native-functions */
            timeoutId = setTimeout(function () {
                // Time to execute the timeout, enqueue it as a foreground task to be executed.
                try {
                    // Now delete the record and call the callback.
                    delete _this._timeoutIds[timeoutId];
                    callback.apply(_this._parent);
                }
                catch (e) {
                    if (_this._onErrorHandler) {
                        _this._onErrorHandler(e);
                    }
                }
            }, duration);
            /* tslint:enable:ban-native-functions */
            this._timeoutIds[timeoutId] = true;
        }
        return timeoutId;
    };
    /**
     * Clears the timeout.
     * @param id Id to cancel.
     */
    Async.prototype.clearTimeout = function (id) {
        if (this._timeoutIds && this._timeoutIds[id]) {
            /* tslint:disable:ban-native-functions */
            clearTimeout(id);
            delete this._timeoutIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * SetImmediate override, which will auto cancel the immediate during dispose.
     * @param callback Callback to execute.
     * @return The setTimeout id.
     */
    Async.prototype.setImmediate = function (callback) {
        var _this = this;
        var immediateId = 0;
        if (!this._isDisposed) {
            if (!this._immediateIds) {
                this._immediateIds = {};
            }
            /* tslint:disable:ban-native-functions */
            var setImmediateCallback = function () {
                // Time to execute the timeout, enqueue it as a foreground task to be executed.
                try {
                    // Now delete the record and call the callback.
                    delete _this._immediateIds[immediateId];
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            };
            immediateId = window.setImmediate ? window.setImmediate(setImmediateCallback) : window.setTimeout(setImmediateCallback, 0);
            /* tslint:enable:ban-native-functions */
            this._immediateIds[immediateId] = true;
        }
        return immediateId;
    };
    /**
     * Clears the immediate.
     * @param id Id to cancel.
     */
    Async.prototype.clearImmediate = function (id) {
        if (this._immediateIds && this._immediateIds[id]) {
            /* tslint:disable:ban-native-functions */
            window.clearImmediate ? window.clearImmediate(id) : window.clearTimeout(id);
            delete this._immediateIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * SetInterval override, which will auto cancel the timeout during dispose.
     * @param callback Callback to execute.
     * @param duration Duration in milliseconds.
     * @return The setTimeout id.
     */
    Async.prototype.setInterval = function (callback, duration) {
        var _this = this;
        var intervalId = 0;
        if (!this._isDisposed) {
            if (!this._intervalIds) {
                this._intervalIds = {};
            }
            /* tslint:disable:ban-native-functions */
            intervalId = setInterval(function () {
                // Time to execute the interval callback, enqueue it as a foreground task to be executed.
                try {
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            }, duration);
            /* tslint:enable:ban-native-functions */
            this._intervalIds[intervalId] = true;
        }
        return intervalId;
    };
    /**
     * Clears the interval.
     * @param id Id to cancel.
     */
    Async.prototype.clearInterval = function (id) {
        if (this._intervalIds && this._intervalIds[id]) {
            /* tslint:disable:ban-native-functions */
            clearInterval(id);
            delete this._intervalIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * Creates a function that, when executed, will only call the func function at most once per
     * every wait milliseconds. Provide an options object to indicate that func should be invoked
     * on the leading and/or trailing edge of the wait timeout. Subsequent calls to the throttled
     * function will return the result of the last func call.
     *
     * Note: If leading and trailing options are true func will be called on the trailing edge of
     * the timeout only if the the throttled function is invoked more than once during the wait timeout.
     *
     * @param func The function to throttle.
     * @param wait The number of milliseconds to throttle executions to. Defaults to 0.
     * @param options The options object.
     * @param options.leading Specify execution on the leading edge of the timeout.
     * @param options.trailing Specify execution on the trailing edge of the timeout.
     * @return The new throttled function.
     */
    Async.prototype.throttle = function (func, wait, options) {
        var _this = this;
        if (this._isDisposed) {
            return this._noop;
        }
        var waitMS = wait || 0;
        var leading = true;
        var trailing = true;
        var lastExecuteTime = 0;
        var lastResult;
        var lastArgs;
        var timeoutId = null;
        if (options && typeof (options.leading) === 'boolean') {
            leading = options.leading;
        }
        if (options && typeof (options.trailing) === 'boolean') {
            trailing = options.trailing;
        }
        var callback = function (userCall) {
            var now = (new Date).getTime();
            var delta = now - lastExecuteTime;
            var waitLength = leading ? waitMS - delta : waitMS;
            if (delta >= waitMS && (!userCall || leading)) {
                lastExecuteTime = now;
                if (timeoutId) {
                    _this.clearTimeout(timeoutId);
                    timeoutId = null;
                }
                lastResult = func.apply(_this._parent, lastArgs);
            }
            else if (timeoutId === null && trailing) {
                timeoutId = _this.setTimeout(callback, waitLength);
            }
            return lastResult;
        };
        var resultFunction = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            lastArgs = args;
            return callback(true);
        };
        return resultFunction;
    };
    /**
     * Creates a function that will delay the execution of func until after wait milliseconds have
     * elapsed since the last time it was invoked. Provide an options object to indicate that func
     * should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent calls
     * to the debounced function will return the result of the last func call.
     *
     * Note: If leading and trailing options are true func will be called on the trailing edge of
     * the timeout only if the the debounced function is invoked more than once during the wait
     * timeout.
     *
     * @param func The function to debounce.
     * @param wait The number of milliseconds to delay.
     * @param options The options object.
     * @param options.leading Specify execution on the leading edge of the timeout.
     * @param options.maxWait The maximum time func is allowed to be delayed before it's called.
     * @param options.trailing Specify execution on the trailing edge of the timeout.
     * @return The new debounced function.
     */
    Async.prototype.debounce = function (func, wait, options) {
        var _this = this;
        if (this._isDisposed) {
            return this._noop;
        }
        var waitMS = wait || 0;
        var leading = false;
        var trailing = true;
        var maxWait = null;
        var lastCallTime = 0;
        var lastExecuteTime = (new Date).getTime();
        var lastResult;
        var lastArgs;
        var timeoutId = null;
        if (options && typeof (options.leading) === 'boolean') {
            leading = options.leading;
        }
        if (options && typeof (options.trailing) === 'boolean') {
            trailing = options.trailing;
        }
        if (options && typeof (options.maxWait) === 'number' && !isNaN(options.maxWait)) {
            maxWait = options.maxWait;
        }
        var callback = function (userCall) {
            var now = (new Date).getTime();
            var executeImmediately = false;
            if (userCall) {
                if (leading && now - lastCallTime >= waitMS) {
                    executeImmediately = true;
                }
                lastCallTime = now;
            }
            var delta = now - lastCallTime;
            var waitLength = waitMS - delta;
            var maxWaitDelta = now - lastExecuteTime;
            var maxWaitExpired = false;
            if (maxWait !== null) {
                // maxWait only matters when there is a pending callback
                if (maxWaitDelta >= maxWait && timeoutId) {
                    maxWaitExpired = true;
                }
                else {
                    waitLength = Math.min(waitLength, maxWait - maxWaitDelta);
                }
            }
            if (delta >= waitMS || maxWaitExpired || executeImmediately) {
                if (timeoutId) {
                    _this.clearTimeout(timeoutId);
                    timeoutId = null;
                }
                lastExecuteTime = now;
                lastResult = func.apply(_this._parent, lastArgs);
            }
            else if ((timeoutId === null || !userCall) && trailing) {
                timeoutId = _this.setTimeout(callback, waitLength);
            }
            return lastResult;
        };
        var resultFunction = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            lastArgs = args;
            return callback(true);
        };
        return resultFunction;
    };
    Async.prototype.requestAnimationFrame = function (callback) {
        var _this = this;
        var animationFrameId = 0;
        if (!this._isDisposed) {
            if (!this._animationFrameIds) {
                this._animationFrameIds = {};
            }
            /* tslint:disable:ban-native-functions */
            var animationFrameCallback = function () {
                try {
                    // Now delete the record and call the callback.
                    delete _this._animationFrameIds[animationFrameId];
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            };
            animationFrameId = window.requestAnimationFrame ?
                window.requestAnimationFrame(animationFrameCallback) :
                window.setTimeout(animationFrameCallback, 0);
            /* tslint:enable:ban-native-functions */
            this._animationFrameIds[animationFrameId] = true;
        }
        return animationFrameId;
    };
    Async.prototype.cancelAnimationFrame = function (id) {
        if (this._animationFrameIds && this._animationFrameIds[id]) {
            /* tslint:disable:ban-native-functions */
            window.cancelAnimationFrame ? window.cancelAnimationFrame(id) : window.clearTimeout(id);
            /* tslint:enable:ban-native-functions */
            delete this._animationFrameIds[id];
        }
    };
    Async.prototype._logError = function (e) {
        if (this._onErrorHandler) {
            this._onErrorHandler(e);
        }
    };
    return Async;
}());
exports.Async = Async;



/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Async_1 = __webpack_require__(48);
var EventGroup_1 = __webpack_require__(27);
var warn_1 = __webpack_require__(52);
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    /**
     * BaseComponent constructor
     * @param {P} props The props for the component.
     * @param {Object} context The context for the component.
     * value is the new name. If a prop is removed rather than renamed, leave the value undefined.
     */
    function BaseComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        _this._shouldUpdateComponentRef = true;
        _makeAllSafe(_this, BaseComponent.prototype, [
            'componentWillMount',
            'componentDidMount',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentWillReceiveProps',
            'render',
            'componentDidUpdate',
            'componentWillUnmount'
        ]);
        return _this;
    }
    /** When the component will receive props, make sure the componentRef is updated. */
    BaseComponent.prototype.componentWillReceiveProps = function (newProps, newContext) {
        this._updateComponentRef(this.props, newProps);
    };
    /** When the component has mounted, update the componentRef. */
    BaseComponent.prototype.componentDidMount = function () {
        this._updateComponentRef(undefined, this.props);
    };
    /** If we have disposables, dispose them automatically on unmount. */
    BaseComponent.prototype.componentWillUnmount = function () {
        if (this.__disposables) {
            for (var i = 0, len = this._disposables.length; i < len; i++) {
                var disposable = this.__disposables[i];
                if (disposable.dispose) {
                    disposable.dispose();
                }
            }
            this.__disposables = null;
        }
    };
    Object.defineProperty(BaseComponent.prototype, "className", {
        /** Gets the object's class name. */
        get: function () {
            if (!this.__className) {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec((this).constructor.toString());
                this.__className = (results && results.length > 1) ? results[1] : '';
            }
            return this.__className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_disposables", {
        /** Allows subclasses to push things to this._disposables to be auto disposed. */
        get: function () {
            if (!this.__disposables) {
                this.__disposables = [];
            }
            return this.__disposables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_async", {
        /**
         * Gets the async instance associated with the component, created on demand. The async instance gives
         * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
         * will be cleared/ignored automatically after unmounting. The helpers within the async object also
         * preserve the this pointer so that you don't need to "bind" the callbacks.
         */
        get: function () {
            if (!this.__async) {
                this.__async = new Async_1.Async(this);
                this._disposables.push(this.__async);
            }
            return this.__async;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_events", {
        /**
         * Gets the event group instance assocaited with the component, created on demand. The event instance
         * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
         * will be automatically disconnected after unmounting. The helpers within the events object also
         * preserve the this reference so that you don't need to "bind" the callbacks.
         */
        get: function () {
            if (!this.__events) {
                this.__events = new EventGroup_1.EventGroup(this);
                this._disposables.push(this.__events);
            }
            return this.__events;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper to return a memoized ref resolver function.
     * @params refName Name of the member to assign the ref to.
     *
     * @examples
     * class Foo extends BaseComponent<...> {
     *   private _root: HTMLElement;
     *
     *   public render() {
     *     return <div ref={ this._resolveRef('_root') } />
     *   }
     * }
     */
    BaseComponent.prototype._resolveRef = function (refName) {
        var _this = this;
        if (!this.__resolves) {
            this.__resolves = {};
        }
        if (!this.__resolves[refName]) {
            this.__resolves[refName] = function (ref) {
                return _this[refName] = ref;
            };
        }
        return this.__resolves[refName];
    };
    /**
     * Updates the componentRef (by calling it with "this" when necessary.)
     */
    BaseComponent.prototype._updateComponentRef = function (currentProps, newProps) {
        if (newProps === void 0) { newProps = {}; }
        if (this._shouldUpdateComponentRef &&
            ((!currentProps && newProps.componentRef) ||
                (currentProps && currentProps.componentRef !== newProps.componentRef))) {
            if (currentProps && currentProps.componentRef) {
                currentProps.componentRef(null);
            }
            if (newProps.componentRef) {
                newProps.componentRef(this);
            }
        }
    };
    /**
     * Warns when a deprecated props are being used.
     *
     * @protected
     * @param {ISettingsMap<P>} deprecationMap The map of deprecations, where key is the prop name and the value is
     * either null or a replacement prop name.
     *
     * @memberOf BaseComponent
     */
    BaseComponent.prototype._warnDeprecations = function (deprecationMap) {
        warn_1.warnDeprecations(this.className, this.props, deprecationMap);
    };
    /**
     * Warns when props which are mutually exclusive with each other are both used.
     *
     * @protected
     * @param {ISettingsMap<P>} mutuallyExclusiveMap The map of mutually exclusive props.
     *
     * @memberOf BaseComponent
     */
    BaseComponent.prototype._warnMutuallyExclusive = function (mutuallyExclusiveMap) {
        warn_1.warnMutuallyExclusive(this.className, this.props, mutuallyExclusiveMap);
    };
    return BaseComponent;
}(React.Component));
exports.BaseComponent = BaseComponent;
/**
 * Helper to override a given method with a wrapper method that can try/catch the original, but also
 * ensures that the BaseComponent's methods are called before the subclass's. This ensures that
 * componentWillUnmount in the base is called and that things in the _disposables array are disposed.
 */
function _makeAllSafe(obj, prototype, methodNames) {
    for (var i = 0, len = methodNames.length; i < len; i++) {
        _makeSafe(obj, prototype, methodNames[i]);
    }
}
function _makeSafe(obj, prototype, methodName) {
    var classMethod = obj[methodName];
    var prototypeMethod = prototype[methodName];
    if (classMethod || prototypeMethod) {
        obj[methodName] = function () {
            var retVal;
            try {
                if (prototypeMethod) {
                    retVal = prototypeMethod.apply(this, arguments);
                }
                if (classMethod !== prototypeMethod) {
                    retVal = classMethod.apply(this, arguments);
                }
            }
            catch (e) {
                var errorMessage = "Exception in " + obj.className + "." + methodName + "(): " + (typeof e === 'string' ? e : e.stack);
                if (BaseComponent.onError) {
                    BaseComponent.onError(errorMessage, e);
                }
            }
            return retVal;
        };
    }
}
BaseComponent.onError = function (errorMessage) {
    console.error(errorMessage);
    throw errorMessage;
};
function nullRender() { return null; }
exports.nullRender = nullRender;



/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["a"] = 65] = "a";
    KeyCodes[KeyCodes["backspace"] = 8] = "backspace";
    KeyCodes[KeyCodes["comma"] = 188] = "comma";
    KeyCodes[KeyCodes["del"] = 46] = "del";
    KeyCodes[KeyCodes["down"] = 40] = "down";
    KeyCodes[KeyCodes["end"] = 35] = "end";
    KeyCodes[KeyCodes["enter"] = 13] = "enter";
    KeyCodes[KeyCodes["escape"] = 27] = "escape";
    KeyCodes[KeyCodes["home"] = 36] = "home";
    KeyCodes[KeyCodes["left"] = 37] = "left";
    KeyCodes[KeyCodes["pageDown"] = 34] = "pageDown";
    KeyCodes[KeyCodes["pageUp"] = 33] = "pageUp";
    KeyCodes[KeyCodes["right"] = 39] = "right";
    KeyCodes[KeyCodes["semicolon"] = 186] = "semicolon";
    KeyCodes[KeyCodes["space"] = 32] = "space";
    KeyCodes[KeyCodes["tab"] = 9] = "tab";
    KeyCodes[KeyCodes["up"] = 38] = "up";
})(KeyCodes = exports.KeyCodes || (exports.KeyCodes = {}));



/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(14);
var scroll_scss_1 = __webpack_require__(129);
var _scrollbarWidth;
var _bodyScrollDisabledCount = 0;
exports.DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';
function disableBodyScroll() {
    var doc = dom_1.getDocument();
    if (doc && doc.body && !_bodyScrollDisabledCount) {
        doc.body.classList.add(scroll_scss_1.default.msFabricScrollDisabled);
    }
    _bodyScrollDisabledCount++;
}
exports.disableBodyScroll = disableBodyScroll;
function enableBodyScroll() {
    if (_bodyScrollDisabledCount > 0) {
        var doc = dom_1.getDocument();
        if (doc && doc.body && _bodyScrollDisabledCount === 1) {
            doc.body.classList.remove(scroll_scss_1.default.msFabricScrollDisabled);
        }
        _bodyScrollDisabledCount--;
    }
}
exports.enableBodyScroll = enableBodyScroll;
/** Calculates the width of a scrollbar for the browser/os. */
function getScrollbarWidth() {
    if (_scrollbarWidth === undefined) {
        var scrollDiv = document.createElement('div');
        scrollDiv.style.setProperty('width', '100px');
        scrollDiv.style.setProperty('height', '100px');
        scrollDiv.style.setProperty('overflow', 'scroll');
        scrollDiv.style.setProperty('position', 'absolute');
        scrollDiv.style.setProperty('top', '-9999px');
        document.body.appendChild(scrollDiv);
        // Get the scrollbar width
        _scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        // Delete the DIV
        document.body.removeChild(scrollDiv);
    }
    return _scrollbarWidth;
}
exports.getScrollbarWidth = getScrollbarWidth;
/**
 * Traverses up the DOM for the element with the data-is-scrollable=true attribute, or returns
 * document.body.
 */
function findScrollableParent(startingElement) {
    var el = startingElement;
    // First do a quick scan for the scrollable attribute.
    while (el && el !== document.body) {
        if (el.getAttribute(exports.DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
            return el;
        }
        el = el.parentElement;
    }
    // If we haven't found it, the use the slower method: compute styles to evaluate if overflow is set.
    el = startingElement;
    while (el && el !== document.body) {
        if (el.getAttribute(exports.DATA_IS_SCROLLABLE_ATTRIBUTE) !== 'false') {
            var styles_1 = getComputedStyle(el);
            var overflowY = styles_1 ? styles_1.getPropertyValue('overflow-y') : '';
            if (overflowY && (overflowY === 'scroll' || overflowY === 'auto')) {
                return el;
            }
        }
        el = el.parentElement;
    }
    // Fall back to window scroll.
    if (!el || el === document.body) {
        el = window;
    }
    return el;
}
exports.findScrollableParent = findScrollableParent;



/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _warningCallback = warn;
/**
 * Warns when a deprecated props are being used.
 *
 * @export
 * @param {string} componentName The name of the component being used.
 * @param {Object} props The props passed into the component.
 * @param {ISettingsMap} deprecationMap The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */
function warnDeprecations(componentName, props, deprecationMap) {
    for (var propName in deprecationMap) {
        if (props && propName in props) {
            var deprecationMessage = componentName + " property '" + propName + "' was used but has been deprecated.";
            var replacementPropName = deprecationMap[propName];
            if (replacementPropName) {
                deprecationMessage += " Use '" + replacementPropName + "' instead.";
            }
            _warningCallback(deprecationMessage);
        }
    }
}
exports.warnDeprecations = warnDeprecations;
function warnMutuallyExclusive(componentName, props, exclusiveMap) {
    for (var propName in exclusiveMap) {
        if (props && propName in props && exclusiveMap[propName] in props) {
            _warningCallback(componentName + " property '" + propName + "' is mutually exclusive with '" + exclusiveMap[propName] + "'. Use one or the other.");
        }
    }
}
exports.warnMutuallyExclusive = warnMutuallyExclusive;
function warn(message) {
    if (console && console.warn) {
        console.warn(message);
    }
}
exports.warn = warn;
/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @export
 * @param {(message) => void} warningCallback
 */
function setWarningCallback(warningCallback) {
    _warningCallback = warningCallback === undefined ? warn : warningCallback;
}
exports.setWarningCallback = setWarningCallback;



/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(29);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(140);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(174));



/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(206));



/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(224));



/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(230));



/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ElementType;
(function (ElementType) {
    /** <button> element. */
    ElementType[ElementType["button"] = 0] = "button";
    /** <a> element. */
    ElementType[ElementType["anchor"] = 1] = "anchor";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["normal"] = 0] = "normal";
    ButtonType[ButtonType["primary"] = 1] = "primary";
    ButtonType[ButtonType["hero"] = 2] = "hero";
    ButtonType[ButtonType["compound"] = 3] = "compound";
    ButtonType[ButtonType["command"] = 4] = "command";
    ButtonType[ButtonType["icon"] = 5] = "icon";
    ButtonType[ButtonType["default"] = 6] = "default";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));



/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseButton_1 = __webpack_require__(11);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(156);
var styles = stylesImport;
var CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--command',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root,
    flexContainer: styles.flexContainer
};
var CommandButton = (function (_super) {
    __extends(CommandButton, _super);
    function CommandButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Tell BaseComponent to bypass resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    CommandButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: CLASS_NAMES, onRenderDescription: Utilities_1.nullRender }, this.props)));
    };
    return CommandButton;
}(Utilities_1.BaseComponent));
exports.CommandButton = CommandButton;



/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseButton_1 = __webpack_require__(11);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(157);
var styles = stylesImport;
var CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--compound',
    description: styles.description,
    flexContainer: styles.flexContainer,
    icon: null,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
};
var CompoundButton = (function (_super) {
    __extends(CompoundButton, _super);
    function CompoundButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Tell BaseComponent to bypass resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    CompoundButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: CLASS_NAMES }, this.props)));
    };
    return CompoundButton;
}(Utilities_1.BaseComponent));
exports.CompoundButton = CompoundButton;



/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseButton_1 = __webpack_require__(11);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(158);
var styles = stylesImport;
exports.CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--default',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
};
var DefaultButton = (function (_super) {
    __extends(DefaultButton, _super);
    function DefaultButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Tell BaseComponent to bypass resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    DefaultButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: exports.CLASS_NAMES, onRenderDescription: Utilities_1.nullRender }, this.props)));
    };
    return DefaultButton;
}(Utilities_1.BaseComponent));
exports.DefaultButton = DefaultButton;



/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseButton_1 = __webpack_require__(11);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(159);
var styles = stylesImport;
var CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--icon',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    root: styles.root
};
var IconButton = (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Tell BaseComponent to bypass resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    IconButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: CLASS_NAMES, onRenderText: Utilities_1.nullRender, onRenderDescription: Utilities_1.nullRender }, this.props)));
    };
    return IconButton;
}(Utilities_1.BaseComponent));
exports.IconButton = IconButton;



/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var BaseButton_1 = __webpack_require__(11);
var stylesImport = __webpack_require__(160);
var styles = stylesImport;
var CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--primary',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
};
var PrimaryButton = (function (_super) {
    __extends(PrimaryButton, _super);
    function PrimaryButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    PrimaryButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: CLASS_NAMES, onRenderDescription: Utilities_1.nullRender }, this.props)));
    };
    return PrimaryButton;
}(Utilities_1.BaseComponent));
exports.PrimaryButton = PrimaryButton;



/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalHint_1 = __webpack_require__(9);
exports.DirectionalHint = DirectionalHint_1.DirectionalHint;
var ContextualMenuItemType;
(function (ContextualMenuItemType) {
    ContextualMenuItemType[ContextualMenuItemType["Normal"] = 0] = "Normal";
    ContextualMenuItemType[ContextualMenuItemType["Divider"] = 1] = "Divider";
    ContextualMenuItemType[ContextualMenuItemType["Header"] = 2] = "Header";
})(ContextualMenuItemType = exports.ContextualMenuItemType || (exports.ContextualMenuItemType = {}));



/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var DetailsList_Props_1 = __webpack_require__(20);
var DetailsRowCheck_1 = __webpack_require__(70);
var GroupSpacer_1 = __webpack_require__(21);
var DetailsRowFields_1 = __webpack_require__(179);
var FocusZone_1 = __webpack_require__(8);
var interfaces_1 = __webpack_require__(13);
var stylesImport = __webpack_require__(37);
var styles = stylesImport;
var DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
var DetailsRow = (function (_super) {
    __extends(DetailsRow, _super);
    function DetailsRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selectionState: _this._getSelectionState(props),
            columnMeasureInfo: null,
            isDropping: false,
            groupNestingDepth: props.groupNestingDepth
        };
        _this._hasSetFocus = false;
        _this._droppingClassNames = '';
        _this._updateDroppingState = _this._updateDroppingState.bind(_this);
        return _this;
    }
    DetailsRow.prototype.componentDidMount = function () {
        var dragDropHelper = this.props.dragDropHelper;
        if (dragDropHelper) {
            this._dragDropSubscription = dragDropHelper.subscribe(this.refs.root, this._events, this._getRowDragDropOptions());
        }
        this._events.on(this.props.selection, interfaces_1.SELECTION_CHANGE, this._onSelectionChanged);
        if (this.props.onDidMount && this.props.item) {
            // If the item appears later, we should wait for it before calling this method.
            this._hasMounted = true;
            this.props.onDidMount(this);
        }
    };
    DetailsRow.prototype.componentDidUpdate = function (previousProps) {
        var state = this.state;
        var _a = this.props, item = _a.item, onDidMount = _a.onDidMount;
        var columnMeasureInfo = state.columnMeasureInfo;
        if (this.props.itemIndex !== previousProps.itemIndex ||
            this.props.item !== previousProps.item ||
            this.props.dragDropHelper !== previousProps.dragDropHelper) {
            if (this._dragDropSubscription) {
                this._dragDropSubscription.dispose();
                delete this._dragDropSubscription;
            }
            if (this.props.dragDropHelper) {
                this._dragDropSubscription = this.props.dragDropHelper.subscribe(this.refs.root, this._events, this._getRowDragDropOptions());
            }
        }
        if (columnMeasureInfo && columnMeasureInfo.index >= 0) {
            var newWidth = this.refs.cellMeasurer.getBoundingClientRect().width;
            columnMeasureInfo.onMeasureDone(newWidth);
            this.setState({
                columnMeasureInfo: null
            });
        }
        if (item && onDidMount && !this._hasMounted) {
            this._hasMounted = true;
            onDidMount(this);
        }
    };
    DetailsRow.prototype.componentWillUnmount = function () {
        var _a = this.props, item = _a.item, onWillUnmount = _a.onWillUnmount;
        // Only call the onWillUnmount callback if we have an item.
        if (onWillUnmount && item) {
            onWillUnmount(this);
        }
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
            delete this._dragDropSubscription;
        }
    };
    DetailsRow.prototype.componentWillReceiveProps = function (newProps) {
        this.setState({
            selectionState: this._getSelectionState(newProps),
            groupNestingDepth: newProps.groupNestingDepth
        });
    };
    DetailsRow.prototype.render = function () {
        var _a = this.props, columns = _a.columns, dragDropEvents = _a.dragDropEvents, item = _a.item, itemIndex = _a.itemIndex, _b = _a.onRenderCheck, onRenderCheck = _b === void 0 ? this._onRenderCheck : _b, onRenderItemColumn = _a.onRenderItemColumn, selectionMode = _a.selectionMode, viewport = _a.viewport, checkboxVisibility = _a.checkboxVisibility, getRowAriaLabel = _a.getRowAriaLabel, checkButtonAriaLabel = _a.checkButtonAriaLabel, selection = _a.selection;
        var _c = this.state, _d = _c.selectionState, isSelected = _d.isSelected, anySelected = _d.anySelected, columnMeasureInfo = _c.columnMeasureInfo, isDropping = _c.isDropping, groupNestingDepth = _c.groupNestingDepth;
        var isDraggable = Boolean(dragDropEvents && dragDropEvents.canDrag && dragDropEvents.canDrag(item));
        var droppingClassName = isDropping ? (this._droppingClassNames ? this._droppingClassNames : DEFAULT_DROPPING_CSS_CLASS) : '';
        var ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : null;
        var canSelect = selection.canSelectItem(item);
        var isContentUnselectable = selectionMode === interfaces_1.SelectionMode.multiple;
        return (React.createElement("div", { ref: 'root', role: 'row', "aria-label": ariaLabel, className: Utilities_1.css('ms-DetailsRow ms-u-fadeIn400', styles.root, droppingClassName, (_e = {},
                _e['is-contentUnselectable ' + styles.rootIsContentUnselectable] = isContentUnselectable,
                _e['is-selected ' + styles.rootIsSelected] = isSelected,
                _e['is-check-visible ' + styles.rootIsCheckVisible] = checkboxVisibility === DetailsList_Props_1.CheckboxVisibility.always,
                _e)), "data-is-focusable": true, "data-selection-index": itemIndex, "data-item-index": itemIndex, "aria-rowindex": itemIndex, "data-is-draggable": isDraggable, draggable: isDraggable, "data-automationid": 'DetailsRow', style: { minWidth: viewport ? viewport.width : 0 }, "aria-selected": isSelected },
            React.createElement(FocusZone_1.FocusZone, { direction: FocusZone_1.FocusZoneDirection.horizontal },
                (selectionMode !== interfaces_1.SelectionMode.none && checkboxVisibility !== DetailsList_Props_1.CheckboxVisibility.hidden) && (React.createElement("span", { role: 'gridcell' }, onRenderCheck({
                    isSelected: isSelected,
                    anySelected: anySelected,
                    ariaLabel: checkButtonAriaLabel,
                    canSelect: canSelect
                }))),
                GroupSpacer_1.GroupSpacer({ count: groupNestingDepth }),
                item && (React.createElement(DetailsRowFields_1.DetailsRowFields, { columns: columns, item: item, itemIndex: itemIndex, onRenderItemColumn: onRenderItemColumn })),
                columnMeasureInfo && (React.createElement("span", { className: Utilities_1.css('ms-DetailsRow-cellMeasurer ms-DetailsRow-cell', styles.cellMeasurer, styles.cell), ref: 'cellMeasurer' },
                    React.createElement(DetailsRowFields_1.DetailsRowFields, { columns: [columnMeasureInfo.column], item: item, itemIndex: itemIndex, onRenderItemColumn: onRenderItemColumn }))))));
        var _e;
    };
    /**
     * measure cell at index. and call the call back with the measured cell width when finish measure
     *
     * @param {number} index (the cell index)
     * @param {(width: number) => void} onMeasureDone (the call back function when finish measure)
     */
    DetailsRow.prototype.measureCell = function (index, onMeasureDone) {
        var column = Utilities_1.assign({}, this.props.columns[index]);
        column.minWidth = 0;
        column.maxWidth = 999999;
        delete column.calculatedWidth;
        this.setState({
            columnMeasureInfo: {
                index: index,
                column: column,
                onMeasureDone: onMeasureDone
            }
        });
    };
    DetailsRow.prototype.focus = function () {
        if (this.refs && this.refs.root) {
            this.refs.root.tabIndex = 0;
            this.refs.root.focus();
        }
    };
    DetailsRow.prototype._onRenderCheck = function (props) {
        return React.createElement(DetailsRowCheck_1.DetailsRowCheck, __assign({}, props));
    };
    DetailsRow.prototype._getSelectionState = function (props) {
        var itemIndex = props.itemIndex, selection = props.selection;
        return {
            isSelected: selection.isIndexSelected(itemIndex),
            anySelected: selection.getSelectedCount() > 0
        };
    };
    DetailsRow.prototype._onSelectionChanged = function () {
        var selectionState = this._getSelectionState(this.props);
        if (!Utilities_1.shallowCompare(selectionState, this.state.selectionState)) {
            this.setState({
                selectionState: selectionState
            });
        }
    };
    DetailsRow.prototype._getRowDragDropOptions = function () {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.eventsToRegister;
        var options = {
            eventMap: eventsToRegister,
            selectionIndex: itemIndex,
            context: { data: item, index: itemIndex },
            canDrag: dragDropEvents.canDrag,
            canDrop: dragDropEvents.canDrop,
            onDragStart: dragDropEvents.onDragStart,
            updateDropState: this._updateDroppingState,
            onDrop: dragDropEvents.onDrop,
            onDragEnd: dragDropEvents.onDragEnd,
        };
        return options;
    };
    /**
     * update isDropping state based on the input value, which is used to change style during drag and drop
     *
     * when change to true, that means drag enter. we will add default dropping class name
     * or the custom dropping class name (return result from onDragEnter) to the root elemet.
     *
     * when change to false, that means drag leave. we will remove the dropping class name from root element.
     *
     * @private
     * @param {boolean} newValue (new isDropping state value)
     * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
     */
    DetailsRow.prototype._updateDroppingState = function (newValue, event) {
        var _a = this.state, selectionState = _a.selectionState, isDropping = _a.isDropping;
        var _b = this.props, dragDropEvents = _b.dragDropEvents, item = _b.item;
        if (!newValue) {
            if (dragDropEvents.onDragLeave) {
                dragDropEvents.onDragLeave(item, event);
            }
        }
        else {
            if (dragDropEvents.onDragEnter) {
                this._droppingClassNames = dragDropEvents.onDragEnter(item, event);
            }
        }
        if (isDropping !== newValue) {
            this.setState({ selectionState: selectionState, isDropping: newValue });
        }
    };
    return DetailsRow;
}(Utilities_1.BaseComponent));
exports.DetailsRow = DetailsRow;



/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var Check_1 = __webpack_require__(34);
var stylesImport = __webpack_require__(37);
var styles = stylesImport;
exports.DetailsRowCheck = function (props) {
    var selected = props.isSelected || props.selected;
    return (React.createElement("button", { type: 'button', className: Utilities_1.css('ms-DetailsRow-check', styles.check, (_a = {},
            _a[styles.checkDisabled] = !props.canSelect,
            _a['ms-DetailsRow-check--isDisabled'] = !props.canSelect,
            _a)), role: 'button', "aria-pressed": selected, "data-selection-toggle": true, "data-automationid": 'DetailsRowCheck', "aria-label": props.ariaLabel },
        React.createElement(Check_1.Check, { checked: selected })));
    var _a;
};



/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FocusZoneDirection;
(function (FocusZoneDirection) {
    /** Only react to up/down arrows. */
    FocusZoneDirection[FocusZoneDirection["vertical"] = 0] = "vertical";
    /** Only react to left/right arrows. */
    FocusZoneDirection[FocusZoneDirection["horizontal"] = 1] = "horizontal";
    /** React to all arrows. */
    FocusZoneDirection[FocusZoneDirection["bidirectional"] = 2] = "bidirectional";
})(FocusZoneDirection = exports.FocusZoneDirection || (exports.FocusZoneDirection = {}));



/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_bea0e96b',
    group: 'group_bea0e96b',
    groupIsDropping: 'groupIsDropping_bea0e96b',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_bea0e96b{position:relative;font-size:12px}.root_bea0e96b BUTTON{font-family:inherit;background-color:transparent}.group_bea0e96b{transition:background-color 267ms cubic-bezier(.445,.05,.55,.95)}.groupIsDropping_bea0e96b{background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.root_bea0e96b .ms-List-cell{min-height:38px}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Please keep alphabetized
var IconType;
(function (IconType) {
    /**
     * Render using the fabric icon font.
     */
    IconType[IconType["default"] = 0] = "default";
    /**
     * Render using an image, where imageProps would be used.
     */
    IconType[IconType["image"] = 1] = "image";
    /**
     * Deprecated, use default.
     * @deprecated
     */
    IconType[IconType["Default"] = 100000] = "Default";
    /**
     * Deprecated, use image.
     * @deprecated
     */
    IconType[IconType["Image"] = 100001] = "Image";
})(IconType = exports.IconType || (exports.IconType = {}));



/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PanelType;
(function (PanelType) {
    /**
     * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fluid width.
     * Only used on Small screen breakpoints.
     * Small: 320-479px width (full screen), 16px Left/Right padding
     * Medium: <unused>
     * Large: <unused>
     * XLarge: <unused>
     * XXLarge: <unused>
     */
    PanelType[PanelType["smallFluid"] = 0] = "smallFluid";
    /**
     * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fixed width.
     * Small: 272px width, 16px Left/Right padding
     * Medium: 340px width, 16px Left/Right padding
     * Large: 340px width, 32px Left/Right padding
     * XLarge: 340px width, 32px Left/Right padding
     * XXLarge: 340px width, 40px Left/Right padding
     */
    PanelType[PanelType["smallFixedFar"] = 1] = "smallFixedFar";
    /**
     * Renders the panel in 'small' mode, anchored to the near side (left in LTR mode), and has a fixed width.
     * Small: 272px width, 16px Left/Right padding
     * Medium: 272px width, 16px Left/Right padding
     * Large: 272px width, 32px Left/Right padding
     * XLarge: 272px width, 32px Left/Right padding
     * XXLarge: 272px width, 32px Left/Right padding
     */
    PanelType[PanelType["smallFixedNear"] = 2] = "smallFixedNear";
    /**
     * Renders the panel in 'medium' mode, anchored to the far side (right in LTR mode).
     * Small: <adapts to smallFluid>
     * Medium: <adapts to smallFixedFar>
     * Large: 48px fixed left margin, 32px Left/Right padding
     * XLarge: 644px width, 32px Left/Right padding
     * XXLarge: 643px width, 40px Left/Right padding
     */
    PanelType[PanelType["medium"] = 3] = "medium";
    /**
     * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fluid at XXX-Large breakpoint.
     * Small: <adapts to smallFluid>
     * Medium:  <adapts to smallFixedFar>
     * Large: <adapts to medium>
     * XLarge: 48px fixed left margin, 32px Left/Right padding
     * XXLarge: 48px fixed left margin, 32px Left/Right padding
     * XXXLarge: 48px fixed left margin, (no redlines for padding, assuming previous breakpoint)
     */
    PanelType[PanelType["large"] = 4] = "large";
    /**
     * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fixed at XXX-Large breakpoint.
     * Small: <adapts to smallFluid>
     * Medium:  <adapts to smallFixedFar>
     * Large: <adapts to medium>
     * XLarge: 48px fixed left margin, 32px Left/Right padding
     * XXLarge: 48px fixed left margin, 32px Left/Right padding
     * XXXLarge: 940px width, (no redlines for padding, assuming previous breakpoint)
     */
    PanelType[PanelType["largeFixed"] = 5] = "largeFixed";
    /**
     * Renders the panel in 'extra large' mode, anchored to the far side (right in LTR mode).
     * Small: <adapts to smallFluid>
     * Medium: <adapts to smallFixedFar>
     * Large: <adapts to medium>
     * XLarge: <adapts to large>
     * XXLarge: 176px fixed left margin, 40px Left/Right padding
     * XXXLarge: 176px fixed left margin, 40px Left/Right padding
     */
    PanelType[PanelType["extraLarge"] = 6] = "extraLarge";
    /**
     * Renders the panel in 'custom' mode using customWidth, anchored to the far side (right in LTR mode).
     * Small: <adapts to smallFluid>
     * Medium: <adapts to smallFixedFar>
     * Large: 48px fixed left margin, 32px Left/Right padding
     * XLarge: 644px width, 32px Left/Right padding
     * XXLarge: 643px width, 40px Left/Right padding
     */
    PanelType[PanelType["custom"] = 7] = "custom";
})(PanelType = exports.PanelType || (exports.PanelType = {}));



/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SpinnerSize;
(function (SpinnerSize) {
    /**
     * 12px Spinner diameter
     */
    SpinnerSize[SpinnerSize["xSmall"] = 0] = "xSmall";
    /**
     * 16px Spinner diameter
     */
    SpinnerSize[SpinnerSize["small"] = 1] = "small";
    /**
     * 20px Spinner diameter
     */
    SpinnerSize[SpinnerSize["medium"] = 2] = "medium";
    /**
     * 28px Spinner diameter
     */
    SpinnerSize[SpinnerSize["large"] = 3] = "large";
})(SpinnerSize = exports.SpinnerSize || (exports.SpinnerSize = {}));
/**
 * Deprecated at v2.0.0, use 'SpinnerSize' instead.
 * @deprecated
 */
var SpinnerType;
(function (SpinnerType) {
    /**
     * Deprecated and will be removed at >= 2.0.0. Use SpinnerSize.medium instead.
     */
    SpinnerType[SpinnerType["normal"] = 0] = "normal";
    /**
     * Deprecated and will be removed at >= 2.0.0. Use SpinnerSize.large instead.
     */
    SpinnerType[SpinnerType["large"] = 1] = "large";
})(SpinnerType = exports.SpinnerType || (exports.SpinnerType = {}));



/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = __webpack_require__(13);
var SelectionLayout = (function () {
    function SelectionLayout(direction) {
        this._direction = direction;
    }
    SelectionLayout.prototype.getItemIndexAbove = function (focusIndex, items) {
        return (this._direction === interfaces_1.SelectionDirection.vertical) ? Math.max(0, focusIndex - 1) : focusIndex;
    };
    SelectionLayout.prototype.getItemIndexBelow = function (focusIndex, items) {
        return (this._direction === interfaces_1.SelectionDirection.vertical) ? Math.min(items.length - 1, focusIndex + 1) : focusIndex;
    };
    SelectionLayout.prototype.getItemIndexLeft = function (focusIndex, items) {
        return (this._direction === interfaces_1.SelectionDirection.vertical) ? focusIndex : Math.max(0, focusIndex - 1);
    };
    SelectionLayout.prototype.getItemIndexRight = function (focusIndex, items) {
        return (this._direction === interfaces_1.SelectionDirection.vertical) ? focusIndex : Math.min(items.length - 1, focusIndex + 1);
    };
    return SelectionLayout;
}());
exports.SelectionLayout = SelectionLayout;



/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var asap = __webpack_require__(53);

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('not a function');
  }
  this._45 = 0;
  this._81 = 0;
  this._65 = null;
  this._54 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._10 = null;
Promise._97 = null;
Promise._61 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
};
function handle(self, deferred) {
  while (self._81 === 3) {
    self = self._65;
  }
  if (Promise._10) {
    Promise._10(self);
  }
  if (self._81 === 0) {
    if (self._45 === 0) {
      self._45 = 1;
      self._54 = deferred;
      return;
    }
    if (self._45 === 1) {
      self._45 = 2;
      self._54 = [self._54, deferred];
      return;
    }
    self._54.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._81 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._81 === 1) {
        resolve(deferred.promise, self._65);
      } else {
        reject(deferred.promise, self._65);
      }
      return;
    }
    var ret = tryCallOne(cb, self._65);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._81 = 3;
      self._65 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._81 = 1;
  self._65 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._81 = 2;
  self._65 = newValue;
  if (Promise._97) {
    Promise._97(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._45 === 1) {
    handle(self, self._54);
    self._54 = null;
  }
  if (self._45 === 2) {
    for (var i = 0; i < self._54.length; i++) {
      handle(self, self._54[i]);
    }
    self._54 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  })
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = connectAdvanced;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__ = __webpack_require__(80);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["a" /* storeShape */], _contextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__["a" /* default */](this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidMount` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          if (this.subscription) this.subscription.tryUnsubscribe();
          this.initSubscription();
          if (shouldHandleStateChanges) this.subscription.trySubscribe();
        }
      };
    }

    return __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default()(Connect, WrappedComponent);
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["b"] = wrapMapToPropsConstant;
/* unused harmony export getDependsOnOwnProps */
/* harmony export (immutable) */ __webpack_exports__["a"] = wrapMapToPropsFunc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(81);


function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (process.env.NODE_ENV !== 'production') __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storeShape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


var subscriptionShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  trySubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  tryUnsubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  notifyNestedSubs: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  isSubscribed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

var storeShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifyPlainObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__warning__ = __webpack_require__(40);



function verifyPlainObject(value, displayName, methodName) {
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(value)) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__warning__["a" /* default */])(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * The public API for rendering a history-aware <a>.
 */

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();

          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;


          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        replace = _props.replace,
        to = _props.to,
        props = _objectWithoutProperties(_props, ['replace', 'to']); // eslint-disable-line no-unused-vars

    var href = this.context.router.history.createHref(typeof to === 'string' ? { pathname: to } : to);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a', _extends({}, props, { onClick: this.handleClick, href: href }));
  };

  return Link;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Link.propTypes = {
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  target: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object]).isRequired
};
Link.defaultProps = {
  replace: false
};
Link.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      push: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
      replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
      createHref: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
    }).isRequired
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CALL_HISTORY_METHOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return push; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return go; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return goBack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return goForward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return routerActions; });

/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
var CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

function updateLocation(method) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return {
      type: CALL_HISTORY_METHOD,
      payload: { method: method, args: args }
    };
  };
}

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
var push = updateLocation('push');
var replace = updateLocation('replace');
var go = updateLocation('go');
var goBack = updateLocation('goBack');
var goForward = updateLocation('goForward');

var routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward };

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOCATION_CHANGE; });
/* harmony export (immutable) */ __webpack_exports__["b"] = routerReducer;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
var LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

var initialState = {
  location: null
};

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
function routerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      type = _ref.type,
      payload = _ref.payload;

  if (type === LOCATION_CHANGE) {
    return _extends({}, state, { location: payload });
  }

  return state;
}

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matchPath__ = __webpack_require__(42);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






/**
 * The public API for matching a single path and rendering.
 */

var Route = function (_React$Component) {
  _inherits(Route, _React$Component);

  function Route() {
    var _temp, _this, _ret;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props, _this.context.router)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Route.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      })
    };
  };

  Route.prototype.computeMatch = function computeMatch(_ref, _ref2) {
    var computedMatch = _ref.computedMatch,
        location = _ref.location,
        path = _ref.path,
        strict = _ref.strict,
        exact = _ref.exact;
    var route = _ref2.route;

    if (computedMatch) return computedMatch; // <Switch> already computed the match for us

    var pathname = (location || route.location).pathname;

    return path ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__matchPath__["a" /* default */])(pathname, { path: path, strict: strict, exact: exact }) : route.match;
  };

  Route.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        component = _props.component,
        render = _props.render,
        children = _props.children;


    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(component && render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(component && children), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(render && children), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
  };

  Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  };

  Route.prototype.render = function render() {
    var match = this.state.match;
    var _props2 = this.props,
        children = _props2.children,
        component = _props2.component,
        render = _props2.render;
    var _context$router = this.context.router,
        history = _context$router.history,
        route = _context$router.route,
        staticContext = _context$router.staticContext;

    var location = this.props.location || route.location;
    var props = { match: match, location: location, history: history, staticContext: staticContext };

    return component ? // component prop gets first priority, only called if there's a match
    match ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(component, props) : null : render ? // render prop is next, only called if there's a match
    match ? render(props) : null : children ? // children come last, always called
    typeof children === 'function' ? children(props) : !Array.isArray(children) || children.length ? // Preact defaults to empty children array
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.Children.only(children) : null : null;
  };

  return Route;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

Route.propTypes = {
  computedMatch: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // private, from <Switch>
  path: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  exact: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  strict: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  component: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  render: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
  location: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
};
Route.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
    route: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
    staticContext: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
  })
};
Route.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Route);

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export NOT_ITERATOR_ERROR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANNEL_END; });
/* unused harmony export TASK_CANCEL */
/* harmony export (immutable) */ __webpack_exports__["b"] = proc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__io__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__channel__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buffers__ = __webpack_require__(22);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }







var NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';

var CHANNEL_END = {
  toString: function toString() {
    return '@@redux-saga/CHANNEL_END';
  }
};
var TASK_CANCEL = {
  toString: function toString() {
    return '@@redux-saga/TASK_CANCEL';
  }
};

var matchers = {
  wildcard: function wildcard() {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["k" /* kTrue */];
  },
  default: function _default(pattern) {
    return (typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) === 'symbol' ? function (input) {
      return input.type === pattern;
    } : function (input) {
      return input.type === String(pattern);
    };
  },
  array: function array(patterns) {
    return function (input) {
      return patterns.some(function (p) {
        return matcher(p)(input);
      });
    };
  },
  predicate: function predicate(_predicate) {
    return function (input) {
      return _predicate(input);
    };
  }
};

function matcher(pattern) {
  return (pattern === '*' ? matchers.wildcard : __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].array(pattern) ? matchers.array : __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].stringableFunc(pattern) ? matchers.default : __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(pattern) ? matchers.predicate : matchers.default)(pattern);
}

/**
  Used to track a parent task and its forks
  In the new fork model, forked tasks are attached by default to their parent
  We model this using the concept of Parent task && main Task
  main task is the main flow of the current Generator, the parent tasks is the
  aggregation of the main tasks + all its forked tasks.
  Thus the whole model represents an execution tree with multiple branches (vs the
  linear execution tree in sequential (non parallel) programming)

  A parent tasks has the following semantics
  - It completes if all its forks either complete or all cancelled
  - If it's cancelled, all forks are cancelled as well
  - It aborts if any uncaught error bubbles up from forks
  - If it completes, the return value is the one returned by the main task
**/
function forkQueue(name, mainTask, cb) {
  var tasks = [],
      result = void 0,
      completed = false;
  addTask(mainTask);

  function abort(err) {
    cancelAll();
    cb(err, true);
  }

  function addTask(task) {
    tasks.push(task);
    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* remove */])(tasks, task);
      task.cont = __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }
        if (!tasks.length) {
          completed = true;
          cb(result);
        }
      }
    };
    // task.cont.cancel = task.cancel
  }

  function cancelAll() {
    if (completed) {
      return;
    }
    completed = true;
    tasks.forEach(function (t) {
      t.cont = __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
      t.cancel();
    });
    tasks = [];
  }

  return {
    addTask: addTask,
    cancelAll: cancelAll,
    abort: abort,
    getTasks: function getTasks() {
      return tasks;
    },
    taskNames: function taskNames() {
      return tasks.map(function (t) {
        return t.name;
      });
    }
  };
}

function createTaskIterator(_ref) {
  var context = _ref.context,
      fn = _ref.fn,
      args = _ref.args;

  if (__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].iterator(fn)) {
    return fn;
  }

  // catch synchronous failures; see #152 and #441
  var result = void 0,
      error = void 0;
  try {
    result = fn.apply(context, args);
  } catch (err) {
    error = err;
  }

  // i.e. a generator function returns an iterator
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].iterator(result)) {
    return result;
  }

  // do not bubble up synchronous failures for detached forks
  // instead create a failed task. See #152 and #441
  return error ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["i" /* makeIterator */])(function () {
    throw error;
  }) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["i" /* makeIterator */])(function () {
    var pc = void 0;
    var eff = { done: false, value: result };
    var ret = function ret(value) {
      return { done: true, value: value };
    };
    return function (arg) {
      if (!pc) {
        pc = true;
        return eff;
      } else {
        return ret(arg);
      }
    };
  }());
}

var wrapHelper = function wrapHelper(helper) {
  return { fn: helper };
};

function proc(iterator) {
  var subscribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
  };
  var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
  var getState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
  var parentContext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var parentEffectId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var name = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'anonymous';
  var cont = arguments[8];

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(iterator, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].iterator, NOT_ITERATOR_ERROR);

  var effectsString = '[...effects]';
  var runParallelEffect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* deprecate */])(runAllEffect, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* updateIncentive */])(effectsString, 'all(' + effectsString + ')'));

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;

  var log = logger || __WEBPACK_IMPORTED_MODULE_0__utils__["w" /* log */];
  var stdChannel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["d" /* stdChannel */])(subscribe);
  var taskContext = Object.create(parentContext);
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/
  next.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];

  /**
    Creates a new task descriptor for this generator, We'll also create a main task
    to track the main flow (besides other forked tasks)
  **/
  var task = newTask(parentEffectId, name, iterator, cont);
  var mainTask = { name: name, cancel: cancelMain, isRunning: true };
  var taskQueue = forkQueue(name, mainTask, end);

  /**
    cancellation of the main task. We'll simply resume the Generator with a Cancel
  **/
  function cancelMain() {
    if (mainTask.isRunning && !mainTask.isCancelled) {
      mainTask.isCancelled = true;
      next(TASK_CANCEL);
    }
  }

  /**
    This may be called by a parent generator to trigger/propagate cancellation
    cancel all pending tasks (including the main task), then end the current task.
     Cancellation propagates down to the whole execution tree holded by this Parent task
    It's also propagated to all joiners of this task and their execution tree/joiners
     Cancellation is noop for terminated/Cancelled tasks tasks
  **/
  function cancel() {
    /**
      We need to check both Running and Cancelled status
      Tasks can be Cancelled but still Running
    **/
    if (iterator._isRunning && !iterator._isCancelled) {
      iterator._isCancelled = true;
      taskQueue.cancelAll();
      /**
        Ending with a Never result will propagate the Cancellation to all joiners
      **/
      end(TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/
  cont && (cont.cancel = cancel);

  // tracks the running status
  iterator._isRunning = true;

  // kicks up the generator
  next();

  // then return the task descriptor to the caller
  return task;

  /**
    This is the generator driver
    It's a recursive async/continuation function which calls itself
    until the generator terminates or throws
  **/
  function next(arg, isErr) {
    // Preventive measure. If we end up here, then there is really something wrong
    if (!mainTask.isRunning) {
      throw new Error('Trying to resume an already finished generator');
    }

    try {
      var result = void 0;
      if (isErr) {
        result = iterator.throw(arg);
      } else if (arg === TASK_CANCEL) {
        /**
          getting TASK_CANCEL automatically cancels the main task
          We can get this value here
           - By cancelling the parent task manually
          - By joining a Cancelled task
        **/
        mainTask.isCancelled = true;
        /**
          Cancels the current effect; this will propagate the cancellation down to any called tasks
        **/
        next.cancel();
        /**
          If this Generator has a `return` method then invokes it
          This will jump to the finally block
        **/
        result = __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(iterator.return) ? iterator.return(TASK_CANCEL) : { done: true, value: TASK_CANCEL };
      } else if (arg === CHANNEL_END) {
        // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(iterator.return) ? iterator.return() : { done: true };
      } else {
        result = iterator.next(arg);
      }

      if (!result.done) {
        runEffect(result.value, parentEffectId, '', next);
      } else {
        /**
          This Generator has ended, terminate the main task and notify the fork queue
        **/
        mainTask.isMainRunning = false;
        mainTask.cont && mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.isCancelled) {
        log('error', 'uncaught at ' + name, error.message);
      }
      mainTask.isMainRunning = false;
      mainTask.cont(error, true);
    }
  }

  function end(result, isErr) {
    iterator._isRunning = false;
    stdChannel.close();
    if (!isErr) {
      if (process.env.NODE_ENV === 'development' && result === TASK_CANCEL) {
        log('info', name + ' has been cancelled', '');
      }
      iterator._result = result;
      iterator._deferredEnd && iterator._deferredEnd.resolve(result);
    } else {
      if (result instanceof Error) {
        result.sagaStack = 'at ' + name + ' \n ' + (result.sagaStack || result.stack);
      }
      if (!task.cont) {
        log('error', 'uncaught', result.sagaStack || result.stack);
        if (result instanceof Error && onError) {
          onError(result);
        }
      }
      iterator._error = result;
      iterator._isAborted = true;
      iterator._deferredEnd && iterator._deferredEnd.reject(result);
    }
    task.cont && task.cont(result, isErr);
    task.joiners.forEach(function (j) {
      return j.cb(result, isErr);
    });
    task.joiners = null;
  }

  function runEffect(effect, parentEffectId) {
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var cb = arguments[3];

    var effectId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["x" /* uid */])();
    sagaMonitor && sagaMonitor.effectTriggered({ effectId: effectId, parentEffectId: parentEffectId, label: label, effect: effect });

    /**
      completion callback and cancel callback are mutually exclusive
      We can't cancel an already completed effect
      And We can't complete an already cancelled effectId
    **/
    var effectSettled = void 0;

    // Completion callback passed to the appropriate effect runner
    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      cb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */]; // defensive measure
      if (sagaMonitor) {
        isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
      }
      cb(res, isErr);
    }
    // tracks down the current cancel
    currCb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];

    // setup cancellation logic on the parent cb
    cb.cancel = function () {
      // prevents cancelling an already completed effect
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      /**
        propagates cancel downward
        catch uncaught cancellations errors; since we can no longer call the completion
        callback, log errors raised during cancellations into the console
      **/
      try {
        currCb.cancel();
      } catch (err) {
        log('error', 'uncaught at ' + name, err.message);
      }
      currCb.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */]; // defensive measure

      sagaMonitor && sagaMonitor.effectCancelled(effectId);
    };

    /**
      each effect runner must attach its own logic of cancellation to the provided callback
      it allows this generator to propagate cancellation downward.
       ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
      And the setup must occur before calling the callback
       This is a sort of inversion of control: called async functions are responsible
      for completing the flow by calling the provided continuation; while caller functions
      are responsible for aborting the current flow by calling the attached cancel function
       Library users can attach their own cancellation logic to promises by defining a
      promise[CANCEL] method in their returned promises
      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
    **/
    var data = void 0;
    return (
      // Non declarative effect
      __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].promise(effect) ? resolvePromise(effect, currCb) : __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].helper(effect) ? runForkEffect(wrapHelper(effect), effectId, currCb) : __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].iterator(effect) ? resolveIterator(effect, effectId, name, currCb)

      // declarative effects
      : __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].array(effect) ? runParallelEffect(effect, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].take(effect)) ? runTakeEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].put(effect)) ? runPutEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].all(effect)) ? runAllEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].race(effect)) ? runRaceEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].call(effect)) ? runCallEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].cps(effect)) ? runCPSEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].fork(effect)) ? runForkEffect(data, effectId, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].join(effect)) ? runJoinEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].cancel(effect)) ? runCancelEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].select(effect)) ? runSelectEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].actionChannel(effect)) ? runChannelEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].flush(effect)) ? runFlushEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].cancelled(effect)) ? runCancelledEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].getContext(effect)) ? runGetContextEffect(data, currCb) : (data = __WEBPACK_IMPORTED_MODULE_2__io__["v" /* asEffect */].setContext(effect)) ? runSetContextEffect(data, currCb) : /* anything else returned as is        */currCb(effect)
    );
  }

  function resolvePromise(promise, cb) {
    var cancelPromise = promise[__WEBPACK_IMPORTED_MODULE_0__utils__["q" /* CANCEL */]];
    if (typeof cancelPromise === 'function') {
      cb.cancel = cancelPromise;
    }
    promise.then(cb, function (error) {
      return cb(error, true);
    });
  }

  function resolveIterator(iterator, effectId, name, cb) {
    proc(iterator, subscribe, dispatch, getState, taskContext, options, effectId, name, cb);
  }

  function runTakeEffect(_ref2, cb) {
    var channel = _ref2.channel,
        pattern = _ref2.pattern,
        maybe = _ref2.maybe;

    channel = channel || stdChannel;
    var takeCb = function takeCb(inp) {
      return inp instanceof Error ? cb(inp, true) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(inp) && !maybe ? cb(CHANNEL_END) : cb(inp);
    };
    try {
      channel.take(takeCb, matcher(pattern));
    } catch (err) {
      return cb(err, true);
    }
    cb.cancel = takeCb.cancel;
  }

  function runPutEffect(_ref3, cb) {
    var channel = _ref3.channel,
        action = _ref3.action,
        resolve = _ref3.resolve;

    /**
      Schedule the put in case another saga is holding a lock.
      The put will be executed atomically. ie nested puts will execute after
      this put has terminated.
    **/
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scheduler__["a" /* asap */])(function () {
      var result = void 0;
      try {
        result = (channel ? channel.put : dispatch)(action);
      } catch (error) {
        // If we have a channel or `put.resolve` was used then bubble up the error.
        if (channel || resolve) return cb(error, true);
        log('error', 'uncaught at ' + name, error.stack || error.message || error);
      }

      if (resolve && __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].promise(result)) {
        resolvePromise(result, cb);
      } else {
        return cb(result);
      }
    });
    // Put effects are non cancellables
  }

  function runCallEffect(_ref4, effectId, cb) {
    var context = _ref4.context,
        fn = _ref4.fn,
        args = _ref4.args;

    var result = void 0;
    // catch synchronous failures; see #152
    try {
      result = fn.apply(context, args);
    } catch (error) {
      return cb(error, true);
    }
    return __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].promise(result) ? resolvePromise(result, cb) : __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].iterator(result) ? resolveIterator(result, effectId, fn.name, cb) : cb(result);
  }

  function runCPSEffect(_ref5, cb) {
    var context = _ref5.context,
        fn = _ref5.fn,
        args = _ref5.args;

    // CPS (ie node style functions) can define their own cancellation logic
    // by setting cancel field on the cb

    // catch synchronous failures; see #152
    try {
      var cpsCb = function cpsCb(err, res) {
        return __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].undef(err) ? cb(res) : cb(err, true);
      };
      fn.apply(context, args.concat(cpsCb));
      if (cpsCb.cancel) {
        cb.cancel = function () {
          return cpsCb.cancel();
        };
      }
    } catch (error) {
      return cb(error, true);
    }
  }

  function runForkEffect(_ref6, effectId, cb) {
    var context = _ref6.context,
        fn = _ref6.fn,
        args = _ref6.args,
        detached = _ref6.detached;

    var taskIterator = createTaskIterator({ context: context, fn: fn, args: args });

    try {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scheduler__["b" /* suspend */])();
      var _task = proc(taskIterator, subscribe, dispatch, getState, taskContext, options, effectId, fn.name, detached ? null : __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */]);

      if (detached) {
        cb(_task);
      } else {
        if (taskIterator._isRunning) {
          taskQueue.addTask(_task);
          cb(_task);
        } else if (taskIterator._error) {
          taskQueue.abort(taskIterator._error);
        } else {
          cb(_task);
        }
      }
    } finally {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scheduler__["c" /* flush */])();
    }
    // Fork effects are non cancellables
  }

  function runJoinEffect(t, cb) {
    if (t.isRunning()) {
      var joiner = { task: task, cb: cb };
      cb.cancel = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* remove */])(t.joiners, joiner);
      };
      t.joiners.push(joiner);
    } else {
      t.isAborted() ? cb(t.error(), true) : cb(t.result());
    }
  }

  function runCancelEffect(taskToCancel, cb) {
    if (taskToCancel === __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* SELF_CANCELLATION */]) {
      taskToCancel = task;
    }
    if (taskToCancel.isRunning()) {
      taskToCancel.cancel();
    }
    cb();
    // cancel effects are non cancellables
  }

  function runAllEffect(effects, effectId, cb) {
    var keys = Object.keys(effects);

    if (!keys.length) {
      return cb(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].array(effects) ? [] : {});
    }

    var completedCount = 0;
    var completed = void 0;
    var results = {};
    var childCbs = {};

    function checkEffectEnd() {
      if (completedCount === keys.length) {
        completed = true;
        cb(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].array(effects) ? __WEBPACK_IMPORTED_MODULE_0__utils__["y" /* array */].from(_extends({}, results, { length: keys.length })) : results);
      }
    }

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }
        if (isErr || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(res) || res === CHANNEL_END || res === TASK_CANCEL) {
          cb.cancel();
          cb(res, isErr);
        } else {
          results[key] = res;
          completedCount++;
          checkEffectEnd();
        }
      };
      chCbAtKey.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };

    keys.forEach(function (key) {
      return runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runRaceEffect(effects, effectId, cb) {
    var completed = void 0;
    var keys = Object.keys(effects);
    var childCbs = {};

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }

        if (isErr) {
          // Race Auto cancellation
          cb.cancel();
          cb(res, true);
        } else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["e" /* isEnd */])(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
          var _cb;

          cb.cancel();
          completed = true;
          cb((_cb = {}, _cb[key] = res, _cb));
        }
      };
      chCbAtKey.cancel = __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      // prevents unnecessary cancellation
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };
    keys.forEach(function (key) {
      if (completed) {
        return;
      }
      runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runSelectEffect(_ref7, cb) {
    var selector = _ref7.selector,
        args = _ref7.args;

    try {
      var state = selector.apply(undefined, [getState()].concat(args));
      cb(state);
    } catch (error) {
      cb(error, true);
    }
  }

  function runChannelEffect(_ref8, cb) {
    var pattern = _ref8.pattern,
        buffer = _ref8.buffer;

    var match = matcher(pattern);
    match.pattern = pattern;
    cb(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__channel__["b" /* eventChannel */])(subscribe, buffer || __WEBPACK_IMPORTED_MODULE_4__buffers__["a" /* buffers */].fixed(), match));
  }

  function runCancelledEffect(data, cb) {
    cb(!!mainTask.isCancelled);
  }

  function runFlushEffect(channel, cb) {
    channel.flush(cb);
  }

  function runGetContextEffect(prop, cb) {
    cb(taskContext[prop]);
  }

  function runSetContextEffect(props, cb) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["z" /* object */].assign(taskContext, props);
    cb();
  }

  function newTask(id, name, iterator, cont) {
    var _done, _ref9, _mutatorMap;

    iterator._deferredEnd = null;
    return _ref9 = {}, _ref9[__WEBPACK_IMPORTED_MODULE_0__utils__["r" /* TASK */]] = true, _ref9.id = id, _ref9.name = name, _done = 'done', _mutatorMap = {}, _mutatorMap[_done] = _mutatorMap[_done] || {}, _mutatorMap[_done].get = function () {
      if (iterator._deferredEnd) {
        return iterator._deferredEnd.promise;
      } else {
        var def = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["s" /* deferred */])();
        iterator._deferredEnd = def;
        if (!iterator._isRunning) {
          iterator._error ? def.reject(iterator._error) : def.resolve(iterator._result);
        }
        return def.promise;
      }
    }, _ref9.cont = cont, _ref9.joiners = [], _ref9.cancel = cancel, _ref9.isRunning = function isRunning() {
      return iterator._isRunning;
    }, _ref9.isCancelled = function isCancelled() {
      return iterator._isCancelled;
    }, _ref9.isAborted = function isAborted() {
      return iterator._isAborted;
    }, _ref9.result = function result() {
      return iterator._result;
    }, _ref9.error = function error() {
      return iterator._error;
    }, _ref9.setContext = function setContext(props) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].object, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* createSetContextWarning */])('task', props));
      __WEBPACK_IMPORTED_MODULE_0__utils__["z" /* object */].assign(taskContext, props);
    }, _defineEnumerableProperties(_ref9, _mutatorMap), _ref9;
  }
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = runSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__proc__ = __webpack_require__(86);



var RUN_SAGA_SIGNATURE = 'runSaga(storeInterface, saga, ...args)';
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ': saga argument must be a Generator function!';

function runSaga(storeInterface, saga) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var iterator = void 0;

  if (__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].iterator(storeInterface)) {
    if (process.env.NODE_ENV === 'development') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["w" /* log */])('warn', 'runSaga(iterator, storeInterface) has been deprecated in favor of ' + RUN_SAGA_SIGNATURE);
    }
    iterator = storeInterface;
    storeInterface = saga;
  } else {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(saga, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func, NON_GENERATOR_ERR);
    iterator = saga.apply(undefined, args);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(iterator, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].iterator, NON_GENERATOR_ERR);
  }

  var _storeInterface = storeInterface,
      subscribe = _storeInterface.subscribe,
      dispatch = _storeInterface.dispatch,
      getState = _storeInterface.getState,
      context = _storeInterface.context,
      sagaMonitor = _storeInterface.sagaMonitor,
      logger = _storeInterface.logger,
      onError = _storeInterface.onError;


  var effectId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["x" /* uid */])();

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* noop */];

    sagaMonitor.effectTriggered({ effectId: effectId, root: true, parentEffectId: 0, effect: { root: true, saga: saga, args: args } });
  }

  var task = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__proc__["b" /* default */])(iterator, subscribe, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["A" /* wrapSagaDispatch */])(dispatch), getState, context, { sagaMonitor: sagaMonitor, logger: logger, onError: onError }, effectId, saga.name);

  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task);
  }

  return task;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = takeEveryHelper;
/* harmony export (immutable) */ __webpack_exports__["b"] = takeLatestHelper;
/* harmony export (immutable) */ __webpack_exports__["c"] = throttleHelper;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return takeEvery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return takeLatest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return throttle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__channel__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__io__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buffers__ = __webpack_require__(22);





var done = { done: true, value: undefined };
var qEnd = {};

function fsmIterator(fsm, q0) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';

  var updateState = void 0,
      qNext = q0;

  function next(arg, error) {
    if (qNext === qEnd) {
      return done;
    }

    if (error) {
      qNext = qEnd;
      throw error;
    } else {
      updateState && updateState(arg);

      var _fsm$qNext = fsm[qNext](),
          q = _fsm$qNext[0],
          output = _fsm$qNext[1],
          _updateState = _fsm$qNext[2];

      qNext = q;
      updateState = _updateState;
      return qNext === qEnd ? done : output;
    }
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* makeIterator */])(next, function (error) {
    return next(null, error);
  }, name, true);
}

function safeName(patternOrChannel) {
  if (__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* is */].channel(patternOrChannel)) {
    return 'channel';
  } else if (Array.isArray(patternOrChannel)) {
    return String(patternOrChannel.map(function (entry) {
      return String(entry);
    }));
  } else {
    return String(patternOrChannel);
  }
}

function takeEveryHelper(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__io__["a" /* take */])(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_2__io__["i" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };

  var action = void 0,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === __WEBPACK_IMPORTED_MODULE_0__channel__["a" /* END */] ? [qEnd] : ['q1', yFork(action)];
    }
  }, 'q1', 'takeEvery(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
}

function takeLatestHelper(patternOrChannel, worker) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  var yTake = { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__io__["a" /* take */])(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_2__io__["i" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };
  var yCancel = function yCancel(task) {
    return { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__io__["l" /* cancel */])(task) };
  };

  var task = void 0,
      action = void 0;
  var setTask = function setTask(t) {
    return task = t;
  };
  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === __WEBPACK_IMPORTED_MODULE_0__channel__["a" /* END */] ? [qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
    },
    q3: function q3() {
      return ['q1', yFork(action), setTask];
    }
  }, 'q1', 'takeLatest(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
}

function throttleHelper(delayLength, pattern, worker) {
  for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    args[_key3 - 3] = arguments[_key3];
  }

  var action = void 0,
      channel = void 0;

  var yActionChannel = { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__io__["n" /* actionChannel */])(pattern, __WEBPACK_IMPORTED_MODULE_3__buffers__["a" /* buffers */].sliding(1)) };
  var yTake = function yTake() {
    return { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__io__["a" /* take */])(channel) };
  };
  var yFork = function yFork(ac) {
    return { done: false, value: __WEBPACK_IMPORTED_MODULE_2__io__["i" /* fork */].apply(undefined, [worker].concat(args, [ac])) };
  };
  var yDelay = { done: false, value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__io__["f" /* call */])(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* delay */], delayLength) };

  var setAction = function setAction(ac) {
    return action = ac;
  };
  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yActionChannel, setChannel];
    },
    q2: function q2() {
      return ['q3', yTake(), setAction];
    },
    q3: function q3() {
      return action === __WEBPACK_IMPORTED_MODULE_0__channel__["a" /* END */] ? [qEnd] : ['q4', yFork(action)];
    },
    q4: function q4() {
      return ['q2', yDelay];
    }
  }, 'q1', 'throttle(' + safeName(pattern) + ', ' + worker.name + ')');
}

var deprecationWarning = function deprecationWarning(helperName) {
  return 'import { ' + helperName + ' } from \'redux-saga\' has been deprecated in favor of import { ' + helperName + ' } from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
};
var takeEvery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* deprecate */])(takeEveryHelper, deprecationWarning('takeEvery'));
var takeLatest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* deprecate */])(takeLatestHelper, deprecationWarning('takeLatest'));
var throttle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* deprecate */])(throttleHelper, deprecationWarning('throttle'));

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asap;
/* harmony export (immutable) */ __webpack_exports__["b"] = suspend;
/* harmony export (immutable) */ __webpack_exports__["c"] = flush;

var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/
var semaphore = 0;

/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}

/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/
function asap(task) {
  queue.push(task);

  if (!semaphore) {
    suspend();
    flush();
  }
}

/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/
function suspend() {
  semaphore++;
}

/**
  Puts the scheduler in a `released` state.
**/
function release() {
  semaphore--;
}

/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/
function flush() {
  release();

  var task = void 0;
  while (!semaphore && (task = queue.shift()) !== undefined) {
    exec(task);
  }
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_redux_1 = __webpack_require__(7);
const PageNav_1 = __webpack_require__(103);
const react_router_dom_1 = __webpack_require__(46);
;
;
;
;
const mapStateToProps = (state, ownProps) => ({
    selectionDetails: state.items.selectionState
});
const mapDispatchToProps = (dispatch) => ({});
class AppComponent extends React.Component {
    render() {
        const { selectionDetails } = this.props;
        return (React.createElement("div", { className: "ms-Grid" },
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2" },
                    React.createElement(PageNav_1.PageNav, null)),
                React.createElement("div", { className: "ms-Grid-col ms-u-sm6 ms-u-md8 ms-u-lg10" }, this.props.children))));
    }
}
const AppTemp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppComponent);
exports.App = react_router_dom_1.withRouter(AppTemp);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_redux_1 = __webpack_require__(7);
const actions_1 = __webpack_require__(19);
const ContentList_1 = __webpack_require__(101);
const DetailsList_1 = __webpack_require__(35);
const UserCommandBar_1 = __webpack_require__(47);
;
;
;
;
const mapStateToProps = (state, ownProps) => ({
    items: state.items.entries,
    selectionDetails: state.items.selectionState
});
const mapDispatchToProps = (dispatch) => ({
    getSelectionState: (getFunction) => {
        dispatch(actions_1.getSelectionState(getFunction));
    },
    fetchUserData: (url, start) => {
        dispatch(actions_1.fetchUserData(url, start));
    }
});
class GridComponent extends React.Component {
    constructor() {
        super();
        this._selection = new DetailsList_1.Selection({
            onSelectionChanged: () => this.props.getSelectionState(this._getSelectionDetails())
        });
    }
    render() {
        const { items, selectionDetails } = this.props;
        return (React.createElement("div", null,
            React.createElement(UserCommandBar_1.UserCommandBar, { text: selectionDetails }),
            React.createElement(ContentList_1.default, { items: items, selectionDetails: selectionDetails, selection: this._selection })));
    }
    _getSelectionDetails() {
        let selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + this._selection.getSelection()[0].fname + ': ' + this._selection.getSelection()[0].username;
            default:
                return '' + selectionCount + ' items selected';
        }
    }
}
exports.ContentListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GridComponent);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_redux_1 = __webpack_require__(7);
const UserCommandBar_1 = __webpack_require__(47);
;
;
;
;
const mapStateToProps = (state, ownProps) => ({
    selectionDetails: state.items.selectionState
});
const mapDispatchToProps = (dispatch) => ({});
class AppComponent extends React.Component {
    render() {
        const { selectionDetails } = this.props;
        return (React.createElement("div", null,
            React.createElement(UserCommandBar_1.UserCommandBar, { text: selectionDetails }),
            React.createElement("h2", null, "This is a new page. ")));
    }
}
exports.NewPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppComponent);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = __webpack_require__(18);
const CounterReducers_1 = __webpack_require__(108);
const UserGridReducers_1 = __webpack_require__(110);
const SidePanelReducers_1 = __webpack_require__(109);
const react_router_redux_1 = __webpack_require__(25);
exports.reducers = redux_1.combineReducers({
    counter: CounterReducers_1.counter,
    items: UserGridReducers_1.gridSetup,
    panelContent: SidePanelReducers_1.togglePanel,
    router: react_router_redux_1.routerReducer
});


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = __webpack_require__(43);
const UserGridMiddleware_1 = __webpack_require__(111);
function* sagas() {
    console.log("sagas");
    yield effects_1.takeEvery('USERS_FETCH', UserGridMiddleware_1.fetchData);
    //yield all([
    //    fork(takeLatest, 'USERS_FETCH', fetch),
    //    // TODO: add forks for any sagas
    //])
}
exports.sagas = sagas;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compose = __webpack_require__(18).compose;

exports.__esModule = true;
exports.composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    function() {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return compose;
      return compose.apply(null, arguments);
    }
);

exports.devToolsEnhancer = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__ :
    function() { return function(noop) { return noop; } }
);


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_middleware__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_runSaga__ = __webpack_require__(87);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "runSaga", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_runSaga__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_channel__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "END", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "eventChannel", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "channel", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_channel__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__internal_buffers__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "buffers", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_buffers__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__ = __webpack_require__(88);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeLatest", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_sagaHelpers__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__internal_utils__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_utils__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CANCEL", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_utils__["q"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__effects__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(275);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "effects", function() { return __WEBPACK_IMPORTED_MODULE_6__effects__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return __WEBPACK_IMPORTED_MODULE_7__utils__; });

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__internal_middleware__["a" /* default */]);












/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __webpack_require__(100);
exports.incrementCounter = (delta) => ({
    type: "INCREMENT_COUNTER",
    delta,
});
exports.resetCounter = () => ({
    type: "RESET_COUNTER",
});
const _saveCount = {
    request: (request) => ({ type: "SAVE_COUNT_REQUEST", request }),
    success: (response, request) => ({ type: "SAVE_COUNT_SUCCESS", request, response }),
    error: (error, request) => ({ type: "SAVE_COUNT_ERROR", request, error }),
};
const _loadCount = {
    request: (request) => ({ type: "LOAD_COUNT_REQUEST", request: null }),
    success: (response, request) => ({ type: "LOAD_COUNT_SUCCESS", request: null, response }),
    error: (error, request) => ({ type: "LOAD_COUNT_ERROR", request: null, error }),
};
function apiActionGroupFactory(x, go) {
    return (request) => (dispatch) => {
        dispatch(x.request(request));
        go(request)
            .then((response) => dispatch(x.success(response, request)))
            .catch((e) => dispatch(x.error(e, request)));
    };
}
exports.saveCount = apiActionGroupFactory(_saveCount, api_1.api.save);
exports.loadCount = () => apiActionGroupFactory(_loadCount, api_1.api.load)(null);


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.openPanel = () => {
    return { type: "TOGGLE_PANEL_OPEN" };
};
exports.closePanel = () => {
    return { type: "TOGGLE_PANEL_CLOSE" };
};
exports.addUser = () => {
    return { type: "TOGGLE_PANEL_ADD_USER" };
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(239);
__webpack_require__(278);
exports.addEntry = (item, selectedEntry) => {
    return { type: "SAVE_ENTRY", entry: item, selectedEntry: selectedEntry };
};
exports.getSelectionState = (getSelectionDetails) => {
    return { type: "GET_SELECTION_STATE", getSelectionDetails: getSelectionDetails };
};
exports.getUsers = (url, start, numberOfElements) => {
    let queryUrl = url + '$top=' + numberOfElements + (start ? ('&$skip=' + start) : '');
    return {
        type: "USERS_FETCH",
        url: queryUrl
    };
};
function fetchUserData(url, start) {
    let queryUrl = url + '$top=' + 5 + (start ? ('&$skip=' + start) : '');
    return (dispatch) => {
        dispatch(getDispatchObject(queryUrl));
    };
}
exports.fetchUserData = fetchUserData;
const getDispatchObject = (url) => ({
    type: "USERS_FETCH_DATA",
    payload: new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
            .then((response) => response.json())
            .then((items) => {
            let users = [];
            let index = 0;
            for (var item of items.value) {
                let user = {
                    key: index,
                    fname: item["FirstName"],
                    lname: item["LastName"],
                    username: item["UserName"],
                    email: item["Emails"][0]
                };
                index++;
                users.push(user);
            }
            console.log(users);
            resolve(users);
        });
    })
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.api = {
    // Save counter state
    save: (counter) => {
        localStorage.setItem('__counterValue', counter.value.toString());
        return Promise.resolve(null);
    },
    // Load counter state
    load: () => {
        const value = parseInt(localStorage.getItem('__counterValue'), 10);
        return Promise.resolve({ value });
    },
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const TextField_1 = __webpack_require__(61);
const DetailsList_1 = __webpack_require__(35);
const MarqueeSelection_1 = __webpack_require__(149);
const SidePanelContainer_1 = __webpack_require__(105);
const InfiniteListContainer_1 = __webpack_require__(102);
let _columns = [
    {
        key: 'column1',
        name: 'First Name',
        fieldName: 'fname',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'column2',
        name: 'Last Name',
        fieldName: 'lname',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'column3',
        name: 'User Name',
        fieldName: 'username',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'column4',
        name: 'E-mail Address',
        fieldName: 'email',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
];
const ContentList = ({ items, selectionDetails, selection }) => (React.createElement("div", null,
    React.createElement(TextField_1.TextField, { label: 'Filter by name:', onChanged: text => this.setState({ items: text ? items.filter((i) => i.fname.toLowerCase().indexOf(text) > -1) : items }) }),
    React.createElement(MarqueeSelection_1.MarqueeSelection, { selection: this._selection },
        React.createElement(InfiniteListContainer_1.InfiniteListContainer, { items: items, columns: _columns, layoutMode: DetailsList_1.DetailsListLayoutMode.fixedColumns, selection: selection, selectionPreservedOnEmptyClick: true })),
    React.createElement(SidePanelContainer_1.SidePanelContainer, { text: selectionDetails, selectedEntry: selection })));
exports.default = ContentList;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const DetailsList_1 = __webpack_require__(35);
const actions_1 = __webpack_require__(19);
const react_redux_1 = __webpack_require__(7);
;
;
;
const mapStateToProps = (state, ownProps) => ({
    items: state.items.entries,
});
const mapDispatchToProps = (dispatch) => ({
    fetchUserData: (url, start) => {
        dispatch(actions_1.getUsers(url, start, 5));
    }
});
class InfDetailsList extends React.Component {
    constructor() {
        super();
        this.url = 'http://services.odata.org/V4/(S(h1k5tq3hg52no4vzqsxggpsl))/TripPinServiceRW/People?';
        this.resumeScrolls = this.resumeScrolls.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.resumeScrolls();
    }
    componentWillMount() {
        this.props.fetchUserData(this.url, 0);
    }
    componentDidMount() {
        this.resumeScrolls();
        var container = this.refs.container;
        container.addEventListener('scroll', this.scrollHandler);
    }
    componentWillUnmount() {
        var container = this.refs.container;
        container.removeEventListener('scroll', this.scrollHandler);
    }
    scrollHandler() {
        if (!this.canScroll)
            return;
        if (this.isMoreInfoNeeded()) {
            console.log("here");
            this.canScroll = false;
            this.props.fetchUserData(this.url, 5);
        }
    }
    isMoreInfoNeeded() {
        var container = this.refs.container;
        var result = (container.scrollTop >= (container.scrollHeight - 2 * container.clientHeight));
        console.log('isMoreInfoNeeded', result, container.scrollTop, container.scrollHeight, container.clientHeight);
        return result;
    }
    resumeScrolls() {
        this.canScroll = true;
    }
    render() {
        const { columns, items, layoutMode, selection, selectionPreservedOnEmptyClick } = this.props;
        return (React.createElement("div", { ref: "container", style: { maxHeight: "400px", overflow: 'auto' } },
            React.createElement(DetailsList_1.DetailsList, { columns: columns, items: items, setKey: 'set', layoutMode: layoutMode, selection: selection, selectionPreservedOnEmptyClick: selectionPreservedOnEmptyClick, onRowDidMount: this.resumeScrolls })));
    }
}
exports.InfiniteListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(InfDetailsList);


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Nav_1 = __webpack_require__(150);
const react_router_redux_1 = __webpack_require__(25);
const react_redux_1 = __webpack_require__(7);
;
;
;
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch) => ({
    newPage: () => {
        dispatch(react_router_redux_1.push('/newpage'));
    },
    homePage: () => {
        dispatch(react_router_redux_1.push('/'));
    }
});
class NavPaneComponent extends React.Component {
    render() {
        const styles = {
            width: '208px',
            height: '500px',
            boxSizing: 'border-box',
            border: '1px solid #EEE'
        };
        return (React.createElement("div", { className: 'ms-NavExample-LeftPane', style: styles },
            React.createElement(Nav_1.Nav, { groups: [
                    {
                        links: [
                            {
                                name: 'Guide',
                                url: '',
                                links: [{
                                        name: 'Home Page',
                                        url: '',
                                        onClick: () => this.props.homePage(),
                                        key: 'key1'
                                    },
                                    {
                                        name: 'New Page',
                                        url: '',
                                        onClick: () => this.props.newPage(),
                                        key: 'key2'
                                    }],
                                isExpanded: true
                            },
                            {
                                name: 'Edit',
                                url: '',
                                onClick: () => this.props.newPage(),
                                icon: 'Edit',
                                key: 'key8'
                            }
                        ]
                    }
                ], expandedStateText: 'expanded', collapsedStateText: 'collapsed', selectedKey: 'key3' })));
    }
}
exports.PageNav = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NavPaneComponent);


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Button_1 = __webpack_require__(33);
const Panel_1 = __webpack_require__(152);
const SidePanel = ({ showPanel, openPanel, closePanel, formMarkup, displayText, handleSave }) => (React.createElement("div", null,
    React.createElement(Button_1.DefaultButton, { description: 'Opens the Sample Panel', onClick: () => openPanel(), text: 'Open Panel' }),
    React.createElement(Panel_1.Panel, { isOpen: showPanel, type: Panel_1.PanelType.medium, isLightDismiss: true, onDismiss: () => closePanel(), headerText: displayText, onRenderFooterContent: () => {
            return (React.createElement("div", null,
                React.createElement(Button_1.PrimaryButton, { onClick: () => handleSave(), style: { 'marginRight': '8px' } }, "Save"),
                React.createElement(Button_1.DefaultButton, { onClick: () => closePanel() }, "Cancel")));
        } }, formMarkup)));
exports.default = SidePanel;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const react_redux_1 = __webpack_require__(7);
const actions_1 = __webpack_require__(19);
const SidePanel_1 = __webpack_require__(104);
const SidePanelForm_1 = __webpack_require__(106);
;
;
;
const mapStateToProps = (state, ownProps) => ({
    showPanel: state.panelContent.showPanel,
    content: state.panelContent.content,
    items: state.items.entries
});
const mapDispatchToProps = (dispatch) => ({
    open: () => {
        dispatch(actions_1.openPanel());
    },
    close: () => {
        dispatch(actions_1.closePanel());
    },
    saveUser: (item, selectedEntry) => {
        dispatch(actions_1.addEntry(item, selectedEntry));
    }
});
class SidePanelContainerComponent extends React.Component {
    _onTextChanged(text, field) {
        if (field === "fname")
            this.firstname = text;
        else if (field === "lname")
            this.lastname = text;
        else
            this.email = text;
    }
    _getPanelMarkup() {
        const { content } = this.props;
        console.log("in get markup", this);
        if (content === "ADD_USER" || content === "EDIT_USER") {
            this.formMarkup = (React.createElement(SidePanelForm_1.default, { onChange: (text, field) => this._onTextChanged(text, field) }));
            if (content === "EDIT_USER") {
                this.displayText = "Enter information to edit user";
            }
            else {
                this.displayText = "Enter your information to add an entry";
            }
        }
        else {
            this.formMarkup = (React.createElement("h2", { className: 'ms-font-m' }, this.props.text));
            this.displayText = 'Here are the details of your selected entry';
        }
    }
    _handleSave() {
        const { content } = this.props;
        let selectedEntry = {};
        const item = {
            key: this.props.items.length + 1,
            fname: this.firstname,
            lname: this.lastname,
            username: new Date().getTime(),
            email: this.email
        };
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        if (this.props.text.indexOf('1') === 0) {
            selectedEntry = this.props.selectedEntry.getSelection()[0];
        }
        this.props.saveUser(item, selectedEntry);
        this.props.close();
    }
    render() {
        const { showPanel, content } = this.props;
        this._getPanelMarkup();
        return (React.createElement(SidePanel_1.default, { showPanel: showPanel, openPanel: this.props.open, closePanel: this.props.close, formMarkup: this.formMarkup, displayText: this.displayText, handleSave: () => this._handleSave() }));
    }
}
exports.SidePanelContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SidePanelContainerComponent);


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const TextField_1 = __webpack_require__(61);
const SidePanelForm = ({ onChange }) => (React.createElement("form", null,
    React.createElement(TextField_1.TextField, { label: 'Enter First Name', onChanged: (text) => { onChange(text, 'fname'); }, underlined: true }),
    React.createElement(TextField_1.TextField, { label: 'Enter Last Name', onChanged: (text) => { onChange(text, 'lname'); }, underlined: true }),
    React.createElement(TextField_1.TextField, { label: 'Enter E-mail Address', onChanged: (text) => { onChange(text, 'email'); }, underlined: true })));
exports.default = SidePanelForm;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Redux = __webpack_require__(18);
const ReactDOM = __webpack_require__(26);
const react_redux_1 = __webpack_require__(7);
const react_router_dom_1 = __webpack_require__(46);
const createBrowserHistory_1 = __webpack_require__(45);
const react_router_redux_1 = __webpack_require__(25);
const redux_devtools_extension_1 = __webpack_require__(95);
const redux_saga_1 = __webpack_require__(96);
const sagas_1 = __webpack_require__(94);
const reducers_1 = __webpack_require__(93);
const App_1 = __webpack_require__(90);
const NewPage_1 = __webpack_require__(92);
const ContentListContainer_1 = __webpack_require__(91);
const history = createBrowserHistory_1.default();
const middleware = react_router_redux_1.routerMiddleware(history);
// --- SAGA Stuff --------------------------------
const sagaMiddleware = redux_saga_1.default();
//let store: Redux.Store<Store.All> = Redux.createStore(reducers, composeWithDevTools(
//    Redux.applyMiddleware(
//        thunkMiddleware,
//        promiseMiddleware(),
//        middleware)));
let store = Redux.createStore(reducers_1.reducers, redux_devtools_extension_1.composeWithDevTools(Redux.applyMiddleware(sagaMiddleware, middleware)));
sagaMiddleware.run(sagas_1.sagas);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_redux_1.ConnectedRouter, { history: history },
        React.createElement(App_1.App, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: ContentListContainer_1.ContentListContainer }),
            React.createElement(react_router_dom_1.Route, { path: '/newpage', component: NewPage_1.NewPage })))), document.getElementById("example"));


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    value: 0,
};
exports.counter = (state = initialState, action) => {
    const { value } = state;
    switch (action.type) {
        case "INCREMENT_COUNTER":
            const newValue = value + action.delta;
            return { value: newValue };
        case "RESET_COUNTER":
            return { value: 0 };
        default:
            return state;
    }
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const initialPanel = { showPanel: false, content: '' };
exports.togglePanel = (state = initialPanel, action) => {
    switch (action.type) {
        case "TOGGLE_PANEL_OPEN":
            return { showPanel: true, content: '' };
        case "TOGGLE_PANEL_CLOSE":
            return { showPanel: false, content: '' };
        case "TOGGLE_PANEL_ADD_USER":
            return { showPanel: true, content: "ADD_USER" };
        default: return state;
    }
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const initialGrid = { entries: [], selectionState: '', isLoading: false };
exports.gridSetup = (state = initialGrid, action) => {
    const { entries, selectionState, isLoading } = state;
    switch (action.type) {
        case "SAVE_ENTRY":
            const newEntry = action.entry;
            const selectedEntry = action.selectedEntry;
            let newElement;
            // REVIEW how to implement the user search better
            for (let entry of entries) {
                if (entry.key === selectedEntry.key) {
                    newElement = {
                        key: entry.key,
                        fname: newEntry.fname === '' ? entry.fname : newEntry.fname,
                        lname: newEntry.lname === '' ? entry.lname : newEntry.lname,
                        username: entry.username,
                        email: newEntry.email === '' ? entry.email : newEntry.email
                    };
                    return { entries: [...entries.slice(0, entry.key), newElement, ...entries.slice(entry.key + 1)], selectionState, isLoading };
                }
            }
            return { entries: [...entries, action.entry], selectionState, isLoading };
        case "GET_SELECTION_STATE":
            return { entries, selectionState: action.getSelectionDetails, isLoading };
        case "USERS_FETCH_SUCCEEDED":
            return { entries: action.users, selectionState, isLoading };
        default: return {
            entries,
            selectionState,
            isLoading
        };
    }
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = __webpack_require__(43);
// Our worker Saga: will perform the async increment task
function* fetchData(action) {
    try {
        const users = yield effects_1.call(exports.fetchUsers, action.url);
        yield effects_1.put({ type: 'USERS_FETCH_SUCCEEDED', users });
    }
    catch (error) {
        yield effects_1.put({ type: 'USERS_FETCH_FAILED', error });
    }
}
exports.fetchData = fetchData;
exports.fetchUsers = (url) => {
    return fetch(url)
        .then((response) => {
        if (response.status !== 200) {
            // Throws to the catch below with the error code.
            throw (response.status);
        }
        return response.json();
    })
        .then((items) => {
        let users = [];
        let index = 0;
        for (var item of items.value) {
            let user = {
                key: index,
                fname: item["FirstName"],
                lname: item["LastName"],
                username: item["UserName"],
                email: item["Emails"][0]
            };
            index++;
            users.push(user);
        }
        return users;
    })
        .catch((err) => {
        console.error('Error fetching users: ', err);
        throw (err);
    });
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventGroup_1 = __webpack_require__(27);
var scroll_1 = __webpack_require__(51);
var dom_1 = __webpack_require__(14);
var SCROLL_ITERATION_DELAY = 16;
var SCROLL_GUTTER_HEIGHT = 100;
var MAX_SCROLL_VELOCITY = 15;
/**
 * AutoScroll simply hooks up mouse events given a parent element, and scrolls the container
 * up/down depending on how close the mouse is to the top/bottom of the container.
 *
 * Once you don't want autoscroll any more, just dispose the helper and it will unhook events.
 */
var AutoScroll = (function () {
    function AutoScroll(element) {
        this._events = new EventGroup_1.EventGroup(this);
        this._scrollableParent = scroll_1.findScrollableParent(element);
        this._incrementScroll = this._incrementScroll.bind(this);
        this._scrollRect = dom_1.getRect(this._scrollableParent);
        if (this._scrollableParent === window) {
            this._scrollableParent = document.body;
        }
        if (this._scrollableParent) {
            this._events.on(window, 'mousemove', this._onMouseMove, true);
            this._events.on(window, 'touchmove', this._onTouchMove, true);
        }
    }
    AutoScroll.prototype.dispose = function () {
        this._events.dispose();
        this._stopScroll();
    };
    AutoScroll.prototype._onMouseMove = function (ev) {
        this._computeScrollVelocity(ev.clientY);
    };
    AutoScroll.prototype._onTouchMove = function (ev) {
        if (ev.touches.length > 0) {
            this._computeScrollVelocity(ev.touches[0].clientY);
        }
    };
    AutoScroll.prototype._computeScrollVelocity = function (clientY) {
        var scrollRectTop = this._scrollRect.top;
        var scrollClientBottom = scrollRectTop + this._scrollRect.height - SCROLL_GUTTER_HEIGHT;
        if (clientY < (scrollRectTop + SCROLL_GUTTER_HEIGHT)) {
            this._scrollVelocity = Math.max(-MAX_SCROLL_VELOCITY, -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER_HEIGHT - (clientY - scrollRectTop)) / SCROLL_GUTTER_HEIGHT));
        }
        else if (clientY > scrollClientBottom) {
            this._scrollVelocity = Math.min(MAX_SCROLL_VELOCITY, MAX_SCROLL_VELOCITY * ((clientY - scrollClientBottom) / SCROLL_GUTTER_HEIGHT));
        }
        else {
            this._scrollVelocity = 0;
        }
        if (this._scrollVelocity) {
            this._startScroll();
        }
        else {
            this._stopScroll();
        }
    };
    AutoScroll.prototype._startScroll = function () {
        if (!this._timeoutId) {
            this._incrementScroll();
        }
    };
    AutoScroll.prototype._incrementScroll = function () {
        this._scrollableParent.scrollTop += Math.round(this._scrollVelocity);
        this._timeoutId = setTimeout(this._incrementScroll, SCROLL_ITERATION_DELAY);
    };
    AutoScroll.prototype._stopScroll = function () {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            delete this._timeoutId;
        }
    };
    return AutoScroll;
}());
exports.AutoScroll = AutoScroll;



/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseComponent_1 = __webpack_require__(49);
var object_1 = __webpack_require__(28);
/**
 * The Customizer component allows for default props to be mixed into components which
 * are decorated with the customizable() decorator. This enables injection scenarios like:
 *
 * 1. render svg icons instead of the icon font within all buttons
 * 2. inject a custom theme object into a component
 *
 * Props are provided via the settings prop, which should be a json map where the key is
 * the name of the customizable component, and the value is are the props to pass in.
 *
 * @export
 * @class Customizer
 * @extends {BaseComponent<ICustomizerProps, ICustomizerState>}
 */
var Customizer = (function (_super) {
    __extends(Customizer, _super);
    function Customizer(props, context) {
        var _this = _super.call(this, props) || this;
        _this.state = _this._getInjectedProps(props, context);
        return _this;
    }
    Customizer.prototype.getChildContext = function () {
        return this.state;
    };
    Customizer.prototype.componentWillReceiveProps = function (newProps, newContext) {
        this.setState(this._getInjectedProps(newProps, newContext));
    };
    Customizer.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    Customizer.prototype._getInjectedProps = function (props, context) {
        var _a = props.settings, injectedPropsFromSettings = _a === void 0 ? {} : _a;
        var _b = context.injectedProps, injectedPropsFromContext = _b === void 0 ? {} : _b;
        return {
            injectedProps: object_1.assign({}, injectedPropsFromContext, injectedPropsFromSettings)
        };
    };
    return Customizer;
}(BaseComponent_1.BaseComponent));
Customizer.contextTypes = {
    injectedProps: React.PropTypes.object
};
Customizer.childContextTypes = Customizer.contextTypes;
exports.Customizer = Customizer;



/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
/**
 * Utility component for delaying the render of a child component after a given delay. This component
 * requires a single child component; don't pass in many components. Wrap multiple components in a DIV
 * if necessary.
 *
 * @example
 * <DelayedRender delay={ 3000 }>
 *  <div className='foo-List-loadingSpinner'>
 *    <p>I am loading</p>
 *    <Spinner />
 *  </div>
 * </DelayedRender>
 */
var DelayedRender = (function (_super) {
    __extends(DelayedRender, _super);
    function DelayedRender(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isRendered: false
        };
        return _this;
    }
    DelayedRender.prototype.componentDidMount = function () {
        var _this = this;
        var delay = this.props.delay;
        this._timeoutId = setTimeout(function () {
            _this.setState({
                isRendered: true
            });
        }, delay);
    };
    DelayedRender.prototype.componentWillUnmount = function () {
        clearTimeout(this._timeoutId);
    };
    DelayedRender.prototype.render = function () {
        return this.state.isRendered ? React.Children.only(this.props.children) : null;
    };
    return DelayedRender;
}(React.Component));
DelayedRender.defaultProps = {
    delay: 0
};
exports.DelayedRender = DelayedRender;



/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle = (function () {
    function Rectangle(left, right, top, bottom) {
        if (left === void 0) { left = 0; }
        if (right === void 0) { right = 0; }
        if (top === void 0) { top = 0; }
        if (bottom === void 0) { bottom = 0; }
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        /**
         * Calculated automatically by subtracting the right from left
         */
        get: function () {
            return this.right - this.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        /**
         * Calculated automatically by subtracting the bottom from top.
         */
        get: function () {
            return this.bottom - this.top;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests if another rect is approximately equal to this rect (within 4 decimal places.)
     */
    Rectangle.prototype.equals = function (rect) {
        // I'm fixing it to 4 decimal places because it allows enough precision and will handle cases when something should be rounded,
        // like .999999 should round to 1.
        return (parseFloat(this.top.toFixed(4)) === parseFloat(rect.top.toFixed(4)) &&
            parseFloat(this.bottom.toFixed(4)) === parseFloat(rect.bottom.toFixed(4)) &&
            parseFloat(this.left.toFixed(4)) === parseFloat(rect.left.toFixed(4)) &&
            parseFloat(this.right.toFixed(4)) === parseFloat(rect.right.toFixed(4)));
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;



/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function findIndex(array, cb) {
    var index = -1;
    for (var i = 0; array && i < array.length; i++) {
        if (cb(array[i], i)) {
            index = i;
            break;
        }
    }
    return index;
}
exports.findIndex = findIndex;
function createArray(size, getItem) {
    var array = [];
    for (var i = 0; i < size; i++) {
        array.push(getItem(i));
    }
    return array;
}
exports.createArray = createArray;



/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Autobind is a utility for binding methods in a class. This simplifies tagging methods as being "bound" to the this pointer
 * so that they can be used in scenarios that simply require a function callback.
 *
 * @example
 * import { autobind } from '../utilities/autobind';
 *
 * public class Foo {
 *   @autobind
 *   method() {
 *   }
 * }
 */
function autobind(target, key, descriptor) {
    var fn = descriptor.value;
    var defining = false;
    return {
        configurable: true,
        get: function () {
            if (defining || this === fn.prototype || this.hasOwnProperty(key)) {
                return fn;
            }
            // Bind method only once, and update the property to return the bound value from now on
            var fnBound = fn.bind(this);
            defining = true;
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: fnBound
            });
            defining = false;
            return fnBound;
        },
        set: function (newValue) {
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: newValue
            });
        }
    };
}
exports.autobind = autobind;



/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function css() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var classes = [];
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        if (arg) {
            if (typeof arg === 'string') {
                classes.push(arg);
            }
            else {
                for (var key in arg) {
                    if (arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
    }
    return classes.join(' ');
}
exports.css = css;



/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
function customizable(componentName) {
    return function customizableFactory(ComposedComponent) {
        return _a = (function (_super) {
                __extends(ComponentWithInjectedProps, _super);
                function ComponentWithInjectedProps() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ComponentWithInjectedProps.prototype.render = function () {
                    var defaultProps = ((this.context.injectedProps) ?
                        this.context.injectedProps[componentName] :
                        null) || {};
                    return (React.createElement(ComposedComponent, __assign({}, defaultProps, this.props)));
                };
                return ComponentWithInjectedProps;
            }(React.Component)),
            _a.contextTypes = {
                injectedProps: React.PropTypes.object
            },
            _a;
        var _a;
    };
}
exports.customizable = customizable;



/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* tslint:disable:no-string-literal */

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(14);
var IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
var IS_VISIBLE_ATTRIBUTE = 'data-is-visible';
var FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
function getFirstFocusable(rootElement, currentElement, includeElementsInFocusZones) {
    return getNextElement(rootElement, currentElement, true, false, false, includeElementsInFocusZones);
}
exports.getFirstFocusable = getFirstFocusable;
function getLastFocusable(rootElement, currentElement, includeElementsInFocusZones) {
    return getPreviousElement(rootElement, currentElement, true, false, true, includeElementsInFocusZones);
}
exports.getLastFocusable = getLastFocusable;
/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 * @return True if focus was set, false if it was not.
 * @param {HTMLElement} rootElement - element to start the search for a focusable child.
 */
function focusFirstChild(rootElement) {
    var element = getNextElement(rootElement, rootElement, true, false, false, true);
    if (element) {
        element.focus();
        return true;
    }
    return false;
}
exports.focusFirstChild = focusFirstChild;
/** Traverse to find the previous element. */
function getPreviousElement(rootElement, currentElement, checkNode, suppressParentTraversal, traverseChildren, includeElementsInFocusZones) {
    if (!currentElement ||
        currentElement === rootElement) {
        return null;
    }
    var isCurrentElementVisible = isElementVisible(currentElement);
    // Check its children.
    if (traverseChildren && (includeElementsInFocusZones || !isElementFocusZone(currentElement)) && isCurrentElementVisible) {
        var childMatch = getPreviousElement(rootElement, currentElement.lastElementChild, true, true, true, includeElementsInFocusZones);
        if (childMatch) {
            return childMatch;
        }
    }
    // Check the current node, if it's not the first traversal.
    if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement)) {
        return currentElement;
    }
    // Check its previous sibling.
    var siblingMatch = getPreviousElement(rootElement, currentElement.previousElementSibling, true, true, true, includeElementsInFocusZones);
    if (siblingMatch) {
        return siblingMatch;
    }
    // Check its parent.
    if (!suppressParentTraversal) {
        return getPreviousElement(rootElement, currentElement.parentElement, true, false, false, includeElementsInFocusZones);
    }
    return null;
}
exports.getPreviousElement = getPreviousElement;
/** Traverse to find the next focusable element. */
function getNextElement(rootElement, currentElement, checkNode, suppressParentTraversal, suppressChildTraversal, includeElementsInFocusZones) {
    if (!currentElement ||
        (currentElement === rootElement && suppressChildTraversal)) {
        return null;
    }
    var isCurrentElementVisible = isElementVisible(currentElement);
    // Check the current node, if it's not the first traversal.
    if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement)) {
        return currentElement;
    }
    // Check its children.
    if (!suppressChildTraversal && isCurrentElementVisible && (includeElementsInFocusZones || !isElementFocusZone(currentElement))) {
        var childMatch = getNextElement(rootElement, currentElement.firstElementChild, true, true, false, includeElementsInFocusZones);
        if (childMatch) {
            return childMatch;
        }
    }
    if (currentElement === rootElement) {
        return null;
    }
    // Check its sibling.
    var siblingMatch = getNextElement(rootElement, currentElement.nextElementSibling, true, true, false, includeElementsInFocusZones);
    if (siblingMatch) {
        return siblingMatch;
    }
    if (!suppressParentTraversal) {
        return getNextElement(rootElement, currentElement.parentElement, false, false, true, includeElementsInFocusZones);
    }
    return null;
}
exports.getNextElement = getNextElement;
function isElementVisible(element) {
    // If the element is not valid, return false.
    if (!element || !element.getAttribute) {
        return false;
    }
    var visibilityAttribute = element.getAttribute(IS_VISIBLE_ATTRIBUTE);
    // If the element is explicitly marked with the visibility attribute, return that value as boolean.
    if (visibilityAttribute !== null && visibilityAttribute !== undefined) {
        return visibilityAttribute === 'true';
    }
    // Fallback to other methods of determining actual visibility.
    return (element.offsetHeight !== 0 ||
        element.offsetParent !== null ||
        element.isVisible === true); // used as a workaround for testing.
}
exports.isElementVisible = isElementVisible;
function isElementTabbable(element) {
    // If this element is null or is disabled, it is not considered tabbable.
    if (!element || element.disabled) {
        return false;
    }
    // In IE, element.tabIndex is default to 0. We need to use element get tabIndex attribute to get the correct tabIndex
    var tabIndex = -1;
    if (element && element.getAttribute) {
        tabIndex = parseInt(element.getAttribute('tabIndex'), 10);
    }
    var isFocusableAttribute = element.getAttribute ? element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) : null;
    return (!!element && isFocusableAttribute !== 'false' &&
        (element.tagName === 'A' ||
            (element.tagName === 'BUTTON') ||
            (element.tagName === 'INPUT') ||
            (element.tagName === 'TEXTAREA') ||
            (tabIndex >= 0) ||
            (element.getAttribute && (isFocusableAttribute === 'true' ||
                element.getAttribute('role') === 'button'))));
}
exports.isElementTabbable = isElementTabbable;
function isElementFocusZone(element) {
    return element && !!element.getAttribute(FOCUSZONE_ID_ATTRIBUTE);
}
exports.isElementFocusZone = isElementFocusZone;
function doesElementContainFocus(element) {
    var currentActiveElement = dom_1.getDocument(element).activeElement;
    if (currentActiveElement && dom_1.elementContains(element, currentActiveElement)) {
        return true;
    }
    return false;
}
exports.doesElementContainFocus = doesElementContainFocus;



/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var REACT_LIFECYCLE_EXCLUSIONS = [
    'setState',
    'render',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
];
/**
 * Allows you to hoist methods, except those in an exclusion set from a source object into a destination object.
 * @param destination The instance of the object to hoist the methods onto.
 * @param source The instance of the object where the methods are hoisted from.
 * @param exclusions (Optional) What methods to exclude from being hoisted.
 * @returns {string[]} An array of names of methods that were hoisted.
 */
function hoistMethods(destination, source, exclusions) {
    if (exclusions === void 0) { exclusions = REACT_LIFECYCLE_EXCLUSIONS; }
    var hoisted = [];
    var _loop_1 = function (methodName) {
        if (typeof source[methodName] === 'function' &&
            destination[methodName] === undefined &&
            (!exclusions || exclusions.indexOf(methodName) === -1)) {
            hoisted.push(methodName);
            /* tslint:disable:no-function-expression */
            destination[methodName] = function () { source[methodName].apply(source, arguments); };
            /* tslint:enable */
        }
    };
    for (var methodName in source) {
        _loop_1(methodName);
    }
    return hoisted;
}
exports.hoistMethods = hoistMethods;
/**
 * Provides a method for convenience to unhoist hoisted methods.
 * @param {any} source The source object upon which methods were hoisted.
 * @param {string[]} methodNames An array of method names to unhoist.
 */
function unhoistMethods(source, methodNames) {
    methodNames
        .forEach(function (methodName) { return delete source[methodName]; });
}
exports.unhoistMethods = unhoistMethods;



/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(48));
__export(__webpack_require__(112));
__export(__webpack_require__(49));
__export(__webpack_require__(113));
__export(__webpack_require__(114));
__export(__webpack_require__(27));
__export(__webpack_require__(50));
__export(__webpack_require__(115));
__export(__webpack_require__(116));
__export(__webpack_require__(117));
__export(__webpack_require__(118));
__export(__webpack_require__(119));
__export(__webpack_require__(14));
__export(__webpack_require__(120));
__export(__webpack_require__(121));
__export(__webpack_require__(123));
__export(__webpack_require__(124));
__export(__webpack_require__(28));
__export(__webpack_require__(125));
__export(__webpack_require__(126));
__export(__webpack_require__(127));
__export(__webpack_require__(128));
__export(__webpack_require__(51));
__export(__webpack_require__(130));
__export(__webpack_require__(52));



/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Regex to detect words within paraenthesis in a string where gi implies global and case-insensitive. */
var CHARS_WITHIN_PARENTHESIS_REGEX = new RegExp('\\(([^)]*)\\)', 'gi');
/**
 *  Matches any non-word characters with respect to the Unicode codepoints; generated by
 * https://mothereff.in/regexpu for regex /\W /u where u stands for Unicode support (ES6 feature).
 * More info here: http://stackoverflow.com/questions/280712/javascript-unicode-regexes.
 * gi implies global and case-insensitive.
 */
/* tslint:disable:max-line-length */
var UNICODE_ALPHANUMERIC_CHARS_REGEX = new RegExp('(?:[\0-/:-@\[-\^`\{-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]) ', 'gi');
/* tslint:enable:max-line-length */
/** Regex to detect multiple spaces in a string where gi implies global and case-insensitive. */
var MULTIPLE_WHITESPACES_REGEX_TOKEN = new RegExp('\\s+', 'gi');
/** Regex to detect Arabic text. */
var ARABIC_LANGUAGE_REGEX = new RegExp('[\u0621-\u064A\u0660-\u0669]');
/** Regex to detect Korean text. */
var KOREAN_LANGUAGE_REGEX = new RegExp('[\u1100-\u11FF|\u3130-\u318F|\uA960-\uA97F|\uAC00-\uD7AF|\uD7B0-\uD7FF]');
/** Regex to detect Chinese text. */
/* tslint:disable:max-line-length */
var CHINESE_LANGUAGE_REGEX = new RegExp('[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]');
/* tslint:enable:max-line-length */
function getInitialsArabic(displayName, isRtl) {
    var name = displayName.replace(/\s/, '');
    return isRtl ? name[name.length - 1] : name[0];
}
function getInitialsAsian(displayName, isRtl) {
    var name = displayName.replace(/\s/, '');
    // For short names, only display a single character of the family name
    if (name.length <= 2) {
        return isRtl ? name[0] : name[name.length - 1];
    }
    // For long names, display the two most significant characters of the family name
    return isRtl ? name.substr(0, 2) : name.substr(name.length - 2, name.length);
}
function getInitialsLatin(displayName, isRtl) {
    var initials = '';
    var splits = displayName.split(' ');
    if (splits.length === 2) {
        initials += splits[0].charAt(0).toUpperCase();
        initials += splits[1].charAt(0).toUpperCase();
    }
    else if (splits.length === 3) {
        initials += splits[0].charAt(0).toUpperCase();
        initials += splits[2].charAt(0).toUpperCase();
    }
    else if (splits.length !== 0) {
        initials += splits[0].charAt(0).toUpperCase();
    }
    if (isRtl && initials.length > 1) {
        return initials.charAt(1) + initials.charAt(0);
    }
    return initials;
}
function cleanupDisplayName(displayName) {
    // Do not consider the suffixes within parenthesis while computing the initials.
    displayName = displayName.replace(CHARS_WITHIN_PARENTHESIS_REGEX, '');
    // Ignore non-word characters
    displayName = displayName.replace(UNICODE_ALPHANUMERIC_CHARS_REGEX, '');
    // Make whitespace consistent
    displayName = displayName.replace(MULTIPLE_WHITESPACES_REGEX_TOKEN, ' ');
    displayName = displayName.trim();
    return displayName;
}
/** Get (up to 2 characters) initials based on display name of the persona. */
function getInitials(displayName, isRtl) {
    if (displayName == null) {
        return '';
    }
    displayName = cleanupDisplayName(displayName);
    if (ARABIC_LANGUAGE_REGEX.test(displayName)) {
        return getInitialsArabic(displayName, isRtl);
    }
    if (KOREAN_LANGUAGE_REGEX.test(displayName) || CHINESE_LANGUAGE_REGEX.test(displayName)) {
        return getInitialsAsian(displayName, isRtl);
    }
    return getInitialsLatin(displayName, isRtl);
}
exports.getInitials = getInitials;



/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getDistanceBetweenPoints(point1, point2) {
    var distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    return distance;
}
exports.getDistanceBetweenPoints = getDistanceBetweenPoints;



/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Detects whether an element's content has horizontal overflow
 *
 * @param element Element to check for overflow
 * @returns True if element's content overflows
 */
function hasHorizontalOverflow(element) {
    return element.clientWidth < element.scrollWidth;
}
exports.hasHorizontalOverflow = hasHorizontalOverflow;
/**
 * Detects whether an element's content has vertical overflow
 *
 * @param element Element to check for overflow
 * @returns True if element's content overflows
 */
function hasVerticalOverflow(element) {
    return element.clientHeight < element.scrollHeight;
}
exports.hasVerticalOverflow = hasVerticalOverflow;
/**
 * Detects whether an element's content has overflow in any direction
 *
 * @param element Element to check for overflow
 * @returns True if element's content overflows
 */
function hasOverflow(element) {
    return hasHorizontalOverflow(element) || hasVerticalOverflow(element);
}
exports.hasOverflow = hasOverflow;



/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = __webpack_require__(28);
exports.baseElementEvents = [
    'onCopy',
    'onCut',
    'onPaste',
    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate',
    'onFocus',
    'onFocusCapture',
    'onBlur',
    'onBlurCapture',
    'onChange',
    'onInput',
    'onSubmit',
    'onLoad',
    'onError',
    'onKeyDown',
    'onKeyDownCapture',
    'onKeyPress',
    'onKeyUp',
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',
    'onClick',
    'onClickCapture',
    'onContextMenu',
    'onDoubleClick',
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',
    'onMouseDown',
    'onMouseDownCapture',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onMouseUpCapture',
    'onSelect',
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',
    'onScroll',
    'onWheel'
];
exports.baseElementProperties = [
    'defaultChecked',
    'defaultValue',
    'accept',
    'acceptCharset',
    'accessKey',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'challenge',
    'checked',
    'children',
    'classID',
    'className',
    'cols',
    'colSpan',
    'content',
    'contentEditable',
    'contextMenu',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'dir',
    'download',
    'draggable',
    'encType',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'height',
    'hidden',
    'high',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'icon',
    'id',
    'inputMode',
    'integrity',
    'is',
    'keyParams',
    'keyType',
    'kind',
    'lang',
    'list',
    'loop',
    'low',
    'manifest',
    'marginHeight',
    'marginWidth',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'poster',
    'preload',
    'radioGroup',
    'readOnly',
    'rel',
    'required',
    'role',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'spellCheck',
    'src',
    'srcDoc',
    'srcLang',
    'srcSet',
    'start',
    'step',
    'style',
    'summary',
    'tabIndex',
    'title',
    'type',
    'useMap',
    'value',
    'width',
    'wmode',
    'wrap'
];
exports.htmlElementProperties = exports.baseElementProperties.concat(exports.baseElementEvents);
exports.anchorProperties = exports.htmlElementProperties.concat([
    'href',
    'target'
]);
exports.buttonProperties = exports.htmlElementProperties.concat([
    'disabled'
]);
exports.divProperties = exports.htmlElementProperties.concat(['align', 'noWrap']);
exports.inputProperties = exports.buttonProperties;
exports.textAreaProperties = exports.buttonProperties;
exports.imageProperties = exports.divProperties;
/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 * @param props The unfiltered input props
 * @param allowedPropsNames The array of allowed propnames.
 * @returns The filtered props
 */
function getNativeProps(props, allowedPropNames, excludedPropNames) {
    return object_1.filteredAssign(function (propName) {
        return ((!excludedPropNames || excludedPropNames.indexOf(propName) < 0) && ((propName.indexOf('data-') === 0) ||
            (propName.indexOf('aria-') === 0) ||
            (allowedPropNames.indexOf(propName) >= 0)));
    }, {}, props);
}
exports.getNativeProps = getNativeProps;



/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _baseUrl = '';
/** Sets the current base url used for fetching images. */
function getResourceUrl(url) {
    return _baseUrl + url;
}
exports.getResourceUrl = getResourceUrl;
/** Gets the current base url used for fetching images. */
function setBaseUrl(baseUrl) {
    _baseUrl = baseUrl;
}
exports.setBaseUrl = setBaseUrl;
/** Gets the current runtime language. */
function getLanguage() {
    return 'en-us';
}
exports.getLanguage = getLanguage;



/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyCodes_1 = __webpack_require__(50);
var dom_1 = __webpack_require__(14);
// Default to undefined so that we initialize on first read.
var _isRTL;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
function getRTL() {
    if (_isRTL === undefined) {
        var doc = dom_1.getDocument();
        if (doc) {
            _isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        }
        else {
            throw new Error('getRTL was called in a server environment without setRTL being called first. ' +
                'Call setRTL to set the correct direction first.');
        }
    }
    return _isRTL;
}
exports.getRTL = getRTL;
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
function setRTL(isRTL) {
    var doc = dom_1.getDocument();
    if (doc) {
        doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
    var win = dom_1.getWindow();
    // tslint:disable-next-line:no-string-literal
    if (win && win['localStorage']) {
        localStorage.setItem('isRTL', isRTL ? '1' : '0');
    }
    _isRTL = isRTL;
}
exports.setRTL = setRTL;
/**
 * Returns the given key, but flips right/left arrows if necessary.
 */
function getRTLSafeKeyCode(key) {
    if (getRTL()) {
        if (key === KeyCodes_1.KeyCodes.left) {
            key = KeyCodes_1.KeyCodes.right;
        }
        else if (key === KeyCodes_1.KeyCodes.right) {
            key = KeyCodes_1.KeyCodes.left;
        }
    }
    return key;
}
exports.getRTLSafeKeyCode = getRTLSafeKeyCode;



/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    msFabricScrollDisabled: 'msFabricScrollDisabled_ecdd34d1',
};
exports.default = styles;
load_themed_styles_1.loadStyles([{ "rawString": ".msFabricScrollDisabled_ecdd34d1{overflow:hidden!important}" }]);
/* tslint:enable */ 



/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Regex that finds { and } so they can be removed on a lookup for string format
var FORMAT_ARGS_REGEX = /[\{\}]/g;
// Regex that finds {#} so it can be replaced by the arguments in string format
var FORMAT_REGEX = /\{\d+\}/g;
/**
 * String Format is like C# string format.
 * Usage Example: "hello {0}!".format("mike") will return "hello mike!"
 * Calling format on a string with less arguments than specified in the format is invalid
 * Example "I love {0} every {1}".format("CXP") will result in a Debug Exception.
 */
function format(s) {
    'use strict';
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var args = values;
    // Callback match function
    function replace_func(match) {
        // looks up in the args
        var replacement = args[match.replace(FORMAT_ARGS_REGEX, '')];
        // catches undefined in nondebug and null in debug and nondebug
        if (replacement === null || replacement === undefined) {
            replacement = '';
        }
        return replacement;
    }
    return (s.replace(FORMAT_REGEX, replace_func));
}
exports.format = format;



/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// rawAsap provides everything we need except exception management.
var rawAsap = __webpack_require__(53);
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(10);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(16);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(31);

var _PathUtils = __webpack_require__(15);

var _createTransitionManager = __webpack_require__(32);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils.stripLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  },
  slash: {
    encodePath: _PathUtils.addLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;


  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);

    return (0, _PathUtils.parsePath)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, _PathUtils.createPath)(location));
  };

  var push = function push(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createHashHistory;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(10);

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = __webpack_require__(15);

var _LocationUtils = __webpack_require__(31);

var _createTransitionManager = __webpack_require__(32);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? (0, _LocationUtils.createLocation)(entry, undefined, createKey()) : (0, _LocationUtils.createLocation)(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = _PathUtils.createPath;

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createMemoryHistory;

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(138);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(44)))

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(139);


/** Built-in value references. */
var getPrototype = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(57);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(135);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(141);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(165));



/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(171));



/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(182));



/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(194));



/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(203));



/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(209));



/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(212));
__export(__webpack_require__(12));



/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(216));



/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(219));



/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(222));



/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(227));



/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    flexContainer: 'flexContainer_5582c4c6',
    root: 'root_5582c4c6',
    screenReaderOnly: 'screenReaderOnly_5582c4c6',
};
load_themed_styles_1.loadStyles([{ "rawString": ".flexContainer_5582c4c6{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.root_5582c4c6{outline:transparent}.screenReaderOnly_5582c4c6{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var Button_Props_1 = __webpack_require__(62);
var DefaultButton_1 = __webpack_require__(65);
var CommandButton_1 = __webpack_require__(63);
var CompoundButton_1 = __webpack_require__(64);
var IconButton_1 = __webpack_require__(66);
var PrimaryButton_1 = __webpack_require__(67);
/**
 * This class is deprecated. Use the individual *Button components instead.
 * @deprecated
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        Utilities_1.warn("The Button component has been deprecated. Use specific variants instead. " +
            "(PrimaryButton, DefaultButton, IconButton, CommandButton, etc.)");
        return _this;
    }
    Button.prototype.render = function () {
        var props = this.props;
        switch (props.buttonType) {
            case Button_Props_1.ButtonType.command:
                return React.createElement(CommandButton_1.CommandButton, __assign({}, props));
            case Button_Props_1.ButtonType.compound:
                return React.createElement(CompoundButton_1.CompoundButton, __assign({}, props));
            case Button_Props_1.ButtonType.icon:
                return React.createElement(IconButton_1.IconButton, __assign({}, props));
            case Button_Props_1.ButtonType.primary:
                return React.createElement(PrimaryButton_1.PrimaryButton, __assign({}, props));
            default:
                return React.createElement(DefaultButton_1.DefaultButton, __assign({}, props));
        }
    };
    return Button;
}(Utilities_1.BaseComponent));
exports.Button = Button;



/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_e5176d6c',
    flexContainer: 'flexContainer_e5176d6c',
    label: 'label_e5176d6c',
    icon: 'icon_e5176d6c',
    isEnabled: 'isEnabled_e5176d6c',
    isDisabled: 'isDisabled_e5176d6c',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_e5176d6c{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;border-width:0;background-color:transparent;padding:0 4px;height:40px;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": "}.root_e5176d6c::-moz-focus-inner{border:0}.root_e5176d6c{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_e5176d6c:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.flexContainer_e5176d6c{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.label_e5176d6c{margin:0 4px;line-height:100%}.icon_e5176d6c{margin:0 4px;height:16px;line-height:16px;text-align:center;vertical-align:middle}.isEnabled_e5176d6c:hover{color:" }, { "theme": "themeDarker", "defaultValue": "#004578" }, { "rawString": "}.isEnabled_e5176d6c:active{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.isEnabled_e5176d6c .icon_e5176d6c{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.isDisabled_e5176d6c{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none;background-color:transparent}.isDisabled_e5176d6c:focus,.isDisabled_e5176d6c:hover{outline:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_b7a0ea77',
    flexContainer: 'flexContainer_b7a0ea77',
    label: 'label_b7a0ea77',
    description: 'description_b7a0ea77',
    isEnabled: 'isEnabled_b7a0ea77',
    isDisabled: 'isDisabled_b7a0ea77',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_b7a0ea77{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;padding:16px 20px;background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";min-width:80px;max-width:280px;min-height:72px}.root_b7a0ea77::-moz-focus-inner{border:0}.root_b7a0ea77{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_b7a0ea77:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.flexContainer_b7a0ea77{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;min-width:100%;height:auto}html[dir=ltr] .flexContainer_b7a0ea77{text-align:left}html[dir=rtl] .flexContainer_b7a0ea77{text-align:right}.label_b7a0ea77{margin:0 4px;line-height:100%;font-weight:600;color:" }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": ";margin:0 0 5px}.description_b7a0ea77{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:12px;font-weight:400;color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";line-height:100%}.isEnabled_b7a0ea77:hover{background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.isEnabled_b7a0ea77:hover .description_b7a0ea77{color:" }, { "theme": "neutralDark", "defaultValue": "#212121" }, { "rawString": "}.isEnabled_b7a0ea77:active{background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.isEnabled_b7a0ea77:active .description_b7a0ea77,.isEnabled_b7a0ea77:active .label_b7a0ea77{color:inherit}.isDisabled_b7a0ea77{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none}.isDisabled_b7a0ea77:focus,.isDisabled_b7a0ea77:hover{outline:0}.isDisabled_b7a0ea77 .description_b7a0ea77,.isDisabled_b7a0ea77 .label_b7a0ea77{color:inherit}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_de360392',
    label: 'label_de360392',
    icon: 'icon_de360392',
    isEnabled: 'isEnabled_de360392',
    isDisabled: 'isDisabled_de360392',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_de360392{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";min-width:80px;height:32px;font-weight:600;font-size:14px}.root_de360392::-moz-focus-inner{border:0}.root_de360392{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_de360392:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.label_de360392{margin:0 4px;line-height:100%}.icon_de360392{margin:0 4px;height:16px;line-height:16px;text-align:center;vertical-align:middle}.isEnabled_de360392:hover{background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";color:" }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}.isEnabled_de360392:active{background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.isDisabled_de360392{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none}.isDisabled_de360392:focus,.isDisabled_de360392:hover{outline:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_684b4241',
    icon: 'icon_684b4241',
    isEnabled: 'isEnabled_684b4241',
    isDisabled: 'isDisabled_684b4241',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_684b4241{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;border-width:0;background-color:transparent;padding:0 4px;width:32px;height:32px;color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";font-size:16px}.root_684b4241::-moz-focus-inner{border:0}.root_684b4241{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_684b4241:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.icon_684b4241{margin:0 4px;height:16px;line-height:16px;text-align:center;vertical-align:middle}.isEnabled_684b4241:hover{color:" }, { "theme": "themeDarker", "defaultValue": "#004578" }, { "rawString": "}.isEnabled_684b4241:active{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.isDisabled_684b4241{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none;background-color:transparent}.isDisabled_684b4241:focus,.isDisabled_684b4241:hover{outline:0}@media screen and (-ms-high-contrast:active){.isDisabled_684b4241{color:" }, { "theme": "yellowLight", "defaultValue": "#fff100" }, { "rawString": "}}@media screen and (-ms-high-contrast:black-on-white){.isDisabled_684b4241{color:" }, { "theme": "blueMid", "defaultValue": "#00188f" }, { "rawString": "}}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_8c10909e',
    label: 'label_8c10909e',
    icon: 'icon_8c10909e',
    isEnabled: 'isEnabled_8c10909e',
    isDisabled: 'isDisabled_8c10909e',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_8c10909e{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";min-width:80px;height:32px;font-weight:600;font-size:14px}.root_8c10909e::-moz-focus-inner{border:0}.root_8c10909e{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_8c10909e:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.root_8c10909e::-moz-focus-inner{border:0}.root_8c10909e{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_8c10909e:focus:after{content:'';position:absolute;top:1px;right:1px;bottom:1px;left:1px;pointer-events:none;border:1px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.label_8c10909e{margin:0 4px;line-height:100%}.icon_8c10909e{margin:0 4px;height:16px;line-height:16px;text-align:center;vertical-align:middle}.isEnabled_8c10909e:hover{background-color:" }, { "theme": "themeDark", "defaultValue": "#005a9e" }, { "rawString": "}.isEnabled_8c10909e:active{background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.isDisabled_8c10909e{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none}.isDisabled_8c10909e:focus,.isDisabled_8c10909e:hover{outline:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(11));
__export(__webpack_require__(62));
__export(__webpack_require__(155));
__export(__webpack_require__(63));
__export(__webpack_require__(64));
__export(__webpack_require__(65));
__export(__webpack_require__(67));
__export(__webpack_require__(66));



/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var CalloutContent_1 = __webpack_require__(164);
var Layer_1 = __webpack_require__(59);
var Callout = (function (_super) {
    __extends(Callout, _super);
    function Callout(props) {
        return _super.call(this, props) || this;
    }
    Callout.prototype.render = function () {
        var content = (React.createElement(CalloutContent_1.CalloutContent, __assign({}, this.props)));
        return this.props.doNotLayer ? content : (React.createElement(Layer_1.Layer, null, content));
    };
    return Callout;
}(Utilities_1.BaseComponent));
exports.Callout = Callout;



/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_6ecf5175',
    container: 'container_6ecf5175',
    main: 'main_6ecf5175',
    beak: 'beak_6ecf5175',
    beakCurtain: 'beakCurtain_6ecf5175',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_6ecf5175{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;box-shadow:0 0 15px -5px rgba(0,0,0,.4);position:absolute;border:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";box-sizing:border-box}@media screen and (-ms-high-contrast:active){.root_6ecf5175{border:1px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}}@media screen and (-ms-high-contrast:black-on-white){.root_6ecf5175{border:1px solid " }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}}.container_6ecf5175{position:relative}.main_6ecf5175{background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";overflow-x:hidden;overflow-y:auto;position:relative}.beak_6ecf5175{position:absolute;background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";box-shadow:inherit;border:inherit;box-sizing:border-box;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.beakCurtain_6ecf5175{position:absolute;top:0;right:0;bottom:0;left:0;background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
var DirectionalHint_1 = __webpack_require__(9);
var Utilities_1 = __webpack_require__(1);
var positioning_1 = __webpack_require__(234);
var Popup_1 = __webpack_require__(60);
var stylesImport = __webpack_require__(163);
var styles = stylesImport;
var BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
var OFF_SCREEN_STYLE = { opacity: 0 };
var BORDER_WIDTH = 1;
var CalloutContent = (function (_super) {
    __extends(CalloutContent, _super);
    function CalloutContent(props) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({ 'beakStyle': 'beakWidth' });
        _this._didSetInitialFocus = false;
        _this.state = {
            positions: null,
            slideDirectionalClassName: null,
            calloutElementRect: null
        };
        _this._positionAttempts = 0;
        return _this;
    }
    CalloutContent.prototype.componentDidUpdate = function () {
        this._setInitialFocus();
        this._updatePosition();
    };
    CalloutContent.prototype.componentWillMount = function () {
        var target = this.props.targetElement ? this.props.targetElement : this.props.target;
        this._setTargetWindowAndElement(target);
    };
    CalloutContent.prototype.componentWillUpdate = function (newProps) {
        if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target) {
            var newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
            this._maxHeight = undefined;
            this._setTargetWindowAndElement(newTarget);
        }
        if (newProps.gapSpace !== this.props.gapSpace || this.props.beakWidth !== newProps.beakWidth) {
            this._maxHeight = undefined;
        }
    };
    CalloutContent.prototype.componentDidMount = function () {
        this._onComponentDidMount();
    };
    CalloutContent.prototype.render = function () {
        // If there is no target window then we are likely in server side rendering and we should not render anything.
        if (!this._targetWindow) {
            return null;
        }
        var _a = this.props, role = _a.role, ariaDescribedBy = _a.ariaDescribedBy, ariaLabelledBy = _a.ariaLabelledBy, className = _a.className, target = _a.target, targetElement = _a.targetElement, isBeakVisible = _a.isBeakVisible, beakStyle = _a.beakStyle, children = _a.children, beakWidth = _a.beakWidth, backgroundColor = _a.backgroundColor;
        var positions = this.state.positions;
        var beakStyleWidth = beakWidth;
        // This is here to support the old way of setting the beak size until version 1.0.0.
        // beakStyle is now deprecated and will be be removed at version 1.0.0
        if (beakStyle === 'ms-Callout-smallbeak') {
            beakStyleWidth = 16;
        }
        var beakReactStyle = {
            top: positions && positions.beakPosition ? positions.beakPosition.top : BEAK_ORIGIN_POSITION.top,
            left: positions && positions.beakPosition ? positions.beakPosition.left : BEAK_ORIGIN_POSITION.left,
            height: beakStyleWidth,
            width: beakStyleWidth,
            backgroundColor: backgroundColor,
        };
        var directionalClassName = positions && positions.directionalClassName ? "ms-u-" + positions.directionalClassName : '';
        var contentMaxHeight = this._getMaxHeight();
        var beakVisible = isBeakVisible && (!!targetElement || !!target);
        var content = (React.createElement("div", { ref: this._resolveRef('_hostElement'), className: Utilities_1.css('ms-Callout-container', styles.container) },
            React.createElement("div", { className: Utilities_1.css('ms-Callout', styles.root, className, directionalClassName), style: positions ? positions.calloutPosition : OFF_SCREEN_STYLE, ref: this._resolveRef('_calloutElement') },
                beakVisible && (React.createElement("div", { className: Utilities_1.css('ms-Callout-beak', styles.beak), style: beakReactStyle })),
                beakVisible &&
                    (React.createElement("div", { className: Utilities_1.css('ms-Callout-beakCurtain', styles.beakCurtain) })),
                React.createElement(Popup_1.Popup, { role: role, ariaDescribedBy: ariaDescribedBy, ariaLabelledBy: ariaLabelledBy, className: Utilities_1.css('ms-Callout-main', styles.main), onDismiss: this.dismiss, shouldRestoreFocus: true, style: { maxHeight: contentMaxHeight, backgroundColor: backgroundColor } }, children))));
        return content;
    };
    CalloutContent.prototype.dismiss = function (ev) {
        var onDismiss = this.props.onDismiss;
        if (onDismiss) {
            onDismiss(ev);
        }
    };
    CalloutContent.prototype._dismissOnScroll = function (ev) {
        var preventDismissOnScroll = this.props.preventDismissOnScroll;
        if (this.state.positions && !preventDismissOnScroll) {
            this._dismissOnLostFocus(ev);
        }
    };
    CalloutContent.prototype._dismissOnLostFocus = function (ev) {
        var target = ev.target;
        var clickedOutsideCallout = this._hostElement && !Utilities_1.elementContains(this._hostElement, target);
        if ((!this._target && clickedOutsideCallout) ||
            ev.target !== this._targetWindow &&
                clickedOutsideCallout &&
                (this._target.stopPropagation ||
                    (!this._target || (target !== this._target && !Utilities_1.elementContains(this._target, target))))) {
            this.dismiss(ev);
        }
    };
    CalloutContent.prototype._setInitialFocus = function () {
        if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
            this._didSetInitialFocus = true;
            Utilities_1.focusFirstChild(this._calloutElement);
        }
    };
    CalloutContent.prototype._onComponentDidMount = function () {
        var _this = this;
        // This is added so the callout will dismiss when the window is scrolled
        // but not when something inside the callout is scrolled. The delay seems
        // to be required to avoid React firing an async focus event in IE from
        // the target changing focus quickly prior to rendering the callout.
        this._async.setTimeout(function () {
            _this._events.on(_this._targetWindow, 'scroll', _this._dismissOnScroll, true);
            _this._events.on(_this._targetWindow, 'resize', _this.dismiss, true);
            _this._events.on(_this._targetWindow, 'focus', _this._dismissOnLostFocus, true);
            _this._events.on(_this._targetWindow, 'click', _this._dismissOnLostFocus, true);
        }, 0);
        if (this.props.onLayerMounted) {
            this.props.onLayerMounted();
        }
        this._updatePosition();
    };
    CalloutContent.prototype._updatePosition = function () {
        var positions = this.state.positions;
        var hostElement = this._hostElement;
        var calloutElement = this._calloutElement;
        if (hostElement && calloutElement) {
            var currentProps = void 0;
            currentProps = Utilities_1.assign(currentProps, this.props);
            currentProps.bounds = this._getBounds();
            // Temporary to be removed when targetElement is removed. Currently deprecated.
            if (this.props.targetElement) {
                currentProps.targetElement = this._target;
            }
            else {
                currentProps.target = this._target;
            }
            var newPositions = positioning_1.getRelativePositions(currentProps, hostElement, calloutElement);
            // Set the new position only when the positions are not exists or one of the new callout positions are different.
            // The position should not change if the position is within 2 decimal places.
            if ((!positions && newPositions) ||
                (positions && newPositions && !this._arePositionsEqual(positions, newPositions)
                    && this._positionAttempts < 5)) {
                // We should not reposition the callout more than a few times, if it is then the content is likely resizing
                // and we should stop trying to reposition to prevent a stack overflow.
                this._positionAttempts++;
                this.setState({
                    positions: newPositions
                });
            }
            else {
                this._positionAttempts = 0;
                if (this.props.onPositioned) {
                    this.props.onPositioned();
                }
            }
        }
    };
    CalloutContent.prototype._getBounds = function () {
        if (!this._bounds) {
            var currentBounds = this.props.bounds;
            if (!currentBounds) {
                currentBounds = {
                    top: 0 + this.props.minPagePadding,
                    left: 0 + this.props.minPagePadding,
                    right: this._targetWindow.innerWidth - this.props.minPagePadding,
                    bottom: this._targetWindow.innerHeight - this.props.minPagePadding,
                    width: this._targetWindow.innerWidth - this.props.minPagePadding * 2,
                    height: this._targetWindow.innerHeight - this.props.minPagePadding * 2
                };
            }
            this._bounds = currentBounds;
        }
        return this._bounds;
    };
    CalloutContent.prototype._getMaxHeight = function () {
        if (!this._maxHeight) {
            if (this.props.directionalHintFixed && this._target) {
                var beakWidth = this.props.isBeakVisible ? this.props.beakWidth : 0;
                var gapSpace = this.props.gapSpace ? this.props.gapSpace : 0;
                this._maxHeight = positioning_1.getMaxHeight(this._target, this.props.directionalHint, beakWidth + gapSpace, this._getBounds());
            }
            else {
                this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
            }
        }
        return this._maxHeight;
    };
    CalloutContent.prototype._arePositionsEqual = function (positions, newPosition) {
        if (positions.calloutPosition.top.toFixed(2) !== newPosition.calloutPosition.top.toFixed(2)) {
            return false;
        }
        if (positions.calloutPosition.left.toFixed(2) !== newPosition.calloutPosition.left.toFixed(2)) {
            return false;
        }
        if (positions.beakPosition.top.toFixed(2) !== newPosition.beakPosition.top.toFixed(2)) {
            return false;
        }
        if (positions.beakPosition.top.toFixed(2) !== newPosition.beakPosition.top.toFixed(2)) {
            return false;
        }
        return true;
    };
    CalloutContent.prototype._setTargetWindowAndElement = function (target) {
        if (target) {
            if (typeof target === 'string') {
                var currentDoc = Utilities_1.getDocument();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = Utilities_1.getWindow();
            }
            else if (target.stopPropagation) {
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(target.toElement);
            }
            else {
                var targetElement = target;
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(targetElement);
            }
        }
        else {
            this._targetWindow = Utilities_1.getWindow();
        }
    };
    return CalloutContent;
}(Utilities_1.BaseComponent));
CalloutContent.defaultProps = {
    preventDismissOnScroll: false,
    isBeakVisible: true,
    beakWidth: 16,
    gapSpace: 0,
    minPagePadding: 8,
    directionalHint: DirectionalHint_1.DirectionalHint.bottomAutoEdge
};
__decorate([
    Utilities_1.autobind
], CalloutContent.prototype, "dismiss", null);
__decorate([
    Utilities_1.autobind
], CalloutContent.prototype, "_setInitialFocus", null);
__decorate([
    Utilities_1.autobind
], CalloutContent.prototype, "_onComponentDidMount", null);
exports.CalloutContent = CalloutContent;



/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(162));
__export(__webpack_require__(9));



/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(167);
var styles = stylesImport;
var Check = (function (_super) {
    __extends(Check, _super);
    function Check() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Check.prototype.shouldComponentUpdate = function (newProps) {
        return this.props.isChecked !== newProps.isChecked || this.props.checked !== newProps.checked;
    };
    Check.prototype.render = function () {
        var _a = this.props, isChecked = _a.isChecked, checked = _a.checked;
        isChecked = isChecked || checked;
        return (React.createElement("div", { className: Utilities_1.css('ms-Check', styles.root, (_b = {},
                _b['is-checked ' + styles.rootIsChecked] = isChecked,
                _b)) },
            React.createElement("div", { className: Utilities_1.css('ms-Icon ms-Check-background', styles.background) }),
            React.createElement("i", { className: Utilities_1.css('ms-Check-check ms-Icon ms-Icon--CheckMark', styles.check) })));
        var _b;
    };
    return Check;
}(Utilities_1.BaseComponent));
Check.defaultProps = {
    isChecked: false
};
exports.Check = Check;



/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_74eed348',
    rootIsChecked: 'rootIsChecked_74eed348',
    background: 'background_74eed348',
    check: 'check_74eed348',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_74eed348{line-height:1;width:24px;height:24px;vertical-align:top;position:relative;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.root_74eed348.rootIsChecked_74eed348 .background_74eed348:before{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.root_74eed348.rootIsChecked_74eed348 .background_74eed348:after{color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.root_74eed348.rootIsChecked_74eed348 .check_74eed348{opacity:1;color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";font-weight:900;font-size:12px}.root_74eed348:hover .check_74eed348{opacity:1}.check_74eed348{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": ";opacity:0}.background_74eed348{position:relative;height:24px;width:24px}.background_74eed348:before{content:'\\E91F';color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.background_74eed348:after{content:'\\EA3A';color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": "}.background_74eed348:after,.background_74eed348:before{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:24px;height:24px;width:24px;position:absolute}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(166));



/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var FocusZone_1 = __webpack_require__(8);
var ContextualMenu_1 = __webpack_require__(58);
var DirectionalHint_1 = __webpack_require__(9);
var Icon_1 = __webpack_require__(17);
var stylesImport = __webpack_require__(170);
var styles = stylesImport;
var OVERFLOW_KEY = 'overflow';
var OVERFLOW_WIDTH = 41.5;
var CommandBar = (function (_super) {
    __extends(CommandBar, _super);
    function CommandBar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this._getStateFromProps(props);
        _this._id = Utilities_1.getId('CommandBar');
        return _this;
    }
    CommandBar.prototype.componentDidMount = function () {
        this._updateItemMeasurements();
        this._updateRenderedItems();
        this._events.on(window, 'resize', this._updateRenderedItems);
    };
    CommandBar.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(this._getStateFromProps(nextProps));
        this._commandItemWidths = null;
    };
    CommandBar.prototype.componentDidUpdate = function (prevProps, prevStates) {
        if (!this._commandItemWidths) {
            this._updateItemMeasurements();
            this._updateRenderedItems();
        }
    };
    CommandBar.prototype.render = function () {
        var _this = this;
        var _a = this.props, isSearchBoxVisible = _a.isSearchBoxVisible, searchPlaceholderText = _a.searchPlaceholderText, className = _a.className;
        var _b = this.state, renderedItems = _b.renderedItems, contextualMenuProps = _b.contextualMenuProps, expandedMenuItemKey = _b.expandedMenuItemKey, expandedMenuId = _b.expandedMenuId, renderedOverflowItems = _b.renderedOverflowItems, contextualMenuTarget = _b.contextualMenuTarget, renderedFarItems = _b.renderedFarItems;
        var searchBox;
        if (isSearchBoxVisible) {
            searchBox = (React.createElement("div", { className: Utilities_1.css('ms-CommandBarSearch', styles.search), ref: 'searchSurface' },
                React.createElement("input", { className: Utilities_1.css('ms-CommandBarSearch-input', styles.searchInput), type: 'text', placeholder: searchPlaceholderText }),
                React.createElement("div", { className: Utilities_1.css('ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconSearchWrapper', styles.searchIconWrapper, styles.searchIconSearchWrapper) },
                    React.createElement("i", { className: Utilities_1.css('ms-Icon ms-Icon--Search') })),
                React.createElement("div", { className: Utilities_1.css('ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconClearWrapper ms-font-s', styles.searchIconWrapper, styles.searchIconClearWrapper) },
                    React.createElement("i", { className: Utilities_1.css('ms-Icon ms-Icon--Cancel') }))));
        }
        return (React.createElement("div", { className: Utilities_1.css('ms-CommandBar', styles.root, className), ref: 'commandBarRegion' },
            searchBox,
            React.createElement(FocusZone_1.FocusZone, { ref: 'focusZone', direction: FocusZone_1.FocusZoneDirection.horizontal, role: 'menubar' },
                React.createElement("div", { className: Utilities_1.css('ms-CommandBar-primaryCommands', styles.primaryCommands), ref: 'commandSurface' }, renderedItems.map(function (item, index) { return (_this._renderItemInCommandBar(item, index, expandedMenuItemKey)); }).concat((renderedOverflowItems && renderedOverflowItems.length) ? [
                    React.createElement("div", { className: Utilities_1.css('ms-CommandBarItem', styles.item), key: OVERFLOW_KEY, ref: OVERFLOW_KEY },
                        React.createElement("button", { type: 'button', id: this._id + OVERFLOW_KEY, className: Utilities_1.css('ms-CommandBarItem-link', styles.itemLink, (_c = {},
                                _c['is-expanded ' + styles.itemLinkIsExpanded] = (expandedMenuItemKey === OVERFLOW_KEY),
                                _c)), onClick: this._onOverflowClick, role: 'menuitem', "aria-label": this.props.elipisisAriaLabel || '', "aria-haspopup": true, "data-automation-id": 'commandBarOverflow' },
                            React.createElement("i", { className: Utilities_1.css('ms-CommandBarItem-overflow ms-Icon ms-Icon--More', styles.itemOverflow) })))
                ] : [])),
                React.createElement("div", { className: Utilities_1.css('ms-CommandBar-sideCommands', styles.sideCommands), ref: 'farCommandSurface' }, renderedFarItems.map(function (item, index) { return (_this._renderItemInCommandBar(item, index, expandedMenuItemKey, true)); }))),
            (contextualMenuProps) ?
                (React.createElement(ContextualMenu_1.ContextualMenu, __assign({ className: Utilities_1.css('ms-CommandBar-menuHost'), isBeakVisible: true, directionalHint: DirectionalHint_1.DirectionalHint.bottomAutoEdge }, contextualMenuProps, { targetElement: contextualMenuTarget, labelElementId: expandedMenuId, onDismiss: this._onContextMenuDismiss }))) : (null)));
        var _c;
    };
    CommandBar.prototype.focus = function () {
        this.refs.focusZone.focus();
    };
    CommandBar.prototype._renderItemInCommandBar = function (item, index, expandedMenuItemKey, isFarItem) {
        var _this = this;
        if (item.onRender) {
            return React.createElement("div", { className: Utilities_1.css('ms-CommandBarItem', styles.item, item.className), key: item.key, ref: item.key }, item.onRender(item));
        }
        var itemKey = item.key || String(index);
        var isLink = item.onClick || ContextualMenu_1.hasSubmenuItems(item);
        var className = Utilities_1.css(isLink ? ('ms-CommandBarItem-link ' + styles.itemLink) : ('ms-CommandBarItem-text ' + styles.itemText), !item.name && ('ms-CommandBarItem--noName ' + styles.itemLinkIsNoName), (expandedMenuItemKey === item.key) && ('is-expanded ' + styles.itemLinkIsExpanded));
        var hasIcon = !!item.icon || !!item.iconProps;
        return React.createElement("div", { className: Utilities_1.css('ms-CommandBarItem', styles.item, item.className), key: itemKey, ref: itemKey }, (function () {
            if (isLink) {
                return React.createElement("button", __assign({}, Utilities_1.getNativeProps(item, Utilities_1.buttonProperties), { id: _this._id + item.key, className: className, onClick: function (ev) { return _this._onItemClick(ev, item); }, "data-command-key": index, "aria-haspopup": ContextualMenu_1.hasSubmenuItems(item), role: 'menuitem', "aria-label": item.ariaLabel || item.name }),
                    (hasIcon) ? _this._renderIcon(item) : (null),
                    (!!item.name) && (React.createElement("span", { className: Utilities_1.css('ms-CommandBarItem-commandText', styles.itemCommandText) }, item.name)),
                    ContextualMenu_1.hasSubmenuItems(item) ? (React.createElement("i", { className: Utilities_1.css('ms-CommandBarItem-chevronDown ms-Icon ms-Icon--ChevronDown', styles.itemChevronDown) })) : (null));
            }
            else if (item.href) {
                return React.createElement("a", __assign({}, Utilities_1.getNativeProps(item, Utilities_1.anchorProperties), { id: _this._id + item.key, className: className, href: item.href, "data-command-key": index, "aria-haspopup": ContextualMenu_1.hasSubmenuItems(item), role: 'menuitem', "aria-label": item.ariaLabel || item.name }),
                    (hasIcon) ? _this._renderIcon(item) : (null),
                    (!!item.name) && (React.createElement("span", { className: Utilities_1.css('ms-CommandBarItem-commandText', styles.itemCommandText) }, item.name)));
            }
            else {
                return React.createElement("div", __assign({}, Utilities_1.getNativeProps(item, Utilities_1.divProperties), { id: _this._id + item.key, className: className, "data-command-key": index, "aria-haspopup": ContextualMenu_1.hasSubmenuItems(item) }),
                    (hasIcon) ? _this._renderIcon(item) : (null),
                    React.createElement("span", { className: Utilities_1.css('ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular', styles.itemCommandText), "aria-hidden": 'true', role: 'presentation' }, item.name));
            }
        })());
    };
    CommandBar.prototype._renderIcon = function (item) {
        // Only present to allow continued use of item.icon which is deprecated.
        var iconProps = item.iconProps ? item.iconProps : {
            iconName: item.icon
        };
        // Use the default icon color for the known icon names
        var iconColorClassName = iconProps.iconName === 'None' ? '' : ('ms-CommandBarItem-iconColor ' + styles.itemIconColor);
        var iconClassName = Utilities_1.css('ms-CommandBarItem-icon', styles.itemIcon, iconColorClassName, iconProps.className);
        return React.createElement(Icon_1.Icon, __assign({}, iconProps, { className: iconClassName }));
    };
    CommandBar.prototype._updateItemMeasurements = function () {
        // the generated width for overflow is 35 in chrome, 38 in IE, but the actual value is 41.5
        if (this.refs[OVERFLOW_KEY] || (this.props.overflowItems && this.props.overflowItems.length)) {
            this._overflowWidth = OVERFLOW_WIDTH;
        }
        else {
            this._overflowWidth = 0;
        }
        if (!this._commandItemWidths) {
            this._commandItemWidths = {};
        }
        for (var i = 0; i < this.props.items.length; i++) {
            var item = this.props.items[i];
            if (!this._commandItemWidths[item.key]) {
                var el = this.refs[item.key];
                if (el) {
                    this._commandItemWidths[item.key] = el.getBoundingClientRect().width;
                }
            }
        }
    };
    CommandBar.prototype._updateRenderedItems = function () {
        var _a = this.props, items = _a.items, overflowItems = _a.overflowItems;
        var commandSurface = this.refs.commandSurface;
        var farCommandSurface = this.refs.farCommandSurface;
        var commandBarRegion = this.refs.commandBarRegion;
        var searchSurface = this.refs.searchSurface;
        var renderedItems = [].concat(items);
        var renderedOverflowItems = overflowItems;
        var consumedWidth = 0;
        var isOverflowVisible = overflowItems && overflowItems.length;
        var style = window.getComputedStyle(commandSurface);
        var availableWidth = commandBarRegion.clientWidth - parseInt(style.marginLeft, 10) - parseInt(style.marginRight, 10);
        if (searchSurface) {
            availableWidth -= searchSurface.getBoundingClientRect().width;
        }
        if (farCommandSurface) {
            availableWidth -= farCommandSurface.getBoundingClientRect().width;
        }
        if (isOverflowVisible) {
            availableWidth -= this._overflowWidth;
        }
        for (var i = 0; i < renderedItems.length; i++) {
            var item = renderedItems[i];
            var itemWidth = this._commandItemWidths[item.key];
            if ((consumedWidth + itemWidth) >= availableWidth) {
                if (i > 0 && !isOverflowVisible && (availableWidth - consumedWidth) < OVERFLOW_WIDTH) {
                    i--;
                }
                renderedOverflowItems = renderedItems.splice(i).concat(overflowItems);
                break;
            }
            else {
                consumedWidth += itemWidth;
            }
        }
        var renderedContextualMenuProps = this._getContextualMenuPropsAfterUpdate(renderedItems.concat(this.state.renderedFarItems), renderedOverflowItems);
        this.setState({
            renderedItems: renderedItems,
            renderedOverflowItems: renderedOverflowItems,
            expandedMenuItemKey: renderedContextualMenuProps ? this.state.expandedMenuItemKey : null,
            contextualMenuProps: renderedContextualMenuProps,
            contextualMenuTarget: renderedContextualMenuProps ? this.state.contextualMenuTarget : null
        });
    };
    CommandBar.prototype._onItemClick = function (ev, item) {
        if (item.key === this.state.expandedMenuItemKey || !ContextualMenu_1.hasSubmenuItems(item)) {
            this._onContextMenuDismiss();
        }
        else {
            this.setState({
                expandedMenuId: ev.currentTarget.id,
                expandedMenuItemKey: item.key,
                contextualMenuProps: this._getContextualMenuPropsFromItem(item),
                contextualMenuTarget: ev.currentTarget
            });
        }
        if (item.onClick) {
            item.onClick(ev, item);
        }
    };
    CommandBar.prototype._onOverflowClick = function (ev) {
        if (this.state.expandedMenuItemKey === OVERFLOW_KEY) {
            this._onContextMenuDismiss();
        }
        else {
            this.setState({
                expandedMenuId: ev.currentTarget.id,
                expandedMenuItemKey: OVERFLOW_KEY,
                contextualMenuProps: { items: this.state.renderedOverflowItems },
                contextualMenuTarget: ev.currentTarget
            });
        }
    };
    CommandBar.prototype._onContextMenuDismiss = function (ev) {
        if (!ev || !ev.relatedTarget || !this.refs.commandSurface.contains(ev.relatedTarget)) {
            var contextualMenuProps = this.state.contextualMenuProps;
            if (contextualMenuProps && contextualMenuProps.onDismiss) {
                this.state.contextualMenuProps.onDismiss(ev);
            }
            this.setState({
                expandedMenuItemKey: null,
                contextualMenuProps: null,
                contextualMenuTarget: null
            });
        }
        else {
            ev.stopPropagation();
            ev.preventDefault();
        }
    };
    CommandBar.prototype._getStateFromProps = function (nextProps) {
        return {
            renderedItems: nextProps.items || [],
            renderedOverflowItems: null,
            contextualMenuProps: this._getContextualMenuPropsAfterUpdate(nextProps.items.concat(nextProps.farItems), nextProps.overflowItems),
            renderedFarItems: nextProps.farItems || null
        };
    };
    CommandBar.prototype._getContextualMenuPropsAfterUpdate = function (renderedItems, overflowItems) {
        var _this = this;
        if (this.state && this.state.expandedMenuItemKey) {
            if (this.state.expandedMenuItemKey === OVERFLOW_KEY) {
                // Keep the overflow menu open
                return { items: overflowItems };
            }
            else {
                // Find the currently open key in the new props
                var matchingItem = renderedItems.filter(function (item) { return item.key === _this.state.expandedMenuItemKey; });
                if (matchingItem.length === 1) {
                    return this._getContextualMenuPropsFromItem(matchingItem[0]);
                }
            }
        }
        return null;
    };
    CommandBar.prototype._getContextualMenuPropsFromItem = function (item) {
        return item.subMenuProps || (item.items && { items: item.items });
    };
    return CommandBar;
}(Utilities_1.BaseComponent));
CommandBar.defaultProps = {
    items: [],
    overflowItems: [],
    farItems: []
};
__decorate([
    Utilities_1.autobind
], CommandBar.prototype, "_onOverflowClick", null);
__decorate([
    Utilities_1.autobind
], CommandBar.prototype, "_onContextMenuDismiss", null);
exports.CommandBar = CommandBar;



/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_4c9cf24d',
    primaryCommands: 'primaryCommands_4c9cf24d',
    sideCommands: 'sideCommands_4c9cf24d',
    item: 'item_4c9cf24d',
    itemChevronDown: 'itemChevronDown_4c9cf24d',
    itemCommandText: 'itemCommandText_4c9cf24d',
    itemText: 'itemText_4c9cf24d',
    itemLinkIsNoName: 'itemLinkIsNoName_4c9cf24d',
    itemLink: 'itemLink_4c9cf24d',
    itemLinkIsExpanded: 'itemLinkIsExpanded_4c9cf24d',
    itemIcon: 'itemIcon_4c9cf24d',
    itemOverflow: 'itemOverflow_4c9cf24d',
    itemIconColor: 'itemIconColor_4c9cf24d',
    search: 'search_4c9cf24d',
    searchInput: 'searchInput_4c9cf24d',
    searchIconSearchWrapper: 'searchIconSearchWrapper_4c9cf24d',
    searchIconArrowWrapper: 'searchIconArrowWrapper_4c9cf24d',
    searchIconClearWrapper: 'searchIconClearWrapper_4c9cf24d',
    searchIconWrapper: 'searchIconWrapper_4c9cf24d',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_4c9cf24d{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";position:relative;background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";height:40px;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.primaryCommands_4c9cf24d{position:absolute;overflow:hidden;display:inline;vertical-align:top;line-height:40px;max-width:100%;margin:0 20px}.sideCommands_4c9cf24d{position:absolute}html[dir=ltr] .sideCommands_4c9cf24d{right:0}html[dir=rtl] .sideCommands_4c9cf24d{left:0}html[dir=ltr] .sideCommands_4c9cf24d{text-align:right}html[dir=rtl] .sideCommands_4c9cf24d{text-align:left}html[dir=ltr] .sideCommands_4c9cf24d{padding-right:20px}html[dir=rtl] .sideCommands_4c9cf24d{padding-left:20px}.item_4c9cf24d{display:inline-block;color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";height:40px;outline:transparent;vertical-align:top;margin:0 4px}.item_4c9cf24d:hover{background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": "}.itemChevronDown_4c9cf24d,.itemCommandText_4c9cf24d{display:inline-block;padding:0 4px;vertical-align:top}.itemText_4c9cf24d{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";position:relative;background:0 0;border:none;line-height:40px;min-width:20px;text-align:center;padding:0 4px;display:block;height:100%}.itemText_4c9cf24d::-moz-focus-inner{border:0}.itemText_4c9cf24d{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .itemText_4c9cf24d:focus:after{content:'';position:absolute;top:2px;right:2px;bottom:2px;left:2px;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.itemText_4c9cf24d.itemLinkIsNoName_4c9cf24d{padding:0 8px}.itemLink_4c9cf24d{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";position:relative;background:0 0;border:none;line-height:40px;min-width:20px;text-align:center;padding:0 4px;display:block;height:100%;cursor:pointer}.itemLink_4c9cf24d::-moz-focus-inner{border:0}.itemLink_4c9cf24d{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .itemLink_4c9cf24d:focus:after{content:'';position:absolute;top:2px;right:2px;bottom:2px;left:2px;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.itemLink_4c9cf24d.itemLinkIsNoName_4c9cf24d{padding:0 8px}@media screen and (-ms-high-contrast:active){.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d::-moz-focus-inner,.itemLink_4c9cf24d:hover::-moz-focus-inner{border:0}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d,.itemLink_4c9cf24d:hover{outline:transparent;position:relative}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d::after,.itemLink_4c9cf24d:hover::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}}@media screen and (-ms-high-contrast:black-on-white){.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d::-moz-focus-inner,.itemLink_4c9cf24d:hover::-moz-focus-inner{border:0}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d,.itemLink_4c9cf24d:hover{outline:transparent;position:relative}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d::after,.itemLink_4c9cf24d:hover::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}}.itemLink_4c9cf24d:hover:not([disabled]){color:" }, { "theme": "neutralDark", "defaultValue": "#212121" }, { "rawString": ";background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.itemLink_4c9cf24d:hover:not([disabled]) .itemIcon_4c9cf24d{color:" }, { "theme": "themeDark", "defaultValue": "#005a9e" }, { "rawString": "}.itemLink_4c9cf24d:hover:not([disabled]) .itemChevronDown_4c9cf24d{color:" }, { "theme": "neutralPrimaryAlt", "defaultValue": "#3c3c3c" }, { "rawString": "}.itemLink_4c9cf24d:hover:not([disabled]) .itemOverflow_4c9cf24d{color:" }, { "theme": "neutralDark", "defaultValue": "#212121" }, { "rawString": "}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d{background-color:" }, { "theme": "neutralQuaternaryAlt", "defaultValue": "#dadada" }, { "rawString": ";color:" }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d .itemIcon_4c9cf24d{color:" }, { "theme": "themeDarker", "defaultValue": "#004578" }, { "rawString": "}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d .itemChevronDown_4c9cf24d{color:" }, { "theme": "neutralDark", "defaultValue": "#212121" }, { "rawString": "}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d .itemOverflow_4c9cf24d{color:" }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}.itemLink_4c9cf24d.itemLinkIsExpanded_4c9cf24d:hover{background-color:" }, { "theme": "neutralQuaternary", "defaultValue": "#d0d0d0" }, { "rawString": "}.itemLink_4c9cf24d[disabled]{color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": ";cursor:default;pointer-events:none}.itemLink_4c9cf24d[disabled] .itemIcon_4c9cf24d{color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": "}.itemIcon_4c9cf24d{font-size:16px;padding:0 4px}.itemIconColor_4c9cf24d{color:" }, { "theme": "themeDarkAlt", "defaultValue": "#106ebe" }, { "rawString": "}.itemChevronDown_4c9cf24d{color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";font-size:12px}.itemOverflow_4c9cf24d{font-size:18px;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";padding:0 7px}.search_4c9cf24d{width:208px;max-width:208px;background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";height:40px;position:relative;box-sizing:border-box;border-color:transparent}html[dir=ltr] .search_4c9cf24d{float:left}html[dir=rtl] .search_4c9cf24d{float:right}html[dir=ltr] .search_4c9cf24d{border-right:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}html[dir=rtl] .search_4c9cf24d{border-left:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}@media screen and (-ms-high-contrast:active){.search_4c9cf24d{z-index:10}html[dir=ltr] .search_4c9cf24d{border-right:1px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}html[dir=rtl] .search_4c9cf24d{border-left:1px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}}@media screen and (-ms-high-contrast:black-on-white){html[dir=ltr] .search_4c9cf24d{border-right:1px solid " }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}html[dir=rtl] .search_4c9cf24d{border-left:1px solid " }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}}.search_4c9cf24d:before{position:absolute;content:' ';right:0;bottom:0;left:0;margin:0 8px;border-bottom:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.search_4c9cf24d:hover{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}@media screen and (-ms-high-contrast:active){.search_4c9cf24d:hover::-moz-focus-inner{border:0}.search_4c9cf24d:hover{outline:transparent;position:relative}.search_4c9cf24d:hover::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}}@media screen and (-ms-high-contrast:black-on-white){.search_4c9cf24d:hover::-moz-focus-inner{border:0}.search_4c9cf24d:hover{outline:transparent;position:relative}.search_4c9cf24d:hover::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}}.searchInput_4c9cf24d{height:40px;padding:8px 8px 8px 0;border:none;background-color:transparent;width:100%;box-sizing:border-box;outline:0;cursor:pointer;font-size:14px;-webkit-appearance:none;-webkit-border-radius:0}html[dir=ltr] .searchInput_4c9cf24d{border-left:42px solid transparent}html[dir=rtl] .searchInput_4c9cf24d{border-right:42px solid transparent}@media screen and (-ms-high-contrast:active){html[dir=ltr] .searchInput_4c9cf24d{border-left:40px solid " }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}html[dir=rtl] .searchInput_4c9cf24d{border-right:40px solid " }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}}@media screen and (-ms-high-contrast:black-on-white){html[dir=ltr] .searchInput_4c9cf24d{border-left:40px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}html[dir=rtl] .searchInput_4c9cf24d{border-right:40px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}}.searchInput_4c9cf24d::-ms-clear{display:none}.searchIconSearchWrapper_4c9cf24d{display:block}.searchIconArrowWrapper_4c9cf24d{display:none}.searchIconArrowWrapper_4c9cf24d,.searchIconSearchWrapper_4c9cf24d{top:0}html[dir=ltr] .searchIconArrowWrapper_4c9cf24d,html[dir=ltr] .searchIconSearchWrapper_4c9cf24d{padding-left:17px}html[dir=rtl] .searchIconArrowWrapper_4c9cf24d,html[dir=rtl] .searchIconSearchWrapper_4c9cf24d{padding-right:17px}html[dir=ltr] .searchIconArrowWrapper_4c9cf24d,html[dir=ltr] .searchIconSearchWrapper_4c9cf24d{padding-right:8px}html[dir=rtl] .searchIconArrowWrapper_4c9cf24d,html[dir=rtl] .searchIconSearchWrapper_4c9cf24d{padding-left:8px}.searchIconClearWrapper_4c9cf24d{display:none;top:1px;z-index:10}html[dir=ltr] .searchIconClearWrapper_4c9cf24d{right:0}html[dir=rtl] .searchIconClearWrapper_4c9cf24d{left:0}.searchIconWrapper_4c9cf24d{height:40px;line-height:40px;cursor:pointer;position:absolute;text-align:center}.search_4c9cf24d .ms-Icon:before{font-size:16px;color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.searchInput_4c9cf24d,.searchInput_4c9cf24d::-webkit-input-placeholder{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(169));



/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ContextualMenu_Props_1 = __webpack_require__(68);
var DirectionalHint_1 = __webpack_require__(9);
var FocusZone_1 = __webpack_require__(8);
var Utilities_1 = __webpack_require__(1);
var Callout_1 = __webpack_require__(143);
var Icon_1 = __webpack_require__(17);
var stylesImport = __webpack_require__(173);
var styles = stylesImport;
var ContextualMenuType;
(function (ContextualMenuType) {
    ContextualMenuType[ContextualMenuType["vertical"] = 0] = "vertical";
    ContextualMenuType[ContextualMenuType["horizontal"] = 1] = "horizontal";
})(ContextualMenuType || (ContextualMenuType = {}));
var HorizontalAlignmentHint;
(function (HorizontalAlignmentHint) {
    HorizontalAlignmentHint[HorizontalAlignmentHint["auto"] = 0] = "auto";
    HorizontalAlignmentHint[HorizontalAlignmentHint["left"] = 1] = "left";
    HorizontalAlignmentHint[HorizontalAlignmentHint["center"] = 2] = "center";
    HorizontalAlignmentHint[HorizontalAlignmentHint["right"] = 3] = "right";
})(HorizontalAlignmentHint || (HorizontalAlignmentHint = {}));
var VerticalAlignmentHint;
(function (VerticalAlignmentHint) {
    VerticalAlignmentHint[VerticalAlignmentHint["top"] = 0] = "top";
    VerticalAlignmentHint[VerticalAlignmentHint["center"] = 1] = "center";
    VerticalAlignmentHint[VerticalAlignmentHint["bottom"] = 2] = "bottom";
})(VerticalAlignmentHint || (VerticalAlignmentHint = {}));
function hasSubmenuItems(item) {
    var submenuItems = getSubmenuItems(item);
    return !!(submenuItems && submenuItems.length);
}
exports.hasSubmenuItems = hasSubmenuItems;
function getSubmenuItems(item) {
    return item.subMenuProps ? item.subMenuProps.items : item.items;
}
exports.getSubmenuItems = getSubmenuItems;
var ContextualMenu = (function (_super) {
    __extends(ContextualMenu, _super);
    function ContextualMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            contextualMenuItems: null,
            subMenuId: Utilities_1.getId('ContextualMenu')
        };
        _this._isFocusingPreviousElement = false;
        _this._enterTimerId = 0;
        return _this;
    }
    ContextualMenu.prototype.dismiss = function (ev, dismissAll) {
        var onDismiss = this.props.onDismiss;
        if (onDismiss) {
            onDismiss(ev, dismissAll);
        }
    };
    ContextualMenu.prototype.componentWillUpdate = function (newProps) {
        if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target) {
            var newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
            this._setTargetWindowAndElement(newTarget);
        }
    };
    // Invoked once, both on the client and server, immediately before the initial rendering occurs.
    ContextualMenu.prototype.componentWillMount = function () {
        var target = this.props.targetElement ? this.props.targetElement : this.props.target;
        this._setTargetWindowAndElement(target);
        this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement : null;
    };
    // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
    ContextualMenu.prototype.componentDidMount = function () {
        this._events.on(this._targetWindow, 'resize', this.dismiss);
        if (this.props.onMenuOpened) {
            this.props.onMenuOpened(this.props);
        }
    };
    // Invoked immediately before a component is unmounted from the DOM.
    ContextualMenu.prototype.componentWillUnmount = function () {
        var _this = this;
        if (this._isFocusingPreviousElement && this._previousActiveElement) {
            // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
            // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
            // to reset the focus back to the thing it thinks should have been focused.
            setTimeout(function () { return _this._previousActiveElement.focus(); }, 0);
        }
        this._events.dispose();
        this._async.dispose();
    };
    ContextualMenu.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, items = _a.items, isBeakVisible = _a.isBeakVisible, labelElementId = _a.labelElementId, targetElement = _a.targetElement, id = _a.id, targetPoint = _a.targetPoint, useTargetPoint = _a.useTargetPoint, beakWidth = _a.beakWidth, directionalHint = _a.directionalHint, gapSpace = _a.gapSpace, coverTarget = _a.coverTarget, ariaLabel = _a.ariaLabel, doNotLayer = _a.doNotLayer, arrowDirection = _a.arrowDirection, target = _a.target, bounds = _a.bounds, directionalHintFixed = _a.directionalHintFixed, shouldFocusOnMount = _a.shouldFocusOnMount, calloutProps = _a.calloutProps;
        var submenuProps = this.state.submenuProps;
        var hasIcons = !!(items && items.some(function (item) { return !!item.icon || !!item.iconProps; }));
        var hasCheckmarks = !!(items && items.some(function (item) { return !!item.canCheck; }));
        // The menu should only return if items were provided, if no items were provided then it should not appear.
        if (items && items.length > 0) {
            return (React.createElement(Callout_1.Callout, __assign({}, calloutProps, { target: target, targetElement: targetElement, targetPoint: targetPoint, useTargetPoint: useTargetPoint, isBeakVisible: isBeakVisible, beakWidth: beakWidth, directionalHint: directionalHint, gapSpace: gapSpace, coverTarget: coverTarget, doNotLayer: doNotLayer, className: 'ms-ContextualMenu-Callout', setInitialFocus: shouldFocusOnMount, onDismiss: this.props.onDismiss, bounds: bounds, directionalHintFixed: directionalHintFixed }),
                React.createElement("div", { ref: function (host) { return _this._host = host; }, id: id, className: Utilities_1.css('ms-ContextualMenu-container', className) },
                    (items && items.length) ? (React.createElement(FocusZone_1.FocusZone, { className: Utilities_1.css('ms-ContextualMenu is-open', styles.root), direction: arrowDirection, ariaLabelledBy: labelElementId, ref: function (focusZone) { return _this._focusZone = focusZone; }, role: 'menu', "aria-label": ariaLabel, isCircularNavigation: true },
                        React.createElement("ul", { className: Utilities_1.css('ms-ContextualMenu-list is-open', styles.list), onKeyDown: this._onKeyDown }, items.map(function (item, index) { return (_this._renderMenuItem(item, index, hasCheckmarks, hasIcons)); })))) : (null),
                    submenuProps ? (React.createElement(ContextualMenu, __assign({}, submenuProps))) : (null))));
        }
        else {
            return null;
        }
    };
    ContextualMenu.prototype._renderMenuItem = function (item, index, hasCheckmarks, hasIcons) {
        var renderedItems = [];
        if (item.name === '-') {
            item.itemType = ContextualMenu_Props_1.ContextualMenuItemType.Divider;
        }
        switch (item.itemType) {
            case ContextualMenu_Props_1.ContextualMenuItemType.Divider:
                renderedItems.push(this._renderSeparator(index, item.className));
                break;
            case ContextualMenu_Props_1.ContextualMenuItemType.Header:
                renderedItems.push(this._renderSeparator(index));
                var headerItem = this._renderHeaderMenuItem(item, index, hasCheckmarks, hasIcons);
                renderedItems.push(this._renderListItem(headerItem, item.key || index, item.className, item.title));
                break;
            default:
                var menuItem = this._renderNormalItem(item, index, hasCheckmarks, hasIcons);
                renderedItems.push(this._renderListItem(menuItem, item.key || index, item.className, item.title));
                break;
        }
        return renderedItems;
    };
    ContextualMenu.prototype._renderListItem = function (content, key, className, title) {
        return React.createElement("li", { role: 'menuitem', title: title, key: key, className: Utilities_1.css('ms-ContextualMenu-item', styles.item, className) }, content);
    };
    ContextualMenu.prototype._renderSeparator = function (index, className) {
        if (index > 0) {
            return React.createElement("li", { role: 'separator', key: 'separator-' + index, className: Utilities_1.css('ms-ContextualMenu-divider', styles.divider, className) });
        }
        return null;
    };
    ContextualMenu.prototype._renderNormalItem = function (item, index, hasCheckmarks, hasIcons) {
        if (item.onRender) {
            return [item.onRender(item)];
        }
        if (item.href) {
            return this._renderAnchorMenuItem(item, index, hasCheckmarks, hasIcons);
        }
        return this._renderButtonItem(item, index, hasCheckmarks, hasIcons);
    };
    ContextualMenu.prototype._renderHeaderMenuItem = function (item, index, hasCheckmarks, hasIcons) {
        return (React.createElement("div", { className: Utilities_1.css('ms-ContextualMenu-header', styles.header), style: item.style }, this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons)));
    };
    ContextualMenu.prototype._renderAnchorMenuItem = function (item, index, hasCheckmarks, hasIcons) {
        return (React.createElement("div", null,
            React.createElement("a", __assign({}, Utilities_1.getNativeProps(item, Utilities_1.anchorProperties), { href: item.href, className: Utilities_1.css('ms-ContextualMenu-link', styles.link, (item.isDisabled || item.disabled) && 'is-disabled'), style: item.style, onClick: this._onAnchorClick.bind(this, item) }), this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons))));
    };
    ContextualMenu.prototype._renderButtonItem = function (item, index, hasCheckmarks, hasIcons) {
        var _this = this;
        var _a = this.state, expandedMenuItemKey = _a.expandedMenuItemKey, subMenuId = _a.subMenuId;
        var ariaLabel = '';
        if (item.ariaLabel) {
            ariaLabel = item.ariaLabel;
        }
        else if (item.name) {
            ariaLabel = item.name;
        }
        var itemButtonProperties = {
            className: Utilities_1.css('ms-ContextualMenu-link', styles.link, (_b = {},
                _b['is-expanded ' + styles.isExpanded] = (expandedMenuItemKey === item.key),
                _b)),
            onClick: this._onItemClick.bind(this, item),
            onKeyDown: hasSubmenuItems(item) ? this._onItemKeyDown.bind(this, item) : null,
            onMouseEnter: this._onItemMouseEnter.bind(this, item),
            onMouseLeave: this._onMouseLeave,
            onMouseDown: function (ev) { return _this._onItemMouseDown(item, ev); },
            disabled: item.isDisabled || item.disabled,
            href: item.href,
            title: item.title,
            'aria-label': ariaLabel,
            'aria-haspopup': hasSubmenuItems(item) ? true : null,
            'aria-owns': item.key === expandedMenuItemKey ? subMenuId : null,
            style: item.style,
        };
        return React.createElement('button', Utilities_1.assign({}, Utilities_1.getNativeProps(item, Utilities_1.buttonProperties), itemButtonProperties), this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons));
        var _b;
    };
    ContextualMenu.prototype._renderMenuItemChildren = function (item, index, hasCheckmarks, hasIcons) {
        var isItemChecked = item.isChecked || item.checked;
        return (React.createElement("div", { className: Utilities_1.css('ms-ContextualMenu-linkContent', styles.linkContent) },
            (hasCheckmarks) ? (React.createElement(Icon_1.Icon, { iconName: isItemChecked ? 'CheckMark' : 'CustomIcon', className: Utilities_1.css('ms-ContextualMenu-icon', styles.icon), onClick: this._onItemClick.bind(this, item) })) : (null),
            (hasIcons) ? (this._renderIcon(item)) : (null),
            React.createElement("span", { className: Utilities_1.css('ms-ContextualMenu-itemText', styles.itemText) }, item.name),
            hasSubmenuItems(item) ? (React.createElement(Icon_1.Icon, __assign({ iconName: Utilities_1.getRTL() ? 'ChevronLeft' : 'ChevronRight' }, item.submenuIconProps, { className: Utilities_1.css('ms-ContextualMenu-submenuIcon', styles.submenuIcon, item.submenuIconProps ? item.submenuIconProps.className : '') }))) : (null)));
    };
    ContextualMenu.prototype._renderIcon = function (item) {
        // Only present to allow continued use of item.icon which is deprecated.
        var iconProps = item.iconProps ? item.iconProps : {
            iconName: 'CustomIcon',
            className: item.icon ? 'ms-Icon--' + item.icon : ''
        };
        // Use the default icon color for the known icon names
        var iconColorClassName = iconProps.iconName === 'None' ? '' : ('ms-ContextualMenu-iconColor ' + styles.iconColor);
        var iconClassName = Utilities_1.css('ms-ContextualMenu-icon', styles.icon, iconColorClassName, iconProps.className);
        return React.createElement(Icon_1.Icon, __assign({}, iconProps, { className: iconClassName }));
    };
    ContextualMenu.prototype._onKeyDown = function (ev) {
        var submenuCloseKey = Utilities_1.getRTL() ? Utilities_1.KeyCodes.right : Utilities_1.KeyCodes.left;
        if (ev.which === Utilities_1.KeyCodes.escape
            || ev.which === Utilities_1.KeyCodes.tab
            || (ev.which === submenuCloseKey && this.props.isSubMenu && this.props.arrowDirection === FocusZone_1.FocusZoneDirection.vertical)) {
            // When a user presses escape, we will try to refocus the previous focused element.
            this._isFocusingPreviousElement = true;
            ev.preventDefault();
            ev.stopPropagation();
            this.dismiss(ev);
        }
    };
    ContextualMenu.prototype._onItemMouseEnter = function (item, ev) {
        var _this = this;
        var targetElement = ev.currentTarget;
        if (item.key !== this.state.expandedMenuItemKey) {
            if (hasSubmenuItems(item)) {
                this._enterTimerId = this._async.setTimeout(function () { return _this._onItemSubMenuExpand(item, targetElement); }, 500);
            }
            else {
                this._enterTimerId = this._async.setTimeout(function () { return _this._onSubMenuDismiss(ev); }, 500);
            }
        }
    };
    ContextualMenu.prototype._onMouseLeave = function (ev) {
        this._async.clearTimeout(this._enterTimerId);
    };
    ContextualMenu.prototype._onItemMouseDown = function (item, ev) {
        if (item.onMouseDown) {
            item.onMouseDown(item, ev);
        }
    };
    ContextualMenu.prototype._onItemClick = function (item, ev) {
        var items = getSubmenuItems(item);
        if (!items || !items.length) {
            this._executeItemClick(item, ev);
        }
        else {
            if (item.key === this.state.expandedMenuItemKey) {
                this._onSubMenuDismiss(ev);
            }
            else {
                this._onItemSubMenuExpand(item, ev.currentTarget);
            }
        }
        ev.stopPropagation();
        ev.preventDefault();
    };
    ContextualMenu.prototype._onAnchorClick = function (item, ev) {
        this._executeItemClick(item, ev);
        ev.stopPropagation();
    };
    ContextualMenu.prototype._executeItemClick = function (item, ev) {
        if (item.onClick) {
            item.onClick(ev, item);
        }
        else if (this.props.onItemClick) {
            this.props.onItemClick(ev, item);
        }
        this.dismiss(ev, true);
    };
    ContextualMenu.prototype._onItemKeyDown = function (item, ev) {
        var openKey = Utilities_1.getRTL() ? Utilities_1.KeyCodes.left : Utilities_1.KeyCodes.right;
        if (ev.which === openKey) {
            this._onItemSubMenuExpand(item, ev.currentTarget);
            ev.preventDefault();
        }
    };
    ContextualMenu.prototype._onItemSubMenuExpand = function (item, target) {
        if (this.state.expandedMenuItemKey !== item.key) {
            if (this.state.submenuProps) {
                this._onSubMenuDismiss();
            }
            var submenuProps = {
                items: getSubmenuItems(item),
                target: target,
                onDismiss: this._onSubMenuDismiss,
                isSubMenu: true,
                id: this.state.subMenuId,
                shouldFocusOnMount: true,
                directionalHint: Utilities_1.getRTL() ? DirectionalHint_1.DirectionalHint.leftTopEdge : DirectionalHint_1.DirectionalHint.rightTopEdge,
                className: this.props.className,
                gapSpace: 0
            };
            if (item.subMenuProps) {
                Utilities_1.assign(submenuProps, item.subMenuProps);
            }
            this.setState({
                expandedMenuItemKey: item.key,
                submenuProps: submenuProps,
            });
        }
    };
    ContextualMenu.prototype._onSubMenuDismiss = function (ev, dismissAll) {
        if (dismissAll) {
            this.dismiss(ev, dismissAll);
        }
        else {
            this.setState({
                dismissedMenuItemKey: this.state.expandedMenuItemKey,
                expandedMenuItemKey: null,
                submenuProps: null
            });
        }
    };
    ContextualMenu.prototype._setTargetWindowAndElement = function (target) {
        if (target) {
            if (typeof target === 'string') {
                var currentDoc = Utilities_1.getDocument();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = Utilities_1.getWindow();
            }
            else if (target.stopPropagation) {
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(target.toElement);
            }
            else {
                var targetElement = target;
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(targetElement);
            }
        }
        else {
            this._targetWindow = Utilities_1.getWindow();
        }
    };
    return ContextualMenu;
}(Utilities_1.BaseComponent));
// The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
ContextualMenu.defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    gapSpace: 0,
    directionalHint: DirectionalHint_1.DirectionalHint.bottomAutoEdge,
    beakWidth: 16,
    arrowDirection: FocusZone_1.FocusZoneDirection.vertical,
};
__decorate([
    Utilities_1.autobind
], ContextualMenu.prototype, "dismiss", null);
__decorate([
    Utilities_1.autobind
], ContextualMenu.prototype, "_onKeyDown", null);
__decorate([
    Utilities_1.autobind
], ContextualMenu.prototype, "_onMouseLeave", null);
__decorate([
    Utilities_1.autobind
], ContextualMenu.prototype, "_onSubMenuDismiss", null);
exports.ContextualMenu = ContextualMenu;



/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_6f089811',
    list: 'list_6f089811',
    item: 'item_6f089811',
    link: 'link_6f089811',
    isDisabled: 'isDisabled_6f089811',
    icon: 'icon_6f089811',
    isExpanded: 'isExpanded_6f089811',
    header: 'header_6f089811',
    linkContent: 'linkContent_6f089811',
    divider: 'divider_6f089811',
    iconColor: 'iconColor_6f089811',
    itemText: 'itemText_6f089811',
    submenuIcon: 'submenuIcon_6f089811',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_6f089811{background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";min-width:180px}.list_6f089811{list-style-type:none;margin:0;padding:0;line-height:0}.item_6f089811{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";height:36px;position:relative;box-sizing:border-box}.link_6f089811{font:inherit;color:inherit;background:0 0;border:none;width:100%;height:36px;line-height:36px;display:block;cursor:pointer;padding:0 6px}.link_6f089811::-moz-focus-inner{border:0}.link_6f089811{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .link_6f089811:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}html[dir=ltr] .link_6f089811{text-align:left}html[dir=rtl] .link_6f089811{text-align:right}.link_6f089811:hover:not([disabled]){background:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": "}.link_6f089811.isDisabled_6f089811,.link_6f089811[disabled]{color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": ";cursor:default;pointer-events:none}.link_6f089811.isDisabled_6f089811 .icon_6f089811,.link_6f089811[disabled] .icon_6f089811{color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": "}.is-focusVisible .link_6f089811:focus{background:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": "}.link_6f089811.isExpanded_6f089811,.link_6f089811.isExpanded_6f089811:hover{background:" }, { "theme": "neutralQuaternaryAlt", "defaultValue": "#dadada" }, { "rawString": ";color:" }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": ";font-weight:600}.header_6f089811{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:12px;font-weight:400;font-weight:600;color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";background:0 0;border:none;height:36px;line-height:36px;cursor:default;padding:0 6px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.header_6f089811::-moz-focus-inner{border:0}.header_6f089811{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .header_6f089811:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}html[dir=ltr] .header_6f089811{text-align:left}html[dir=rtl] .header_6f089811{text-align:right}a.link_6f089811{padding:0 6px;text-rendering:auto;color:inherit;letter-spacing:normal;word-spacing:normal;text-transform:none;text-indent:0;text-shadow:none;text-decoration:none;box-sizing:border-box}.linkContent_6f089811{white-space:nowrap;height:inherit;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;max-width:100%}.divider_6f089811{display:block;height:1px;background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";position:relative}.icon_6f089811{display:inline-block;min-height:1px;max-height:36px;width:14px;margin:0 4px;vertical-align:middle;-ms-flex-negative:0;flex-shrink:0}.iconColor_6f089811{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.itemText_6f089811{margin:0 4px;vertical-align:middle;display:inline-block;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.submenuIcon_6f089811{height:36px;line-height:36px;text-align:center;font-size:10px;display:inline-block;vertical-align:middle;-ms-flex-negative:0;flex-shrink:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(172));
__export(__webpack_require__(68));



/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var DetailsList_Props_1 = __webpack_require__(20);
var FocusZone_1 = __webpack_require__(8);
var Check_1 = __webpack_require__(34);
var Icon_1 = __webpack_require__(17);
var Layer_1 = __webpack_require__(59);
var GroupSpacer_1 = __webpack_require__(21);
var interfaces_1 = __webpack_require__(13);
var stylesImport = __webpack_require__(176);
var styles = stylesImport;
var MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
var MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button
var INNER_PADDING = 16;
var SelectAllVisibility;
(function (SelectAllVisibility) {
    SelectAllVisibility[SelectAllVisibility["none"] = 0] = "none";
    SelectAllVisibility[SelectAllVisibility["hidden"] = 1] = "hidden";
    SelectAllVisibility[SelectAllVisibility["visible"] = 2] = "visible";
})(SelectAllVisibility = exports.SelectAllVisibility || (exports.SelectAllVisibility = {}));
var DetailsHeader = (function (_super) {
    __extends(DetailsHeader, _super);
    function DetailsHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            columnResizeDetails: null,
            groupNestingDepth: _this.props.groupNestingDepth,
            isAllCollapsed: _this.props.isAllCollapsed
        };
        _this._onToggleCollapseAll = _this._onToggleCollapseAll.bind(_this);
        _this._onSelectAllClicked = _this._onSelectAllClicked.bind(_this);
        return _this;
    }
    DetailsHeader.prototype.componentDidMount = function () {
        var selection = this.props.selection;
        this._events.on(selection, interfaces_1.SELECTION_CHANGE, this._onSelectionChanged);
        // We need to use native on this to avoid MarqueeSelection from handling the event before us.
        this._events.on(this.refs.root, 'mousedown', this._onRootMouseDown);
    };
    DetailsHeader.prototype.componentWillReceiveProps = function (newProps) {
        var groupNestingDepth = this.state.groupNestingDepth;
        if (newProps.groupNestingDepth !== groupNestingDepth) {
            this.setState({ groupNestingDepth: newProps.groupNestingDepth });
        }
    };
    DetailsHeader.prototype.render = function () {
        var _this = this;
        var _a = this.props, columns = _a.columns, ariaLabel = _a.ariaLabel, ariaLabelForSelectAllCheckbox = _a.ariaLabelForSelectAllCheckbox, selectAllVisibility = _a.selectAllVisibility;
        var _b = this.state, isAllSelected = _b.isAllSelected, columnResizeDetails = _b.columnResizeDetails, isSizing = _b.isSizing, groupNestingDepth = _b.groupNestingDepth, isAllCollapsed = _b.isAllCollapsed;
        return (React.createElement("div", { role: 'row', "aria-label": ariaLabel, className: Utilities_1.css('ms-DetailsHeader', styles.root, (_c = {},
                _c['is-allSelected ' + styles.rootIsAllSelected] = isAllSelected,
                _c['is-selectAllHidden ' + styles.rootIsSelectAllHidden] = selectAllVisibility === SelectAllVisibility.hidden,
                _c['is-resizingColumn'] = !!columnResizeDetails && isSizing,
                _c)), ref: 'root', onMouseMove: this._onRootMouseMove, "data-automationid": 'DetailsHeader' },
            React.createElement(FocusZone_1.FocusZone, { ref: 'focusZone', direction: FocusZone_1.FocusZoneDirection.horizontal },
                (selectAllVisibility !== SelectAllVisibility.none) ? (React.createElement("div", { className: Utilities_1.css('ms-DetailsHeader-cellWrapper', styles.cellWrapper), role: 'columnheader' },
                    React.createElement("button", { type: 'button', className: Utilities_1.css('ms-DetailsHeader-cell is-check', styles.cell, styles.cellIsCheck), onClick: this._onSelectAllClicked, "aria-label": ariaLabelForSelectAllCheckbox, "aria-pressed": isAllSelected },
                        React.createElement(Check_1.Check, { checked: isAllSelected })))) : null,
                groupNestingDepth > 0 ? (React.createElement("button", { type: 'button', className: Utilities_1.css('ms-DetailsHeader-cell', styles.cell), onClick: this._onToggleCollapseAll },
                    React.createElement(Icon_1.Icon, { className: Utilities_1.css('ms-DetailsHeader-collapseButton', styles.collapseButton, isAllCollapsed && ('is-collapsed ' + styles.collapseButtonIsCollapsed)), iconName: 'ChevronDown' }))) : (null),
                GroupSpacer_1.GroupSpacer({ count: groupNestingDepth - 1 }),
                columns.map(function (column, columnIndex) {
                    return (React.createElement("div", { key: column.key, className: Utilities_1.css('ms-DetailsHeader-cellWrapper', styles.cellWrapper), role: 'columnheader', "aria-sort": column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none' },
                        React.createElement("button", { type: 'button', key: column.fieldName, disabled: column.columnActionsMode === DetailsList_Props_1.ColumnActionsMode.disabled, className: Utilities_1.css('ms-DetailsHeader-cell', styles.cell, column.headerClassName, (_a = {},
                                _a['is-actionable ' + styles.cellIsActionable] = column.columnActionsMode !== DetailsList_Props_1.ColumnActionsMode.disabled,
                                _a['is-empty ' + styles.cellIsEmpty] = !column.name,
                                _a['is-icon-visible'] = column.isSorted || column.isGrouped || column.isFiltered,
                                _a)), style: { width: column.calculatedWidth + INNER_PADDING }, onClick: _this._onColumnClick.bind(_this, column), onContextMenu: _this._onColumnContextMenu.bind(_this, column), "aria-haspopup": column.columnActionsMode === DetailsList_Props_1.ColumnActionsMode.hasDropdown, "aria-label": column.ariaLabel || column.name, "data-automationid": 'ColumnsHeaderColumn', "data-item-key": column.key },
                            column.isFiltered && (React.createElement(Icon_1.Icon, { className: styles.nearIcon, iconName: 'Filter' })),
                            column.isSorted && (React.createElement(Icon_1.Icon, { className: styles.nearIcon, iconName: column.isSortedDescending ? 'SortDown' : 'SortUp' })),
                            column.isGrouped && (React.createElement(Icon_1.Icon, { className: styles.nearIcon, iconName: 'GroupedDescending' })),
                            column.iconClassName && (React.createElement(Icon_1.Icon, { className: Utilities_1.css(styles.nearIcon, column.iconClassName), iconName: column.iconName })),
                            column.name,
                            column.columnActionsMode === DetailsList_Props_1.ColumnActionsMode.hasDropdown && (React.createElement(Icon_1.Icon, { className: Utilities_1.css('ms-DetailsHeader-filterChevron', styles.filterChevron), iconName: 'ChevronDown' }))),
                        (column.isResizable) && (React.createElement("div", { "data-sizer-index": columnIndex, className: Utilities_1.css('ms-DetailsHeader-cell is-sizer', styles.cell, styles.cellIsSizer, (_b = {},
                                _b['is-resizing ' + styles.cellIsResizing] = isSizing && columnResizeDetails.columnIndex === columnIndex,
                                _b)), onDoubleClick: _this._onSizerDoubleClick.bind(_this, columnIndex) }))));
                    var _a, _b;
                })),
            isSizing && (React.createElement(Layer_1.Layer, null,
                React.createElement("div", { className: Utilities_1.css(isSizing && styles.sizingOverlay), onMouseMove: this._onSizerMouseMove, onMouseUp: this._onSizerMouseUp })))));
        var _c;
    };
    /** Set focus to the active thing in the focus area. */
    DetailsHeader.prototype.focus = function () {
        return this.refs.focusZone.focus();
    };
    /**
     * double click on the column sizer will auto ajust column width
     * to fit the longest content among current rendered rows.
     *
     * @private
     * @param {number} columnIndex (index of the column user double clicked)
     * @param {React.MouseEvent} ev (mouse double click event)
     */
    DetailsHeader.prototype._onSizerDoubleClick = function (columnIndex, ev) {
        var _a = this.props, onColumnAutoResized = _a.onColumnAutoResized, columns = _a.columns;
        if (onColumnAutoResized) {
            onColumnAutoResized(columns[columnIndex], columnIndex);
        }
    };
    /**
     * Called when the select all toggle is clicked.
     */
    DetailsHeader.prototype._onSelectAllClicked = function () {
        var selection = this.props.selection;
        selection.toggleAllSelected();
    };
    DetailsHeader.prototype._onRootMouseDown = function (ev) {
        var columnIndexAttr = ev.target.getAttribute('data-sizer-index');
        var columnIndex = Number(columnIndexAttr);
        var columns = this.props.columns;
        if (columnIndexAttr === null || ev.button !== MOUSEDOWN_PRIMARY_BUTTON) {
            // Ignore anything except the primary button.
            return;
        }
        this.setState({
            columnResizeDetails: {
                columnIndex: columnIndex,
                columnMinWidth: columns[columnIndex].calculatedWidth,
                originX: ev.clientX
            }
        });
        ev.preventDefault();
        ev.stopPropagation();
    };
    DetailsHeader.prototype._onRootMouseMove = function (ev) {
        var _a = this.state, columnResizeDetails = _a.columnResizeDetails, isSizing = _a.isSizing;
        if (columnResizeDetails && !isSizing && ev.clientX !== columnResizeDetails.originX) {
            this.setState({ isSizing: true });
        }
    };
    /**
     * mouse move event handler in the header
     * it will set isSizing state to true when user clicked on the sizer and move the mouse.
     *
     * @private
     * @param {React.MouseEvent} ev (mouse move event)
     */
    DetailsHeader.prototype._onSizerMouseMove = function (ev) {
        var 
        // use buttons property here since ev.button in some edge case is not upding well during the move.
        // but firefox doesn't support it, so we set the default value when it is not defined.
        buttons = ev.buttons;
        var _a = this.props, onColumnIsSizingChanged = _a.onColumnIsSizingChanged, onColumnResized = _a.onColumnResized, columns = _a.columns;
        var columnResizeDetails = this.state.columnResizeDetails;
        if (buttons !== undefined && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
            // cancel mouse down event and return early when the primary button is not pressed
            this._onSizerMouseUp(ev);
            return;
        }
        if (ev.clientX !== columnResizeDetails.originX) {
            if (onColumnIsSizingChanged) {
                onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], true);
            }
        }
        if (onColumnResized) {
            var movement = ev.clientX - columnResizeDetails.originX;
            if (Utilities_1.getRTL()) {
                movement = -movement;
            }
            onColumnResized(columns[columnResizeDetails.columnIndex], columnResizeDetails.columnMinWidth + movement);
        }
    };
    /**
     * mouse up event handler in the header
     * clear the resize related state.
     * This is to ensure we can catch double click event
     *
     * @private
     * @param {React.MouseEvent} ev (mouse up event)
     */
    DetailsHeader.prototype._onSizerMouseUp = function (ev) {
        var _a = this.props, columns = _a.columns, onColumnIsSizingChanged = _a.onColumnIsSizingChanged;
        var columnResizeDetails = this.state.columnResizeDetails;
        this.setState({
            columnResizeDetails: null,
            isSizing: false
        });
        if (onColumnIsSizingChanged) {
            onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], false);
        }
    };
    DetailsHeader.prototype._onSelectionChanged = function () {
        var isAllSelected = this.props.selection.isAllSelected();
        if (this.state.isAllSelected !== isAllSelected) {
            this.setState({
                isAllSelected: isAllSelected
            });
        }
    };
    DetailsHeader.prototype._onColumnClick = function (column, ev) {
        var onColumnClick = this.props.onColumnClick;
        if (column.onColumnClick) {
            column.onColumnClick(ev, column);
        }
        if (onColumnClick) {
            onColumnClick(ev, column);
        }
    };
    DetailsHeader.prototype._onColumnContextMenu = function (column, ev) {
        var onColumnContextMenu = this.props.onColumnContextMenu;
        if (column.onContextMenu) {
            column.onColumnContextMenu(column, ev);
        }
        if (onColumnContextMenu) {
            onColumnContextMenu(column, ev);
        }
    };
    DetailsHeader.prototype._onToggleCollapseAll = function () {
        var onToggleCollapseAll = this.props.onToggleCollapseAll;
        var newCollapsed = !this.state.isAllCollapsed;
        this.setState({
            isAllCollapsed: newCollapsed
        });
        if (onToggleCollapseAll) {
            onToggleCollapseAll(newCollapsed);
        }
    };
    return DetailsHeader;
}(Utilities_1.BaseComponent));
DetailsHeader.defaultProps = {
    isSelectAllVisible: SelectAllVisibility.visible
};
__decorate([
    Utilities_1.autobind
], DetailsHeader.prototype, "_onSelectAllClicked", null);
__decorate([
    Utilities_1.autobind
], DetailsHeader.prototype, "_onRootMouseDown", null);
__decorate([
    Utilities_1.autobind
], DetailsHeader.prototype, "_onRootMouseMove", null);
__decorate([
    Utilities_1.autobind
], DetailsHeader.prototype, "_onSizerMouseMove", null);
__decorate([
    Utilities_1.autobind
], DetailsHeader.prototype, "_onSizerMouseUp", null);
exports.DetailsHeader = DetailsHeader;



/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_c00c6200',
    rootIsSelectAllHidden: 'rootIsSelectAllHidden_c00c6200',
    cell: 'cell_c00c6200',
    cellIsCheck: 'cellIsCheck_c00c6200',
    rootIsAllSelected: 'rootIsAllSelected_c00c6200',
    cellWrapper: 'cellWrapper_c00c6200',
    cellIsActionable: 'cellIsActionable_c00c6200',
    cellIsSizer: 'cellIsSizer_c00c6200',
    cellIsEmpty: 'cellIsEmpty_c00c6200',
    cellIsResizing: 'cellIsResizing_c00c6200',
    collapseButton: 'collapseButton_c00c6200',
    collapseButtonIsCollapsed: 'collapseButtonIsCollapsed_c00c6200',
    nearIcon: 'nearIcon_c00c6200',
    filterChevron: 'filterChevron_c00c6200',
    sizingOverlay: 'sizingOverlay_c00c6200',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_c00c6200{display:inline-block;min-width:100%;vertical-align:top;height:36px;line-height:36px;white-space:nowrap;padding-bottom:1px;border-bottom:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.root_c00c6200.rootIsSelectAllHidden_c00c6200 .cell_c00c6200.cellIsCheck_c00c6200{visibility:hidden}.cell_c00c6200.cellIsCheck_c00c6200 .ms-Check-background{opacity:0}.cell_c00c6200.cellIsCheck_c00c6200:hover .ms-Check-background,.root_c00c6200.rootIsAllSelected_c00c6200 .ms-Check-background{opacity:1}.cellWrapper_c00c6200{display:inline-block;position:relative}.cell_c00c6200{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:12px;font-weight:400;background:0 0;color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": ";font-weight:400;position:relative;display:inline-block;box-sizing:border-box;padding:0 8px;border:none;line-height:inherit;margin:0;height:36px;vertical-align:top;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.cell_c00c6200::-moz-focus-inner{border:0}.cell_c00c6200{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .cell_c00c6200:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}html[dir=ltr] .cell_c00c6200{text-align:left}html[dir=rtl] .cell_c00c6200{text-align:right}html[dir=ltr] .cell_c00c6200{text-align:left}html[dir=rtl] .cell_c00c6200{text-align:right}.cell_c00c6200.cellIsCheck_c00c6200{position:relative;padding:6px;margin:0}.cell_c00c6200.cellIsActionable_c00c6200{color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.cell_c00c6200.cellIsActionable_c00c6200:hover{color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";background:" }, { "theme": "neutralLighterAlt", "defaultValue": "#f8f8f8" }, { "rawString": "}.cell_c00c6200.cellIsActionable_c00c6200:active{background:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.cell_c00c6200.cellIsSizer_c00c6200{position:absolute;width:16px;cursor:ew-resize;bottom:0;top:0;height:inherit;background:0 0}html[dir=ltr] .cell_c00c6200.cellIsSizer_c00c6200{margin-left:-10px}html[dir=rtl] .cell_c00c6200.cellIsSizer_c00c6200{margin-right:-10px}.cell_c00c6200.cellIsEmpty_c00c6200{text-overflow:clip}.cell_c00c6200.cellIsSizer_c00c6200:after{content:'';position:absolute;left:50%;top:0;bottom:0;width:1px;background:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": ";opacity:0}.cell_c00c6200.cellIsSizer_c00c6200.cellIsResizing_c00c6200:after,.cell_c00c6200.cellIsSizer_c00c6200:hover:after{opacity:1;transition:opacity .3s linear}.collapseButton_c00c6200{text-align:center;-webkit-transform:rotate(-180deg);transform:rotate(-180deg);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transition:-webkit-transform .1s linear;transition:transform .1s linear;transition:transform .1s linear,-webkit-transform .1s linear;width:20px;outline:0}.collapseButton_c00c6200.collapseButtonIsCollapsed_c00c6200{-webkit-transform:rotate(0);transform:rotate(0)}.cell_c00c6200 .nearIcon_c00c6200{color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";opacity:1}html[dir=ltr] .cell_c00c6200 .nearIcon_c00c6200{padding-right:4px}html[dir=rtl] .cell_c00c6200 .nearIcon_c00c6200{padding-left:4px}.cell_c00c6200 .filterChevron_c00c6200{color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";vertical-align:middle}html[dir=ltr] .cell_c00c6200 .filterChevron_c00c6200{padding-left:4px}html[dir=rtl] .cell_c00c6200 .filterChevron_c00c6200{padding-right:4px}.sizingOverlay_c00c6200{position:absolute;left:0;top:0;right:0;bottom:0;cursor:ew-resize;background:rgba(255,255,255,0)}html[dir=ltr] .cell_c00c6200 .collapseButton_c00c6200{padding-right:0}html[dir=rtl] .cell_c00c6200 .collapseButton_c00c6200{padding-left:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var DetailsList_Props_1 = __webpack_require__(20);
var DetailsHeader_1 = __webpack_require__(175);
var DetailsRow_1 = __webpack_require__(69);
var FocusZone_1 = __webpack_require__(8);
var GroupedList_1 = __webpack_require__(146);
var List_1 = __webpack_require__(36);
var withViewport_1 = __webpack_require__(232);
var index_1 = __webpack_require__(12);
var DragDropHelper_1 = __webpack_require__(233);
var stylesImport = __webpack_require__(178);
var styles = stylesImport;
var MIN_COLUMN_WIDTH = 100; // this is the global min width
var CHECKBOX_WIDTH = 36;
var GROUP_EXPAND_WIDTH = 36;
var DEFAULT_INNER_PADDING = 16;
var DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
var DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
var DetailsList = (function (_super) {
    __extends(DetailsList, _super);
    function DetailsList(props) {
        var _this = _super.call(this, props) || this;
        _this._activeRows = {};
        _this._columnOverrides = {};
        _this._onColumnIsSizingChanged = _this._onColumnIsSizingChanged.bind(_this);
        _this._onColumnResized = _this._onColumnResized.bind(_this);
        _this._onColumnAutoResized = _this._onColumnAutoResized.bind(_this);
        _this._onRowDidMount = _this._onRowDidMount.bind(_this);
        _this._onRowWillUnmount = _this._onRowWillUnmount.bind(_this);
        _this._onToggleCollapse = _this._onToggleCollapse.bind(_this);
        _this._onActiveRowChanged = _this._onActiveRowChanged.bind(_this);
        _this._onHeaderKeyDown = _this._onHeaderKeyDown.bind(_this);
        _this._onContentKeyDown = _this._onContentKeyDown.bind(_this);
        _this._onRenderCell = _this._onRenderCell.bind(_this);
        _this._onGroupExpandStateChanged = _this._onGroupExpandStateChanged.bind(_this);
        _this.state = {
            lastWidth: 0,
            adjustedColumns: _this._getAdjustedColumns(props),
            layoutMode: props.layoutMode,
            isSizing: false,
            isDropping: false,
            isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
            isSomeGroupExpanded: props.groupProps && !props.groupProps.isAllGroupsCollapsed
        };
        _this._selection = props.selection || new index_1.Selection({ onSelectionChanged: null, getKey: props.getKey });
        _this._selection.setItems(props.items, false);
        _this._dragDropHelper = props.dragDropEvents ? new DragDropHelper_1.DragDropHelper({
            selection: _this._selection,
            minimumPixelsForDrag: props.minimumPixelsForDrag
        }) : null;
        _this._initialFocusedIndex = props.initialFocusedIndex;
        return _this;
    }
    DetailsList.prototype.componentWillUnmount = function () {
        if (this._dragDropHelper) {
            this._dragDropHelper.dispose();
        }
    };
    DetailsList.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.onDidUpdate) {
            this.props.onDidUpdate(this);
        }
    };
    DetailsList.prototype.componentWillReceiveProps = function (newProps) {
        var _a = this.props, checkboxVisibility = _a.checkboxVisibility, items = _a.items, setKey = _a.setKey, selectionMode = _a.selectionMode, columns = _a.columns, viewport = _a.viewport;
        var layoutMode = this.state.layoutMode;
        var shouldResetSelection = (newProps.setKey !== setKey) || newProps.setKey === undefined;
        var shouldForceUpdates = false;
        if (newProps.layoutMode !== this.props.layoutMode) {
            layoutMode = newProps.layoutMode;
            this.setState({ layoutMode: layoutMode });
            shouldForceUpdates = true;
        }
        if (shouldResetSelection) {
            this._initialFocusedIndex = newProps.initialFocusedIndex;
        }
        if (newProps.items !== items) {
            this._selection.setItems(newProps.items, shouldResetSelection);
        }
        if (newProps.checkboxVisibility !== checkboxVisibility ||
            newProps.columns !== columns ||
            newProps.viewport.width !== viewport.width) {
            shouldForceUpdates = true;
        }
        this._adjustColumns(newProps, true, layoutMode);
        if (newProps.selectionMode !== selectionMode) {
            shouldForceUpdates = true;
        }
        if (shouldForceUpdates) {
            this._forceListUpdates();
        }
    };
    DetailsList.prototype.render = function () {
        var _this = this;
        var _a = this.props, ariaLabelForListHeader = _a.ariaLabelForListHeader, ariaLabelForSelectAllCheckbox = _a.ariaLabelForSelectAllCheckbox, className = _a.className, checkboxVisibility = _a.checkboxVisibility, constrainMode = _a.constrainMode, dragDropEvents = _a.dragDropEvents, groups = _a.groups, groupProps = _a.groupProps, items = _a.items, isHeaderVisible = _a.isHeaderVisible, onItemInvoked = _a.onItemInvoked, onItemContextMenu = _a.onItemContextMenu, onColumnHeaderClick = _a.onColumnHeaderClick, onColumnHeaderContextMenu = _a.onColumnHeaderContextMenu, selectionMode = _a.selectionMode, selectionPreservedOnEmptyClick = _a.selectionPreservedOnEmptyClick, ariaLabel = _a.ariaLabel, ariaLabelForGrid = _a.ariaLabelForGrid, rowElementEventMap = _a.rowElementEventMap, _b = _a.shouldApplyApplicationRole, shouldApplyApplicationRole = _b === void 0 ? false : _b, getKey = _a.getKey;
        var _c = this.state, adjustedColumns = _c.adjustedColumns, isCollapsed = _c.isCollapsed, layoutMode = _c.layoutMode, isSizing = _c.isSizing, isSomeGroupExpanded = _c.isSomeGroupExpanded;
        var _d = this, selection = _d._selection, dragDropHelper = _d._dragDropHelper;
        var groupNestingDepth = this._getGroupNestingDepth();
        var additionalListProps = {
            renderedWindowsAhead: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD,
            renderedWindowsBehind: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND,
            getKey: getKey
        };
        var selectAllVisibility = DetailsHeader_1.SelectAllVisibility.none; // for SelectionMode.none
        if (selectionMode === index_1.SelectionMode.single) {
            selectAllVisibility = DetailsHeader_1.SelectAllVisibility.hidden;
        }
        if (selectionMode === index_1.SelectionMode.multiple) {
            // if isCollapsedGroupSelectVisible is false, disable select all when the list has all collapsed groups
            var isCollapsedGroupSelectVisible = groupProps && groupProps.headerProps && groupProps.headerProps.isCollapsedGroupSelectVisible;
            if (isCollapsedGroupSelectVisible === undefined) {
                isCollapsedGroupSelectVisible = true;
            }
            var isSelectAllVisible = isCollapsedGroupSelectVisible || !groups || isSomeGroupExpanded;
            selectAllVisibility = isSelectAllVisible ? DetailsHeader_1.SelectAllVisibility.visible : DetailsHeader_1.SelectAllVisibility.hidden;
        }
        if (checkboxVisibility === DetailsList_Props_1.CheckboxVisibility.hidden) {
            selectAllVisibility = DetailsHeader_1.SelectAllVisibility.none;
        }
        return (
        // If shouldApplyApplicationRole is true, role application will be applied to make arrow keys work
        // with JAWS.
        React.createElement("div", __assign({ ref: 'root', className: Utilities_1.css('ms-DetailsList', styles.root, className, (_e = {
                    'is-fixed': layoutMode === DetailsList_Props_1.DetailsListLayoutMode.fixedColumns
                },
                _e['is-horizontalConstrained ' + styles.rootIsHorizontalConstrained] = constrainMode === DetailsList_Props_1.ConstrainMode.horizontalConstrained,
                _e)), "data-automationid": 'DetailsList', "data-is-scrollable": 'false', "aria-label": ariaLabel }, (shouldApplyApplicationRole ? { role: 'application' } : {})),
            React.createElement("div", { role: 'grid', "aria-label": ariaLabelForGrid, "aria-rowcount": items ? items.length : 0, "aria-colcount": adjustedColumns ? adjustedColumns.length : 0 },
                React.createElement("div", { onKeyDown: this._onHeaderKeyDown, role: 'presentation' }, isHeaderVisible && (React.createElement(DetailsHeader_1.DetailsHeader, { ref: 'header', selectionMode: selectionMode, layoutMode: layoutMode, selection: selection, columns: adjustedColumns, onColumnClick: onColumnHeaderClick, onColumnContextMenu: onColumnHeaderContextMenu, onColumnResized: this._onColumnResized, onColumnIsSizingChanged: this._onColumnIsSizingChanged, onColumnAutoResized: this._onColumnAutoResized, groupNestingDepth: groupNestingDepth, isAllCollapsed: isCollapsed, onToggleCollapseAll: this._onToggleCollapse, ariaLabel: ariaLabelForListHeader, ariaLabelForSelectAllCheckbox: ariaLabelForSelectAllCheckbox, selectAllVisibility: selectAllVisibility }))),
                React.createElement("div", { ref: 'contentContainer', onKeyDown: this._onContentKeyDown, role: 'presentation' },
                    React.createElement(FocusZone_1.FocusZone, { ref: 'focusZone', className: styles.focusZone, direction: FocusZone_1.FocusZoneDirection.vertical, isInnerZoneKeystroke: function (ev) { return (ev.which === Utilities_1.getRTLSafeKeyCode(Utilities_1.KeyCodes.right)); }, onActiveElementChanged: this._onActiveRowChanged },
                        React.createElement(index_1.SelectionZone, { ref: 'selectionZone', selection: selection, selectionPreservedOnEmptyClick: selectionPreservedOnEmptyClick, selectionMode: selectionMode, onItemInvoked: onItemInvoked, onItemContextMenu: onItemContextMenu }, groups ? (React.createElement(GroupedList_1.GroupedList, { groups: groups, groupProps: groupProps, items: items, onRenderCell: this._onRenderCell, selection: selection, selectionMode: selectionMode, dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: rowElementEventMap, listProps: additionalListProps, onGroupExpandStateChanged: this._onGroupExpandStateChanged, ref: 'groupedList' })) : (React.createElement(List_1.List, __assign({ role: null, items: items, onRenderCell: function (item, itemIndex) { return _this._onRenderCell(0, item, itemIndex); } }, additionalListProps, { ref: 'list' })))))))));
        var _e;
    };
    DetailsList.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this._forceListUpdates();
    };
    DetailsList.prototype._onRenderRow = function (props, defaultRender) {
        return React.createElement(DetailsRow_1.DetailsRow, __assign({}, props));
    };
    DetailsList.prototype._onRenderCell = function (nestingDepth, item, index) {
        var _a = this.props, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.rowElementEventMap, onRenderMissingItem = _a.onRenderMissingItem, onRenderItemColumn = _a.onRenderItemColumn, _b = _a.onRenderRow, onRenderRow = _b === void 0 ? this._onRenderRow : _b, selectionMode = _a.selectionMode, viewport = _a.viewport, checkboxVisibility = _a.checkboxVisibility, getRowAriaLabel = _a.getRowAriaLabel, checkButtonAriaLabel = _a.checkButtonAriaLabel;
        var selection = this._selection;
        var dragDropHelper = this._dragDropHelper;
        var columns = this.state.adjustedColumns;
        if (!item) {
            if (onRenderMissingItem) {
                onRenderMissingItem(index);
            }
            return null;
        }
        return onRenderRow({
            item: item,
            itemIndex: index,
            columns: columns,
            groupNestingDepth: nestingDepth,
            selectionMode: selectionMode,
            selection: selection,
            onDidMount: this._onRowDidMount,
            onWillUnmount: this._onRowWillUnmount,
            onRenderItemColumn: onRenderItemColumn,
            eventsToRegister: eventsToRegister,
            dragDropEvents: dragDropEvents,
            dragDropHelper: dragDropHelper,
            viewport: viewport,
            checkboxVisibility: checkboxVisibility,
            getRowAriaLabel: getRowAriaLabel,
            checkButtonAriaLabel: checkButtonAriaLabel
        }, this._onRenderRow);
    };
    DetailsList.prototype._onGroupExpandStateChanged = function (isSomeGroupExpanded) {
        this.setState({ isSomeGroupExpanded: isSomeGroupExpanded });
    };
    DetailsList.prototype._onColumnIsSizingChanged = function (column, isSizing) {
        this.setState({ isSizing: isSizing });
    };
    DetailsList.prototype._onHeaderKeyDown = function (ev) {
        if (ev.which === Utilities_1.KeyCodes.down) {
            if (this.refs.focusZone && this.refs.focusZone.focus()) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    };
    DetailsList.prototype._onContentKeyDown = function (ev) {
        if (ev.which === Utilities_1.KeyCodes.up) {
            if (this.refs.header && this.refs.header.focus()) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    };
    DetailsList.prototype._getGroupNestingDepth = function () {
        var groups = this.props.groups;
        var level = 0;
        var groupsInLevel = groups;
        while (groupsInLevel && groupsInLevel.length > 0) {
            level++;
            groupsInLevel = groupsInLevel[0].children;
        }
        return level;
    };
    DetailsList.prototype._onRowDidMount = function (row) {
        var onRowDidMount = this.props.onRowDidMount;
        var index = row.props.itemIndex;
        this._activeRows[index] = row; // this is used for column auto resize
        // Set focus to the row if it should receive focus.
        if (this._initialFocusedIndex !== undefined && index === this._initialFocusedIndex) {
            if (this.refs.selectionZone) {
                this.refs.selectionZone.ignoreNextFocus();
            }
            this._async.setTimeout(function () { return row.focus(); }, 0);
            delete this._initialFocusedIndex;
        }
        if (onRowDidMount) {
            onRowDidMount(row.props.item, index);
        }
    };
    DetailsList.prototype._onRowWillUnmount = function (row) {
        var onRowWillUnmount = this.props.onRowWillUnmount;
        var index = row.props.itemIndex;
        delete this._activeRows[index];
        this._events.off(row.refs.root);
        if (onRowWillUnmount) {
            onRowWillUnmount(row.props.item, index);
        }
    };
    DetailsList.prototype._onToggleCollapse = function (collapsed) {
        this.setState({
            isCollapsed: collapsed
        });
        if (this.refs.groupedList) {
            this.refs.groupedList.toggleCollapseAll(collapsed);
        }
    };
    DetailsList.prototype._forceListUpdates = function () {
        if (this.refs.groupedList) {
            this.refs.groupedList.forceUpdate();
        }
        if (this.refs.list) {
            this.refs.list.forceUpdate();
        }
    };
    DetailsList.prototype._adjustColumns = function (newProps, forceUpdate, layoutMode) {
        var adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate, layoutMode);
        var viewportWidth = this.props.viewport.width;
        if (adjustedColumns) {
            this.setState({
                adjustedColumns: adjustedColumns,
                lastWidth: viewportWidth,
                layoutMode: layoutMode
            });
        }
    };
    /** Returns adjusted columns, given the viewport size and layout mode. */
    DetailsList.prototype._getAdjustedColumns = function (newProps, forceUpdate, layoutMode) {
        var _this = this;
        var newColumns = newProps.columns, newItems = newProps.items, viewportWidth = newProps.viewport.width, selectionMode = newProps.selectionMode;
        if (layoutMode === undefined) {
            layoutMode = newProps.layoutMode;
        }
        var columns = this.props ? this.props.columns : [];
        var lastWidth = this.state ? this.state.lastWidth : -1;
        var lastSelectionMode = this.state ? this.state.lastSelectionMode : undefined;
        if (viewportWidth !== undefined) {
            if (!forceUpdate &&
                lastWidth === viewportWidth &&
                lastSelectionMode === selectionMode &&
                (!columns || newColumns === columns)) {
                return;
            }
        }
        else {
            viewportWidth = this.props.viewport.width;
        }
        newColumns = newColumns || buildColumns(newItems, true);
        var adjustedColumns;
        if (layoutMode === DetailsList_Props_1.DetailsListLayoutMode.fixedColumns) {
            adjustedColumns = this._getFixedColumns(newColumns);
        }
        else {
            adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth, newProps);
        }
        // Preserve adjusted column calculated widths.
        adjustedColumns.forEach(function (column) {
            var overrides = _this._columnOverrides[column.key] = _this._columnOverrides[column.key] || {};
            overrides.calculatedWidth = column.calculatedWidth;
        });
        return adjustedColumns;
    };
    /** Builds a set of columns based on the given columns mixed with the current overrides. */
    DetailsList.prototype._getFixedColumns = function (newColumns) {
        var _this = this;
        return newColumns.map(function (column) {
            var newColumn = Utilities_1.assign({}, column, _this._columnOverrides[column.key]);
            if (!newColumn.calculatedWidth) {
                newColumn.calculatedWidth = newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH;
            }
            return newColumn;
        });
    };
    /** Builds a set of columns to fix within the viewport width. */
    DetailsList.prototype._getJustifiedColumns = function (newColumns, viewportWidth, props) {
        var selectionMode = props.selectionMode, groups = props.groups;
        var outerPadding = DEFAULT_INNER_PADDING;
        var rowCheckWidth = (selectionMode !== index_1.SelectionMode.none) ? CHECKBOX_WIDTH : 0;
        var groupExpandWidth = groups ? GROUP_EXPAND_WIDTH : 0;
        var totalWidth = 0; // offset because we have one less inner padding.
        var availableWidth = viewportWidth - (outerPadding + rowCheckWidth + groupExpandWidth);
        var adjustedColumns = newColumns.map(function (column, i) {
            var newColumn = Utilities_1.assign({}, column, {
                calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH
            });
            totalWidth += newColumn.calculatedWidth + (i > 0 ? DEFAULT_INNER_PADDING : 0);
            return newColumn;
        });
        var lastIndex = adjustedColumns.length - 1;
        // Remove collapsable columns.
        while (lastIndex > 1 && totalWidth > availableWidth) {
            var column = adjustedColumns[lastIndex];
            if (column.isCollapsable) {
                totalWidth -= column.calculatedWidth + DEFAULT_INNER_PADDING;
                adjustedColumns.splice(lastIndex, 1);
            }
            lastIndex--;
        }
        // Then expand columns starting at the beginning, until we've filled the width.
        for (var i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
            var column = adjustedColumns[i];
            var maxWidth = column.maxWidth;
            var minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH;
            var spaceLeft = availableWidth - totalWidth;
            var increment = maxWidth ? Math.min(spaceLeft, maxWidth - minWidth) : spaceLeft;
            // Add remaining space to the last column.
            if (i === (adjustedColumns.length - 1)) {
                increment = spaceLeft;
            }
            column.calculatedWidth += increment;
            totalWidth += increment;
        }
        // Mark the last column as not resizable to avoid extra scrolling issues.
        if (adjustedColumns.length) {
            adjustedColumns[adjustedColumns.length - 1].isResizable = false;
        }
        return adjustedColumns;
    };
    DetailsList.prototype._onColumnResized = function (resizingColumn, newWidth) {
        var newCalculatedWidth = Math.max(resizingColumn.minWidth || MIN_COLUMN_WIDTH, newWidth);
        if (this.props.onColumnResize) {
            this.props.onColumnResize(resizingColumn, newCalculatedWidth);
        }
        this._columnOverrides[resizingColumn.key].calculatedWidth = newCalculatedWidth;
        this._adjustColumns(this.props, true, DetailsList_Props_1.DetailsListLayoutMode.fixedColumns);
        this._forceListUpdates();
    };
    /**
     * Callback function when double clicked on the details header column resizer
     * which will measure the column cells of all the active rows and resize the
     * column to the max cell width.
     *
     * @private
     * @param {IColumn} column (double clicked column definition)
     * @param {number} columnIndex (double clicked column index)
     * @todo min width 100 should be changed to const value and should be consistent with the value used on _onSizerMove method in DetailsHeader
     */
    DetailsList.prototype._onColumnAutoResized = function (column, columnIndex) {
        var _this = this;
        var max = 0;
        var count = 0;
        var totalCount = Object.keys(this._activeRows).length;
        for (var key in this._activeRows) {
            if (this._activeRows.hasOwnProperty(key)) {
                var currentRow = this._activeRows[key];
                currentRow.measureCell(columnIndex, function (width) {
                    max = Math.max(max, width);
                    count++;
                    if (count === totalCount) {
                        _this._onColumnResized(column, max);
                    }
                });
            }
        }
    };
    /**
     * Call back function when an element in FocusZone becomes active. It will transalate it into item
     * and call onActiveItemChanged callback if specified.
     *
     * @private
     * @param {el} row element that became active in Focus Zone
     * @param {ev} focus event from Focus Zone
     */
    DetailsList.prototype._onActiveRowChanged = function (el, ev) {
        var _a = this.props, items = _a.items, onActiveItemChanged = _a.onActiveItemChanged;
        if (!onActiveItemChanged || !el) {
            return;
        }
        var index = Number(el.getAttribute('data-item-index'));
        if (index >= 0) {
            onActiveItemChanged(items[index], index, ev);
        }
    };
    ;
    return DetailsList;
}(Utilities_1.BaseComponent));
DetailsList.defaultProps = {
    layoutMode: DetailsList_Props_1.DetailsListLayoutMode.justified,
    selectionMode: index_1.SelectionMode.multiple,
    constrainMode: DetailsList_Props_1.ConstrainMode.horizontalConstrained,
    checkboxVisibility: DetailsList_Props_1.CheckboxVisibility.onHover,
    isHeaderVisible: true
};
__decorate([
    Utilities_1.autobind
], DetailsList.prototype, "_onRenderRow", null);
DetailsList = __decorate([
    withViewport_1.withViewport
], DetailsList);
exports.DetailsList = DetailsList;
function buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey, isMultiline) {
    var columns = [];
    if (items && items.length) {
        var firstItem = items[0];
        var isFirstColumn = true;
        for (var propName in firstItem) {
            if (firstItem.hasOwnProperty(propName)) {
                columns.push({
                    key: propName,
                    name: propName,
                    fieldName: propName,
                    minWidth: MIN_COLUMN_WIDTH,
                    maxWidth: 300,
                    isCollapsable: !!columns.length,
                    isMultiline: (isMultiline === undefined) ? false : isMultiline,
                    isSorted: sortedColumnKey === propName,
                    isSortedDescending: !!isSortedDescending,
                    isRowHeader: false,
                    columnActionsMode: DetailsList_Props_1.ColumnActionsMode.clickable,
                    isResizable: canResizeColumns,
                    onColumnClick: onColumnClick,
                    isGrouped: groupedColumnKey === propName
                });
                isFirstColumn = false;
            }
        }
    }
    return columns;
}
exports.buildColumns = buildColumns;



/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_74d92f13',
    focusZone: 'focusZone_74d92f13',
    rootIsHorizontalConstrained: 'rootIsHorizontalConstrained_74d92f13',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_74d92f13{position:relative;font-size:12px;background:0 0;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": "}.focusZone_74d92f13{display:inline-block;vertical-align:top;min-width:100%;min-height:1px}.rootIsHorizontalConstrained_74d92f13{overflow-x:auto;overflow-y:visible;-webkit-overflow-scrolling:touch}.root_74d92f13 .ms-List-cell{min-height:38px;word-break:break-word}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(37);
var styles = stylesImport;
var DetailsRowFields = (function (_super) {
    __extends(DetailsRowFields, _super);
    function DetailsRowFields(props) {
        var _this = _super.call(this) || this;
        _this.state = _this._getState(props);
        return _this;
    }
    DetailsRowFields.prototype.componentWillReceiveProps = function (newProps) {
        this.setState(this._getState(newProps));
    };
    DetailsRowFields.prototype.render = function () {
        var columns = this.props.columns;
        var cellContent = this.state.cellContent;
        return (React.createElement("div", { className: Utilities_1.css('ms-DetailsRow-fields', styles.fields), "data-automationid": 'DetailsRowFields' }, columns.map(function (column, columnIndex) {
            return (React.createElement("div", { key: columnIndex, role: column.isRowHeader ? 'rowheader' : 'gridcell', "aria-colindex": columnIndex, className: Utilities_1.css('ms-DetailsRow-cell', styles.cell, column.className, (_a = {
                        'is-multiline': column.isMultiline
                    },
                    _a[styles.isMultiline] = column.isMultiline,
                    _a)), style: { width: column.calculatedWidth }, "data-automationid": 'DetailsRowCell', "data-automation-key": column.key }, cellContent[columnIndex]));
            var _a;
        })));
    };
    DetailsRowFields.prototype._getState = function (props) {
        var _this = this;
        var item = props.item, itemIndex = props.itemIndex, onRenderItemColumn = props.onRenderItemColumn;
        return {
            cellContent: props.columns.map(function (column) {
                var cellContent;
                try {
                    var render = column.onRender || onRenderItemColumn;
                    cellContent = render ? render(item, itemIndex, column) : _this._getCellText(item, column);
                }
                catch (e) { }
                return cellContent;
            })
        };
    };
    DetailsRowFields.prototype._getCellText = function (item, column) {
        var value = (item && column && column.fieldName) ? item[column.fieldName] : '';
        if (value === null || value === undefined) {
            value = '';
        }
        return value;
    };
    return DetailsRowFields;
}(Utilities_1.BaseComponent));
exports.DetailsRowFields = DetailsRowFields;



/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(12));
__export(__webpack_require__(177));
__export(__webpack_require__(20));
__export(__webpack_require__(69));
__export(__webpack_require__(70));



/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var DIRECTIONAL_KEY_CODES = [
    Utilities_1.KeyCodes.up,
    Utilities_1.KeyCodes.down,
    Utilities_1.KeyCodes.left,
    Utilities_1.KeyCodes.right,
    Utilities_1.KeyCodes.home,
    Utilities_1.KeyCodes.end,
    Utilities_1.KeyCodes.tab,
    Utilities_1.KeyCodes.pageUp,
    Utilities_1.KeyCodes.pageDown
];
// We will track the last focus visibility state so that if we tear down and recreate
// the Fabric component, we will use the last known value as the default.
var _lastIsFocusVisible = false;
// Ensure that the HTML element has a dir specified. This helps to ensure RTL/LTR macros in css for all components will work.
if (typeof (document) === 'object' && document.documentElement && !document.documentElement.getAttribute('dir')) {
    document.documentElement.setAttribute('dir', 'ltr');
}
var Fabric = (function (_super) {
    __extends(Fabric, _super);
    function Fabric() {
        var _this = _super.call(this) || this;
        _this.state = {
            isFocusVisible: _lastIsFocusVisible
        };
        return _this;
    }
    Fabric.prototype.componentDidMount = function () {
        this._events.on(document.body, 'mousedown', this._onMouseDown, true);
        this._events.on(document.body, 'keydown', this._onKeyDown, true);
    };
    Fabric.prototype.render = function () {
        var isFocusVisible = this.state.isFocusVisible;
        var rootClass = Utilities_1.css('ms-Fabric ms-font-m', this.props.className, {
            'is-focusVisible': isFocusVisible
        });
        return (React.createElement("div", __assign({}, this.props, { className: rootClass, ref: 'root' })));
    };
    Fabric.prototype._onMouseDown = function () {
        if (this.state.isFocusVisible) {
            this.setState({
                isFocusVisible: false
            });
            _lastIsFocusVisible = false;
        }
    };
    Fabric.prototype._onKeyDown = function (ev) {
        if (!this.state.isFocusVisible && DIRECTIONAL_KEY_CODES.indexOf(ev.which) > -1) {
            this.setState({
                isFocusVisible: true
            });
            _lastIsFocusVisible = true;
        }
    };
    return Fabric;
}(Utilities_1.BaseComponent));
exports.Fabric = Fabric;



/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(181));



/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var FocusTrapZone = (function (_super) {
    __extends(FocusTrapZone, _super);
    function FocusTrapZone() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isInFocusStack = false;
        _this._isInClickStack = false;
        return _this;
    }
    FocusTrapZone.prototype.componentWillMount = function () {
        var _a = this.props, _b = _a.isClickableOutsideFocusTrap, isClickableOutsideFocusTrap = _b === void 0 ? false : _b, _c = _a.forceFocusInsideTrap, forceFocusInsideTrap = _c === void 0 ? true : _c;
        if (forceFocusInsideTrap) {
            this._isInFocusStack = true;
            FocusTrapZone._focusStack.push(this);
        }
        if (!isClickableOutsideFocusTrap) {
            this._isInClickStack = true;
            FocusTrapZone._clickStack.push(this);
        }
    };
    FocusTrapZone.prototype.componentDidMount = function () {
        var _a = this.props, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, _b = _a.isClickableOutsideFocusTrap, isClickableOutsideFocusTrap = _b === void 0 ? false : _b, _c = _a.forceFocusInsideTrap, forceFocusInsideTrap = _c === void 0 ? true : _c;
        this._previouslyFocusedElement = elementToFocusOnDismiss ? elementToFocusOnDismiss : document.activeElement;
        if (!Utilities_1.elementContains(this.refs.root, this._previouslyFocusedElement)) {
            this.focus();
        }
        if (forceFocusInsideTrap) {
            this._events.on(window, 'focus', this._forceFocusInTrap, true);
        }
        if (!isClickableOutsideFocusTrap) {
            this._events.on(window, 'click', this._forceClickInTrap, true);
        }
    };
    FocusTrapZone.prototype.componentWillUnmount = function () {
        var _this = this;
        var ignoreExternalFocusing = this.props.ignoreExternalFocusing;
        this._events.dispose();
        if (this._isInFocusStack || this._isInClickStack) {
            var filter = function (value) {
                return _this !== value;
            };
            if (this._isInFocusStack) {
                FocusTrapZone._focusStack = FocusTrapZone._focusStack.filter(filter);
            }
            if (this._isInClickStack) {
                FocusTrapZone._clickStack = FocusTrapZone._clickStack.filter(filter);
            }
        }
        if (!ignoreExternalFocusing && this._previouslyFocusedElement) {
            this._previouslyFocusedElement.focus();
        }
    };
    FocusTrapZone.prototype.render = function () {
        var _a = this.props, className = _a.className, ariaLabelledBy = _a.ariaLabelledBy;
        var divProps = Utilities_1.getNativeProps(this.props, Utilities_1.divProperties);
        return (React.createElement("div", __assign({}, divProps, { className: className, ref: 'root', "aria-labelledby": ariaLabelledBy, onKeyDown: this._onKeyboardHandler }), this.props.children));
    };
    /**
     * Need to expose this method in case of popups since focus needs to be set when popup is opened
     */
    FocusTrapZone.prototype.focus = function () {
        var firstFocusableSelector = this.props.firstFocusableSelector;
        var _firstFocusableChild;
        var root = this.refs.root;
        if (firstFocusableSelector) {
            _firstFocusableChild = root.querySelector('.' + firstFocusableSelector);
        }
        else {
            _firstFocusableChild = Utilities_1.getNextElement(root, root.firstChild, true, false, false, true);
        }
        if (_firstFocusableChild) {
            _firstFocusableChild.focus();
        }
    };
    FocusTrapZone.prototype._onKeyboardHandler = function (ev) {
        if (ev.which !== Utilities_1.KeyCodes.tab) {
            return;
        }
        var root = this.refs.root;
        var _firstFocusableChild = Utilities_1.getFirstFocusable(root, root.firstChild, true);
        var _lastFocusableChild = Utilities_1.getLastFocusable(root, root.lastChild, true);
        if (ev.shiftKey && _firstFocusableChild === ev.target) {
            _lastFocusableChild.focus();
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (!ev.shiftKey && _lastFocusableChild === ev.target) {
            _firstFocusableChild.focus();
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    FocusTrapZone.prototype._forceFocusInTrap = function (ev) {
        if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
            var focusedElement = document.activeElement;
            if (!Utilities_1.elementContains(this.refs.root, focusedElement)) {
                this.focus();
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    };
    FocusTrapZone.prototype._forceClickInTrap = function (ev) {
        if (FocusTrapZone._clickStack.length && this === FocusTrapZone._clickStack[FocusTrapZone._clickStack.length - 1]) {
            var clickedElement = ev.target;
            if (clickedElement && !Utilities_1.elementContains(this.refs.root, clickedElement)) {
                this.focus();
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    };
    return FocusTrapZone;
}(Utilities_1.BaseComponent));
FocusTrapZone._focusStack = [];
FocusTrapZone._clickStack = [];
__decorate([
    Utilities_1.autobind
], FocusTrapZone.prototype, "_onKeyboardHandler", null);
exports.FocusTrapZone = FocusTrapZone;



/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(183));



/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var FocusZone_Props_1 = __webpack_require__(71);
var Utilities_1 = __webpack_require__(1);
var IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
var IS_ENTER_DISABLED_ATTRIBUTE = 'data-disable-click-on-enter';
var FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
var TABINDEX = 'tabindex';
var _allInstances = {};
var ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search'];
var FocusZone = (function (_super) {
    __extends(FocusZone, _super);
    function FocusZone(props) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({ rootProps: null });
        _this._id = Utilities_1.getId('FocusZone');
        _allInstances[_this._id] = _this;
        _this._focusAlignment = {
            left: 0,
            top: 0
        };
        return _this;
    }
    FocusZone.prototype.componentDidMount = function () {
        var windowElement = this.refs.root.ownerDocument.defaultView;
        var parentElement = Utilities_1.getParent(this.refs.root);
        while (parentElement &&
            parentElement !== document.body &&
            parentElement.nodeType === 1) {
            if (Utilities_1.isElementFocusZone(parentElement)) {
                this._isInnerZone = true;
                break;
            }
            parentElement = Utilities_1.getParent(parentElement);
        }
        this._events.on(windowElement, 'keydown', this._onKeyDownCapture, true);
        // Assign initial tab indexes so that we can set initial focus as appropriate.
        this._updateTabIndexes();
        if (this.props.defaultActiveElement) {
            this._activeElement = Utilities_1.getDocument().querySelector(this.props.defaultActiveElement);
            this.focus();
        }
    };
    FocusZone.prototype.componentWillUnmount = function () {
        delete _allInstances[this._id];
    };
    FocusZone.prototype.render = function () {
        var _a = this.props, rootProps = _a.rootProps, ariaDescribedBy = _a.ariaDescribedBy, ariaLabelledBy = _a.ariaLabelledBy, className = _a.className;
        var divProps = Utilities_1.getNativeProps(this.props, Utilities_1.divProperties);
        return (React.createElement("div", __assign({}, divProps, rootProps, { className: Utilities_1.css('ms-FocusZone', className), ref: 'root', "data-focuszone-id": this._id, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, onKeyDown: this._onKeyDown, onFocus: this._onFocus }, { onMouseDownCapture: this._onMouseDown }), this.props.children));
    };
    /**
     * Sets focus to the first tabbable item in the zone.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    FocusZone.prototype.focus = function () {
        if (this._activeElement && Utilities_1.elementContains(this.refs.root, this._activeElement)) {
            this._activeElement.focus();
            return true;
        }
        else {
            var firstChild = this.refs.root.firstChild;
            return this.focusElement(Utilities_1.getNextElement(this.refs.root, firstChild, true));
        }
    };
    /**
     * Sets focus to a specific child element within the zone. This can be used in conjunction with
     * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
     * location and then focus.)
     * @param {HTMLElement} element The child element within the zone to focus.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    FocusZone.prototype.focusElement = function (element) {
        var onBeforeFocus = this.props.onBeforeFocus;
        if (onBeforeFocus && !onBeforeFocus(element)) {
            return false;
        }
        if (element) {
            if (this._activeElement) {
                this._activeElement.tabIndex = -1;
            }
            this._activeElement = element;
            if (element) {
                if (!this._focusAlignment) {
                    this._setFocusAlignment(element, true, true);
                }
                this._activeElement.tabIndex = 0;
                element.focus();
                return true;
            }
        }
        return false;
    };
    FocusZone.prototype._onFocus = function (ev) {
        var onActiveElementChanged = this.props.onActiveElementChanged;
        if (this._isImmediateDescendantOfZone(ev.target)) {
            this._activeElement = ev.target;
            this._setFocusAlignment(this._activeElement);
        }
        else {
            var parentElement = ev.target;
            while (parentElement && parentElement !== this.refs.root) {
                if (Utilities_1.isElementTabbable(parentElement) && this._isImmediateDescendantOfZone(parentElement)) {
                    this._activeElement = parentElement;
                    break;
                }
                parentElement = Utilities_1.getParent(parentElement);
            }
        }
        if (onActiveElementChanged) {
            onActiveElementChanged(this._activeElement, ev);
        }
    };
    /**
     * Handle global tab presses so that we can patch tabindexes on the fly.
     */
    FocusZone.prototype._onKeyDownCapture = function (ev) {
        if (ev.which === Utilities_1.KeyCodes.tab) {
            this._updateTabIndexes();
        }
    };
    FocusZone.prototype._onMouseDown = function (ev) {
        var disabled = this.props.disabled;
        if (disabled) {
            return;
        }
        var target = ev.target;
        var path = [];
        while (target && target !== this.refs.root) {
            path.push(target);
            target = Utilities_1.getParent(target);
        }
        while (path.length) {
            target = path.pop();
            if (Utilities_1.isElementFocusZone(target)) {
                break;
            }
            else if (target && Utilities_1.isElementTabbable(target)) {
                target.tabIndex = 0;
                this._setFocusAlignment(target, true, true);
            }
        }
    };
    /**
     * Handle the keystrokes.
     */
    FocusZone.prototype._onKeyDown = function (ev) {
        var _a = this.props, direction = _a.direction, disabled = _a.disabled, isInnerZoneKeystroke = _a.isInnerZoneKeystroke;
        if (disabled) {
            return;
        }
        if (this.props.onKeyDown) {
            this.props.onKeyDown(ev);
            if (ev.isDefaultPrevented()) {
                return;
            }
        }
        if (isInnerZoneKeystroke &&
            this._isImmediateDescendantOfZone(ev.target) &&
            isInnerZoneKeystroke(ev)) {
            // Try to focus
            var innerZone = this._getFirstInnerZone();
            if (!innerZone || !innerZone.focus()) {
                return;
            }
        }
        else if (ev.altKey) {
            return;
        }
        else {
            switch (ev.which) {
                case Utilities_1.KeyCodes.space:
                    if (this._tryInvokeClickForFocusable(ev.target)) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.left:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.vertical && this._moveFocusLeft()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.right:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.vertical && this._moveFocusRight()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.up:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.horizontal && this._moveFocusUp()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.down:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.horizontal && this._moveFocusDown()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.home:
                    var firstChild = this.refs.root.firstChild;
                    if (this.focusElement(Utilities_1.getNextElement(this.refs.root, firstChild, true))) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.end:
                    var lastChild = this.refs.root.lastChild;
                    if (this.focusElement(Utilities_1.getPreviousElement(this.refs.root, lastChild, true, true, true))) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.enter:
                    if (this._tryInvokeClickForFocusable(ev.target)) {
                        break;
                    }
                    return;
                default:
                    return;
            }
        }
        ev.preventDefault();
        ev.stopPropagation();
    };
    /**
     * Walk up the dom try to find a focusable element.
     */
    FocusZone.prototype._tryInvokeClickForFocusable = function (target) {
        do {
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT') {
                return false;
            }
            if (this._isImmediateDescendantOfZone(target) &&
                target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
                target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true') {
                Utilities_1.EventGroup.raise(target, 'click', null, true);
                return true;
            }
            target = Utilities_1.getParent(target);
        } while (target !== this.refs.root);
        return false;
    };
    /**
     * Traverse to find first child zone.
     */
    FocusZone.prototype._getFirstInnerZone = function (rootElement) {
        rootElement = rootElement || this._activeElement || this.refs.root;
        var child = rootElement.firstElementChild;
        while (child) {
            if (Utilities_1.isElementFocusZone(child)) {
                return _allInstances[child.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];
            }
            var match = this._getFirstInnerZone(child);
            if (match) {
                return match;
            }
            child = child.nextElementSibling;
        }
        return null;
    };
    FocusZone.prototype._moveFocus = function (isForward, getDistanceFromCenter, ev) {
        var element = this._activeElement;
        var candidateDistance = -1;
        var candidateElement;
        var changedFocus = false;
        var isBidirectional = this.props.direction === FocusZone_Props_1.FocusZoneDirection.bidirectional;
        if (!element) {
            return false;
        }
        if (this._isElementInput(element)) {
            if (!this._shouldInputLoseFocus(element, isForward)) {
                return false;
            }
        }
        var activeRect = isBidirectional ? element.getBoundingClientRect() : null;
        do {
            element = isForward ?
                Utilities_1.getNextElement(this.refs.root, element) :
                Utilities_1.getPreviousElement(this.refs.root, element);
            if (isBidirectional) {
                if (element) {
                    var targetRect = element.getBoundingClientRect();
                    var elementDistance = getDistanceFromCenter(activeRect, targetRect);
                    if (elementDistance > -1 && (candidateDistance === -1 || elementDistance < candidateDistance)) {
                        candidateDistance = elementDistance;
                        candidateElement = element;
                    }
                    if (candidateDistance >= 0 && elementDistance < 0) {
                        break;
                    }
                }
            }
            else {
                candidateElement = element;
                break;
            }
        } while (element);
        // Focus the closest candidate
        if (candidateElement && candidateElement !== this._activeElement) {
            changedFocus = true;
            this.focusElement(candidateElement);
        }
        else if (this.props.isCircularNavigation) {
            if (isForward) {
                return this.focusElement(Utilities_1.getNextElement(this.refs.root, this.refs.root.firstElementChild, true));
            }
            else {
                return this.focusElement(Utilities_1.getPreviousElement(this.refs.root, this.refs.root.lastElementChild, true, true, true));
            }
        }
        return changedFocus;
    };
    FocusZone.prototype._moveFocusDown = function () {
        var targetTop = -1;
        var leftAlignment = this._focusAlignment.left;
        if (this._moveFocus(true, function (activeRect, targetRect) {
            var distance = -1;
            // ClientRect values can be floats that differ by very small fractions of a decimal.
            // If the difference between top and bottom are within a pixel then we should treat
            // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
            // but without Math.Floor they will be handled incorrectly.
            var targetRectTop = Math.floor(targetRect.top);
            var activeRectBottom = Math.floor(activeRect.bottom);
            if ((targetTop === -1 && targetRectTop >= activeRectBottom) ||
                (targetRectTop === targetTop)) {
                targetTop = targetRectTop;
                if (leftAlignment >= targetRect.left && leftAlignment <= (targetRect.left + targetRect.width)) {
                    distance = 0;
                }
                else {
                    distance = Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
                }
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, false, true);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusUp = function () {
        var targetTop = -1;
        var leftAlignment = this._focusAlignment.left;
        if (this._moveFocus(false, function (activeRect, targetRect) {
            var distance = -1;
            // ClientRect values can be floats that differ by very small fractions of a decimal.
            // If the difference between top and bottom are within a pixel then we should treat
            // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
            // but without Math.Floor they will be handled incorrectly.
            var targetRectBottom = Math.floor(targetRect.bottom);
            var targetRectTop = Math.floor(targetRect.top);
            var activeRectTop = Math.floor(activeRect.top);
            if ((targetTop === -1 && targetRectBottom <= activeRectTop) ||
                (targetRectTop === targetTop)) {
                targetTop = targetRectTop;
                if (leftAlignment >= targetRect.left && leftAlignment <= (targetRect.left + targetRect.width)) {
                    distance = 0;
                }
                else {
                    distance = Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
                }
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, false, true);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusLeft = function () {
        var _this = this;
        var targetTop = -1;
        var topAlignment = this._focusAlignment.top;
        if (this._moveFocus(Utilities_1.getRTL(), function (activeRect, targetRect) {
            var distance = -1;
            if ((targetTop === -1 &&
                targetRect.right <= activeRect.right &&
                (_this.props.direction === FocusZone_Props_1.FocusZoneDirection.horizontal || targetRect.top === activeRect.top)) ||
                (targetRect.top === targetTop)) {
                targetTop = targetRect.top;
                distance = Math.abs((targetRect.top + (targetRect.height / 2)) - topAlignment);
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, true, false);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusRight = function () {
        var _this = this;
        var targetTop = -1;
        var topAlignment = this._focusAlignment.top;
        if (this._moveFocus(!Utilities_1.getRTL(), function (activeRect, targetRect) {
            var distance = -1;
            if ((targetTop === -1 &&
                targetRect.left >= activeRect.left &&
                (_this.props.direction === FocusZone_Props_1.FocusZoneDirection.horizontal || targetRect.top === activeRect.top)) ||
                (targetRect.top === targetTop)) {
                targetTop = targetRect.top;
                distance = Math.abs((targetRect.top + (targetRect.height / 2)) - topAlignment);
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, true, false);
            return true;
        }
        return false;
    };
    FocusZone.prototype._setFocusAlignment = function (element, isHorizontal, isVertical) {
        if (this.props.direction === FocusZone_Props_1.FocusZoneDirection.bidirectional &&
            (!this._focusAlignment || isHorizontal || isVertical)) {
            var rect = element.getBoundingClientRect();
            var left = rect.left + (rect.width / 2);
            var top_1 = rect.top + (rect.height / 2);
            if (!this._focusAlignment) {
                this._focusAlignment = { left: left, top: top_1 };
            }
            if (isHorizontal) {
                this._focusAlignment.left = left;
            }
            if (isVertical) {
                this._focusAlignment.top = top_1;
            }
        }
    };
    FocusZone.prototype._isImmediateDescendantOfZone = function (element) {
        var parentElement = Utilities_1.getParent(element);
        while (parentElement && parentElement !== this.refs.root && parentElement !== document.body) {
            if (Utilities_1.isElementFocusZone(parentElement)) {
                return false;
            }
            parentElement = Utilities_1.getParent(parentElement);
        }
        return true;
    };
    FocusZone.prototype._updateTabIndexes = function (element) {
        if (!element) {
            element = this.refs.root;
            if (this._activeElement && !Utilities_1.elementContains(element, this._activeElement)) {
                this._activeElement = null;
            }
        }
        var childNodes = element.children;
        for (var childIndex = 0; childNodes && childIndex < childNodes.length; childIndex++) {
            var child = childNodes[childIndex];
            if (!Utilities_1.isElementFocusZone(child)) {
                // If the item is explicitly set to not be focusable then TABINDEX needs to be set to -1.
                if (child.getAttribute && child.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'false') {
                    child.setAttribute(TABINDEX, '-1');
                }
                if (Utilities_1.isElementTabbable(child)) {
                    if (this.props.disabled) {
                        child.setAttribute(TABINDEX, '-1');
                    }
                    else if (!this._isInnerZone && (!this._activeElement || this._activeElement === child)) {
                        this._activeElement = child;
                        if (child.getAttribute(TABINDEX) !== '0') {
                            child.setAttribute(TABINDEX, '0');
                        }
                    }
                    else if (child.getAttribute(TABINDEX) !== '-1') {
                        child.setAttribute(TABINDEX, '-1');
                    }
                }
                else if (child.tagName === 'svg' && child.getAttribute('focusable') !== 'false') {
                    // Disgusting IE hack. Sad face.
                    child.setAttribute('focusable', 'false');
                }
                this._updateTabIndexes(child);
            }
        }
    };
    FocusZone.prototype._isElementInput = function (element) {
        if (element && element.tagName && element.tagName.toLowerCase() === 'input') {
            return true;
        }
        return false;
    };
    FocusZone.prototype._shouldInputLoseFocus = function (element, isForward) {
        if (element &&
            element.type &&
            ALLOWED_INPUT_TYPES.indexOf(element.type.toLowerCase()) > -1) {
            var selectionStart = element.selectionStart;
            var selectionEnd = element.selectionEnd;
            var isRangeSelected = selectionStart !== selectionEnd;
            var inputValue = element.value;
            // We shouldn't lose focus in the following cases:
            // 1. There is range selected.
            // 2. When selection start is larger than 0 and it is backward.
            // 3. when selection start is not the end of lenght and it is forward.
            if (isRangeSelected ||
                (selectionStart > 0 && !isForward) ||
                (selectionStart !== inputValue.length && isForward)) {
                return false;
            }
        }
        return true;
    };
    return FocusZone;
}(Utilities_1.BaseComponent));
FocusZone.defaultProps = {
    isCircularNavigation: false,
    direction: FocusZone_Props_1.FocusZoneDirection.bidirectional
};
__decorate([
    Utilities_1.autobind
], FocusZone.prototype, "_onFocus", null);
__decorate([
    Utilities_1.autobind
], FocusZone.prototype, "_onMouseDown", null);
__decorate([
    Utilities_1.autobind
], FocusZone.prototype, "_onKeyDown", null);
exports.FocusZone = FocusZone;



/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(185));
__export(__webpack_require__(71));



/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var Link_1 = __webpack_require__(148);
var GroupSpacer_1 = __webpack_require__(21);
var stylesImport = __webpack_require__(188);
var styles = stylesImport;
var GroupFooter = (function (_super) {
    __extends(GroupFooter, _super);
    function GroupFooter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupFooter.prototype.render = function () {
        var _a = this.props, group = _a.group, groupLevel = _a.groupLevel, showAllLinkText = _a.showAllLinkText;
        return group && (React.createElement("div", { className: Utilities_1.css('ms-groupFooter', styles.root) },
            GroupSpacer_1.GroupSpacer({ count: groupLevel }),
            React.createElement(Link_1.Link, { onClick: this._onSummarizeClick }, showAllLinkText)));
    };
    GroupFooter.prototype._onSummarizeClick = function (ev) {
        this.props.onToggleSummarize(this.props.group);
        ev.stopPropagation();
        ev.preventDefault();
    };
    return GroupFooter;
}(Utilities_1.BaseComponent));
__decorate([
    Utilities_1.autobind
], GroupFooter.prototype, "_onSummarizeClick", null);
exports.GroupFooter = GroupFooter;



/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_0ee076e1',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_0ee076e1{position:relative;padding:10px 84px;cursor:pointer}.root_0ee076e1 .ms-Link{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:12px}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var index_1 = __webpack_require__(12);
var Check_1 = __webpack_require__(34);
var Icon_1 = __webpack_require__(17);
var GroupSpacer_1 = __webpack_require__(21);
var Spinner_1 = __webpack_require__(153);
var FocusZone_1 = __webpack_require__(8);
var stylesImport = __webpack_require__(190);
var styles = stylesImport;
var GroupHeader = (function (_super) {
    __extends(GroupHeader, _super);
    function GroupHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isCollapsed: _this.props.group && _this.props.group.isCollapsed,
            isLoadingVisible: false
        };
        return _this;
    }
    GroupHeader.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.group) {
            var newCollapsed = newProps.group.isCollapsed;
            var isGroupLoading = newProps.headerProps && newProps.headerProps.isGroupLoading;
            var newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);
            this.setState({
                isCollapsed: newCollapsed,
                isLoadingVisible: newLoadingVisible
            });
        }
    };
    GroupHeader.prototype.render = function () {
        var _a = this.props, group = _a.group, groupLevel = _a.groupLevel, viewport = _a.viewport, selectionMode = _a.selectionMode, loadingText = _a.loadingText, isSelected = _a.isSelected, selected = _a.selected, isCollapsedGroupSelectVisible = _a.isCollapsedGroupSelectVisible;
        var _b = this.state, isCollapsed = _b.isCollapsed, isLoadingVisible = _b.isLoadingVisible;
        if (isCollapsedGroupSelectVisible === undefined) {
            isCollapsedGroupSelectVisible = true;
        }
        var canSelectGroup = selectionMode === index_1.SelectionMode.multiple;
        var isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
        var currentlySelected = isSelected || selected;
        return group && (React.createElement("div", { className: Utilities_1.css('ms-GroupHeader', styles.root, (_c = {},
                _c['is-selected ' + styles.rootIsSelected] = currentlySelected,
                _c)), style: viewport ? { minWidth: viewport.width } : {}, onClick: this._onHeaderClick, "aria-label": group.ariaLabel || group.name, "data-is-focusable": true },
            React.createElement(FocusZone_1.FocusZone, { direction: FocusZone_1.FocusZoneDirection.horizontal },
                isSelectionCheckVisible ? (React.createElement("button", { type: 'button', className: Utilities_1.css('ms-GroupHeader-check', styles.check), "data-selection-toggle": true, onClick: this._onToggleSelectGroupClick },
                    React.createElement(Check_1.Check, { checked: currentlySelected }))) : (selectionMode !== index_1.SelectionMode.none ? GroupSpacer_1.GroupSpacer({ count: 1 }) : null),
                GroupSpacer_1.GroupSpacer({ count: groupLevel }),
                React.createElement("div", { className: Utilities_1.css('ms-GroupHeader-dropIcon', styles.dropIcon) },
                    React.createElement(Icon_1.Icon, { iconName: 'Tag' })),
                React.createElement("button", { type: 'button', className: Utilities_1.css('ms-GroupHeader-expand', styles.expand), onClick: this._onToggleCollapse },
                    React.createElement(Icon_1.Icon, { className: Utilities_1.css(isCollapsed && ('is-collapsed ' + styles.expandIsCollapsed)), iconName: 'ChevronDown' })),
                React.createElement("div", { className: Utilities_1.css('ms-GroupHeader-title ms-font-xl', styles.title) },
                    React.createElement("span", null, group.name),
                    React.createElement("span", null,
                        "(",
                        group.count,
                        group.hasMoreData && '+',
                        ")")),
                React.createElement("div", { className: Utilities_1.css('ms-GroupHeader-loading', styles.loading, isLoadingVisible && ('is-loading ' + styles.loadingIsVisible)) },
                    React.createElement(Spinner_1.Spinner, { label: loadingText })))));
        var _c;
    };
    GroupHeader.prototype._onToggleCollapse = function (ev) {
        var _a = this.props, group = _a.group, onToggleCollapse = _a.onToggleCollapse, isGroupLoading = _a.isGroupLoading;
        var isCollapsed = this.state.isCollapsed;
        var newCollapsed = !isCollapsed;
        var newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group);
        this.setState({
            isCollapsed: newCollapsed,
            isLoadingVisible: newLoadingVisible
        });
        if (onToggleCollapse) {
            onToggleCollapse(group);
        }
        ev.stopPropagation();
        ev.preventDefault();
    };
    GroupHeader.prototype._onToggleSelectGroupClick = function (ev) {
        var _a = this.props, onToggleSelectGroup = _a.onToggleSelectGroup, group = _a.group;
        if (onToggleSelectGroup) {
            onToggleSelectGroup(group);
        }
        ev.preventDefault();
        ev.stopPropagation();
    };
    GroupHeader.prototype._onHeaderClick = function () {
        var _a = this.props, group = _a.group, onGroupHeaderClick = _a.onGroupHeaderClick, onToggleSelectGroup = _a.onToggleSelectGroup;
        if (onGroupHeaderClick) {
            onGroupHeaderClick(group);
        }
        else if (onToggleSelectGroup) {
            onToggleSelectGroup(group);
        }
    };
    return GroupHeader;
}(Utilities_1.BaseComponent));
__decorate([
    Utilities_1.autobind
], GroupHeader.prototype, "_onToggleCollapse", null);
__decorate([
    Utilities_1.autobind
], GroupHeader.prototype, "_onToggleSelectGroupClick", null);
__decorate([
    Utilities_1.autobind
], GroupHeader.prototype, "_onHeaderClick", null);
exports.GroupHeader = GroupHeader;



/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_74d9fd5b',
    rootIsSelected: 'rootIsSelected_74d9fd5b',
    check: 'check_74d9fd5b',
    expand: 'expand_74d9fd5b',
    title: 'title_74d9fd5b',
    expandIsCollapsed: 'expandIsCollapsed_74d9fd5b',
    loading: 'loading_74d9fd5b',
    loadingIsVisible: 'loadingIsVisible_74d9fd5b',
    dropIcon: 'dropIcon_74d9fd5b',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_74d9fd5b{cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.root_74d9fd5b::-moz-focus-inner{border:0}.root_74d9fd5b{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_74d9fd5b:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.root_74d9fd5b:hover{background:" }, { "theme": "themeLighterAlt", "defaultValue": "#eff6fc" }, { "rawString": "}.root_74d9fd5b.rootIsSelected_74d9fd5b{background:" }, { "theme": "themeLighter", "defaultValue": "#deecf9" }, { "rawString": "}.root_74d9fd5b.rootIsSelected_74d9fd5b:hover{background:" }, { "theme": "themeLight", "defaultValue": "#c7e0f4" }, { "rawString": "}.check_74d9fd5b,.expand_74d9fd5b{display:inline-block;cursor:default;padding:6px;-webkit-transform:translateY(50%);transform:translateY(50%);margin-top:-12px;box-sizing:border-box;vertical-align:top;background:0 0;border:none;font-size:12px;top:4px}.check_74d9fd5b::-moz-focus-inner,.expand_74d9fd5b::-moz-focus-inner{border:0}.check_74d9fd5b,.expand_74d9fd5b{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .check_74d9fd5b:focus:after,.ms-Fabric.is-focusVisible .expand_74d9fd5b:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.check_74d9fd5b{opacity:0;margin-top:-10px}.check_74d9fd5b:focus{opacity:1}.root_74d9fd5b.rootIsSelected_74d9fd5b .check_74d9fd5b,.root_74d9fd5b:hover .check_74d9fd5b{opacity:1}.title_74d9fd5b{padding:14px 6px;display:inline-block;cursor:pointer;outline:0}.expand_74d9fd5b{width:36px;height:40px;color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.expand_74d9fd5b .ms-Icon{-webkit-transform:rotate(-180deg);transform:rotate(-180deg);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transition:-webkit-transform .1s linear;transition:transform .1s linear;transition:transform .1s linear,-webkit-transform .1s linear}.expand_74d9fd5b .ms-Icon.expandIsCollapsed_74d9fd5b{-webkit-transform:rotate(0);transform:rotate(0)}.loading_74d9fd5b{display:inline-block;visibility:hidden;opacity:0;padding:0 16px;vertical-align:middle;transition:visibility 367ms,opacity 367ms}.loading_74d9fd5b.loadingIsVisible_74d9fd5b{visibility:visible;opacity:1}.dropIcon_74d9fd5b{display:inline-block;position:relative;top:-16px;font-size:20px;color:" }, { "theme": "neutralSecondaryAlt", "defaultValue": "#767676" }, { "rawString": ";transition:opacity 467ms cubic-bezier(.39,.575,.565,1),-webkit-transform 267ms cubic-bezier(.6,-.28,.735,.045);transition:transform 267ms cubic-bezier(.6,-.28,.735,.045),opacity 467ms cubic-bezier(.39,.575,.565,1);transition:transform 267ms cubic-bezier(.6,-.28,.735,.045),opacity 467ms cubic-bezier(.39,.575,.565,1),-webkit-transform 267ms cubic-bezier(.6,-.28,.735,.045);opacity:0;-webkit-transform:rotate(.2deg) scale(.65);transform:rotate(.2deg) scale(.65);-webkit-transform-origin:10px 10px;transform-origin:10px 10px}html[dir=ltr] .dropIcon_74d9fd5b{left:-26px}html[dir=rtl] .dropIcon_74d9fd5b{right:-26px}.dropIcon_74d9fd5b .ms-Icon--Tag{position:absolute}.ms-GroupedList-group.is-dropping>.root_74d9fd5b .dropIcon_74d9fd5b{transition:opacity 167ms cubic-bezier(.39,.575,.565,1),-webkit-transform 467ms cubic-bezier(.075,.82,.165,1);transition:transform 467ms cubic-bezier(.075,.82,.165,1),opacity 167ms cubic-bezier(.39,.575,.565,1);transition:transform 467ms cubic-bezier(.075,.82,.165,1),opacity 167ms cubic-bezier(.39,.575,.565,1),-webkit-transform 467ms cubic-bezier(.075,.82,.165,1);transition-delay:367ms;opacity:1;-webkit-transform:rotate(.2deg) scale(1);transform:rotate(.2deg) scale(1)}.ms-GroupedList-group.is-dropping .check_74d9fd5b{opacity:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_e66f26c5',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_e66f26c5{display:inline-block}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var GroupedListSection_1 = __webpack_require__(193);
var List_1 = __webpack_require__(36);
var index_1 = __webpack_require__(12);
var stylesImport = __webpack_require__(72);
var styles = stylesImport;
var GroupedList = (function (_super) {
    __extends(GroupedList, _super);
    function GroupedList(props) {
        var _this = _super.call(this, props) || this;
        _this._isSomeGroupExpanded = _this._computeIsSomeGroupExpanded(props.groups);
        _this.state = {
            lastWidth: 0,
            groups: props.groups
        };
        return _this;
    }
    GroupedList.prototype.componentWillReceiveProps = function (newProps) {
        var _a = this.props, groups = _a.groups, selectionMode = _a.selectionMode;
        var shouldForceUpdates = false;
        if (newProps.groups !== groups) {
            this.setState({ groups: newProps.groups });
            shouldForceUpdates = true;
        }
        if (newProps.selectionMode !== selectionMode) {
            shouldForceUpdates = true;
        }
        if (shouldForceUpdates) {
            this._forceListUpdates();
        }
    };
    GroupedList.prototype.render = function () {
        var className = this.props.className;
        var groups = this.state.groups;
        return (React.createElement("div", { ref: 'root', className: Utilities_1.css('ms-GroupedList', styles.root, className), "data-automationid": 'GroupedList', "data-is-scrollable": 'false', role: 'grid' }, !groups ?
            this._renderGroup(null, 0) : (React.createElement(List_1.List, { ref: 'list', items: groups, onRenderCell: this._renderGroup, getItemCountForPage: function () { return 1; } }))));
    };
    GroupedList.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this._forceListUpdates();
    };
    GroupedList.prototype.toggleCollapseAll = function (allCollapsed) {
        var groups = this.state.groups;
        var groupProps = this.props.groupProps;
        var onToggleCollapseAll = groupProps && groupProps.onToggleCollapseAll;
        if (groups) {
            if (onToggleCollapseAll) {
                onToggleCollapseAll(allCollapsed);
            }
            for (var groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                groups[groupIndex].isCollapsed = allCollapsed;
            }
            this._updateIsSomeGroupExpanded();
            this.forceUpdate();
        }
    };
    GroupedList.prototype._renderGroup = function (group, groupIndex) {
        var _a = this.props, dragDropEvents = _a.dragDropEvents, dragDropHelper = _a.dragDropHelper, eventsToRegister = _a.eventsToRegister, groupProps = _a.groupProps, items = _a.items, listProps = _a.listProps, onRenderCell = _a.onRenderCell, selectionMode = _a.selectionMode, selection = _a.selection, viewport = _a.viewport;
        // override group header/footer props as needed
        var dividerProps = {
            onToggleSelectGroup: this._onToggleSelectGroup,
            onToggleCollapse: this._onToggleCollapse,
            onToggleSummarize: this._onToggleSummarize
        };
        var headerProps = Utilities_1.assign({}, groupProps.headerProps, dividerProps);
        var footerProps = Utilities_1.assign({}, groupProps.footerProps, dividerProps);
        var groupNestingDepth = this._getGroupNestingDepth();
        return (!group || group.count > 0) ? (React.createElement(GroupedListSection_1.GroupedListSection, { ref: 'group_' + groupIndex, key: this._getGroupKey(group, groupIndex), dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: eventsToRegister, footerProps: footerProps, getGroupItemLimit: groupProps && groupProps.getGroupItemLimit, group: group, groupIndex: groupIndex, groupNestingDepth: groupNestingDepth, headerProps: headerProps, listProps: listProps, items: items, onRenderCell: onRenderCell, onRenderGroupHeader: groupProps.onRenderHeader, onRenderGroupFooter: groupProps.onRenderFooter, selectionMode: selectionMode, selection: selection, viewport: viewport })) : null;
    };
    GroupedList.prototype._getGroupKey = function (group, index) {
        return 'group-' + ((group && group.key) ? group.key : String(index));
    };
    GroupedList.prototype._getGroupNestingDepth = function () {
        var groups = this.state.groups;
        var level = 0;
        var groupsInLevel = groups;
        while (groupsInLevel && groupsInLevel.length > 0) {
            level++;
            groupsInLevel = groupsInLevel[0].children;
        }
        return level;
    };
    GroupedList.prototype._onToggleCollapse = function (group) {
        var groupProps = this.props.groupProps;
        var onToggleCollapse = groupProps && groupProps.headerProps && groupProps.headerProps.onToggleCollapse;
        if (group) {
            if (onToggleCollapse) {
                onToggleCollapse(group);
            }
            group.isCollapsed = !group.isCollapsed;
            this._updateIsSomeGroupExpanded();
            this.forceUpdate();
        }
    };
    GroupedList.prototype._onToggleSelectGroup = function (group) {
        if (group) {
            this.props.selection.toggleRangeSelected(group.startIndex, group.count);
        }
    };
    GroupedList.prototype._forceListUpdates = function (groups) {
        groups = groups || this.state.groups;
        var groupCount = groups ? groups.length : 1;
        if (this.refs.list) {
            this.refs.list.forceUpdate();
            for (var i = 0; i < groupCount; i++) {
                var group = this.refs.list.refs['group_' + String(i)];
                if (group) {
                    group.forceListUpdate();
                }
            }
        }
        else {
            var group = this.refs['group_' + String(0)];
            if (group) {
                group.forceListUpdate();
            }
        }
    };
    GroupedList.prototype._onToggleSummarize = function (group) {
        var groupProps = this.props.groupProps;
        var onToggleSummarize = groupProps && groupProps.footerProps && groupProps.footerProps.onToggleSummarize;
        if (onToggleSummarize) {
            onToggleSummarize(group);
        }
        else {
            if (group) {
                group.isShowingAll = !group.isShowingAll;
            }
            this.forceUpdate();
        }
    };
    GroupedList.prototype._computeIsSomeGroupExpanded = function (groups) {
        var _this = this;
        return groups && groups.some(function (group) { return group.children ? _this._computeIsSomeGroupExpanded(group.children) : !group.isCollapsed; });
    };
    GroupedList.prototype._updateIsSomeGroupExpanded = function () {
        var groups = this.state.groups;
        var onGroupExpandStateChanged = this.props.onGroupExpandStateChanged;
        var newIsSomeGroupExpanded = this._computeIsSomeGroupExpanded(groups);
        if (this._isSomeGroupExpanded !== newIsSomeGroupExpanded) {
            if (onGroupExpandStateChanged) {
                onGroupExpandStateChanged(newIsSomeGroupExpanded);
            }
            this._isSomeGroupExpanded = newIsSomeGroupExpanded;
        }
    };
    return GroupedList;
}(Utilities_1.BaseComponent));
GroupedList.defaultProps = {
    selectionMode: index_1.SelectionMode.multiple,
    isHeaderVisible: true,
    groupProps: {}
};
__decorate([
    Utilities_1.autobind
], GroupedList.prototype, "_renderGroup", null);
__decorate([
    Utilities_1.autobind
], GroupedList.prototype, "_onToggleCollapse", null);
__decorate([
    Utilities_1.autobind
], GroupedList.prototype, "_onToggleSelectGroup", null);
__decorate([
    Utilities_1.autobind
], GroupedList.prototype, "_onToggleSummarize", null);
exports.GroupedList = GroupedList;



/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var index_1 = __webpack_require__(12);
var GroupFooter_1 = __webpack_require__(187);
var GroupHeader_1 = __webpack_require__(189);
var List_1 = __webpack_require__(36);
var Utilities_2 = __webpack_require__(1);
var stylesImport = __webpack_require__(72);
var styles = stylesImport;
var DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
var GroupedListSection = (function (_super) {
    __extends(GroupedListSection, _super);
    function GroupedListSection(props) {
        var _this = _super.call(this, props) || this;
        var selection = props.selection, group = props.group;
        _this._subGroups = {};
        _this.state = {
            isDropping: false,
            isSelected: (selection && group) ? selection.isRangeSelected(group.startIndex, group.count) : false
        };
        return _this;
    }
    GroupedListSection.prototype.componentDidMount = function () {
        var _a = this.props, dragDropHelper = _a.dragDropHelper, selection = _a.selection;
        if (dragDropHelper) {
            this._dragDropSubscription = dragDropHelper.subscribe(this.refs.root, this._events, this._getGroupDragDropOptions());
        }
        if (selection) {
            this._events.on(selection, index_1.SELECTION_CHANGE, this._onSelectionChange);
        }
    };
    GroupedListSection.prototype.componentWillUnmount = function () {
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
        }
    };
    GroupedListSection.prototype.componentDidUpdate = function (previousProps) {
        if (this.props.group !== previousProps.group ||
            this.props.groupIndex !== previousProps.groupIndex ||
            this.props.dragDropHelper !== previousProps.dragDropHelper) {
            if (this._dragDropSubscription) {
                this._dragDropSubscription.dispose();
                delete this._dragDropSubscription;
            }
            if (this.props.dragDropHelper) {
                this._dragDropSubscription = this.props.dragDropHelper.subscribe(this.refs.root, this._events, this._getGroupDragDropOptions());
            }
        }
    };
    GroupedListSection.prototype.render = function () {
        var _a = this.props, getGroupItemLimit = _a.getGroupItemLimit, group = _a.group, groupIndex = _a.groupIndex, headerProps = _a.headerProps, footerProps = _a.footerProps, viewport = _a.viewport, selectionMode = _a.selectionMode, _b = _a.onRenderGroupHeader, onRenderGroupHeader = _b === void 0 ? this._onRenderGroupHeader : _b, _c = _a.onRenderGroupFooter, onRenderGroupFooter = _c === void 0 ? this._onRenderGroupFooter : _c;
        var isSelected = this.state.isSelected;
        var renderCount = group && getGroupItemLimit ? getGroupItemLimit(group) : Infinity;
        var isFooterVisible = group && !group.children && !group.isCollapsed && !group.isShowingAll &&
            (group.count > renderCount || group.hasMoreData);
        var hasNestedGroups = group && group.children && group.children.length > 0;
        var dividerProps = {
            group: group,
            groupIndex: groupIndex,
            groupLevel: group ? group.level : 0,
            isSelected: isSelected,
            viewport: viewport,
            selectionMode: selectionMode
        };
        var groupHeaderProps = Utilities_2.assign({}, headerProps, dividerProps);
        var groupFooterProps = Utilities_2.assign({}, footerProps, dividerProps);
        return (React.createElement("div", { ref: 'root', className: Utilities_2.css('ms-GroupedList-group', styles.group, this._getDroppingClassName()) },
            onRenderGroupHeader(groupHeaderProps, this._onRenderGroupHeader),
            group && group.isCollapsed ?
                null :
                (hasNestedGroups ?
                    (React.createElement(List_1.List, { ref: 'list', items: group.children, onRenderCell: this._renderSubGroup, getItemCountForPage: function () { return 1; } })) :
                    this._onRenderGroup(renderCount)),
            isFooterVisible && onRenderGroupFooter(groupFooterProps, this._onRenderGroupFooter)));
    };
    GroupedListSection.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this.forceListUpdate();
    };
    GroupedListSection.prototype.forceListUpdate = function () {
        var group = this.props.group;
        if (this.refs.list) {
            this.refs.list.forceUpdate();
            if (group && group.children && group.children.length > 0) {
                var subGroupCount = group.children.length;
                for (var i = 0; i < subGroupCount; i++) {
                    var subGroup = this.refs.list.refs['subGroup_' + String(i)];
                    if (subGroup) {
                        subGroup.forceListUpdate();
                    }
                }
            }
        }
        else {
            var subGroup = this.refs['subGroup_' + String(0)];
            if (subGroup) {
                subGroup.forceListUpdate();
            }
        }
    };
    GroupedListSection.prototype._onRenderGroupHeader = function (props) {
        return React.createElement(GroupHeader_1.GroupHeader, __assign({}, props));
    };
    GroupedListSection.prototype._onRenderGroupFooter = function (props) {
        return React.createElement(GroupFooter_1.GroupFooter, __assign({}, props));
    };
    GroupedListSection.prototype._onSelectionChange = function () {
        var _a = this.props, group = _a.group, selection = _a.selection;
        var isSelected = selection.isRangeSelected(group.startIndex, group.count);
        if (isSelected !== this.state.isSelected) {
            this.setState({ isSelected: isSelected });
        }
    };
    GroupedListSection.prototype._onRenderGroup = function (renderCount) {
        var _a = this.props, group = _a.group, items = _a.items, onRenderCell = _a.onRenderCell, listProps = _a.listProps, groupNestingDepth = _a.groupNestingDepth;
        var count = group ? group.count : items.length;
        var startIndex = group ? group.startIndex : 0;
        return (React.createElement(List_1.List, __assign({ items: items, onRenderCell: function (item, itemIndex) { return onRenderCell(groupNestingDepth, item, itemIndex); }, ref: 'list', renderCount: Math.min(count, renderCount), startIndex: startIndex }, listProps)));
    };
    GroupedListSection.prototype._renderSubGroup = function (subGroup, subGroupIndex) {
        var _a = this.props, dragDropEvents = _a.dragDropEvents, dragDropHelper = _a.dragDropHelper, eventsToRegister = _a.eventsToRegister, getGroupItemLimit = _a.getGroupItemLimit, groupNestingDepth = _a.groupNestingDepth, items = _a.items, headerProps = _a.headerProps, footerProps = _a.footerProps, listProps = _a.listProps, onRenderCell = _a.onRenderCell, selection = _a.selection, selectionMode = _a.selectionMode, viewport = _a.viewport, onRenderGroupHeader = _a.onRenderGroupHeader, onRenderGroupFooter = _a.onRenderGroupFooter;
        return (!subGroup || subGroup.count > 0) ? (React.createElement(GroupedListSection, { ref: 'subGroup_' + subGroupIndex, key: this._getGroupKey(subGroup, subGroupIndex), dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: eventsToRegister, footerProps: footerProps, getGroupItemLimit: getGroupItemLimit, group: subGroup, groupIndex: subGroupIndex, groupNestingDepth: groupNestingDepth, headerProps: headerProps, items: items, listProps: listProps, onRenderCell: onRenderCell, selection: selection, selectionMode: selectionMode, viewport: viewport, onRenderGroupHeader: onRenderGroupHeader, onRenderGroupFooter: onRenderGroupFooter })) : null;
    };
    GroupedListSection.prototype._getGroupKey = function (group, index) {
        return 'group-' + ((group && group.key) ? group.key : String(group.level) + String(index));
    };
    /**
     * collect all the data we need to enable drag/drop for a group
     */
    GroupedListSection.prototype._getGroupDragDropOptions = function () {
        var _a = this.props, group = _a.group, groupIndex = _a.groupIndex, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.eventsToRegister;
        var options = {
            eventMap: eventsToRegister,
            selectionIndex: -1,
            context: { data: group, index: groupIndex, isGroup: true },
            canDrag: function () { return false; },
            canDrop: dragDropEvents.canDrop,
            onDragStart: null,
            updateDropState: this._updateDroppingState
        };
        return options;
    };
    /**
     * update groupIsDropping state based on the input value, which is used to change style during drag and drop
     *
     * @private
     * @param {boolean} newValue (new isDropping state value)
     * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
     */
    GroupedListSection.prototype._updateDroppingState = function (newIsDropping, event) {
        var isDropping = this.state.isDropping;
        var dragDropEvents = this.props.dragDropEvents;
        if (!isDropping) {
            if (dragDropEvents.onDragLeave) {
                dragDropEvents.onDragLeave(event, null);
            }
        }
        else {
            if (dragDropEvents.onDragEnter) {
                dragDropEvents.onDragEnter(event, null);
            }
        }
        if (isDropping !== newIsDropping) {
            this.setState({ isDropping: newIsDropping });
        }
    };
    /**
     * get the correct css class to reflect the dropping state for a given group
     *
     * If the group is the current drop target, return the default dropping class name
     * Otherwise, return '';
     *
     */
    GroupedListSection.prototype._getDroppingClassName = function () {
        var isDropping = this.state.isDropping;
        var group = this.props.group;
        isDropping = !!(group && isDropping);
        return Utilities_2.css(isDropping && DEFAULT_DROPPING_CSS_CLASS, isDropping && styles.groupIsDropping);
    };
    return GroupedListSection;
}(Utilities_1.BaseComponent));
__decorate([
    Utilities_1.autobind
], GroupedListSection.prototype, "_onRenderGroupHeader", null);
__decorate([
    Utilities_1.autobind
], GroupedListSection.prototype, "_onRenderGroupFooter", null);
__decorate([
    Utilities_1.autobind
], GroupedListSection.prototype, "_renderSubGroup", null);
__decorate([
    Utilities_1.autobind
], GroupedListSection.prototype, "_getGroupDragDropOptions", null);
__decorate([
    Utilities_1.autobind
], GroupedListSection.prototype, "_updateDroppingState", null);
exports.GroupedListSection = GroupedListSection;



/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(192));



/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var React = __webpack_require__(0);
var styles = __webpack_require__(196);
/* tslint:enable */
var Icon_Props_1 = __webpack_require__(73);
var Image_1 = __webpack_require__(199);
var Utilities_1 = __webpack_require__(1);
exports.Icon = function (props) {
    var customIcon = props.iconName === 'None';
    var iconClassName = props.iconName ? ('ms-Icon--' + props.iconName) : '';
    if (props.iconType === Icon_Props_1.IconType.image || props.iconType === Icon_Props_1.IconType.Image) {
        var containerClassName = Utilities_1.css('ms-Icon', 'ms-Icon-imageContainer', styles.imageContainer, props.className);
        return (React.createElement("div", { className: containerClassName },
            React.createElement(Image_1.Image, __assign({}, props.imageProps))));
    }
    else {
        var className = Utilities_1.css('ms-Icon', customIcon ? '' : iconClassName, props.className);
        return React.createElement("i", __assign({}, Utilities_1.getNativeProps(props, Utilities_1.htmlElementProperties), { className: className }));
    }
};



/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    imageContainer: 'imageContainer_e3359a8e',
};
load_themed_styles_1.loadStyles([{ "rawString": ".imageContainer_e3359a8e{overflow:hidden}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(195));
__export(__webpack_require__(73));



/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The possible methods that can be used to fit the image.
 */
var ImageFit;
(function (ImageFit) {
    /**
     * The image is not scaled. The image is centered and cropped within the content box.
     */
    ImageFit[ImageFit["center"] = 0] = "center";
    /**
     * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
     * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
     * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
     */
    ImageFit[ImageFit["contain"] = 1] = "contain";
    /**
     * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped from
     * the top and bottom, or from the sides, depending on the difference in aspect ratio between the image and the frame.
     */
    ImageFit[ImageFit["cover"] = 2] = "cover";
    /**
     * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
     * frame will have empty space.
     */
    ImageFit[ImageFit["none"] = 3] = "none";
})(ImageFit = exports.ImageFit || (exports.ImageFit = {}));
var ImageLoadState;
(function (ImageLoadState) {
    /**
     * The image has not yet been loaded, and there is no error yet.
     */
    ImageLoadState[ImageLoadState["notLoaded"] = 0] = "notLoaded";
    /**
     * The image has been loaded successfully.
     */
    ImageLoadState[ImageLoadState["loaded"] = 1] = "loaded";
    /**
     * An error has been encountered while loading the image.
     */
    ImageLoadState[ImageLoadState["error"] = 2] = "error";
    /**
     * Deprecated at v1.3.6, to replace the src in case of errors, use onLoadingStateChange instead
     * and rerender the Image with a difference src.
     * @deprecated
     */
    ImageLoadState[ImageLoadState["errorLoaded"] = 3] = "errorLoaded";
})(ImageLoadState = exports.ImageLoadState || (exports.ImageLoadState = {}));



/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var Image_Props_1 = __webpack_require__(198);
var stylesImport = __webpack_require__(200);
var styles = stylesImport;
var CoverStyle;
(function (CoverStyle) {
    CoverStyle[CoverStyle["landscape"] = 0] = "landscape";
    CoverStyle[CoverStyle["portrait"] = 1] = "portrait";
})(CoverStyle = exports.CoverStyle || (exports.CoverStyle = {}));
exports.CoverStyleMap = (_a = {},
    _a[CoverStyle.landscape] = 'ms-Image-image--landscape ' + styles.imageIsLandscape,
    _a[CoverStyle.portrait] = 'ms-Image-image--portrait ' + styles.imageIsPortrait,
    _a);
exports.ImageFitMap = (_b = {},
    _b[Image_Props_1.ImageFit.center] = 'ms-Image-image--center ' + styles.imageIsCenter,
    _b[Image_Props_1.ImageFit.contain] = 'ms-Image-image--contain ' + styles.imageIsContain,
    _b[Image_Props_1.ImageFit.cover] = 'ms-Image-image--cover ' + styles.imageIsCover,
    _b[Image_Props_1.ImageFit.none] = 'ms-Image-image--none ' + styles.imageIsNone,
    _b);
var KEY_PREFIX = 'fabricImage';
var Image = (function (_super) {
    __extends(Image, _super);
    function Image(props) {
        var _this = _super.call(this, props) || this;
        // Make an initial assumption about the image layout until we can
        // check the rendered element. The value here only takes effect when
        // shouldStartVisible is true.
        _this._coverStyle = CoverStyle.portrait;
        _this.state = {
            loadState: Image_Props_1.ImageLoadState.notLoaded
        };
        return _this;
    }
    Image.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({
                loadState: Image_Props_1.ImageLoadState.notLoaded
            });
        }
        else if (this.state.loadState === Image_Props_1.ImageLoadState.loaded) {
            this._computeCoverStyle(nextProps);
        }
    };
    Image.prototype.componentDidUpdate = function (prevProps, prevState) {
        this._checkImageLoaded();
        if (this.props.onLoadingStateChange
            && prevState.loadState !== this.state.loadState) {
            this.props.onLoadingStateChange(this.state.loadState);
        }
    };
    Image.prototype.render = function () {
        var imageProps = Utilities_1.getNativeProps(this.props, Utilities_1.imageProperties, ['width', 'height']);
        var _a = this.props, src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, shouldFadeIn = _a.shouldFadeIn, className = _a.className, imageFit = _a.imageFit, role = _a.role, maximizeFrame = _a.maximizeFrame;
        var loadState = this.state.loadState;
        var coverStyle = this._coverStyle;
        var loaded = loadState === Image_Props_1.ImageLoadState.loaded || (loadState === Image_Props_1.ImageLoadState.notLoaded && this.props.shouldStartVisible);
        // If image dimensions aren't specified, the natural size of the image is used.
        return (React.createElement("div", { className: Utilities_1.css('ms-Image', styles.root, className, (_b = {},
                _b['ms-Image--maximizeFrame ' + styles.rootIsMaximizeFrame] = maximizeFrame,
                _b)), style: { width: width, height: height }, ref: this._resolveRef('_frameElement') },
            React.createElement("img", __assign({}, imageProps, { onLoad: this._onImageLoaded, onError: this._onImageError, key: KEY_PREFIX + this.props.src || '', className: Utilities_1.css('ms-Image-image', styles.image, exports.CoverStyleMap[coverStyle], (imageFit !== undefined) && exports.ImageFitMap[imageFit], (_c = {
                        'is-fadeIn': shouldFadeIn,
                        'is-notLoaded': !loaded
                    },
                    _c['is-loaded ' + styles.imageIsLoaded] = loaded,
                    _c['ms-u-fadeIn400'] = loaded && shouldFadeIn,
                    _c['is-error'] = loadState === Image_Props_1.ImageLoadState.error,
                    _c['ms-Image-image--scaleWidth ' + styles.imageIsScaleWidth] = (imageFit === undefined && !!width && !height),
                    _c['ms-Image-image--scaleHeight ' + styles.imageIsScaleHeight] = (imageFit === undefined && !width && !!height),
                    _c['ms-Image-image--scaleWidthHeight ' + styles.imageIsScaleWidthHeight] = (imageFit === undefined && !!width && !!height),
                    _c)), ref: this._resolveRef('_imageElement'), src: src, alt: alt, role: role }))));
        var _b, _c;
    };
    Image.prototype._onImageLoaded = function (ev) {
        var _a = this.props, src = _a.src, onLoad = _a.onLoad;
        if (onLoad) {
            onLoad(ev);
        }
        this._computeCoverStyle(this.props);
        if (src) {
            this.setState({
                loadState: Image_Props_1.ImageLoadState.loaded
            });
        }
    };
    Image.prototype._checkImageLoaded = function () {
        var src = this.props.src;
        var loadState = this.state.loadState;
        if (loadState === Image_Props_1.ImageLoadState.notLoaded) {
            // testing if naturalWidth and naturalHeight are greater than zero is better than checking
            // .complete, because .complete will also be set to true if the image breaks. However,
            // for some browsers, SVG images do not have a naturalWidth or naturalHeight, so fall back
            // to checking .complete for these images.
            var isLoaded = src && (this._imageElement.naturalWidth > 0 && this._imageElement.naturalHeight > 0) ||
                (this._imageElement.complete && Image._svgRegex.test(src));
            if (isLoaded) {
                this._computeCoverStyle(this.props);
                this.setState({
                    loadState: Image_Props_1.ImageLoadState.loaded
                });
            }
        }
    };
    Image.prototype._computeCoverStyle = function (props) {
        var imageFit = props.imageFit, width = props.width, height = props.height;
        if (imageFit === Image_Props_1.ImageFit.cover || imageFit === Image_Props_1.ImageFit.contain) {
            if (this._imageElement) {
                // Determine the desired ratio using the width and height props.
                // If those props aren't available, measure measure the frame.
                var desiredRatio = void 0;
                if (!!width && !!height) {
                    desiredRatio = width / height;
                }
                else {
                    desiredRatio = this._frameElement.clientWidth / this._frameElement.clientHeight;
                }
                // Examine the source image to determine its original ratio.
                var naturalRatio = this._imageElement.naturalWidth / this._imageElement.naturalHeight;
                // Should we crop from the top or the sides?
                if (naturalRatio > desiredRatio) {
                    this._coverStyle = CoverStyle.landscape;
                }
                else {
                    this._coverStyle = CoverStyle.portrait;
                }
            }
        }
    };
    Image.prototype._onImageError = function (ev) {
        if (this.props.onError) {
            this.props.onError(ev);
        }
        this.setState({
            loadState: Image_Props_1.ImageLoadState.error
        });
    };
    return Image;
}(Utilities_1.BaseComponent));
Image.defaultProps = {
    shouldFadeIn: true
};
Image._svgRegex = /\.svg$/i;
__decorate([
    Utilities_1.autobind
], Image.prototype, "_onImageLoaded", null);
__decorate([
    Utilities_1.autobind
], Image.prototype, "_onImageError", null);
exports.Image = Image;
var _a, _b;



/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_0e97ce9a',
    rootIsMaximizeFrame: 'rootIsMaximizeFrame_0e97ce9a',
    image: 'image_0e97ce9a',
    imageIsLoaded: 'imageIsLoaded_0e97ce9a',
    imageIsCenter: 'imageIsCenter_0e97ce9a',
    imageIsContain: 'imageIsContain_0e97ce9a',
    imageIsCover: 'imageIsCover_0e97ce9a',
    imageIsLandscape: 'imageIsLandscape_0e97ce9a',
    imageIsPortrait: 'imageIsPortrait_0e97ce9a',
    imageIsNone: 'imageIsNone_0e97ce9a',
    imageIsScaleWidthHeight: 'imageIsScaleWidthHeight_0e97ce9a',
    imageIsScaleWidth: 'imageIsScaleWidth_0e97ce9a',
    imageIsScaleHeight: 'imageIsScaleHeight_0e97ce9a',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_0e97ce9a{overflow:hidden}.rootIsMaximizeFrame_0e97ce9a{height:100%;width:100%}.image_0e97ce9a{display:block;opacity:0}.image_0e97ce9a.imageIsLoaded_0e97ce9a{opacity:1}.imageIsCenter_0e97ce9a,.imageIsContain_0e97ce9a,.imageIsCover_0e97ce9a{position:relative;top:50%}html[dir=ltr] .imageIsCenter_0e97ce9a,html[dir=ltr] .imageIsContain_0e97ce9a,html[dir=ltr] .imageIsCover_0e97ce9a{left:50%}html[dir=rtl] .imageIsCenter_0e97ce9a,html[dir=rtl] .imageIsContain_0e97ce9a,html[dir=rtl] .imageIsCover_0e97ce9a{right:50%}html[dir=ltr] .imageIsCenter_0e97ce9a,html[dir=ltr] .imageIsContain_0e97ce9a,html[dir=ltr] .imageIsCover_0e97ce9a{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}html[dir=rtl] .imageIsCenter_0e97ce9a,html[dir=rtl] .imageIsContain_0e97ce9a,html[dir=rtl] .imageIsCover_0e97ce9a{-webkit-transform:translate(50%,-50%);transform:translate(50%,-50%)}.imageIsContain_0e97ce9a.imageIsLandscape_0e97ce9a{width:100%;height:auto}.imageIsContain_0e97ce9a.imageIsPortrait_0e97ce9a{height:100%;width:auto}.imageIsCover_0e97ce9a.imageIsLandscape_0e97ce9a{height:100%;width:auto}.imageIsCover_0e97ce9a.imageIsPortrait_0e97ce9a{width:100%;height:auto}.imageIsNone_0e97ce9a{height:auto;width:auto}.imageIsScaleWidthHeight_0e97ce9a{height:100%;width:100%}.imageIsScaleWidth_0e97ce9a{height:auto;width:100%}.imageIsScaleHeight_0e97ce9a{height:100%;width:auto}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(202);
var styles = stylesImport;
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, required = _a.required, children = _a.children, className = _a.className;
        return (React.createElement("label", __assign({}, Utilities_1.getNativeProps(this.props, Utilities_1.divProperties), { className: Utilities_1.css(styles.root, 'ms-Label', className, (_b = {
                    'is-disabled': disabled,
                    'is-required': required
                },
                _b[styles.isDisabled] = disabled,
                _b[styles.isRequired] = required,
                _b)) }), children));
        var _b;
    };
    return Label;
}(Utilities_1.BaseComponent));
exports.Label = Label;



/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_93087b48',
    isRequired: 'isRequired_93087b48',
    isDisabled: 'isDisabled_93087b48',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_93087b48{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;box-sizing:border-box;margin:0;padding:0;box-shadow:none;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";box-sizing:border-box;display:block;padding:5px 0;word-wrap:break-word;overflow-wrap:break-word}.isRequired_93087b48::after{content:' *';color:" }, { "theme": "error", "defaultValue": "#a80000" }, { "rawString": "}.isDisabled_93087b48{color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": "}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(201));



/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    rootIsFixed: 'rootIsFixed_52a37a01',
    content: 'content_52a37a01',
};
load_themed_styles_1.loadStyles([{ "rawString": ".rootIsFixed_52a37a01{position:fixed;z-index:1000000;top:0;left:0;width:100vw;height:100vh;visibility:hidden}.content_52a37a01{visibility:visible}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var Layer_1 = __webpack_require__(38);
var LayerHost = (function (_super) {
    __extends(LayerHost, _super);
    function LayerHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerHost.prototype.shouldComponentUpdate = function () {
        return false;
    };
    LayerHost.prototype.componentDidMount = function () {
        Layer_1.Layer.notifyHostChanged(this.props.id);
    };
    LayerHost.prototype.componentWillUnmount = function () {
        Layer_1.Layer.notifyHostChanged(this.props.id);
    };
    LayerHost.prototype.render = function () {
        return (React.createElement("div", __assign({}, this.props, { className: Utilities_1.css('ms-LayerHost', this.props.className) })));
    };
    return LayerHost;
}(Utilities_1.BaseComponent));
exports.LayerHost = LayerHost;



/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(38));
__export(__webpack_require__(205));



/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(208);
var styles = stylesImport;
var Link = (function (_super) {
    __extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, children = _a.children, className = _a.className, href = _a.href;
        return (href ? (React.createElement("a", __assign({}, Utilities_1.getNativeProps(this.props, Utilities_1.anchorProperties), { className: Utilities_1.css('ms-Link', styles.root, className, (_b = {
                    'is-disabled': disabled
                },
                _b[styles.isDisabled] = disabled,
                _b[styles.isEnabled] = !disabled,
                _b)), onClick: this._onClick, ref: this._resolveRef('_link'), target: this.props.target }), children)) : (React.createElement("button", __assign({}, Utilities_1.getNativeProps(this.props, Utilities_1.buttonProperties), { className: Utilities_1.css('ms-Link', styles.root, className, (_c = {
                    'is-disabled': disabled
                },
                _c[styles.isDisabled] = disabled,
                _c)), onClick: this._onClick, ref: this._resolveRef('_link') }), children)));
        var _b, _c;
    };
    Link.prototype.focus = function () {
        if (this._link) {
            this._link.focus();
        }
    };
    Link.prototype._onClick = function (ev) {
        var onClick = this.props.onClick;
        if (onClick) {
            onClick(ev);
        }
    };
    return Link;
}(Utilities_1.BaseComponent));
__decorate([
    Utilities_1.autobind
], Link.prototype, "_onClick", null);
exports.Link = Link;



/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_a21de802',
    isEnabled: 'isEnabled_a21de802',
    isDisabled: 'isDisabled_a21de802',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_a21de802{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";margin:0;overflow:inherit;padding:0;text-overflow:inherit}.isEnabled_a21de802:focus,.isEnabled_a21de802:hover{color:" }, { "theme": "themeDarker", "defaultValue": "#004578" }, { "rawString": "}.isEnabled_a21de802:active{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.isDisabled_a21de802{color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";pointer-events:none;cursor:default}button.root_a21de802{background:0 0;border:none;cursor:pointer;display:inline;font-size:inherit}button.root_a21de802::-moz-focus-inner{border:0}button.root_a21de802{outline:transparent;position:relative}.ms-Fabric.is-focusVisible button.root_a21de802:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}html[dir=ltr] button.root_a21de802{text-align:left}html[dir=rtl] button.root_a21de802{text-align:right}a.root_a21de802{text-decoration:none}.ms-Fabric.is-focusVisible a.root_a21de802:focus{outline:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(207));



/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var RESIZE_DELAY = 16;
var MIN_SCROLL_UPDATE_DELAY = 100;
var MAX_SCROLL_UPDATE_DELAY = 500;
var IDLE_DEBOUNCE_DELAY = 200;
var DEFAULT_ITEMS_PER_PAGE = 10;
var DEFAULT_PAGE_HEIGHT = 30;
var DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
var DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
var EMPTY_RECT = {
    top: -1,
    bottom: -1,
    left: -1,
    right: -1,
    width: 0,
    height: 0
};
// Naming expensive measures so that they're named in profiles.
var _measurePageRect = function (element) { return element.getBoundingClientRect(); };
var _measureSurfaceRect = _measurePageRect;
var _measureScrollRect = _measurePageRect;
/**
 * The List renders virtualized pages of items. Each page's item count is determined by the getItemCountForPage callback if
 * provided by the caller, or 10 as default. Each page's height is determined by the getPageHeight callback if provided by
 * the caller, or by cached measurements if available, or by a running average, or a default fallback.
 *
 * The algorithm for rendering pages works like this:
 *
 * 1. Predict visible pages based on "current measure data" (page heights, surface position, visible window)
 * 2. If changes are necessary, apply changes (add/remove pages)
 * 3. For pages that are added, measure the page heights if we need to using getBoundingClientRect
 * 4. If measurements don't match predictions, update measure data and goto step 1 asynchronously
 *
 * Measuring too frequently can pull performance down significantly. To compensate, we cache measured values so that
 * we can avoid re-measuring during operations that should not alter heights, like scrolling.
 *
 * However, certain operations can make measure data stale. For example, resizing the list, or passing in new props,
 * or forcing an update change cause pages to shrink/grow. When these operations occur, we increment a measureVersion
 * number, which we associate with cached measurements and use to determine if a remeasure should occur.
 */
var List = (function (_super) {
    __extends(List, _super);
    function List(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            pages: []
        };
        _this._estimatedPageHeight = 0;
        _this._totalEstimates = 0;
        _this._requiredWindowsAhead = 0;
        _this._requiredWindowsBehind = 0;
        // Track the measure version for everything.
        _this._measureVersion = 0;
        // Ensure that scrolls are lazy updated.
        _this._onAsyncScroll = _this._async.debounce(_this._onAsyncScroll, MIN_SCROLL_UPDATE_DELAY, {
            leading: false,
            maxWait: MAX_SCROLL_UPDATE_DELAY
        });
        _this._onAsyncIdle = _this._async.debounce(_this._onAsyncIdle, IDLE_DEBOUNCE_DELAY, {
            leading: false
        });
        _this._onAsyncResize = _this._async.debounce(_this._onAsyncResize, RESIZE_DELAY, {
            leading: false
        });
        _this._cachedPageHeights = {};
        _this._estimatedPageHeight = 0;
        _this._focusedIndex = -1;
        _this._scrollingToIndex = -1;
        return _this;
    }
    /**
     * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
     * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
     *
     * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
     * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
     *
     * @param index Index of item to scroll to
     * @param measureItem Optional callback to measure the height of an individual item
     */
    List.prototype.scrollToIndex = function (index, measureItem) {
        var startIndex = this.props.startIndex;
        var renderCount = this._getRenderCount();
        var endIndex = startIndex + renderCount;
        var scrollTop = 0;
        var itemsPerPage = 1;
        for (var itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
            itemsPerPage = this._getItemCountForPage(itemIndex, this._allowedRect);
            var requestedIndexIsInPage = itemIndex <= index && (itemIndex + itemsPerPage) > index;
            if (requestedIndexIsInPage) {
                // We have found the page. If the user provided a way to measure an individual item, we will try to scroll in just
                // the given item, otherwise we'll only bring the page into view
                if (measureItem) {
                    // Adjust for actual item position within page
                    var itemPositionWithinPage = index - itemIndex;
                    for (var itemIndexInPage = 0; itemIndexInPage < itemPositionWithinPage; ++itemIndexInPage) {
                        scrollTop += measureItem(itemIndex + itemIndexInPage);
                    }
                    var scrollBottom = scrollTop + measureItem(index);
                    var scrollRect = _measureScrollRect(this._scrollElement);
                    var scrollWindow = {
                        top: this._scrollElement.scrollTop,
                        bottom: this._scrollElement.scrollTop + scrollRect.height
                    };
                    var itemIsFullyVisible = scrollTop >= scrollWindow.top && scrollBottom <= scrollWindow.bottom;
                    if (itemIsFullyVisible) {
                        // Item is already visible, do nothing.
                        return;
                    }
                    var itemIsPartiallyAbove = scrollTop < scrollWindow.top;
                    var itemIsPartiallyBelow = scrollBottom > scrollWindow.bottom;
                    if (itemIsPartiallyAbove) {
                        // We will just scroll to 'scrollTop'
                        //  ______
                        // |Item  |   - scrollTop
                        // |  ____|_
                        // |_|____| | - scrollWindow.top
                        //   |      |
                        //   |______|
                    }
                    else if (itemIsPartiallyBelow) {
                        // Adjust scrollTop position to just bring in the element
                        //  ______   - scrollTop
                        // |      |
                        // |  ____|_  - scrollWindow.bottom
                        // |_|____| |
                        //   | Item |
                        //   |______| - scrollBottom
                        scrollTop = this._scrollElement.scrollTop + (scrollBottom - scrollWindow.bottom);
                    }
                }
                this._scrollElement.scrollTop = scrollTop;
                break;
            }
            scrollTop += this._getPageHeight(itemIndex, itemsPerPage, this._surfaceRect);
        }
    };
    List.prototype.componentDidMount = function () {
        this._updatePages();
        this._measureVersion++;
        this._scrollElement = Utilities_1.findScrollableParent(this.refs.root);
        this._events.on(window, 'resize', this._onAsyncResize);
        this._events.on(this.refs.root, 'focus', this._onFocus, true);
        if (this._scrollElement) {
            this._events.on(this._scrollElement, 'scroll', this._onScroll);
            this._events.on(this._scrollElement, 'scroll', this._onAsyncScroll);
        }
    };
    List.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.items !== this.props.items ||
            newProps.renderCount !== this.props.renderCount ||
            newProps.startIndex !== this.props.startIndex) {
            this._measureVersion++;
            this._updatePages(newProps);
        }
    };
    List.prototype.shouldComponentUpdate = function (newProps, newState) {
        var _a = this.props, renderedWindowsAhead = _a.renderedWindowsAhead, renderedWindowsBehind = _a.renderedWindowsBehind;
        var oldPages = this.state.pages;
        var newPages = newState.pages, measureVersion = newState.measureVersion;
        var shouldComponentUpdate = false;
        if (this._measureVersion === measureVersion &&
            newProps.renderedWindowsAhead === renderedWindowsAhead,
            newProps.renderedWindowsBehind === renderedWindowsBehind,
            newProps.items === this.props.items &&
                oldPages.length === newPages.length) {
            for (var i = 0; i < oldPages.length; i++) {
                var oldPage = oldPages[i];
                var newPage = newPages[i];
                if ((oldPage.key !== newPage.key ||
                    oldPage.itemCount !== newPage.itemCount)) {
                    shouldComponentUpdate = true;
                    break;
                }
            }
        }
        else {
            shouldComponentUpdate = true;
        }
        return shouldComponentUpdate;
    };
    List.prototype.forceUpdate = function () {
        // Ensure that when the list is force updated we update the pages first before render.
        this._updateRenderRects(this.props, true);
        this._updatePages();
        this._measureVersion++;
        _super.prototype.forceUpdate.call(this);
    };
    List.prototype.render = function () {
        var _a = this.props, className = _a.className, role = _a.role;
        var pages = this.state.pages;
        var pageElements = [];
        var divProps = Utilities_1.getNativeProps(this.props, Utilities_1.divProperties);
        // assign list if no role
        role = (role === undefined) ? 'list' : role;
        for (var i = 0; i < pages.length; i++) {
            pageElements.push(this._renderPage(pages[i]));
        }
        return (React.createElement("div", __assign({ ref: 'root' }, divProps, { role: role, className: Utilities_1.css('ms-List', className) }),
            React.createElement("div", { ref: 'surface', className: 'ms-List-surface' }, pageElements)));
    };
    List.prototype._renderPage = function (page) {
        var _a = this.props, onRenderCell = _a.onRenderCell, role = _a.role;
        var cells = [];
        var pageStyle = this._getPageStyle(page);
        // only assign list item role if no role is assigned
        role = (role === undefined) ? 'listitem' : null;
        for (var i = 0; page.items && i < page.items.length; i++) {
            var item = page.items[i];
            var index = page.startIndex + i;
            var itemKey = this.props.getKey
                ? this.props.getKey(item, index)
                : item && item.key;
            if (itemKey === null || itemKey === undefined) {
                itemKey = index;
            }
            cells.push(React.createElement("div", { role: role, className: 'ms-List-cell', key: itemKey, "data-list-index": i + page.startIndex, "data-automationid": 'ListCell' }, onRenderCell(item, page.startIndex + i)));
        }
        return (React.createElement("div", { className: 'ms-List-page', key: page.key, ref: page.key, style: pageStyle }, cells));
    };
    /** Generate the style object for the page. */
    List.prototype._getPageStyle = function (page) {
        var style;
        var getPageStyle = this.props.getPageStyle;
        if (getPageStyle) {
            style = getPageStyle(page);
        }
        if (!page.items) {
            style = style || {};
            style.height = page.height;
        }
        return style;
    };
    /** Track the last item index focused so that we ensure we keep it rendered. */
    List.prototype._onFocus = function (ev) {
        var target = ev.target;
        while (target !== this.refs.surface) {
            var indexString = target.getAttribute('data-list-index');
            if (indexString) {
                this._focusedIndex = Number(indexString);
                break;
            }
            target = Utilities_1.getParent(target);
        }
    };
    /**
     * Called synchronously to reset the required render range to 0 on scrolling. After async scroll has executed,
     * we will call onAsyncIdle which will reset it back to it's correct value.
     */
    List.prototype._onScroll = function () {
        this._requiredWindowsAhead = 0;
        this._requiredWindowsBehind = 0;
    };
    /**
     * Debounced method to asynchronously update the visible region on a scroll event.
     */
    List.prototype._onAsyncScroll = function () {
        this._updateRenderRects();
        // Only update pages when the visible rect falls outside of the materialized rect.
        if (!this._materializedRect || !_isContainedWithin(this._requiredRect, this._materializedRect)) {
            this._updatePages();
        }
        else {
            // console.log('requiredRect contained in materialized', this._requiredRect, this._materializedRect);
        }
    };
    /**
     * This is an async debounced method that will try and increment the windows we render. If we can increment
     * either, we increase the amount we render and re-evaluate.
     */
    List.prototype._onAsyncIdle = function () {
        var _a = this.props, renderedWindowsAhead = _a.renderedWindowsAhead, renderedWindowsBehind = _a.renderedWindowsBehind;
        var _b = this, requiredWindowsAhead = _b._requiredWindowsAhead, requiredWindowsBehind = _b._requiredWindowsBehind;
        var windowsAhead = Math.min(renderedWindowsAhead, requiredWindowsAhead + 1);
        var windowsBehind = Math.min(renderedWindowsBehind, requiredWindowsBehind + 1);
        if (windowsAhead !== requiredWindowsAhead || windowsBehind !== requiredWindowsBehind) {
            // console.log('idling', windowsBehind, windowsAhead);
            this._requiredWindowsAhead = windowsAhead;
            this._requiredWindowsBehind = windowsBehind;
            this._updateRenderRects();
            this._updatePages();
        }
        if (renderedWindowsAhead > windowsAhead || renderedWindowsBehind > windowsBehind) {
            // Async increment on next tick.
            this._onAsyncIdle();
        }
    };
    List.prototype._onAsyncResize = function () {
        this.forceUpdate();
    };
    List.prototype._updatePages = function (props) {
        var _this = this;
        var _a = (props || this.props), items = _a.items, startIndex = _a.startIndex, renderCount = _a.renderCount;
        renderCount = this._getRenderCount(props);
        // console.log('updating pages');
        if (!this._requiredRect) {
            this._updateRenderRects(props);
        }
        var newListState = this._buildPages(items, startIndex, renderCount);
        var oldListPages = this.state.pages;
        this.setState(newListState, function () {
            // If measured version is invalid since we've updated the DOM
            var heightsChanged = _this._updatePageMeasurements(oldListPages, newListState.pages);
            // On first render, we should re-measure so that we don't get a visual glitch.
            if (heightsChanged) {
                _this._materializedRect = null;
                if (!_this._hasCompletedFirstRender) {
                    _this._hasCompletedFirstRender = true;
                    _this._updatePages();
                }
                else {
                    _this._onAsyncScroll();
                }
            }
            else {
                // Enqueue an idle bump.
                _this._onAsyncIdle();
            }
        });
    };
    List.prototype._updatePageMeasurements = function (oldPages, newPages) {
        var renderedIndexes = {};
        var heightChanged = false;
        var renderCount = this._getRenderCount();
        for (var i = 0; i < oldPages.length; i++) {
            var page = oldPages[i];
            if (page.items) {
                renderedIndexes[page.startIndex] = page;
            }
        }
        for (var i = 0; i < newPages.length; i++) {
            var page = newPages[i];
            if (page.items) {
                // Only evaluate page height if the page contains less items than total.
                if (page.items.length < renderCount) {
                    heightChanged = this._measurePage(page) || heightChanged;
                }
                if (!renderedIndexes[page.startIndex]) {
                    this._onPageAdded(page);
                }
                else {
                    delete renderedIndexes[page.startIndex];
                }
            }
        }
        for (var index in renderedIndexes) {
            if (renderedIndexes.hasOwnProperty(index)) {
                this._onPageRemoved(renderedIndexes[index]);
            }
        }
        return heightChanged;
    };
    /**
     * Given a page, measure its dimensions, update cache.
     * @returns True if the height has changed.
     */
    List.prototype._measurePage = function (page) {
        var hasChangedHeight = false;
        var pageElement = this.refs[page.key];
        var cachedHeight = this._cachedPageHeights[page.startIndex];
        // console.log('   * measure attempt', page.startIndex, cachedHeight);
        if (pageElement && (!cachedHeight || cachedHeight.measureVersion !== this._measureVersion)) {
            var newClientRect = _measurePageRect(pageElement);
            if (newClientRect.height || newClientRect.width) {
                hasChangedHeight = page.height !== newClientRect.height;
                // console.warn(' *** expensive page measure', page.startIndex, page.height, newClientRect.height);
                page.height = newClientRect.height;
                this._cachedPageHeights[page.startIndex] = {
                    height: newClientRect.height,
                    measureVersion: this._measureVersion
                };
                this._estimatedPageHeight = Math.round(((this._estimatedPageHeight * this._totalEstimates) + newClientRect.height) /
                    (this._totalEstimates + 1));
                this._totalEstimates++;
            }
        }
        return hasChangedHeight;
    };
    /** Called when a page has been added to the DOM. */
    List.prototype._onPageAdded = function (page) {
        var onPageAdded = this.props.onPageAdded;
        // console.log('page added', page.startIndex, this.state.pages.map(page=>page.key).join(', '));
        if (onPageAdded) {
            onPageAdded(page);
        }
    };
    /** Called when a page has been removed from the DOM. */
    List.prototype._onPageRemoved = function (page) {
        var onPageRemoved = this.props.onPageRemoved;
        // console.log('  --- page removed', page.startIndex, this.state.pages.map(page=>page.key).join(', '));
        if (onPageRemoved) {
            onPageRemoved(page);
        }
    };
    /** Build up the pages that should be rendered. */
    List.prototype._buildPages = function (items, startIndex, renderCount) {
        var materializedRect = Utilities_1.assign({}, EMPTY_RECT);
        var itemsPerPage = 1;
        var pages = [];
        var pageTop = 0;
        var currentSpacer = null;
        var focusedIndex = this._focusedIndex;
        var endIndex = startIndex + renderCount;
        // First render is very important to track; when we render cells, we have no idea of estimated page height.
        // So we should default to rendering only the first page so that we can get information.
        // However if the user provides a measure function, let's just assume they know the right heights.
        var isFirstRender = this._estimatedPageHeight === 0 && !this.props.getPageHeight;
        var _loop_1 = function (itemIndex) {
            itemsPerPage = this_1._getItemCountForPage(itemIndex, this_1._allowedRect);
            var pageHeight = this_1._getPageHeight(itemIndex, itemsPerPage, this_1._surfaceRect);
            var pageBottom = pageTop + pageHeight - 1;
            var isPageRendered = Utilities_1.findIndex(this_1.state.pages, function (page) { return page.items && page.startIndex === itemIndex; }) > -1;
            var isPageInAllowedRange = pageBottom >= this_1._allowedRect.top && pageTop <= this_1._allowedRect.bottom;
            var isPageInRequiredRange = pageBottom >= this_1._requiredRect.top && pageTop <= this_1._requiredRect.bottom;
            var isPageVisible = !isFirstRender && (isPageInRequiredRange || (isPageInAllowedRange && isPageRendered));
            var isPageFocused = focusedIndex >= itemIndex && focusedIndex < (itemIndex + itemsPerPage);
            var isFirstPage = itemIndex === startIndex;
            // console.log('building page', itemIndex, 'pageTop: ' + pageTop, 'inAllowed: ' + isPageInAllowedRange, 'inRequired: ' + isPageInRequiredRange);
            // Only render whats visible, focused, or first page.
            if (isPageVisible || isPageFocused || isFirstPage) {
                if (currentSpacer) {
                    pages.push(currentSpacer);
                    currentSpacer = null;
                }
                var itemsInPage = Math.min(itemsPerPage, endIndex - itemIndex);
                var newPage = this_1._createPage(null, items.slice(itemIndex, itemIndex + itemsInPage), itemIndex);
                newPage.top = pageTop;
                newPage.height = pageHeight;
                pages.push(newPage);
                if (isPageInRequiredRange) {
                    _mergeRect(materializedRect, {
                        top: pageTop,
                        bottom: pageBottom,
                        height: pageHeight,
                        left: this_1._allowedRect.left,
                        right: this_1._allowedRect.right,
                        width: this_1._allowedRect.width
                    });
                }
            }
            else {
                if (!currentSpacer) {
                    currentSpacer = this_1._createPage('spacer-' + itemIndex, null, itemIndex, 0);
                }
                currentSpacer.height = (currentSpacer.height || 0) + (pageBottom - pageTop) + 1;
                currentSpacer.itemCount += itemsPerPage;
            }
            pageTop += (pageBottom - pageTop + 1);
            if (isFirstRender) {
                return "break";
            }
        };
        var this_1 = this;
        for (var itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
            var state_1 = _loop_1(itemIndex);
            if (state_1 === "break")
                break;
        }
        if (currentSpacer) {
            currentSpacer.key = 'spacer-end';
            pages.push(currentSpacer);
        }
        this._materializedRect = materializedRect;
        // console.log('materialized: ', materializedRect);
        return {
            pages: pages,
            measureVersion: this._measureVersion
        };
    };
    /**
     * Get the pixel height of a give page. Will use the props getPageHeight first, and if not provided, fallback to
     * cached height, or estimated page height, or default page height.
     */
    List.prototype._getPageHeight = function (itemIndex, itemsPerPage, visibleRect) {
        if (this.props.getPageHeight) {
            return this.props.getPageHeight(itemIndex, visibleRect);
        }
        else {
            var cachedHeight = (this._cachedPageHeights[itemIndex]);
            return cachedHeight ? cachedHeight.height : (this._estimatedPageHeight || DEFAULT_PAGE_HEIGHT);
        }
    };
    List.prototype._getItemCountForPage = function (itemIndex, visibileRect) {
        var itemsPerPage = this.props.getItemCountForPage ? this.props.getItemCountForPage(itemIndex, visibileRect) : DEFAULT_ITEMS_PER_PAGE;
        return itemsPerPage ? itemsPerPage : DEFAULT_ITEMS_PER_PAGE;
    };
    List.prototype._createPage = function (pageKey, items, startIndex, count, style) {
        pageKey = pageKey || ('page-' + startIndex);
        // Fill undefined cells because array.map will ignore undefined cells.
        if (items) {
            for (var i = 0; i < items.length; i++) {
                items[i] = items[i] || null;
            }
        }
        return {
            key: pageKey,
            startIndex: startIndex === undefined ? -1 : startIndex,
            itemCount: (count === undefined) ? (items ? items.length : 0) : count,
            items: items,
            style: style || {},
            top: 0,
            height: 0
        };
    };
    List.prototype._getRenderCount = function (props) {
        var _a = props || this.props, items = _a.items, startIndex = _a.startIndex, renderCount = _a.renderCount;
        return (renderCount === undefined ? (items ? items.length - startIndex : 0) : renderCount);
    };
    /** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
    List.prototype._updateRenderRects = function (props, forceUpdate) {
        var _a = (props || this.props), renderedWindowsAhead = _a.renderedWindowsAhead, renderedWindowsBehind = _a.renderedWindowsBehind;
        var pages = this.state.pages;
        var renderCount = this._getRenderCount(props);
        var surfaceRect = this._surfaceRect;
        // WARNING: EXPENSIVE CALL! We need to know the surface top relative to the window.
        if (forceUpdate ||
            !pages ||
            !this._surfaceRect ||
            (pages.length > 0 && pages[0].items && pages[0].items.length < renderCount)) {
            surfaceRect = this._surfaceRect = _measureSurfaceRect(this.refs.surface);
        }
        // If the surface is above the container top or below the container bottom, or if this is not the first
        // render return empty rect.
        // The first time the list gets rendered we need to calculate the rectangle. The width of the list is
        // used to calculate the width of the list items.
        var visibleTop = Math.max(0, -surfaceRect.top);
        var visibleRect = {
            top: visibleTop,
            left: surfaceRect.left,
            bottom: visibleTop + window.innerHeight,
            right: surfaceRect.right,
            width: surfaceRect.width,
            height: window.innerHeight
        };
        // The required/allowed rects are adjusted versions of the visible rect.
        this._requiredRect = _expandRect(visibleRect, this._requiredWindowsBehind, this._requiredWindowsAhead);
        this._allowedRect = _expandRect(visibleRect, renderedWindowsBehind, renderedWindowsAhead);
    };
    return List;
}(Utilities_1.BaseComponent));
List.defaultProps = {
    startIndex: 0,
    onRenderCell: function (item, index, containsFocus) { return (React.createElement("div", null, (item && item.name) || '')); },
    renderedWindowsAhead: DEFAULT_RENDERED_WINDOWS_AHEAD,
    renderedWindowsBehind: DEFAULT_RENDERED_WINDOWS_BEHIND
};
exports.List = List;
function _expandRect(rect, pagesBefore, pagesAfter) {
    var top = rect.top - (pagesBefore * rect.height);
    var height = rect.height + ((pagesBefore + pagesAfter) * rect.height);
    return {
        top: top,
        bottom: top + height,
        height: height,
        left: rect.left,
        right: rect.right,
        width: rect.width
    };
}
function _isContainedWithin(innerRect, outerRect) {
    return (innerRect.top >= outerRect.top &&
        innerRect.left >= outerRect.left &&
        innerRect.bottom <= outerRect.bottom &&
        innerRect.right <= outerRect.right);
}
function _mergeRect(targetRect, newRect) {
    targetRect.top = (newRect.top < targetRect.top || targetRect.top === -1) ? newRect.top : targetRect.top;
    targetRect.left = (newRect.left < targetRect.left || targetRect.left === -1) ? newRect.left : targetRect.left;
    targetRect.bottom = (newRect.bottom > targetRect.bottom || targetRect.bottom === -1) ? newRect.bottom : targetRect.bottom;
    targetRect.right = (newRect.right > targetRect.right || targetRect.right === -1) ? newRect.right : targetRect.right;
    targetRect.width = targetRect.right - targetRect.left + 1;
    targetRect.height = targetRect.bottom - targetRect.top + 1;
    return targetRect;
}



/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(210));



/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(213);
var styles = stylesImport;
// We want to make the marquee selection start when the user drags a minimum distance. Otherwise we'd start
// the drag even if they just click an item without moving.
var MIN_DRAG_DISTANCE = 5;
/**
 * MarqueeSelection component abstracts managing a draggable rectangle which sets items selected/not selected.
 * Elements which have data-selectable-index attributes are queried and measured once to determine if they
 * fall within the bounds of the rectangle. The measure is memoized during the drag as a performance optimization
 * so if the items change sizes while dragging, that could cause incorrect results.
 */
var MarqueeSelection = (function (_super) {
    __extends(MarqueeSelection, _super);
    function MarqueeSelection(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            dragRect: undefined
        };
        return _this;
    }
    MarqueeSelection.prototype.componentDidMount = function () {
        this._scrollableParent = Utilities_1.findScrollableParent(this.refs.root);
        this._scrollableSurface = this._scrollableParent === window ? document.body : this._scrollableParent;
        // When scroll events come from window, we need to read scrollTop values from the body.
        this._events.on(this.props.isDraggingConstrainedToRoot ? this.refs.root : this._scrollableSurface, 'mousedown', this._onMouseDown);
    };
    MarqueeSelection.prototype.componentWillUnmount = function () {
        if (this._autoScroll) {
            this._autoScroll.dispose();
        }
    };
    MarqueeSelection.prototype.render = function () {
        var _a = this.props, rootProps = _a.rootProps, children = _a.children;
        var dragRect = this.state.dragRect;
        return (React.createElement("div", __assign({}, rootProps, { className: Utilities_1.css('ms-MarqueeSelection', styles.root, rootProps.className), ref: 'root' }),
            children,
            dragRect && (React.createElement("div", { className: Utilities_1.css('ms-MarqueeSelection-dragMask', styles.dragMask) })),
            dragRect && (React.createElement("div", { className: Utilities_1.css('ms-MarqueeSelection-box', styles.box), style: dragRect },
                React.createElement("div", { className: Utilities_1.css('ms-MarqueeSelection-boxFill', styles.boxFill) })))));
    };
    /** Determine if the mouse event occured on a scrollbar of the target element. */
    MarqueeSelection.prototype._isMouseEventOnScrollbar = function (ev) {
        var targetElement = ev.target;
        var targetScrollbarWidth = (targetElement.offsetWidth - targetElement.clientWidth);
        if (targetScrollbarWidth) {
            var targetRect = targetElement.getBoundingClientRect();
            // Check vertical scroll
            if (Utilities_1.getRTL()) {
                if (ev.clientX < (targetRect.left + targetScrollbarWidth)) {
                    return true;
                }
            }
            else {
                if (ev.clientX > (targetRect.left + targetElement.clientWidth)) {
                    return true;
                }
            }
            // Check horizontal scroll
            if (ev.clientY > (targetRect.top + targetElement.clientHeight)) {
                return true;
            }
        }
        return false;
    };
    MarqueeSelection.prototype._onMouseDown = function (ev) {
        var _a = this.props, isEnabled = _a.isEnabled, onShouldStartSelection = _a.onShouldStartSelection;
        // Ensure the mousedown is within the boundaries of the target. If not, it may have been a click on a scrollbar.
        if (this._isMouseEventOnScrollbar(ev)) {
            return;
        }
        if (isEnabled && !this._isDragStartInSelection(ev) && (!onShouldStartSelection || onShouldStartSelection(ev))) {
            if (this._scrollableSurface && ev.button === 0) {
                this._selectedIndicies = {};
                this._events.on(window, 'mousemove', this._onMouseMove);
                this._events.on(this._scrollableParent, 'scroll', this._onMouseMove);
                this._events.on(window, 'click', this._onMouseUp, true);
                this._autoScroll = new Utilities_1.AutoScroll(this.refs.root);
                this._scrollTop = this._scrollableSurface.scrollTop;
                this._rootRect = this.refs.root.getBoundingClientRect();
            }
        }
    };
    MarqueeSelection.prototype._getRootRect = function () {
        return {
            left: this._rootRect.left,
            top: this._rootRect.top + (this._scrollTop - this._scrollableSurface.scrollTop),
            width: this._rootRect.width,
            height: this._rootRect.height
        };
    };
    MarqueeSelection.prototype._onMouseMove = function (ev) {
        if (ev.clientX !== undefined) {
            this._lastMouseEvent = ev;
        }
        var rootRect = this._getRootRect();
        var currentPoint = { x: ev.clientX - rootRect.left, y: ev.clientY - rootRect.top };
        if (!this._dragOrigin) {
            this._dragOrigin = currentPoint;
        }
        if (ev.buttons !== undefined && ev.buttons === 0) {
            this._onMouseUp(ev);
        }
        else {
            if (this.state.dragRect || Utilities_1.getDistanceBetweenPoints(this._dragOrigin, currentPoint) > MIN_DRAG_DISTANCE) {
                // We need to constrain the current point to the rootRect boundaries.
                var constrainedPoint = this.props.isDraggingConstrainedToRoot ? {
                    x: Math.max(0, Math.min(rootRect.width, this._lastMouseEvent.clientX - rootRect.left)),
                    y: Math.max(0, Math.min(rootRect.height, this._lastMouseEvent.clientY - rootRect.top))
                } : {
                    x: this._lastMouseEvent.clientX - rootRect.left,
                    y: this._lastMouseEvent.clientY - rootRect.top
                };
                var dragRect = {
                    left: Math.min(this._dragOrigin.x, constrainedPoint.x),
                    top: Math.min(this._dragOrigin.y, constrainedPoint.y),
                    width: Math.abs(constrainedPoint.x - this._dragOrigin.x),
                    height: Math.abs(constrainedPoint.y - this._dragOrigin.y)
                };
                this.setState({ dragRect: dragRect });
                this._evaluateSelection(dragRect);
            }
        }
        ev.stopPropagation();
        ev.preventDefault();
        return false;
    };
    MarqueeSelection.prototype._onMouseUp = function (ev) {
        this._events.off(window);
        this._events.off(this._scrollableParent, 'scroll');
        this._autoScroll.dispose();
        this._autoScroll = this._dragOrigin = this._lastMouseEvent = this._selectedIndicies = this._itemRectCache = undefined;
        if (this.state.dragRect) {
            this.setState({
                dragRect: undefined
            });
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    MarqueeSelection.prototype._isPointInRectangle = function (rectangle, point) {
        return rectangle.top < point.y &&
            rectangle.bottom > point.y &&
            rectangle.left < point.x &&
            rectangle.right > point.x;
    };
    /**
     * We do not want to start the marquee if we're trying to marquee
     * from within an existing marquee selection.
     */
    MarqueeSelection.prototype._isDragStartInSelection = function (ev) {
        var selection = this.props.selection;
        if (selection && selection.getSelectedCount() === 0) {
            return false;
        }
        var allElements = this.refs.root.querySelectorAll('[data-selection-index]');
        for (var i = 0; i < allElements.length; i++) {
            var element = allElements[i];
            var index = Number(element.getAttribute('data-selection-index'));
            if (selection.isIndexSelected(index)) {
                var itemRect = element.getBoundingClientRect();
                if (this._isPointInRectangle(itemRect, { x: ev.x, y: ev.y })) {
                    return true;
                }
            }
        }
        return false;
    };
    MarqueeSelection.prototype._evaluateSelection = function (dragRect) {
        // Break early if we don't need to evaluate.
        if (!dragRect) {
            return;
        }
        var selection = this.props.selection;
        var rootRect = this._getRootRect();
        var allElements = this.refs.root.querySelectorAll('[data-selection-index]');
        if (!this._itemRectCache) {
            this._itemRectCache = {};
        }
        // Stop change events, clear selection to re-populate.
        selection.setChangeEvents(false);
        selection.setAllSelected(false);
        for (var i = 0; i < allElements.length; i++) {
            var element = allElements[i];
            var index = element.getAttribute('data-selection-index');
            // Pull the memoized rectangle for the item, or the get the rect and memoize.
            var itemRect = this._itemRectCache[index];
            if (!itemRect) {
                itemRect = element.getBoundingClientRect();
                // Normalize the item rect to the dragRect coordinates.
                itemRect = {
                    left: itemRect.left - rootRect.left,
                    top: itemRect.top - rootRect.top,
                    width: itemRect.width,
                    height: itemRect.height,
                    right: (itemRect.left - rootRect.left) + itemRect.width,
                    bottom: (itemRect.top - rootRect.top) + itemRect.height
                };
                if (itemRect.width > 0 && itemRect.height > 0) {
                    this._itemRectCache[index] = itemRect;
                }
            }
            if (itemRect.top < (dragRect.top + dragRect.height) &&
                itemRect.bottom > dragRect.top &&
                itemRect.left < (dragRect.left + dragRect.width) &&
                itemRect.right > dragRect.left) {
                this._selectedIndicies[index] = true;
            }
            else {
                delete this._selectedIndicies[index];
            }
        }
        for (var index in this._selectedIndicies) {
            if (this._selectedIndicies.hasOwnProperty(index)) {
                selection.setIndexSelected(Number(index), true, false);
            }
        }
        selection.setChangeEvents(true);
    };
    return MarqueeSelection;
}(Utilities_1.BaseComponent));
MarqueeSelection.defaultProps = {
    rootTagName: 'div',
    rootProps: {},
    isEnabled: true
};
__decorate([
    Utilities_1.autobind
], MarqueeSelection.prototype, "_onMouseDown", null);
exports.MarqueeSelection = MarqueeSelection;



/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_b827f3fe',
    dragMask: 'dragMask_b827f3fe',
    box: 'box_b827f3fe',
    boxFill: 'boxFill_b827f3fe',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_b827f3fe{position:relative;cursor:default}.dragMask_b827f3fe{position:absolute;background:rgba(255,0,0,0);left:0;top:0;right:0;bottom:0}.box_b827f3fe{position:absolute;box-sizing:border-box;border:1px solid " }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";pointer-events:none}.boxFill_b827f3fe{position:absolute;box-sizing:border-box;background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";opacity:.1;left:0;top:0;right:0;bottom:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var FocusZone_1 = __webpack_require__(8);
var Button_1 = __webpack_require__(33);
var stylesImport = __webpack_require__(215);
var styles = stylesImport;
// The number pixels per indentation level for Nav links.
var _indentationSize = 14;
// Tne number of pixels of left margin when there is expand/collaps button
var _indentWithExpandButton = 28;
// Tne number of pixels of left margin when there is expand/collaps button
var _indentNoExpandButton = 20;
// global var used in _isLinkSelectedKey
var _urlResolver;
var Nav = (function (_super) {
    __extends(Nav, _super);
    function Nav(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isGroupCollapsed: {},
            isLinkExpandStateChanged: false,
            selectedKey: props.initialSelectedKey || props.selectedKey,
        };
        _this._hasExpandButton = false;
        return _this;
    }
    Nav.prototype.render = function () {
        var _this = this;
        var _a = this.props, groups = _a.groups, className = _a.className, isOnTop = _a.isOnTop;
        if (!groups) {
            return null;
        }
        // when this.props.groups[x].name is specified or Any of the link has child link, chevorn Expand/collaps button is shown,
        // different padding is needed. _hasExpandButton marks this condition.
        this._hasExpandButton = groups.some(function (group, groupIndex) {
            return !!group && !!group.name || group.links && group.links.some(function (link, linkIndex) {
                return !!link && !!link.links && link.links.length > 0;
            });
        });
        var groupElements = groups.map(function (group, groupIndex) { return _this._renderGroup(group, groupIndex); });
        return (React.createElement(FocusZone_1.FocusZone, { direction: FocusZone_1.FocusZoneDirection.vertical },
            React.createElement("nav", { role: 'navigation', className: Utilities_1.css('ms-Nav', styles.root, className, (_b = {
                        'is-onTop ms-u-slideRightIn40': isOnTop
                    },
                    _b[styles.rootIsOnTop] = isOnTop,
                    _b)) }, groupElements)));
        var _b;
    };
    Object.defineProperty(Nav.prototype, "selectedKey", {
        get: function () {
            return this.state.selectedKey;
        },
        enumerable: true,
        configurable: true
    });
    Nav.prototype._renderAnchorLink = function (link, linkIndex, nestingLevel) {
        // Determine the appropriate padding to add before this link.
        // In RTL, the "before" padding will go on the right instead of the left.
        var isRtl = Utilities_1.getRTL();
        var paddingBefore = (_indentationSize * nestingLevel +
            (this._hasExpandButton ? _indentWithExpandButton : _indentNoExpandButton)).toString(10) + 'px';
        return (React.createElement("a", { className: Utilities_1.css('ms-Nav-link', styles.link), style: (_a = {}, _a[isRtl ? 'paddingRight' : 'paddingLeft'] = paddingBefore, _a), href: link.url || 'javascript:', onClick: this._onNavAnchorLinkClicked.bind(this, link), "aria-label": link.ariaLabel, title: link.title || link.name, target: link.target },
            link.iconClassName && React.createElement("i", { className: Utilities_1.css('ms-Icon', 'ms-Nav-IconLink', link.iconClassName, styles.iconLink) }),
            this.props.onRenderLink(link)));
        var _a;
    };
    Nav.prototype._renderButtonLink = function (link, linkIndex) {
        return (React.createElement(Button_1.CommandButton, { className: Utilities_1.css('ms-Nav-link ms-Nav-linkButton', styles.link, (_a = {
                    'isOnExpanded': this._hasExpandButton
                },
                _a[styles.linkIsOnExpanded] = this._hasExpandButton,
                _a)), href: link.url, iconProps: { iconName: link.icon }, description: link.title || link.name, onClick: this._onNavButtonLinkClicked.bind(this, link) }, link.name));
        var _a;
    };
    Nav.prototype._renderCompositeLink = function (link, linkIndex, nestingLevel) {
        var isLinkSelected = this._isLinkSelected(link);
        return (React.createElement("div", { key: link.key || linkIndex, className: Utilities_1.css('ms-Nav-compositeLink', styles.compositeLink, (_a = {
                    ' is-expanded': link.isExpanded,
                    'is-selected': isLinkSelected
                },
                _a[styles.compositeLinkIsExpanded] = link.isExpanded,
                _a[styles.compositeLinkIsSelected] = isLinkSelected,
                _a)) },
            (nestingLevel === 0 && link.links && link.links.length > 0 ?
                React.createElement("button", { className: Utilities_1.css('ms-Nav-chevronButton ms-Nav-chevronButton--link', styles.chevronButton, styles.chevronButtonLink), onClick: this._onLinkExpandClicked.bind(this, link), "aria-label": this.props.expandButtonAriaLabel, "aria-expanded": link.isExpanded ? 'true' : 'false' },
                    React.createElement("i", { className: Utilities_1.css('ms-Nav-chevron ms-Icon ms-Icon--ChevronDown', styles.chevronIcon) })) : null),
            !!link.onClick ? this._renderButtonLink(link, linkIndex) : this._renderAnchorLink(link, linkIndex, nestingLevel)));
        var _a;
    };
    Nav.prototype._renderLink = function (link, linkIndex, nestingLevel) {
        return (React.createElement("li", { key: link.key || linkIndex, role: 'listitem', className: Utilities_1.css(styles.navItem) },
            this._renderCompositeLink(link, linkIndex, nestingLevel),
            (link.isExpanded ? this._renderLinks(link.links, ++nestingLevel) : null)));
    };
    Nav.prototype._renderLinks = function (links, nestingLevel) {
        var _this = this;
        if (!links || !links.length) {
            return null;
        }
        var linkElements = links.map(function (link, linkIndex) { return _this._renderLink(link, linkIndex, nestingLevel); });
        return (React.createElement("ul", { role: 'list', "aria-label": this.props.ariaLabel, className: Utilities_1.css(styles.navItems) }, linkElements));
    };
    Nav.prototype._renderGroup = function (group, groupIndex) {
        var isGroupExpanded = !this.state.isGroupCollapsed[group.name];
        return (React.createElement("div", { key: groupIndex, className: Utilities_1.css('ms-Nav-group', styles.group, (_a = {
                    'is-expanded': isGroupExpanded
                },
                _a[styles.groupIsExpanded] = isGroupExpanded,
                _a)) },
            (group.name ?
                React.createElement("button", { className: Utilities_1.css('ms-Nav-chevronButton ms-Nav-chevronButton--group ms-Nav-groupHeaderFontSize', styles.chevronButton, styles.chevronButtonIsGroup, styles.groupHeaderFontSize), onClick: this._onGroupHeaderClicked.bind(this, group.name) },
                    React.createElement("i", { className: Utilities_1.css('ms-Nav-chevron ms-Icon ms-Icon--ChevronDown', styles.chevronIcon, isGroupExpanded && styles.chevronIsExpanded) }),
                    group.name) : null),
            React.createElement("div", { className: Utilities_1.css('ms-Nav-groupContent', 'ms-u-slideDownIn20', styles.groupContent) }, this._renderLinks(group.links, 0 /* nestingLevel */))));
        var _a;
    };
    Nav.prototype._onGroupHeaderClicked = function (groupKey, ev) {
        var isGroupCollapsed = this.state.isGroupCollapsed;
        isGroupCollapsed[groupKey] = !isGroupCollapsed[groupKey];
        this.setState({ isGroupCollapsed: isGroupCollapsed });
        ev.preventDefault();
        ev.stopPropagation();
    };
    Nav.prototype._onLinkExpandClicked = function (link, ev) {
        link.isExpanded = !link.isExpanded;
        this.setState({ isLinkExpandStateChanged: true });
        ev.preventDefault();
        ev.stopPropagation();
    };
    Nav.prototype._onNavAnchorLinkClicked = function (link, ev) {
        if (this.props.onLinkClick) {
            this.props.onLinkClick(ev, link);
        }
        this.setState({ selectedKey: link.key });
    };
    Nav.prototype._onNavButtonLinkClicked = function (link, ev) {
        if (link.onClick) {
            link.onClick(ev, link);
        }
        this.setState({ selectedKey: link.key });
    };
    Nav.prototype._isLinkSelected = function (link) {
        // if caller passes in selectedKey, use it as first choice or
        // if current state.selectedKey (from addressbar) is match to the link
        if (this.props.selectedKey !== undefined) {
            return link.key === this.props.selectedKey;
        }
        else if (this.state.selectedKey !== undefined && link.key === this.state.selectedKey) {
            return true;
        }
        // resolve is not supported for ssr
        if (typeof (window) === 'undefined') {
            return false;
        }
        if (!link.url) {
            return false;
        }
        _urlResolver = _urlResolver || document.createElement('a');
        _urlResolver.href = link.url || '';
        var target = _urlResolver.href;
        if (location.href === target) {
            return true;
        }
        if (location.protocol + '//' + location.host + location.pathname === target) {
            return true;
        }
        if (location.hash) {
            // Match the hash to the url.
            if (location.hash === link.url) {
                return true;
            }
            // Match a rebased url. (e.g. #foo becomes http://hostname/foo)
            _urlResolver.href = location.hash.substring(1);
            return _urlResolver.href === target;
        }
        return false;
    };
    return Nav;
}(Utilities_1.BaseComponent));
Nav.defaultProps = {
    groups: null,
    onRenderLink: function (link) { return (React.createElement("span", { className: Utilities_1.css('ms-Nav-linkText', styles.linkText) }, link.name)); }
};
exports.Nav = Nav;



/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_70e63a79',
    rootIsOnTop: 'rootIsOnTop_70e63a79',
    navItems: 'navItems_70e63a79',
    navItem: 'navItem_70e63a79',
    groupContent: 'groupContent_70e63a79',
    group: 'group_70e63a79',
    groupIsExpanded: 'groupIsExpanded_70e63a79',
    icon: 'icon_70e63a79',
    iconLink: 'iconLink_70e63a79',
    chevronButton: 'chevronButton_70e63a79',
    chevronButtonIsGroup: 'chevronButtonIsGroup_70e63a79',
    chevronIcon: 'chevronIcon_70e63a79',
    chevronIsExpanded: 'chevronIsExpanded_70e63a79',
    linkText: 'linkText_70e63a79',
    compositeLink: 'compositeLink_70e63a79',
    chevronButtonLink: 'chevronButtonLink_70e63a79',
    compositeLinkIsExpanded: 'compositeLinkIsExpanded_70e63a79',
    compositeLinkIsSelected: 'compositeLinkIsSelected_70e63a79',
    link: 'link_70e63a79',
    groupHeaderFontSize: 'groupHeaderFontSize_70e63a79',
    chevronButtonGroup: 'chevronButtonGroup_70e63a79',
    linkIsOnExpanded: 'linkIsOnExpanded_70e63a79',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_70e63a79{overflow-y:auto;-webkit-overflow-scrolling:touch;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.rootIsOnTop_70e63a79{position:absolute}.navItems_70e63a79{list-style-type:none}.navItems_70e63a79,.navItems_70e63a79>.navItem_70e63a79{padding:0}.groupContent_70e63a79{display:none;margin-bottom:40px}.group_70e63a79.groupIsExpanded_70e63a79 .groupContent_70e63a79{display:block}.icon_70e63a79{padding:0;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";background:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";transition:-webkit-transform .1s linear;transition:transform .1s linear;transition:transform .1s linear,-webkit-transform .1s linear}html[dir=ltr] .iconLink_70e63a79{margin-right:4px}html[dir=rtl] .iconLink_70e63a79{margin-left:4px}.chevronButton_70e63a79{display:block;font-weight:400;font-size:12px;line-height:36px;margin:5px 0;padding:0 20px 0 28px;background:0 0;border:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;cursor:pointer;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";background:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}html[dir=ltr] .chevronButton_70e63a79{text-align:left}html[dir=rtl] .chevronButton_70e63a79{text-align:right}html[dir=rtl] .chevronButton_70e63a79{padding:0 28px 0 20px}.chevronButton_70e63a79:visited{color:inherit}.chevronButton_70e63a79:hover{color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";background:" }, { "theme": "neutralLighterAlt", "defaultValue": "#f8f8f8" }, { "rawString": "}.chevronButton_70e63a79.chevronButtonIsGroup_70e63a79{width:100%;height:36px;border-bottom:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.chevronIcon_70e63a79{position:absolute;height:36px;line-height:36px;font-size:12px;transition:-webkit-transform .1s linear;transition:transform .1s linear;transition:transform .1s linear,-webkit-transform .1s linear}html[dir=ltr] .chevronIcon_70e63a79{left:8px}html[dir=rtl] .chevronIcon_70e63a79{right:8px}.chevronIsExpanded_70e63a79{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.linkText_70e63a79{vertical-align:middle}.compositeLink_70e63a79{display:block;position:relative;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";background:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.compositeLink_70e63a79 .chevronButton_70e63a79.chevronButtonLink_70e63a79{display:block;width:26px;height:34px;position:absolute;top:1px;z-index:1;padding:0;margin:0}html[dir=ltr] .compositeLink_70e63a79 .chevronButton_70e63a79.chevronButtonLink_70e63a79{left:1px}html[dir=rtl] .compositeLink_70e63a79 .chevronButton_70e63a79.chevronButtonLink_70e63a79{right:1px}.compositeLink_70e63a79 .chevronButton_70e63a79.chevronButtonLink_70e63a79 .chevronIcon_70e63a79{position:relative}.compositeLink_70e63a79 a{color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": "}.compositeLink_70e63a79:hover .chevronButton_70e63a79,.compositeLink_70e63a79:hover a{background:" }, { "theme": "neutralLighterAlt", "defaultValue": "#f8f8f8" }, { "rawString": ";color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": "}.compositeLink_70e63a79.compositeLinkIsExpanded_70e63a79 .chevronIcon_70e63a79{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 .chevronButton_70e63a79,.compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 a{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";background:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": "}.compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 .chevronButton_70e63a79:after,.compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 a:after{content:'';position:absolute;top:0;bottom:0}html[dir=ltr] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 .chevronButton_70e63a79:after,html[dir=ltr] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 a:after{border-left:2px solid " }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}html[dir=rtl] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 .chevronButton_70e63a79:after,html[dir=rtl] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 a:after{border-right:2px solid " }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}html[dir=ltr] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 .chevronButton_70e63a79:after,html[dir=ltr] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 a:after{right:0}html[dir=rtl] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 .chevronButton_70e63a79:after,html[dir=rtl] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 a:after{left:0}html[dir=ltr] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 .chevronButton_70e63a79:after,html[dir=ltr] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 a:after{left:0}html[dir=rtl] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 .chevronButton_70e63a79:after,html[dir=rtl] .compositeLink_70e63a79.compositeLinkIsSelected_70e63a79 a:after{right:0}.link_70e63a79{display:block;position:relative;height:36px;line-height:36px;text-decoration:none;padding:0 20px;cursor:pointer;text-overflow:ellipsis;text-decoration:none;white-space:nowrap;overflow:hidden}.groupHeaderFontSize_70e63a79{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:17px;font-weight:300}.chevronButtonGroup_70e63a79::-moz-focus-inner,.chevronButtonLink_70e63a79::-moz-focus-inner,.chevronButton_70e63a79::-moz-focus-inner,.link_70e63a79::-moz-focus-inner{border:0}.chevronButtonGroup_70e63a79,.chevronButtonLink_70e63a79,.chevronButton_70e63a79,.link_70e63a79{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .chevronButtonGroup_70e63a79:focus:after,.ms-Fabric.is-focusVisible .chevronButtonLink_70e63a79:focus:after,.ms-Fabric.is-focusVisible .chevronButton_70e63a79:focus:after,.ms-Fabric.is-focusVisible .link_70e63a79:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}html[dir=ltr] .root_70e63a79 .link_70e63a79{padding-left:20px}html[dir=rtl] .root_70e63a79 .link_70e63a79{padding-right:20px}.root_70e63a79 .link_70e63a79 .ms-Button-label{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}html[dir=ltr] .root_70e63a79 .link_70e63a79.linkIsOnExpanded_70e63a79{padding-left:28px}html[dir=rtl] .root_70e63a79 .link_70e63a79.linkIsOnExpanded_70e63a79{padding-right:28px}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(214));



/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(218);
var styles = stylesImport;
var Overlay = (function (_super) {
    __extends(Overlay, _super);
    function Overlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Overlay.prototype.componentDidMount = function () {
        Utilities_1.disableBodyScroll();
    };
    Overlay.prototype.componentWillUnmount = function () {
        Utilities_1.enableBodyScroll();
    };
    Overlay.prototype.render = function () {
        var _a = this.props, isDarkThemed = _a.isDarkThemed, className = _a.className;
        var divProps = Utilities_1.getNativeProps(this.props, Utilities_1.divProperties);
        var modifiedClassName = Utilities_1.css('ms-Overlay', styles.root, className, (_b = {},
            _b['ms-Overlay--dark ' + styles.rootIsDark] = isDarkThemed,
            _b));
        return (React.createElement("div", __assign({}, divProps, { className: modifiedClassName })));
        var _b;
    };
    return Overlay;
}(Utilities_1.BaseComponent));
exports.Overlay = Overlay;



/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_ffe62833',
    rootIsNone: 'rootIsNone_ffe62833',
    rootIsDark: 'rootIsDark_ffe62833',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_ffe62833{background-color:" }, { "theme": "whiteTranslucent40", "defaultValue": "rgba(255,255,255,.4)" }, { "rawString": ";position:absolute;bottom:0;left:0;right:0;top:0}.root_ffe62833.rootIsNone_ffe62833{visibility:hidden}.root_ffe62833.rootIsDark_ffe62833{background-color:" }, { "theme": "blackTranslucent40", "defaultValue": "rgba(0,0,0,.4)" }, { "rawString": "}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(217));



/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var index_1 = __webpack_require__(184);
var Panel_Props_1 = __webpack_require__(74);
var Layer_1 = __webpack_require__(38);
var Overlay_1 = __webpack_require__(151);
var Popup_1 = __webpack_require__(60);
var Button_1 = __webpack_require__(33);
var stylesImport = __webpack_require__(221);
var styles = stylesImport;
// Animation class constants.
var FADE_IN_200 = 'ms-u-fadeIn200';
var FADE_OUT_200 = 'ms-u-fadeOut200';
var SLIDE_LEFT_IN_40 = 'ms-u-slideLeftIn40';
var SLIDE_LEFT_OUT_40 = 'ms-u-slideLeftOut40';
var SLIDE_RIGHT_IN_40 = 'ms-u-slideRightIn40';
var SLIDE_RIGHT_OUT_40 = 'ms-u-slideRightOut40';
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel(props) {
        var _this = _super.call(this, props) || this;
        _this._onPanelClick = _this._onPanelClick.bind(_this);
        _this._onPanelRef = _this._onPanelRef.bind(_this);
        _this.state = {
            isFooterSticky: false,
            isOpen: !!props.isOpen,
            isAnimatingOpen: props.isOpen,
            isAnimatingClose: false,
            id: Utilities_1.getId('Panel')
        };
        return _this;
    }
    Panel.prototype.componentDidMount = function () {
        var _this = this;
        this._events.on(window, 'resize', this._updateFooterPosition);
        if (this.state.isOpen) {
            this._async.setTimeout(function () {
                _this.setState({
                    isAnimatingOpen: false
                });
            }, 2000);
        }
    };
    Panel.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.isOpen !== this.state.isOpen) {
            this.setState({
                isOpen: true,
                isAnimatingOpen: newProps.isOpen ? true : false,
                isAnimatingClose: newProps.isOpen ? false : true
            });
        }
    };
    Panel.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevState.isOpen === false) {
            this._updateFooterPosition();
        }
        if (prevState.isAnimatingClose === false &&
            this.state.isAnimatingClose === true &&
            this.props.onDismiss) {
            this.props.onDismiss();
        }
    };
    Panel.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, closeButtonAriaLabel = _a.closeButtonAriaLabel, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, firstFocusableSelector = _a.firstFocusableSelector, forceFocusInsideTrap = _a.forceFocusInsideTrap, hasCloseButton = _a.hasCloseButton, headerText = _a.headerText, ignoreExternalFocusing = _a.ignoreExternalFocusing, isBlocking = _a.isBlocking, isLightDismiss = _a.isLightDismiss, layerProps = _a.layerProps, type = _a.type, customWidth = _a.customWidth, _c = _a.onRenderNavigation, onRenderNavigation = _c === void 0 ? this._onRenderNavigation : _c, _d = _a.onRenderHeader, onRenderHeader = _d === void 0 ? this._onRenderHeader : _d, _e = _a.onRenderBody, onRenderBody = _e === void 0 ? this._onRenderBody : _e, _f = _a.onRenderFooter, onRenderFooter = _f === void 0 ? this._onRenderFooter : _f;
        var _g = this.state, isOpen = _g.isOpen, isAnimatingOpen = _g.isAnimatingOpen, isAnimatingClose = _g.isAnimatingClose, id = _g.id, isFooterSticky = _g.isFooterSticky;
        var isLeft = type === Panel_Props_1.PanelType.smallFixedNear ? true : false;
        var isRTL = Utilities_1.getRTL();
        var isOnRightSide = isRTL ? isLeft : !isLeft;
        var headerTextId = id + '-headerText';
        var customWidthStyles = (type === Panel_Props_1.PanelType.custom) ? { width: customWidth } : {};
        if (!isOpen) {
            return null;
        }
        var overlay;
        if (isBlocking) {
            overlay = (React.createElement(Overlay_1.Overlay, { className: Utilities_1.css(styles.overlay, (_h = {},
                    _h[FADE_IN_200] = isAnimatingOpen,
                    _h[FADE_OUT_200] = isAnimatingClose,
                    _h)), isDarkThemed: false, onClick: isLightDismiss ? this._onPanelClick : null }));
        }
        return (React.createElement(Layer_1.Layer, __assign({}, layerProps),
            React.createElement(Popup_1.Popup, { role: 'dialog', ariaLabelledBy: headerText && headerTextId, onDismiss: this.props.onDismiss },
                React.createElement("div", { ref: this._onPanelRef, className: Utilities_1.css('ms-Panel', styles.root, className, (_j = {},
                        // because the RTL animations are not being used, we need to set a class
                        _j['is-open ' + styles.rootIsOpen] = isOpen,
                        _j['ms-Panel--smFluid ' + styles.rootIsSmallFluid] = type === Panel_Props_1.PanelType.smallFluid,
                        _j['ms-Panel--smLeft ' + styles.rootIsSmallLeft] = type === Panel_Props_1.PanelType.smallFixedNear,
                        _j['ms-Panel--sm ' + styles.rootIsSmall] = type === Panel_Props_1.PanelType.smallFixedFar,
                        _j['ms-Panel--md ' + styles.rootIsMedium] = type === Panel_Props_1.PanelType.medium,
                        _j['ms-Panel--lg ' + styles.rootIsLarge] = type === Panel_Props_1.PanelType.large || type === Panel_Props_1.PanelType.largeFixed,
                        _j['ms-Panel--fixed ' + styles.rootIsFixed] = type === Panel_Props_1.PanelType.largeFixed,
                        _j['ms-Panel--xl ' + styles.rootIsXLarge] = type === Panel_Props_1.PanelType.extraLarge,
                        _j['ms-Panel--custom ' + styles.rootIsCustom] = type === Panel_Props_1.PanelType.custom,
                        _j['ms-Panel--hasCloseButton ' + styles.rootHasCloseButton] = hasCloseButton,
                        _j)) },
                    overlay,
                    React.createElement(index_1.FocusTrapZone, { className: Utilities_1.css('ms-Panel-main', styles.main, (_k = {},
                            _k[SLIDE_RIGHT_IN_40] = isAnimatingOpen && !isOnRightSide,
                            _k[SLIDE_LEFT_IN_40] = isAnimatingOpen && isOnRightSide,
                            _k[SLIDE_LEFT_OUT_40] = isAnimatingClose && !isOnRightSide,
                            _k[SLIDE_RIGHT_OUT_40] = isAnimatingClose && isOnRightSide,
                            _k)), style: customWidthStyles, elementToFocusOnDismiss: elementToFocusOnDismiss, isClickableOutsideFocusTrap: isLightDismiss, ignoreExternalFocusing: ignoreExternalFocusing, forceFocusInsideTrap: forceFocusInsideTrap, firstFocusableSelector: firstFocusableSelector },
                        React.createElement("div", { className: Utilities_1.css('ms-Panel-commands'), "data-is-visible": true }, onRenderNavigation(this.props, this._onRenderNavigation)),
                        React.createElement("div", { className: Utilities_1.css('ms-Panel-contentInner', styles.contentInner) },
                            onRenderHeader(this.props, this._onRenderHeader),
                            onRenderBody(this.props, this._onRenderBody),
                            onRenderFooter(this.props, this._onRenderFooter)))))));
        var _h, _j, _k;
    };
    Panel.prototype.dismiss = function () {
        if (this.state.isOpen) {
            this.setState({
                isAnimatingOpen: false,
                isAnimatingClose: true
            });
        }
    };
    Panel.prototype._onRenderNavigation = function (props) {
        var closeButtonAriaLabel = props.closeButtonAriaLabel, hasCloseButton = props.hasCloseButton;
        return (hasCloseButton &&
            React.createElement(Button_1.IconButton, { className: Utilities_1.css('ms-Panel-closeButton ms-PanelAction-close', styles.closeButton), onClick: this._onPanelClick, ariaLabel: closeButtonAriaLabel, "data-is-visible": true, iconProps: { iconName: 'Cancel' } }));
    };
    Panel.prototype._onRenderHeader = function (props) {
        var headerText = props.headerText, headerTextId = props.headerTextId, _a = props.headerClassName, headerClassName = _a === void 0 ? '' : _a;
        return (headerText &&
            React.createElement("div", { className: Utilities_1.css('ms-Panel-header', styles.header) },
                React.createElement("p", { className: Utilities_1.css('ms-Panel-headerText', styles.headerText, headerClassName), id: headerTextId, role: 'heading' }, headerText)));
    };
    Panel.prototype._onRenderBody = function (props) {
        return (React.createElement("div", { className: Utilities_1.css('ms-Panel-content', styles.content), ref: this._resolveRef('_content') }, props.children));
    };
    Panel.prototype._onRenderFooter = function (props) {
        var isFooterSticky = this.state.isFooterSticky;
        var _a = this.props.onRenderFooterContent, onRenderFooterContent = _a === void 0 ? null : _a;
        return (onRenderFooterContent != null &&
            React.createElement("div", { className: Utilities_1.css('ms-Panel-footer', styles.footer, isFooterSticky && styles.footerIsSticky) },
                React.createElement("div", { className: Utilities_1.css('ms-Panel-footerInner', styles.footerInner) }, onRenderFooterContent())));
    };
    Panel.prototype._updateFooterPosition = function () {
        var _content = this._content;
        if (_content) {
            var height = _content.clientHeight;
            var innerHeight_1 = _content.scrollHeight;
            this.setState({
                isFooterSticky: height < innerHeight_1 ? true : false
            });
        }
    };
    Panel.prototype._onPanelClick = function () {
        this.dismiss();
    };
    Panel.prototype._onPanelRef = function (ref) {
        if (ref) {
            this._events.on(ref, 'animationend', this._onAnimationEnd);
        }
        else {
            this._events.off();
        }
    };
    Panel.prototype._onAnimationEnd = function (ev) {
        if (ev.animationName.indexOf('In') > -1) {
            this.setState({
                isOpen: true,
                isAnimatingOpen: false
            });
        }
        if (ev.animationName.indexOf('Out') > -1) {
            this.setState({
                isOpen: false,
                isAnimatingClose: false
            });
            if (this.props.onDismissed) {
                this.props.onDismissed();
            }
        }
    };
    return Panel;
}(Utilities_1.BaseComponent));
Panel.defaultProps = {
    isOpen: false,
    isBlocking: true,
    hasCloseButton: true,
    type: Panel_Props_1.PanelType.smallFixedFar,
};
__decorate([
    Utilities_1.autobind
], Panel.prototype, "_onRenderNavigation", null);
__decorate([
    Utilities_1.autobind
], Panel.prototype, "_onRenderHeader", null);
__decorate([
    Utilities_1.autobind
], Panel.prototype, "_onRenderBody", null);
__decorate([
    Utilities_1.autobind
], Panel.prototype, "_onRenderFooter", null);
exports.Panel = Panel;



/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_3b8c52d1',
    overlay: 'overlay_3b8c52d1',
    main: 'main_3b8c52d1',
    rootIsSmall: 'rootIsSmall_3b8c52d1',
    rootIsSmallLeft: 'rootIsSmallLeft_3b8c52d1',
    rootIsSmallFluid: 'rootIsSmallFluid_3b8c52d1',
    rootIsMedium: 'rootIsMedium_3b8c52d1',
    rootIsLarge: 'rootIsLarge_3b8c52d1',
    rootIsXLarge: 'rootIsXLarge_3b8c52d1',
    rootIsCustom: 'rootIsCustom_3b8c52d1',
    rootIsFixed: 'rootIsFixed_3b8c52d1',
    rootIsOpen: 'rootIsOpen_3b8c52d1',
    closeButton: 'closeButton_3b8c52d1',
    contentInner: 'contentInner_3b8c52d1',
    rootHasCloseButton: 'rootHasCloseButton_3b8c52d1',
    header: 'header_3b8c52d1',
    content: 'content_3b8c52d1',
    footerInner: 'footerInner_3b8c52d1',
    footer: 'footer_3b8c52d1',
    footerIsSticky: 'footerIsSticky_3b8c52d1',
    headerText: 'headerText_3b8c52d1',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_3b8c52d1{display:none;pointer-events:none;position:absolute;top:0;left:0;right:0;bottom:0}.root_3b8c52d1 .overlay_3b8c52d1{display:none;pointer-events:none;opacity:1;cursor:pointer;transition:opacity 367ms cubic-bezier(.1,.9,.2,1)}.main_3b8c52d1{background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";position:absolute;width:100%;bottom:0;top:0;display:none;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}html[dir=ltr] .main_3b8c52d1{right:0}html[dir=rtl] .main_3b8c52d1{left:0}@media (min-width:480px){.main_3b8c52d1{border-left:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";border-right:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";pointer-events:auto;width:340px;box-shadow:-30px 0 30px -30px rgba(0,0,0,.2)}html[dir=ltr] .main_3b8c52d1{left:auto}html[dir=rtl] .main_3b8c52d1{right:auto}}.root_3b8c52d1.rootIsSmall_3b8c52d1 .main_3b8c52d1{width:272px}@media (min-width:480px){.root_3b8c52d1.rootIsSmall_3b8c52d1 .main_3b8c52d1{width:340px}}.root_3b8c52d1.rootIsSmallLeft_3b8c52d1 .main_3b8c52d1{width:272px;box-shadow:30px 0 30px -30px rgba(0,0,0,.2)}html[dir=ltr] .root_3b8c52d1.rootIsSmallLeft_3b8c52d1 .main_3b8c52d1{right:auto}html[dir=rtl] .root_3b8c52d1.rootIsSmallLeft_3b8c52d1 .main_3b8c52d1{left:auto}html[dir=ltr] .root_3b8c52d1.rootIsSmallLeft_3b8c52d1 .main_3b8c52d1{left:0}html[dir=rtl] .root_3b8c52d1.rootIsSmallLeft_3b8c52d1 .main_3b8c52d1{right:0}.root_3b8c52d1.rootIsSmallFluid_3b8c52d1 .main_3b8c52d1{width:100%}@media (min-width:640px){.root_3b8c52d1.rootIsCustom_3b8c52d1 .main_3b8c52d1,.root_3b8c52d1.rootIsLarge_3b8c52d1 .main_3b8c52d1,.root_3b8c52d1.rootIsMedium_3b8c52d1 .main_3b8c52d1,.root_3b8c52d1.rootIsXLarge_3b8c52d1 .main_3b8c52d1{width:auto}html[dir=ltr] .root_3b8c52d1.rootIsCustom_3b8c52d1 .main_3b8c52d1,html[dir=ltr] .root_3b8c52d1.rootIsLarge_3b8c52d1 .main_3b8c52d1,html[dir=ltr] .root_3b8c52d1.rootIsMedium_3b8c52d1 .main_3b8c52d1,html[dir=ltr] .root_3b8c52d1.rootIsXLarge_3b8c52d1 .main_3b8c52d1{left:48px}html[dir=rtl] .root_3b8c52d1.rootIsCustom_3b8c52d1 .main_3b8c52d1,html[dir=rtl] .root_3b8c52d1.rootIsLarge_3b8c52d1 .main_3b8c52d1,html[dir=rtl] .root_3b8c52d1.rootIsMedium_3b8c52d1 .main_3b8c52d1,html[dir=rtl] .root_3b8c52d1.rootIsXLarge_3b8c52d1 .main_3b8c52d1{right:48px}}@media (min-width:1024px){.root_3b8c52d1.rootIsMedium_3b8c52d1 .main_3b8c52d1{width:643px}html[dir=ltr] .root_3b8c52d1.rootIsMedium_3b8c52d1 .main_3b8c52d1{left:auto}html[dir=rtl] .root_3b8c52d1.rootIsMedium_3b8c52d1 .main_3b8c52d1{right:auto}}@media (min-width:1366px){html[dir=ltr] .root_3b8c52d1.rootIsLarge_3b8c52d1 .main_3b8c52d1{left:428px}html[dir=rtl] .root_3b8c52d1.rootIsLarge_3b8c52d1 .main_3b8c52d1{right:428px}}@media (min-width:1366px){.root_3b8c52d1.rootIsLarge_3b8c52d1.rootIsFixed_3b8c52d1 .main_3b8c52d1{width:940px}html[dir=ltr] .root_3b8c52d1.rootIsLarge_3b8c52d1.rootIsFixed_3b8c52d1 .main_3b8c52d1{left:auto}html[dir=rtl] .root_3b8c52d1.rootIsLarge_3b8c52d1.rootIsFixed_3b8c52d1 .main_3b8c52d1{right:auto}}@media (min-width:1366px){html[dir=ltr] .root_3b8c52d1.rootIsXLarge_3b8c52d1 .main_3b8c52d1{left:176px}html[dir=rtl] .root_3b8c52d1.rootIsXLarge_3b8c52d1 .main_3b8c52d1{right:176px}}@media (min-width:1024px){html[dir=ltr] .root_3b8c52d1.rootIsCustom_3b8c52d1 .main_3b8c52d1{left:auto}html[dir=rtl] .root_3b8c52d1.rootIsCustom_3b8c52d1 .main_3b8c52d1{right:auto}}.root_3b8c52d1.rootIsOpen_3b8c52d1{display:block}.root_3b8c52d1.rootIsOpen_3b8c52d1 .main_3b8c52d1{opacity:1;pointer-events:auto;display:block}.root_3b8c52d1.rootIsOpen_3b8c52d1 .overlay_3b8c52d1{cursor:pointer;display:block;pointer-events:auto}@media screen and (-ms-high-contrast:active){.root_3b8c52d1.rootIsOpen_3b8c52d1 .overlay_3b8c52d1{opacity:0}}.closeButton_3b8c52d1{background:0 0;border:0;cursor:pointer;position:absolute;top:0;height:44px;width:44px;line-height:44px;padding:0;color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";font-size:20px}html[dir=ltr] .closeButton_3b8c52d1{right:4px}html[dir=rtl] .closeButton_3b8c52d1{left:4px}.closeButton_3b8c52d1:hover{color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": "}.contentInner_3b8c52d1{position:absolute;top:0;bottom:0;left:0;right:0;overflow-y:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-overflow-scrolling:touch;-webkit-transform:translateZ(0);transform:translateZ(0)}.rootHasCloseButton_3b8c52d1 .contentInner_3b8c52d1{top:44px}.content_3b8c52d1,.footerInner_3b8c52d1,.header_3b8c52d1{padding-left:16px;padding-right:16px}@media (min-width:640px){.content_3b8c52d1,.footerInner_3b8c52d1,.header_3b8c52d1{padding-left:32px;padding-right:32px}}@media (min-width:1366px){.content_3b8c52d1,.footerInner_3b8c52d1,.header_3b8c52d1{padding-left:40px;padding-right:40px}}.header_3b8c52d1{margin:14px 0;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0}@media (min-width:1024px){.header_3b8c52d1{margin-top:30px}}.content_3b8c52d1{margin-bottom:0;overflow-y:auto}.footer_3b8c52d1{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;border-top:1px solid transparent;transition:border 367ms cubic-bezier(.1,.25,.75,.9)}.footerInner_3b8c52d1{padding-bottom:20px;padding-top:20px}.footerIsSticky_3b8c52d1{background:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";border-top-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.headerText_3b8c52d1{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:21px;font-weight:100;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";line-height:32px;margin:0}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(220));
__export(__webpack_require__(74));



/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
/**
 * This adds accessibility to Dialog and Panel controls
 */
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.prototype.componentWillMount = function () {
        this._originalFocusedElement = Utilities_1.getDocument().activeElement;
    };
    Popup.prototype.componentDidMount = function () {
        this._events.on(this.refs.root, 'focus', this._onFocus, true);
        this._events.on(this.refs.root, 'blur', this._onBlur, true);
        if (Utilities_1.doesElementContainFocus(this.refs.root)) {
            this._containsFocus = true;
        }
    };
    Popup.prototype.componentWillUnmount = function () {
        if (this.props.shouldRestoreFocus &&
            this._originalFocusedElement &&
            this._containsFocus &&
            this._originalFocusedElement !== window) {
            // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
            // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
            // to reset the focus back to the thing it thinks should have been focused.
            if (this._originalFocusedElement) {
                this._originalFocusedElement.focus();
            }
        }
    };
    Popup.prototype.render = function () {
        var _a = this.props, role = _a.role, className = _a.className, ariaLabelledBy = _a.ariaLabelledBy, ariaDescribedBy = _a.ariaDescribedBy;
        return (React.createElement("div", __assign({ ref: 'root' }, Utilities_1.getNativeProps(this.props, Utilities_1.divProperties), { className: className, role: role, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, onKeyDown: this._onKeyDown }), this.props.children));
    };
    Popup.prototype._onKeyDown = function (ev) {
        switch (ev.which) {
            case Utilities_1.KeyCodes.escape:
                if (this.props.onDismiss) {
                    this.props.onDismiss(ev);
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                break;
        }
    };
    Popup.prototype._onFocus = function () {
        this._containsFocus = true;
    };
    Popup.prototype._onBlur = function () {
        this._containsFocus = false;
    };
    return Popup;
}(Utilities_1.BaseComponent));
Popup.defaultProps = {
    shouldRestoreFocus: true
};
__decorate([
    Utilities_1.autobind
], Popup.prototype, "_onKeyDown", null);
exports.Popup = Popup;



/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(223));



/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var Spinner_Props_1 = __webpack_require__(75);
var stylesImport = __webpack_require__(226);
var styles = stylesImport;
var Spinner = (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spinner.prototype.render = function () {
        var _a = this.props, type = _a.type, size = _a.size, label = _a.label, className = _a.className; // TODO remove deprecated type property at >= 2.0.0
        return (React.createElement("div", { className: Utilities_1.css('ms-Spinner', styles.root, className) },
            React.createElement("div", { className: Utilities_1.css('ms-Spinner-circle', styles.circle, (_b = {},
                    _b['ms-Spinner--xSmall ' + styles.circleIsXSmall] = size === Spinner_Props_1.SpinnerSize.xSmall,
                    _b['ms-Spinner--small ' + styles.circleIsSmall] = size === Spinner_Props_1.SpinnerSize.small,
                    _b['ms-Spinner--medium ' + styles.circleIsMedium] = size === Spinner_Props_1.SpinnerSize.medium,
                    _b['ms-Spinner--large ' + styles.circleIsLarge] = size === Spinner_Props_1.SpinnerSize.large,
                    _b['ms-Spinner--normal ' + styles.circleIsTypeMedium] = type === Spinner_Props_1.SpinnerType.normal,
                    _b['ms-Spinner--large ' + styles.circleIsTypeLarge] = type === Spinner_Props_1.SpinnerType.large // TODO remove deprecated value at >= 2.0.0
                ,
                    _b)) }),
            label && (React.createElement("div", { className: Utilities_1.css('ms-Spinner-label', styles.label) }, label))));
        var _b;
    };
    return Spinner;
}(Utilities_1.BaseComponent));
Spinner.defaultProps = {
    size: Spinner_Props_1.SpinnerSize.medium
};
exports.Spinner = Spinner;



/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_63d97cc2',
    circle: 'circle_63d97cc2',
    spinAnimation: 'spinAnimation_63d97cc2',
    circleIsXSmall: 'circleIsXSmall_63d97cc2',
    circleIsSmall: 'circleIsSmall_63d97cc2',
    circleIsTypeMedium: 'circleIsTypeMedium_63d97cc2',
    circleIsMedium: 'circleIsMedium_63d97cc2',
    circleIsTypeLarge: 'circleIsTypeLarge_63d97cc2',
    circleIsLarge: 'circleIsLarge_63d97cc2',
    label: 'label_63d97cc2',
};
load_themed_styles_1.loadStyles([{ "rawString": "@-webkit-keyframes spinAnimation_63d97cc2{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinAnimation_63d97cc2{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.root_63d97cc2>.circle_63d97cc2{margin:auto;box-sizing:border-box;border-radius:50%;width:100%;height:100%;border:1.5px solid " }, { "theme": "themeLight", "defaultValue": "#c7e0f4" }, { "rawString": ";border-top-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";-webkit-animation:spinAnimation_63d97cc2 1.3s infinite cubic-bezier(.53,.21,.29,.67);animation:spinAnimation_63d97cc2 1.3s infinite cubic-bezier(.53,.21,.29,.67)}.root_63d97cc2>.circle_63d97cc2.circleIsXSmall_63d97cc2{width:12px;height:12px}.root_63d97cc2>.circle_63d97cc2.circleIsSmall_63d97cc2{width:16px;height:16px}.root_63d97cc2>.circle_63d97cc2.circleIsMedium_63d97cc2,.root_63d97cc2>.circle_63d97cc2.circleIsTypeMedium_63d97cc2{width:20px;height:20px}.root_63d97cc2>.circle_63d97cc2.circleIsLarge_63d97cc2,.root_63d97cc2>.circle_63d97cc2.circleIsTypeLarge_63d97cc2{width:28px;height:28px}.root_63d97cc2>.label_63d97cc2{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";margin-top:10px;text-align:center}@media screen and (-ms-high-contrast:active){.root_63d97cc2>.circle_63d97cc2{border-top-style:none}}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(225));
__export(__webpack_require__(75));



/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Label_1 = __webpack_require__(147);
var Utilities_1 = __webpack_require__(1);
var stylesImport = __webpack_require__(229);
var styles = stylesImport;
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField(props) {
        var _this = _super.call(this, props) || this;
        _this._warnMutuallyExclusive({
            'value': 'defaultValue'
        });
        _this._id = Utilities_1.getId('TextField');
        _this._descriptionId = Utilities_1.getId('TextFieldDescription');
        _this.state = {
            value: props.value || props.defaultValue || '',
            isFocused: false,
            errorMessage: ''
        };
        _this._onInputChange = _this._onInputChange.bind(_this);
        _this._onFocus = _this._onFocus.bind(_this);
        _this._onBlur = _this._onBlur.bind(_this);
        _this._delayedValidate = _this._async.debounce(_this._validate, _this.props.deferredValidationTime);
        _this._lastValidation = 0;
        _this._isDescriptionAvailable = false;
        return _this;
    }
    Object.defineProperty(TextField.prototype, "value", {
        /**
         * Gets the current value of the text field.
         */
        get: function () {
            return this.state.value;
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype.componentDidMount = function () {
        this._isMounted = true;
        this._adjustInputHeight();
        if (this.props.validateOnLoad) {
            this._validate(this.state.value);
        }
    };
    TextField.prototype.componentWillReceiveProps = function (newProps) {
        var onBeforeChange = this.props.onBeforeChange;
        if (newProps.value !== undefined && newProps.value !== this.state.value) {
            if (onBeforeChange) {
                onBeforeChange(newProps.value);
            }
            this._latestValue = newProps.value;
            this.setState({
                value: newProps.value,
                errorMessage: ''
            });
            this._delayedValidate(newProps.value);
        }
    };
    TextField.prototype.componentWillUnmount = function () {
        this._isMounted = false;
    };
    TextField.prototype.render = function () {
        var _a = this.props, className = _a.className, description = _a.description, disabled = _a.disabled, iconClass = _a.iconClass, label = _a.label, multiline = _a.multiline, required = _a.required, underlined = _a.underlined, borderless = _a.borderless, addonString = _a.addonString, _b = _a.onRenderAddon, onRenderAddon = _b === void 0 ? this._onRenderAddon : _b;
        var isFocused = this.state.isFocused;
        var errorMessage = this._errorMessage;
        this._isDescriptionAvailable = Boolean(description || errorMessage);
        var textFieldClassName = Utilities_1.css('ms-TextField', styles.root, className, (_c = {},
            _c['is-required ' + styles.rootIsRequired] = required,
            _c['is-disabled ' + styles.rootIsDisabled] = disabled,
            _c['is-active ' + styles.rootIsActive] = isFocused,
            _c['ms-TextField--multiline ' + styles.rootIsMultiline] = multiline,
            _c['ms-TextField--underlined ' + styles.rootIsUnderlined] = underlined,
            _c['ms-TextField--borderless ' + styles.rootIsBorderless] = borderless,
            _c));
        return (React.createElement("div", { className: textFieldClassName },
            label && React.createElement(Label_1.Label, { htmlFor: this._id }, label),
            React.createElement("div", { className: Utilities_1.css(styles.fieldGroup, isFocused && styles.fieldGroupIsFocused) },
                (addonString !== undefined || this.props.onRenderAddon) && (React.createElement("div", { className: Utilities_1.css(styles.fieldAddon) }, onRenderAddon(this.props, this._onRenderAddon))),
                multiline ? this._renderTextArea() : this._renderInput(),
                iconClass && React.createElement("i", { className: Utilities_1.css(iconClass, styles.icon) })),
            this._isDescriptionAvailable &&
                React.createElement("span", { id: this._descriptionId },
                    description && React.createElement("span", { className: Utilities_1.css('ms-TextField-description', styles.description) }, description),
                    errorMessage &&
                        React.createElement("div", { "aria-live": 'assertive' },
                            React.createElement(Utilities_1.DelayedRender, null,
                                React.createElement("p", { className: Utilities_1.css('ms-TextField-errorMessage ms-u-slideDownIn20', styles.errorMessage), "data-automation-id": 'error-message' },
                                    React.createElement("i", { className: Utilities_1.css('ms-Icon ms-Icon--Error', styles.errorIcon), "aria-hidden": 'true' }),
                                    errorMessage))))));
        var _c;
    };
    /**
     * Sets focus on the text field
     */
    TextField.prototype.focus = function () {
        if (this._textElement) {
            this._textElement.focus();
        }
    };
    /**
     * Selects the text field
     */
    TextField.prototype.select = function () {
        if (this._textElement) {
            this._textElement.select();
        }
    };
    /**
     * Sets the selection start of the text field to a specified value
     */
    TextField.prototype.setSelectionStart = function (value) {
        if (this._textElement) {
            this._textElement.selectionStart = value;
        }
    };
    /**
     * Sets the selection end of the text field to a specified value
     */
    TextField.prototype.setSelectionEnd = function (value) {
        if (this._textElement) {
            this._textElement.selectionEnd = value;
        }
    };
    TextField.prototype._onFocus = function (ev) {
        if (this.props.onFocus) {
            this.props.onFocus(ev);
        }
        this.setState({ isFocused: true });
        if (this.props.validateOnFocusIn) {
            this._validate(this.state.value);
        }
    };
    TextField.prototype._onBlur = function (ev) {
        if (this.props.onBlur) {
            this.props.onBlur(ev);
        }
        this.setState({ isFocused: false });
        if (this.props.validateOnFocusOut) {
            this._validate(this.state.value);
        }
    };
    TextField.prototype._onRenderAddon = function (props) {
        var addonString = props.addonString;
        return (React.createElement("span", { style: { paddingBottom: '1px' } }, addonString));
    };
    TextField.prototype._getTextElementClassName = function () {
        var errorMessage = this._errorMessage;
        var textFieldClassName;
        if (this.props.multiline && !this.props.resizable) {
            textFieldClassName = Utilities_1.css('ms-TextField-field ms-TextField-field--unresizable', styles.field, styles.fieldIsUnresizable);
        }
        else {
            textFieldClassName = Utilities_1.css('ms-TextField-field', styles.field);
        }
        return Utilities_1.css(textFieldClassName, this.props.inputClassName, (_a = {},
            _a['ms-TextField-invalid ' + styles.invalid] = !!errorMessage,
            _a[styles.hasIcon] = !!this.props.iconClass,
            _a));
        var _a;
    };
    Object.defineProperty(TextField.prototype, "_errorMessage", {
        get: function () {
            var errorMessage = this.state.errorMessage;
            if (!errorMessage) {
                errorMessage = this.props.errorMessage;
            }
            return errorMessage;
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype._renderTextArea = function () {
        var textAreaProps = Utilities_1.getNativeProps(this.props, Utilities_1.textAreaProperties, ['defaultValue']);
        return (React.createElement("textarea", __assign({ id: this._id }, textAreaProps, { ref: this._resolveRef('_textElement'), value: this.state.value, onInput: this._onInputChange, onChange: this._onInputChange, className: this._getTextElementClassName(), "aria-describedby": this._isDescriptionAvailable ? this._descriptionId : null, "aria-invalid": !!this.state.errorMessage, "aria-label": this.props.ariaLabel, onFocus: this._onFocus, onBlur: this._onBlur })));
    };
    TextField.prototype._renderInput = function () {
        var inputProps = Utilities_1.getNativeProps(this.props, Utilities_1.inputProperties, ['defaultValue']);
        return (React.createElement("input", __assign({ type: 'text', id: this._id }, inputProps, { ref: this._resolveRef('_textElement'), value: this.state.value, onInput: this._onInputChange, onChange: this._onInputChange, className: this._getTextElementClassName(), "aria-label": this.props.ariaLabel, "aria-describedby": this._isDescriptionAvailable ? this._descriptionId : null, "aria-invalid": !!this.state.errorMessage, onFocus: this._onFocus, onBlur: this._onBlur })));
    };
    TextField.prototype._onInputChange = function (event) {
        var _this = this;
        var element = event.target;
        var value = element.value;
        // Avoid doing unnecessary work when the value has not changed.
        if (value === this._latestValue) {
            return;
        }
        this._latestValue = value;
        this.setState({
            value: value,
            errorMessage: ''
        }, function () {
            _this._adjustInputHeight();
            if (_this.props.onChanged) {
                _this.props.onChanged(value);
            }
        });
        var _a = this.props, validateOnFocusIn = _a.validateOnFocusIn, validateOnFocusOut = _a.validateOnFocusOut;
        if (!(validateOnFocusIn || validateOnFocusOut)) {
            this._delayedValidate(value);
        }
        var onBeforeChange = this.props.onBeforeChange;
        onBeforeChange(value);
    };
    TextField.prototype._validate = function (value) {
        var _this = this;
        // In case of _validate called multi-times during executing validate logic with promise return.
        if (this._latestValidateValue === value) {
            return;
        }
        this._latestValidateValue = value;
        var onGetErrorMessage = this.props.onGetErrorMessage;
        var result = onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                this.setState({
                    errorMessage: result
                });
                this._notifyAfterValidate(value, result);
            }
            else {
                var currentValidation_1 = ++this._lastValidation;
                result.then(function (errorMessage) {
                    if (_this._isMounted && currentValidation_1 === _this._lastValidation) {
                        _this.setState({ errorMessage: errorMessage });
                    }
                    _this._notifyAfterValidate(value, errorMessage);
                });
            }
        }
        else {
            this._notifyAfterValidate(value, '');
        }
    };
    TextField.prototype._notifyAfterValidate = function (value, errorMessage) {
        if (this._isMounted &&
            value === this.state.value &&
            this.props.onNotifyValidationResult) {
            this.props.onNotifyValidationResult(errorMessage, value);
        }
    };
    TextField.prototype._adjustInputHeight = function () {
        if (this._textElement && this.props.autoAdjustHeight && this.props.multiline) {
            var textField = this._textElement;
            textField.style.height = '';
            var scrollHeight = textField.scrollHeight + 2; // +2 to avoid vertical scroll bars
            textField.style.height = scrollHeight + 'px';
        }
    };
    return TextField;
}(Utilities_1.BaseComponent));
TextField.defaultProps = {
    multiline: false,
    resizable: true,
    autoAdjustHeight: false,
    underlined: false,
    borderless: false,
    onChanged: function () { },
    onBeforeChange: function () { },
    onNotifyValidationResult: function () { },
    onGetErrorMessage: function () { return undefined; },
    deferredValidationTime: 200,
    errorMessage: '',
    validateOnFocusIn: false,
    validateOnFocusOut: false,
    validateOnLoad: true,
};
exports.TextField = TextField;



/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_fcf4e378',
    screenReaderOnly: 'screenReaderOnly_fcf4e378',
    rootIsDisabled: 'rootIsDisabled_fcf4e378',
    rootIsRequired: 'rootIsRequired_fcf4e378',
    rootIsActive: 'rootIsActive_fcf4e378',
    errorIcon: 'errorIcon_fcf4e378',
    icon: 'icon_fcf4e378',
    fieldGroup: 'fieldGroup_fcf4e378',
    fieldGroupIsFocused: 'fieldGroupIsFocused_fcf4e378',
    fieldAddon: 'fieldAddon_fcf4e378',
    field: 'field_fcf4e378',
    hasIcon: 'hasIcon_fcf4e378',
    description: 'description_fcf4e378',
    rootIsBorderless: 'rootIsBorderless_fcf4e378',
    rootIsUnderlined: 'rootIsUnderlined_fcf4e378',
    rootIsMultiline: 'rootIsMultiline_fcf4e378',
    errorMessage: 'errorMessage_fcf4e378',
    invalid: 'invalid_fcf4e378',
    fieldIsUnresizable: 'fieldIsUnresizable_fcf4e378',
    hidden: 'hidden_fcf4e378',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_fcf4e378{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;box-sizing:border-box;margin:0;padding:0;box-shadow:none;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";font-size:14px;font-weight:400;margin-bottom:8px;position:relative}.root_fcf4e378 .ms-Label{font-size:14px;font-weight:400}.screenReaderOnly_fcf4e378{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.root_fcf4e378.rootIsDisabled_fcf4e378 .field{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";border-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";pointer-events:none;cursor:default}.root_fcf4e378.rootIsDisabled_fcf4e378::-webkit-input-placeholder{color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": "}.root_fcf4e378.rootIsDisabled_fcf4e378::-moz-placeholder{color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": "}.root_fcf4e378.rootIsDisabled_fcf4e378:-moz-placeholder{color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": "}.root_fcf4e378.rootIsDisabled_fcf4e378:-ms-input-placeholder{color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": "}.root_fcf4e378.rootIsRequired_fcf4e378 .ms-Label::after{content:' *';color:" }, { "theme": "error", "defaultValue": "#a80000" }, { "rawString": "}.root_fcf4e378.rootIsRequired_fcf4e378::-webkit-input-placeholder::after{content:' *';color:" }, { "theme": "error", "defaultValue": "#a80000" }, { "rawString": "}.root_fcf4e378.rootIsRequired_fcf4e378::-moz-placeholder::after{content:' *';color:" }, { "theme": "error", "defaultValue": "#a80000" }, { "rawString": "}.root_fcf4e378.rootIsRequired_fcf4e378:-moz-placeholder::after{content:' *';color:" }, { "theme": "error", "defaultValue": "#a80000" }, { "rawString": "}.root_fcf4e378.rootIsRequired_fcf4e378:-ms-input-placeholder::after{content:' *';color:" }, { "theme": "error", "defaultValue": "#a80000" }, { "rawString": "}.root_fcf4e378.rootIsActive_fcf4e378{border-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.errorIcon_fcf4e378{vertical-align:middle;font-size:14px}html[dir=ltr] .errorIcon_fcf4e378{margin-right:5px}html[dir=rtl] .errorIcon_fcf4e378{margin-left:5px}.icon_fcf4e378{position:absolute;bottom:8px;top:auto}html[dir=ltr] .icon_fcf4e378{right:8px}html[dir=rtl] .icon_fcf4e378{left:8px}.fieldGroup_fcf4e378{box-sizing:border-box;margin:0;padding:0;box-shadow:none;font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-weight:400;font-size:14px;border:1px solid " }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": ";height:32px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;position:relative}.fieldGroup_fcf4e378:hover{border-color:" }, { "theme": "neutralSecondaryAlt", "defaultValue": "#767676" }, { "rawString": "}.fieldGroup_fcf4e378.fieldGroupIsFocused_fcf4e378{border-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}@media screen and (-ms-high-contrast:active){.fieldGroup_fcf4e378.fieldGroupIsFocused_fcf4e378,.fieldGroup_fcf4e378:hover{border-color:#1aebff}}@media screen and (-ms-high-contrast:black-on-white){.fieldGroup_fcf4e378.fieldGroupIsFocused_fcf4e378,.fieldGroup_fcf4e378:hover{border-color:#37006e}}.rootIsDisabled_fcf4e378>.fieldGroup_fcf4e378{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";border-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";pointer-events:none;cursor:default}.fieldAddon_fcf4e378{background:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 10px;line-height:1}.field_fcf4e378{box-sizing:border-box;margin:0;padding:0;box-shadow:none;font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;border-radius:0;border:none;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";padding:0 12px 0 12px;width:100%;text-overflow:ellipsis;outline:0}html[dir=rtl] .field_fcf4e378{padding:0 12px 0 12px}.field_fcf4e378:active,.field_fcf4e378:focus,.field_fcf4e378:hover{outline:0}html[dir=ltr] .field_fcf4e378.hasIcon_fcf4e378{padding-right:24px}html[dir=rtl] .field_fcf4e378.hasIcon_fcf4e378{padding-left:24px}.field_fcf4e378[disabled]{background-color:transparent;border-color:transparent;pointer-events:none;cursor:default}.field_fcf4e378::-webkit-input-placeholder{color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.field_fcf4e378::-moz-placeholder{color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.field_fcf4e378:-moz-placeholder{color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.field_fcf4e378:-ms-input-placeholder{color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.field_fcf4e378::-ms-clear{display:none}.description_fcf4e378{color:" }, { "theme": "neutralSecondaryAlt", "defaultValue": "#767676" }, { "rawString": ";font-size:11px}.rootIsBorderless_fcf4e378 .fieldGroup_fcf4e378{border-color:transparent}.root_fcf4e378.rootIsUnderlined_fcf4e378{border-bottom:1px solid " }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": ";display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.root_fcf4e378.rootIsUnderlined_fcf4e378:hover{border-color:" }, { "theme": "neutralSecondaryAlt", "defaultValue": "#767676" }, { "rawString": "}@media screen and (-ms-high-contrast:active){.root_fcf4e378.rootIsUnderlined_fcf4e378:hover{border-color:#1aebff}}@media screen and (-ms-high-contrast:black-on-white){.root_fcf4e378.rootIsUnderlined_fcf4e378:hover{border-color:#37006e}}.root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{font-size:14px;line-height:22px;height:32px}html[dir=ltr] .root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{margin-right:8px}html[dir=rtl] .root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{margin-left:8px}html[dir=ltr] .root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{padding-left:12px}html[dir=rtl] .root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{padding-right:12px}.root_fcf4e378.rootIsUnderlined_fcf4e378 .fieldGroup_fcf4e378{-webkit-box-flex:1;-ms-flex:1 1 0;flex:1 1 0;border:0}html[dir=ltr] .root_fcf4e378.rootIsUnderlined_fcf4e378 .fieldGroup_fcf4e378{text-align:left}html[dir=rtl] .root_fcf4e378.rootIsUnderlined_fcf4e378 .fieldGroup_fcf4e378{text-align:right}.root_fcf4e378.rootIsUnderlined_fcf4e378.rootIsDisabled_fcf4e378{border-bottom-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.root_fcf4e378.rootIsUnderlined_fcf4e378.rootIsDisabled_fcf4e378 .ms-Label{color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": "}.root_fcf4e378.rootIsUnderlined_fcf4e378.rootIsDisabled_fcf4e378 .field_fcf4e378{background-color:transparent;color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": "}.root_fcf4e378.rootIsUnderlined_fcf4e378.rootIsActive_fcf4e378{border-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}@media screen and (-ms-high-contrast:active){.root_fcf4e378.rootIsUnderlined_fcf4e378.rootIsActive_fcf4e378{border-color:#1aebff}}@media screen and (-ms-high-contrast:black-on-white){.root_fcf4e378.rootIsUnderlined_fcf4e378.rootIsActive_fcf4e378{border-color:#37006e}}.root_fcf4e378.rootIsMultiline_fcf4e378 .fieldGroup_fcf4e378{min-height:60px;height:auto;display:-webkit-box;display:-ms-flexbox;display:flex}.root_fcf4e378.rootIsMultiline_fcf4e378 .field_fcf4e378{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:400;line-height:17px;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;padding-top:6px;overflow:auto;width:100%}html[dir=ltr] .root_fcf4e378.rootIsMultiline_fcf4e378 .field_fcf4e378.hasIcon_fcf4e378{padding-right:40px}html[dir=rtl] .root_fcf4e378.rootIsMultiline_fcf4e378 .field_fcf4e378.hasIcon_fcf4e378{padding-left:40px}.errorMessage_fcf4e378{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:12px;font-weight:400;color:" }, { "theme": "redDark", "defaultValue": "#a80000" }, { "rawString": ";margin:0;padding-top:5px}.invalid_fcf4e378,.invalid_fcf4e378:focus,.invalid_fcf4e378:hover{border-color:" }, { "theme": "redDark", "defaultValue": "#a80000" }, { "rawString": "}html[dir=ltr] .root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{padding-left:12px}html[dir=rtl] .root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{padding-right:12px}html[dir=ltr] .root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{padding-right:0}html[dir=rtl] .root_fcf4e378.rootIsUnderlined_fcf4e378 .ms-Label{padding-left:0}html[dir=ltr] .root_fcf4e378.rootIsUnderlined_fcf4e378 .field_fcf4e378{text-align:left}html[dir=rtl] .root_fcf4e378.rootIsUnderlined_fcf4e378 .field_fcf4e378{text-align:right}.root_fcf4e378.rootIsMultiline_fcf4e378 .icon_fcf4e378{padding-bottom:8px;-webkit-box-align:end;-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end}html[dir=ltr] .root_fcf4e378.rootIsMultiline_fcf4e378 .icon_fcf4e378{padding-right:24px}html[dir=rtl] .root_fcf4e378.rootIsMultiline_fcf4e378 .icon_fcf4e378{padding-left:24px}.root_fcf4e378.rootIsMultiline_fcf4e378 .field_fcf4e378.fieldIsUnresizable_fcf4e378{resize:none}.hidden_fcf4e378{display:none}" }]);
module.exports = styles;
/* tslint:enable */ 



/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(228));



/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Utilities_1 = __webpack_require__(1);
var BaseDecorator = (function (_super) {
    __extends(BaseDecorator, _super);
    function BaseDecorator() {
        var _this = _super.call(this) || this;
        _this._shouldUpdateComponentRef = false;
        _this._updateComposedComponentRef = _this._updateComposedComponentRef.bind(_this);
        return _this;
    }
    /**
     * Updates the ref to the component composed by the decorator, which will also take care of hoisting
     * (and unhoisting as appropriate) methods from said component.
     *
     * Pass this method as the argument to the 'ref' property of the composed component.
     */
    BaseDecorator.prototype._updateComposedComponentRef = function (composedComponentInstance) {
        this._composedComponentInstance = composedComponentInstance;
        if (composedComponentInstance) {
            this._hoisted = Utilities_1.hoistMethods(this, composedComponentInstance);
        }
        else if (this._hoisted) {
            Utilities_1.unhoistMethods(this, this._hoisted);
        }
    };
    return BaseDecorator;
}(Utilities_1.BaseComponent));
exports.BaseDecorator = BaseDecorator;



/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseDecorator_1 = __webpack_require__(231);
var Utilities_1 = __webpack_require__(1);
var RESIZE_DELAY = 500;
var MAX_RESIZE_ATTEMPTS = 3;
function withViewport(ComposedComponent) {
    return (function (_super) {
        __extends(WithViewportComponent, _super);
        function WithViewportComponent() {
            var _this = _super.call(this) || this;
            /* Note: using lambda here because decorators don't seem to work in decorators. */
            _this._updateViewport = function (withForceUpdate) {
                var viewport = _this.state.viewport;
                var viewportElement = _this.refs.root;
                var scrollElement = Utilities_1.findScrollableParent(viewportElement);
                var scrollRect = Utilities_1.getRect(scrollElement);
                var clientRect = Utilities_1.getRect(viewportElement);
                var updateComponent = function () {
                    if (withForceUpdate && _this._composedComponentInstance) {
                        _this._composedComponentInstance.forceUpdate();
                    }
                };
                var isSizeChanged = (clientRect.width !== viewport.width ||
                    scrollRect.height !== viewport.height);
                if (isSizeChanged && _this._resizeAttempts < MAX_RESIZE_ATTEMPTS) {
                    _this._resizeAttempts++;
                    _this.setState({
                        viewport: {
                            width: clientRect.width,
                            height: scrollRect.height
                        }
                    }, function () { _this._updateViewport(withForceUpdate); });
                }
                else {
                    _this._resizeAttempts = 0;
                    updateComponent();
                }
            };
            _this._resizeAttempts = 0;
            _this.state = {
                viewport: {
                    width: 0,
                    height: 0
                }
            };
            return _this;
        }
        WithViewportComponent.prototype.componentDidMount = function () {
            this._onAsyncResize = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
                leading: false
            });
            this._events.on(window, 'resize', this._onAsyncResize);
            this._updateViewport();
        };
        WithViewportComponent.prototype.componentWillUnmount = function () {
            this._events.dispose();
        };
        WithViewportComponent.prototype.render = function () {
            var viewport = this.state.viewport;
            var isViewportVisible = viewport.width > 0 && viewport.height > 0;
            return (React.createElement("div", { className: 'ms-Viewport', ref: 'root', style: { minWidth: 1, minHeight: 1 } }, isViewportVisible && (React.createElement(ComposedComponent, __assign({ ref: this._updateComposedComponentRef, viewport: viewport }, this.props)))));
        };
        WithViewportComponent.prototype.forceUpdate = function () {
            this._updateViewport(true);
        };
        WithViewportComponent.prototype._onAsyncResize = function () {
            this._updateViewport();
        };
        return WithViewportComponent;
    }(BaseDecorator_1.BaseDecorator));
}
exports.withViewport = withViewport;



/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = __webpack_require__(26);
var Utilities_1 = __webpack_require__(1);
var DISTANCE_FOR_DRAG_SQUARED = 25; // the minimum mouse move distance to treat it as drag event
var MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
var MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button
var DragDropHelper = (function () {
    function DragDropHelper(params) {
        this._selection = params.selection;
        this._dragEnterCounts = {};
        this._activeTargets = {};
        this._lastId = 0;
        this._distanceSquaredForDrag = typeof params.minimumPixelsForDrag === 'number' ?
            params.minimumPixelsForDrag * params.minimumPixelsForDrag : DISTANCE_FOR_DRAG_SQUARED;
        this._events = new Utilities_1.EventGroup(this);
        // clear drag data when mouse up, use capture event to ensure it will be run
        this._events.on(document.body, 'mouseup', this._onMouseUp.bind(this), true);
        this._events.on(document, 'mouseup', this._onDocumentMouseUp.bind(this), true);
    }
    DragDropHelper.prototype.dispose = function () {
        this._events.dispose();
    };
    DragDropHelper.prototype.subscribe = function (root, events, dragDropOptions) {
        var _this = this;
        var _a = dragDropOptions.key, key = _a === void 0 ? "" + ++this._lastId : _a;
        var handlers = [];
        var onDragLeave;
        var onDragEnter;
        var onDragEnd;
        var onDrop;
        var onDragOver;
        var onMouseDown;
        var isDraggable;
        var isDroppable;
        var activeTarget;
        if (dragDropOptions && root) {
            var eventMap = dragDropOptions.eventMap, context_1 = dragDropOptions.context, updateDropState_1 = dragDropOptions.updateDropState;
            var dragDropTarget = {
                root: root,
                options: dragDropOptions,
                key: key
            };
            isDraggable = this._isDraggable(dragDropTarget);
            isDroppable = this._isDroppable(dragDropTarget);
            if (isDraggable || isDroppable) {
                if (eventMap) {
                    for (var _i = 0, eventMap_1 = eventMap; _i < eventMap_1.length; _i++) {
                        var event_1 = eventMap_1[_i];
                        var handler = {
                            callback: event_1.callback.bind(null, context_1),
                            eventName: event_1.eventName
                        };
                        handlers.push(handler);
                        this._events.on(root, handler.eventName, handler.callback);
                    }
                }
            }
            if (isDroppable) {
                // If the target is droppable, wire up global event listeners to track drop-related events.
                onDragLeave = function (event) {
                    if (!event.isHandled) {
                        event.isHandled = true;
                        _this._dragEnterCounts[key]--;
                        if (_this._dragEnterCounts[key] === 0) {
                            updateDropState_1(false /* isDropping */, event);
                        }
                    }
                };
                onDragEnter = function (event) {
                    event.preventDefault(); // needed for IE
                    if (!event.isHandled) {
                        event.isHandled = true;
                        _this._dragEnterCounts[key]++;
                        if (_this._dragEnterCounts[key] === 1) {
                            updateDropState_1(true /* isDropping */, event);
                        }
                    }
                };
                onDragEnd = function (event) {
                    _this._dragEnterCounts[key] = 0;
                    updateDropState_1(false /* isDropping */, event);
                };
                onDrop = function (event) {
                    _this._dragEnterCounts[key] = 0;
                    updateDropState_1(false /* isDropping */, event);
                    if (dragDropOptions.onDrop) {
                        dragDropOptions.onDrop(dragDropOptions.context.data, event);
                    }
                };
                onDragOver = function (event) {
                    event.preventDefault();
                };
                this._dragEnterCounts[key] = 0;
                // dragenter and dragleave will be fired when hover to the child element
                // but we only want to change state when enter or leave the current element
                // use the count to ensure it.
                events.on(root, 'dragenter', onDragEnter);
                events.on(root, 'dragleave', onDragLeave);
                events.on(root, 'dragend', onDragEnd);
                events.on(root, 'drop', onDrop);
                events.on(root, 'dragover', onDragOver);
            }
            if (isDraggable) {
                // If the target is draggable, wire up local event listeners for mouse events.
                onMouseDown = this._onMouseDown.bind(this, dragDropTarget);
                onDragEnd = this._onDragEnd.bind(this, dragDropTarget);
                events.on(root, 'mousedown', onMouseDown);
                events.on(root, 'dragend', onDragEnd);
            }
            activeTarget = {
                target: dragDropTarget,
                dispose: function () {
                    if (_this._activeTargets[key] === activeTarget) {
                        delete _this._activeTargets[key];
                    }
                    if (root) {
                        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                            var handler = handlers_1[_i];
                            _this._events.off(root, handler.eventName, handler.callback);
                        }
                        if (isDroppable) {
                            events.off(root, 'dragenter', onDragEnter);
                            events.off(root, 'dragleave', onDragLeave);
                            events.off(root, 'dragend', onDragEnd);
                            events.off(root, 'dragover', onDragOver);
                            events.off(root, 'drop', onDrop);
                        }
                        if (isDraggable) {
                            events.off(root, 'mousedown', onMouseDown);
                            events.off(root, 'dragend', onDragEnd);
                        }
                    }
                }
            };
            this._activeTargets[key] = activeTarget;
        }
        return {
            key: key,
            dispose: function () {
                if (activeTarget) {
                    activeTarget.dispose();
                }
            }
        };
    };
    DragDropHelper.prototype.unsubscribe = function (root, key) {
        var activeTarget = this._activeTargets[key];
        if (activeTarget) {
            activeTarget.dispose();
        }
    };
    DragDropHelper.prototype._onDragEnd = function (target, event) {
        var options = target.options;
        if (options.onDragEnd) {
            options.onDragEnd(options.context.data, event);
        }
    };
    /**
     * clear drag data when mouse up on body
     */
    DragDropHelper.prototype._onMouseUp = function (event) {
        this._isDragging = false;
        if (this._dragData) {
            for (var _i = 0, _a = Object.keys(this._activeTargets); _i < _a.length; _i++) {
                var key = _a[_i];
                var activeTarget = this._activeTargets[key];
                if (activeTarget.target.root) {
                    this._events.off(activeTarget.target.root, 'mousemove');
                    this._events.off(activeTarget.target.root, 'mouseleave');
                }
            }
            if (this._dragData.dropTarget) {
                // raise dragleave event to let dropTarget know it need to remove dropping style
                Utilities_1.EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
                Utilities_1.EventGroup.raise(this._dragData.dropTarget.root, 'drop');
            }
        }
        this._dragData = null;
    };
    /**
     * clear drag data when mouse up outside of the document
     */
    DragDropHelper.prototype._onDocumentMouseUp = function (event) {
        if (event.target === document.documentElement) {
            this._onMouseUp(event);
        }
    };
    /**
     * when mouse move over a new drop target while dragging some items,
     * fire dragleave on the old target and fire dragenter to the new target
     * The target will handle style change on dragenter and dragleave events.
     */
    DragDropHelper.prototype._onMouseMove = function (target, event) {
        var 
        // use buttons property here since ev.button in some edge case is not updating well during the move.
        // but firefox doesn't support it, so we set the default value when it is not defined.
        _a = event.buttons, 
        // use buttons property here since ev.button in some edge case is not updating well during the move.
        // but firefox doesn't support it, so we set the default value when it is not defined.
        buttons = _a === void 0 ? MOUSEMOVE_PRIMARY_BUTTON : _a;
        if (this._dragData && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
            // cancel mouse down event and return early when the primary button is not pressed
            this._onMouseUp(event);
            return;
        }
        var root = target.root, options = target.options, key = target.key;
        if (this._isDragging) {
            if (this._isDroppable(target)) {
                // we can have nested drop targets in the DOM, like a folder inside a group. In that case, when we drag into
                // the inner target (folder), we first set dropTarget to the inner element. But the same event is bubbled to the
                // outer target too, and we need to prevent the outer one from taking over.
                // So, check if the last dropTarget is not a child of the current.
                if (this._dragData.dropTarget &&
                    this._dragData.dropTarget.key !== key &&
                    !this._isChild(root, this._dragData.dropTarget.root)) {
                    Utilities_1.EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
                    this._dragData.dropTarget = null;
                }
                if (!this._dragData.dropTarget) {
                    Utilities_1.EventGroup.raise(root, 'dragenter');
                    this._dragData.dropTarget = target;
                }
            }
        }
        else if (this._dragData) {
            if (this._isDraggable(target)) {
                var xDiff = this._dragData.clientX - event.clientX;
                var yDiff = this._dragData.clientY - event.clientY;
                if (xDiff * xDiff + yDiff * yDiff >= this._distanceSquaredForDrag) {
                    if (this._dragData.dragTarget) {
                        this._isDragging = true;
                        if (options.onDragStart) {
                            options.onDragStart(options.context.data, options.context.index, this._selection.getSelection(), event);
                        }
                    }
                }
            }
        }
    };
    /**
     * when mouse leave a target while dragging some items, fire dragleave to the target
     */
    DragDropHelper.prototype._onMouseLeave = function (target, event) {
        if (this._isDragging) {
            if (this._dragData && this._dragData.dropTarget && this._dragData.dropTarget.key === target.key) {
                Utilities_1.EventGroup.raise(target.root, 'dragleave');
                this._dragData.dropTarget = null;
            }
        }
    };
    /**
     * when mouse down on a draggable item, we start to track dragdata.
     */
    DragDropHelper.prototype._onMouseDown = function (target, event) {
        if (event.button !== MOUSEDOWN_PRIMARY_BUTTON) {
            // Ignore anything except the primary button.
            return;
        }
        if (this._isDraggable(target)) {
            this._dragData = {
                clientX: event.clientX,
                clientY: event.clientY,
                eventTarget: event.target,
                dragTarget: target
            };
            for (var _i = 0, _a = Object.keys(this._activeTargets); _i < _a.length; _i++) {
                var key = _a[_i];
                var activeTarget = this._activeTargets[key];
                if (activeTarget.target.root) {
                    this._events.on(activeTarget.target.root, 'mousemove', this._onMouseMove.bind(this, activeTarget.target));
                    this._events.on(activeTarget.target.root, 'mouseleave', this._onMouseLeave.bind(this, activeTarget.target));
                }
            }
        }
        else {
            this._dragData = null;
        }
    };
    /**
     * determine whether the child target is a descendant of the parent
     */
    DragDropHelper.prototype._isChild = function (parent, child) {
        var parentElement = ReactDOM.findDOMNode(parent);
        var childElement = ReactDOM.findDOMNode(child);
        while (childElement && childElement.parentElement) {
            if (childElement.parentElement === parentElement) {
                return true;
            }
            childElement = childElement.parentElement;
        }
        return false;
    };
    DragDropHelper.prototype._isDraggable = function (target) {
        var options = target.options;
        return options.canDrag && options.canDrag(options.context.data);
    };
    DragDropHelper.prototype._isDroppable = function (target) {
        // TODO: take the drag item into consideration to prevent dragging an item into the same group
        var options = target.options;
        var dragContext = this._dragData && this._dragData.dragTarget ? this._dragData.dragTarget.options.context : null;
        return options.canDrop && options.canDrop(options.context, dragContext);
    };
    return DragDropHelper;
}());
exports.DragDropHelper = DragDropHelper;



/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalHint_1 = __webpack_require__(9);
var Utilities_1 = __webpack_require__(1);
var RectangleEdge;
(function (RectangleEdge) {
    RectangleEdge[RectangleEdge["top"] = 0] = "top";
    RectangleEdge[RectangleEdge["bottom"] = 1] = "bottom";
    RectangleEdge[RectangleEdge["left"] = 2] = "left";
    RectangleEdge[RectangleEdge["right"] = 3] = "right";
})(RectangleEdge = exports.RectangleEdge || (exports.RectangleEdge = {}));
var SLIDE_ANIMATIONS = (_a = {},
    _a[RectangleEdge.top] = 'slideUpIn20',
    _a[RectangleEdge.bottom] = 'slideDownIn20',
    _a[RectangleEdge.left] = 'slideLeftIn20',
    _a[RectangleEdge.right] = 'slideRightIn20',
    _a);
var PositionData = (function () {
    function PositionData(calloutDirection, targetDirection, calloutPercent, targetPercent, beakPercent, isAuto) {
        this.calloutDirection = calloutDirection;
        this.targetDirection = targetDirection;
        this.calloutPercent = calloutPercent;
        this.targetPercent = targetPercent;
        this.beakPercent = beakPercent;
        this.isAuto = isAuto;
    }
    return PositionData;
}());
exports.PositionData = PositionData;
// Currently the beakPercent is set to 50 for all positions meaning that it should tend to the center of the target
var DirectionalDictionary = (_b = {},
    _b[DirectionalHint_1.DirectionalHint.topLeftEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topCenter] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topRightEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topAutoEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 0, 0, 50, true),
    _b[DirectionalHint_1.DirectionalHint.bottomLeftEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomCenter] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomRightEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomAutoEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 0, 0, 50, true),
    _b[DirectionalHint_1.DirectionalHint.leftTopEdge] = new PositionData(RectangleEdge.right, RectangleEdge.left, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.leftCenter] = new PositionData(RectangleEdge.right, RectangleEdge.left, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.leftBottomEdge] = new PositionData(RectangleEdge.right, RectangleEdge.left, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightTopEdge] = new PositionData(RectangleEdge.left, RectangleEdge.right, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightCenter] = new PositionData(RectangleEdge.left, RectangleEdge.right, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightBottomEdge] = new PositionData(RectangleEdge.left, RectangleEdge.right, 100, 100, 50, false),
    _b);
var CoverDictionary = (_c = {},
    _c[DirectionalHint_1.DirectionalHint.topLeftEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topCenter] = new PositionData(RectangleEdge.top, RectangleEdge.top, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topRightEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topAutoEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 0, 0, 50, true),
    _c[DirectionalHint_1.DirectionalHint.bottomLeftEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomCenter] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomRightEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomAutoEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 0, 0, 50, true),
    _c[DirectionalHint_1.DirectionalHint.leftTopEdge] = new PositionData(RectangleEdge.left, RectangleEdge.left, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.leftCenter] = new PositionData(RectangleEdge.left, RectangleEdge.left, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.leftBottomEdge] = new PositionData(RectangleEdge.left, RectangleEdge.left, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightTopEdge] = new PositionData(RectangleEdge.right, RectangleEdge.right, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightCenter] = new PositionData(RectangleEdge.right, RectangleEdge.right, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightBottomEdge] = new PositionData(RectangleEdge.right, RectangleEdge.right, 100, 100, 50, false),
    _c);
var OppositeEdgeDictionary = (_d = {},
    _d[RectangleEdge.top] = RectangleEdge.bottom,
    _d[RectangleEdge.bottom] = RectangleEdge.top,
    _d[RectangleEdge.right] = RectangleEdge.left,
    _d[RectangleEdge.left] = RectangleEdge.right,
    _d);
function getRelativePositions(props, hostElement, calloutElement) {
    var beakWidth = !props.isBeakVisible ? 0 : props.beakWidth;
    var borderWidth = positioningFunctions._getBorderSize(calloutElement);
    var gap = positioningFunctions._calculateActualBeakWidthInPixels(beakWidth) / 2 + (props.gapSpace ? props.gapSpace : 0);
    var boundingRect = props.bounds ?
        positioningFunctions._getRectangleFromIRect(props.bounds) :
        new Utilities_1.Rectangle(0, window.innerWidth - Utilities_1.getScrollbarWidth(), 0, window.innerHeight);
    var targetRect = props.target ? positioningFunctions._getTargetRect(boundingRect, props.target) : positioningFunctions._getTargetRectDEPRECATED(boundingRect, props.targetElement, props.creationEvent, props.targetPoint, props.useTargetPoint);
    var positionData = positioningFunctions._getPositionData(props.directionalHint, targetRect, boundingRect, props.coverTarget);
    var positionedCallout = positioningFunctions._positionCalloutWithinBounds(positioningFunctions._getRectangleFromHTMLElement(calloutElement), targetRect, boundingRect, positionData, gap, props.coverTarget, props.directionalHintFixed);
    var beakPositioned = positioningFunctions._positionBeak(beakWidth, positionedCallout, targetRect, borderWidth);
    var finalizedCallout = positioningFunctions._finalizeCalloutPosition(positionedCallout.calloutRectangle, hostElement);
    return {
        calloutPosition: { top: finalizedCallout.top, left: finalizedCallout.left },
        beakPosition: { top: beakPositioned.top, left: beakPositioned.left, display: 'block' },
        directionalClassName: SLIDE_ANIMATIONS[positionedCallout.targetEdge],
        submenuDirection: positionedCallout.calloutEdge === RectangleEdge.right ? DirectionalHint_1.DirectionalHint.leftBottomEdge : DirectionalHint_1.DirectionalHint.rightBottomEdge
    };
}
exports.getRelativePositions = getRelativePositions;
/**
 * Get's the maximum height that a rectangle can have in order to fit below or above a target.
 * If the directional hint specifies a left or right edge (i.e. leftCenter) it will limit the height to the topBorder
 * of the target given.
 * If no bounds are provided then the window is treated as the bounds.
 */
function getMaxHeight(target, targetEdge, gapSpace, bounds) {
    if (gapSpace === void 0) { gapSpace = 0; }
    var mouseTarget = target;
    var elementTarget = target;
    var targetRect;
    var boundingRectangle = bounds ?
        positioningFunctions._getRectangleFromIRect(bounds) :
        new Utilities_1.Rectangle(0, window.innerWidth - Utilities_1.getScrollbarWidth(), 0, window.innerHeight);
    if (mouseTarget.stopPropagation) {
        targetRect = new Utilities_1.Rectangle(mouseTarget.clientX, mouseTarget.clientX, mouseTarget.clientY, mouseTarget.clientY);
    }
    else {
        targetRect = positioningFunctions._getRectangleFromHTMLElement(elementTarget);
    }
    return positioningFunctions._getMaxHeightFromTargetRectangle(targetRect, targetEdge, gapSpace, boundingRectangle);
}
exports.getMaxHeight = getMaxHeight;
var positioningFunctions;
(function (positioningFunctions) {
    /**
     * If max height is less than zero it returns the bounds height instead.
     */
    function _getMaxHeightFromTargetRectangle(targetRectangle, targetEdge, gapSpace, bounds) {
        var maxHeight = 0;
        switch (targetEdge) {
            case DirectionalHint_1.DirectionalHint.bottomAutoEdge:
            case DirectionalHint_1.DirectionalHint.bottomCenter:
            case DirectionalHint_1.DirectionalHint.bottomLeftEdge:
            case DirectionalHint_1.DirectionalHint.bottomRightEdge:
                maxHeight = bounds.bottom - targetRectangle.bottom - gapSpace;
                break;
            case DirectionalHint_1.DirectionalHint.topAutoEdge:
            case DirectionalHint_1.DirectionalHint.topCenter:
            case DirectionalHint_1.DirectionalHint.topLeftEdge:
            case DirectionalHint_1.DirectionalHint.topRightEdge:
                maxHeight = targetRectangle.top - bounds.top - gapSpace;
                break;
            default:
                maxHeight = bounds.bottom - targetRectangle.top - gapSpace;
                break;
        }
        return maxHeight > 0 ? maxHeight : bounds.height;
    }
    positioningFunctions._getMaxHeightFromTargetRectangle = _getMaxHeightFromTargetRectangle;
    function _getTargetRect(bounds, target) {
        var targetRectangle;
        if (target.preventDefault) {
            var ev = target;
            targetRectangle = new Utilities_1.Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
        }
        else {
            targetRectangle = _getRectangleFromHTMLElement(target);
        }
        if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
            var outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);
            for (var _i = 0, outOfBounds_1 = outOfBounds; _i < outOfBounds_1.length; _i++) {
                var direction = outOfBounds_1[_i];
                targetRectangle[RectangleEdge[direction]] = bounds[RectangleEdge[direction]];
            }
        }
        return targetRectangle;
    }
    positioningFunctions._getTargetRect = _getTargetRect;
    function _getTargetRectDEPRECATED(bounds, targetElement, ev, targetPoint, isTargetPoint) {
        var targetRectangle;
        if (isTargetPoint) {
            if (targetPoint) {
                targetRectangle = new Utilities_1.Rectangle(targetPoint.x, targetPoint.x, targetPoint.y, targetPoint.y);
            }
            else {
                targetRectangle = new Utilities_1.Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
            }
        }
        else {
            if (!targetElement) {
                if (ev && ev.target) {
                    targetRectangle = _getRectangleFromHTMLElement(ev.target);
                }
                targetRectangle = new Utilities_1.Rectangle();
            }
            else {
                targetRectangle = _getRectangleFromHTMLElement(targetElement);
            }
        }
        if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
            var outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);
            for (var _i = 0, outOfBounds_2 = outOfBounds; _i < outOfBounds_2.length; _i++) {
                var direction = outOfBounds_2[_i];
                targetRectangle[RectangleEdge[direction]] = bounds[RectangleEdge[direction]];
            }
        }
        return targetRectangle;
    }
    positioningFunctions._getTargetRectDEPRECATED = _getTargetRectDEPRECATED;
    function _getRectangleFromHTMLElement(element) {
        var clientRect = element.getBoundingClientRect();
        return new Utilities_1.Rectangle(clientRect.left, clientRect.right, clientRect.top, clientRect.bottom);
    }
    positioningFunctions._getRectangleFromHTMLElement = _getRectangleFromHTMLElement;
    function _positionCalloutWithinBounds(calloutRectangle, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget, directionalHintFixed) {
        if (gap === void 0) { gap = 0; }
        var estimatedRectangle = _moveRectangleToAnchorRectangle(calloutRectangle, directionalInfo.calloutDirection, directionalInfo.calloutPercent, targetRectangle, directionalInfo.targetDirection, directionalInfo.targetPercent, gap);
        if (_isRectangleWithinBounds(estimatedRectangle, boundingRectangle)) {
            return { calloutRectangle: estimatedRectangle, calloutEdge: directionalInfo.calloutDirection, targetEdge: directionalInfo.targetDirection, alignPercent: directionalInfo.calloutPercent, beakPercent: directionalInfo.beakPercent };
        }
        else {
            return _getBestRectangleFitWithinBounds(estimatedRectangle, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget, directionalHintFixed);
        }
    }
    positioningFunctions._positionCalloutWithinBounds = _positionCalloutWithinBounds;
    function _getBestRectangleFitWithinBounds(estimatedPosition, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget, directionalHintFixed) {
        var callout = {
            calloutRectangle: estimatedPosition,
            calloutEdge: directionalInfo.calloutDirection,
            targetEdge: directionalInfo.targetDirection,
            alignPercent: directionalInfo.calloutPercent,
            beakPercent: directionalInfo.beakPercent
        };
        // If it can't possibly fit within the bounds just put it into it's initial position.
        if (!_canRectangleFitWithinBounds(estimatedPosition, boundingRectangle)) {
            return callout;
        }
        if (!coverTarget && !directionalHintFixed) {
            callout = _flipRectangleToFit(callout, targetRectangle, directionalInfo.targetPercent, boundingRectangle, gap);
        }
        var outOfBounds = _getOutOfBoundsEdges(callout.calloutRectangle, boundingRectangle);
        for (var _i = 0, outOfBounds_3 = outOfBounds; _i < outOfBounds_3.length; _i++) {
            var direction = outOfBounds_3[_i];
            callout.calloutRectangle = _alignEdgeToCoordinate(callout.calloutRectangle, boundingRectangle[RectangleEdge[direction]], direction);
            var adjustedPercent = _recalculateMatchingPercents(callout.calloutRectangle, callout.targetEdge, targetRectangle, callout.targetEdge, directionalInfo.targetPercent);
            callout.alignPercent = adjustedPercent;
        }
        return callout;
    }
    positioningFunctions._getBestRectangleFitWithinBounds = _getBestRectangleFitWithinBounds;
    function _positionBeak(beakWidth, callout, targetRectangle, border) {
        var calloutRect = new Utilities_1.Rectangle(0, callout.calloutRectangle.width - border * 2, 0, callout.calloutRectangle.height - border * 2);
        var beakRectangle = new Utilities_1.Rectangle(0, beakWidth, 0, beakWidth);
        var recalculatedPercent = _recalculateMatchingPercents(callout.calloutRectangle, callout.calloutEdge, targetRectangle, callout.targetEdge, callout.beakPercent);
        var estimatedTargetPoint = _getPointOnEdgeFromPercent(calloutRect, callout.calloutEdge, recalculatedPercent);
        return _finalizeBeakPosition(beakRectangle, callout, estimatedTargetPoint, border);
    }
    positioningFunctions._positionBeak = _positionBeak;
    function _finalizeBeakPosition(beakRectangle, callout, estimatedTargetPoint, border) {
        var beakPixelSize = _calculateActualBeakWidthInPixels(beakRectangle.width) / 2;
        var innerRect = null;
        var beakPoint = { x: beakRectangle.width / 2, y: beakRectangle.width / 2 };
        if (callout.calloutEdge === RectangleEdge.bottom || callout.calloutEdge === RectangleEdge.top) {
            innerRect = new Utilities_1.Rectangle(beakPixelSize, callout.calloutRectangle.width - beakPixelSize - border * 2, 0, callout.calloutRectangle.height - border * 2);
        }
        else {
            innerRect = new Utilities_1.Rectangle(0, callout.calloutRectangle.width - border * 2, beakPixelSize, callout.calloutRectangle.height - beakPixelSize - border * 2);
        }
        var finalPoint = _getClosestPointOnEdgeToPoint(innerRect, callout.calloutEdge, estimatedTargetPoint);
        return _movePointOnRectangleToPoint(beakRectangle, beakPoint, finalPoint);
    }
    positioningFunctions._finalizeBeakPosition = _finalizeBeakPosition;
    function _getRectangleFromIRect(rect) {
        return new Utilities_1.Rectangle(rect.left, rect.right, rect.top, rect.bottom);
    }
    positioningFunctions._getRectangleFromIRect = _getRectangleFromIRect;
    function _finalizeCalloutPosition(calloutRectangle, hostElement) {
        var hostRect = _getRectangleFromHTMLElement(hostElement);
        var topPosition = calloutRectangle.top - hostRect.top;
        var leftPosition = calloutRectangle.left - hostRect.left;
        return new Utilities_1.Rectangle(leftPosition, leftPosition + calloutRectangle.width, topPosition, topPosition + calloutRectangle.height);
    }
    positioningFunctions._finalizeCalloutPosition = _finalizeCalloutPosition;
    /**
     * Finds the percent on the recalculateRect that matches the percent on the target rect based on position.
     */
    function _recalculateMatchingPercents(recalculateRect, rectangleEdge, targetRect, targetEdge, targetPercent) {
        var targetPoint = _getPointOnEdgeFromPercent(targetRect, targetEdge, targetPercent);
        var adjustedPoint = _getClosestPointOnEdgeToPoint(recalculateRect, rectangleEdge, targetPoint);
        var adjustedPercent = _getPercentOfEdgeFromPoint(recalculateRect, rectangleEdge, adjustedPoint);
        if (adjustedPercent > 100) {
            adjustedPercent = 100;
        }
        else if (adjustedPercent < 0) {
            adjustedPercent = 0;
        }
        return adjustedPercent;
    }
    positioningFunctions._recalculateMatchingPercents = _recalculateMatchingPercents;
    function _canRectangleFitWithinBounds(rect, boundingRect) {
        if (rect.width > boundingRect.width || rect.height > boundingRect.height) {
            return false;
        }
        return true;
    }
    positioningFunctions._canRectangleFitWithinBounds = _canRectangleFitWithinBounds;
    function _isRectangleWithinBounds(rect, boundingRect) {
        if (rect.top < boundingRect.top) {
            return false;
        }
        if (rect.bottom > boundingRect.bottom) {
            return false;
        }
        if (rect.left < boundingRect.left) {
            return false;
        }
        if (rect.right > boundingRect.right) {
            return false;
        }
        return true;
    }
    positioningFunctions._isRectangleWithinBounds = _isRectangleWithinBounds;
    /**
     * Gets all of the edges of a rectangle that are outside of the given bounds.
     * If there are no out of bounds edges it returns an empty array.
     */
    function _getOutOfBoundsEdges(rect, boundingRect) {
        var outOfBounds = new Array();
        if (rect.top < boundingRect.top) {
            outOfBounds.push(RectangleEdge.top);
        }
        if (rect.bottom > boundingRect.bottom) {
            outOfBounds.push(RectangleEdge.bottom);
        }
        if (rect.left < boundingRect.left) {
            outOfBounds.push(RectangleEdge.left);
        }
        if (rect.right > boundingRect.right) {
            outOfBounds.push(RectangleEdge.right);
        }
        return outOfBounds;
    }
    positioningFunctions._getOutOfBoundsEdges = _getOutOfBoundsEdges;
    /**
     * Returns a point on a edge that is x% of the way down it.
     */
    function _getPointOnEdgeFromPercent(rect, direction, percentOfRect) {
        var startPoint;
        var endPoint;
        switch (direction) {
            case RectangleEdge.top:
                startPoint = { x: rect.left, y: rect.top };
                endPoint = { x: rect.right, y: rect.top };
                break;
            case RectangleEdge.left:
                startPoint = { x: rect.left, y: rect.top };
                endPoint = { x: rect.left, y: rect.bottom };
                break;
            case RectangleEdge.right:
                startPoint = { x: rect.right, y: rect.top };
                endPoint = { x: rect.right, y: rect.bottom };
                break;
            case RectangleEdge.bottom:
                startPoint = { x: rect.left, y: rect.bottom };
                endPoint = { x: rect.right, y: rect.bottom };
                break;
            default:
                startPoint = { x: 0, y: 0 };
                endPoint = { x: 0, y: 0 };
                break;
        }
        return _calculatePointPercentAlongLine(startPoint, endPoint, percentOfRect);
    }
    positioningFunctions._getPointOnEdgeFromPercent = _getPointOnEdgeFromPercent;
    /**
     * Gets the percent down an edge that a point appears.
     */
    function _getPercentOfEdgeFromPoint(rect, direction, valueOnEdge) {
        switch (direction) {
            case RectangleEdge.top:
            case RectangleEdge.bottom:
                return rect.width !== 0 ? (valueOnEdge.x - rect.left) / rect.width * 100 : 100;
            case RectangleEdge.left:
            case RectangleEdge.right:
                return rect.height !== 0 ? (valueOnEdge.y - rect.top) / rect.height * 100 : 100;
        }
    }
    positioningFunctions._getPercentOfEdgeFromPoint = _getPercentOfEdgeFromPoint;
    /**
     * Percent is based on distance from left to right or up to down. 0% would be left most, 100% would be right most.
     */
    function _calculatePointPercentAlongLine(startPoint, endPoint, percent) {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent / 100);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent / 100);
        return { x: x, y: y };
    }
    positioningFunctions._calculatePointPercentAlongLine = _calculatePointPercentAlongLine;
    function _moveTopLeftOfRectangleToPoint(rect, destination) {
        return new Utilities_1.Rectangle(destination.x, destination.x + rect.width, destination.y, destination.y + rect.height);
    }
    positioningFunctions._moveTopLeftOfRectangleToPoint = _moveTopLeftOfRectangleToPoint;
    /**
     * Aligns the given edge to the target coordinate.
     */
    function _alignEdgeToCoordinate(rect, coordinate, direction) {
        switch (direction) {
            case RectangleEdge.top:
                return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left, y: coordinate });
            case RectangleEdge.bottom:
                return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left, y: coordinate - rect.height });
            case RectangleEdge.left:
                return _moveTopLeftOfRectangleToPoint(rect, { x: coordinate, y: rect.top });
            case RectangleEdge.right:
                return _moveTopLeftOfRectangleToPoint(rect, { x: coordinate - rect.width, y: rect.top });
        }
        return new Utilities_1.Rectangle();
    }
    positioningFunctions._alignEdgeToCoordinate = _alignEdgeToCoordinate;
    /**
     * Moves a point on a given rectangle to the target point. Does not change the rectangles orientation.
     */
    function _movePointOnRectangleToPoint(rect, rectanglePoint, targetPoint) {
        var leftCornerXDifference = rectanglePoint.x - rect.left;
        var leftCornerYDifference = rectanglePoint.y - rect.top;
        return _moveTopLeftOfRectangleToPoint(rect, { x: targetPoint.x - leftCornerXDifference, y: targetPoint.y - leftCornerYDifference });
    }
    positioningFunctions._movePointOnRectangleToPoint = _movePointOnRectangleToPoint;
    /**
     * Moves the given rectangle a certain number of pixels in the given direction;
     */
    function _moveRectangleInDirection(rect, moveDistance, direction) {
        var xModifier = 0;
        var yModifier = 0;
        switch (direction) {
            case RectangleEdge.top:
                yModifier = moveDistance * -1;
                break;
            case RectangleEdge.left:
                xModifier = moveDistance * -1;
                break;
            case RectangleEdge.right:
                xModifier = moveDistance;
                break;
            case RectangleEdge.bottom:
                yModifier = moveDistance;
                break;
        }
        return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left + xModifier, y: rect.top + yModifier });
    }
    positioningFunctions._moveRectangleInDirection = _moveRectangleInDirection;
    /**
     * Moves the given rectangle to an anchor rectangle.
     */
    function _moveRectangleToAnchorRectangle(rect, rectSide, rectPercent, anchorRect, anchorSide, anchorPercent, gap) {
        if (gap === void 0) { gap = 0; }
        var rectTargetPoint = _getPointOnEdgeFromPercent(rect, rectSide, rectPercent);
        var anchorTargetPoint = _getPointOnEdgeFromPercent(anchorRect, anchorSide, anchorPercent);
        var positionedRect = _movePointOnRectangleToPoint(rect, rectTargetPoint, anchorTargetPoint);
        return _moveRectangleInDirection(positionedRect, gap, anchorSide);
    }
    positioningFunctions._moveRectangleToAnchorRectangle = _moveRectangleToAnchorRectangle;
    /**
     * Gets the closet point on an edge to the given point.
     */
    function _getClosestPointOnEdgeToPoint(rect, edge, point) {
        switch (edge) {
            case RectangleEdge.top:
            case RectangleEdge.bottom:
                var x = void 0;
                if (point.x > rect.right) {
                    x = rect.right;
                }
                else if (point.x < rect.left) {
                    x = rect.left;
                }
                else {
                    x = point.x;
                }
                return { x: x, y: rect[RectangleEdge[edge]] };
            case RectangleEdge.left:
            case RectangleEdge.right:
                var y = void 0;
                if (point.y > rect.bottom) {
                    y = rect.bottom;
                }
                else if (point.y < rect.top) {
                    y = rect.top;
                }
                else {
                    y = point.y;
                }
                return { x: rect[RectangleEdge[edge]], y: y };
        }
    }
    positioningFunctions._getClosestPointOnEdgeToPoint = _getClosestPointOnEdgeToPoint;
    // Since the beak is rotated 45 degrees the actual height/width is the length of the diagonal.
    // We still want to position the beak based on it's midpoint which does not change. It will
    // be at (beakwidth / 2, beakwidth / 2)
    function _calculateActualBeakWidthInPixels(beakWidth) {
        return Math.sqrt(beakWidth * beakWidth * 2);
    }
    positioningFunctions._calculateActualBeakWidthInPixels = _calculateActualBeakWidthInPixels;
    function _getBorderSize(element) {
        var styles = getComputedStyle(element, null);
        var topBorder = parseFloat(styles.borderTopWidth);
        var bottomBorder = parseFloat(styles.borderBottomWidth);
        var leftBorder = parseFloat(styles.borderLeftWidth);
        var rightBorder = parseFloat(styles.borderRightWidth);
        // If any of the borders are NaN default to 0
        if (isNaN(topBorder) || isNaN(bottomBorder) || isNaN(leftBorder) || isNaN(rightBorder)) {
            return 0;
        }
        // If all of the borders are the same size, any value;
        if (topBorder === bottomBorder && bottomBorder === leftBorder && leftBorder === rightBorder) {
            return topBorder;
        }
        // If the borders do not agree, return 0
        return 0;
    }
    positioningFunctions._getBorderSize = _getBorderSize;
    function _getPositionData(direction, target, boundingRect, coverTarget) {
        var directionalInfo = coverTarget ? CoverDictionary[direction] : DirectionalDictionary[direction];
        if (directionalInfo.isAuto) {
            var center = _getPointOnEdgeFromPercent(target, directionalInfo.targetDirection, 50);
            if (center.x <= boundingRect.width / 2) {
                directionalInfo.calloutPercent = 0;
                directionalInfo.targetPercent = 0;
            }
            else {
                directionalInfo.calloutPercent = 100;
                directionalInfo.targetPercent = 100;
            }
        }
        return directionalInfo;
    }
    positioningFunctions._getPositionData = _getPositionData;
    function _flipRectangleToFit(callout, targetRect, targetPercent, boundingRect, gap) {
        var directions = [RectangleEdge.left, RectangleEdge.right, RectangleEdge.top, RectangleEdge.bottom];
        var currentEdge = callout.targetEdge;
        // Make a copy to presever the original positioning.
        var positionedCallout = Utilities_1.assign({}, callout);
        // Keep switching sides until one is found with enough space. If all sides don't fit then return the unmodified callout.
        for (var i = 0; i < 4; i++) {
            var outOfBounds = _getOutOfBoundsEdges(positionedCallout.calloutRectangle, boundingRect);
            var index = outOfBounds.indexOf(currentEdge);
            var oppositeEdge = OppositeEdgeDictionary[currentEdge];
            if (index > -1) {
                directions.splice(directions.indexOf(currentEdge), 1);
                currentEdge = directions.indexOf(oppositeEdge) > -1 ? oppositeEdge : directions.slice(-1)[0];
                positionedCallout.calloutEdge = OppositeEdgeDictionary[currentEdge];
                positionedCallout.targetEdge = currentEdge;
                positionedCallout.calloutRectangle = _moveRectangleToAnchorRectangle(positionedCallout.calloutRectangle, positionedCallout.calloutEdge, positionedCallout.alignPercent, targetRect, positionedCallout.targetEdge, targetPercent, gap);
            }
            else {
                return positionedCallout;
            }
        }
        return callout;
    }
    positioningFunctions._flipRectangleToFit = _flipRectangleToFit;
})(positioningFunctions = exports.positioningFunctions || (exports.positioningFunctions = {}));
var _a, _b, _c, _d;



/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = __webpack_require__(13);
var Utilities_1 = __webpack_require__(1);
var Selection = (function () {
    function Selection(options) {
        if (options === void 0) { options = {}; }
        var onSelectionChanged = options.onSelectionChanged, getKey = options.getKey, _a = options.canSelectItem, canSelectItem = _a === void 0 ? function (item) { return true; } : _a;
        this.getKey = getKey || (function (item, index) { return (item ? item.key : String(index)); });
        this._changeEventSuppressionCount = 0;
        this._exemptedCount = 0;
        this._anchoredIndex = 0;
        this._unselectableCount = 0;
        this.setItems([], true);
        this._onSelectionChanged = onSelectionChanged;
        this.canSelectItem = canSelectItem;
    }
    Selection.prototype.setChangeEvents = function (isEnabled, suppressChange) {
        this._changeEventSuppressionCount += isEnabled ? -1 : 1;
        if (this._changeEventSuppressionCount === 0 && this._hasChanged) {
            this._hasChanged = false;
            if (!suppressChange) {
                this._change();
            }
        }
    };
    /**
     * Selection needs the items, call this method to set them. If the set
     * of items is the same, this will re-evaluate selection and index maps.
     * Otherwise, shouldClear should be set to true, so that selection is
     * cleared.
     */
    Selection.prototype.setItems = function (items, shouldClear) {
        if (shouldClear === void 0) { shouldClear = true; }
        var newKeyToIndexMap = {};
        var newUnselectableIndices = {};
        var hasSelectionChanged = false;
        this.setChangeEvents(false);
        // Reset the unselectable count.
        this._unselectableCount = 0;
        // Build lookup table for quick selection evaluation.
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item) {
                newKeyToIndexMap[this.getKey(item, i)] = i;
            }
            newUnselectableIndices[i] = item && !this.canSelectItem(item);
            if (newUnselectableIndices[i]) {
                this._unselectableCount++;
            }
        }
        if (shouldClear) {
            this.setAllSelected(false);
        }
        // Check the exemption list for discrepencies.
        var newExemptedIndicies = {};
        for (var indexProperty in this._exemptedIndices) {
            if (this._exemptedIndices.hasOwnProperty(indexProperty)) {
                var index = Number(indexProperty);
                var item = this._items[index];
                var exemptKey = item ? this.getKey(item, Number(index)) : undefined;
                var newIndex = exemptKey ? newKeyToIndexMap[exemptKey] : index;
                if (newIndex === undefined) {
                    // We don't know the index of the item any more so it's either moved or removed.
                    // In this case we reset the entire selection.
                    this.setAllSelected(false);
                    break;
                }
                else {
                    // We know the new index of the item. update the existing exemption table.
                    newExemptedIndicies[newIndex] = true;
                    hasSelectionChanged = hasSelectionChanged || (newIndex !== index);
                }
            }
        }
        this._exemptedIndices = newExemptedIndicies;
        this._keyToIndexMap = newKeyToIndexMap;
        this._unselectableIndices = newUnselectableIndices;
        this._items = items || [];
        if (hasSelectionChanged) {
            this._change();
        }
        this.setChangeEvents(true);
    };
    Selection.prototype.getItems = function () {
        return this._items;
    };
    Selection.prototype.getSelection = function () {
        if (!this._selectedItems) {
            this._selectedItems = [];
            for (var i = 0; i < this._items.length; i++) {
                if (this.isIndexSelected(i)) {
                    this._selectedItems.push(this._items[i]);
                }
            }
        }
        return this._selectedItems;
    };
    Selection.prototype.getSelectedCount = function () {
        return this._isAllSelected ? (this._items.length - this._exemptedCount - this._unselectableCount) : (this._exemptedCount);
    };
    Selection.prototype.isRangeSelected = function (fromIndex, count) {
        var endIndex = fromIndex + count;
        for (var i = fromIndex; i < endIndex; i++) {
            if (!this.isIndexSelected(i)) {
                return false;
            }
        }
        return true;
    };
    Selection.prototype.isAllSelected = function () {
        var selectableCount = this._items.length - this._unselectableCount;
        return ((this.count > 0) &&
            (this._isAllSelected && this._exemptedCount === 0) ||
            (!this._isAllSelected && (this._exemptedCount === selectableCount) && selectableCount > 0));
    };
    Selection.prototype.isKeySelected = function (key) {
        var index = this._keyToIndexMap[key];
        return this.isIndexSelected(index);
    };
    Selection.prototype.isIndexSelected = function (index) {
        return !!((this.count > 0) &&
            (this._isAllSelected && !this._exemptedIndices[index] && !this._unselectableIndices[index]) ||
            (!this._isAllSelected && this._exemptedIndices[index]));
    };
    Selection.prototype.setAllSelected = function (isAllSelected) {
        var selectableCount = this._items ? (this._items.length - this._unselectableCount) : 0;
        if (selectableCount > 0 && (this._exemptedCount > 0 || isAllSelected !== this._isAllSelected)) {
            this._exemptedIndices = {};
            this._exemptedCount = 0;
            this._isAllSelected = isAllSelected;
            this._updateCount();
        }
    };
    Selection.prototype.setKeySelected = function (key, isSelected, shouldAnchor) {
        var index = this._keyToIndexMap[key];
        if (index >= 0) {
            this.setIndexSelected(index, isSelected, shouldAnchor);
        }
    };
    Selection.prototype.setIndexSelected = function (index, isSelected, shouldAnchor) {
        // Clamp the index.
        index = Math.min(Math.max(0, index), this._items.length - 1);
        // No-op on out of bounds selections.
        if (index < 0 || index >= this._items.length) {
            return;
        }
        var isExempt = this._exemptedIndices[index];
        var hasChanged = false;
        var canSelect = !this._unselectableIndices[index];
        if (canSelect) {
            // Determine if we need to remove the exemption.
            if (isExempt && ((isSelected && this._isAllSelected) ||
                (!isSelected && !this._isAllSelected))) {
                hasChanged = true;
                delete this._exemptedIndices[index];
                this._exemptedCount--;
            }
            // Determine if we need to add the exemption.
            if (!isExempt && ((isSelected && !this._isAllSelected) ||
                (!isSelected && this._isAllSelected))) {
                hasChanged = true;
                this._exemptedIndices[index] = true;
                this._exemptedCount++;
            }
            if (shouldAnchor) {
                this._anchoredIndex = index;
            }
        }
        if (hasChanged) {
            this._updateCount();
        }
    };
    Selection.prototype.selectToKey = function (key, clearSelection) {
        this.selectToIndex(this._keyToIndexMap[key], clearSelection);
    };
    Selection.prototype.selectToIndex = function (index, clearSelection) {
        var anchorIndex = this._anchoredIndex || 0;
        var startIndex = Math.min(index, anchorIndex);
        var endIndex = Math.max(index, anchorIndex);
        this.setChangeEvents(false);
        if (clearSelection) {
            this.setAllSelected(false);
        }
        for (; startIndex <= endIndex; startIndex++) {
            this.setIndexSelected(startIndex, true, false);
        }
        this.setChangeEvents(true);
    };
    Selection.prototype.toggleAllSelected = function () {
        this.setAllSelected(!this.isAllSelected());
    };
    Selection.prototype.toggleKeySelected = function (key) {
        this.setKeySelected(key, !this.isKeySelected(key), true);
    };
    Selection.prototype.toggleIndexSelected = function (index) {
        this.setIndexSelected(index, !this.isIndexSelected(index), true);
    };
    Selection.prototype.toggleRangeSelected = function (fromIndex, count) {
        var isRangeSelected = this.isRangeSelected(fromIndex, count);
        var endIndex = fromIndex + count;
        this.setChangeEvents(false);
        for (var i = fromIndex; i < endIndex; i++) {
            this.setIndexSelected(i, !isRangeSelected, false);
        }
        this.setChangeEvents(true);
    };
    Selection.prototype._updateCount = function () {
        this.count = this.getSelectedCount();
        this._change();
    };
    Selection.prototype._change = function () {
        if (this._changeEventSuppressionCount === 0) {
            this._selectedItems = null;
            Utilities_1.EventGroup.raise(this, interfaces_1.SELECTION_CHANGE);
            if (this._onSelectionChanged) {
                this._onSelectionChanged();
            }
        }
        else {
            this._hasChanged = true;
        }
    };
    return Selection;
}());
exports.Selection = Selection;



/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var SelectionLayout_1 = __webpack_require__(76);
var interfaces_1 = __webpack_require__(13);
// Selection definitions:
//
// Anchor index: the point from which a range selection starts.
// Focus index: the point from which layout movement originates from.
//
// These two can differ. Tests:
//
// If you start at index 5
// Shift click to index 10
//    The focus is 10, the anchor is 5.
// If you shift click at index 0
//    The anchor remains at 5, the items between 0 and 5 are selected and everything else is cleared.
// If you click index 8
//    The anchor and focus are set to 8.
var SELECTION_DISABLED_ATTRIBUTE_NAME = 'data-selection-disabled';
var SELECTION_INDEX_ATTRIBUTE_NAME = 'data-selection-index';
var SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle';
var SELECTION_INVOKE_ATTRIBUTE_NAME = 'data-selection-invoke';
var SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME = 'data-selection-all-toggle';
var SelectionZone = (function (_super) {
    __extends(SelectionZone, _super);
    function SelectionZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionZone.prototype.componentDidMount = function () {
        var win = Utilities_1.getWindow(this.refs.root);
        var scrollElement = Utilities_1.findScrollableParent(this.refs.root);
        // Track the latest modifier keys globally.
        this._events.on(win, 'keydown keyup', this._updateModifiers);
        this._events.on(scrollElement, 'click', this._tryClearOnEmptyClick);
    };
    SelectionZone.prototype.render = function () {
        return (React.createElement("div", __assign({ className: 'ms-SelectionZone', ref: 'root', onKeyDown: this._onKeyDown, onMouseDown: this._onMouseDown, onClick: this._onClick, onDoubleClick: this._onDoubleClick, onContextMenu: this._onContextMenu }, {
            onMouseDownCapture: this._onMouseDownCapture,
            onFocusCapture: this._onFocus
        }), this.props.children));
    };
    /**
     * In some cases, the consuming scenario requires to set focus on a row without having SelectionZone
     * react to the event. Note that focus events in IE <= 11 will occur asynchronously after .focus() has
     * been called on an element, so we need a flag to store the idea that we will bypass the "next"
     * focus event that occurs. This method does that.
     */
    SelectionZone.prototype.ignoreNextFocus = function () {
        this._shouldHandleFocus = false;
    };
    SelectionZone.prototype._onMouseDownCapture = function (ev) {
        if (document.activeElement !== ev.target && !Utilities_1.elementContains(document.activeElement, ev.target)) {
            this.ignoreNextFocus();
        }
    };
    /**
     * When we focus an item, for single/multi select scenarios, we should try to select it immediately
     * as long as the focus did not originate from a mouse down/touch event. For those cases, we handle them
     * specially.
     */
    SelectionZone.prototype._onFocus = function (ev) {
        var target = ev.target;
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        var isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;
        if (this._shouldHandleFocus && selectionMode !== interfaces_1.SelectionMode.none) {
            var isToggle = this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME);
            var itemRoot = this._findItemRoot(target);
            if (!isToggle && itemRoot) {
                var index = this._getItemIndex(itemRoot);
                if (isToggleModifierPressed) {
                    // set anchor only.
                    selection.setIndexSelected(index, selection.isIndexSelected(index), true);
                }
                else {
                    this._onItemSurfaceClick(ev, index);
                }
            }
        }
        this._shouldHandleFocus = false;
    };
    SelectionZone.prototype._onMouseDown = function (ev) {
        this._updateModifiers(ev);
        var target = ev.target;
        var itemRoot = this._findItemRoot(target);
        while (target !== this.refs.root) {
            if (this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
                break;
            }
            else if (itemRoot) {
                if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                    break;
                }
                else if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                    this._onInvokeMouseDown(ev, this._getItemIndex(itemRoot));
                    break;
                }
                else if (target === itemRoot) {
                    break;
                }
            }
            target = Utilities_1.getParent(target);
        }
    };
    SelectionZone.prototype._onClick = function (ev) {
        this._updateModifiers(ev);
        var target = ev.target;
        var itemRoot = this._findItemRoot(target);
        // No-op if selection is disabled
        if (this._isSelectionDisabled(target)) {
            return;
        }
        while (target !== this.refs.root) {
            if (this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
                this._onToggleAllClick(ev);
                break;
            }
            else if (itemRoot) {
                var index = this._getItemIndex(itemRoot);
                if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                    if (this._isShiftPressed) {
                        this._onItemSurfaceClick(ev, index);
                    }
                    else {
                        this._onToggleClick(ev, index);
                    }
                    break;
                }
                else if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                    this._onInvokeClick(ev, index);
                    break;
                }
                else if (target === itemRoot) {
                    this._onItemSurfaceClick(ev, index);
                    break;
                }
            }
            target = Utilities_1.getParent(target);
        }
    };
    SelectionZone.prototype._onContextMenu = function (ev) {
        var target = ev.target;
        var _a = this.props, onItemContextMenu = _a.onItemContextMenu, selection = _a.selection;
        if (onItemContextMenu) {
            var itemRoot = this._findItemRoot(target);
            if (itemRoot) {
                var index = this._getItemIndex(itemRoot);
                onItemContextMenu(selection.getItems()[index], index, ev.nativeEvent);
                ev.preventDefault();
            }
        }
    };
    SelectionZone.prototype._isSelectionDisabled = function (target) {
        while (target !== this.refs.root) {
            if (this._hasAttribute(target, SELECTION_DISABLED_ATTRIBUTE_NAME)) {
                return true;
            }
            target = Utilities_1.getParent(target);
        }
        return false;
    };
    /**
     * In multi selection, if you double click within an item's root (but not within the invoke element or input elements),
     * we should execute the invoke handler.
     */
    SelectionZone.prototype._onDoubleClick = function (ev) {
        var target = ev.target;
        if (this._isSelectionDisabled(target)) {
            return;
        }
        var _a = this.props, selectionMode = _a.selectionMode, onItemInvoked = _a.onItemInvoked;
        var itemRoot = this._findItemRoot(target);
        if (itemRoot && onItemInvoked && selectionMode !== interfaces_1.SelectionMode.none && !this._isInputElement(target)) {
            var index = this._getItemIndex(itemRoot);
            while (target !== this.refs.root) {
                if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME) ||
                    this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                    break;
                }
                else if (target === itemRoot) {
                    this._onInvokeClick(ev, index);
                    break;
                }
                target = Utilities_1.getParent(target);
            }
            target = Utilities_1.getParent(target);
        }
    };
    SelectionZone.prototype._onKeyDown = function (ev) {
        this._updateModifiers(ev);
        var target = ev.target;
        if (this._isSelectionDisabled(target)) {
            return;
        }
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        var isSelectAllKey = ev.which === Utilities_1.KeyCodes.a && (this._isCtrlPressed || this._isMetaPressed);
        var isClearSelectionKey = ev.which === Utilities_1.KeyCodes.escape;
        // Ignore key downs from input elements.
        if (this._isInputElement(target)) {
            // A key was pressed while an item in this zone was focused.
            this._shouldHandleFocus = true;
            return;
        }
        // If ctrl-a is pressed, select all (if all are not already selected.)
        if (isSelectAllKey && selectionMode === interfaces_1.SelectionMode.multiple && !selection.isAllSelected()) {
            selection.setAllSelected(true);
            ev.stopPropagation();
            ev.preventDefault();
            return;
        }
        // If escape is pressed, clear selection (if any are selected.)
        if (isClearSelectionKey && selection.getSelectedCount() > 0) {
            selection.setAllSelected(false);
            ev.stopPropagation();
            ev.preventDefault();
            return;
        }
        var itemRoot = this._findItemRoot(target);
        // If a key was pressed within an item, we should treat "enters" as invokes and "space" as toggle
        if (itemRoot) {
            var index = this._getItemIndex(itemRoot);
            while (target !== this.refs.root) {
                if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                    // For toggle elements, assuming they are rendered as buttons, they will generate a click event,
                    // so we can no-op for any keydowns in this case.
                    break;
                }
                else if ((ev.which === Utilities_1.KeyCodes.enter || ev.which === Utilities_1.KeyCodes.space) &&
                    (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT')) {
                    return false;
                }
                else if (target === itemRoot) {
                    if (ev.which === Utilities_1.KeyCodes.enter) {
                        this._onInvokeClick(ev, index);
                        ev.preventDefault();
                        return;
                    }
                    else if (ev.which === Utilities_1.KeyCodes.space) {
                        this._onToggleClick(ev, index);
                        ev.preventDefault();
                        return;
                    }
                    break;
                }
                target = Utilities_1.getParent(target);
            }
            // A key was pressed while an item in this zone was focused.
            this._shouldHandleFocus = true;
        }
    };
    SelectionZone.prototype._onToggleAllClick = function (ev) {
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        if (selectionMode === interfaces_1.SelectionMode.multiple) {
            selection.toggleAllSelected();
            ev.stopPropagation();
            ev.preventDefault();
        }
    };
    SelectionZone.prototype._onToggleClick = function (ev, index) {
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        if (selectionMode === interfaces_1.SelectionMode.multiple) {
            selection.toggleIndexSelected(index);
        }
        else if (selectionMode === interfaces_1.SelectionMode.single) {
            var isSelected = selection.isIndexSelected(index);
            selection.setChangeEvents(false);
            selection.setAllSelected(false);
            selection.setIndexSelected(index, !isSelected, true);
            selection.setChangeEvents(true);
        }
        else {
            return;
        }
        ev.stopPropagation();
        // NOTE: ev.preventDefault is not called for toggle clicks, because this will kill the browser behavior
        // for checkboxes if you use a checkbox for the toggle.
    };
    SelectionZone.prototype._onInvokeClick = function (ev, index) {
        var _a = this.props, selection = _a.selection, onItemInvoked = _a.onItemInvoked;
        if (onItemInvoked) {
            onItemInvoked(selection.getItems()[index], index, ev.nativeEvent);
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    SelectionZone.prototype._onItemSurfaceClick = function (ev, index) {
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        var isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;
        if (selectionMode === interfaces_1.SelectionMode.multiple) {
            if (this._isShiftPressed) {
                selection.selectToIndex(index, !isToggleModifierPressed);
            }
            else if (isToggleModifierPressed) {
                selection.toggleIndexSelected(index);
            }
            else {
                this._clearAndSelectIndex(index);
            }
        }
        else if (selectionMode === interfaces_1.SelectionMode.single) {
            this._clearAndSelectIndex(index);
        }
    };
    SelectionZone.prototype._onInvokeMouseDown = function (ev, index) {
        var selection = this.props.selection;
        // Only do work if item is not selected.
        if (selection.isIndexSelected(index)) {
            return;
        }
        this._clearAndSelectIndex(index);
    };
    SelectionZone.prototype._tryClearOnEmptyClick = function (ev) {
        if (!this.props.selectionPreservedOnEmptyClick &&
            this._isNonHandledClick(ev.target)) {
            this.props.selection.setAllSelected(false);
        }
    };
    SelectionZone.prototype._clearAndSelectIndex = function (index) {
        var selection = this.props.selection;
        var isAlreadySingleSelected = selection.getSelectedCount() === 1 && selection.isIndexSelected(index);
        if (!isAlreadySingleSelected) {
            selection.setChangeEvents(false);
            selection.setAllSelected(false);
            selection.setIndexSelected(index, true, true);
            selection.setChangeEvents(true);
        }
    };
    /**
     * We need to track the modifier key states so that when focus events occur, which do not contain
     * modifier states in the Event object, we know how to behave.
     */
    SelectionZone.prototype._updateModifiers = function (ev) {
        this._isShiftPressed = ev.shiftKey;
        this._isCtrlPressed = ev.ctrlKey;
        this._isMetaPressed = ev.metaKey;
    };
    SelectionZone.prototype._findItemRoot = function (target) {
        var selection = this.props.selection;
        while (target !== this.refs.root) {
            var indexValue = target.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME);
            var index = Number(indexValue);
            if (indexValue !== null && index >= 0 && index < selection.getItems().length) {
                break;
            }
            target = Utilities_1.getParent(target);
        }
        if (target === this.refs.root) {
            return undefined;
        }
        return target;
    };
    SelectionZone.prototype._getItemIndex = function (itemRoot) {
        return Number(itemRoot.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME));
    };
    SelectionZone.prototype._hasAttribute = function (element, attributeName) {
        var isToggle = false;
        while (!isToggle && element !== this.refs.root) {
            isToggle = element.getAttribute(attributeName) === 'true';
            element = Utilities_1.getParent(element);
        }
        return isToggle;
    };
    SelectionZone.prototype._isInputElement = function (element) {
        return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
    };
    SelectionZone.prototype._isNonHandledClick = function (element) {
        var doc = Utilities_1.getDocument();
        if (doc && element) {
            while (element && element !== doc.documentElement) {
                if (Utilities_1.isElementTabbable(element)) {
                    return false;
                }
                element = Utilities_1.getParent(element);
            }
        }
        return true;
    };
    return SelectionZone;
}(Utilities_1.BaseComponent));
SelectionZone.defaultProps = {
    layout: new SelectionLayout_1.SelectionLayout(interfaces_1.SelectionDirection.vertical),
    isMultiSelectEnabled: true,
    isSelectedOnFocus: true,
    selectionMode: interfaces_1.SelectionMode.multiple
};
__decorate([
    Utilities_1.autobind
], SelectionZone.prototype, "ignoreNextFocus", null);
__decorate([
    Utilities_1.autobind
], SelectionZone.prototype, "_onMouseDownCapture", null);
__decorate([
    Utilities_1.autobind
], SelectionZone.prototype, "_onFocus", null);
__decorate([
    Utilities_1.autobind
], SelectionZone.prototype, "_onMouseDown", null);
__decorate([
    Utilities_1.autobind
], SelectionZone.prototype, "_onClick", null);
__decorate([
    Utilities_1.autobind
], SelectionZone.prototype, "_onContextMenu", null);
__decorate([
    Utilities_1.autobind
], SelectionZone.prototype, "_onDoubleClick", null);
__decorate([
    Utilities_1.autobind
], SelectionZone.prototype, "_onKeyDown", null);
exports.SelectionZone = SelectionZone;



/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = __webpack_require__(77);

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._61);
  p._81 = 1;
  p._65 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._81 === 3) {
            val = val._65;
          }
          if (val._81 === 1) return res(i, val._65);
          if (val._81 === 2) reject(val._65);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};


/***/ }),
/* 238 */
/***/ (function(module, exports) {

// should work in any browser without browserify

if (typeof Promise.prototype.done !== 'function') {
  Promise.prototype.done = function (onFulfilled, onRejected) {
    var self = arguments.length ? this.then.apply(this, arguments) : this
    self.then(null, function (err) {
      setTimeout(function () {
        throw err
      }, 0)
    })
  }
}

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// not "use strict" so we can declare global "Promise"

var asap = __webpack_require__(131);

if (typeof Promise === 'undefined') {
  Promise = __webpack_require__(77)
  __webpack_require__(237)
}

__webpack_require__(238);


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(30);
  var warning = __webpack_require__(54);
  var ReactPropTypesSecret = __webpack_require__(39);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(29);
var invariant = __webpack_require__(30);
var ReactPropTypesSecret = __webpack_require__(39);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(29);
var invariant = __webpack_require__(30);
var warning = __webpack_require__(54);

var ReactPropTypesSecret = __webpack_require__(39);
var checkPropTypes = __webpack_require__(240);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Provider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_warning__ = __webpack_require__(40);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_warning__["a" /* default */])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

var Provider = function (_Component) {
  _inherits(Provider, _Component);

  Provider.prototype.getChildContext = function getChildContext() {
    return { store: this.store, storeSubscription: null };
  };

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.store = props.store;
    return _this;
  }

  Provider.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(this.props.children);
  };

  return Provider;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);




if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    var store = this.store;
    var nextStore = nextProps.store;


    if (store !== nextStore) {
      warnAboutReceivingStore();
    }
  };
}

Provider.propTypes = {
  store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
};
Provider.childContextTypes = {
  store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
  storeSubscription: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["b" /* subscriptionShape */]
};
Provider.displayName = 'Provider';
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createConnect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mergeProps__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectorFactory__ = __webpack_require__(248);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__["a" /* default */] : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__["a" /* default */] : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__["a" /* default */] : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? __WEBPACK_IMPORTED_MODULE_4__mergeProps__["a" /* default */] : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? __WEBPACK_IMPORTED_MODULE_5__selectorFactory__["a" /* default */] : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (createConnect());

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapDispatchToPropsIsFunction */
/* unused harmony export whenMapDispatchToPropsIsMissing */
/* unused harmony export whenMapDispatchToPropsIsObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__ = __webpack_require__(79);



function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsFunc */])(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["b" /* wrapMapToPropsConstant */])(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["b" /* wrapMapToPropsConstant */])(function (dispatch) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["bindActionCreators"])(mapDispatchToProps, dispatch);
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapStateToPropsIsFunction */
/* unused harmony export whenMapStateToPropsIsMissing */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__ = __webpack_require__(79);


function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["a" /* wrapMapToPropsFunc */])(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["b" /* wrapMapToPropsConstant */])(function () {
    return {};
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export defaultMergeProps */
/* unused harmony export wrapMergePropsFunc */
/* unused harmony export whenMergePropsIsFunction */
/* unused harmony export whenMergePropsIsOmitted */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(81);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        if (process.env.NODE_ENV !== 'production') __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export impureFinalPropsSelectorFactory */
/* unused harmony export pureFinalPropsSelectorFactory */
/* harmony export (immutable) */ __webpack_exports__["a"] = finalPropsSelectorFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__verifySubselectors__ = __webpack_require__(249);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (process.env.NODE_ENV !== 'production') {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__verifySubselectors__["a" /* default */])(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifySubselectors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_warning__ = __webpack_require__(40);


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_warning__["a" /* default */])('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();



/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shallowEqual;
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createBrowserHistory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_history_createBrowserHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = function (_React$Component) {
  _inherits(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_2_history_createBrowserHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  BrowserRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router__["a" /* Router */], { history: this.history, children: this.props.children });
  };

  return BrowserRouter;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

BrowserRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  forceRefresh: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  keyLength: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
};


/* harmony default export */ __webpack_exports__["a"] = (BrowserRouter);

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createHashHistory__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createHashHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_history_createHashHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter = function (_React$Component) {
  _inherits(HashRouter, _React$Component);

  function HashRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_2_history_createHashHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  HashRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router__["a" /* Router */], { history: this.history, children: this.props.children });
  };

  return HashRouter;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

HashRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  hashType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['hashbang', 'noslash', 'slash']),
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
};


/* harmony default export */ __webpack_exports__["a"] = (HashRouter);

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["i"]; });


/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(82);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
var NavLink = function NavLink(_ref) {
  var to = _ref.to,
      exact = _ref.exact,
      strict = _ref.strict,
      location = _ref.location,
      activeClassName = _ref.activeClassName,
      className = _ref.className,
      activeStyle = _ref.activeStyle,
      style = _ref.style,
      getIsActive = _ref.isActive,
      rest = _objectWithoutProperties(_ref, ['to', 'exact', 'strict', 'location', 'activeClassName', 'className', 'activeStyle', 'style', 'isActive']);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["f" /* Route */], {
    path: (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' ? to.pathname : to,
    exact: exact,
    strict: strict,
    location: location,
    children: function children(_ref2) {
      var location = _ref2.location,
          match = _ref2.match;

      var isActive = !!(getIsActive ? getIsActive(match, location) : match);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], _extends({
        to: to,
        className: isActive ? [activeClassName, className].filter(function (i) {
          return i;
        }).join(' ') : className,
        style: isActive ? _extends({}, style, activeStyle) : style
      }, rest));
    }
  });
};

NavLink.propTypes = {
  to: __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */].propTypes.to,
  exact: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  strict: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  activeClassName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  activeStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  isActive: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

NavLink.defaultProps = {
  activeClassName: 'active'
};

/* harmony default export */ __webpack_exports__["a"] = (NavLink);

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["h"]; });


/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["g"]; });


/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["f"]; });


/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["a"]; });


/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["e"]; });


/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["d"]; });


/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["c"]; });


/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["b"]; });


/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducer__ = __webpack_require__(84);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var ConnectedRouter = function (_Component) {
  _inherits(ConnectedRouter, _Component);

  function ConnectedRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, ConnectedRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleLocationChange = function (location) {
      _this.store.dispatch({
        type: __WEBPACK_IMPORTED_MODULE_3__reducer__["a" /* LOCATION_CHANGE */],
        payload: location
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ConnectedRouter.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        propsStore = _props.store,
        history = _props.history;

    this.store = propsStore || this.context.store;

    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange(history.location);
  };

  ConnectedRouter.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  };

  ConnectedRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["a" /* Router */], this.props);
  };

  return ConnectedRouter;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ConnectedRouter.propTypes = {
  store: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
};
ConnectedRouter.contextTypes = {
  store: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};


/* harmony default export */ __webpack_exports__["a"] = (ConnectedRouter);

/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = routerMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(83);


/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
function routerMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type !== __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* CALL_HISTORY_METHOD */]) {
          return next(action);
        }

        var _action$payload = action.payload,
            method = _action$payload.method,
            args = _action$payload.args;

        history[method].apply(history, args);
      };
    };
  };
}

/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createMemoryHistory__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createMemoryHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_history_createMemoryHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Router__ = __webpack_require__(41);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter = function (_React$Component) {
  _inherits(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_2_history_createMemoryHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  MemoryRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Router__["a" /* default */], { history: this.history, children: this.props.children });
  };

  return MemoryRouter;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

MemoryRouter.propTypes = {
  initialEntries: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  initialIndex: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  keyLength: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
};


/* harmony default export */ __webpack_exports__["a"] = (MemoryRouter);

/***/ }),
/* 267 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

var Prompt = function (_React$Component) {
  _inherits(Prompt, _React$Component);

  function Prompt() {
    _classCallCheck(this, Prompt);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Prompt.prototype.enable = function enable(message) {
    if (this.unblock) this.unblock();

    this.unblock = this.context.router.history.block(message);
  };

  Prompt.prototype.disable = function disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  };

  Prompt.prototype.componentWillMount = function componentWillMount() {
    if (this.props.when) this.enable(this.props.message);
  };

  Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) this.enable(nextProps.message);
    } else {
      this.disable();
    }
  };

  Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
    this.disable();
  };

  Prompt.prototype.render = function render() {
    return null;
  };

  return Prompt;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Prompt.propTypes = {
  when: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  message: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]).isRequired
};
Prompt.defaultProps = {
  when: true
};
Prompt.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      block: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
    }).isRequired
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Prompt);

/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/**
 * The public API for updating the location programatically
 * with a component.
 */

var Redirect = function (_React$Component) {
  _inherits(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Redirect.prototype.isStatic = function isStatic() {
    return this.context.router && this.context.router.staticContext;
  };

  Redirect.prototype.componentWillMount = function componentWillMount() {
    if (this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidMount = function componentDidMount() {
    if (!this.isStatic()) this.perform();
  };

  Redirect.prototype.perform = function perform() {
    var history = this.context.router.history;
    var _props = this.props,
        push = _props.push,
        to = _props.to;


    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Redirect.propTypes = {
  push: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  from: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object])
};
Redirect.defaultProps = {
  push: false
};
Redirect.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      push: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
      replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
    }).isRequired,
    staticContext: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Redirect);

/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_PathUtils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_PathUtils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_PathUtils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(41);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var normalizeLocation = function normalizeLocation(object) {
  var _object$pathname = object.pathname,
      pathname = _object$pathname === undefined ? '/' : _object$pathname,
      _object$search = object.search,
      search = _object$search === undefined ? '' : _object$search,
      _object$hash = object.hash,
      hash = _object$hash === undefined ? '' : _object$hash;


  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var addBasename = function addBasename(basename, location) {
  if (!basename) return location;

  return _extends({}, location, {
    pathname: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["addLeadingSlash"])(basename) + location.pathname
  });
};

var stripBasename = function stripBasename(basename, location) {
  if (!basename) return location;

  var base = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["addLeadingSlash"])(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
};

var createLocation = function createLocation(location) {
  return typeof location === 'string' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["parsePath"])(location) : normalizeLocation(location);
};

var createURL = function createURL(location) {
  return typeof location === 'string' ? location : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["createPath"])(location);
};

var staticHandler = function staticHandler(methodName) {
  return function () {
    __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'You cannot %s with <StaticRouter>', methodName);
  };
};

var noop = function noop() {};

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

var StaticRouter = function (_React$Component) {
  _inherits(StaticRouter, _React$Component);

  function StaticRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, StaticRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createHref = function (path) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["addLeadingSlash"])(_this.props.basename + createURL(path));
    }, _this.handlePush = function (location) {
      var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;

      context.action = 'PUSH';
      context.location = addBasename(basename, createLocation(location));
      context.url = createURL(context.location);
    }, _this.handleReplace = function (location) {
      var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;

      context.action = 'REPLACE';
      context.location = addBasename(basename, createLocation(location));
      context.url = createURL(context.location);
    }, _this.handleListen = function () {
      return noop;
    }, _this.handleBlock = function () {
      return noop;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  StaticRouter.prototype.getChildContext = function getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  };

  StaticRouter.prototype.render = function render() {
    var _props = this.props,
        basename = _props.basename,
        context = _props.context,
        location = _props.location,
        props = _objectWithoutProperties(_props, ['basename', 'context', 'location']);

    var history = {
      createHref: this.createHref,
      action: 'POP',
      location: stripBasename(basename, createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler('go'),
      goBack: staticHandler('goBack'),
      goForward: staticHandler('goForward'),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Router__["a" /* default */], _extends({}, props, { history: history }));
  };

  return StaticRouter;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

StaticRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  context: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object])
};
StaticRouter.defaultProps = {
  basename: '',
  location: '/'
};
StaticRouter.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (StaticRouter);

/***/ }),
/* 270 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matchPath__ = __webpack_require__(42);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    __WEBPACK_IMPORTED_MODULE_2_warning___default()(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    __WEBPACK_IMPORTED_MODULE_2_warning___default()(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
        child = void 0;
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (element) {
      if (!__WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(element)) return;

      var _element$props = element.props,
          pathProp = _element$props.path,
          exact = _element$props.exact,
          strict = _element$props.strict,
          from = _element$props.from;

      var path = pathProp || from;

      if (match == null) {
        child = element;
        match = path ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__matchPath__["a" /* default */])(location.pathname, { path: path, exact: exact, strict: strict }) : route.match;
      }
    });

    return match ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Switch.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    route: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
  }).isRequired
};
Switch.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};


/* harmony default export */ __webpack_exports__["a"] = (Switch);

/***/ }),
/* 271 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Route__ = __webpack_require__(85);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






/**
 * A public higher-order component to access the imperative API
 */
var withRouter = function withRouter(Component) {
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutProperties(props, ['wrappedComponentRef']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Route__["a" /* default */], { render: function render(routeComponentProps) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component, _extends({}, remainingProps, routeComponentProps, { ref: wrappedComponentRef }));
      } });
  };

  C.displayName = 'withRouter(' + (Component.displayName || Component.name) + ')';
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
  };

  return __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics___default()(C, Component);
};

/* harmony default export */ __webpack_exports__["a"] = (withRouter);

/***/ }),
/* 272 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(272)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = sagaMiddlewareFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__channel__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runSaga__ = __webpack_require__(87);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






function sagaMiddlewareFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref$context = _ref.context,
      context = _ref$context === undefined ? {} : _ref$context,
      options = _objectWithoutProperties(_ref, ['context']);

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;


  if (__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(options)) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead');
    } else {
      throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
    }
  }

  if (logger && !__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(logger)) {
    throw new Error('`options.logger` passed to the Saga middleware is not a function!');
  }

  if (process.env.NODE_ENV === 'development' && options.onerror) {
    throw new Error('`options.onerror` was removed. Use `options.onError` instead.');
  }

  if (onError && !__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(onError)) {
    throw new Error('`options.onError` passed to the Saga middleware is not a function!');
  }

  if (options.emitter && !__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].func(options.emitter)) {
    throw new Error('`options.emitter` passed to the Saga middleware is not a function!');
  }

  function sagaMiddleware(_ref2) {
    var getState = _ref2.getState,
        dispatch = _ref2.dispatch;

    var sagaEmitter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* emitter */])();
    sagaEmitter.emit = (options.emitter || __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* ident */])(sagaEmitter.emit);

    sagaMiddleware.run = __WEBPACK_IMPORTED_MODULE_2__runSaga__["a" /* runSaga */].bind(null, {
      context: context,
      subscribe: sagaEmitter.subscribe,
      dispatch: dispatch,
      getState: getState,
      sagaMonitor: sagaMonitor,
      logger: logger,
      onError: onError
    });

    return function (next) {
      return function (action) {
        if (sagaMonitor && sagaMonitor.actionDispatched) {
          sagaMonitor.actionDispatched(action);
        }
        var result = next(action); // hit reducers
        sagaEmitter.emit(action);
        return result;
      };
    };
  }

  sagaMiddleware.run = function () {
    throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
  };

  sagaMiddleware.setContext = function (props) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* check */])(props, __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* is */].object, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* createSetContextWarning */])('sagaMiddleware', props));
    __WEBPACK_IMPORTED_MODULE_0__utils__["z" /* object */].assign(context, props);
  };

  return sagaMiddleware;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 275 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_utils__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TASK", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["r"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SAGA_ACTION", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["p"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deferred", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["s"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "arrayOfDeffered", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["t"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMockTask", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["u"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cloneableGenerator", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_utils__["v"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_io__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "asEffect", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_io__["v"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_proc__ = __webpack_require__(86);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_END", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_proc__["a"]; });




/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsolute = function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
};

// About 1.5x faster than the two-arg version of Array#splice()
var spliceOne = function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }list.pop();
};

// This implementation is based heavily on node's url.parse
var resolvePathname = function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
};

module.exports = resolvePathname;

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var valueEqual = function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
    return valueEqual(item, b[index]);
  });

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
};

exports.default = valueEqual;

/***/ }),
/* 278 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ })
/******/ ]);
//# sourceMappingURL=index-bundle.js.map