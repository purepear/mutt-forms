module.exports =
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* A simple HTML form interface, with a squishy face.
	* @file Standalone Pug build 
	* @version 0.0.1
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.registry = exports.validators = exports.widgets = exports.fields = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(1);

	var _fields = __webpack_require__(21);

	var fields = _interopRequireWildcard(_fields);

	var _widgets = __webpack_require__(22);

	var widgets = _interopRequireWildcard(_widgets);

	var _validators = __webpack_require__(23);

	var validators = _interopRequireWildcard(_validators);

	var _registry = __webpack_require__(2);

	var registry = _interopRequireWildcard(_registry);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	exports.fields = fields;
	exports.widgets = widgets;
	exports.validators = validators;
	exports.registry = registry;

	var Pug = function () {

	    /**
	    * Initialisation of a Pug form
	    * @constructor
	    * @param {HTMLElement} container Containing element for the Pug Form
	    * @param {object} schema JSON Schema containing Form & Field Configuration
	    * @param {object} options optional form configuration options
	    * @param {function} callback optional callback for form submission
	    * @param {boolean} debug debugging flag
	    */
	    function Pug(container, schema) {
	        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	        var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	        var debug = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	        _classCallCheck(this, Pug);

	        if (container === null) {
	            throw new Error('You must pass a valid container to create a Pug form!');
	        }

	        this.container = container;
	        this.mulipart = false;
	        this.callback = callback;
	        this.id = null;
	        this.debug = debug;
	        this.locked = false;

	        this.form = null;
	        this.fieldsets = [];
	        this.options = {};

	        if (options && options.hasOwnProperty('form')) {
	            this.options = options.form;
	        }

	        // Build the form from the config
	        this.build(schema, options);
	    }

	    /**
	    * Build the form fieldsets from the config. The default is
	    * always to use one, however groups can be specified in the
	    * from options
	    * @param {object} JSON schema of form
	    * @param {object} Optional options object for the form
	    */


	    _createClass(Pug, [{
	        key: 'build',
	        value: function build(schema) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	            // TODO: Allow build options override

	            // If fieldsets is specfied in the form options we are
	            // going to attempt to build multiple ones
	            if (options.hasOwnProperty('fieldsets')) {
	                var fieldsetIndex = 0;

	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = options.fieldsets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var fieldsetSpec = _step.value;

	                        var fieldsetFields = null;

	                        if (fieldsetSpec.hasOwnProperty('fields')) {
	                            fieldsetFields = fieldsetSpec.fields;
	                        }

	                        if (fieldsetSpec.hasOwnProperty('fieldsets')) {
	                            options.fieldsets = fieldsetSpec.fieldsets;
	                        }

	                        var fieldset = _core.Fieldset.new(schema, options, fieldsetFields, 'pug-fieldset-' + fieldsetIndex);

	                        this.fieldsets.push(fieldset);
	                        fieldsetIndex++;
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            } else {
	                var _fieldset = _core.Fieldset.new(schema, options);
	                this.fieldsets.push(_fieldset);
	            }
	        }

	        /**
	        * Get the data from the form
	        * @returns {object} data object for the form
	        */

	    }, {
	        key: 'data',
	        value: function data() {
	            var data = [];

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.fieldsets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var fieldset = _step2.value;

	                    data.push(fieldset.data());
	                }

	                // TODO: Yuck - fix.
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            if (data.length == 1) {
	                return data[0];
	            }

	            return data;
	        }

	        /**
	        * Render the form
	        * @returns {promise} a promise to be resolved once rendering 
	        * is complete
	        */

	    }, {
	        key: 'render',
	        value: function render() {
	            var _this = this;

	            return new Promise(function (fulfill, reject) {
	                var formContainer = document.createDocumentFragment();
	                _this.form = document.createElement('form');

	                if (_this.id) {
	                    _this.form.setAttribute('id', _this.id);
	                }

	                _this.form.setAttribute('method', 'POST');
	                _this.form.setAttribute('action', '');
	                _this.form.setAttribute('class', 'pug-form');

	                if (_this.mulipart) {
	                    _this.form.setAttribute('enctype', 'multipart/form-data');
	                }

	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;

	                try {
	                    for (var _iterator3 = _this.fieldsets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var fieldset = _step3.value;

	                        var fieldsetElement = fieldset.render();
	                        _this.form.appendChild(fieldsetElement);
	                    }

	                    // Add form controls
	                } catch (err) {
	                    _didIteratorError3 = true;
	                    _iteratorError3 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                            _iterator3.return();
	                        }
	                    } finally {
	                        if (_didIteratorError3) {
	                            throw _iteratorError3;
	                        }
	                    }
	                }

	                var buttonClass = 'pug-button';
	                var buttonText = 'Submit';

	                // Check for button overide options
	                if (_this.options.hasOwnProperty('buttons')) {
	                    if (_this.options.buttons.hasOwnProperty('class')) {
	                        buttonClass = buttonClass + ' ' + _this.options.buttons.class;
	                    }

	                    if (_this.options.buttons.hasOwnProperty('text')) {
	                        buttonText = _this.options.buttons.text;
	                    }
	                }

	                var buttonWrapper = document.createElement('div');
	                buttonWrapper.setAttribute('class', 'pug-button-wrapper');

	                var button = document.createElement('button');
	                button.setAttribute('class', buttonClass);
	                button.setAttribute('type', 'submit');
	                button.textContent = buttonText;
	                button.onclick = function (e) {
	                    _this.submit(e);
	                    return false;
	                };

	                buttonWrapper.appendChild(button);
	                _this.form.appendChild(buttonWrapper);

	                // Build the form and render to the viewport
	                formContainer.appendChild(_this.form);
	                _this.container.appendChild(formContainer);

	                // Form has been renderd to the stage, call
	                // the post render hooks
	                var _iteratorNormalCompletion4 = true;
	                var _didIteratorError4 = false;
	                var _iteratorError4 = undefined;

	                try {
	                    for (var _iterator4 = _this.fieldsets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                        var _fieldset2 = _step4.value;

	                        _fieldset2.postRender();
	                    }
	                } catch (err) {
	                    _didIteratorError4 = true;
	                    _iteratorError4 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                            _iterator4.return();
	                        }
	                    } finally {
	                        if (_didIteratorError4) {
	                            throw _iteratorError4;
	                        }
	                    }
	                }

	                fulfill(_this);
	            });
	        }

	        /**
	        * Remove the form from the stage
	        */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var form = this.container.querySelector('form');
	            this.container.removeChild(form);
	        }

	        /**
	        * Validate the form
	        * @returns {bool} response to the validation request
	        */

	    }, {
	        key: 'validate',
	        value: function validate() {
	            var valid = true;
	            var errors = [];

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = this.fieldsets[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var fieldset = _step5.value;

	                    if (!fieldset.validate()) {
	                        errors.push(fieldset.errors);
	                        valid = false;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }

	            this.log('Validation Complete -> Status: ' + valid + ' -> ' + JSON.stringify(errors));

	            return valid;
	        }

	        /**
	        * Redraw all of the error states on the stage
	        */

	    }, {
	        key: 'refreshValidationState',
	        value: function refreshValidationState() {
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;

	            try {
	                for (var _iterator6 = this.fieldsets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var fieldset = _step6.value;

	                    fieldset.refreshValidationState();
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }

	        /**
	        * Submit handler for the form
	        * @returns {bool} success or failure of submission
	        */

	    }, {
	        key: 'submit',
	        value: function submit(event) {
	            // We always validate prior to validateion
	            var valid = false;

	            try {
	                valid = this.validate();
	            } catch (e) {
	                this.log('Unable to validate prior to submit!', e);
	                return false;
	            }

	            if (valid) {
	                this.log('Submit form');

	                if (this.callback) {
	                    this.callback(this.data(), event);
	                } else {
	                    this.form.submit();
	                }

	                return true;
	            }

	            return false;
	        }

	        /**
	        * Lock a form, this changes all of the fields to a read only state
	        */

	    }, {
	        key: 'lock',
	        value: function lock() {
	            this.log('Locking form');

	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;

	            try {
	                for (var _iterator7 = this.fieldsets[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var fieldset = _step7.value;

	                    fieldset.lock();
	                }
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	        }

	        /**
	        * Unlock a form, this can be used to restore a locked form to it's
	        * editable state
	        */

	    }, {
	        key: 'unlock',
	        value: function unlock() {
	            this.log('Unlocking form');

	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;

	            try {
	                for (var _iterator8 = this.fieldsets[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var fieldset = _step8.value;

	                    fieldset.unlock();
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	        }

	        /**
	        * Set the ID for the form - this is used for rendering
	        * @param {string} ID for a form
	        */

	    }, {
	        key: 'setFormId',
	        value: function setFormId(formId) {
	            this.id = formId;
	        }

	        /**
	        * Set the callback for the submission
	        * @param {function} Callback function for form submission 
	        */

	    }, {
	        key: 'setSubmitCallback',
	        value: function setSubmitCallback(callback) {
	            this.callback = callback;
	        }

	        /**
	        * Get the form ID
	        * @returns {string} ID for a form
	        */

	    }, {
	        key: 'getFormId',
	        value: function getFormId() {
	            return this.id;
	        }

	        /*
	        * Set field errors in bulk, this is typically used to
	        * show errors from a server side response
	        * @param {object} a hash of errors
	        */

	    }, {
	        key: 'setFieldErrors',
	        value: function setFieldErrors(errors) {
	            // TODO: Known limitation. Errors are not provided
	            // in a hierarchical manner. Just as key/value - so
	            // duplicate keys scoped by parent objects are not
	            // supported. Errors are added to both fields in this
	            // instance.
	            var _iteratorNormalCompletion9 = true;
	            var _didIteratorError9 = false;
	            var _iteratorError9 = undefined;

	            try {
	                for (var _iterator9 = this.fieldsets[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                    var fieldset = _step9.value;

	                    fieldset.setFieldErrors(errors);
	                }
	            } catch (err) {
	                _didIteratorError9 = true;
	                _iteratorError9 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                        _iterator9.return();
	                    }
	                } finally {
	                    if (_didIteratorError9) {
	                        throw _iteratorError9;
	                    }
	                }
	            }
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'use',
	        value: function use(plugin) {}

	        /**
	        * Log a message
	        * @param {string} Message to log
	        */

	    }, {
	        key: 'log',
	        value: function log(message) {
	            if (this.debug) {
	                window.console.log('Pug ->', message);
	            }
	        }
	    }]);

	    return Pug;
	}();

	exports.default = Pug;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Fieldset Interface
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Fieldset = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _registry = __webpack_require__(2);

	var _registry2 = _interopRequireDefault(_registry);

	var _core = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	* Fieldset wrapper class
	* @class
	*/
	var Fieldset = exports.Fieldset = function () {

	    /**
	    * Setup the fieldset class
	    * @constructor
	    * @param {string} label set the label of the fieldset, typically
	    * used for legends
	    */
	    function Fieldset(_ref) {
	        var _ref$label = _ref.label;
	        var label = _ref$label === undefined ? null : _ref$label;
	        var _ref$name = _ref.name;
	        var name = _ref$name === undefined ? null : _ref$name;

	        _classCallCheck(this, Fieldset);

	        this.name = name;
	        this.label = label;
	        this.fields = [];
	        this.errors = {};
	    }

	    /**
	    * Add a field to the fieldset
	    * @param {field} field object to add to the fieldset
	    */


	    _createClass(Fieldset, [{
	        key: 'addField',
	        value: function addField(field) {
	            this.fields.push(field);
	        }

	        /**
	        * Check if a fieldset contains a field
	        * @param {string} A Field name
	        */

	    }, {
	        key: 'hasField',
	        value: function hasField(fieldName) {
	            for (var field in this.fields) {
	                if (field.name == fieldName) {
	                    return true;
	                }
	            }

	            return false;
	        }

	        /**
	        * Get a field from the fieldset
	        * @param {string} A Field name
	        */

	    }, {
	        key: 'getField',
	        value: function getField(fieldName) {}

	        /**
	        * Get the data for the fieldset, this is returned as
	        * an object with field -> value pairs
	        * @returns {object}
	        */

	    }, {
	        key: 'data',
	        value: function data() {
	            var data = {};

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var field = _step.value;

	                    data[field.name] = field.value;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return data;
	        }

	        /**
	        * Validate the fields in the fieldset. Stores an object
	        * of error information field name -> error.
	        * @returns {boolean}
	        */

	    }, {
	        key: 'validate',
	        value: function validate() {
	            var valid = true;

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var field = _step2.value;

	                    if (!field.validate()) {
	                        this.errors[field.name] = field.errors;
	                        valid = false;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            return valid;
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'setFieldErrors',
	        value: function setFieldErrors(errors) {
	            for (var errorField in errors) {
	                if (this.hasField(errorField)) {
	                    this.getField(errorField);
	                }
	            }
	        }

	        /**
	        * 
	        * @param {string} text to be used for the fieldset legend
	        */

	    }, {
	        key: 'setLegend',
	        value: function setLegend(legend) {
	            this.label = legend;
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'refreshValidationState',
	        value: function refreshValidationState() {
	            this.errors = {};

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = this.fields[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var field = _step3.value;

	                    field.refreshValidationState();
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }

	        /**
	        *
	        * @returns {HTMLFragment}
	        */

	    }, {
	        key: 'render',
	        value: function render() {
	            var fieldsetContainer = document.createDocumentFragment();
	            var fieldset = document.createElement('fieldset');
	            fieldset.classList.add('pug-fieldset');

	            if (this.name) {
	                fieldset.setAttribute('name', this.name);
	            }

	            if (this.label) {
	                var legend = document.createElement('legend');
	                legend.textContent = this.label;
	                fieldset.appendChild(legend);
	            }

	            this.fields.sort(function (a, b) {
	                return a.getSortOrder() - b.getSortOrder();
	            });

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = this.fields[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var field = _step4.value;

	                    var fieldElement = field.render();
	                    fieldset.appendChild(fieldElement);
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            fieldsetContainer.appendChild(fieldset);

	            return fieldsetContainer;
	        }

	        /**
	        * Callback triggered after the element has been rendered to
	        * the stage
	        */

	    }, {
	        key: 'postRender',
	        value: function postRender() {
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = this.fields[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var field = _step5.value;

	                    field.postRender();
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'lock',
	        value: function lock() {
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;

	            try {
	                for (var _iterator6 = this.fields[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var field = _step6.value;

	                    field.lock();
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'unlock',
	        value: function unlock() {
	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;

	            try {
	                for (var _iterator7 = this.fields[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var field = _step7.value;

	                    field.unlock();
	                }
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	        }

	        /**
	        * Create a new fieldset. Th
	        * @staticmethod
	        * @params {object} schema - JSON schema for the fieldset spec
	        * @params [object] options - options for fields and the fieldset
	        * @params [string] name - optional name for the fieldset (added as class)
	        */

	    }], [{
	        key: 'new',
	        value: function _new(schema) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	            var fields = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	            var name = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	            var fieldsetSpec = {};

	            if (schema.hasOwnProperty('title')) {
	                fieldsetSpec.label = schema.title;
	            }
	            if (options.hasOwnProperty('form')) {
	                if (options.form.hasOwnProperty('label')) {
	                    fieldsetSpec.label = options.form.label;
	                }
	            }

	            Object.assign(fieldsetSpec, options);

	            if (schema.hasOwnProperty('properties')) {
	                schema = schema.properties;
	            }

	            var fieldset = new Fieldset(fieldsetSpec);
	            var fieldIndex = 1;

	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;

	            try {
	                for (var _iterator8 = Object.keys(schema)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var fieldName = _step8.value;

	                    var fieldId = fieldName + '_field_' + fieldIndex;
	                    var fieldSchema = schema[fieldName];
	                    var fieldOptions = {};

	                    // If a set of fields is specified, we only allow
	                    // these to be created
	                    if (fields) {
	                        if (!Object.keys(fields).includes(fieldName)) {
	                            continue;
	                        }
	                    }

	                    if (options.fields) {
	                        if (options.fields.hasOwnProperty(fieldName)) {
	                            fieldOptions = options.fields[fieldName];
	                        }
	                    }

	                    if (options.fieldsets) {
	                        fieldOptions.fieldsets = options.fieldsets;
	                    }

	                    var field = _core.Field.new(fieldId, fieldName, fieldSchema, fieldOptions);

	                    if (field) {
	                        // Only set the sort order if this wasn't set previously,
	                        // this may of been set by options
	                        if (!field.getSortOrder()) {
	                            field.setSortOrder(fieldIndex);
	                        }

	                        fieldset.addField(field);
	                        fieldIndex++;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }

	            return fieldset;
	        }
	    }]);

	    return Fieldset;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Registry of pug config and plugins
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _array = __webpack_require__(3);

	var _boolean = __webpack_require__(9);

	var _choice = __webpack_require__(11);

	var _integer = __webpack_require__(14);

	var _object = __webpack_require__(16);

	var _text = __webpack_require__(18);

	var _radio = __webpack_require__(19);

	var _text2 = __webpack_require__(5);

	var _date = __webpack_require__(20);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PugRegistry = function () {

	    /**
	    * Pug Registry is used a singleton class that contains
	    * configuration information. It's used by the builder
	    * utility to decide field mappings and by the plugins
	    * to extend the core functionality.
	    * @constructor
	    */
	    function PugRegistry() {
	        _classCallCheck(this, PugRegistry);

	        this.fields = {
	            'boolean': _boolean.BooleanField,
	            'integer': _integer.IntegerField,
	            'string': _text.StringField,
	            'date': _text.StringField,
	            'datetime': _text.StringField,
	            'enum': _choice.ChoiceField,
	            'array': _array.ArrayField,
	            'object': _object.ObjectField
	        };

	        this.widgets = {
	            'date': _date.DateInput,
	            'dateselect': _date.DateSelectionInput,
	            'email': _text2.EmailInput,
	            'radio': _radio.RadioInput,
	            'hidden': _text2.HiddenInput,
	            'textarea': _text2.TextAreaInput,
	            'password': _text2.PasswordInput,
	            'display': _text2.DisplayWidget
	        };
	    }

	    /**
	    * Register a new field type or overwrite an existing field
	    * type with a new field class.
	    * @param {string} type - field type
	    * @param {Field} fieldKlass - field class to be used for type
	    */


	    _createClass(PugRegistry, [{
	        key: 'registerField',
	        value: function registerField(type, fieldKlass) {
	            this.fields[type] = fieldKlass;
	        }

	        /**
	        * Check if a field type exists in the registry
	        * @param {string} type - name of field type to check
	        * @returns {bool} returns true if field type exists in registry
	        */

	    }, {
	        key: 'hasField',
	        value: function hasField(type) {
	            if (this.fields.hasOwnProperty(type)) {
	                return true;
	            }
	            return false;
	        }

	        /**
	        *
	        * @param {string}
	        */

	    }, {
	        key: 'getField',
	        value: function getField(type) {
	            if (this.fields.hasOwnProperty(type)) {
	                return this.fields[type];
	            }
	            return null;
	        }

	        /**
	        *
	        * @param {string}
	        * @param {Widget}
	        */

	    }, {
	        key: 'registerWidget',
	        value: function registerWidget(name, widgetKlass) {
	            this.widgets[name] = widgetKlass;
	        }

	        /**
	        *
	        * @param {string}
	        */

	    }, {
	        key: 'hasWidget',
	        value: function hasWidget(name) {
	            if (this.widgets.hasOwnProperty(name)) {
	                return true;
	            }
	            return false;
	        }

	        /**
	        *
	        * @param {string}
	        */

	    }, {
	        key: 'getWidget',
	        value: function getWidget(name) {
	            if (this.widgets.hasOwnProperty(name)) {
	                return this.widgets[name];
	            }
	            return null;
	        }
	    }]);

	    return PugRegistry;
	}();

	exports.default = new PugRegistry();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Array field
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ArrayField = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _core = __webpack_require__(4);

	var _array = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* Array is a complex field type, which is essentially a list
	* of other fields.
	* @class
	* @namespace Fields
	*/
	var ArrayField = exports.ArrayField = function (_Field) {
	    _inherits(ArrayField, _Field);

	    /**
	    *
	    */
	    function ArrayField(_ref) {
	        var id = _ref.id;
	        var name = _ref.name;
	        var _ref$label = _ref.label;
	        var label = _ref$label === undefined ? null : _ref$label;
	        var _ref$initial = _ref.initial;
	        var initial = _ref$initial === undefined ? null : _ref$initial;
	        var _ref$widget = _ref.widget;
	        var widget = _ref$widget === undefined ? null : _ref$widget;
	        var _ref$validators = _ref.validators;
	        var validators = _ref$validators === undefined ? [] : _ref$validators;
	        var _ref$attribs = _ref.attribs;
	        var attribs = _ref$attribs === undefined ? {} : _ref$attribs;
	        var _ref$description = _ref.description;
	        var description = _ref$description === undefined ? null : _ref$description;
	        var _ref$options = _ref.options;
	        var options = _ref$options === undefined ? {} : _ref$options;
	        var _ref$items = _ref.items;
	        var items = _ref$items === undefined ? {} : _ref$items;
	        var _ref$minItems = _ref.minItems;
	        var minItems = _ref$minItems === undefined ? 1 : _ref$minItems;
	        var _ref$maxItems = _ref.maxItems;
	        var maxItems = _ref$maxItems === undefined ? null : _ref$maxItems;

	        _classCallCheck(this, ArrayField);

	        // TODO: Sanity check min/max items

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayField).call(this, { id: id, name: name, label: label, initial: initial, widget: widget, validators: validators, attribs: attribs,
	            description: description, options: options }));

	        _this.minItems = minItems;
	        _this.maxItems = maxItems;
	        _this.itemSchema = items; // schema to make new items
	        _this.itemOptions = options;

	        // We store the array fields in the slot
	        _this.slots = [];

	        for (var i in Array.from(Array(_this.minItems).keys())) {
	            var position = parseInt(i) + 1;
	            var fieldId = id + '_item_' + position;
	            var fieldName = name + '_' + position;
	            var field = _this.constructor.new(fieldId, fieldName, _this.itemSchema,
	            // FIXME: This is a workaround, really should
	            // get the correct option structure to this class
	            _this.itemOptions);

	            _this.slots.push(field);
	        }

	        // Store errors as an object
	        _this.errors = {};
	        return _this;
	    }

	    /**
	    * Property - get/set value
	    */


	    _createClass(ArrayField, [{
	        key: 'validate',


	        /**
	        * Validate the form field
	        * @returns {bool} returns sucess or failure of validation
	        */
	        value: function validate() {
	            var valid = true;

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.slots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var field = _step.value;

	                    if (!field.validate()) {
	                        this._errors[field.name] = field.errors;
	                        valid = false;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return valid;
	        }

	        /**
	        * Refresh the validation state
	        */

	    }, {
	        key: 'refreshValidationState',
	        value: function refreshValidationState() {
	            _get(Object.getPrototypeOf(ArrayField.prototype), 'refreshValidationState', this).call(this);
	            this._errors = {};
	        }

	        /**
	        * Triggers post render call on all fields in array
	        */

	    }, {
	        key: 'postRender',
	        value: function postRender() {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.slots[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var field = _step2.value;

	                    field.postRender();
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'getWidget',
	        value: function getWidget() {
	            return _array.ArrayInput;
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'render',
	        value: function render() {
	            return this.widget.renderList(this.slots);
	        }

	        /**
	        * Property - get/set errors
	        * @param {string} Error string
	        */

	    }, {
	        key: 'value',
	        get: function get() {
	            var valueArray = [];

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = this.slots[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var slot = _step3.value;

	                    valueArray.push(slot.value);
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            return valueArray;
	        },
	        set: function set(value) {
	            if (!Array.isArray(value)) {
	                throw new Error('Unable to set array field value(s) from non-array!');
	            }

	            var fieldValueMap = this.slots.map(function (field, index) {
	                return [field, value[index]];
	            });

	            for (var _ref4 in fieldValueMap) {
	                var _ref3 = _slicedToArray(_ref4, 2);

	                var field = _ref3[0];
	                var _value = _ref3[1];

	                field.value = _value;
	            }
	        }
	    }, {
	        key: 'errors',
	        get: function get() {
	            return this._errors;
	        },
	        set: function set(error) {
	            this._errors = error;
	        }
	    }]);

	    return ArrayField;
	}(_core.Field);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Field Core
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Field = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _registry = __webpack_require__(2);

	var _registry2 = _interopRequireDefault(_registry);

	var _text = __webpack_require__(5);

	var _core = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	*
	* @class
	* @property {mixed} value - the value of the field
	*/
	var Field = exports.Field = function () {

	    /**
	    * Initialise the field - this will initalise the assocaited widget
	    * @param {string} id the ID of the field
	    * @param {string} name - the HTML name of the field
	    * @param [string] label - the HTML label linked ot the field
	    * @param [mixed] initial - the initial value for the field
	    * @param [Widget] widget - widget class to use when rendering field
	    * @param [array] validators - List of validators to use when validating field
	    * @param [object] attribs - HTML attributes for the field
	    * @param [string] description - Help text for the field
	    * @param [object] options - rendering options for the field
	    * @param [integer] order - order flag for sorting multiple fields
	    */
	    function Field(_ref) {
	        var id = _ref.id;
	        var name = _ref.name;
	        var _ref$label = _ref.label;
	        var label = _ref$label === undefined ? null : _ref$label;
	        var _ref$initial = _ref.initial;
	        var initial = _ref$initial === undefined ? null : _ref$initial;
	        var _ref$widget = _ref.widget;
	        var widget = _ref$widget === undefined ? null : _ref$widget;
	        var _ref$validators = _ref.validators;
	        var validators = _ref$validators === undefined ? [] : _ref$validators;
	        var _ref$attribs = _ref.attribs;
	        var attribs = _ref$attribs === undefined ? {} : _ref$attribs;
	        var _ref$description = _ref.description;
	        var description = _ref$description === undefined ? null : _ref$description;
	        var _ref$options = _ref.options;
	        var options = _ref$options === undefined ? {} : _ref$options;
	        var _ref$order = _ref.order;
	        var order = _ref$order === undefined ? null : _ref$order;

	        _classCallCheck(this, Field);

	        this.id = id;
	        this.name = name;
	        this.label = label ? label : this.name; // default
	        this.description = description;
	        this.attribs = attribs;
	        this.options = options;
	        this.validators = validators;
	        this.sortOrder = order;
	        this.locked = false;

	        this.initOptions();

	        // Setup the widget
	        var widgetKlass = widget ? widget : this.getWidget();

	        this.widget = new widgetKlass(this, this.type, this.id, this.name, this.label, this.attribs, this.options, initial);

	        this._errors = [];
	    }

	    /**
	    * Enable the options on the field
	    */


	    _createClass(Field, [{
	        key: 'initOptions',
	        value: function initOptions() {
	            if (this.options.hasOwnProperty('order')) {
	                this.sortOrder = this.options.order;
	            }
	            if (this.options.hasOwnProperty('label')) {
	                this.label = this.options.label;
	            }
	            if (this.options.hasOwnProperty('description')) {
	                this.description = this.options.description;
	            }
	        }

	        /**
	        * Property - get/set the type (typically set can not be called 
	        * but is included for subclasses who may use this)
	        */

	    }, {
	        key: 'render',


	        /**
	        * Render the form field using it's widget interface
	        */
	        value: function render() {
	            return this.widget.render();
	        }

	        /**
	        * Callback to the field after it has been rendered to
	        * the stage
	        */

	    }, {
	        key: 'postRender',
	        value: function postRender() {
	            this.widget.postRender();
	        }

	        /**
	        * Validate the form field
	        */

	    }, {
	        key: 'validate',
	        value: function validate() {
	            // Clear any previous validations
	            this.refreshValidationState();

	            var value = this.value;

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var validator = _step.value;

	                    if (!validator.validate(value)) {
	                        this.errors = validator.error;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            if (this.errors.length > 0) {
	                this.widget.refreshErrorState(this.errors);
	                return false;
	            }

	            return true;
	        }

	        /**
	        * Turn the field from an editable elment to a readonly one
	        */

	    }, {
	        key: 'lock',
	        value: function lock() {
	            if (this.locked) {
	                return false;
	            }

	            this.widget.lock();
	            this.locked = true;

	            return true;
	        }

	        /*
	        * Restore a field from a locked state
	        */

	    }, {
	        key: 'unlock',
	        value: function unlock() {
	            if (!this.locked) {
	                return false;
	            }

	            this.widget.unlock();
	            this.locked = false;

	            return true;
	        }

	        /**
	        * Refresh the validation state
	        */

	    }, {
	        key: 'refreshValidationState',
	        value: function refreshValidationState() {
	            this._errors = [];
	            this.widget.errors = [];
	            this.widget.refreshErrorState([]);
	        }

	        /**
	        * Get the widget class used to render the field
	        */

	    }, {
	        key: 'getWidget',
	        value: function getWidget() {
	            return _text.TextInput;
	        }

	        /**
	        * Get the sort order of the field. This is used when
	        * rendering groups of fields.
	        */

	    }, {
	        key: 'getSortOrder',
	        value: function getSortOrder() {
	            return this.sortOrder;
	        }

	        /**
	        * Set the internal sort order for a field.
	        */

	    }, {
	        key: 'setSortOrder',
	        value: function setSortOrder(order) {
	            this.sortOrder = order;
	        }

	        /**
	        * Display field as a string representation
	        */

	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'Field <' + this.name + ' ' + this.type + '>';
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'type',
	        get: function get() {
	            var type = this.constructor.name.toLowerCase();
	            return type != 'field' ? type.replace('field', '') : type;
	        },
	        set: function set(someType) {
	            throw new Error('Unable to set type on a field instance!');
	        }

	        /**
	        * Property - get/set value
	        */

	    }, {
	        key: 'value',
	        get: function get() {
	            return this.widget.getValue();
	        },
	        set: function set(value) {
	            this.widget.setValue(value);
	        }

	        /**
	        * Property - get/set errors
	        * @param {string} Error string
	        */

	    }, {
	        key: 'errors',
	        get: function get() {
	            return this._errors;
	        },
	        set: function set(error) {
	            this._errors.push(error);
	        }
	    }], [{
	        key: 'new',
	        value: function _new(id, name, schema) {
	            var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	            var fieldSpec = {
	                id: id,
	                name: name,
	                options: options,
	                attribs: {}
	            };

	            var fieldKlass = null;
	            var validators = [];

	            if (schema.description) {
	                fieldSpec.description = schema.description;
	            }

	            if (schema.title) {
	                fieldSpec.label = schema.title;
	            }

	            if (schema.default) {
	                fieldSpec.initial = schema.default;
	            }

	            if (schema.enum) {
	                var choices = [];

	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = schema.enum[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var option = _step2.value;

	                        choices.push([option, option]);
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }

	                fieldSpec.choices = choices;
	                fieldKlass = _registry2.default.getField('enum');
	            }

	            // This is awkward as we are trying to support the
	            // legacy/Alpaca option format
	            if (options.hasOwnProperty('hidden')) {
	                if (options.hidden) {
	                    fieldSpec.widget = _registry2.default.getWidget('hidden');
	                }
	            }

	            if (schema.format) {
	                if (_registry2.default.hasWidget(schema.format)) {
	                    fieldSpec.widget = _registry2.default.getWidget(schema.format);
	                }
	            }

	            if (options.widget) {
	                if (_registry2.default.hasWidget(options.widget)) {
	                    fieldSpec.widget = _registry2.default.getWidget(options.widget);
	                }
	            }

	            if (schema.items) {
	                fieldSpec.items = schema.items;
	            }

	            if (schema.properties) {
	                fieldSpec.properties = schema.properties;
	            }

	            // Build validator list
	            if (schema.required) {
	                if (schema.type == 'boolean') {
	                    validators.push(new _core.BooleanRequiredValidator());
	                } else {
	                    validators.push(new _core.RequiredValidator());
	                }

	                fieldSpec.attribs.required = 'true';
	            }

	            if (schema.minLength) {
	                validators.push(new _core.LengthValidator(min = schema.minLength));
	            }

	            if (schema.maxLength) {
	                validators.push(new _core.LengthValidator(max = schema.maxLength));
	            }

	            if (schema.minItems) {
	                fieldSpec.minItems = schema.minItems;
	            }

	            if (schema.maxItems) {
	                fieldSpec.maxItems = schema.maxItems;
	            }

	            fieldSpec.validators = validators;

	            if (!fieldKlass) {
	                // Attempt to get the field spec
	                if (!_registry2.default.hasField(schema.type)) {
	                    return null;
	                }

	                fieldKlass = _registry2.default.getField(schema.type);
	            }

	            var field = new fieldKlass(fieldSpec);

	            return field;
	        }
	    }]);

	    return Field;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Text input widget interface
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DisplayWidget = exports.PasswordInput = exports.HiddenInput = exports.EmailInput = exports.TextAreaInput = exports.TextInput = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.displayReadonlyValue = displayReadonlyValue;

	var _core = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* TextInput - Standard HTML text input
	* @class
	* @namespace Widgets
	*/
	var TextInput = exports.TextInput = function (_Widget) {
	    _inherits(TextInput, _Widget);

	    function TextInput() {
	        _classCallCheck(this, TextInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).apply(this, arguments));
	    }

	    _createClass(TextInput, [{
	        key: 'renderField',


	        /**
	        * Render the text input field
	        * @returns {HTMLElement} render the input widget
	        */
	        value: function renderField() {
	            var textInput = document.createElement('input');
	            textInput.setAttribute('name', this.name);
	            textInput.setAttribute('type', 'text');
	            textInput.setAttribute('value', this.value ? this.value : '');
	            textInput.setAttribute('class', this.getFieldClass());

	            for (var attrib in this.attribs) {
	                textInput.setAttribute(attrib, this.attribs[attrib]);
	            }

	            return textInput;
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-text';
	        }
	    }]);

	    return TextInput;
	}(_core.Widget);

	/**
	* TextAreaInput - Standard HTML textarea input
	* @class
	* @namespace Widgets
	*/


	var TextAreaInput = exports.TextAreaInput = function (_Widget2) {
	    _inherits(TextAreaInput, _Widget2);

	    function TextAreaInput() {
	        _classCallCheck(this, TextAreaInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(TextAreaInput).apply(this, arguments));
	    }

	    _createClass(TextAreaInput, [{
	        key: 'renderField',


	        /**
	        * Render the text input field
	        */
	        value: function renderField() {
	            var textareaInput = document.createElement('textarea');
	            textareaInput.setAttribute('name', this.name);
	            textareaInput.setAttribute('class', this.getFieldClass());
	            textareaInput.textContent = this.value ? this.value : '';

	            for (var attrib in this.attribs) {
	                textareaInput.setAttribute(attrib, this.attribs[attrib]);
	            }

	            return textareaInput;
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-text';
	        }
	    }]);

	    return TextAreaInput;
	}(_core.Widget);

	/**
	* EmailInput - Standard HTML text input
	* @class
	* @namespace Widgets
	*/


	var EmailInput = exports.EmailInput = function (_TextInput) {
	    _inherits(EmailInput, _TextInput);

	    function EmailInput() {
	        _classCallCheck(this, EmailInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(EmailInput).apply(this, arguments));
	    }

	    _createClass(EmailInput, [{
	        key: 'renderField',


	        /**
	        * Render the text input field
	        */
	        value: function renderField() {
	            var textInput = document.createElement('input');
	            textInput.setAttribute('name', this.name);
	            textInput.setAttribute('type', 'email');
	            textInput.setAttribute('value', this.value ? this.value : '');
	            textInput.setAttribute('class', this.getFieldClass());

	            for (var attrib in this.attribs) {
	                textInput.setAttribute(attrib, this.attribs[attrib]);
	            }

	            return textInput;
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-email';
	        }
	    }]);

	    return EmailInput;
	}(TextInput);

	/**
	* HiddenInput - Standard HTML hidden input
	* @class
	* @namespace Widgets
	*/


	var HiddenInput = exports.HiddenInput = function (_Widget3) {
	    _inherits(HiddenInput, _Widget3);

	    function HiddenInput() {
	        _classCallCheck(this, HiddenInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(HiddenInput).apply(this, arguments));
	    }

	    _createClass(HiddenInput, [{
	        key: 'renderField',


	        /**
	        * Render the text input field
	        */
	        value: function renderField() {
	            var textInput = document.createElement('input');
	            textInput.setAttribute('name', this.name);
	            textInput.setAttribute('type', 'hidden');
	            textInput.setAttribute('value', this.value ? this.value : '');
	            textInput.setAttribute('class', this.getFieldClass());

	            for (var attrib in this.attribs) {
	                textInput.setAttribute(attrib, this.attribs[attrib]);
	            }

	            return textInput;
	        }

	        /**
	        * Label is not used for hidden fields
	        */

	    }, {
	        key: 'renderLabel',
	        value: function renderLabel() {
	            return null;
	        }

	        /**
	        * Errors are not shown for hidden fields
	        */

	    }, {
	        key: 'renderErrors',
	        value: function renderErrors() {
	            return null;
	        }
	    }]);

	    return HiddenInput;
	}(_core.Widget);

	/**
	* PasswordInput - Standard HTML password input
	* @class
	* @namespace Widgets
	*/


	var PasswordInput = exports.PasswordInput = function (_TextInput2) {
	    _inherits(PasswordInput, _TextInput2);

	    function PasswordInput() {
	        _classCallCheck(this, PasswordInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(PasswordInput).apply(this, arguments));
	    }

	    _createClass(PasswordInput, [{
	        key: 'renderField',


	        /**
	        * Render the text input field
	        */
	        value: function renderField() {
	            var textInput = document.createElement('input');
	            textInput.setAttribute('name', this.name);
	            textInput.setAttribute('type', 'password');
	            textInput.setAttribute('value', this.value ? this.value : '');
	            textInput.setAttribute('class', this.getFieldClass());

	            for (var attrib in this.attribs) {
	                textInput.setAttribute(attrib, this.attribs[attrib]);
	            }

	            return textInput;
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-password';
	        }
	    }]);

	    return PasswordInput;
	}(TextInput);

	/**
	* DisplayWidget - Display only widget, this just shows the field as
	* plain text. Typically used by the lock form utility.
	*/


	function displayReadonlyValue(value) {
	    var display = document.createElement('span');

	    // TODO: Support for the class being set dynamically
	    display.setAttribute('class', 'pug-field pug-field-display');
	    display.textContent = value;

	    return display;
	}

	/**
	* DisplayWidget - Widget to display field as plain text
	* @class
	* @namespace Widgets
	*/

	var DisplayWidget = exports.DisplayWidget = function (_Widget4) {
	    _inherits(DisplayWidget, _Widget4);

	    function DisplayWidget() {
	        _classCallCheck(this, DisplayWidget);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(DisplayWidget).apply(this, arguments));
	    }

	    _createClass(DisplayWidget, [{
	        key: 'renderField',


	        /**
	        * Render the text input field
	        */
	        value: function renderField() {
	            return displayReadonlyValue(this.value);
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-display';
	        }
	    }]);

	    return DisplayWidget;
	}(_core.Widget);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Base widget interface 
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Widget = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _text = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	* Base Widget interface
	* @class
	* @namespace Widgets
	*/
	var Widget = exports.Widget = function () {

	    /**
	    * Base Widget interface
	    * @constructor
	    * @param {Field} field - fields object widget is bound too
	    * @param {string} type - name of field type
	    * @param {string} id - ID of the field (used in HTML)
	    * @param {string} name - name of the field (used in HTML)
	    * @param [string] label - optional label for the field
	    * @param [object] attribs - optional HTML attributes for the field
	    * @param [object] options - optional values to configure the widget
	    * @param [string] value - initial value for the widget 
	    */
	    function Widget(field, type, id, name, label, attribs, options, initial) {
	        _classCallCheck(this, Widget);

	        this._field = field;
	        this.type = type;
	        this.id = id;
	        this.name = name;
	        this.label = label;
	        this.attribs = attribs;
	        this.options = options;
	        this.value = initial;
	        this.locked = false;
	        this.errors = [];
	    }

	    /**
	    * Render the HTML widget
	    * @returns {DocumentFragment} Rendered widget as a document fragment
	    */


	    _createClass(Widget, [{
	        key: 'render',
	        value: function render() {
	            // Create a fragment for our widget
	            var widgetFragment = document.createDocumentFragment();

	            var wrapper = this.renderWrapper();
	            var label = this.renderLabel();
	            var field = this.renderField();
	            var errors = this.renderErrors();

	            if (label) {
	                wrapper.appendChild(label);
	            }

	            wrapper.appendChild(field);

	            if (errors) {
	                wrapper.appendChild(errors);
	            }

	            widgetFragment.appendChild(wrapper);

	            return widgetFragment;
	        }

	        /**
	        * Callback to the widget after the widget has been rendered
	        * to the stage
	        * @returns by default, nothing is returned.
	        */

	    }, {
	        key: 'postRender',
	        value: function postRender() {
	            // Default is to do nothing...
	            return;
	        }

	        /**
	        * Lock the widget - this places it in a read only state
	        * @returns {bool} returns true if lock is successful, false otherwise
	        */

	    }, {
	        key: 'lock',
	        value: function lock() {
	            if (this.locked) {
	                return false;
	            }

	            var lockedValue = this.getValue();
	            var wrapper = this.getElementWrapper();
	            var element = this.getElement();

	            // Clear the existing field...
	            wrapper.removeChild(element);

	            // Add the display only field
	            var displayElement = (0, _text.displayReadonlyValue)(lockedValue);
	            wrapper.appendChild(displayElement);

	            this.locked = true;

	            return true;
	        }

	        /**
	        * Unlock the widget - this removes any previous lock and returns
	        * it to it's default state.
	        * @returns {bool} returns true if unlock is successful, false otherwise
	        */

	    }, {
	        key: 'unlock',
	        value: function unlock() {
	            if (!this.locked) {
	                return false;
	            }

	            var wrapper = this.getElementWrapper();
	            var element = this.getElement();

	            // Clear the display field
	            wrapper.removeChild(element);

	            var field = this.renderField();
	            wrapper.appendChild(field);

	            this.locked = false;

	            return true;
	        }

	        /**
	        * Render the field HTML - intended to be overidden by a subclass
	        * @throws an error will be thrown if not overridden
	        */

	    }, {
	        key: 'renderField',
	        value: function renderField() {
	            /* */
	            throw new Error('renderField should be overidden by a widget subclass!');
	        }

	        /**
	        * Render the field wrapper
	        * @returns {HTMLElement} HTML element used for wrapping widget
	        */

	    }, {
	        key: 'renderWrapper',
	        value: function renderWrapper() {
	            var wrapper = document.createElement('div');
	            wrapper.setAttribute('id', this.id);
	            wrapper.className = this.getFieldWrapperClass();
	            return wrapper;
	        }

	        /**
	        * Render the field label
	        * @returns {HTMLElement} returns a HTML label element or null if no 
	        * label is configured for the widget
	        */

	    }, {
	        key: 'renderLabel',
	        value: function renderLabel() {
	            if (this.label) {
	                var label = document.createElement('label');
	                label.setAttribute('for', this.name);
	                label.setAttribute('class', 'pug-label');
	                label.textContent = this.label;
	                return label;
	            }

	            return null;
	        }

	        /**
	        * Render the field error information
	        * @returns {HTMLElement} returns a HTML list element with error
	        * information of null if no errors are present 
	        */

	    }, {
	        key: 'renderErrors',
	        value: function renderErrors() {
	            if (this.errors.length > 0) {
	                var errorList = document.createElement('ul');
	                errorList.className = this.getErrorClass();

	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = this.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var error = _step.value;

	                        var errorItem = document.createElement('li');
	                        errorItem.textContent = error;
	                        errorList.appendChild(errorItem);
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }

	                return errorList;
	            }

	            return null;
	        }

	        /**
	        * Refresh the elements error state - this will remove any
	        * existing error elements and re-add if there are still errors
	        * on the field
	        * @params {array} errors - a list of errors to be displayed
	        */

	    }, {
	        key: 'refreshErrorState',
	        value: function refreshErrorState(errors) {
	            this.errors = errors;

	            var elementWrapper = this.getElementWrapper();
	            var errorElement = this.getElementError();
	            var errorWrapperClass = this.getErrorWrapperClass();

	            // Remove existing errors
	            if (errorElement) {
	                elementWrapper.classList.remove(errorWrapperClass);
	                elementWrapper.removeChild(errorElement);
	            }

	            // Add errors if present
	            if (this.errors.length > 0) {
	                elementWrapper.classList.add(errorWrapperClass);
	                var _errors = this.renderErrors();

	                if (_errors) {
	                    elementWrapper.appendChild(_errors);
	                }
	            }
	        }

	        /**
	        * Get a handle on the elements wrapper on the stage
	        * @return {HTMLElement} the element's wrapper on the stage
	        */

	    }, {
	        key: 'getElementWrapper',
	        value: function getElementWrapper() {
	            return document.querySelector('#' + this.id);
	        }

	        /**
	        * Get a handle for the element on the stage
	        * @return {HTMLElement} the element on the stage
	        */

	    }, {
	        key: 'getElement',
	        value: function getElement() {
	            return this.getElementWrapper().querySelector('.pug-field');
	        }

	        /**
	        * Get a handle for the elemnet error informantion
	        * @return {HTMLElement} the error element on the stage
	        */

	    }, {
	        key: 'getElementError',
	        value: function getElementError() {
	            return this.getElementWrapper().querySelector('.pug-error');
	        }

	        /**
	        * Get the value of an element on the stage. This is the raw value
	        * as specified in the HTML.
	        * @returns {string} value of the element on the stage
	        */

	    }, {
	        key: 'getValue',
	        value: function getValue() {
	            var element = this.getElement();

	            if (!element) {
	                throw new Error('Unable to get element!');
	            }

	            return this.value = element.value;
	        }

	        /**
	        * Set the value of an element on the stage.
	        * @param {string} value - value to set the HTML element too
	        */

	    }, {
	        key: 'setValue',
	        value: function setValue(value) {
	            this.value = value;

	            var element = this.getElement();

	            if (element) {
	                element.value = this.value;
	            }
	        }

	        /**
	        * Get the class name for the widget element
	        * @returns {string} the class to use for the field element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            if (this.attribs.hasOwnProperty('class')) {
	                return 'pug-field ' + this.attribs.class;
	            }

	            return 'pug-field';
	        }

	        /**
	        * Get the class name for the widget wrapper
	        * @returns {string} the class to use for the wrapper element
	        */

	    }, {
	        key: 'getFieldWrapperClass',
	        value: function getFieldWrapperClass() {
	            return 'pug-field-wrapper';
	        }

	        /**
	        * Get the class name for the error
	        * @returns {string} the class to use for the error element
	        */

	    }, {
	        key: 'getErrorClass',
	        value: function getErrorClass() {
	            return 'pug-error';
	        }

	        /**
	        * Get the class name for the error wrapper
	        * @returns {string} the class to use for the error wrapper element
	        */

	    }, {
	        key: 'getErrorWrapperClass',
	        value: function getErrorWrapperClass() {
	            return 'pug-error-wrapper';
	        }
	    }]);

	    return Widget;
	}();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	    pug - validators/core.js
	*/

	/**
	* Base Validation Interface
	*/
	var Validator = exports.Validator = function () {
	    function Validator() {
	        _classCallCheck(this, Validator);

	        this.error = null;
	    }

	    _createClass(Validator, [{
	        key: 'validate',
	        value: function validate(value) {
	            return true;
	        }
	    }]);

	    return Validator;
	}();

	/**
	* RequiredValidator - Validate the existance of a value
	*/


	var RequiredValidator = exports.RequiredValidator = function (_Validator) {
	    _inherits(RequiredValidator, _Validator);

	    function RequiredValidator() {
	        _classCallCheck(this, RequiredValidator);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RequiredValidator).apply(this, arguments));
	    }

	    _createClass(RequiredValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (!value) {
	                this.error = 'This field is required.';
	                return false;
	            }

	            return true;
	        }
	    }]);

	    return RequiredValidator;
	}(Validator);

	/**
	* BooleanRequiredValidator - Validate the existance of a value

	*/


	var BooleanRequiredValidator = exports.BooleanRequiredValidator = function (_Validator2) {
	    _inherits(BooleanRequiredValidator, _Validator2);

	    function BooleanRequiredValidator() {
	        _classCallCheck(this, BooleanRequiredValidator);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(BooleanRequiredValidator).apply(this, arguments));
	    }

	    _createClass(BooleanRequiredValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (!(value === true || value === false)) {
	                this.error = 'This field is required.';
	                return false;
	            }

	            return true;
	        }
	    }]);

	    return BooleanRequiredValidator;
	}(Validator);

	/**
	* LengthValidator - Validate the length of a string
	*/


	var LengthValidator = exports.LengthValidator = function (_Validator3) {
	    _inherits(LengthValidator, _Validator3);

	    function LengthValidator(_ref) {
	        var _ref$min = _ref.min;
	        var min = _ref$min === undefined ? null : _ref$min;
	        var _ref$max = _ref.max;
	        var max = _ref$max === undefined ? null : _ref$max;

	        _classCallCheck(this, LengthValidator);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(LengthValidator).call(this));

	        _this3.min = min;
	        _this3.max = max;
	        return _this3;
	    }

	    _createClass(LengthValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (!value) {
	                this.error = 'This field is required.';
	                return false;
	            }

	            if (this.min && value.length < this.min) {
	                this.error = 'Length must be at least "' + this.min + '" characters';
	                return false;
	            }

	            if (this.max && value.length > this.max) {
	                this.error = 'Length must be no more than "' + this.max + '" characters';
	                return false;
	            }

	            return true;
	        }
	    }]);

	    return LengthValidator;
	}(Validator);

	/**
	* IntegerValidator - Validate the integer is of a correct type
	*/


	var IntegerValidator = exports.IntegerValidator = function (_Validator4) {
	    _inherits(IntegerValidator, _Validator4);

	    function IntegerValidator() {
	        _classCallCheck(this, IntegerValidator);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(IntegerValidator).apply(this, arguments));
	    }

	    _createClass(IntegerValidator, [{
	        key: 'validate',
	        value: function validate(value) {
	            if (isNaN(value)) {
	                this.error = 'Value must be an integer';
	                return false;
	            }

	            return true;
	        }
	    }]);

	    return IntegerValidator;
	}(Validator);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Array Widgets
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ArrayInput = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* ArrayInput - Render a list of fields
	* @class
	* @namespace Widgets
	*/
	var ArrayInput = exports.ArrayInput = function (_Widget) {
	    _inherits(ArrayInput, _Widget);

	    function ArrayInput() {
	        _classCallCheck(this, ArrayInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayInput).apply(this, arguments));
	    }

	    _createClass(ArrayInput, [{
	        key: 'renderList',


	        /**
	        * Render the list of input fields
	        * @params {array} fields - a list of Field objects to render
	        * @returns {HTMLElement} returns a HTML fragment containing 
	        * all rendered fields
	        */
	        value: function renderList(fields) {
	            // Create a fragment for our widget
	            var widgetFragment = document.createDocumentFragment();

	            var wrapper = this.renderWrapper();

	            fields.sort(function (a, b) {
	                return a.getSortOrder() - b.getSortOrder();
	            });

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var field = _step.value;

	                    var renderedField = field.render();
	                    wrapper.appendChild(renderedField);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            widgetFragment.appendChild(wrapper);

	            return widgetFragment;
	        }

	        /**
	        * @throws render is not supported on Arrays - renderList must be used
	        */

	    }, {
	        key: 'render',
	        value: function render() {
	            throw new Error('ArrayInput must render as a list - use renderList');
	        }

	        /**
	        * @throws renderLabel is not supported on array fields
	        */

	    }, {
	        key: 'renderLabel',
	        value: function renderLabel() {
	            throw new Error('ArrayInput does not support a label!');
	        }

	        /**
	        * Get the class name for the widget element
	        * @returns {string} the class to use for the field element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-array';
	        }
	    }]);

	    return ArrayInput;
	}(_core.Widget);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    pug - fields/boolean.js
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BooleanField = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(4);

	var _checkbox = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function toBool(value) {
	    if (value == undefined) {
	        return null;
	    }

	    switch (value.toLowerCase().trim()) {
	        case "true":case "yes":case "1":
	            return true;
	        case "false":case "no":case "0":case null:
	            return false;
	        default:
	            return Boolean(value);
	    }
	}

	var BooleanField = exports.BooleanField = function (_Field) {
	    _inherits(BooleanField, _Field);

	    function BooleanField() {
	        _classCallCheck(this, BooleanField);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(BooleanField).apply(this, arguments));
	    }

	    _createClass(BooleanField, [{
	        key: 'getWidget',


	        /**
	        * Get the widget for the field
	        */
	        value: function getWidget() {
	            return _checkbox.CheckboxInput;
	        }
	    }, {
	        key: 'value',


	        /**
	           * Property - get/set value
	           */
	        get: function get() {
	            var value = this.widget.getValue();

	            // Widgets deal with the HTML value, which
	            // can not represent a boolean. Coerce to
	            // the expected type
	            return toBool(value);
	        },
	        set: function set(value) {
	            this.widget.setValue(value);
	        }
	    }]);

	    return BooleanField;
	}(_core.Field);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Checkbox Widgets
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CheckboxInput = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* CheckboxInput - Standard HTML checkbox
	* @class
	* @namespace Widgets
	*/
	var CheckboxInput = exports.CheckboxInput = function (_Widget) {
	    _inherits(CheckboxInput, _Widget);

	    function CheckboxInput() {
	        _classCallCheck(this, CheckboxInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxInput).apply(this, arguments));
	    }

	    _createClass(CheckboxInput, [{
	        key: 'renderField',


	        /**
	        * Render the text input field
	        * @returns {HTMLElement} returns the rendered HTML checkbox 
	        * input field
	        */
	        value: function renderField() {
	            var checkbox = document.createElement('input');
	            checkbox.setAttribute('name', this.name);
	            checkbox.setAttribute('type', 'checkbox');
	            checkbox.setAttribute('class', this.getFieldClass());

	            if (this.value) {
	                checkbox.setAttribute('checked', 'checked');
	            }

	            for (var attrib in this.attribs) {
	                checkbox.setAttribute(attrib, this.attribs[attrib]);
	            }

	            return checkbox;
	        }

	        /**
	        * Get the class name for the widget element
	        * @returns {string} the class to use for the field element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-checkbox';
	        }
	    }]);

	    return CheckboxInput;
	}(_core.Widget);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    pug - fields/choice.js
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChoiceField = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(4);

	var _select = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ChoiceField = exports.ChoiceField = function (_Field) {
	    _inherits(ChoiceField, _Field);

	    function ChoiceField(_ref) {
	        var id = _ref.id;
	        var name = _ref.name;
	        var _ref$label = _ref.label;
	        var label = _ref$label === undefined ? null : _ref$label;
	        var _ref$initial = _ref.initial;
	        var initial = _ref$initial === undefined ? null : _ref$initial;
	        var _ref$widget = _ref.widget;
	        var widget = _ref$widget === undefined ? null : _ref$widget;
	        var _ref$validators = _ref.validators;
	        var validators = _ref$validators === undefined ? [] : _ref$validators;
	        var _ref$attribs = _ref.attribs;
	        var attribs = _ref$attribs === undefined ? {} : _ref$attribs;
	        var _ref$description = _ref.description;
	        var description = _ref$description === undefined ? null : _ref$description;
	        var _ref$options = _ref.options;
	        var options = _ref$options === undefined ? {} : _ref$options;
	        var _ref$order = _ref.order;
	        var order = _ref$order === undefined ? null : _ref$order;
	        var _ref$choices = _ref.choices;
	        var choices = _ref$choices === undefined ? [] : _ref$choices;

	        _classCallCheck(this, ChoiceField);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChoiceField).call(this, { id: id, name: name, label: label, initial: initial, widget: widget, validators: validators, attribs: attribs,
	            description: description, options: options, order: order }));

	        _this.choices = choices;

	        if (options.hasOwnProperty('choices')) {
	            _this.choices = options.choices;
	        }

	        _this.widget.setChoices(_this.choices);
	        return _this;
	    }

	    _createClass(ChoiceField, [{
	        key: 'getWidget',
	        value: function getWidget() {
	            return _select.SelectInput;
	        }
	    }]);

	    return ChoiceField;
	}(_core.Field);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    pug - widgets/select.js
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SelectInput = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _choice2 = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* SelectInput - Standard HTML select input
	*/
	var SelectInput = exports.SelectInput = function (_BaseChoiceWidget) {
	    _inherits(SelectInput, _BaseChoiceWidget);

	    function SelectInput() {
	        _classCallCheck(this, SelectInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectInput).apply(this, arguments));
	    }

	    _createClass(SelectInput, [{
	        key: 'renderField',


	        /**
	        * Render the select field
	        */
	        value: function renderField() {
	            var selectInput = document.createElement('select');
	            selectInput.setAttribute('name', this.name);
	            selectInput.setAttribute('class', this.getFieldClass());

	            for (var attrib in this.attribs) {
	                selectInput.setAttribute(attrib, this.attribs[attrib]);
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var choice = _step.value;

	                    var _choice = _slicedToArray(choice, 2);

	                    var value = _choice[0];
	                    var label = _choice[1];

	                    var option = document.createElement('option');
	                    option.value = value;
	                    option.textContent = this.formatLabel(label);

	                    if (this.value == value) {
	                        option.setAttribute('selected', 'selected');
	                    }

	                    selectInput.appendChild(option);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return selectInput;
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-select';
	        }
	    }]);

	    return SelectInput;
	}(_choice2.BaseChoiceWidget);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Choice Widgets
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BaseChoiceWidget = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* BaseChoiceWidget - Abstract input for choice fields
	* @class
	* @abstract
	* @namespace Widgets
	*/
	var BaseChoiceWidget = exports.BaseChoiceWidget = function (_Widget) {
	    _inherits(BaseChoiceWidget, _Widget);

	    /**
	    * Abstract class for managing widgets with choices, such as selects
	    * @constructor
	    * @param {Field} field - fields object widget is bound too
	    * @param {string} type - name of field type
	    * @param {string} id - ID of the field (used in HTML)
	    * @param {string} name - name of the field (used in HTML)
	    * @param [string] label - optional label for the field
	    * @param [object] attribs - optional HTML attributes for the field
	    * @param [object] options - optional values to configure the widget
	    * @param [string] value - initial value for the widget 
	    */
	    function BaseChoiceWidget(field, type, id, name, label, attribs, options, value) {
	        _classCallCheck(this, BaseChoiceWidget);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseChoiceWidget).call(this, field, type, id, name, label, attribs, options, value));

	        _this.choices = [];
	        return _this;
	    }

	    /**
	    * 
	    * @params {array}
	    */


	    _createClass(BaseChoiceWidget, [{
	        key: 'setChoices',
	        value: function setChoices(choices) {
	            this.choices = choices;
	        }

	        /**
	        * Get the choices used by the widget
	        * @returns {array} choice pair array
	        */

	    }, {
	        key: 'getChoices',
	        value: function getChoices() {
	            return this.choices;
	        }

	        /**
	        * Format the label text for display as a choice
	        * @returns {string} formated label
	        */

	    }, {
	        key: 'formatLabel',
	        value: function formatLabel(label) {
	            if (label) {
	                label = label.toLowerCase().replace('_', ' ');
	                return '' + label.charAt(0).toUpperCase() + label.slice(1);
	            }

	            return label;
	        }

	        /**
	        * @throws Unable to render the field, must be overidden by a subclass
	        */

	    }, {
	        key: 'renderField',
	        value: function renderField() {
	            throw new Error('Unable to render abstract widget BaseChoiceInput!');
	        }
	    }]);

	    return BaseChoiceWidget;
	}(_core.Widget);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    pug - fields/integer.js
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IntegerField = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(4);

	var _numbers = __webpack_require__(15);

	var _core2 = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IntegerField = exports.IntegerField = function (_Field) {
	    _inherits(IntegerField, _Field);

	    function IntegerField(_ref) {
	        var id = _ref.id;
	        var name = _ref.name;
	        var _ref$label = _ref.label;
	        var label = _ref$label === undefined ? null : _ref$label;
	        var _ref$initial = _ref.initial;
	        var initial = _ref$initial === undefined ? null : _ref$initial;
	        var _ref$widget = _ref.widget;
	        var widget = _ref$widget === undefined ? null : _ref$widget;
	        var _ref$validators = _ref.validators;
	        var validators = _ref$validators === undefined ? [] : _ref$validators;
	        var _ref$attribs = _ref.attribs;
	        var attribs = _ref$attribs === undefined ? {} : _ref$attribs;
	        var _ref$description = _ref.description;
	        var description = _ref$description === undefined ? null : _ref$description;
	        var _ref$options = _ref.options;
	        var options = _ref$options === undefined ? {} : _ref$options;
	        var _ref$order = _ref.order;
	        var order = _ref$order === undefined ? null : _ref$order;

	        _classCallCheck(this, IntegerField);

	        // Always append an integer validator
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IntegerField).call(this, { id: id, name: name, label: label, initial: initial, widget: widget, validators: validators, attribs: attribs,
	            description: description, options: options, order: order }));

	        _this.validators.push(new _core2.IntegerValidator());
	        return _this;
	    }

	    /**
	       * Property - get/set value
	       */


	    _createClass(IntegerField, [{
	        key: 'getWidget',


	        /**
	        *
	        */
	        value: function getWidget() {
	            return _numbers.NumberInput;
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            var value = this.widget.getValue();

	            // Widgets deal with the HTML value, which
	            // can not represent an integer. Coerce to
	            // the expected type
	            return parseInt(value);
	        },
	        set: function set(value) {
	            this.widget.setValue(value);
	        }
	    }]);

	    return IntegerField;
	}(_core.Field);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    pug - widgets/text.js
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NumberInput = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* NumberInput - Standard HTML number input
	*/
	var NumberInput = exports.NumberInput = function (_Widget) {
	    _inherits(NumberInput, _Widget);

	    function NumberInput() {
	        _classCallCheck(this, NumberInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberInput).apply(this, arguments));
	    }

	    _createClass(NumberInput, [{
	        key: 'renderField',


	        /**
	        * Render the text input field
	        */
	        value: function renderField() {
	            var textInput = document.createElement('input');
	            textInput.setAttribute('name', this.name);
	            textInput.setAttribute('type', 'number');
	            textInput.setAttribute('class', this.getFieldClass());
	            textInput.setAttribute('value', this.value ? this.value : '');

	            for (var attrib in this.attribs) {
	                textInput.setAttribute(attrib, this.attribs[attrib]);
	            }

	            return textInput;
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-text';
	        }
	    }]);

	    return NumberInput;
	}(_core.Widget);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    pug - fields/object.js
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ObjectField = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _core = __webpack_require__(4);

	var _object = __webpack_require__(17);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// TODO: An object is basically a fieldset within a fieldset, 
	// we are repeating a bunch of functionality from the fieldset 
	// here. This should be refactored.

	/**
	* Object Field
	* @class
	*/
	var ObjectField = exports.ObjectField = function (_Field) {
	    _inherits(ObjectField, _Field);

	    function ObjectField(_ref) {
	        var id = _ref.id;
	        var name = _ref.name;
	        var _ref$label = _ref.label;
	        var label = _ref$label === undefined ? null : _ref$label;
	        var _ref$initial = _ref.initial;
	        var initial = _ref$initial === undefined ? null : _ref$initial;
	        var _ref$widget = _ref.widget;
	        var widget = _ref$widget === undefined ? null : _ref$widget;
	        var _ref$validators = _ref.validators;
	        var validators = _ref$validators === undefined ? [] : _ref$validators;
	        var _ref$attribs = _ref.attribs;
	        var attribs = _ref$attribs === undefined ? {} : _ref$attribs;
	        var _ref$description = _ref.description;
	        var description = _ref$description === undefined ? null : _ref$description;
	        var _ref$options = _ref.options;
	        var options = _ref$options === undefined ? {} : _ref$options;
	        var _ref$order = _ref.order;
	        var order = _ref$order === undefined ? null : _ref$order;
	        var _ref$properties = _ref.properties;
	        var properties = _ref$properties === undefined ? {} : _ref$properties;

	        _classCallCheck(this, ObjectField);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectField).call(this, { id: id, name: name, label: label, initial: initial, widget: widget, validators: validators, attribs: attribs,
	            description: description, options: options }));

	        _this.object = {};
	        var fieldIndex = 1;

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = Object.keys(properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var fieldName = _step.value;

	                var fieldId = name + '_' + fieldName;
	                var fieldOptions = {};

	                if (_this.options.hasOwnProperty(fieldName)) {
	                    fieldOptions = options[fieldName];
	                }

	                var field = _this.constructor.new(fieldId, fieldName, properties[fieldName], fieldOptions);

	                if (!field.getSortOrder()) {
	                    field.setSortOrder(fieldIndex);
	                }

	                _this.object[fieldName] = field;

	                fieldIndex++;
	            }

	            // Store errors as an object
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        _this._errors = {};
	        return _this;
	    }

	    _createClass(ObjectField, [{
	        key: 'validate',


	        /**
	        * Validate the form field
	        */
	        value: function validate() {
	            var valid = true;

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = Object.keys(this.object)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var key = _step2.value;

	                    var field = this.object[key];
	                    if (!field.validate()) {
	                        this._errors[key] = field.errors;
	                        valid = false;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            return valid;
	        }

	        /**
	        * Refresh the validation state
	        */

	    }, {
	        key: 'refreshValidationState',
	        value: function refreshValidationState() {
	            _get(Object.getPrototypeOf(ObjectField.prototype), 'refreshValidationState', this).call(this);
	            this._errors = {};
	        }

	        /**
	        * 
	        */

	    }, {
	        key: 'postRender',
	        value: function postRender() {
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = Object.keys(this.object)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var key = _step3.value;

	                    this.object[key].postRender();
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getWidget',
	        value: function getWidget() {
	            return _object.ObjectInput;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return this.widget.renderObject(this.object);
	        }

	        /**
	        * Property - get/set errors
	        * @param {string} Error string
	        */

	    }, {
	        key: 'value',
	        get: function get() {
	            var values = {};

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = Object.keys(this.object)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var key = _step4.value;

	                    values[key] = this.object[key].value;
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            return values;
	        },
	        set: function set(values) {
	            // Wo ist mein Object.isObject()??
	            if (!(typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object') {
	                throw new Error('Unable to set object field value(s) from non-object!');
	            }

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = Object.keys(values)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var key = _step5.value;

	                    // TODO: Should we warn/error if we set keys that aren't
	                    // in field object?
	                    if (this.object.hasOwnProperty(key)) {
	                        this.object[key].value = values[key];
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'errors',
	        get: function get() {
	            return this._errors;
	        },
	        set: function set(error) {
	            this._errors = error;
	        }
	    }]);

	    return ObjectField;
	}(_core.Field);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    pug - widgets/object.js
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ObjectInput = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* ObjectInput - Render a list of fields
	*/
	var ObjectInput = exports.ObjectInput = function (_Widget) {
	    _inherits(ObjectInput, _Widget);

	    function ObjectInput() {
	        _classCallCheck(this, ObjectInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectInput).apply(this, arguments));
	    }

	    _createClass(ObjectInput, [{
	        key: 'renderObjectFields',
	        value: function renderObjectFields(wrapper, fields) {
	            var allowedFields = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	            // Objects need to be ordered on output, we create a list to
	            // order them by, then render each in that order
	            var orderedFields = [];

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(fields)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    if (allowedFields) {
	                        if (!Object.keys(allowedFields).includes(key)) {
	                            continue;
	                        }
	                    }

	                    var field = fields[key];
	                    orderedFields.push([field.getSortOrder(), key]);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            orderedFields.sort(function (a, b) {
	                return a[0] - b[0];
	            });

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = orderedFields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var fieldOrderKey = _step2.value;

	                    var _fieldOrderKey = _slicedToArray(fieldOrderKey, 2);

	                    var order = _fieldOrderKey[0];
	                    var _key = _fieldOrderKey[1];

	                    var renderedField = fields[_key].render();
	                    wrapper.appendChild(renderedField);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }

	        /**
	        * Render the object input fields
	        */

	    }, {
	        key: 'renderObject',
	        value: function renderObject(fields) {
	            // Create a fragment for our widget
	            var widgetFragment = document.createDocumentFragment();

	            var wrapper = this.renderWrapper();

	            // Check if we are rendering into fieldsets or just
	            // are regular object
	            if (this.options.fieldsets) {
	                var fieldsetIndex = 0;
	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;

	                try {
	                    for (var _iterator3 = this.options.fieldsets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var fieldset = _step3.value;

	                        var fieldsetElement = document.createElement('fieldset');
	                        fieldsetElement.classList.add('pug-fieldset');
	                        fieldsetElement.setAttribute('name', this.name + '-fieldset-' + fieldsetIndex);

	                        if (fieldset.hasOwnProperty('options')) {
	                            if (fieldset.options.hasOwnProperty('class') && fieldset.options.class) {

	                                if (fieldset.options.class.includes(' ')) {
	                                    var classes = fieldset.options.class.split(' ');
	                                    var _iteratorNormalCompletion4 = true;
	                                    var _didIteratorError4 = false;
	                                    var _iteratorError4 = undefined;

	                                    try {
	                                        for (var _iterator4 = classes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                                            var className = _step4.value;

	                                            fieldsetElement.classList.add(className);
	                                        }
	                                    } catch (err) {
	                                        _didIteratorError4 = true;
	                                        _iteratorError4 = err;
	                                    } finally {
	                                        try {
	                                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                                _iterator4.return();
	                                            }
	                                        } finally {
	                                            if (_didIteratorError4) {
	                                                throw _iteratorError4;
	                                            }
	                                        }
	                                    }
	                                } else {
	                                    fieldsetElement.classList.add(fieldset.options.class);
	                                }
	                            }
	                        }

	                        this.renderObjectFields(fieldsetElement, fields, fieldset.fields);
	                        wrapper.appendChild(fieldsetElement);

	                        fieldsetIndex++;
	                    }
	                } catch (err) {
	                    _didIteratorError3 = true;
	                    _iteratorError3 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                            _iterator3.return();
	                        }
	                    } finally {
	                        if (_didIteratorError3) {
	                            throw _iteratorError3;
	                        }
	                    }
	                }
	            } else {
	                this.renderObjectFields(wrapper, fields);
	            }

	            widgetFragment.appendChild(wrapper);

	            return widgetFragment;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            throw new Error('ObjectInput must render as a object - use renderObject');
	        }
	    }, {
	        key: 'renderLabel',
	        value: function renderLabel() {
	            throw new Error('ObjectInput does not support a label!');
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-object';
	        }
	    }]);

	    return ObjectInput;
	}(_core.Widget);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    pug - fields/text.js
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StringField = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(4);

	var _text = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StringField = exports.StringField = function (_Field) {
	    _inherits(StringField, _Field);

	    function StringField() {
	        _classCallCheck(this, StringField);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(StringField).apply(this, arguments));
	    }

	    _createClass(StringField, [{
	        key: 'getWidget',
	        value: function getWidget() {
	            return _text.TextInput;
	        }
	    }]);

	    return StringField;
	}(_core.Field);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file HTML Radio widget
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RadioInput = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _choice2 = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* RadioInput - Standard HTML radio input
	* @class
	*/
	var RadioInput = exports.RadioInput = function (_BaseChoiceWidget) {
	    _inherits(RadioInput, _BaseChoiceWidget);

	    /**
	    *
	    */
	    function RadioInput(field, type, id, name, label, attribs, options, value) {
	        _classCallCheck(this, RadioInput);

	        // Booleans do not have choices, so we must contrive
	        // them if they aren't already set
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RadioInput).call(this, field, type, id, name, label, attribs, options, value));

	        if (_this.type == 'boolean') {
	            if (options.hasOwnProperty('choices')) {
	                _this.choices = options.choices;
	            } else {
	                _this.choices = [[true, 'Yes'], [false, 'No']];
	            }
	        }
	        return _this;
	    }

	    /**
	    * Render the radio input field
	    */


	    _createClass(RadioInput, [{
	        key: 'renderField',
	        value: function renderField() {
	            var _this2 = this;

	            var radioInputListWrapper = document.createElement('div');
	            var index = 0;
	            var choices = [];

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var choice = _step.value;

	                    var _choice = _slicedToArray(choice, 2);

	                    var value = _choice[0];
	                    var label = _choice[1];

	                    var fieldId = this.name + '_' + index;

	                    var radioInputWrapper = document.createElement('div');
	                    radioInputWrapper.setAttribute('class', 'pug-field-radio-item');

	                    var radioInput = document.createElement('input');
	                    radioInput.setAttribute('id', fieldId);
	                    radioInput.setAttribute('type', 'radio');
	                    radioInput.setAttribute('name', this.name);
	                    radioInput.setAttribute('value', value);
	                    radioInput.setAttribute('class', this.getFieldClass());

	                    // Radio buttons may be used to drive UI events, if a
	                    // callback is specified, bind it to the elements as
	                    // they are being created.
	                    if (this.options.hasOwnProperty('callback')) {
	                        radioInput.onclick = function () {
	                            return _this2.options.callback(_this2);
	                        };
	                    }

	                    if (this.attribs) {
	                        for (var attrib in this.attribs) {
	                            radioInput.setAttribute(attrib, this.attribs[attrib]);
	                        }
	                    }

	                    if (this.value == value) {
	                        radioInput.setAttribute('checked', 'checked');
	                    }

	                    var radioInputLabel = document.createElement('label');
	                    radioInputLabel.setAttribute('for', fieldId);
	                    radioInputLabel.textContent = this.formatLabel(label);

	                    radioInputWrapper.appendChild(radioInput);
	                    radioInputWrapper.appendChild(radioInputLabel);

	                    radioInputListWrapper.appendChild(radioInputWrapper);

	                    index++;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return radioInputListWrapper;
	        }

	        /**
	        * Get the value of the item. Radio buttons require an overide as
	        * there are multiple elements on the page, we must attempt to get
	        * the selected one
	        */

	    }, {
	        key: 'getRadioValue',
	        value: function getRadioValue() {
	            var selectedElement = this.getElementWrapper().querySelector('.pug-field:checked');

	            if (!selectedElement) {
	                return null;
	            }

	            return this.value = selectedElement.value;
	        }
	    }, {
	        key: 'getValue',
	        value: function getValue() {
	            return this.getRadioValue();
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-radio';
	        }
	    }]);

	    return RadioInput;
	}(_choice2.BaseChoiceWidget);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file Date input widget
	* @copyright Bought By Many 2016
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateSelectionInput = exports.DateInput = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* DateInput - Input for date
	* @class
	* @namespace Widgets
	*/
	var DateInput = exports.DateInput = function (_Widget) {
	    _inherits(DateInput, _Widget);

	    function DateInput() {
	        _classCallCheck(this, DateInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(DateInput).apply(this, arguments));
	    }

	    _createClass(DateInput, [{
	        key: 'renderField',


	        /**
	        * Render the date input field
	        * @returns {HTMLElement} render the input widget
	        */
	        value: function renderField() {
	            var dateInput = document.createElement('input');
	            dateInput.setAttribute('name', this.name);
	            dateInput.setAttribute('type', 'date');
	            dateInput.setAttribute('value', this.value ? this.value : '');
	            dateInput.setAttribute('class', this.getFieldClass());

	            if (this.options.hasOwnProperty('min')) {
	                if (this.options.min == 'now') {
	                    var today = new Date();
	                    dateInput.setAttribute('min', today.toISOString().slice(0, -14));
	                } else {
	                    dateInput.setAttribute('min', this.options.min);
	                }
	            }

	            for (var attrib in this.attribs) {
	                dateInput.setAttribute(attrib, this.attribs[attrib]);
	            }

	            return dateInput;
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-date';
	        }
	    }]);

	    return DateInput;
	}(_core.Widget);

	/**
	* DateSelectionInput - Selection Input for date
	* @class
	* @namespace Widgets
	*/


	var DateSelectionInput = exports.DateSelectionInput = function (_Widget2) {
	    _inherits(DateSelectionInput, _Widget2);

	    function DateSelectionInput() {
	        _classCallCheck(this, DateSelectionInput);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(DateSelectionInput).apply(this, arguments));
	    }

	    _createClass(DateSelectionInput, [{
	        key: 'renderField',


	        /**
	        * Render the date input field
	        * @returns {HTMLElement} render the input widget
	        */
	        value: function renderField() {
	            var dateWrapper = document.createElement('div');
	            dateWrapper.setAttribute('class', 'pug-date-selector');

	            // Value store
	            var dateInput = document.createElement('input');
	            dateInput.setAttribute('name', this.name);
	            dateInput.setAttribute('type', 'hidden');
	            dateInput.setAttribute('value', this.value ? this.value : '');
	            dateWrapper.appendChild(dateInput);

	            // Pickers
	            var dayInput = document.createElement('select');
	            dayInput.setAttribute('name', this.name + '-day');

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Array.from(Array(31).keys())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var index = _step.value;

	                    var day = index + 1;
	                    var dayNumberOption = document.createElement('option');
	                    dayNumberOption.setAttribute('value', day);
	                    dayNumberOption.textContent = day;
	                    dayInput.appendChild(dayNumberOption);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            dateWrapper.appendChild(dayInput);

	            var monthInput = document.createElement('select');
	            monthInput.setAttribute('name', this.name + '-month');

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.getMonthNames()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var month = _step2.value;

	                    var monthNameOption = document.createElement('option');
	                    monthNameOption.setAttribute('value', month);
	                    monthNameOption.textContent = month;
	                    monthInput.appendChild(monthNameOption);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            dateWrapper.appendChild(monthInput);

	            var yearInput = document.createElement('select');
	            yearInput.setAttribute('name', this.name + '-year');

	            var currentYear = new Date().getFullYear();
	            var thisYear = currentYear;
	            var maxYears = 20;

	            if (this.options.hasOwnProperty('years')) {
	                maxYears = this.options.years;
	            }

	            while (thisYear > currentYear - maxYears) {
	                var yearOption = document.createElement('option');
	                yearOption.setAttribute('value', thisYear);
	                yearOption.textContent = thisYear;
	                yearInput.appendChild(yearOption);
	                thisYear--;
	            }

	            dateWrapper.appendChild(yearInput);

	            return dateWrapper;
	        }

	        /**
	        * Get the class name for the widget element
	        */

	    }, {
	        key: 'getFieldClass',
	        value: function getFieldClass() {
	            return 'pug-field pug-field-date-selector';
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'getElementDay',
	        value: function getElementDay() {
	            return this.getElementWrapper().querySelector('[name="' + this.name + '-day"]');
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'getElementMonth',
	        value: function getElementMonth() {
	            return this.getElementWrapper().querySelector('[name="' + this.name + '-month"]');
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'getElementYear',
	        value: function getElementYear() {
	            return this.getElementWrapper().querySelector('[name="' + this.name + '-year"]');
	        }

	        /**
	        *
	        */

	    }, {
	        key: 'getMonthNames',
	        value: function getMonthNames() {
	            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	        }

	        /**
	        * Get the value of an element on the stage. This is the raw value
	        * as specified in the HTML.
	        * @returns {string} value of the element on the stage
	        */

	    }, {
	        key: 'getDateValue',
	        value: function getDateValue() {
	            var elementDay = this.getElementDay();
	            var elementMonth = this.getElementMonth();
	            var elementYear = this.getElementYear();

	            if (!elementDay || !elementMonth || !elementYear) {
	                throw new Error('Unable to get element for date!');
	            }

	            var value = elementYear.value + '-' + elementMonth.value + '-' + elementDay.value;

	            // Attempt to validate the bloody thing
	            var timestamp = Date.parse(value);

	            if (isNaN(timestamp)) {
	                return this.value = null;
	            }

	            var dateValue = new Date(timestamp);

	            return this.value = dateValue;
	        }

	        /**
	        * Set the value of an element on the stage.
	        * @param {string} value - value to set the HTML element too
	        */

	    }, {
	        key: 'setDateValue',
	        value: function setDateValue(value) {
	            // If its a string, try to parse
	            if (typeof value === 'string') {
	                var timestamp = Date.parse(value);

	                if (isNaN(timestamp)) {
	                    // Don't set invalid dates
	                    return;
	                }

	                value = new Date(timestamp);
	            }

	            this.value = value;

	            var elementDay = this.getElementDay();
	            var elementMonth = this.getElementMonth();
	            var elementYear = this.getElementYear();
	            var months = this.getMonthNames();

	            if (elementDay && elementMonth && elementYear) {
	                elementDay.value = this.value.getDate();
	                elementMonth.value = months[this.value.getMonth() - 1];
	                elementYear.value = this.value.getFullYear();
	            }
	        }

	        /**
	        * Get the value of an element on the stage. This is the raw value
	        * as specified in the HTML.
	        * @returns {string} value of the element on the stage
	        */

	    }, {
	        key: 'getValue',
	        value: function getValue() {
	            return this.getDateValue();
	        }

	        /**
	        * Set the value of an element on the stage.
	        * @param {string} value - value to set the HTML element too
	        */

	    }, {
	        key: 'setValue',
	        value: function setValue(value) {
	            this.setDateValue(value);
	        }
	    }]);

	    return DateSelectionInput;
	}(_core.Widget);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(4);

	Object.defineProperty(exports, 'Field', {
	  enumerable: true,
	  get: function get() {
	    return _core.Field;
	  }
	});

	var _array = __webpack_require__(3);

	Object.defineProperty(exports, 'ArrayField', {
	  enumerable: true,
	  get: function get() {
	    return _array.ArrayField;
	  }
	});

	var _boolean = __webpack_require__(9);

	Object.defineProperty(exports, 'BooleanField', {
	  enumerable: true,
	  get: function get() {
	    return _boolean.BooleanField;
	  }
	});

	var _choice = __webpack_require__(11);

	Object.defineProperty(exports, 'ChoiceField', {
	  enumerable: true,
	  get: function get() {
	    return _choice.ChoiceField;
	  }
	});

	var _integer = __webpack_require__(14);

	Object.defineProperty(exports, 'IntegerField', {
	  enumerable: true,
	  get: function get() {
	    return _integer.IntegerField;
	  }
	});

	var _object = __webpack_require__(16);

	Object.defineProperty(exports, 'ObjectField', {
	  enumerable: true,
	  get: function get() {
	    return _object.ObjectField;
	  }
	});

	var _text = __webpack_require__(18);

	Object.defineProperty(exports, 'StringField', {
	  enumerable: true,
	  get: function get() {
	    return _text.StringField;
	  }
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(6);

	Object.defineProperty(exports, 'Widget', {
	  enumerable: true,
	  get: function get() {
	    return _core.Widget;
	  }
	});

	var _array = __webpack_require__(8);

	Object.defineProperty(exports, 'ArrayInput', {
	  enumerable: true,
	  get: function get() {
	    return _array.ArrayInput;
	  }
	});

	var _checkbox = __webpack_require__(10);

	Object.defineProperty(exports, 'CheckboxInput', {
	  enumerable: true,
	  get: function get() {
	    return _checkbox.CheckboxInput;
	  }
	});

	var _choice = __webpack_require__(13);

	Object.defineProperty(exports, 'BaseChoiceWidget', {
	  enumerable: true,
	  get: function get() {
	    return _choice.BaseChoiceWidget;
	  }
	});

	var _date = __webpack_require__(20);

	Object.defineProperty(exports, 'DateInput', {
	  enumerable: true,
	  get: function get() {
	    return _date.DateInput;
	  }
	});
	Object.defineProperty(exports, 'DateSelectionInput', {
	  enumerable: true,
	  get: function get() {
	    return _date.DateSelectionInput;
	  }
	});

	var _numbers = __webpack_require__(15);

	Object.defineProperty(exports, 'NumberInput', {
	  enumerable: true,
	  get: function get() {
	    return _numbers.NumberInput;
	  }
	});

	var _object = __webpack_require__(17);

	Object.defineProperty(exports, 'ObjectInput', {
	  enumerable: true,
	  get: function get() {
	    return _object.ObjectInput;
	  }
	});

	var _radio = __webpack_require__(19);

	Object.defineProperty(exports, 'RadioInput', {
	  enumerable: true,
	  get: function get() {
	    return _radio.RadioInput;
	  }
	});

	var _select = __webpack_require__(12);

	Object.defineProperty(exports, 'SelectInput', {
	  enumerable: true,
	  get: function get() {
	    return _select.SelectInput;
	  }
	});

	var _text = __webpack_require__(5);

	Object.defineProperty(exports, 'TextInput', {
	  enumerable: true,
	  get: function get() {
	    return _text.TextInput;
	  }
	});
	Object.defineProperty(exports, 'TextAreaInput', {
	  enumerable: true,
	  get: function get() {
	    return _text.TextAreaInput;
	  }
	});
	Object.defineProperty(exports, 'EmailInput', {
	  enumerable: true,
	  get: function get() {
	    return _text.EmailInput;
	  }
	});
	Object.defineProperty(exports, 'HiddenInput', {
	  enumerable: true,
	  get: function get() {
	    return _text.HiddenInput;
	  }
	});
	Object.defineProperty(exports, 'PasswordInput', {
	  enumerable: true,
	  get: function get() {
	    return _text.PasswordInput;
	  }
	});
	Object.defineProperty(exports, 'DisplayWidget', {
	  enumerable: true,
	  get: function get() {
	    return _text.DisplayWidget;
	  }
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(7);

	Object.defineProperty(exports, 'Validator', {
	  enumerable: true,
	  get: function get() {
	    return _core.Validator;
	  }
	});
	Object.defineProperty(exports, 'RequiredValidator', {
	  enumerable: true,
	  get: function get() {
	    return _core.RequiredValidator;
	  }
	});
	Object.defineProperty(exports, 'BooleanRequiredValidator', {
	  enumerable: true,
	  get: function get() {
	    return _core.BooleanRequiredValidator;
	  }
	});
	Object.defineProperty(exports, 'LengthValidator', {
	  enumerable: true,
	  get: function get() {
	    return _core.LengthValidator;
	  }
	});
	Object.defineProperty(exports, 'IntegerValidator', {
	  enumerable: true,
	  get: function get() {
	    return _core.IntegerValidator;
	  }
	});

/***/ }
/******/ ]);