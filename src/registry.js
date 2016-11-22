/**
* @file Registry of config and plugins
*/

'use strict'

/**
* Internal registry for Mutt fields & widgets. This is used 
* internally to register default fields & widgets, and can
* also be used as a hook to install new fields & widgets
* via plugins.
* @class
*/
class MuttRegistry {

    /**
    * Mutt Registry is used a singleton class that contains
    * configuration information. It's used by the builder
    * utility to decide field mappings and by the plugins
    * to extend the core functionality.
    * @constructor
    */
    constructor() {
        this.fields = {}
        this.widgets = {}
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

const registry = new MuttRegistry()

export default registry
