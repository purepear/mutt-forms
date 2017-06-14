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
        this._config = {
            settings: {

            },
            fields: {
                array: fields.ArrayField,
                boolean: fields.BooleanField,
                enum: fields.ChoiceField,
                integer: fields.IntegerField,
                object: fields.ObjectField,
                string: fields.StringField,
                date: fields.StringField,
                datetime: fields.StringField,
                button: fields.ButtonField
            },
            widgets: {
                array: widgets.ArrayInput,
                checkbox: widgets.CheckboxInput,
                checkboxlist: widgets.CheckboxList,
                date: widgets.DateInput,
                dateselect: widgets.DateSelectionInput,
                number: widgets.NumberInput,
                currency: widgets.CurrencyInput,
                object: widgets.ObjectInput,
                radio: widgets.RadioInput,
                select: widgets.SelectInput,
                text: widgets.TextInput,
                textarea: widgets.TextAreaInput,
                email: widgets.EmailInput,
                hidden: widgets.HiddenInput,
                password: widgets.PasswordInput,
                display: widgets.DisplayWidget,
                button: widgets.ButtonWidget
            }
        }
    }

    /**
    * Get a setting by name
    **/
    getSetting(name) {
        if(!this._config.settings.hasOwnProperty(name)) {
            return null
        }

        return this._config.settings[name]
    }

    /**
    * Use a plugin in the registry
    */
    use(plugin) {
        // Check we can install the plugin
        if(!plugin.hasOwnProperty('install')) {
            throw new Error(
                'Unable to install plugin - missing install!'
            )
        }

        let [fields, widgets, settings] = plugin.install()

        if(fields) {
            this.registerFields(fields)
        }

        if(widgets) {
            this.registerWidgets(widgets)
        }

        if(settings) {
            this._config.settings = Object.assign(
                this._config.settings,
                settings
            )
        }
    }

    /**
    * Register a new field type or overwrite an existing field
    * type with a new field class.
    * @param {string} type - field type
    * @param {Field} fieldKlass - field class to be used for type
    */
    registerField(type, fieldKlass) {
        this._config.fields[type] = fieldKlass
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
        if(this._config.fields.hasOwnProperty(type)) {
            return true
        }
        return false
    }

    /**
    *
    * @param {string}
    */
    getField(type) {
        if(this._config.fields.hasOwnProperty(type)) {
            return this._config.fields[type]
        }
        return null
    }

    /**
    *
    * @param {string}
    * @param {Widget}
    */
    registerWidget(name, widgetKlass) {
        this._config.widgets[name] = widgetKlass
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
        if(this._config.widgets.hasOwnProperty(name)) {
            return true
        }
        return false
    }

    /**
    *
    * @param {string}
    */
    getWidget(name) {
        if(this._config.widgets.hasOwnProperty(name)) {
            return this._config.widgets[name]
        }
        return null
    }
}
