/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Board {\r\n  constructor() {\r\n    this.board = ['', '', '', '', '', '', '', '', ''];\r\n  }\r\n\r\n  getBoardCell(index) {\r\n    if (index > this.board.length) return;\r\n    return this.board[index];\r\n  }\r\n\r\n  setBoardCell(index, sign) {\r\n    if (index > this.board.length) return;\r\n    this.board[index] = sign;\r\n  }\r\n\r\n  resetBoard() {\r\n    for (let i = 0; i < this.board.length; i++) {\r\n      this.board[i] = '';\r\n    }\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);\r\n\n\n//# sourceURL=webpack://tictactoe/./src/board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\r\n\r\n\r\nconst board = new _board__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n\r\nclass Controller {\r\n  constructor() {\r\n    this.playerX = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('X');\r\n    this.playerO = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('O');\r\n    this.round = 1;\r\n    this.isOver = false;\r\n  }\r\n\r\n  getCurrentPlayerSign() {\r\n    return this.round % 2 === 1\r\n      ? this.playerX.getSign()\r\n      : this.playerO.getSign();\r\n  }\r\n\r\n  checkWinner(cellIndex) {\r\n    const winningConditions = [\r\n      [0, 1, 2],\r\n      [3, 4, 5],\r\n      [6, 7, 8],\r\n      [0, 3, 6],\r\n      [1, 4, 7],\r\n      [2, 5, 8],\r\n      [0, 4, 8],\r\n      [2, 4, 6],\r\n    ];\r\n\r\n    return winningConditions\r\n      .filter((combination) => combination.includes(Number(cellIndex)))\r\n      .some((posComb) =>\r\n        posComb.every((index) => {\r\n          return board.getBoardCell(index) === this.getCurrentPlayerSign();\r\n        })\r\n      );\r\n  }\r\n\r\n  playRound(cellIndex) {\r\n    board.setBoardCell(cellIndex, this.getCurrentPlayerSign());\r\n    if (this.checkWinner(cellIndex)) {\r\n      // declare winner\r\n      ui.setMessage(`Player ${this.getCurrentPlayerSign()} Won`);\r\n      this.isOver = true;\r\n      return;\r\n    }\r\n    if (this.round == 9) {\r\n      // declare draw\r\n      ui.setMessage(`It's a Draw`);\r\n      this.isOver = true;\r\n      return;\r\n    }\r\n    this.round++;\r\n    ui.setTurnMessage(\r\n      `<span class=\"player\">${this.getCurrentPlayerSign()}</span>'s Turn`\r\n    );\r\n  }\r\n\r\n  reset() {\r\n    this.round = 1;\r\n    this.isOver = false;\r\n  }\r\n}\r\n\r\nconst game = new Controller();\r\n\r\nclass UI {\r\n  constructor() {\r\n    this.cells = document.querySelectorAll('.cell');\r\n    this.resultMessage = document.querySelector('.resultMessage');\r\n    this.turnMessage = document.querySelector('.turnMessage');\r\n    this.player = document.querySelector('.player');\r\n    this.restartBtn = document.querySelector('.restartBtn');\r\n  }\r\n\r\n  updateBoard() {\r\n    for (let i = 0; i < this.cells.length; i++) {\r\n      this.cells[i].textContent = board.getBoardCell(i);\r\n    }\r\n  }\r\n\r\n  setMessage(message) {\r\n    this.resultMessage.textContent = message;\r\n    this.resultMessage.classList.add('won');\r\n    this.turnMessage.style.display = 'none';\r\n  }\r\n\r\n  setTurnMessage(message) {\r\n    this.turnMessage.innerHTML = message;\r\n  }\r\n\r\n  resetMessage() {\r\n    this.resultMessage.classList.remove('won');\r\n    this.turnMessage.style.display = 'block';\r\n    this.setTurnMessage(`<span class=\"player\">X</span>'s Turn`);\r\n  }\r\n}\r\n\r\nconst ui = new UI();\r\n\r\nui.cells.forEach((cell) => {\r\n  cell.addEventListener('click', (e) => {\r\n    if (game.isOver || e.target.textContent !== '') return;\r\n    game.playRound(e.target.dataset.id);\r\n    ui.updateBoard();\r\n  });\r\n});\r\n\r\nui.restartBtn.addEventListener('click', (e) => {\r\n  board.resetBoard();\r\n  game.reset();\r\n  ui.updateBoard();\r\n  ui.resetMessage();\r\n});\r\n\n\n//# sourceURL=webpack://tictactoe/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Player {\r\n  constructor(sign) {\r\n    this.sign = sign;\r\n  }\r\n\r\n  getSign() {\r\n    return this.sign;\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://tictactoe/./src/player.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;