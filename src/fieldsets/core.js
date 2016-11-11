/**
* @file Fieldset Interface
* @copyright Bought By Many 2016
*/

'use strict'

import {Field} from '../fields/core'

/**
* Fieldset wrapper class
* @class
*/
export class Fieldset {

    /**
    * Setup the fieldset class
    * @constructor
    * @param {string} label set the label of the fieldset, typically
    * used for legends
    */
    constructor({label = null, name = null}) {
        this.name = name
        this.label = label
        this.fields = []
        this.errors = {}
    }

    /**
    * Add a field to the fieldset
    * @param {field} field object to add to the fieldset
    */
    addField(field) {
        this.fields.push(field)
    }

    /**
    * Check if a fieldset contains a field
    * @param {string} A Field name
    */
    hasField(fieldName) {
        for(let field in this.fields) {
            if(field.name === fieldName) {
                return true
            }
        }

        return false
    }

    /**
    * Get a field from the fieldset
    * @param {string} A Field name
    */
    getField(fieldName) {

    }

    /**
    * Get the data for the fieldset, this is returned as
    * an object with field -> value pairs
    * @returns {object}
    */
    data() {
        let data = {}

        for(let field of this.fields) {
            data[field.name] = field.value
        }

        return data
    }

    /**
    * Validate the fields in the fieldset. Stores an object
    * of error information field name -> error.
    * @returns {boolean}
    */
    validate() {
        let valid = true

        for(let field of this.fields) {
            if(!field.validate()) {
                this.errors[field.name] = field.errors
                valid = false
            }
        }

        return valid
    }

    /**
    *
    */
    setFieldErrors(errors) {
        for(let errorField in errors) {
            if(this.hasField(errorField)) {
                this.getField(errorField)
            }
        }
    }

    /**
    *
    * @param {string} text to be used for the fieldset legend
    */
    setLegend(legend) {
        this.label = legend
    }

    /**
    *
    */
    refreshValidationState() {
        this.errors = {}

        for(let field of this.fields) {
            field.refreshValidationState()
        }
    }

    /**
    *
    * @returns {HTMLFragment}
    */
    render() {
        let fieldsetContainer = document.createDocumentFragment()
        let fieldset = document.createElement('fieldset')
        fieldset.classList.add('pug-fieldset')

        if(this.name) {
            fieldset.setAttribute('name', this.name)
        }

        if(this.label) {
            let legend = document.createElement('legend')
            legend.textContent = this.label
            fieldset.appendChild(legend)
        }

        this.fields.sort(function(a, b) {
            return a.getSortOrder() - b.getSortOrder()
        })

        for(let field of this.fields) {
            let fieldElement = field.render()
            fieldset.appendChild(fieldElement)
        }

        fieldsetContainer.appendChild(fieldset)

        return fieldsetContainer
    }

    /**
    * Callback triggered after the element has been rendered to
    * the stage
    */
    postRender() {
        for(let field of this.fields) {
            field.postRender()
        }
    }

    /**
    *
    */
    lock() {
        for(let field of this.fields) {
            field.lock()
        }
    }

    /**
    *
    */
    unlock() {
        for(let field of this.fields) {
            field.unlock()
        }
    }

    /**
    * Get a field in the form by it's path. Paths should be
    * provided in 'dot' notation - i.e "some.example.path"
    */
    getFieldByPath(path) {
        let pathParts = path.split('.')
        let searchName = pathParts.shift()

        for(let field of this.fields) {
            if(field.name === searchName) {
                if(pathParts.length === 0) {
                    return field
                } else if(field.constructor.prototype
                            .hasOwnProperty('getFieldByPath')) {
                    return field.getFieldByPath(pathParts.join('.'))
                }
            }
        }

        return null
    }

    /**
    * Create a new fieldset. Th
    * @staticmethod
    * @params {object} schema - JSON schema for the fieldset spec
    * @params [object] options - options for fields and the fieldset
    * @params [string] name - optional name for the fieldset (added as class)
    */
    static new(schema, options = {}, fields = null, name = null) {
        let fieldsetSpec = {}

        if(schema.hasOwnProperty('title')) {
            fieldsetSpec.label = schema.title
        }
        if(options.hasOwnProperty('form')) {
            if(options.form.hasOwnProperty('label')) {
                fieldsetSpec.label = options.form.label
            }
        }

        Object.assign(fieldsetSpec, options)

        if(schema.hasOwnProperty('properties')) {
            schema = schema.properties
        }

        let fieldset = new Fieldset(fieldsetSpec)
        let fieldIndex = 1

        for(let fieldName of Object.keys(schema)) {
            let fieldId = `${fieldName}_field_${fieldIndex}`
            let fieldSchema = schema[fieldName]
            let fieldOptions = {}

            // If a set of fields is specified, we only allow
            // these to be created
            if(fields) {
                if(!Object.keys(fields).includes(fieldName)) {
                    continue
                }
            }

            if(options.fields) {
                if(options.fields.hasOwnProperty(fieldName)) {
                    fieldOptions = options.fields[fieldName]
                }
            }

            if(options.fieldsets) {
                fieldOptions.fieldsets = options.fieldsets
            }

            let field = Field.new(
                fieldId,
                fieldName,
                fieldSchema,
                fieldOptions
            )

            if(field) {
                // Only set the sort order if this wasn't set previously,
                // this may of been set by options
                if(!field.getSortOrder()) {
                    field.setSortOrder(fieldIndex)
                }

                fieldset.addField(field)
                fieldIndex++
            }
        }

        return fieldset
    }
}
