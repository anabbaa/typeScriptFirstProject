/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
// Component Base Class
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//* to bund all our export as an oblect


class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValiateTable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValiateTable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(titleValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(descriptionValiateTable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(peopleValiateTable)) {
            alert('Invalid input, please try again!');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__.Autobind
], ProjectInput.prototype, "submitHandler", null);
// when we bind to an event listener this in the target method will not refer to this as value
//otherwise to current target of the event


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__.Component {
    get persons() {
        if (this.project.people == 1) {
            return "1 person";
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        const projid = event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
        //data transfer may return nul beacuse not every object has the property of dataTransfer
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.Autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.Autobind
], ProjectItem.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dragHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProjects(prjId, this.type === 'active' ? _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active : _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dragHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active;
                }
                return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__.Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__.Autobind
], ProjectList.prototype, "dragHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__.Autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind-decorator.ts":
/*!**********************************************!*\
  !*** ./src/decorators/autobind-decorator.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Autobind": () => (/* binding */ Autobind)
/* harmony export */ });
//autobind
function Autobind(_, _2, description) {
    const originalValue = description.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const bundify = originalValue.bind(this);
            return bundify;
        }
    };
    return adjDescriptor;
}
;


/***/ }),

/***/ "./src/models/project-model.ts":
/*!*************************************!*\
  !*** ./src/models/project-model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project_model__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProjects(projectId, newStatus) {
        const dragProject = this.projects.find(prj => prj.id === projectId);
        console.log(dragProject);
        if (dragProject && dragProject.status !== newStatus) {
            dragProject.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate(validateTableInput) {
    let isValid = true;
    if (validateTableInput.required) {
        isValid = isValid && validateTableInput.value.toString().trim().length !== 0;
    }
    if (validateTableInput.minLength != null &&
        typeof validateTableInput.value === 'string') {
        isValid =
            isValid && validateTableInput.value.length >= validateTableInput.minLength;
    }
    if (validateTableInput.maxLength != null &&
        typeof validateTableInput.value === 'string') {
        isValid =
            isValid && validateTableInput.value.length <= validateTableInput.maxLength;
    }
    if (validateTableInput.min != null &&
        typeof validateTableInput.value === 'number') {
        isValid = isValid && validateTableInput.value >= validateTableInput.min;
    }
    if (validateTableInput.max != null &&
        typeof validateTableInput.value === 'number') {
        isValid = isValid && validateTableInput.value <= validateTableInput.max;
    }
    return isValid;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


const prjInput = new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
const activeProjectList = new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("active");
const finishedProjectList = new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("finished");
/*
-in nmespace adjust outfile to a file to contactate dist file for to output and change module to amd
- for modules you will use not amdd otherwise 3s2015 and commented out outfile also in html file
you will dlete defer and add type="module to script tag
*/

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FDOUU7SUFDRCxJQUNFLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxJQUFJO1FBQzlCLE9BQU8sa0JBQWtCLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDNUM7UUFDQSxPQUFPLEdBQUcsT0FBTyxJQUFJLGtCQUFrQixDQUFDLEtBQUssSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7S0FDekU7SUFDRCxJQUNFLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxJQUFJO1FBQzlCLE9BQU8sa0JBQWtCLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDNUM7UUFDQSxPQUFPLEdBQUcsT0FBTyxJQUFJLGtCQUFrQixDQUFDLEtBQUssSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7S0FDekU7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDOzs7Ozs7O1VDMUNIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBEO0FBQ0Y7QUFFdEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxtRUFBWSxFQUFFLENBQUM7QUFDcEMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGlFQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGlFQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEQ7Ozs7RUFJRSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpcnN0cHJvamVjdC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL2ZpcnN0cHJvamVjdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vZmlyc3Rwcm9qZWN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL2ZpcnN0cHJvamVjdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly9maXJzdHByb2plY3QvLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vZmlyc3Rwcm9qZWN0Ly4vc3JjL21vZGVscy9wcm9qZWN0LW1vZGVsLnRzIiwid2VicGFjazovL2ZpcnN0cHJvamVjdC8uL3NyYy9zdGF0ZS9wcm9qZWN0LXN0YXRlLnRzIiwid2VicGFjazovL2ZpcnN0cHJvamVjdC8uL3NyYy91dGlsL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vZmlyc3Rwcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpcnN0cHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZmlyc3Rwcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlyc3Rwcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZmlyc3Rwcm9qZWN0Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb21wb25lbnQgQmFzZSBDbGFzc1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQsIFUgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xuICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIGhvc3RFbGVtZW50OiBUO1xuICBlbGVtZW50OiBVO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcbiAgICBob3N0RWxlbWVudElkOiBzdHJpbmcsXG4gICAgaW5zZXJ0QXRTdGFydDogYm9vbGVhbixcbiAgICBuZXdFbGVtZW50SWQ/OiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIHRlbXBsYXRlSWRcbiAgICApISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcblxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXG4gICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XG4gICAgaWYgKG5ld0VsZW1lbnRJZCkge1xuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xuICAgIH1cbiAgICB0aGlzLmF0dGFjaChpbnNlcnRBdFN0YXJ0KTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoKGluc2VydEF0QmVnaW5uaW5nOiBib29sZWFuKSB7XG4gICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgICBpbnNlcnRBdEJlZ2lubmluZyA/ICdhZnRlcmJlZ2luJyA6ICdiZWZvcmVlbmQnLFxuICAgICAgdGhpcy5lbGVtZW50XG4gICAgKTtcbiAgfVxuXG4gIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xuICBhYnN0cmFjdCByZW5kZXJDb250ZW50KCk6IHZvaWQ7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcbmltcG9ydCAgKiBhcyB2YWxpZGF0aW9uICBmcm9tICcuLi91dGlsL3ZhbGlkYXRpb24nO1xuLy8qIHRvIGJ1bmQgYWxsIG91ciBleHBvcnQgYXMgYW4gb2JsZWN0XG5pbXBvcnQgeyBBdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQtZGVjb3JhdG9yJztcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL3Byb2plY3Qtc3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+IHtcbiAgICB0aXRsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgICBkZXNjcmlwdGlvbklucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwZW9wbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoJ3Byb2plY3QtaW5wdXQnLCAnYXBwJywgdHJ1ZSwgJ3VzZXItaW5wdXQnKTtcbiAgICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJyN0aXRsZSdcbiAgICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJyNkZXNjcmlwdGlvbidcbiAgICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcjcGVvcGxlJ1xuICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgdGhpcy5jb25maWd1cmUoKTtcbiAgICB9XG4gIFxuICAgIGNvbmZpZ3VyZSgpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xuICAgIH1cbiAgXG4gICAgcmVuZGVyQ29udGVudCgpIHt9XG4gIFxuICAgIHByaXZhdGUgZ2F0aGVyVXNlcklucHV0KCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB8IHZvaWQge1xuICAgICAgY29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgIGNvbnN0IGVudGVyZWREZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICBjb25zdCBlbnRlcmVkUGVvcGxlID0gdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWU7XG4gIFxuICAgICAgY29uc3QgdGl0bGVWYWxpZGF0YWJsZTogdmFsaWRhdGlvbi5WYWxpYXRlVGFibGUgPSB7XG4gICAgICAgIHZhbHVlOiBlbnRlcmVkVGl0bGUsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICB9O1xuICAgICAgY29uc3QgZGVzY3JpcHRpb25WYWxpYXRlVGFibGU6IHZhbGlkYXRpb24uVmFsaWF0ZVRhYmxlID0ge1xuICAgICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWluTGVuZ3RoOiA1XG4gICAgICB9O1xuICAgICAgY29uc3QgcGVvcGxlVmFsaWF0ZVRhYmxlOiB2YWxpZGF0aW9uLlZhbGlhdGVUYWJsZSA9IHtcbiAgICAgICAgdmFsdWU6ICtlbnRlcmVkUGVvcGxlLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDVcbiAgICAgIH07XG4gIFxuICAgICAgaWYgKFxuICAgICAgICAhdmFsaWRhdGlvbi52YWxpZGF0ZSh0aXRsZVZhbGlkYXRhYmxlKSB8fFxuICAgICAgICAhdmFsaWRhdGlvbi52YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlhdGVUYWJsZSkgfHxcbiAgICAgICAgIXZhbGlkYXRpb24udmFsaWRhdGUocGVvcGxlVmFsaWF0ZVRhYmxlKVxuICAgICAgKSB7XG4gICAgICAgIGFsZXJ0KCdJbnZhbGlkIGlucHV0LCBwbGVhc2UgdHJ5IGFnYWluIScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW2VudGVyZWRUaXRsZSwgZW50ZXJlZERlc2NyaXB0aW9uLCArZW50ZXJlZFBlb3BsZV07XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xuICAgICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG4gIFxuICAgIEBBdXRvYmluZFxuICAgIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xuICAgICAgICBjb25zdCBbdGl0bGUsIGRlc2MsIHBlb3BsZV0gPSB1c2VySW5wdXQ7XG4gICAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjLCBwZW9wbGUpO1xuICAgICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gICAgLy8gd2hlbiB3ZSBiaW5kIHRvIGFuIGV2ZW50IGxpc3RlbmVyIHRoaXMgaW4gdGhlIHRhcmdldCBtZXRob2Qgd2lsbCBub3QgcmVmZXIgdG8gdGhpcyBhcyB2YWx1ZVxuICAgIC8vb3RoZXJ3aXNlIHRvIGN1cnJlbnQgdGFyZ2V0IG9mIHRoZSBldmVudFxuIiwiaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi4vbW9kZWxzL2RyYWctZHJvcC1pbnRlcmZhY2VzJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdC1tb2RlbCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcbmltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmQtZGVjb3JhdG9yXCJcblxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50IDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MRGF0YUxpc3RFbGVtZW50PiBpbXBsZW1lbnRzIERyYWdnYWJsZXtcbiAgICBwcml2YXRlICBwcm9qZWN0OiBQcm9qZWN0O1xuICAgIGdldCBwZXJzb25zICgpe1xuICAgICAgaWYgKHRoaXMucHJvamVjdC5wZW9wbGUgPT0gMSl7XG4gICAgICAgIHJldHVybiBcIjEgcGVyc29uXCI7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm9qZWN0LnBlb3BsZX0gcGVyc29uc2A7XG4gICAgICB9XG4gICAgfVxuICAgICAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3Qpe1xuICAgICAgICBzdXBlcihcInNpbmdsZS1wcm9qZWN0XCIsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpXG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICAgICAgfVxuICAgICAgQEF1dG9iaW5kXG4gICAgICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJvamlkPSBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnByb2plY3QuaWQpO1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgICAgIC8vZGF0YSB0cmFuc2ZlciBtYXkgcmV0dXJuIG51bCBiZWFjdXNlIG5vdCBldmVyeSBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eSBvZiBkYXRhVHJhbnNmZXJcbiAgICAgIH1cbiAgICBAQXV0b2JpbmRcbiAgICAgIGRyYWdFbmRIYW5kbGVyKF86IERyYWdFdmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnRHJhZ0VuZCcpO1xuICAgICAgfVxuICAgICAgY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcbiAgICBcbiAgICAgIH1cbiAgICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XG4gICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDNcIikhLnRleHRDb250ZW50ID0gdGhpcy5wZXJzb25zICsgXCIgYXNzaWduZWRcIjtcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpIS50ZXh0Q29udGVudCA9dGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgICAgfVxuICAiLCJpbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSAnLi4vbW9kZWxzL2RyYWctZHJvcC1pbnRlcmZhY2VzJztcbmltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdC1tb2RlbCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcbmltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3InO1xuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSc7XG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gJy4vcHJvamVjdC1pdGVtJztcblxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0IHtcbiAgICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XG4gIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XG4gICAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xuICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzICA9ICBbXTtcbiAgICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgICB9XG4gICAgQEF1dG9iaW5kXG4gICAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xuICAgICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBAQXV0b2JpbmRcbiAgICBkcmFnSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICBjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuICAgICAgXG4gICAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3RzKFxuICAgICAgICBwcmpJZCxcbiAgICAgICAgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZFxuICAgICAgKTtcbiAgICB9XG4gIFxuICAgIEBBdXRvYmluZFxuICAgIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XG4gICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gICAgfVxuICBcbiAgICBjb25maWd1cmUoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCB0aGlzLmRyYWdIYW5kbGVyKTtcbiAgICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcigocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xuICAgICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKHByaiA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xuICAgICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIFxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xuICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkID0gbGlzdElkO1xuICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID1cbiAgICAgICAgdGhpcy50eXBlLnRvVXBwZXJDYXNlKCkgKyAnIFBST0pFQ1RTJztcbiAgICB9XG4gIFxuICAgIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YFxuICAgICAgKSEgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICAgIGxpc3RFbC5pbm5lckhUTUwgPSAnJztcbiAgICAgIGZvciAoY29uc3QgcHJqSXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcbiAgICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhLmlkLCBwcmpJdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiIsIiAvL2F1dG9iaW5kXG4gIGV4cG9ydCBmdW5jdGlvbiBBdXRvYmluZChfOiBhbnksIF8yOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBQcm9wZXJ0eURlc2NyaXB0b3Ipe1xuICAgIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICBjb25zdCBhZGpEZXNjcmlwdG9yID0ge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0ICgpe1xuICAgICAgICBjb25zdCBidW5kaWZ5ID0gb3JpZ2luYWxWYWx1ZS5iaW5kKHRoaXMpO1xuICAgICAgICByZXR1cm4gYnVuZGlmeTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBhZGpEZXNjcmlwdG9yO1xuICB9O1xuIiwiIGV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xuICAgIEFjdGl2ZSxcbiAgICBGaW5pc2hlZFxuICB9XG5cbiAgZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGlkOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxuICAgICAgcHVibGljIHN0YXR1czogUHJvamVjdFN0YXR1c1xuICAgICkge31cbiAgfVxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0LW1vZGVsJztcblxuLy9zdGF0ZSBtYW5hZ2VtZW50IGNsYXNzXG4vKlxuaGVyZSBhZGQgbGlzdGVuZXIgYXJyYXkgb2YgZnVuY3Rpb24gdGhlbiBtYWtlIGFsbG9wIGluIHRoZW4gbWFrZSBhIG1ldGhvZCB0byBhZGQgZnVuY3Rpb24gdG8gaXQgdGhlbiBcbmxvb3AgZm9yIGV2ZXJ5IGZ1bmN0aW9uIGFuZCBhZGQgcHJvamVjdCB0byBpdCB0aGVuIGluIHByb2plY3RsaXN0IGNsYXNzIGFkZCB2YXJpYWJsZSBoZXJlIGlzIFxuYXNzaWducHJvamVjdCBpbml0YWxpemVkIGl0IHRoZW4gaW5pdGFsaXplZCBtZXRob2Qgb2YgaW5zdGFuY2UgYW5kIGluIGFkZGxpc3RlbnJlciBtZXRob2QgbG9vcFxub3ZlciBwcm9qZWN0IGFkZCB0aGVtIHRvIGEgYXNzaWducHJvamVjdCB0byByZW5kZXIgeW91IG5lZWQgbmV3IG1ldGhvZCBoZXJlIHJlbmRlcnByb2plY3QgYW5kIFxuZXh1c2UgaXQgaW4gdGhlIHNhbWUgZnVuY3Rpb24gb2YgYWRkbGlzdGVuZXJcbiovXG4vL2Jhc2UgY29tb25lbnQgZm9yIGxpc3RlbmVyc1xuXG4gICAgdHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xuXG4gICAgY2xhc3MgU3RhdGU8VD4ge1xuICAgICAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xuICAgIFxuICAgICAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+IHtcbiAgICAgIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xuICAgICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcbiAgICBcbiAgICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICB9XG4gICAgXG4gICAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgICB9XG4gICAgXG4gICAgICBhZGRQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG51bU9mUGVvcGxlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KFxuICAgICAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBudW1PZlBlb3BsZSxcbiAgICAgICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XG4gICAgICB9XG4gICAgICBtb3ZlUHJvamVjdHMocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cykge1xuICAgICAgICBjb25zdCBkcmFnUHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcmogPT4gcHJqLmlkID09PSBwcm9qZWN0SWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhkcmFnUHJvamVjdCk7XG4gICAgICAgIGlmIChkcmFnUHJvamVjdCAmJiBkcmFnUHJvamVjdC5zdGF0dXMgIT09IG5ld1N0YXR1cykge1xuICAgICAgICAgIGRyYWdQcm9qZWN0LnN0YXR1cyA9IG5ld1N0YXR1cztcbiAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpIHtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lckZuIG9mIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAgXG4gICAgZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xuIiwiLy92YWxpZGF0aW9uXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlhdGVUYWJsZSB7XG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgICByZXF1aXJlZD86IGJvb2xlYW47XG4gICAgbWluTGVuZ3RoPzogbnVtYmVyO1xuICAgIG1heExlbmd0aD86IG51bWJlcjtcbiAgICBtaW4/OiBudW1iZXI7XG4gICAgbWF4PzogbnVtYmVyO1xuICB9IFxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlICh2YWxpZGF0ZVRhYmxlSW5wdXQgOiBWYWxpYXRlVGFibGUpe1xuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodmFsaWRhdGVUYWJsZUlucHV0LnJlcXVpcmVkKSB7XG4gICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0ZVRhYmxlSW5wdXQudmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoICE9PSAwO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB2YWxpZGF0ZVRhYmxlSW5wdXQubWluTGVuZ3RoICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWxpZGF0ZVRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnXG4gICAgKSB7XG4gICAgICBpc1ZhbGlkID1cbiAgICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0ZVRhYmxlSW5wdXQudmFsdWUubGVuZ3RoID49IHZhbGlkYXRlVGFibGVJbnB1dC5taW5MZW5ndGg7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHZhbGlkYXRlVGFibGVJbnB1dC5tYXhMZW5ndGggIT0gbnVsbCAmJlxuICAgICAgdHlwZW9mIHZhbGlkYXRlVGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZydcbiAgICApIHtcbiAgICAgIGlzVmFsaWQgPVxuICAgICAgICBpc1ZhbGlkICYmIHZhbGlkYXRlVGFibGVJbnB1dC52YWx1ZS5sZW5ndGggPD0gdmFsaWRhdGVUYWJsZUlucHV0Lm1heExlbmd0aDtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdmFsaWRhdGVUYWJsZUlucHV0Lm1pbiAhPSBudWxsICYmXG4gICAgICB0eXBlb2YgdmFsaWRhdGVUYWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJ1xuICAgICkge1xuICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGVUYWJsZUlucHV0LnZhbHVlID49IHZhbGlkYXRlVGFibGVJbnB1dC5taW47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHZhbGlkYXRlVGFibGVJbnB1dC5tYXggIT0gbnVsbCAmJlxuICAgICAgdHlwZW9mIHZhbGlkYXRlVGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcidcbiAgICApIHtcbiAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRlVGFibGVJbnB1dC52YWx1ZSA8PSB2YWxpZGF0ZVRhYmxlSW5wdXQubWF4O1xuICAgIH1cbiAgICByZXR1cm4gaXNWYWxpZDtcbiAgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQcm9qZWN0SW5wdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dCc7XG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QnO1xuXG4gIGNvbnN0IHByaklucHV0ID0gbmV3IFByb2plY3RJbnB1dCgpO1xuICBjb25zdCBhY3RpdmVQcm9qZWN0TGlzdCA9IG5ldyBQcm9qZWN0TGlzdChcImFjdGl2ZVwiKTtcbiAgY29uc3QgZmluaXNoZWRQcm9qZWN0TGlzdCA9IG5ldyBQcm9qZWN0TGlzdChcImZpbmlzaGVkXCIpO1xuICAvKlxuLWluIG5tZXNwYWNlIGFkanVzdCBvdXRmaWxlIHRvIGEgZmlsZSB0byBjb250YWN0YXRlIGRpc3QgZmlsZSBmb3IgdG8gb3V0cHV0IGFuZCBjaGFuZ2UgbW9kdWxlIHRvIGFtZFxuLSBmb3IgbW9kdWxlcyB5b3Ugd2lsbCB1c2Ugbm90IGFtZGQgb3RoZXJ3aXNlIDNzMjAxNSBhbmQgY29tbWVudGVkIG91dCBvdXRmaWxlIGFsc28gaW4gaHRtbCBmaWxlIFxueW91IHdpbGwgZGxldGUgZGVmZXIgYW5kIGFkZCB0eXBlPVwibW9kdWxlIHRvIHNjcmlwdCB0YWdcbiAgKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==