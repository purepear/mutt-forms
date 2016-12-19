/**
* @file Number input widget
*/

'use strict'

import MuttRegistry from '../registry'
import {Widget} from './core'

/**
* NumberInput - Standard HTML number input
* @class
*/
export class NumberInput extends Widget {

    /**
    * Render the text input field
    */
    renderField() {
        let textInput = document.createElement('input')
        textInput.setAttribute('name', this.name)
        textInput.setAttribute('type', 'number')
        textInput.setAttribute('inputmode', 'numeric')
        textInput.setAttribute('class', this.getFieldClass())
        textInput.setAttribute('value', (this.value) ? this.value : '')

        // iOS doesn't fire the numerical keyboard for an type="number"
        // by default, adding the pattern forces the numerical keyboard
        // to be fired over the alpha one
        textInput.setAttribute('pattern', '[0-9]*')

        for(let attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib])
        }

        return textInput
    }

    /**
    * Get the class name for the widget element
    */
    getFieldClass() { return 'mutt-field mutt-field-number' }
}

MuttRegistry.registerWidget('number', NumberInput)

/**
* CurrencyInput
* @class
*/
export class CurrencyInput extends Widget {

    /**
    * Render the text input field
    */
    renderField() {
        let textInput = document.createElement('input')
        textInput.setAttribute('name', this.name)
        textInput.setAttribute('type', 'text')
        textInput.setAttribute('class', this.getFieldClass())
        textInput.setAttribute('value', (this.value) ? this.value : '')

        for(let attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib])
        }

        return textInput
    }

    /**
    * Get the value of the field. This will remove a currency 
    * symbol and round to two decimal places.
    */
    getValue() {        
        let value = super.getValue()

        value = value.replace(/[£|$|€]/gi, '')
        value = parseFloat(value)
        value = value.toFixed(2)

        return parseFloat(value)
    }

    /**
    * Get the class name for the widget element
    */
    getFieldClass() { return 'mutt-field mutt-field-currency' }
}

MuttRegistry.registerWidget('currency', CurrencyInput)
