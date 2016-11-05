/*
    pug - widgets/text.js
*/

'use strict';

import {Widget} from './core';

/**
* NumberInput - Standard HTML number input
*/
export class NumberInput extends Widget {

    /**
    * Render the text input field
    */
    renderField() {
        let value = this.getValue();
        let textInput = document.createElement('input');
        textInput.setAttribute('name', this.name);
        textInput.setAttribute('type', 'number');
        textInput.setAttribute('class', this.getFieldClass());
        textInput.setAttribute('value', (value) ? value : '');

        for(let attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib]);
        }

        return textInput;
    }

    /**
    * Get the class name for the widget element
    */
    getFieldClass() { return 'pug-field pug-field-text'; }

}
