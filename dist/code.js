/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");
/* harmony import */ var _sys_run__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sys/run */ "./src/sys/run.ts");
/* harmony import */ var _data_fonts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/fonts */ "./src/data/fonts.ts");
// Import



// Get the user current selection
const selection = figma.currentPage.selection;
// Check if the user has selected anything and that if what they selected is a component
if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.arrayCheck)(selection)) {
    // Load fonts
    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.arrayCheck)(_data_fonts__WEBPACK_IMPORTED_MODULE_2__.fonts)) {
        for (const f of _data_fonts__WEBPACK_IMPORTED_MODULE_2__.fonts) {
            await figma.loadFontAsync(f);
        }
    }
    ;
    // Run the plugin
    try {
        (0,_sys_run__WEBPACK_IMPORTED_MODULE_1__.run)(selection);
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.notifyAndClose)('All done baby!');
    }
    // Catch any errors, log in the console and close plugin
    catch (error) {
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.handleError)('😢😢 Something went wrong', error);
    }
}
// If nothing is selected close the plugin
else {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.notifyAndClose)('"If nothing has been selected, how can anything be documented?" - An ancient design system proverb');
}
;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/data/fonts.ts":
/*!***************************!*\
  !*** ./src/data/fonts.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fonts: () => (/* binding */ fonts)
/* harmony export */ });
// Fonts
const fonts = [
    { family: "IBM Plex Mono", style: "Regular" },
    { family: "IBM Plex Mono", style: "Medium" },
    { family: "Inter", style: "Regular" },
    { family: "Inter", style: "Medium" },
    { family: "Inter", style: "Semi Bold" }
];


/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayCheck: () => (/* binding */ arrayCheck),
/* harmony export */   convertColour: () => (/* binding */ convertColour),
/* harmony export */   handleError: () => (/* binding */ handleError),
/* harmony export */   inArray: () => (/* binding */ inArray),
/* harmony export */   notifyAndClose: () => (/* binding */ notifyAndClose),
/* harmony export */   sortArray: () => (/* binding */ sortArray)
/* harmony export */ });
// Notify with a message and then close plugin
function notifyAndClose(message) {
    // console.clear();
    figma.notify(message);
    figma.closePlugin();
}
// Log the error to the console and close plugin
function handleError(message, error) {
    // Print error to console and then close plugin
    console.log('> Error:', error.message);
    console.log('-------------------');
    console.log(error.stack);
    console.log('-------------------');
    notifyAndClose(message);
}
// Check if something is an array
function arrayCheck(array, length = 0, operator = 'm') {
    if (array) {
        // Return based boolean based on operator
        if (operator === 'm') {
            return Array.isArray(array) && array.length > length ? true : false;
        }
        ;
        if (operator === 'l') {
            return Array.isArray(array) && array.length < length ? true : false;
        }
        ;
        if (operator === 'e') {
            return Array.isArray(array) && array.length === length ? true : false;
        }
        ;
        if (operator === 'em') {
            return Array.isArray(array) && array.length >= length ? true : false;
        }
        ;
        if (operator === 'el') {
            return Array.isArray(array) && array.length <= length ? true : false;
        }
        ;
    }
}
// Check if an item is already in an array
function inArray(item, array) {
    // Check if function can perfomr
    if (arrayCheck(array) && item) {
        const matches = array.filter((a) => JSON.stringify(a) === JSON.stringify(item));
        // Are there any matches?
        if (arrayCheck(matches)) {
            return true;
        }
        else {
            return false;
        }
        ;
    }
    else {
        return false;
    }
    ;
}
// Sort an array
function sortArray(array, key, reverse = null) {
    array.sort((a, b) => {
        // Handle the case when the key is a string or an array
        const valueA = Array.isArray(a[key]) ? a[key][0] : a[key];
        const valueB = Array.isArray(b[key]) ? b[key][0] : b[key];
        // Convert values to numbers if possible
        const numA = parseFloat(valueA);
        const numB = parseFloat(valueB);
        if (!isNaN(numA) && !isNaN(numB)) {
            // Both values are numbers, compare them directly
            return reverse ? numB - numA : numA - numB;
        }
        else {
            // Use localeCompare for string comparison
            return reverse ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
        }
    });
}
// Convert colour from RGB to HEX and vice verca
function convertColour(value) {
    // Set up internal functions
    const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, "0");
    // Set base result
    let result;
    if (arrayCheck(value)) {
        result = `${toHex(value[0])}${toHex(value[1])}${toHex(value[2])}`;
    }
    else {
        const raw = parseInt(value, 16);
        const r = ((raw >> 16) & 255) / 255;
        const g = ((raw >> 8) & 255) / 255;
        const b = (raw & 255) / 255;
        result = { r, g, b };
    }
    return result;
}


