/**
 * @file Main Core Field class
 */

"use strict"

import Mutt from "../index"
import * as validators from "../validators"

/**
 * Base Field class, this is used as a base interface for
 * all other Fields
 * @class
 */
export class Field {
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
  constructor({
    id,
    name,
    label = null,
    initial = null,
    widget = null,
    validators = [],
    attribs = {},
    description = null,
    options = {},
    order = null,
    parent = null
  }) {
    this.id = id
    this.name = name
    this.label = label
    this.description = description
    this.attribs = attribs
    this.options = options
    this.validators = validators
    this.sortOrder = order
    this.parent = parent

    if (!this.label) {
      this.label = this.name
    }

    this.initOptions()

    // Setup the widget
    let WidgetKlass = this.getWidget()

    if (widget) {
      WidgetKlass = widget
    }

    const initalValue = initial || this.initialValue()

    this.widget = new WidgetKlass(
      this,
      this.type,
      this.id,
      this.name,
      this.label,
      this.attribs,
      this.options,
      initalValue
    )

    this._errors = []
  }

  /**
   * Enable the options on the field
   */
  initOptions() {
    if (this.options.hasOwnProperty("order")) {
      this.sortOrder = this.options.order
    }
    if (this.options.hasOwnProperty("label")) {
      this.label = this.options.label
    }
    if (this.options.hasOwnProperty("description")) {
      this.description = this.options.description
    }
  }

  /**
   * Property - get/set the type (typically set can not be called
   * but is included for subclasses who may use this)
   */
  get type() {
    const type = this.constructor.name.toLowerCase()
    return type !== "field" ? type.replace("field", "") : type
  }

  set type(someType) {
    throw new Error("Unable to set type on a field instance!")
  }

  /**
   * Property - get/set value
   */
  get value() {
    return this.widget.getValue()
  }

  set value(value) {
    this.widget.setValue(value)
  }

  /**
   * Property - get/set errors
   * @param {string} Error string
   */
  get errors() {
    return this._errors
  }

  set errors(error) {
    this._errors.push(error)
  }

  /**
   * Render the form field using it's widget interface
   * @returns {DocumentFragment} rendered HTML widget
   */
  render() {
    return this.widget.render()
  }

  /**
   * Destroy the rendered widget
   * @returns the success or failure response
   */
  destroy() {
    return this.widget.destroy()
  }

  /**
   * Callback to the field after it has been rendered to
   * the stage
   */
  postRender() {
    this.widget.postRender()
  }

  /**
   * Validate the form field
   */
  validate() {
    // Clear any previous validations
    this.refreshValidationState()

    const value = this.value

    for (let validator of this.validators) {
      if (!validator.validate(value)) {
        this.errors = validator.error
        break
      }
    }

    if (this.errors.length > 0) {
      this.widget.refreshErrorState(this.errors)
      return false
    }

    return true
  }

  /**
   * Refresh the validation state
   */
  refreshValidationState(update = true) {
    this._errors = []
    this.widget.errors = []

    if (update) {
      this.widget.refreshErrorState([])
    }
  }

  /**
   * Get the widget class used to render the field
   * @return TextInput widget
   */
  getWidget() {
    return Mutt.config.getWidget("text")
  }

  /**
   * Get the sort order of the field. This is used when
   * rendering groups of fields.
   */
  getSortOrder() {
    return this.sortOrder
  }

  /**
   * Get the value in a serialized format.
   */
  getSerializedValue() {
    if (this.options.hasOwnProperty("serialize")) {
      const serializeArgs = this.options.serialize
      let serializeKey
      let serializeOptions = {}

      if (typeof serializeArgs === "object") {
        serializeKey = serializeArgs.name
        serializeOptions = serializeArgs
      } else {
        serializeKey = serializeArgs
      }

      if (Mutt.config.hasSerializer(serializeKey)) {
        const Serializer = Mutt.config.getSerializer(serializeKey)
        return new Serializer(this.value, serializeOptions).serialize()
      }
    } else {
      return this.value
    }
  }

