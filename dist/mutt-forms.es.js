function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @file Core Validators
*/

/**
* Base Validation Interface
* @class
*/
var Validator = function () {
    function Validator(messages) {
        _classCallCheck(this, Validator);

        this.error = null;
        this.messages = {
            required: 'This field is required.'
        };

        Object.assign(this.messages, messages);
    }

    Validator.prototype.validate = function validate(value) {
        return true;
    };

    return Validator;
}();

/**
* RequiredValidator - Validate the existance of a value
* @class
*/
var RequiredValidator = function (_Validator) {
    _inherits(RequiredValidator, _Validator);

    function RequiredValidator() {
        _classCallCheck(this, RequiredValidator);

        return _possibleConstructorReturn(this, _Validator.apply(this, arguments));
    }

    RequiredValidator.prototype.validate = function validate(value) {
        if (!value && value !== 0) {
            this.error = this.messages.required;
            return false;
        }

        return true;
    };

    return RequiredValidator;
}(Validator);

/**
* BooleanRequiredValidator - Validate the existance of a value
* @class
*/
var BooleanRequiredValidator = function (_Validator2) {
    _inherits(BooleanRequiredValidator, _Validator2);

    function BooleanRequiredValidator() {
        _classCallCheck(this, BooleanRequiredValidator);

        return _possibleConstructorReturn(this, _Validator2.apply(this, arguments));
    }

    BooleanRequiredValidator.prototype.validate = function validate(value) {
        if (!(value === true || value === false)) {
            this.error = this.messages.required;
            return false;
        }

        return true;
    };

    return BooleanRequiredValidator;
}(Validator);

/**
* BooleanTrueValidator - Validate the existance of a true value
* @class
*/
var BooleanTrueValidator = function (_Validator3) {
    _inherits(BooleanTrueValidator, _Validator3);

    function BooleanTrueValidator() {
        _classCallCheck(this, BooleanTrueValidator);

        return _possibleConstructorReturn(this, _Validator3.apply(this, arguments));
    }

    BooleanTrueValidator.prototype.validate = function validate(value) {
        if (value !== true) {
            this.error = this.messages.required;
            return false;
        }

        return true;
    };

    return BooleanTrueValidator;
}(Validator);

/**
* LengthValidator - Validate the length of a string
* @class
*/
var LengthValidator = function (_Validator4) {
    _inherits(LengthValidator, _Validator4);

    function LengthValidator(_ref) {
        var _ref$min = _ref.min,
            min = _ref$min === undefined ? null : _ref$min,
            _ref$max = _ref.max,
            max = _ref$max === undefined ? null : _ref$max,
            _ref$messages = _ref.messages,
            messages = _ref$messages === undefined ? null : _ref$messages;

        _classCallCheck(this, LengthValidator);

        var _this4 = _possibleConstructorReturn(this, _Validator4.call(this, messages));

        _this4.min = min;
        _this4.max = max;

        if (!_this4.messages.hasOwnProperty('minLength')) {
            _this4.messages.minLength = 'Length must be at least ' + _this4.min + '!';
        }

        if (!_this4.messages.hasOwnProperty('maxLength')) {
            _this4.messages.maxLength = 'Length must be no more than ' + _this4.max + '!';
        }
        return _this4;
    }

    LengthValidator.prototype.validate = function validate(value) {
        if (!value) {
            this.error = this.messages.required;
            return false;
        }

        if (this.min && value.length < this.min) {
            this.error = this.messages.minLength;
            return false;
        }

        if (this.max && value.length > this.max) {
            this.error = this.messages.maxLength;
            return false;
        }

        return true;
    };

    return LengthValidator;
}(Validator);

/**
* IntegerValidator - Validate the integer is of a correct type
* @class
*/
var IntegerValidator = function (_Validator5) {
    _inherits(IntegerValidator, _Validator5);

    function IntegerValidator(messages) {
        _classCallCheck(this, IntegerValidator);

        var _this5 = _possibleConstructorReturn(this, _Validator5.call(this, messages));

        if (!_this5.messages.hasOwnProperty('intRequired')) {
            _this5.messages.intRequired = 'Value must be an integer';
        }
        return _this5;
    }

    IntegerValidator.prototype.validate = function validate(value) {
        // NOTE: We only check it's an integer IF we
        // have a value.
        if (value && isNaN(value)) {
            this.error = this.messages.intRequired;
            return false;
        }

        return true;
    };

    return IntegerValidator;
}(Validator);

/**
* RegexValidator - Validate the value against a regular expression
* @class
*/
var RegexValidator = function (_Validator6) {
    _inherits(RegexValidator, _Validator6);

    function RegexValidator(pattern, messages) {
        _classCallCheck(this, RegexValidator);

        var _this6 = _possibleConstructorReturn(this, _Validator6.call(this, messages));

        _this6.pattern = pattern;

        if (!_this6.messages.hasOwnProperty('invalidPattern')) {
            var msg = 'Value must match the pattern: ' + _this6.pattern;
            _this6.messages.invalidPattern = msg;
        }
        return _this6;
    }

    RegexValidator.prototype.validate = function validate(value) {
        if (!value) {
            this.error = this.messages.required;
            return false;
        }

        if (!value.match(this.pattern)) {
            this.error = this.messages.invalidPattern;
            return false;
        }

        return true;
    };

    return RegexValidator;
}(Validator);

/**
 * @file Main Core Field class
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base Field class, this is used as a base interface for
 * all other Fields
 * @class
 */
var Field = function () {
    /**
     * Initialise the field - this will initalise the assocaited widget
     * @param {string} id the ID of the field
     * @param {string} name the HTML name of the field
     * @param {string} [label] the HTML label linked ot the field
     * @param {mixed} [initial] the initial value for the field
     * @param {Widget} [widget] widget class to use when rendering field
     * @param {array} [validators] List of validators to use when
     *                             validating field
     * @param {object} [attribs] HTML attributes for the field
     * @param {string} [description] Help text for the field
     * @param {object} [options] rendering options for the field
     * @param {integer} [order] order flag for sorting multiple fields
     * @param {Field} [parent] parent a parent field
     */
    function Field(_ref) {
        var id = _ref.id,
            name = _ref.name,
            _ref$label = _ref.label,
            label = _ref$label === undefined ? null : _ref$label,
            _ref$initial = _ref.initial,
            initial = _ref$initial === undefined ? null : _ref$initial,
            _ref$widget = _ref.widget,
            widget = _ref$widget === undefined ? null : _ref$widget,
            _ref$validators = _ref.validators,
            validators = _ref$validators === undefined ? [] : _ref$validators,
            _ref$attribs = _ref.attribs,
            attribs = _ref$attribs === undefined ? {} : _ref$attribs,
            _ref$description = _ref.description,
            description = _ref$description === undefined ? null : _ref$description,
            _ref$options = _ref.options,
            options = _ref$options === undefined ? {} : _ref$options,
            _ref$order = _ref.order,
            order = _ref$order === undefined ? null : _ref$order,
            _ref$parent = _ref.parent,
            parent = _ref$parent === undefined ? null : _ref$parent;

        _classCallCheck$1(this, Field);

        this.id = id;
        this.name = name;
        this.label = label;
        this.description = description;
        this.attribs = attribs;
        this.options = options;
        this.validators = validators;
        this.sortOrder = order;
        this.locked = false;
        this.parent = parent;

        if (!this.label) {
            this.label = this.name;
        }

        this.initOptions();

        // Setup the widget
        var WidgetKlass = this.getWidget();

        if (widget) {
            WidgetKlass = widget;
        }

        this.widget = new WidgetKlass(this, this.type, this.id, this.name, this.label, this.attribs, this.options, initial);

        this._errors = [];
    }

    /**
     * Enable the options on the field
     */


    Field.prototype.initOptions = function initOptions() {
        if (this.options.hasOwnProperty('order')) {
            this.sortOrder = this.options.order;
        }
        if (this.options.hasOwnProperty('label')) {
            this.label = this.options.label;
        }
        if (this.options.hasOwnProperty('description')) {
            this.description = this.options.description;
        }
    };

    /**
     * Property - get/set the type (typically set can not be called
     * but is included for subclasses who may use this)
     */


    /**
    * Render the form field using it's widget interface
    * @returns {DocumentFragment} rendered HTML widget
    */
    Field.prototype.render = function render() {
        return this.widget.render();
    };

    /**
    * Destroy the rendered widget
    * @returns the success or failure response
    */


    Field.prototype.destroy = function destroy() {
        return this.widget.destroy();
    };

    /**
     * Callback to the field after it has been rendered to
     * the stage
    */


    Field.prototype.postRender = function postRender() {
        this.widget.postRender();
    };

    /**
     * Validate the form field
     */


    Field.prototype.validate = function validate() {
        // Clear any previous validations
        this.refreshValidationState();

        var value = this.value;
        for (var _iterator = this.validators, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref2 = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref2 = _i.value;
            }

            var validator = _ref2;

            if (!validator.validate(value)) {
                this.errors = validator.error;
                break;
            }
        }

        if (this.errors.length > 0) {
            this.widget.refreshErrorState(this.errors);
            return false;
        }

        return true;
    };

    /**
    * Turn the field from an editable elment to a readonly one
    */


    Field.prototype.lock = function lock() {
        if (this.locked) {
            return false;
        }

        this.widget.lock();
        this.locked = true;

        return true;
    };

    /*
    * Restore a field from a locked state
    */


    Field.prototype.unlock = function unlock() {
        if (!this.locked) {
            return false;
        }

        this.widget.unlock();
        this.locked = false;

        return true;
    };

    /**
    * Refresh the validation state
    */


    Field.prototype.refreshValidationState = function refreshValidationState() {
        var update = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this._errors = [];
        this.widget.errors = [];

        if (update) {
            this.widget.refreshErrorState([]);
        }
    };

    /**
    * Get the widget class used to render the field
    * @return TextInput widget
    */


    Field.prototype.getWidget = function getWidget() {
        return Mutt.config.getWidget('text');
    };

    /**
    * Get the sort order of the field. This is used when
    * rendering groups of fields.
    */


    Field.prototype.getSortOrder = function getSortOrder() {
        return this.sortOrder;
    };

    /**
     * Get the value in a serialized format.
     */


    Field.prototype.getSerializedValue = function getSerializedValue() {
        if (this.options.hasOwnProperty('serialize')) {
            var serializeArgs = this.options.serialize;
            var serializeKey = void 0;
            var serializeOptions = {};

            if ((typeof serializeArgs === 'undefined' ? 'undefined' : _typeof(serializeArgs)) === 'object') {
                serializeKey = serializeArgs.name;
                serializeOptions = serializeArgs;
            } else {
                serializeKey = serializeArgs;
            }

            if (Mutt.config.hasSerializer(serializeKey)) {
                var Serializer = Mutt.config.getSerializer(serializeKey);
                return new Serializer(this.value, serializeOptions).serialize();
            }
        } else {
            return this.value;
        }
    };

    /**
    * Set the internal sort order for a field.
    */


    Field.prototype.setSortOrder = function setSortOrder(order) {
        this.sortOrder = order;
    };

    /**
    * Display field as a string representation
    */


    Field.prototype.toString = function toString() {
        return 'Field <' + this.name + ' ' + this.type + '>';
    };

    /**
    *
    */


    Field.prototype.updateId = function updateId(newId) {
        var updateWidget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var oldId = this.id;
        this.id = newId;

        if (updateWidget) {
            this.widget.updateId(oldId, newId);
        }
    };

    /**
     *
     */


    Field.prototype.updateName = function updateName(newName) {
        var updateWidget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        this.name = newName;

        if (updateWidget) {
            this.widget.updateName(newName);
        }
    };

    /**
     *
     */


    Field.new = function _new(id, name, schema) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var parent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var required = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        var fieldSpec = {
            id: id,
            name: name,
            options: options,
            attribs: {},
            parent: parent
        };

        var FieldKlass = null;
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

            for (var _iterator2 = schema.enum, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref3 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref3 = _i2.value;
                }

                var option = _ref3;

                choices.push([option, option]);
            }

            fieldSpec.choices = choices;
            FieldKlass = Mutt.config.getField('enum');
        }

        // This is awkward as we are trying to support the
        // legacy/Alpaca option format
        if (options.hasOwnProperty('hidden')) {
            if (options.hidden) {
                fieldSpec.widget = Mutt.config.getWidget('hidden');
            }
        }

        if (schema.format) {
            if (Mutt.config.hasWidget(schema.format)) {
                fieldSpec.widget = Mutt.config.getWidget(schema.format);
            }
        }

        if (options.widget) {
            if (Mutt.config.hasWidget(options.widget)) {
                fieldSpec.widget = Mutt.config.getWidget(options.widget);
            }
        }

        if (schema.items) {
            fieldSpec.items = schema.items;
        }

        if (schema.properties) {
            fieldSpec.properties = schema.properties;
        }

        // Build validator list
        if (required || options.hasOwnProperty('required') && options.required) {
            if (schema.type === 'boolean') {
                validators.push(new BooleanRequiredValidator());
            } else {
                validators.push(new RequiredValidator());
            }

            fieldSpec.attribs.required = 'true';
        }

        // If the schema contains a required attribute this should be
        // a list of required descendants - not the item itself
        if (schema.required) {
            fieldSpec.required = schema.required;
        }

        if (options.validators) {
            validators.unshift.apply(validators, options.validators);
        }

        if (schema.hasOwnProperty('minItems')) {
            fieldSpec.minItems = schema.minItems;
        }

        if (schema.hasOwnProperty('maxItems')) {
            fieldSpec.maxItems = schema.maxItems;
        }

        fieldSpec.validators = validators;

        if (!FieldKlass) {
            // Attempt to get the field spec
            if (!Mutt.config.hasField(schema.type)) {
                return null;
            }

            FieldKlass = Mutt.config.getField(schema.type);
        }

        var field = new FieldKlass(fieldSpec);
        return field;
    };

    _createClass(Field, [{
        key: 'type',
        get: function get() {
            var type = this.constructor.name.toLowerCase();
            return type !== 'field' ? type.replace('field', '') : type;
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
    }]);

    return Field;
}();

