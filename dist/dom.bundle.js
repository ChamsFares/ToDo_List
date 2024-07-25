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

/***/ "./src/DomMan.js":
/*!***********************!*\
  !*** ./src/DomMan.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DOMManipulation: () => (/* binding */ DOMManipulation),\n/* harmony export */   TodoLogic: () => (/* binding */ TodoLogic)\n/* harmony export */ });\n/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDoList */ \"./src/ToDoList.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Storage */ \"./src/Storage.js\");\n\r\n\r\n\r\n\r\nconst TodoLogic = (() => {\r\n    let projects = [new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Default')];\r\n  \r\n    function createTodo(title, description, dueDate, priority, projectName = 'Default') {\r\n      const todo = new _ToDoList__WEBPACK_IMPORTED_MODULE_0__[\"default\"](title, description, dueDate, priority);\r\n      const project = projects.find(p => p.name === projectName);\r\n      if (project) {\r\n        project.addTodo(todo);\r\n        _Storage__WEBPACK_IMPORTED_MODULE_2__[\"default\"].setData({ projects});\r\n      }\r\n      return todo;\r\n    }\r\n  \r\n    function createProject(name) {\r\n      const project = new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](name);\r\n      projects.push(project);\r\n      return project;\r\n    }\r\n  \r\n    function deleteTodo(todoId, projectName) {\r\n      const project = projects.find(p => p.name === projectName);\r\n      if (project) {\r\n        project.removeTodo(todoId);\r\n      }\r\n    }\r\n  \r\n    function deleteProject(projectName) {\r\n      projects = projects.filter(p => p.name !== projectName);\r\n    }\r\n  \r\n    function getTodosByProject(projectName) {\r\n      const project = projects.find(p => p.name === projectName);\r\n      return project ? project.todos : [];\r\n    }\r\n  \r\n    function getAllProjects() {\r\n      return projects;\r\n    }\r\n  \r\n    function updateTodo(todoId, projectName, updates) {\r\n      const project = projects.find(p => p.name === projectName);\r\n      if (project) {\r\n        const todo = project.todos.find(t => t.id === todoId);\r\n        if (todo) {\r\n          Object.assign(todo, updates);\r\n        }\r\n      }\r\n    }\r\n    function setData(data) {\r\n        if (data && data.projects) {\r\n            projects = data.projects.map(p => {\r\n                const project = new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](p.name);\r\n                if (p.todos) {\r\n                    project.todos = p.todos.map(t => \r\n                        new _ToDoList__WEBPACK_IMPORTED_MODULE_0__[\"default\"](t.title, t.description, t.dueDate, t.priority, t.id)\r\n                    );\r\n                }\r\n                return project;\r\n            });\r\n        } else {\r\n            console.error('Invalid data structure passed to setData');\r\n            projects = [new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Default')];\r\n        }\r\n    }\r\n  \r\n    return {\r\n      createTodo,\r\n      createProject,\r\n      deleteTodo,\r\n      deleteProject,\r\n      getTodosByProject,\r\n      getAllProjects,\r\n      updateTodo,\r\n      setData\r\n    };\r\n  })();\r\n  \r\n\r\nconst DOMManipulation = (() => {\r\n    function renderProjects() {\r\n      const projectList = document.getElementById('project-list');\r\n      projectList.innerHTML = '';\r\n      TodoLogic.getAllProjects().forEach(project => {\r\n        const li = document.createElement('li');\r\n        li.textContent = project.name;\r\n        li.addEventListener('click', () => renderTodos(project.name));\r\n        projectList.appendChild(li);\r\n      });\r\n    }\r\n  \r\n    function renderTodos(projectName) {\r\n      const todoList = document.getElementById('todo-list');\r\n      todoList.innerHTML = '';\r\n      TodoLogic.getTodosByProject(projectName).forEach(todo => {\r\n        const li = document.createElement('li');\r\n        li.textContent = `${todo.title} - Due: ${todo.dueDate} - Priority: ${todo.priority}`;\r\n        li.addEventListener('click', () => showTodoDetails(todo, projectName));\r\n        todoList.appendChild(li);\r\n      });\r\n    }\r\n  \r\n    function showTodoDetails(todo, projectName) {\r\n      const detailsDiv = document.getElementById('todo-details');\r\n      detailsDiv.innerHTML = `\r\n        <h3>${todo.title}</h3>\r\n        <p>Description: ${todo.description}</p>\r\n        <p>Due Date: ${todo.dueDate}</p>\r\n        <p>Priority: ${todo.priority}</p>\r\n        <button onclick=\"DOMManipulation.editTodo('${todo.id}', '${projectName}')\">Edit</button>\r\n        <button onclick=\"DOMManipulation.deleteTodo('${todo.id}', '${projectName}')\">Delete</button>\r\n      `;\r\n    }\r\n  \r\n    function editTodo(todoId, projectName) {\r\n      const todo = TodoLogic.getTodosByProject(projectName).find(t => t.id === todoId);\r\n      if (todo) {\r\n\r\n        console.log('Editing todo:', todo);\r\n      }\r\n    }\r\n  \r\n    function deleteTodo(todoId, projectName) {\r\n      TodoLogic.deleteTodo(todoId, projectName);\r\n      renderTodos(projectName);\r\n    }\r\n  \r\n    function showNewTodoForm(projectName) {\r\n      const formDiv = document.getElementById('new-todo-form');\r\n      formDiv.innerHTML = `\r\n        <form id=\"todo-form\">\r\n          <input type=\"text\" id=\"todo-title\" placeholder=\"Title\" required>\r\n          <textarea id=\"todo-description\" placeholder=\"Description\"></textarea>\r\n          <input type=\"date\" id=\"todo-due-date\" required>\r\n          <select id=\"todo-priority\">\r\n            <option value=\"low\">Low</option>\r\n            <option value=\"medium\">Medium</option>\r\n            <option value=\"high\">High</option>\r\n          </select>\r\n          <button type=\"submit\">Add Todo</button>\r\n        </form>\r\n      `;\r\n      document.getElementById('todo-form').addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        const title = document.getElementById('todo-title').value;\r\n        const description = document.getElementById('todo-description').value;\r\n        const dueDate = document.getElementById('todo-due-date').value;\r\n        const priority = document.getElementById('todo-priority').value;\r\n        TodoLogic.createTodo(title, description, dueDate, priority, projectName);\r\n        renderTodos(projectName);\r\n        formDiv.innerHTML = '';\r\n      });\r\n    }\r\n  \r\n    return {\r\n      renderProjects,\r\n      renderTodos,\r\n      showTodoDetails,\r\n      editTodo,\r\n      deleteTodo,\r\n      showNewTodoForm\r\n    };\r\n  })();\r\n\n\n//# sourceURL=webpack://todo_list/./src/DomMan.js?");