  /**
   * Set the internal sort order for a field.
   */
  setSortOrder(order) {
    this.sortOrder = order
  }

  /**
   * Display field as a string representation
   */
  toString() {
    return `Field <${this.name} ${this.type}>`
  }

  /**
   *
   */
  updateId(newId, updateWidget = true) {
    const oldId = this.id
    this.id = newId

    if (updateWidget) {
      this.widget.updateId(oldId, newId)
    }
  }

  /**
   *
   */
  updateName(newName, updateWidget = true) {
    this.name = newName

    if (updateWidget) {
      this.widget.updateName(newName)
    }
  }

  /**
   * Initial value for a field of this type
   */
  initialValue() {
    return null
  }

  /**
   *
   */
  static new(id, name, schema, options = {}, parent = null, required = false) {
    const fieldSpec = {
      id: id,
      name: name,
      options: options,
      attribs: {},
      parent: parent,
      validators: []
    }

    let FieldKlass = null

    if (schema.description) {
      fieldSpec.description = schema.description
    }

    if (schema.title) {
      fieldSpec.label = schema.title
    }

    if (schema.default) {
      fieldSpec.initial = schema.default
    }

    if (schema.enum) {
      const choices = []

      for (let option of schema.enum) {
        choices.push([option, option])
      }

      fieldSpec.choices = choices
      FieldKlass = Mutt.config.getField("enum")
    }

    // This is awkward as we are trying to support the
    // legacy/Alpaca option format
    if (options.hasOwnProperty("hidden")) {
      if (options.hidden) {
        fieldSpec.widget = Mutt.config.getWidget("hidden")
      }
    }

    if (schema.format) {
      if (Mutt.config.hasWidget(schema.format)) {
        fieldSpec.widget = Mutt.config.getWidget(schema.format)
      }
    }

    if (options.widget) {
      if (Mutt.config.hasWidget(options.widget)) {
        fieldSpec.widget = Mutt.config.getWidget(options.widget)
      }
    }

    if (schema.items) {
      fieldSpec.items = schema.items
    }

    if (schema.properties) {
      fieldSpec.properties = schema.properties
    }

    // Build validator list
    if (required || (options.hasOwnProperty("required") && options.required)) {
      if (schema.type === "boolean") {
        const BoolValidator = Mutt.config.getValidator("booleanRequired")
        fieldSpec.validators.push(new BoolValidator())
      } else {
        const RequiredValidator = Mutt.config.getValidator("required")
        fieldSpec.validators.push(new RequiredValidator())
      }

      fieldSpec.attribs.required = "true"
    }

    // If the schema contains a required attribute this should be
    // a list of required descendants - not the item itself
    if (schema.required) {
      fieldSpec.required = schema.required
    }

    // Validators can come in a variety of options, either we derive
    // them from the spec, the are passed explicity, or we try to
    // load them form the mutt config.
    if (options.validators) {
      for (const validator of options.validators) {
        if (typeof validator === "object") {
          if (validator instanceof validators.Validator) {
            // Is already a validator, accept and pass through
            fieldSpec.validators.push(validator)
          } else if (validator.hasOwnProperty("name")) {
            // Validator needs to be setup
            const Validator = Mutt.config.getValidator(validator.name)

            let validatorArgs = {}

            if (validator.hasOwnProperty("args")) {
              validatorArgs = validator.args
            }

            fieldSpec.validators.push(new Validator(validatorArgs))
          }
        }
      }
    }

    if (schema.hasOwnProperty("minItems")) {
      fieldSpec.minItems = schema.minItems
    }

    if (schema.hasOwnProperty("maxItems")) {
      fieldSpec.maxItems = schema.maxItems
    }

    if (options.attribs) {
      fieldSpec.attribs = Object.assign(fieldSpec.attribs, options.attribs)
    }

    if (!FieldKlass) {
      // Attempt to get the field spec
      if (!Mutt.config.hasField(schema.type)) {
        return null
      }

      FieldKlass = Mutt.config.getField(schema.type)
    }

    return new FieldKlass(fieldSpec)
  }
}