/**
* @file Fieldset Interface
*/

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Fieldset wrapper class
* @class
*/
var Fieldset = function () {
    /**
    * Setup the fieldset class
    * @constructor
    * @param {string} label the label of the fieldset, typically
    * used for legends
    * @param {string} name the name of the fieldset
    */
    function Fieldset(_ref) {
        var _ref$label = _ref.label,
            label = _ref$label === undefined ? null : _ref$label,
            _ref$name = _ref.name,
            name = _ref$name === undefined ? null : _ref$name;

        _classCallCheck$2(this, Fieldset);

        this.name = name;
        this.label = label;
        this.fields = [];
        this.errors = {};
    }

    /**
    * Add a field to the fieldset
    * @param {field} field object to add to the fieldset
    */


    Fieldset.prototype.addField = function addField(field) {
        this.fields.push(field);
    };

    /**
    * Check if a fieldset contains a field
    * @param {string} fieldName A Field name
    */


    Fieldset.prototype.hasField = function hasField(fieldName) {
        for (var field in this.fields) {
            if (field.name === fieldName) {
                return true;
            }
        }

        return false;
    };

    /**
    * Get the data for the fieldset, this is returned as
    * an object with field -> value pairs
    * @returns {object}
    */


    Fieldset.prototype.data = function data() {
        var data = {};

        for (var _iterator = this.fields, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref2 = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref2 = _i.value;
            }

            var field = _ref2;

            data[field.name] = field.getSerializedValue();
        }

        return data;
    };

    /**
    * Populate the fieldset with selected values
    * @param {object} data Data object with form values
    */


    Fieldset.prototype.populate = function populate(data) {
        for (var _iterator2 = this.fields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref3 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref3 = _i2.value;
            }

            var field = _ref3;

            if (data.hasOwnProperty(field.name)) {
                field.value = data[field.name];
            }
        }
    };

    /**
    * Validate the fields in the fieldset. Stores an object
    * of error information field name -> error.
    * @returns {boolean}
    */


    Fieldset.prototype.validate = function validate() {
        var valid = true;

        for (var _iterator3 = this.fields, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref4 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref4 = _i3.value;
            }

            var field = _ref4;

            if (!field.validate()) {
                this.errors[field.name] = field.errors;
                valid = false;
            }
        }

        return valid;
    };

    /**
    * Set errors on the fields
    * @param {object} errors Object with error information
    */


    Fieldset.prototype.setFieldErrors = function setFieldErrors(errors) {
        for (var errorField in errors) {
            if (this.hasField(errorField)) {
                this.getField(errorField);
            }
        }
    };

    /**
    * Set the legend on the form
    * @param {string} legend text to be used for the fieldset legend
    */


    Fieldset.prototype.setLegend = function setLegend(legend) {
        this.label = legend;
    };

    /**
    * Refresh the validation state on all of the fields in the fieldset
    */


    Fieldset.prototype.refreshValidationState = function refreshValidationState() {
        this.errors = {};

        for (var _iterator4 = this.fields, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref5 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref5 = _i4.value;
            }

            var field = _ref5;

            field.refreshValidationState();
        }
    };

    /**
    * Render the fieldset and return a document fragment
    * @returns {HTMLFragment}
    */


    Fieldset.prototype.render = function render() {
        var fieldsetContainer = document.createDocumentFragment();
        var fieldset = document.createElement('fieldset');
        fieldset.classList.add('mutt-fieldset');

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

        for (var _iterator5 = this.fields, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref6 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref6 = _i5.value;
            }

            var field = _ref6;

            var fieldElement = field.render();
            fieldset.appendChild(fieldElement);
        }

        fieldsetContainer.appendChild(fieldset);

        return fieldsetContainer;
    };

    /**
    * Callback triggered after the element has been rendered to
    * the stage
    */


    Fieldset.prototype.postRender = function postRender() {
        for (var _iterator6 = this.fields, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
            var _ref7;

            if (_isArray6) {
                if (_i6 >= _iterator6.length) break;
                _ref7 = _iterator6[_i6++];
            } else {
                _i6 = _iterator6.next();
                if (_i6.done) break;
                _ref7 = _i6.value;
            }

            var field = _ref7;

            field.postRender();
        }
    };

    /**
    * Lock all of the fields in the fieldset
    */


    Fieldset.prototype.lock = function lock() {
        for (var _iterator7 = this.fields, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
            var _ref8;

            if (_isArray7) {
                if (_i7 >= _iterator7.length) break;
                _ref8 = _iterator7[_i7++];
            } else {
                _i7 = _iterator7.next();
                if (_i7.done) break;
                _ref8 = _i7.value;
            }

            var field = _ref8;

            field.lock();
        }
    };

    /**
    * Unlock all the fields in the fieldset
    */


    Fieldset.prototype.unlock = function unlock() {
        for (var _iterator8 = this.fields, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
            var _ref9;

            if (_isArray8) {
                if (_i8 >= _iterator8.length) break;
                _ref9 = _iterator8[_i8++];
            } else {
                _i8 = _iterator8.next();
                if (_i8.done) break;
                _ref9 = _i8.value;
            }

            var field = _ref9;

            field.unlock();
        }
    };

    /**
    * Get a field in the form by it's path. Paths should be
    * provided in 'dot' notation - i.e "some.example.path"
    * @params {string} path dot notation path to field to search for
    * @returns {Field} field returns a field class
    */


    Fieldset.prototype.getFieldByPath = function getFieldByPath(path) {
        var pathParts = path.split('.');
        var searchName = pathParts.shift();

        for (var _iterator9 = this.fields, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
            var _ref10;

            if (_isArray9) {
                if (_i9 >= _iterator9.length) break;
                _ref10 = _iterator9[_i9++];
            } else {
                _i9 = _iterator9.next();
                if (_i9.done) break;
                _ref10 = _i9.value;
            }

            var field = _ref10;

            if (field.name === searchName) {
                if (pathParts.length === 0) {
                    return field;
                } else if (field.constructor.prototype.hasOwnProperty('getFieldByPath')) {
                    return field.getFieldByPath(pathParts.join('.'));
                }
            }
        }

        return null;
    };

    /**
    * Create a new fieldset class from a JSON Schema
    * @staticmethod
    * @params {object} schema JSON schema for the fieldset spec
    * @params [object] options options for fields and the fieldset
    * @params [string] name of the fieldset(added as class)
    * @params [string] label optional label for the fieldset
    */


    Fieldset.new = function _new(schema) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var label = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        var fieldsetSpec = {
            name: name
        };

        if (schema.hasOwnProperty('title')) {
            fieldsetSpec.label = schema.title;
        }

        if (options.hasOwnProperty('form')) {
            if (options.form.hasOwnProperty('label')) {
                fieldsetSpec.label = options.form.label;
            }
        }

        if (label !== null) {
            fieldsetSpec.label = label;
        }

        Object.assign(fieldsetSpec, options);

        if (schema.hasOwnProperty('properties')) {
            schema = schema.properties;
        }

        var fieldset = new Fieldset(fieldsetSpec);
        var fieldIndex = 1;

        for (var _iterator10 = Object.keys(schema), _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
            var _ref11;

            if (_isArray10) {
                if (_i10 >= _iterator10.length) break;
                _ref11 = _iterator10[_i10++];
            } else {
                _i10 = _iterator10.next();
                if (_i10.done) break;
                _ref11 = _i10.value;
            }

            var fieldName = _ref11;

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

            var field = Field.new(fieldId, fieldName, fieldSchema, fieldOptions);

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

        return fieldset;
    };

    return Fieldset;
}();

/**
 * @file A simple HTML form interface, with a squishy face.
 * @author Nick Snell <nick@boughtbymany.com>
 * @copyright Bought By Many 2017
 */

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Main Mutt form interface. This instance is used to build,
 * control & render the form
 * @class
 */

