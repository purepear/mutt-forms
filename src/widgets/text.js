/**
* @file Text input widget interface
* @copyright Bought By Many 2016
*/

'use strict'

import PugRegistry from '../registry'
import {Widget} from './core'

/**
* TextInput - Standard HTML text input
* @class
* @namespace Widgets
*/
export class TextInput extends Widget {

    /**
    * Render the text input field
    * @returns {HTMLElement} render the input widget
    */
    renderField() {
        let textInput = document.createElement('input')
        textInput.setAttribute('name', this.name)
        textInput.setAttribute('type', 'text')
        textInput.setAttribute('value', (this.value) ? this.value : '')
        textInput.setAttribute('class', this.getFieldClass())

        for(let attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib])
        }

        return textInput
    }

    /**
    * Get the class name for the widget element
    */
    getFieldClass() { return 'pug-field pug-field-text' }
}

PugRegistry.registerWidget('text', TextInput)

/**
* TextAreaInput - Standard HTML textarea input
* @class
* @namespace Widgets
*/
export class TextAreaInput extends Widget {

    /**
    * Render the text input field
    */
    renderField() {
        let textareaInput = document.createElement('textarea')
        textareaInput.setAttribute('name', this.name)
        textareaInput.setAttribute('class', this.getFieldClass())
        textareaInput.textContent = (this.value) ? this.value : ''

        for(let attrib in this.attribs) {
            textareaInput.setAttribute(attrib, this.attribs[attrib])
        }

        return textareaInput
    }

    /**
    * Get the class name for the widget element
    */
    getFieldClass() { return 'pug-field pug-field-text' }
}

PugRegistry.registerWidget('textarea', TextAreaInput)

/**
* EmailInput - Standard HTML text input
* @class
* @namespace Widgets
*/
export class EmailInput extends TextInput {

    /**
    * Render the text input field
    */
    renderField() {
        let textInput = document.createElement('input')
        textInput.setAttribute('name', this.name)
        textInput.setAttribute('type', 'email')
        textInput.setAttribute('value', (this.value) ? this.value : '')
        textInput.setAttribute('class', this.getFieldClass())

        for(let attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib])
        }

        return textInput
    }

    /**
    * Get the class name for the widget element
    */
    getFieldClass() { return 'pug-field pug-field-email' }
}

PugRegistry.registerWidget('email', EmailInput)

/**
* HiddenInput - Standard HTML hidden input
* @class
* @namespace Widgets
*/
export class HiddenInput extends Widget {

    /**
    * Render the text input field
    */
    renderField() {
        let textInput = document.createElement('input')
        textInput.setAttribute('name', this.name)
        textInput.setAttribute('type', 'hidden')
        textInput.setAttribute('value', (this.value) ? this.value : '')
        textInput.setAttribute('class', this.getFieldClass())

        for(let attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib])
        }

        return textInput
    }

    /**
    * Label is not used for hidden fields
    */
    renderLabel() {
        return null
    }

    /**
    * Errors are not shown for hidden fields
    */
    renderErrors() {
        return null
    }
}

PugRegistry.registerWidget('hidden', HiddenInput)

/**
* PasswordInput - Standard HTML password input
* @class
* @namespace Widgets
*/
export class PasswordInput extends TextInput {

    /**
    * Render the text input field
    */
    renderField() {
        let textInput = document.createElement('input')
        textInput.setAttribute('name', this.name)
        textInput.setAttribute('type', 'password')
        textInput.setAttribute('value', (this.value) ? this.value : '')
        textInput.setAttribute('class', this.getFieldClass())

        for(let attrib in this.attribs) {
            textInput.setAttribute(attrib, this.attribs[attrib])
        }

        return textInput
    }

    /**
    * Get the class name for the widget element
    */
    getFieldClass() { return 'pug-field pug-field-password' }
}

PugRegistry.registerWidget('password', PasswordInput)

/**
* DisplayWidget - Display only widget, this just shows the field as
* plain text. Typically used by the lock form utility.
*/
export function displayReadonlyValue(value) {
    let display = document.createElement('span')

    // TODO: Support for the class being set dynamically
    display.setAttribute('class', 'pug-field pug-field-display')
    display.textContent = value

    return display
}

/**
* DisplayWidget - Widget to display field as plain text
* @class
* @namespace Widgets
*/
export class DisplayWidget extends Widget {

    /**
    * Render the text input field
    */
    renderField() {
        return displayReadonlyValue(this.value)
    }

    /**
    * Get the class name for the widget element
    */
    getFieldClass() { return 'pug-field pug-field-display' }
}

PugRegistry.registerWidget('display', DisplayWidget)
