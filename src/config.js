/**
* @file Registry of config and plugins
*/

'use strict'

import * as fields from './fields'
import * as widgets from './widgets'

/**
* Internal registry for Mutt fields & widgets. This is used 
* internally to register default fields & widgets, and can
* also be used as a hook to install new fields & widgets
* via plugins.
* @class
*/
export default class MuttConfig {

    /**
    * Mutt Registry is used a singleton class that contains
    * configuration information. It's used by the builder
    * utility to decide field mappings and by the plugins
    * to extend the core functionality.
    * @constructor
    */
    constructor() {
        this.fields = {
            'array': fields.ArrayField,
            'boolean': fields.BooleanField,
            'enum': fields.ChoiceField,
            'multichoice': fields.MultipleChoiceField,
            'integer': fields.IntegerField,
            'object': fields.ObjectField,
            'string': fields.StringField,
            'date': fields.StringField,
            'datetime': fields.StringField,
            'button': fields.ButtonField
        }

        this.widgets = {
            'array': widgets.ArrayInput,
            'checkbox': widgets.CheckboxInput,
            'checkboxlist': widgets.CheckboxList,
            'date': widgets.DateInput,
            'dateselect': widgets.DateSelectionInput,
            'number': widgets.NumberInput,
            'currency': widgets.CurrencyInput,
            'object': widgets.ObjectInput,
            'radio': widgets.RadioInput,
            'select': widgets.SelectInput,
            'text': widgets.TextInput,
            'textarea': widgets.TextAreaInput,
            'email': widgets.EmailInput,
            'hidden': widgets.HiddenInput,
            'password': widgets.PasswordInput,
            'display': widgets.DisplayWidget,
            'button': widgets.ButtonWidget
        }
    }

    /**
    * Use a plugin in the registry
    */
    use(plugin) {
        let fields = plugin.availableFields()

        if(fields) {
            this.registerFields(fields)
        }

        let widgets = plugin.availableWidgets()

        if(widgets) {
            this.registerWidgets(widgets)
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
    *
    * @param {string}
    * @param {Widget}
    */
    registerFields(fields) {
        if(fields) {
            for(let fieldType of Object.keys(fields)) {
                this.registerField(fieldType, fields[fieldType])
            }
        }
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
    * @param {Widget}
    */
    registerWidgets(widgets) {
        if(widgets) {
            for(let widgetName of Object.keys(widgets)) {
                this.registerWidget(widgetName, widgets[widgetName])
            }
        }
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