var MuttForm = function () {
    /**
     * Initialisation of a Mutt form
     * @constructor
     * @param {object} schema JSON Schema containing Form & Field Configuration
     * @param {object} [options={}] form configuration options
     */
    function MuttForm(schema) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck$3(this, MuttForm);

        this.schema = schema;
        this.options = {};
        this.callbacks = {};

        if (options && options.hasOwnProperty('form')) {
            this.options = options.form;
        }

        this.mount = false;
        this.multipart = false;
        this.id = null;
        this.locked = false;

        this.form = null;
        this.fieldsets = [];
        this.buttons = { submit: null

            // Build the form from the config
        };this.build(schema, options);
    }

    /**
     * Build the form fieldsets from the config. The default is
     * always to use one, however groups can be specified in the
     * from options
     * @param {object} schema JSON schema of form
     * @param {object} [options=null] options object for the form
     */


    MuttForm.prototype.build = function build(schema) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        // TODO: Allow build options override

        // If fieldsets is specfied in the form options we are
        // going to attempt to build multiple ones
        if (options.hasOwnProperty('fieldsets')) {
            var fieldsetIndex = 0;

            for (var _iterator = options.fieldsets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var fieldsetSpec = _ref;

                var fieldsetFields = null;
                var fieldsetLabel = null;

                if (fieldsetSpec.hasOwnProperty('fields')) {
                    fieldsetFields = fieldsetSpec.fields;
                }

                if (fieldsetSpec.hasOwnProperty('fieldsets')) {
                    options.fieldsets = fieldsetSpec.fieldsets;
                }

                if (fieldsetSpec.options && fieldsetSpec.options.hasOwnProperty('label')) {
                    fieldsetLabel = fieldsetSpec.options.label;
                }

                var fieldset = Fieldset.new(schema, options, fieldsetFields, 'mutt-fieldset-' + fieldsetIndex, fieldsetLabel);

                this.fieldsets.push(fieldset);
                fieldsetIndex++;
            }
        } else {
            var _fieldset = Fieldset.new(schema, options);

            this.fieldsets.push(_fieldset);
        }
    };

    /**
     * Get the data from the form - this can be returned as a list
     * of objects, each object being a fieldsets data set. Or, by
     * default, as a merged object of all the data
     * @param {bool} [asList] Boolean to indicate if a list of fieldset
     * data is required. Default is to return a merged object.
     * @returns {object} key/value data object for the form
     */


    MuttForm.prototype.data = function data() {
        var asList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (asList) {
            var _data = [];

            for (var _iterator2 = this.fieldsets, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var fieldset = _ref2;

                _data.push(fieldset.data());
            }

            return _data;
        }

        var data = {};

        for (var _iterator3 = this.fieldsets, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var _fieldset2 = _ref3;

            data = Object.assign(data, _fieldset2.data());
        }

        return data;
    };

    /**
     * Populate the form field with selected values
     * @param {object} data Data object with form values
     */


    MuttForm.prototype.populate = function populate(data) {
        for (var _iterator4 = this.fieldsets, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var fieldset = _ref4;

            fieldset.populate(data);
        }
    };

    /**
     * Render the form
     * @param {HTMLElement} mount Containing element for the Mutt Form
     * @returns {Promise} a promise to be resolved once rendering
     * is complete
     */


    MuttForm.prototype.render = function render(mount) {
        var _this = this;

        // Save the mount point...
        this.mount = mount;

        return new Promise(function (resolve, reject) {
            var formContainer = document.createDocumentFragment();
            _this.form = document.createElement('form');

            if (_this.id) {
                _this.form.setAttribute('id', _this.id);
            }

            _this.form.setAttribute('method', 'POST');
            _this.form.setAttribute('action', '');
            _this.form.setAttribute('class', 'mutt-form');

            if (_this.multipart) {
                _this.form.setAttribute('enctype', 'multipart/form-data');
            }

            for (var _iterator5 = _this.fieldsets, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i5++];
                } else {
                    _i5 = _iterator5.next();
                    if (_i5.done) break;
                    _ref5 = _i5.value;
                }

                var fieldset = _ref5;

                var fieldsetElement = fieldset.render();
                _this.form.appendChild(fieldsetElement);
            }

            // Add form controls
            var buttonClass = 'mutt-button';
            var buttonText = 'Submit';

            // Check for button overide options
            if (_this.options.hasOwnProperty('buttons')) {
                if (_this.options.buttons.hasOwnProperty('submit')) {
                    if (_this.options.buttons.submit.hasOwnProperty('class')) {
                        var submitClass = _this.options.buttons.submit.class;
                        buttonClass = buttonClass + ' ' + submitClass;
                    }

                    if (_this.options.buttons.submit.hasOwnProperty('text')) {
                        buttonText = _this.options.buttons.submit.text;
                    }
                }
            }

            var buttonWrapper = document.createElement('div');
            buttonWrapper.setAttribute('class', 'mutt-button-wrapper');

            // Add any aditional buttons specified in the options
            if (_this.options.hasOwnProperty('buttons')) {
                for (var _iterator6 = Object.keys(_this.options.buttons), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
                    var _ref6;

                    if (_isArray6) {
                        if (_i6 >= _iterator6.length) break;
                        _ref6 = _iterator6[_i6++];
                    } else {
                        _i6 = _iterator6.next();
                        if (_i6.done) break;
                        _ref6 = _i6.value;
                    }

                    var buttonName = _ref6;

                    if (buttonName === 'submit') {
                        // We always default this
                        continue;
                    }

                    var buttonSpec = _this.options.buttons[buttonName];

                    // Setup a new button
                    var button = document.createElement('button');
                    button.setAttribute('name', buttonName);
                    button.setAttribute('class', buttonSpec.class);
                    button.setAttribute('type', 'button');
                    button.textContent = buttonSpec.text;
                    button.onclick = buttonSpec.callback;

                    _this.buttons[buttonName] = button;

                    buttonWrapper.appendChild(button);
                }
            }

            var submitButton = document.createElement('button');
            submitButton.setAttribute('class', buttonClass);
            submitButton.setAttribute('type', 'submit');
            submitButton.textContent = buttonText;
            submitButton.onclick = function (e) {
                _this.submit(e);
                return false;
            };

            _this.buttons.submit = submitButton;
            buttonWrapper.appendChild(submitButton);

            _this.form.appendChild(buttonWrapper);

            // Build the form and render to the viewport
            formContainer.appendChild(_this.form);
            _this.mount.appendChild(formContainer);

            // Form has been renderd to the stage, call
            // the post render hooks
            for (var _iterator7 = _this.fieldsets, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
                var _ref7;

                if (_isArray7) {
                    if (_i7 >= _iterator7.length) break;
                    _ref7 = _iterator7[_i7++];
                } else {
                    _i7 = _iterator7.next();
                    if (_i7.done) break;
                    _ref7 = _i7.value;
                }

                var _fieldset3 = _ref7;

                _fieldset3.postRender();
            }

            resolve(_this);
        });
    };

    /**
     * Remove the form from the stage
     * @returns {bool} Confirmation of destruction
     */


    MuttForm.prototype.destroy = function destroy() {
        if (this.mount) {
            var form = this.mount.querySelector('form');
            this.mount.removeChild(form);
            return true;
        }

        return false;
    };

    /**
     * Validate the form
     * @returns {bool} response to the validation request
     */


    MuttForm.prototype.validate = function validate() {
        var valid = true;
        var errors = [];

        for (var _iterator8 = this.fieldsets, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
            var _ref8;

            if (_isArray8) {
                if (_i8 >= _iterator8.length) break;
                _ref8 = _iterator8[_i8++];
            } else {
                _i8 = _iterator8.next();
                if (_i8.done) break;
                _ref8 = _i8.value;
            }

            var fieldset = _ref8;

            if (!fieldset.validate()) {
                errors.push(fieldset.errors);
                valid = false;
            }
        }

        Mutt.logger('Validation -> Status ' + valid + ' -> ' + JSON.stringify(errors));

        return valid;
    };

    /**
     * Redraw all of the error states on the stage
     */


    MuttForm.prototype.refreshValidationState = function refreshValidationState() {
        for (var _iterator9 = this.fieldsets, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
            var _ref9;

            if (_isArray9) {
                if (_i9 >= _iterator9.length) break;
                _ref9 = _iterator9[_i9++];
            } else {
                _i9 = _iterator9.next();
                if (_i9.done) break;
                _ref9 = _i9.value;
            }

            var fieldset = _ref9;

            fieldset.refreshValidationState();
        }
    };

    /**
     * Submit handler for the form
     * @param {Event} event Event triggering the submission
     * @returns {bool} success or failure of submission
     */


    MuttForm.prototype.submit = function submit(event) {
        // We always validate prior to validateion
        var valid = false;

        try {
            valid = this.validate();
        } catch (e) {
            Mutt.logger('Unable to validate prior to submit!', e);
            return false;
        }

        if (valid) {
            Mutt.logger('Submit form');

            if (this.callbacks.hasOwnProperty('submit')) {
                this.callbacks['submit'](this.data(), event);
            } else {
                this.form.submit();
            }

            return true;
        }

        return false;
    };

    /**
     * Lock a form, this changes all of the fields to a read only state
     */


    MuttForm.prototype.lock = function lock() {
        Mutt.logger('Locking form');

        for (var _iterator10 = this.fieldsets, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
            var _ref10;

            if (_isArray10) {
                if (_i10 >= _iterator10.length) break;
                _ref10 = _iterator10[_i10++];
            } else {
                _i10 = _iterator10.next();
                if (_i10.done) break;
                _ref10 = _i10.value;
            }

            var fieldset = _ref10;

            fieldset.lock();
        }
    };

    /**
     * Unlock a form, this can be used to restore a locked form to it's
     * editable state
     */


    MuttForm.prototype.unlock = function unlock() {
        Mutt.log('Unlocking form');

        for (var _iterator11 = this.fieldsets, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
            var _ref11;

            if (_isArray11) {
                if (_i11 >= _iterator11.length) break;
                _ref11 = _iterator11[_i11++];
            } else {
                _i11 = _iterator11.next();
                if (_i11.done) break;
                _ref11 = _i11.value;
            }

            var fieldset = _ref11;

            fieldset.unlock();
        }
    };

    /**
     * Set the callback for the submission
     * @param {function} callback Callback function for form submission
     */


    MuttForm.prototype.on = function on(hook, callback) {
        this.callbacks[hook] = callback;
        return this;
    };

    /**
     * Set the ID for the form - this is used for rendering
     * @param {string} formId ID for a form
     */


    MuttForm.prototype.setFormId = function setFormId(formId) {
        this.id = formId;
    };

    /**
     * Get the form ID
     * @returns {string} ID for a form
     */


    MuttForm.prototype.getFormId = function getFormId() {
        return this.id;
    };

    /**
     * Set field errors in bulk, this is typically used to
     * show errors from a server side response
     * @param {object} errors a hash of errors
     */


    MuttForm.prototype.setFieldErrors = function setFieldErrors(errors) {
        // TODO: Known limitation. Errors are not provided
        // in a hierarchical manner. Just as key/value - so
        // duplicate keys scoped by parent objects are not
        // supported. Errors are added to both fields in this
        // instance.
        for (var _iterator12 = this.fieldsets, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
            var _ref12;

            if (_isArray12) {
                if (_i12 >= _iterator12.length) break;
                _ref12 = _iterator12[_i12++];
            } else {
                _i12 = _iterator12.next();
                if (_i12.done) break;
                _ref12 = _i12.value;
            }

            var fieldset = _ref12;

            fieldset.setFieldErrors(errors);
        }
    };

    /**
     * Get a field in the form by it's path. Paths should be
     * provided in 'dot' notation - i.e "some.example.path"
     * @param {string} path path to the field using dot notation
     */


    MuttForm.prototype.getFieldByPath = function getFieldByPath(path) {
        // To find a field we need to inspect each fieldset
        for (var _iterator13 = this.fieldsets, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
            var _ref13;

            if (_isArray13) {
                if (_i13 >= _iterator13.length) break;
                _ref13 = _iterator13[_i13++];
            } else {
                _i13 = _iterator13.next();
                if (_i13.done) break;
                _ref13 = _i13.value;
            }

            var fieldset = _ref13;

            var field = fieldset.getFieldByPath(path);

            if (field) {
                return field;
            }
        }
    };

    return MuttForm;
}();

/**
 * @file Array field
 */

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Array is a complex field type, which is essentially a list
 * of other fields.
 * @class
 */
var ArrayField = function (_Field) {
    _inherits$1(ArrayField, _Field);

    /**
    *
    */
    function ArrayField(_ref) {
        var id = _ref.id,
            name = _ref.name,
            _ref$label = _ref.label,
            label = _ref$label === undefined ? null : _ref$label,
            _ref$initial = _ref.initial,
            initial = _ref$initial === undefined ? null : _ref$initial,
            _ref$widget = _ref.widget,
            widget = _ref$widget === undefined ? null : _ref$widget,
            _ref$validators = _ref.validators,
            validators = _ref$validators === undefined ? [] : _ref$validators,
            _ref$attribs = _ref.attribs,
            attribs = _ref$attribs === undefined ? {} : _ref$attribs,
            _ref$description = _ref.description,
            description = _ref$description === undefined ? null : _ref$description,
            _ref$options = _ref.options,
            options = _ref$options === undefined ? {} : _ref$options,
            _ref$order = _ref.order,
            order = _ref$order === undefined ? null : _ref$order,
            _ref$parent = _ref.parent,
            parent = _ref$parent === undefined ? null : _ref$parent,
            _ref$items = _ref.items,
            items = _ref$items === undefined ? {} : _ref$items,
            _ref$minItems = _ref.minItems,
            minItems = _ref$minItems === undefined ? 1 : _ref$minItems,
            _ref$maxItems = _ref.maxItems,
            maxItems = _ref$maxItems === undefined ? null : _ref$maxItems;

        _classCallCheck$4(this, ArrayField);

        var _this = _possibleConstructorReturn$1(this, _Field.call(this, {
            id: id,
            name: name,
            label: label,
            initial: initial,
            widget: widget,
            validators: validators,
            attribs: attribs,
            description: description,
            options: options,
            order: order,
            parent: parent
        }));

        _this.minItems = minItems;
        _this.maxItems = maxItems >= minItems ? maxItems : null;
        _this.itemSchema = items; // schema to make new items
        _this.itemOptions = options;

        // We store the array fields as slots
        _this.slots = [];
        var buildPlaceholders = true;

        if (_this.options.hasOwnProperty('disablePlaceholders')) {
            buildPlaceholders = !_this.options.disablePlaceholders;
        }

        // We may want to suppress the placeholder slots from
        // being added by default
        if (buildPlaceholders) {
            for (var i in Array.from(Array(_this.minItems).keys())) {
                // eslint-disable-line
                _this.addSlot(false);
            }
        }

        _this.validators.push(new LengthValidator({
            min: _this.minItems,
            max: _this.maxItems
        }));

        // Store errors as an object
        _this._errors = [];
        return _this;
    }

    /**
     * Add a new slot to the array field
     * @param [updateWidget] Update the widget attached to the field
     */


    ArrayField.prototype.addSlot = function addSlot() {
        var updateWidget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var position = this.slots.length + 1;
        var fieldId = this.getSlotId(position);
        var fieldName = this.getSlotName(position);

        // FIXME: This is a workaround, really should
        // get the correct option structure to this class
        var fieldOptions = Object.assign({
            order: position
        }, this.itemOptions);

        var field = this.constructor.new(fieldId, fieldName, this.itemSchema, fieldOptions, this // parent
        );

        this.slots.push(field);

        // FIXME: This shouldn't be at this level
        if (updateWidget && this.widget.hasOwnProperty('addSlot')) {
            this.widget.addSlot(field);
        }
    };

    /**
    * Remove slot
    * @param [updateWidget] Update the widget attached to the field
    * @returns {bool} success of the removal of a slot
    */


    ArrayField.prototype.removeSlot = function removeSlot() {
        var updateWidget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this.slots.length === 0) {
            return false;
        }

        this.slots.pop();

        if (updateWidget && this.widget.hasOwnProperty('removeSlot')) {
            this.widget.removeSlot();
        }

        return true;
    };

    /**
    * Remove a slot from inside the slot array
    * @param index Index of slot to remove from array
    * @param [updateWidget] Update the widget attached to the field
    * @returns {bool} success of the removal of a slot
    */


    ArrayField.prototype.spliceSlot = function spliceSlot(index) {
        var updateWidget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (this.slots.length === 0) {
            return false;
        }

        for (var slotIndex in this.slots) {
            // ??
            slotIndex = parseInt(slotIndex);

            if (updateWidget && slotIndex === index) {
                this.slots[slotIndex].destroy();
            }
        }

        this.slots.splice(index, 1);

        for (var _slotIndex in this.slots) {
            var position = parseInt(_slotIndex) + 1;
            var newId = this.getSlotId(position);
            var newName = this.getSlotName(position);
            var slot = this.slots[_slotIndex];

            slot.updateId(newId, updateWidget);
            slot.updateName(newName, updateWidget);
        }

        return true;
    };

    /**
    *
    */


    ArrayField.prototype.getSlotId = function getSlotId(index) {
        return this.id + '_item_' + index;
    };

    /**
    *
    */


    ArrayField.prototype.getSlotName = function getSlotName(index) {
        return this.name + '_' + index;
    };

    /**
    * Property - get/set value
    */


    /**
     * Get the value in a serialized format.
     */
    ArrayField.prototype.getSerializedValue = function getSerializedValue() {
        if (this.options.hasOwnProperty('serialize')) {
            var serializeArgs = this.options.serialize;
            var serializeKey = void 0;
            var serializeOptions = {};

            if ((typeof serializeArgs === 'undefined' ? 'undefined' : _typeof$1(serializeArgs)) === 'object') {
                serializeKey = serializeArgs.name;
                serializeOptions = serializeArgs;
            } else {
                serializeKey = serializeArgs;
            }

            if (Mutt.config.hasSerializer(serializeKey)) {
                var Serializer = Mutt.config.getSerializer(serializeKey);
                return new Serializer(this.value, serializeOptions).serialize();
            }
        } else {
            var valueArray = [];

            for (var _iterator = this.slots, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref2 = _i.value;
                }

                var slot = _ref2;

                valueArray.push(slot.getSerializedValue());
            }

            return valueArray;
        }
    };

    /**
    * Validate the form field
    * @returns {bool} returns sucess or failure of validation
    */


    ArrayField.prototype.validate = function validate() {
        this.refreshValidationState();

        if (this.validators.length > 0) {
            for (var _iterator2 = this.validators, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref3 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref3 = _i2.value;
                }

                var validator = _ref3;

                if (!validator.validate(this.value)) {
                    this.errors = validator.error;
                }
            }
        }

        if (this.errors.length > 0) {
            this.widget.refreshErrorState(this.errors);
            return false;
        }

        var valid = true;

        for (var _iterator3 = this.slots, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref4 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref4 = _i3.value;
            }

            var field = _ref4;

            if (!field.validate()) {
                valid = false;
            }
        }

        return valid;
    };

    /**
    * Refresh the validation state
    */


    ArrayField.prototype.refreshValidationState = function refreshValidationState() {
        _Field.prototype.refreshValidationState.call(this);
        this._errors = [];
    };

    /**
    * Triggers post render call on all fields in array
    */


    ArrayField.prototype.postRender = function postRender() {
        for (var _iterator4 = this.slots, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref5 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref5 = _i4.value;
            }

            var field = _ref5;

            field.postRender();
        }
    };

    /**
    *
    */


    ArrayField.prototype.getWidget = function getWidget() {
        return Mutt.config.getWidget('array');
    };

    /**
    *
    */


    ArrayField.prototype.render = function render() {
        return this.widget.renderList(this.slots);
    };

    /**
    *
    */


    ArrayField.prototype.getFieldByPath = function getFieldByPath(path) {
        var pathParts = path.split('.');

        // It's expected that the search name is an integer as
        // it should be an index to an field in the array
        var searchIndex = parseInt(pathParts.shift());

        if (isNaN(searchIndex)) {
            return null;
        } else if (searchIndex > this.slots.length) {
            return null;
        }

        var field = this.slots[searchIndex];

        if (pathParts.length === 0) {
            return field;
        }

        if (field.constructor.prototype.hasOwnProperty('getFieldByPath')) {
            return field.getFieldByPath(pathParts.join('.'));
        }

        return null;
    };

    _createClass$1(ArrayField, [{
        key: 'value',
        get: function get() {
            var valueArray = [];

            for (var _iterator5 = this.slots, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref6;

                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref6 = _iterator5[_i5++];
                } else {
                    _i5 = _iterator5.next();
                    if (_i5.done) break;
                    _ref6 = _i5.value;
                }

                var slot = _ref6;

                valueArray.push(slot.value);
            }

            return valueArray;
        },
        set: function set(value) {
            if (!Array.isArray(value)) {
                throw new Error('Unable to set array field value(s) from non-array!');
            }

            //
            // NOTE: This is a bit of a gotcha
            // If the current array value is the same as the proposed value
            // we just map each value in. If there is a larger proposed value
            // we must add new slots to map into, if it's smaller, we need to
            // trim the slots.
            //
            if (value.length > this.slots.length) {
                var difference = value.length - this.slots.length;
                for (var _iterator6 = Array(difference).keys(), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
                    var _ref7;

                    if (_isArray6) {
                        if (_i6 >= _iterator6.length) break;
                        _ref7 = _iterator6[_i6++];
                    } else {
                        _i6 = _iterator6.next();
                        if (_i6.done) break;
                        _ref7 = _i6.value;
                    }
                    // eslint-disable-line
                    this.addSlot();
                }
            } else if (value.length < this.slots.length) {
                this.slots = this.slots.slice(0, value.length);
            }

            var fieldValueMap = this.slots.map(function (field, index) {
                return [field, value[index]];
            });

            for (var _iterator7 = fieldValueMap, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
                var _ref9;

                if (_isArray7) {
                    if (_i7 >= _iterator7.length) break;
                    _ref9 = _iterator7[_i7++];
                } else {
                    _i7 = _iterator7.next();
                    if (_i7.done) break;
                    _ref9 = _i7.value;
                }

                var _ref8 = _ref9;
                var field = _ref8[0];
                var _value = _ref8[1];

                field.value = _value;
            }
        }
    }]);

    return ArrayField;
}(Field);