/***/ }),

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\r\n    constructor(name) {\r\n      this.name = name;\r\n      this.todos = [];\r\n    }\r\n  \r\n    addTodo(todo) {\r\n      this.todos.push(todo);\r\n    }\r\n  \r\n    removeTodo(todo) {\r\n      const index = this.todos.indexOf(todo);\r\n      if (index > -1) {\r\n        this.todos.splice(index, 1);\r\n      }\r\n    }\r\n  }\n\n//# sourceURL=webpack://todo_list/./src/Project.js?");

/***/ }),

/***/ "./src/Storage.js":
/*!************************!*\
  !*** ./src/Storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Storage.js\r\nconst Storage = (() => {\r\n  function saveData(data) {\r\n    localStorage.setItem('todoAppData', JSON.stringify(data));\r\n  }\r\n\r\n  function loadData() {\r\n    const data = localStorage.getItem('todoAppData');\r\n    return data ? JSON.parse(data) : null;\r\n  }\r\n\r\n  return { saveData, loadData };\r\n})();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);\n\n//# sourceURL=webpack://todo_list/./src/Storage.js?");

/***/ }),

/***/ "./src/ToDoList.js":
/*!*************************!*\
  !*** ./src/ToDoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ todo)\n/* harmony export */ });\nclass todo {\r\n    constructor(id, title, description, dueDate, priority, notes = [], checklist = []) {\r\n      this.id = id;\r\n      this.title = title;\r\n      this.description = description;\r\n      this.dueDate = dueDate;\r\n      this.priority = priority;\r\n      this.notes = notes;\r\n      this.checklist = checklist;\r\n      this.completed = false;\r\n    }\r\n  \r\n    toggleComplete() {\r\n      this.completed = !this.completed;\r\n    }\r\n  \r\n}\r\n\r\n\n\n//# sourceURL=webpack://todo_list/./src/ToDoList.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/DomMan.js");
/******/ 	
/******/ })()
;