/***/ }),

/***/ "./src/sys/run.ts":
/*!************************!*\
  !*** ./src/sys/run.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   run: () => (/* binding */ run)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.ts");

function run(selection) {
    console.log(selection);
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.notifyAndClose)('All done baby!');
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/code.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNvRTtBQUNwQztBQUNLO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLElBQUksb0RBQVU7QUFDZDtBQUNBLFFBQVEsb0RBQVUsQ0FBQyw4Q0FBSztBQUN4Qix3QkFBd0IsOENBQUs7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2Q0FBRztBQUNYLFFBQVEsd0RBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxREFBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0RBQWM7QUFDbEI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDTztBQUNQLE1BQU0sMkNBQTJDO0FBQ2pELE1BQU0sMENBQTBDO0FBQ2hELE1BQU0sbUNBQW1DO0FBQ3pDLE1BQU0sa0NBQWtDO0FBQ3hDLE1BQU07QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRzRDO0FBQ3JDO0FBQ1A7QUFDQSxJQUFJLHdEQUFjO0FBQ2xCOzs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBLHNHQUFzRztXQUN0RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDaEVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHMtZmlnLXBsdWdpbi1kdWJiZXIvLi9zcmMvY29kZS50cyIsIndlYnBhY2s6Ly9kcy1maWctcGx1Z2luLWR1YmJlci8uL3NyYy9kYXRhL2ZvbnRzLnRzIiwid2VicGFjazovL2RzLWZpZy1wbHVnaW4tZHViYmVyLy4vc3JjL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZHMtZmlnLXBsdWdpbi1kdWJiZXIvLi9zcmMvc3lzL3J1bi50cyIsIndlYnBhY2s6Ly9kcy1maWctcGx1Z2luLWR1YmJlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kcy1maWctcGx1Z2luLWR1YmJlci93ZWJwYWNrL3J1bnRpbWUvYXN5bmMgbW9kdWxlIiwid2VicGFjazovL2RzLWZpZy1wbHVnaW4tZHViYmVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcy1maWctcGx1Z2luLWR1YmJlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RzLWZpZy1wbHVnaW4tZHViYmVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHMtZmlnLXBsdWdpbi1kdWJiZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kcy1maWctcGx1Z2luLWR1YmJlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHMtZmlnLXBsdWdpbi1kdWJiZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydFxuaW1wb3J0IHsgYXJyYXlDaGVjaywgaGFuZGxlRXJyb3IsIG5vdGlmeUFuZENsb3NlIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgcnVuIH0gZnJvbSBcIi4vc3lzL3J1blwiO1xuaW1wb3J0IHsgZm9udHMgfSBmcm9tIFwiLi9kYXRhL2ZvbnRzXCI7XG4vLyBHZXQgdGhlIHVzZXIgY3VycmVudCBzZWxlY3Rpb25cbmNvbnN0IHNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbi8vIENoZWNrIGlmIHRoZSB1c2VyIGhhcyBzZWxlY3RlZCBhbnl0aGluZyBhbmQgdGhhdCBpZiB3aGF0IHRoZXkgc2VsZWN0ZWQgaXMgYSBjb21wb25lbnRcbmlmIChhcnJheUNoZWNrKHNlbGVjdGlvbikpIHtcbiAgICAvLyBMb2FkIGZvbnRzXG4gICAgaWYgKGFycmF5Q2hlY2soZm9udHMpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZiBvZiBmb250cykge1xuICAgICAgICAgICAgYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyhmKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICA7XG4gICAgLy8gUnVuIHRoZSBwbHVnaW5cbiAgICB0cnkge1xuICAgICAgICBydW4oc2VsZWN0aW9uKTtcbiAgICAgICAgbm90aWZ5QW5kQ2xvc2UoJ0FsbCBkb25lIGJhYnkhJyk7XG4gICAgfVxuICAgIC8vIENhdGNoIGFueSBlcnJvcnMsIGxvZyBpbiB0aGUgY29uc29sZSBhbmQgY2xvc2UgcGx1Z2luXG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKCfwn5ii8J+YoiBTb21ldGhpbmcgd2VudCB3cm9uZycsIGVycm9yKTtcbiAgICB9XG59XG4vLyBJZiBub3RoaW5nIGlzIHNlbGVjdGVkIGNsb3NlIHRoZSBwbHVnaW5cbmVsc2Uge1xuICAgIG5vdGlmeUFuZENsb3NlKCdcIklmIG5vdGhpbmcgaGFzIGJlZW4gc2VsZWN0ZWQsIGhvdyBjYW4gYW55dGhpbmcgYmUgZG9jdW1lbnRlZD9cIiAtIEFuIGFuY2llbnQgZGVzaWduIHN5c3RlbSBwcm92ZXJiJyk7XG59XG47XG4iLCIvLyBGb250c1xuZXhwb3J0IGNvbnN0IGZvbnRzID0gW1xuICAgIHsgZmFtaWx5OiBcIklCTSBQbGV4IE1vbm9cIiwgc3R5bGU6IFwiUmVndWxhclwiIH0sXG4gICAgeyBmYW1pbHk6IFwiSUJNIFBsZXggTW9ub1wiLCBzdHlsZTogXCJNZWRpdW1cIiB9LFxuICAgIHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIlJlZ3VsYXJcIiB9LFxuICAgIHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIk1lZGl1bVwiIH0sXG4gICAgeyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiU2VtaSBCb2xkXCIgfVxuXTtcbiIsIi8vIE5vdGlmeSB3aXRoIGEgbWVzc2FnZSBhbmQgdGhlbiBjbG9zZSBwbHVnaW5cbmV4cG9ydCBmdW5jdGlvbiBub3RpZnlBbmRDbG9zZShtZXNzYWdlKSB7XG4gICAgLy8gY29uc29sZS5jbGVhcigpO1xuICAgIGZpZ21hLm5vdGlmeShtZXNzYWdlKTtcbiAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xufVxuLy8gTG9nIHRoZSBlcnJvciB0byB0aGUgY29uc29sZSBhbmQgY2xvc2UgcGx1Z2luXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRXJyb3IobWVzc2FnZSwgZXJyb3IpIHtcbiAgICAvLyBQcmludCBlcnJvciB0byBjb25zb2xlIGFuZCB0aGVuIGNsb3NlIHBsdWdpblxuICAgIGNvbnNvbGUubG9nKCc+IEVycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgbm90aWZ5QW5kQ2xvc2UobWVzc2FnZSk7XG59XG4vLyBDaGVjayBpZiBzb21ldGhpbmcgaXMgYW4gYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBhcnJheUNoZWNrKGFycmF5LCBsZW5ndGggPSAwLCBvcGVyYXRvciA9ICdtJykge1xuICAgIGlmIChhcnJheSkge1xuICAgICAgICAvLyBSZXR1cm4gYmFzZWQgYm9vbGVhbiBiYXNlZCBvbiBvcGVyYXRvclxuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdtJykge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyYXkpICYmIGFycmF5Lmxlbmd0aCA+IGxlbmd0aCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ2wnKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnJheSkgJiYgYXJyYXkubGVuZ3RoIDwgbGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnZScpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGFycmF5KSAmJiBhcnJheS5sZW5ndGggPT09IGxlbmd0aCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ2VtJykge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyYXkpICYmIGFycmF5Lmxlbmd0aCA+PSBsZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdlbCcpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGFycmF5KSAmJiBhcnJheS5sZW5ndGggPD0gbGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICB9XG59XG4vLyBDaGVjayBpZiBhbiBpdGVtIGlzIGFscmVhZHkgaW4gYW4gYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBpbkFycmF5KGl0ZW0sIGFycmF5KSB7XG4gICAgLy8gQ2hlY2sgaWYgZnVuY3Rpb24gY2FuIHBlcmZvbXJcbiAgICBpZiAoYXJyYXlDaGVjayhhcnJheSkgJiYgaXRlbSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gYXJyYXkuZmlsdGVyKChhKSA9PiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xuICAgICAgICAvLyBBcmUgdGhlcmUgYW55IG1hdGNoZXM/XG4gICAgICAgIGlmIChhcnJheUNoZWNrKG1hdGNoZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIDtcbn1cbi8vIFNvcnQgYW4gYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QXJyYXkoYXJyYXksIGtleSwgcmV2ZXJzZSA9IG51bGwpIHtcbiAgICBhcnJheS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVuIHRoZSBrZXkgaXMgYSBzdHJpbmcgb3IgYW4gYXJyYXlcbiAgICAgICAgY29uc3QgdmFsdWVBID0gQXJyYXkuaXNBcnJheShhW2tleV0pID8gYVtrZXldWzBdIDogYVtrZXldO1xuICAgICAgICBjb25zdCB2YWx1ZUIgPSBBcnJheS5pc0FycmF5KGJba2V5XSkgPyBiW2tleV1bMF0gOiBiW2tleV07XG4gICAgICAgIC8vIENvbnZlcnQgdmFsdWVzIHRvIG51bWJlcnMgaWYgcG9zc2libGVcbiAgICAgICAgY29uc3QgbnVtQSA9IHBhcnNlRmxvYXQodmFsdWVBKTtcbiAgICAgICAgY29uc3QgbnVtQiA9IHBhcnNlRmxvYXQodmFsdWVCKTtcbiAgICAgICAgaWYgKCFpc05hTihudW1BKSAmJiAhaXNOYU4obnVtQikpIHtcbiAgICAgICAgICAgIC8vIEJvdGggdmFsdWVzIGFyZSBudW1iZXJzLCBjb21wYXJlIHRoZW0gZGlyZWN0bHlcbiAgICAgICAgICAgIHJldHVybiByZXZlcnNlID8gbnVtQiAtIG51bUEgOiBudW1BIC0gbnVtQjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFVzZSBsb2NhbGVDb21wYXJlIGZvciBzdHJpbmcgY29tcGFyaXNvblxuICAgICAgICAgICAgcmV0dXJuIHJldmVyc2UgPyB2YWx1ZUIubG9jYWxlQ29tcGFyZSh2YWx1ZUEpIDogdmFsdWVBLmxvY2FsZUNvbXBhcmUodmFsdWVCKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gQ29udmVydCBjb2xvdXIgZnJvbSBSR0IgdG8gSEVYIGFuZCB2aWNlIHZlcmNhXG5leHBvcnQgZnVuY3Rpb24gY29udmVydENvbG91cih2YWx1ZSkge1xuICAgIC8vIFNldCB1cCBpbnRlcm5hbCBmdW5jdGlvbnNcbiAgICBjb25zdCB0b0hleCA9IChjKSA9PiBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgLy8gU2V0IGJhc2UgcmVzdWx0XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAoYXJyYXlDaGVjayh2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0ID0gYCR7dG9IZXgodmFsdWVbMF0pfSR7dG9IZXgodmFsdWVbMV0pfSR7dG9IZXgodmFsdWVbMl0pfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCByYXcgPSBwYXJzZUludCh2YWx1ZSwgMTYpO1xuICAgICAgICBjb25zdCByID0gKChyYXcgPj4gMTYpICYgMjU1KSAvIDI1NTtcbiAgICAgICAgY29uc3QgZyA9ICgocmF3ID4+IDgpICYgMjU1KSAvIDI1NTtcbiAgICAgICAgY29uc3QgYiA9IChyYXcgJiAyNTUpIC8gMjU1O1xuICAgICAgICByZXN1bHQgPSB7IHIsIGcsIGIgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB7IG5vdGlmeUFuZENsb3NlIH0gZnJvbSBcIi4uL2hlbHBlcnNcIjtcbmV4cG9ydCBmdW5jdGlvbiBydW4oc2VsZWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2coc2VsZWN0aW9uKTtcbiAgICBub3RpZnlBbmRDbG9zZSgnQWxsIGRvbmUgYmFieSEnKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmIHF1ZXVlLmQgPCAxKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIHF1ZXVlLmQgPCAwICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29kZS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==