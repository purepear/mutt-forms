/**
* @file Checkbox Widgets
*/

'use strict'

import PugRegistry from '../registry'
import {Widget} from './core'

/**
* CheckboxInput - Standard HTML checkbox
* @class
*/
export class CheckboxInput extends Widget {

    /**
    * Render the text input field
    * @returns {HTMLElement} returns the rendered HTML checkbox
    * input field
    */
    renderField() {
        let checkbox = document.createElement('input')
        checkbox.setAttribute('name', this.name)
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('class', this.getFieldClass())

        if(this.value) {
            checkbox.setAttribute('checked', 'checked')
        }

        for(let attrib in this.attribs) {
            checkbox.setAttribute(attrib, this.attribs[attrib])
        }

        return checkbox
    }

    /**
    * Get the class name for the widget element
    * @returns {string} the class to use for the field element
    */
    getFieldClass() { return 'pug-field pug-field-checkbox' }
}

PugRegistry.registerWidget('checkbox', CheckboxInput)
