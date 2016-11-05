/**
* @file Array field
* @copyright Bought By Many 2016
*/

'use strict';

import {Field} from './core';
import {ArrayInput} from '../widgets/array';

/**
* Array is a complex field type, which is essentially a list
* of other fields.
* @class
* @namespace Fields
*/
export class ArrayField extends Field {

    /**
    *
    */
    constructor({id, name, label = null, initial = null, widget = null,
        validators = [], attribs = {}, description = null, options = {},
        items = {}, minItems = 1, maxItems = null}) {

        super({id, name, label, initial, widget, validators, attribs,
            description, options});

        // TODO: Sanity check min/max items

        this.minItems = minItems;
        this.maxItems = maxItems;
        this.itemSchema = items; // schema to make new items
        this.itemOptions = options;

        // We store the array fields in the slot
        this.slots = [];

        for(let i in Array.from(Array(this.minItems).keys())) {
            let position = parseInt(i) + 1;
            let fieldId = `${id}_item_${position}`;
            let fieldName = `${name}_${position}`;
            let field = this.constructor.new(
                fieldId,
                fieldName,
                this.itemSchema,
                // FIXME: This is a workaround, really should
                // get the correct option structure to this class
                this.itemOptions
            );

            this.slots.push(field);
        }

        // Store errors as an object
        this.errors = {};
    }

    /**
    * Property - get/set value
    */
    get value() {
        let valueArray = [];

        for(let slot of this.slots) {
            valueArray.push(slot.value);
        }

        return valueArray;
    }

    set value(value) {
        if(!Array.isArray(value)) {
            throw new Error('Unable to set array field value(s) from non-array!');
        }

        let fieldValueMap = this.slots.map(function(field, index) {
            return [field, value[index]];
        });

        for(let [field, value] in fieldValueMap) {
            field.value = value;
        }
    }

    /**
    * Validate the form field
    * @returns {bool} returns sucess or failure of validation
    */
    validate() {
        let valid = true;

        for(let field of this.slots) {
            if(!field.validate()) {
                this._errors[field.name] = field.errors;
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
    * Triggers post render call on all fields in array
    */
    postRender() {
        for(let field of this.slots) {
            field.postRender();
        }
    }

    /**
    *
    */
    getWidget() {
        return ArrayInput;
    }

    /**
    *
    */
    render() {
        return this.widget.renderList(this.slots);
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