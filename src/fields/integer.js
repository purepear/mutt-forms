/*
    pug - fields/integer.js
*/

'use strict';

import {Field} from './core';
import {NumberInput} from '../widgets/numbers';
import {IntegerValidator} from '../validators/core';


export class IntegerField extends Field {

	constructor({id, name, label = null, initial = null, widget = null,
        validators = [], attribs = {}, description = null, options = {},
        order = null}) {

		super({id, name, label, initial, widget, validators, attribs,
            description, options, order});

		// Always append an integer validator
		this.validators.push(new IntegerValidator());
	}

	/**
    * Property - get/set value
    */
    get value() {
        let value = this.widget.getValue();

        // Widgets deal with the HTML value, which
        // can not represent an integer. Coerce to
        // the expected type
        return parseInt(value);
    }

    set value(value) {
        this.widget.setValue(value);
    }

	/**
	*
	*/
    getWidget() {
        return NumberInput;
    }

}