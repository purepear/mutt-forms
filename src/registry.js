/**
* @file Registry of pug config and plugins
* @copyright Bought By Many 2016
*/

'use strict'

import {ArrayField} from './fields/array'
import {BooleanField} from './fields/boolean'
import {ChoiceField} from './fields/choice'
import {IntegerField} from './fields/integer'
import {ObjectField} from './fields/object'
import {StringField} from './fields/text'
import {RadioInput} from './widgets/radio'
import {
    TextAreaInput,
    PasswordInput,
    EmailInput,
    HiddenInput,
    DisplayWidget
} from './widgets/text'
import {DateInput, DateSelectionInput} from './widgets/date'

class PugRegistry {

    /**
    * Pug Registry is used a singleton class that contains
    * configuration information. It's used by the builder
    * utility to decide field mappings and by the plugins
    * to extend the core functionality.
    * @constructor
    */
    constructor() {
        this.fields = {
            'boolean': BooleanField,
            'integer': IntegerField,
            'string': StringField,
            'date': StringField,
            'datetime': StringField,
            'enum': ChoiceField,
            'array': ArrayField,
            'object': ObjectField
            // 'number': 'FloatField',
        }

        this.widgets = {
            'date': DateInput,
            'dateselect': DateSelectionInput,
            'email': EmailInput,
            'radio': RadioInput,
            'hidden': HiddenInput,
            'textarea': TextAreaInput,
            'password': PasswordInput,
            'display': DisplayWidget
        }
    }

    /**
    * Register a new field type or overwrite an existing field
    * type with a new field class.
    * @param {string} type - field type
    * @param {Field} fieldKlass - field class to be used for type
    */
    registerField(type, fieldKlass) {
        this.fields[type] = fieldKlass
    }

    /**
    * Check if a field type exists in the registry
    * @param {string} type - name of field type to check
    * @returns {bool} returns true if field type exists in registry
    */
    hasField(type) {
        if(this.fields.hasOwnProperty(type)) {
            return true
        }
        return false
    }

    /**
    *
    * @param {string}
    */
    getField(type) {
        if(this.fields.hasOwnProperty(type)) {
            return this.fields[type]
        }
        return null
    }

    /**
    *
    * @param {string}
    * @param {Widget}
    */
    registerWidget(name, widgetKlass) {
        this.widgets[name] = widgetKlass
    }

    /**
    *
    * @param {string}
    */
    hasWidget(name) {
        if(this.widgets.hasOwnProperty(name)) {
            return true
        }
        return false
    }

    /**
    *
    * @param {string}
    */
    getWidget(name) {
        if(this.widgets.hasOwnProperty(name)) {
            return this.widgets[name]
        }
        return null
    }

}

export default new PugRegistry()