/**
 * @file Button Field
 */

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Button field, used to add custom actions to form elements
 * @class
 */
var ButtonField = function (_Field) {
  _inherits$2(ButtonField, _Field);

  function ButtonField() {
    _classCallCheck$5(this, ButtonField);

    return _possibleConstructorReturn$2(this, _Field.apply(this, arguments));
  }

  /**
   * Get the widget for the field
   * @returns {Widget}
   */
  ButtonField.prototype.getWidget = function getWidget() {
    return Mutt.config.getWidget('button');
  };

  return ButtonField;
}(Field);

/**
 * @file Boolean Field
 */

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function toBool(value) {
    if (value === undefined || value === null) {
        return null;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    switch (value.toLowerCase().trim()) {
        case 'true':
        case 'yes':
        case '1':
            return true;

        case 'false':
        case 'no':
        case '0':
        case null:
            return false;

        default:
            return Boolean(value);
    }
}

/**
 * Boolean field, used to capture true/false inputs
 * @class
 */
var BooleanField = function (_Field) {
    _inherits$3(BooleanField, _Field);

    function BooleanField() {
        _classCallCheck$6(this, BooleanField);

        return _possibleConstructorReturn$3(this, _Field.apply(this, arguments));
    }

    /**
    * Get the widget for the field
    * @returns {Widget}
    */
    BooleanField.prototype.getWidget = function getWidget() {
        return Mutt.config.getWidget('checkbox');
    };

    _createClass$2(BooleanField, [{
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
}(Field);

/**
 * @file Choice Field
 */

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Choice Field, used as a base to capture inputs from
 * a range of values
 * @class
 */
var ChoiceField = function (_Field) {
    _inherits$4(ChoiceField, _Field);

    function ChoiceField(_ref) {
        var id = _ref.id,
            name = _ref.name,
            _ref$label = _ref.label,
            label = _ref$label === undefined ? null : _ref$label,
            _ref$initial = _ref.initial,
            initial = _ref$initial === undefined ? null : _ref$initial,
            _ref$widget = _ref.widget,
            widget = _ref$widget === undefined ? null : _ref$widget,
            _ref$validators = _ref.validators,
            validators = _ref$validators === undefined ? [] : _ref$validators,
            _ref$attribs = _ref.attribs,
            attribs = _ref$attribs === undefined ? {} : _ref$attribs,
            _ref$description = _ref.description,
            description = _ref$description === undefined ? null : _ref$description,
            _ref$options = _ref.options,
            options = _ref$options === undefined ? {} : _ref$options,
            _ref$order = _ref.order,
            order = _ref$order === undefined ? null : _ref$order,
            _ref$parent = _ref.parent,
            parent = _ref$parent === undefined ? null : _ref$parent,
            _ref$choices = _ref.choices,
            choices = _ref$choices === undefined ? [] : _ref$choices;

        _classCallCheck$7(this, ChoiceField);

        var _this = _possibleConstructorReturn$4(this, _Field.call(this, {
            id: id,
            name: name,
            label: label,
            initial: initial,
            widget: widget,
            validators: validators,
            attribs: attribs,
            description: description,
            options: options,
            order: order,
            parent: parent
        }));

        _this.choices = choices;

        if (options.hasOwnProperty('choices')) {
            _this.choices = options.choices;
        }

        if (_this.widget.hasOwnProperty('setChoices')) {
            _this.widget.setChoices(_this.choices);
        }
        return _this;
    }

    /**
    * Get the widget used to display the field
    * @returns {SelectInput} widget to display
    */


    ChoiceField.prototype.getWidget = function getWidget() {
        if (this.options.hasOwnProperty('widget') && this.options.widget === 'checkboxlist') {
            return Mutt.config.getWidget('checkboxlist');
        } else {
            return Mutt.config.getWidget('select');
        }
    };

    return ChoiceField;
}(Field);

/**
* @file Integer Field
*/

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Integer Field, used to input integer values
* @class
*/
var IntegerField = function (_Field) {
    _inherits$5(IntegerField, _Field);

    function IntegerField(_ref) {
        var id = _ref.id,
            name = _ref.name,
            _ref$label = _ref.label,
            label = _ref$label === undefined ? null : _ref$label,
            _ref$initial = _ref.initial,
            initial = _ref$initial === undefined ? null : _ref$initial,
            _ref$widget = _ref.widget,
            widget = _ref$widget === undefined ? null : _ref$widget,
            _ref$validators = _ref.validators,
            validators = _ref$validators === undefined ? [] : _ref$validators,
            _ref$attribs = _ref.attribs,
            attribs = _ref$attribs === undefined ? {} : _ref$attribs,
            _ref$description = _ref.description,
            description = _ref$description === undefined ? null : _ref$description,
            _ref$options = _ref.options,
            options = _ref$options === undefined ? {} : _ref$options,
            _ref$order = _ref.order,
            order = _ref$order === undefined ? null : _ref$order,
            _ref$parent = _ref.parent,
            parent = _ref$parent === undefined ? null : _ref$parent;

        _classCallCheck$8(this, IntegerField);

        // Always append an integer validator
        var _this = _possibleConstructorReturn$5(this, _Field.call(this, {
            id: id,
            name: name,
            label: label,
            initial: initial,
            widget: widget,
            validators: validators,
            attribs: attribs,
            description: description,
            options: options,
            order: order,
            parent: parent
        }));

        _this.validators.push(new IntegerValidator());
        return _this;
    }

    /**
    * Property - get/set value
    */


    /**
    *
    */
    IntegerField.prototype.getWidget = function getWidget() {
        return Mutt.config.getWidget('number');
    };

    _createClass$3(IntegerField, [{
        key: 'value',
        get: function get() {
            var value = this.widget.getValue();

            // Widgets deal with the HTML value, which
            // can not represent an integer. Coerce to
            // the expected type
            if (!value && value !== 0) {
                return '';
            }

            return parseInt(value);
        },
        set: function set(value) {
            this.widget.setValue(value);
        }
    }]);

    return IntegerField;
}(Field);

/**
 * @file Object Field
 */

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: An object is basically a fieldset within a fieldset,
// we are repeating a bunch of functionality from the fieldset
// here. This should be refactored.

/**
 * Object Field
 * @class
 */
var ObjectField = function (_Field) {
    _inherits$6(ObjectField, _Field);

    function ObjectField(_ref) {
        var id = _ref.id,
            name = _ref.name,
            _ref$label = _ref.label,
            label = _ref$label === undefined ? null : _ref$label,
            _ref$initial = _ref.initial,
            initial = _ref$initial === undefined ? null : _ref$initial,
            _ref$widget = _ref.widget,
            widget = _ref$widget === undefined ? null : _ref$widget,
            _ref$validators = _ref.validators,
            validators = _ref$validators === undefined ? [] : _ref$validators,
            _ref$attribs = _ref.attribs,
            attribs = _ref$attribs === undefined ? {} : _ref$attribs,
            _ref$description = _ref.description,
            description = _ref$description === undefined ? null : _ref$description,
            _ref$options = _ref.options,
            options = _ref$options === undefined ? {} : _ref$options,
            _ref$order = _ref.order,
            order = _ref$order === undefined ? null : _ref$order,
            _ref$parent = _ref.parent,
            parent = _ref$parent === undefined ? null : _ref$parent,
            _ref$properties = _ref.properties,
            properties = _ref$properties === undefined ? {} : _ref$properties,
            _ref$required = _ref.required,
            required = _ref$required === undefined ? [] : _ref$required;

        _classCallCheck$9(this, ObjectField);

        var _this = _possibleConstructorReturn$6(this, _Field.call(this, {
            id: id,
            name: name,
            label: label,
            initial: initial,
            widget: widget,
            validators: validators,
            attribs: attribs,
            description: description,
            options: options,
            order: order,
            parent: parent
        }));

        _this.object = {};
        var fieldIndex = 1;

        for (var _iterator = Object.keys(properties), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref2 = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref2 = _i.value;
            }

            var fieldName = _ref2;

            var fieldId = name + '_' + fieldName;
            var fieldOptions = {};
            var fieldRequired = false;

            if (_this.options.hasOwnProperty(fieldName)) {
                fieldOptions = options[fieldName];
            }

            // Check if the field is required
            if (required.length > 0) {
                if (required.indexOf(fieldName) !== -1) {
                    fieldRequired = true;
                }
            }

            var field = _this.constructor.new(fieldId, fieldName, properties[fieldName], fieldOptions, _this, // parent
            fieldRequired);

            if (!field) {
                throw new Error('Unable to create Field on ObjectField!');
            }

            if (!field.getSortOrder()) {
                field.setSortOrder(fieldIndex);
            }

            _this.object[fieldName] = field;
            fieldIndex++;
        }

        // Store errors as an object
        _this._errors = {};
        return _this;
    }

    /**
     * Get the value in a serialized format.
     */
    ObjectField.prototype.getSerializedValue = function getSerializedValue() {
        if (this.options.hasOwnProperty('serialize')) {
            var serializeArgs = this.options.serialize;
            var serializeKey = void 0;
            var serializeOptions = {};

            if ((typeof serializeArgs === 'undefined' ? 'undefined' : _typeof$2(serializeArgs)) === 'object') {
                serializeKey = serializeArgs.name;
                serializeOptions = serializeArgs;
            } else {
                serializeKey = serializeArgs;
            }

            if (Mutt.config.hasSerializer(serializeKey)) {
                var Serializer = Mutt.config.getSerializer(serializeKey);
                return new Serializer(this.value, serializeOptions).serialize();
            }
        } else {
            var values = {};

            for (var _iterator2 = Object.keys(this.object), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref3 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref3 = _i2.value;
                }

                var key = _ref3;

                values[key] = this.object[key].getSerializedValue();
            }

            return values;
        }
    };

    /**
    * Validate the form field
    */


    ObjectField.prototype.validate = function validate() {
        var valid = true;

        for (var _iterator3 = Object.keys(this.object), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref4 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref4 = _i3.value;
            }

            var key = _ref4;

            var field = this.object[key];
            if (!field.validate()) {
                this._errors[key] = field.errors;
                valid = false;
            }
        }

        return valid;
    };

    /**
    * Refresh the validation state
    */


    ObjectField.prototype.refreshValidationState = function refreshValidationState() {
        _Field.prototype.refreshValidationState.call(this);
        this._errors = {};
    };

    /**
    *
    */


    ObjectField.prototype.postRender = function postRender() {
        for (var _iterator4 = Object.keys(this.object), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref5 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref5 = _i4.value;
            }

            var key = _ref5;

            this.object[key].postRender();
        }
    };

    ObjectField.prototype.getWidget = function getWidget() {
        return Mutt.config.getWidget('object');
    };

    /**
    *
    */


    ObjectField.prototype.render = function render() {
        return this.widget.renderObject(this.object);
    };

    /**
    *
    */


    ObjectField.prototype.getFieldByPath = function getFieldByPath(path) {
        var pathParts = path.split('.');
        var searchName = pathParts.shift();

        for (var _iterator5 = Object.keys(this.object), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref6 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref6 = _i5.value;
            }

            var key = _ref6;

            var field = this.object[key];

            if (field.name === searchName) {
                if (pathParts.length === 0) {
                    return field;
                } else if (field.constructor.prototype.hasOwnProperty('getFieldByPath')) {
                    return field.getFieldByPath(pathParts.join('.'));
                }
            }
        }

        return null;
    };

    /**
    * Property - get/set errors
    * @param {string} Error string
    */


    _createClass$4(ObjectField, [{
        key: 'value',
        get: function get() {
            var values = {};

            for (var _iterator6 = Object.keys(this.object), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
                var _ref7;

                if (_isArray6) {
                    if (_i6 >= _iterator6.length) break;
                    _ref7 = _iterator6[_i6++];
                } else {
                    _i6 = _iterator6.next();
                    if (_i6.done) break;
                    _ref7 = _i6.value;
                }

                var key = _ref7;

                values[key] = this.object[key].value;
            }

            return values;
        },
        set: function set(values) {
            if (!values) {
                return;
            }

            // Wo ist mein Object.isObject()??
            if ((typeof values === 'undefined' ? 'undefined' : _typeof$2(values)) !== 'object') {
                throw new Error('Unable to set object field value(s) from non-object!');
            }

            for (var _iterator7 = Object.keys(values), _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
                var _ref8;

                if (_isArray7) {
                    if (_i7 >= _iterator7.length) break;
                    _ref8 = _iterator7[_i7++];
                } else {
                    _i7 = _iterator7.next();
                    if (_i7.done) break;
                    _ref8 = _i7.value;
                }

                var key = _ref8;

                // TODO: Should we warn/error if we set keys that aren't
                // in field object?
                if (this.object.hasOwnProperty(key)) {
                    this.object[key].value = values[key];
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
}(Field);

/**
 * @file Text Field
 */

function _classCallCheck$10(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * String Field, used to input text values
 * @class
 */
var StringField = function (_Field) {
  _inherits$7(StringField, _Field);

  function StringField() {
    _classCallCheck$10(this, StringField);

    return _possibleConstructorReturn$7(this, _Field.apply(this, arguments));
  }

  StringField.prototype.getWidget = function getWidget() {
    return Mutt.config.getWidget('text');
  };

  return StringField;
}(Field);

// Index of fields

var fields = /*#__PURE__*/Object.freeze({
    Field: Field,
    ArrayField: ArrayField,
    ButtonField: ButtonField,
    BooleanField: BooleanField,
    ChoiceField: ChoiceField,
    IntegerField: IntegerField,
    ObjectField: ObjectField,
    StringField: StringField
});

/**
 * @file Base widget interface
 */

/**
 * Base Widget interface
 * @class
 */

function _classCallCheck$11(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Widget = function () {
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
    function Widget(field, type, id, name, label) {
        var attribs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
        var initial = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

        _classCallCheck$11(this, Widget);

        this._field = field;
        this._rendered = false;
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


    Widget.prototype.render = function render() {
        // Create a fragment for our widget
        var widgetFragment = document.createDocumentFragment();

        var wrapper = this.renderWrapper();
        var label = this.renderLabel();
        var field = this.renderField();
        var help = this.renderHelp();
        var errors = this.renderErrors();

        if (label) {
            wrapper.appendChild(label);
        }

        wrapper.appendChild(field);

        if (help) {
            wrapper.appendChild(help);
        }

        if (errors) {
            wrapper.appendChild(errors);
        }

        widgetFragment.appendChild(wrapper);

        // Set the internal notification flag so
        // we know the field has now been rendered
        // to the stage
        this._rendered = true;

        return widgetFragment;
    };

    /**
    * Remove the widget from the stage
    * @returns true on success
    */


    Widget.prototype.destroy = function destroy() {
        var wrapper = this.getElementWrapper();
        wrapper.parentNode.removeChild(wrapper);
        return true;
    };

    /**
    * Callback to the widget after the widget has been rendered
    * to the stage
    * @returns by default, nothing is returned.
    */


    Widget.prototype.postRender = function postRender() {
        // Default is to do nothing...
        return;
    };

    /**
     * Lock the widget - this places it in a read only state
     * @returns {bool} returns true if lock is successful, false otherwise
     */


    Widget.prototype.lock = function lock() {
        if (this.locked) {
            return false;
        }

        var wrapper = this.getElementWrapper();
        var element = this.getElement();

        // Clear the existing field...
        wrapper.removeChild(element);

        this.locked = true;

        return true;
    };

    /**
     * Unlock the widget - this removes any previous lock and returns
     * it to it's default state.
     * @returns {bool} returns true if unlock is successful, false otherwise
     */


    Widget.prototype.unlock = function unlock() {
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
    };

    /**
     * Update the ID of the wrapper element
     */


    Widget.prototype.updateId = function updateId(oldId, newId) {
        // Pass the old ID to ensure we can fetch it as expected
        var wrapper = this.getElementWrapper(oldId);
        wrapper.id = newId;
        this.id = newId;
    };

    /**
     * Update the name of the element
     */


    Widget.prototype.updateName = function updateName(newName) {
        var element = this.getElement();
        element.name = newName;
        this.name = newName;
    };

    /**
    * Render the field HTML - intended to be overidden by a subclass
    * @throws an error will be thrown if not overridden
    */


    Widget.prototype.renderField = function renderField() {
        /* */
        throw new Error('renderField should be overidden by a widget subclass!');
    };

    /**
    * Render the field wrapper
    * @returns {HTMLElement} HTML element used for wrapping widget
    */


    Widget.prototype.renderWrapper = function renderWrapper() {
        var wrapper = document.createElement('div');
        wrapper.setAttribute('id', this.id);
        wrapper.className = this.getFieldWrapperClass();
        return wrapper;
    };

    /**
    * Render the field label
    * @returns {HTMLElement} returns a HTML label element or null if no
    * label is configured for the widget
    */


    Widget.prototype.renderLabel = function renderLabel() {
        if (this.label) {
            var label = document.createElement('label');
            label.setAttribute('for', this.getFieldId());
            label.setAttribute('class', 'mutt-label');
            label.textContent = this.label;
            return label;
        }

        return null;
    };

    /**
    * Render the help field
    * @returns {HTMLElement} returns a HTML span element or null if no
    * help text is configured for the widget
    */


    Widget.prototype.renderHelp = function renderHelp() {
        if (this.options.hasOwnProperty('help') && this.options.help) {
            var help = document.createElement('span');
            help.setAttribute('class', 'mutt-help');
            help.textContent = this.options.help;
            return help;
        }

        return null;
    };

    /**
    * Render the field error information
    * @returns {HTMLElement} returns a HTML list element with error
    * information of null if no errors are present
    */


    Widget.prototype.renderErrors = function renderErrors() {
        if (this.errors.length > 0) {
            var errorList = document.createElement('ul');
            errorList.className = this.getErrorClass();

            for (var _iterator = this.errors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var error = _ref;

                var errorItem = document.createElement('li');
                errorItem.textContent = error;
                errorList.appendChild(errorItem);
            }

            return errorList;
        }

        return null;
    };

    /**
    * Refresh the elements error state - this will remove any
    * existing error elements and re-add if there are still errors
    * on the field
    * @params {array} errors - a list of errors to be displayed
    */


    Widget.prototype.refreshErrorState = function refreshErrorState(errors) {
        this.errors = errors;

        if (!this._rendered) {
            return;
        }

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
    };

    /**
    * Get a handle on the elements wrapper on the stage
    * @params [string] id optional id overide to search DOM
    * @return {HTMLElement} the element's wrapper on the stage
    */


    Widget.prototype.getElementWrapper = function getElementWrapper() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (!id) {
            id = this.id;
        }
        return document.querySelector('#' + id);
    };

    /**
    * Get a handle for the element on the stage
    * @return {HTMLElement} the element on the stage
    */


    Widget.prototype.getElement = function getElement() {
        return this.getElementWrapper().querySelector('.mutt-field');
    };

    /**
    * Get a handle for the element error information
    * @return {HTMLElement} the error element on the stage
    */


    Widget.prototype.getElementError = function getElementError() {
        return this.getElementWrapper().querySelector('.mutt-error');
    };

    /**
    * Get a handle for the elements label
    * @return {HTMLElement} the error element on the stage
    */


    Widget.prototype.getElementLabel = function getElementLabel() {
        return this.getElementWrapper().querySelector('.mutt-label');
    };

    /**
    * Get the value of an element on the stage. This is the raw value
    * as specified in the HTML.
    * @returns {string} value of the element on the stage
    */


    Widget.prototype.getValue = function getValue() {
        if (!this._rendered) {
            return this.value;
        }

        var element = this.getElement();

        if (!element) {
            throw new Error('Unable to get element!');
        }

        this.value = element.value;

        return this.value;
    };

    /**
    * Set the value of an element on the stage.
    * @param {string} value - value to set the HTML element too
    */


    Widget.prototype.setValue = function setValue(value) {
        this.value = value;

        if (!this._rendered) {
            return;
        }

        var element = this.getElement();

        if (element) {
            element.value = this.value;
        }
    };

    /**
    * Get the class name for the widget element
    * @returns {string} the class to use for the field element
    */


    Widget.prototype.getFieldClass = function getFieldClass() {
        if (this.attribs.hasOwnProperty('class')) {
            return 'mutt-field ' + this.attribs.class;
        }

        return 'mutt-field';
    };

    /**
    * Get the class name for the widget wrapper
    * @returns {string} the class to use for the wrapper element
    */


    Widget.prototype.getFieldWrapperClass = function getFieldWrapperClass() {
        return 'mutt-field-wrapper';
    };

    /**
    * Get the class name for the error
    * @returns {string} the class to use for the error element
    */


    Widget.prototype.getErrorClass = function getErrorClass() {
        return 'mutt-error';
    };

    /**
    * Get the class name for the error wrapper
    * @returns {string} the class to use for the error wrapper element
    */


    Widget.prototype.getErrorWrapperClass = function getErrorWrapperClass() {
        return 'mutt-error-wrapper';
    };

    /**
    * Get the field ID
    */


    Widget.prototype.getFieldId = function getFieldId() {
        return this.name;
    };

    return Widget;
}();

/**
 * @file Array Widgets
 */

function _classCallCheck$12(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ArrayInput - Render a list of fields
 * @class
 */
var ArrayInput = function (_Widget) {
    _inherits$8(ArrayInput, _Widget);

    function ArrayInput() {
        _classCallCheck$12(this, ArrayInput);

        return _possibleConstructorReturn$8(this, _Widget.apply(this, arguments));
    }

    /**
     * Render the list of input fields
     * @params {array} fields - a list of Field objects to render
     * @returns {HTMLElement} returns a HTML fragment containing
     * all rendered fields
     */
    ArrayInput.prototype.renderList = function renderList(fields) {
        // Create a fragment for our widget
        var widgetFragment = document.createDocumentFragment();

        var wrapper = this.renderWrapper();

        fields.sort(function (a, b) {
            return a.getSortOrder() - b.getSortOrder();
        });

        for (var _iterator = fields, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var field = _ref;

            var renderedField = field.render();
            wrapper.appendChild(renderedField);
        }

        widgetFragment.appendChild(wrapper);

        this._rendered = true;

        return widgetFragment;
    };

    /**
    * @throws render is not supported on Arrays - renderList must be used
    */


    ArrayInput.prototype.render = function render() {
        throw new Error('ArrayInput must render as a list - use renderList');
    };

    /**
    * @throws renderLabel is not supported on array fields
    */


    ArrayInput.prototype.renderLabel = function renderLabel() {
        throw new Error('ArrayInput does not support a label!');
    };

    /**
    * Get the class name for the widget element
    * @returns {string} the class to use for the field element
    */


    ArrayInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-array';
    };

    /**
    *
    */


    ArrayInput.prototype.getElement = function getElement() {
        throw new Error('Unable to get element on an array field!');
    };

    /**
    *
    */


    ArrayInput.prototype.getElementByIndex = function getElementByIndex(index) {
        return this.getElementWrapper().querySelector('#' + this.id + '_item_' + index);
    };

    /**
    *
    */


    ArrayInput.prototype.addSlot = function addSlot(field) {
        var renderedField = field.render();
        var wrapper = this.getElementWrapper();
        wrapper.appendChild(renderedField);
        field.postRender();
    };

    /**
    *
    */


    ArrayInput.prototype.removeSlot = function removeSlot() {
        var lastFieldIndex = this._field.slots.length;
        var lastField = this.getElementByIndex(lastFieldIndex);
        this.getElementWrapper().removeChild(lastField);
    };

    /**
    * Remove a slot by splicing from the array.
    * NOTE: Using this directly does NOT update other widgets,
    * this may be desired if for example you are using an ArrayField
    * where you want other slots to update their id automatically.
    * In this case use the ArrayField#spliceSlot()
    */


    ArrayInput.prototype.spliceSlot = function spliceSlot(fieldIndex) {
        var splicedField = this.getElementByIndex(fieldIndex);
        this.getElementWrapper().removeChild(splicedField);
    };

    return ArrayInput;
}(Widget);

/**
 * @file Button widget interface
 */

function _classCallCheck$13(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Button - Standard HTML Button
 * @class
 */
var ButtonWidget = function (_Widget) {
  _inherits$9(ButtonWidget, _Widget);

  function ButtonWidget() {
    _classCallCheck$13(this, ButtonWidget);

    return _possibleConstructorReturn$9(this, _Widget.apply(this, arguments));
  }

  /**
   * Render the button field
   * @returns {HTMLElement} render the button widget
   */
  ButtonWidget.prototype.renderField = function renderField() {
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', this.getFieldClass());

    for (var attrib in this.attribs) {
      button.setAttribute(attrib, this.attribs[attrib]);
    }

    return button;
  };

  /**
   * Get the class name for the widget element
   */


  ButtonWidget.prototype.getFieldClass = function getFieldClass() {
    return 'mutt-field mutt-field-button';
  };

  return ButtonWidget;
}(Widget);

/**
 * @file Checkbox Widgets
 */

function _classCallCheck$14(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$10(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$10(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CheckboxInput - Standard HTML checkbox
 * @class
 */
var CheckboxInput = function (_Widget) {
    _inherits$10(CheckboxInput, _Widget);

    function CheckboxInput() {
        _classCallCheck$14(this, CheckboxInput);

        return _possibleConstructorReturn$10(this, _Widget.apply(this, arguments));
    }

    /**
     * Render the text input field
     * @returns {HTMLElement} returns the rendered HTML checkbox
     * input field
     */
    CheckboxInput.prototype.renderField = function renderField() {
        var _this2 = this;

        var checkbox = document.createElement('input');
        checkbox.setAttribute('name', this.name);
        checkbox.setAttribute('id', this.getFieldId());
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', this.getFieldClass());
        checkbox.onchange = function () {
            _this2.setValue(!checkbox.hasAttribute('checked'));
        };

        if (this.value) {
            checkbox.setAttribute('checked', 'checked');
        }

        for (var attrib in this.attribs) {
            checkbox.setAttribute(attrib, this.attribs[attrib]);
        }

        // Set the internal notification flag so
        // we know the field has now been rendered
        // to the stage
        this._rendered = true;

        return checkbox;
    };

    /**
     * Get the value of an element on the stage. This is the raw value
     * as specified in the HTML.
     * @returns {string} value of the element on the stage
     */


    CheckboxInput.prototype.getValue = function getValue() {
        if (!this._rendered) {
            return this.value;
        }

        if (this.getElement().hasAttribute('checked')) {
            return true;
        }

        return false;
    };

    /**
     * Set the value of an element on the stage. This can be a true
     * of false value. Additionally this will also notify the label
     * as the label is often used as a styling proxy.
     * @param {boolean} value - turn the checkbox on/off
     */


    CheckboxInput.prototype.setValue = function setValue(value) {
        this.value = value;

        if (!this._rendered) {
            return;
        }

        var element = this.getElement();

        if (element) {
            var label = this.getElementLabel();

            if (this.value) {
                element.setAttribute('checked', 'checked');

                if (label) {
                    label.classList.add('mutt-field-checkbox-checked');
                }
            } else {
                element.removeAttribute('checked');

                if (label) {
                    label.classList.remove('mutt-field-checkbox-checked');
                }
            }
        }
    };

    /**
     * Get the class name for the widget element
     * @returns {string} the class to use for the field element
     */


    CheckboxInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-checkbox';
    };

    /**
     * Get the checkbox ID
     */


    CheckboxInput.prototype.getFieldId = function getFieldId() {
        return this.id + '-checkbox';
    };

    return CheckboxInput;
}(Widget);

/**
 * CheckboxList - A list of checkboxes
 * @class
 */
var CheckboxList = function (_CheckboxInput) {
    _inherits$10(CheckboxList, _CheckboxInput);

    function CheckboxList(field, type, id, name, label, attribs, options, value) {
        _classCallCheck$14(this, CheckboxList);

        var _this3 = _possibleConstructorReturn$10(this, _CheckboxInput.call(this, field, type, id, name, label, attribs, options, value));

        if (!_this3.value) {
            _this3.value = [];
        }
        return _this3;
    }

    /**
     * Render the list of checkboxes
     * @returns {HTMLElement} returns the rendered HTML checkbox list
     */


    CheckboxList.prototype.renderField = function renderField() {
        var _this4 = this;

        var list = document.createElement('ul');
        list.setAttribute('id', this.getFieldId());

        var _loop = function _loop(choice) {
            var listItem = document.createElement('li');
            var checkbox = document.createElement('input');

            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', _this4.name);
            checkbox.setAttribute('class', _this4.getFieldClass());
            checkbox.setAttribute('data-index', choice);
            checkbox.setAttribute('id', _this4.id + choice);

            if (_this4.options.hasOwnProperty('choices') && _this4.options['choices'][choice][1]) {
                var label = document.createElement('label');
                label.setAttribute('for', _this4.id + choice);
                label.textContent = _this4.options['choices'][choice][1];
                listItem.appendChild(label);
            }

            checkbox.onchange = function () {
                _this4.setValueByIndex(!checkbox.hasAttribute('checked'), checkbox.getAttribute('data-index'));
            };

            if (_this4.value && _this4.value[choice]) {
                checkbox.setAttribute('checked', 'checked');
            }

            for (var attrib in _this4.attribs) {
                checkbox.setAttribute(attrib, _this4.attribs[attrib]);
            }

            listItem.appendChild(checkbox);
            list.appendChild(listItem);
        };

        for (var choice in this.choices) {
            _loop(choice);
        }

        this._rendered = true;

        return list;
    };

    /**
     * Get a handle for the element on the stage
     * @params [integer] index of element list to search for
     * @return {HTMLElement} the element on the stage
     */


    CheckboxList.prototype.getValueByIndex = function getValueByIndex(index) {
        if (!this._rendered) {
            return this.value[index];
        }

        var element = this.getElementByIndex(index);

        if (!element) {
            throw new Error('Unable to get element!');
        }

        if (element.hasAttribute('checked')) {
            this.value = true;
        } else {
            this.value = false;
        }

        return this.value;
    };

    /**
     * Get the value of an element on the stage. This is the raw value
     * as specified in the HTML.
     * @returns {boolean|*|string} value of the element on the stage
     */


    CheckboxList.prototype.getValue = function getValue() {
        if (!this._rendered) {
            return this.value;
        }

        var elements = this.getAllElements();

        if (!elements) {
            throw new Error('Unable to get elements!');
        }

        for (var index in Array.from(elements)) {
            if (elements[index].hasAttribute('checked')) {
                this.value[index] = true;
            } else {
                this.value[index] = false;
            }
        }

        return this.value;
    };

    /**
     * Set the value of an element on the stage.
     * @param value [string|integer|boolean]
     * @param index [integer]
     */


    CheckboxList.prototype.setValueByIndex = function setValueByIndex(value, index) {
        this.value[index] = value;
        if (!this._rendered) {
            return;
        }

        var element = this.getElementByIndex(index);
        if (element) {
            if (this.value[index]) {
                element.setAttribute('checked', 'checked');
            } else {
                element.removeAttribute('checked');
            }
        }
    };

    /**
     * Set the value of all of the elements on the stage
     * @param value
     */


    CheckboxList.prototype.setValue = function setValue(value) {
        this.value = value;
        if (!this._rendered) {
            return;
        }

        var elements = this.getAllElements();
        if (value.length === elements.length) {
            elements[0].setAttribute('checked', 'checked');

            for (var index in Array.from(elements)) {
                if (this.value[index]) {
                    elements[parseInt(index)].setAttribute('checked', 'checked');
                } else {
                    elements[parseInt(index)].removeAttribute('checked');
                }
            }
        } else {
            throw new Error('Array Length does not match number of Elements in CheckboxList');
        }
    };

    /**
     * set the choices as class variables
     * @param choices
     */


    CheckboxList.prototype.setChoices = function setChoices(choices) {
        for (var index in choices) {
            if (this.value && typeof this.value[index] === 'undefined') {
                this.value[index] = false;
            }
        }

        this.choices = choices;
    };

    /**
     * returns the field ID
     * @returns {string}
     */


    CheckboxList.prototype.getFieldId = function getFieldId() {
        return this.id + '-checkbox';
    };

    /**
     * Gets all of this classes choices
     * @returns {*}
     */


    CheckboxList.prototype.getChoices = function getChoices() {
        return this.choices;
    };

    /**
     * Gets all relevant field elements on the stage
     * @returns {NodeList}
     */


    CheckboxList.prototype.getAllElements = function getAllElements() {
        return this.getElementWrapper().querySelectorAll('.mutt-field');
    };

    /**
     * Gets specific field by index from relevant field elements on stage
     * @param index
     * @returns {*}
     */


    CheckboxList.prototype.getElementByIndex = function getElementByIndex(index) {
        return this.getElementWrapper().querySelectorAll('.mutt-field')[index];
    };

    return CheckboxList;
}(CheckboxInput);

/**
 * @file Choice Widgets
 */

function _classCallCheck$15(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$11(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$11(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * BaseChoiceWidget - Abstract input for choice fields
 * @class
 * @abstract
 */
var BaseChoiceWidget = function (_Widget) {
    _inherits$11(BaseChoiceWidget, _Widget);

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
        _classCallCheck$15(this, BaseChoiceWidget);

        var _this = _possibleConstructorReturn$11(this, _Widget.call(this, field, type, id, name, label, attribs, options, value));

        _this.choices = [];
        return _this;
    }

    /**
    *
    * @params {array}
    */


    BaseChoiceWidget.prototype.setChoices = function setChoices(choices) {
        this.choices = choices;
    };

    /**
    * Get the choices used by the widget
    * @returns {array} choice pair array
    */


    BaseChoiceWidget.prototype.getChoices = function getChoices() {
        return this.choices;
    };

    /**
    * Format the label text for display as a choice
    * @returns {string} formated label
    */


    BaseChoiceWidget.prototype.formatLabel = function formatLabel(label) {
        if (label) {
            label = label.toLowerCase().replace('_', ' ');
            return '' + label.charAt(0).toUpperCase() + label.slice(1);
        }

        return label;
    };

    /**
    * @throws Unable to render the field, must be overidden by a subclass
    */


    BaseChoiceWidget.prototype.renderField = function renderField() {
        throw new Error('Unable to render abstract widget BaseChoiceInput!');
    };

    return BaseChoiceWidget;
}(Widget);

/**
 * @file Date input widget
 */

function _classCallCheck$16(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$12(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$12(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DateInput - Input for date
 * @class
 */
var DateInput = function (_Widget) {
    _inherits$12(DateInput, _Widget);

    function DateInput() {
        _classCallCheck$16(this, DateInput);

        return _possibleConstructorReturn$12(this, _Widget.apply(this, arguments));
    }

    /**
     * Render the date input field
     * @returns {HTMLElement} render the input widget
     */
    DateInput.prototype.renderField = function renderField() {
        var dateInput = document.createElement('input');
        dateInput.setAttribute('name', this.name);
        dateInput.setAttribute('type', 'date');
        dateInput.setAttribute('value', this.value ? this.value : '');
        dateInput.setAttribute('class', this.getFieldClass());

        if (this.options.hasOwnProperty('min')) {
            if (this.options.min === 'now') {
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
    };

    /**
     * Get the class name for the widget element
     */


    DateInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-date';
    };

    return DateInput;
}(Widget);

/**
 * DateSelectionInput - Selection Input for date
 * @class
 */
var DateSelectionInput = function (_Widget2) {
    _inherits$12(DateSelectionInput, _Widget2);

    /**
     * @constructor
     */
    function DateSelectionInput(field, type, id, name, label) {
        var attribs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
        var initial = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

        _classCallCheck$16(this, DateSelectionInput);

        var _this2 = _possibleConstructorReturn$12(this, _Widget2.call(this, field, type, id, name, label, attribs, options, null));
        // Don't set the initial value by default, we overide the
        // method to set it as a date object


        _this2.setDateValue(initial);
        return _this2;
    }

    /**
     * Render the date input field
     * @returns {HTMLElement} render the input widget
     */


    DateSelectionInput.prototype.renderField = function renderField() {
        var dateWrapper = document.createElement('div');
        dateWrapper.setAttribute('class', 'mutt-date-selector');

        var currentValue = this.getDateValue();

        // Value store
        var dateInput = document.createElement('input');
        dateInput.setAttribute('name', this.name);
        dateInput.setAttribute('type', 'hidden');
        dateInput.setAttribute('value', this.value ? this.value : '');
        dateWrapper.appendChild(dateInput);

        // Pickers
        var dayInput = document.createElement('select');
        dayInput.setAttribute('name', this.name + '-day');

        for (var _iterator = Array.from(Array(31).keys()), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var index = _ref;

            var day = index + 1;
            var dayNumberOption = document.createElement('option');
            dayNumberOption.setAttribute('value', ('0' + day).slice(-2));

            dayNumberOption.textContent = day;

            if (currentValue !== null && currentValue.getDate() === day) {
                dayNumberOption.selected = 'selected';
            }

            dayInput.appendChild(dayNumberOption);
        }

        dateWrapper.appendChild(dayInput);

        var monthInput = document.createElement('select');
        monthInput.setAttribute('name', this.name + '-month');

        var months = this.getMonthNames();
        for (var monthIndex in months) {
            var month = months[monthIndex];
            var monthNameOption = document.createElement('option');

            // Get the month number
            var monthNumber = parseInt(monthIndex) + 1;

            // Zero pad the number (Safari/iOS need the zero to
            // parse the date)
            monthNumber = ('0' + monthNumber).slice(-2);

            monthNameOption.setAttribute('value', monthNumber);
            monthNameOption.textContent = month;

            if (currentValue !== null && currentValue.getMonth() === parseInt(monthIndex)) {
                monthNameOption.selected = 'selected';
            }

            monthInput.appendChild(monthNameOption);
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

            if (currentValue !== null && currentValue.getFullYear() === thisYear) {
                yearOption.selected = 'selected';
            }

            yearInput.appendChild(yearOption);
            thisYear--;
        }

        dateWrapper.appendChild(yearInput);

        return dateWrapper;
    };

    /**
     * Get the class name for the widget element
     */


    DateSelectionInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-date-selector';
    };

    /**
     *
     */


    DateSelectionInput.prototype.getElementDay = function getElementDay() {
        return this.getElementWrapper().querySelector('[name="' + this.name + '-day"]');
    };

    /**
     *
     */


    DateSelectionInput.prototype.getElementMonth = function getElementMonth() {
        return this.getElementWrapper().querySelector('[name="' + this.name + '-month"]');
    };

    /**
     *
     */


    DateSelectionInput.prototype.getElementYear = function getElementYear() {
        return this.getElementWrapper().querySelector('[name="' + this.name + '-year"]');
    };

    /**
     *
     */


    DateSelectionInput.prototype.getMonthNames = function getMonthNames() {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    };

    /**
     * Get the value of an element on the stage. This is the raw value
     * as specified in the HTML.
     * @returns {string} value of the element on the stage
     */


    DateSelectionInput.prototype.getDateValue = function getDateValue() {
        if (!this._rendered) {
            return this.value;
        }

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
            this.value = null;
            return this.value;
        }

        var dateValue = new Date(timestamp);
        this.value = dateValue;

        return this.value;
    };

    /**
     * Set the value of an element on the stage.
     * @param {string} value - value to set the HTML element too
     */


    DateSelectionInput.prototype.setDateValue = function setDateValue(value) {
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

        if (!this._rendered) {
            return;
        }

        var elementDay = this.getElementDay();
        var elementMonth = this.getElementMonth();
        var elementYear = this.getElementYear();

        var date = value.getDate();
        if (date.toString().length === 1) {
            date = '0' + date;
        }

        var month = value.getMonth() + 1;
        if (month.toString().length === 1) {
            month = '0' + month;
        }

        if (elementDay && elementMonth && elementYear) {
            elementDay.value = date;
            elementMonth.value = month;
            elementYear.value = this.value.getFullYear();
        }
    };

    /**
     * Get the value of an element on the stage. This is the raw value
     * as specified in the HTML.
     * @returns {string} value of the element on the stage
     */


    DateSelectionInput.prototype.getValue = function getValue() {
        return this.getDateValue();
    };

    /**
     * Set the value of an element on the stage.
     * @param {string} value - value to set the HTML element too
     */


    DateSelectionInput.prototype.setValue = function setValue(value) {
        this.setDateValue(value);
    };

    return DateSelectionInput;
}(Widget);

/**
 * @file Number input widget
 */

function _classCallCheck$17(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$13(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$13(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * NumberInput - Standard HTML number input
 * @class
 */
var NumberInput = function (_Widget) {
    _inherits$13(NumberInput, _Widget);

    function NumberInput() {
        _classCallCheck$17(this, NumberInput);

        return _possibleConstructorReturn$13(this, _Widget.apply(this, arguments));
    }

    /**
     * Render the text input field
     */
    NumberInput.prototype.renderField = function renderField() {
        var textInput = document.createElement('input');
        textInput.setAttribute('name', this.name);
        textInput.setAttribute('type', 'number');
        textInput.setAttribute('inputmode', 'numeric');
        textInput.setAttribute('class', this.getFieldClass());
        textInput.setAttribute('value', this.value !== null ? this.value : '');

        // iOS doesn't fire the numerical keyboard for an type="number"
        // by default, adding the pattern forces the numerical keyboard
        // to be fired over the alpha one
        textInput.setAttribute('pattern', '[0-9]*');

        for (var attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib]);
        }

        return textInput;
    };

    /**
     * Get the class name for the widget element
     */


    NumberInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-number';
    };

    return NumberInput;
}(Widget);

/**
 * CurrencyInput
 * @class
 */
var CurrencyInput = function (_Widget2) {
    _inherits$13(CurrencyInput, _Widget2);

    function CurrencyInput() {
        _classCallCheck$17(this, CurrencyInput);

        return _possibleConstructorReturn$13(this, _Widget2.apply(this, arguments));
    }

    /**
     * Render the text input field
     */
    CurrencyInput.prototype.renderField = function renderField() {
        var textInput = document.createElement('input');
        textInput.setAttribute('name', this.name);
        textInput.setAttribute('type', 'number');
        textInput.setAttribute('inputmode', 'numeric');
        textInput.setAttribute('class', this.getFieldClass());
        textInput.setAttribute('value', this.value !== null ? this.value : '');

        // See note for NumberInput....
        textInput.setAttribute('pattern', '[0-9]*');

        for (var attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib]);
        }

        return textInput;
    };

    /**
     * Get the value of the field. This will remove a currency
     * symbol and round to two decimal places.
     */


    CurrencyInput.prototype.getValue = function getValue() {
        var value = _Widget2.prototype.getValue.call(this);

        if (value) {
            value = parseFloat(value);
            value = value.toFixed(2);
        }

        return parseFloat(value);
    };

    /**
     * Get the class name for the widget element
     */


    CurrencyInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-currency';
    };

    return CurrencyInput;
}(Widget);

/**
 * @file Object input widget
 */

function _classCallCheck$18(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$14(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$14(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ObjectInput - Render a list of fields
 * @class
 */
var ObjectInput = function (_Widget) {
    _inherits$14(ObjectInput, _Widget);

    function ObjectInput() {
        _classCallCheck$18(this, ObjectInput);

        return _possibleConstructorReturn$14(this, _Widget.apply(this, arguments));
    }

    ObjectInput.prototype.renderObjectFields = function renderObjectFields(wrapper, fields) {
        var allowedFields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        // Objects need to be ordered on output, we create a list to
        // order them by, then render each in that order
        var orderedFields = [];

        for (var _iterator = Object.keys(fields), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var key = _ref;

            if (allowedFields) {
                if (!Object.keys(allowedFields).includes(key)) {
                    continue;
                }
            }

            var field = fields[key];
            orderedFields.push([field.getSortOrder(), key]);
        }

        orderedFields.sort(function (a, b) {
            return a[0] - b[0];
        });

        for (var _iterator2 = orderedFields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var fieldOrderKey = _ref2;
            var _key = fieldOrderKey[1];

            var renderedField = fields[_key].render();
            wrapper.appendChild(renderedField);
        }
    };

    /**
     * Render the object input fields
     */


    ObjectInput.prototype.renderObject = function renderObject(fields) {
        // Create a fragment for our widget
        var widgetFragment = document.createDocumentFragment();

        var wrapper = this.renderWrapper();

        // Check if we are rendering into fieldsets or just
        // are regular object
        if (this.options.fieldsets) {
            var fieldsetIndex = 0;
            for (var _iterator3 = this.options.fieldsets, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var fieldset = _ref3;

                var fieldsetElement = document.createElement('fieldset');
                fieldsetElement.classList.add('mutt-fieldset');
                fieldsetElement.setAttribute('name', this.name + '-fieldset-' + fieldsetIndex);

                if (fieldset.hasOwnProperty('options')) {
                    if (fieldset.options.hasOwnProperty('class') && fieldset.options.class) {
                        if (fieldset.options.class.includes(' ')) {
                            var classes = fieldset.options.class.split(' ');
                            for (var _iterator4 = classes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                                var _ref4;

                                if (_isArray4) {
                                    if (_i4 >= _iterator4.length) break;
                                    _ref4 = _iterator4[_i4++];
                                } else {
                                    _i4 = _iterator4.next();
                                    if (_i4.done) break;
                                    _ref4 = _i4.value;
                                }

                                var className = _ref4;

                                fieldsetElement.classList.add(className);
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
        } else {
            this.renderObjectFields(wrapper, fields);
        }

        widgetFragment.appendChild(wrapper);

        this._rendered = true;

        return widgetFragment;
    };

    ObjectInput.prototype.render = function render() {
        throw new Error('ObjectInput must render as a object - use renderObject');
    };

    ObjectInput.prototype.renderLabel = function renderLabel() {
        throw new Error('ObjectInput does not support a label!');
    };

    /**
    * Get the class name for the widget element
    */


    ObjectInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-object';
    };

    return ObjectInput;
}(Widget);

/**
 * @file HTML Radio widget
 */

function _classCallCheck$19(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$15(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$15(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RadioInput - Standard HTML radio input
 * @class
 */
var RadioInput = function (_BaseChoiceWidget) {
    _inherits$15(RadioInput, _BaseChoiceWidget);

    /**
    *
    */
    function RadioInput(field, type, id, name, label, attribs, options, value) {
        _classCallCheck$19(this, RadioInput);

        // Booleans do not have choices, so we must contrive
        // them if they aren't already set
        var _this = _possibleConstructorReturn$15(this, _BaseChoiceWidget.call(this, field, type, id, name, label, attribs, options, value));

        if (_this.type === 'boolean') {
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


    RadioInput.prototype.renderField = function renderField() {
        var _this2 = this;

        var radioInputListWrapper = document.createElement('div');
        var index = 0;

        for (var _iterator = this.choices, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var choice = _ref;
            var value = choice[0],
                label = choice[1];

            var fieldId = this.id + '_' + index;

            var radioInputWrapper = document.createElement('div');
            radioInputWrapper.setAttribute('class', 'mutt-field-radio-item');

            var radioInput = document.createElement('input');
            radioInput.setAttribute('id', fieldId);
            radioInput.setAttribute('type', 'radio');
            radioInput.setAttribute('name', this.id);
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

            if (this.value === value) {
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

        return radioInputListWrapper;
    };

    /**
    * Get the value of the item. Radio buttons require an overide as
    * there are multiple elements on the page, we must attempt to get
    * the selected one
    */


    RadioInput.prototype.getRadioValue = function getRadioValue() {
        var selectedElement = this.getElementWrapper().querySelector('.mutt-field:checked');

        if (!selectedElement) {
            return null;
        }

        this.value = selectedElement.value;

        return this.value;
    };

    RadioInput.prototype.getValue = function getValue() {
        return this.getRadioValue();
    };

    /**
    * Get the class name for the widget element
    */


    RadioInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-radio';
    };

    return RadioInput;
}(BaseChoiceWidget);

/**
 * @file Select input widget
 */

function _classCallCheck$20(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$16(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$16(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SelectInput - Standard HTML select input
 * @class
 */
var SelectInput = function (_BaseChoiceWidget) {
    _inherits$16(SelectInput, _BaseChoiceWidget);

    function SelectInput() {
        _classCallCheck$20(this, SelectInput);

        return _possibleConstructorReturn$16(this, _BaseChoiceWidget.apply(this, arguments));
    }

    /**
     * Render the select field
     */
    SelectInput.prototype.renderField = function renderField() {
        var selectInput = document.createElement('select');
        selectInput.setAttribute('name', this.name);
        selectInput.setAttribute('class', this.getFieldClass());

        for (var attrib in this.attribs) {
            selectInput.setAttribute(attrib, this.attribs[attrib]);
        }

        for (var _iterator = this.choices, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var choice = _ref;
            var value = choice[0],
                label = choice[1];

            var option = document.createElement('option');
            option.value = value;
            option.textContent = this.formatLabel(label);

            if (this.value === value) {
                option.setAttribute('selected', 'selected');
            }

            selectInput.appendChild(option);
        }

        return selectInput;
    };

    /**
     * Get the class name for the widget element
     */


    SelectInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-select';
    };

    return SelectInput;
}(BaseChoiceWidget);

/**
* @file Text input widget interface
*/

function _classCallCheck$21(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$17(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$17(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TextInput - Standard HTML text input
 * @class
 */
var TextInput = function (_Widget) {
    _inherits$17(TextInput, _Widget);

    function TextInput() {
        _classCallCheck$21(this, TextInput);

        return _possibleConstructorReturn$17(this, _Widget.apply(this, arguments));
    }

    /**
    * Render the text input field
    * @returns {HTMLElement} render the input widget
    */
    TextInput.prototype.renderField = function renderField() {
        var textInput = document.createElement('input');
        textInput.setAttribute('name', this.name);
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('value', this.value ? this.value : '');
        textInput.setAttribute('class', this.getFieldClass());

        for (var attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib]);
        }

        return textInput;
    };

    /**
     * Get the class name for the widget element
     */


    TextInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-text';
    };

    return TextInput;
}(Widget);

/**
 * TextAreaInput - Standard HTML textarea input
 * @class
 */
var TextAreaInput = function (_Widget2) {
    _inherits$17(TextAreaInput, _Widget2);

    function TextAreaInput() {
        _classCallCheck$21(this, TextAreaInput);

        return _possibleConstructorReturn$17(this, _Widget2.apply(this, arguments));
    }

    /**
    * Render the text input field
    */
    TextAreaInput.prototype.renderField = function renderField() {
        var textareaInput = document.createElement('textarea');
        textareaInput.setAttribute('name', this.name);
        textareaInput.setAttribute('class', this.getFieldClass());
        textareaInput.textContent = this.value ? this.value : '';

        for (var attrib in this.attribs) {
            textareaInput.setAttribute(attrib, this.attribs[attrib]);
        }

        return textareaInput;
    };

    /**
    * Get the class name for the widget element
    */


    TextAreaInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-text';
    };

    return TextAreaInput;
}(Widget);

/**
 * EmailInput - Standard HTML text input
 * @class
 */
var EmailInput = function (_TextInput) {
    _inherits$17(EmailInput, _TextInput);

    function EmailInput() {
        _classCallCheck$21(this, EmailInput);

        return _possibleConstructorReturn$17(this, _TextInput.apply(this, arguments));
    }

    /**
    * Render the text input field
    */
    EmailInput.prototype.renderField = function renderField() {
        var textInput = document.createElement('input');
        textInput.setAttribute('name', this.name);
        textInput.setAttribute('type', 'email');
        textInput.setAttribute('value', this.value ? this.value : '');
        textInput.setAttribute('class', this.getFieldClass());

        for (var attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib]);
        }

        return textInput;
    };

    /**
    * Get the class name for the widget element
    */


    EmailInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-email';
    };

    return EmailInput;
}(TextInput);

/**
 * HiddenInput - Standard HTML hidden input
 * @class
 */
var HiddenInput = function (_Widget3) {
    _inherits$17(HiddenInput, _Widget3);

    function HiddenInput(field, type, id, name, label, attribs, options, value) {
        _classCallCheck$21(this, HiddenInput);

        var _this4 = _possibleConstructorReturn$17(this, _Widget3.call(this, field, type, id, name, label, attribs, options, value));

        _this4.choices = [];
        return _this4;
    }

    /**
     * Render the text input field
     */


    HiddenInput.prototype.renderField = function renderField() {
        var textInput = document.createElement('input');
        textInput.setAttribute('name', this.name);
        textInput.setAttribute('type', 'hidden');
        textInput.setAttribute('value', this.value ? this.value : '');
        textInput.setAttribute('class', this.getFieldClass());

        for (var attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib]);
        }

        return textInput;
    };

    /**
     * Label is not used for hidden fields
     */


    HiddenInput.prototype.renderLabel = function renderLabel() {
        return null;
    };

    /**
     * Errors are not shown for hidden fields
     */


    HiddenInput.prototype.renderErrors = function renderErrors() {
        return null;
    };

    /**
     *
     * @params {array}
     */


    HiddenInput.prototype.setChoices = function setChoices(choices) {
        this.choices = choices;
    };

    /**
    * Get the choices used by the widget
    * @returns {array} choice pair array
    */


    HiddenInput.prototype.getChoices = function getChoices() {
        return this.choices;
    };

    return HiddenInput;
}(Widget);

/**
 * PasswordInput - Standard HTML password input
 * @class
 */
var PasswordInput = function (_TextInput2) {
    _inherits$17(PasswordInput, _TextInput2);

    function PasswordInput() {
        _classCallCheck$21(this, PasswordInput);

        return _possibleConstructorReturn$17(this, _TextInput2.apply(this, arguments));
    }

    /**
     * Render the text input field
     */
    PasswordInput.prototype.renderField = function renderField() {
        var textInput = document.createElement('input');
        textInput.setAttribute('name', this.name);
        textInput.setAttribute('type', 'password');
        textInput.setAttribute('value', this.value ? this.value : '');
        textInput.setAttribute('class', this.getFieldClass());

        for (var attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib]);
        }

        return textInput;
    };

    /**
    * Get the class name for the widget element
    */


    PasswordInput.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-password';
    };

    return PasswordInput;
}(TextInput);

/**
 * DisplayWidget - Display only widget, this just shows the field as
 * plain text. Typically used by the lock form utility.
 */
function displayReadonlyValue(value) {
    var display = document.createElement('span');

    // TODO: Support for the class being set dynamically
    display.setAttribute('class', 'mutt-field mutt-field-display');
    display.textContent = value;

    return display;
}

/**
 * DisplayWidget - Widget to display field as plain text
 * @class
 */
var DisplayWidget = function (_Widget4) {
    _inherits$17(DisplayWidget, _Widget4);

    function DisplayWidget() {
        _classCallCheck$21(this, DisplayWidget);

        return _possibleConstructorReturn$17(this, _Widget4.apply(this, arguments));
    }

    /**
    * Render the text input field
    */
    DisplayWidget.prototype.renderField = function renderField() {
        return displayReadonlyValue(this.value);
    };

    /**
    * Get the class name for the widget element
    */


    DisplayWidget.prototype.getFieldClass = function getFieldClass() {
        return 'mutt-field mutt-field-display';
    };

    return DisplayWidget;
}(Widget);

// Index of Widgets

var widgets = /*#__PURE__*/Object.freeze({
    Widget: Widget,
    ArrayInput: ArrayInput,
    ButtonWidget: ButtonWidget,
    CheckboxInput: CheckboxInput,
    CheckboxList: CheckboxList,
    BaseChoiceWidget: BaseChoiceWidget,
    DateInput: DateInput,
    DateSelectionInput: DateSelectionInput,
    NumberInput: NumberInput,
    CurrencyInput: CurrencyInput,
    ObjectInput: ObjectInput,
    RadioInput: RadioInput,
    SelectInput: SelectInput,
    TextInput: TextInput,
    TextAreaInput: TextAreaInput,
    EmailInput: EmailInput,
    HiddenInput: HiddenInput,
    PasswordInput: PasswordInput,
    DisplayWidget: DisplayWidget
});

function _possibleConstructorReturn$18(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$18(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck$22(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @file Core Serializers
*/

/**
 * Base Validation Interface
 * @class
 */
var Serializer = function () {
    function Serializer(value) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck$22(this, Serializer);

        this.value = value;
        this.options = options;
    }

    Serializer.prototype.serialize = function serialize() {
        return this.value;
    };

    return Serializer;
}();

/**
 * TrimSerializer - Remove spaces from a string
 * @class
 */
var TrimSerializer = function (_Serializer) {
    _inherits$18(TrimSerializer, _Serializer);

    function TrimSerializer() {
        _classCallCheck$22(this, TrimSerializer);

        return _possibleConstructorReturn$18(this, _Serializer.apply(this, arguments));
    }

    TrimSerializer.prototype.serialize = function serialize() {
        return this.value.toString().trim();
    };

    return TrimSerializer;
}(Serializer);

// Index for Serializers

var serializers = /*#__PURE__*/Object.freeze({
    Serializer: Serializer,
    TrimSerializer: TrimSerializer
});

/**
 * @file Config - Registry of settings
 * @author Nick Snell <nick@boughtbymany.com>
 * @copyright Bought By Many 2018
 */

function _classCallCheck$23(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Internal registry for Mutt fields & widgets. This is used
 * internally to register default fields & widgets, and can
 * also be used as a hook to install new fields & widgets
 * via plugins.
 * @class
 */

var MuttConfig = function () {
    /**
     * MuttConfig is used for configuration information.
     * It's primarily used by the builder utility to decide
     * field mappings and by the plugins to extend the core
     * functionality.
     * @constructor
     */
    function MuttConfig() {
        _classCallCheck$23(this, MuttConfig);

        this._config = {
            settings: {
                debug: false
            },
            fields: {
                array: ArrayField,
                boolean: BooleanField,
                enum: ChoiceField,
                number: IntegerField,
                integer: IntegerField,
                object: ObjectField,
                string: StringField,
                date: StringField,
                datetime: StringField,
                button: ButtonField
            },
            widgets: {
                array: ArrayInput,
                checkbox: CheckboxInput,
                checkboxlist: CheckboxList,
                date: DateInput,
                dateselect: DateSelectionInput,
                number: NumberInput,
                currency: CurrencyInput,
                object: ObjectInput,
                radio: RadioInput,
                select: SelectInput,
                text: TextInput,
                textarea: TextAreaInput,
                email: EmailInput,
                hidden: HiddenInput,
                password: PasswordInput,
                display: DisplayWidget,
                button: ButtonWidget
            },
            serializers: {
                trim: TrimSerializer
            }
        };
    }

    /**
     * Get a setting by name
     * @param {string} name Name of setting
     */


    MuttConfig.prototype.getSetting = function getSetting(name) {
        if (!this._config.settings.hasOwnProperty(name)) {
            return null;
        }

        return this._config.settings[name];
    };

    /**
     * Set a setting by name
     * @param {string} name Name of setting
     */


    MuttConfig.prototype.setSetting = function setSetting(name, value) {
        this._config.settings[name] = value;
    };

    /**
     * Use a plugin in the registry
     * @param {object} plugin a plugin to configure, requires install method.
     */


    MuttConfig.prototype.use = function use(plugin) {
        // Check we can install the plugin
        if (!plugin.hasOwnProperty('install')) {
            throw new Error('Unable to install plugin - missing install!');
        }

        var pluginComponents = {};
        var pluginFeatures = plugin.install();

        // NOTE: Support for legacy plugins returning an array
        if (Array.isArray(pluginFeatures)) {
            var _fields = pluginFeatures[0],
                _widgets = pluginFeatures[1],
                settings = pluginFeatures[2];

            pluginComponents = { fields: _fields, widgets: _widgets, settings: settings };
        } else {
            pluginComponents = pluginFeatures;
        }

        // Fields & Widgets allow for the extension of mutt default
        // fields & widgets
        if (pluginComponents.fields) {
            this.registerFields(pluginComponents.fields);
        }

        if (pluginComponents.widgets) {
            this.registerWidgets(pluginComponents.widgets);
        }

        if (pluginComponents.serializers) {
            this.registerSerializers(pluginComponents.serializers);
        }

        // Settings
        // These allow for internal settings to be overidden or
        // extended by plugins
        if (pluginComponents.settings) {
            this._config.settings = Object.assign(this._config.settings, pluginComponents.settings);
        }

        // Extensions
        // These allow for the MuttForm class to be extended
        // or overidden by plugins
        if (pluginComponents.extensions) {
            Object.keys(pluginComponents.extensions).forEach(function (name) {
                var extension = pluginComponents.extensions[name];
                MuttForm.prototype[name] = extension;
            });
        }
    };

    /**
     * Register a new field type or overwrite an existing field
     * type with a new field class.
     * @param {string} type - field type
     * @param {Field} fieldKlass - field class to be used for type
     */


    MuttConfig.prototype.registerField = function registerField(type, fieldKlass) {
        this._config.fields[type] = fieldKlass;
    };

    /**
     * Register a collection of fields
     * @param {string}
     * @param {Widget}
     */


    MuttConfig.prototype.registerFields = function registerFields(fields) {
        if (fields) {
            for (var _iterator = Object.keys(fields), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var fieldType = _ref;

                this.registerField(fieldType, fields[fieldType]);
            }
        }
    };

    /**
     * Check if a field type exists in the registry
     * @param {string} type - name of field type to check
     * @returns {bool} returns true if field type exists in registry
     */


    MuttConfig.prototype.hasField = function hasField(type) {
        if (this._config.fields.hasOwnProperty(type)) {
            return true;
        }
        return false;
    };

    /**
     * Get a field class
     * @param {string}
     */


    MuttConfig.prototype.getField = function getField(type) {
        if (this._config.fields.hasOwnProperty(type)) {
            return this._config.fields[type];
        }
        return null;
    };

    /**
     * Register a widget class with a key
     * @param {string} name reference for widget
     * @param {Widget} widgetKlass class of widget to be registered
     */


    MuttConfig.prototype.registerWidget = function registerWidget(name, widgetKlass) {
        this._config.widgets[name] = widgetKlass;
    };

    /**
     * Register a collection of widgets - calls registerWidget
     * @param {array} widgets list of widgets to register
     */


    MuttConfig.prototype.registerWidgets = function registerWidgets(widgets) {
        if (widgets) {
            for (var _iterator2 = Object.keys(widgets), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var widgetName = _ref2;

                this.registerWidget(widgetName, widgets[widgetName]);
            }
        }
    };

    /**
     * Check if a widget has been registered
     * @param {string} name name of widget to check
     */


    MuttConfig.prototype.hasWidget = function hasWidget(name) {
        if (this._config.widgets.hasOwnProperty(name)) {
            return true;
        }
        return false;
    };

    /**
     * Get a widget class by name
     * @param {string} name name of widget class to fetch
     */


    MuttConfig.prototype.getWidget = function getWidget(name) {
        if (this._config.widgets.hasOwnProperty(name)) {
            return this._config.widgets[name];
        }
        return null;
    };

    /**
     * Get currently configured widgets
     * @param {object} widgets object of currently configured widgets
     */


    MuttConfig.prototype.getWidgets = function getWidgets(name) {
        return this._config.widgets;
    };

    /**
     * Register a serializer class with a key
     * @param {string} name reference for widget
     * @param {function} serializer class of widget to be registered
     */


    MuttConfig.prototype.registerSerializer = function registerSerializer(name, serializer) {
        this._config.serializers[name] = serializer;
    };

    /**
     * Register a collection of serializers - calls registerSerializer
     * @param {array} serializers list of serializers to register
     */


    MuttConfig.prototype.registerSerializers = function registerSerializers(serializers) {
        if (serializers) {
            for (var _iterator3 = Object.keys(serializers), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var serializerName = _ref3;

                this.registerSerializer(serializerName, serializers[serializerName]);
            }
        }
    };

    /**
     * Check if a serializer has been registered
     * @param {string} name name of serializer to check
     */


    MuttConfig.prototype.hasSerializer = function hasSerializer(name) {
        if (this._config.serializers.hasOwnProperty(name)) {
            return true;
        }
        return false;
    };

    /**
     * Get a serilizer by name
     * @param {string} name name of serializer class to fetch
     */


    MuttConfig.prototype.getSerializer = function getSerializer(name) {
        if (this._config.serializers.hasOwnProperty(name)) {
            return this._config.serializers[name];
        }
        return null;
    };

    /**
     * Get currently configured serializers
     * @param {object} serializers object of currently configured serilizers
     */


    MuttConfig.prototype.getSerializers = function getSerializers(name) {
        return this._config.serializers;
    };

    return MuttConfig;
}();

/**
 * @file Utilities
 */

/**
 * Function to provide mixin support to classes
 */
function mixin(target, source) {
    target = target.prototype;
    source = source.prototype;

    Object.getOwnPropertyNames(source).forEach(function (name) {
        if (name !== 'constructor') {
            Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
        }
    });
}

/**
 * Log a message to the console, used for debugging
 * @param message a message to be logged
 */
function logger(message) {
    if (Mutt.config.getSetting('debug')) {
        console.log('Mutt :: ', message);
    }
}

// Index for Validators

var validators = /*#__PURE__*/Object.freeze({
    Validator: Validator,
    RequiredValidator: RequiredValidator,
    BooleanRequiredValidator: BooleanRequiredValidator,
    BooleanTrueValidator: BooleanTrueValidator,
    LengthValidator: LengthValidator,
    IntegerValidator: IntegerValidator,
    RegexValidator: RegexValidator
});

/**
 * @file Main Mutt API
 * @author Nick Snell <nick@boughtbymany.com>
 * @copyright Bought By Many 2018
 */

/**
 * Main Mutt API.
 * @returns {MuttForm} Returns an instance of a MuttForm
 * @example
 * let form = new Mutt({ name: { type: 'string' } })
 */
function Mutt(schema) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (debug) {
        this.config.setSetting('debug', true);
    }

    if (schema === undefined) {
        throw new Error('You must specify a Schema!');
    }

    // Setup a new form instance if called directly
    return new MuttForm(schema, options);
}

/**
 * Internal setup for Mutt API
 * @private
 */
function initApi(Mutt) {
    // Setup the config
    var config = new MuttConfig();
    Mutt.config = config;

    // Setup plugin interface
    Mutt.use = function (plugins) {
        if (!Array.isArray(plugins)) {
            plugins = [plugins];
        }

        for (var _iterator = plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var plugin = _ref;

            Mutt.config.use(plugin);
        }
    };

    // Setup Utilities
    Mutt.logger = logger;
    Mutt.mixin = mixin;

    // Add in hooks for fields, widgets & validators
    Mutt.fields = fields;
    Mutt.widgets = widgets;
    Mutt.validators = validators;
    Mutt.serializers = serializers;
}

initApi(Mutt);

Mutt.version = '1.10.2';

export default Mutt;
