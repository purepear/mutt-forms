/*
    pug - fields/object.js
*/

'use strict';

import {Field} from './core';
import {ObjectInput} from '../widgets/object';


// TODO: An object is basically a fieldset within a fieldset, 
// we are repeating a bunch of functionality from the fieldset 
// here. This should be refactored.

/**
* Object Field
* @class
*/
export class ObjectField extends Field {

    constructor({id, name, label = null, initial = null, widget = null,
        validators = [], attribs = {}, description = null, options = {},
        order = null, properties = {}}) {

        super({id, name, label, initial, widget, validators, attribs, 
            description, options});

        this.object = {};
        let fieldIndex = 1;

        for(let fieldName of Object.keys(properties)) {
            let fieldId = `${name}_${fieldName}`;
            let fieldOptions = {};

            if(this.options.hasOwnProperty(fieldName)) {
                fieldOptions = options[fieldName];
            }

            let field = this.constructor.new(
                fieldId,
                fieldName,
                properties[fieldName],
                fieldOptions
            );

            if(!field.getSortOrder()) {
                field.setSortOrder(fieldIndex);
            }

            this.object[fieldName] = field;

            fieldIndex++;
        }

        // Store errors as an object
        this._errors = {};
    }

    get value() {
        let values = {};

        for(let key of Object.keys(this.object)) {
            values[key] = this.object[key].value;
        }

        return values;
    }

    set value(values) {
        // Wo ist mein Object.isObject()??
        if(!typeof values === 'object') {
            throw new Error(
                'Unable to set object field value(s) from non-object!'
            );
        }

        for(let key of Object.keys(values)) {
            // TODO: Should we warn/error if we set keys that aren't
            // in field object?
            if(this.object.hasOwnProperty(key)) {
                this.object[key].value = values[key];
            }
        }
    }

    /**
    * Validate the form field
    */
    validate() {
        let valid = true;
       
        for(let key of Object.keys(this.object)) {
            let field = this.object[key];
            if(!field.validate()) {
                this._errors[key] = field.errors;
                valid = false;
            }
        }

        return valid;
    }

    /**
    * Refresh the validation state
    */
    refreshValidationState() {
        super.refreshValidationState();
        this._errors = {};
    }

    /**
    * 
    */
    postRender() {
        for(let key of Object.keys(this.object)) {
            this.object[key].postRender();
        }
    }

    getWidget() {
        return ObjectInput;
    }

    render() {
        return this.widget.renderObject(this.object);
    }

    /**
    * Property - get/set errors
    * @param {string} Error string
    */
    get errors() {
        return this._errors;
    }

    set errors(error) {
       this._errors = error;
    }
}