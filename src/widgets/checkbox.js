/**
* @file Checkbox Widgets
*/

'use strict'

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
        checkbox.setAttribute('id', this.getFieldId())
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('class', this.getFieldClass())
        checkbox.onchange = () => {
            this.setValue(!checkbox.hasAttribute('checked'))
        }

        if(this.value) {
            checkbox.setAttribute('checked', 'checked')
        }

        for(let attrib in this.attribs) {
            checkbox.setAttribute(attrib, this.attribs[attrib])
        }

        // Set the internal notification flag so
        // we know the field has now been rendered
        // to the stage
        this._rendered = true

        return checkbox
    }

    /**
     * Get the value of an element on the stage. This is the raw value
     * as specified in the HTML.
     * @returns {string} value of the element on the stage
     */
    getValue() {
        if(!this._rendered) {
            return this.value
        }

        if(this.getElement().hasAttribute('checked')) {
            return true
        }

        return false
    }

    /**
     * Set the value of an element on the stage. This can be a true
     * of false value. Additionally this will also notify the label
     * as the label is often used as a styling proxy.
     * @param {boolean} value - turn the checkbox on/off
     */
    setValue(value) {
        this.value = value

        if(!this._rendered) {
            return
        }

        let element = this.getElement()

        if(element) {
            let label = this.getElementLabel()

            if(this.value) {
                element.setAttribute('checked', 'checked')

                if(label) {
                    label.classList.add('mutt-field-checkbox-checked')
                }
            } else {
                element.removeAttribute('checked')

                if(label) {
                    label.classList.remove('mutt-field-checkbox-checked')
                }
            }
        }
    }

    /**
     * Get the class name for the widget element
     * @returns {string} the class to use for the field element
     */
    getFieldClass() { return 'mutt-field mutt-field-checkbox' }

    /**
     * Get the checkbox ID
     */
    getFieldId() {
        return `${this.id}-checkbox`
    }
}

/**
 * CheckboxList
 * @class
 */
export class CheckboxList extends CheckboxInput{

    constructor(field, type, id, name, label, attribs, options, value) {
        super(field, type, id, name, label, attribs, options, value)
        this.choices = []
    }

// TODO: RenderField for normal HTML DOM Stuff
    getValue() {
        if(!this._rendered) {
            return this.value
        }

        let element = this.getElement()

        if(!element) {
            throw new Error('Unable to get element!')
        }

        this.value = element.value

        return this.value
    }

    setValue(value) {

        // This needs to get the element from
        this.value = value

        if(!this._rendered) {
            return
        }

        let element = this.getElement()

        if(element) {
            let label = this.getElementLabel()

            if(this.value) {
                element.setAttribute('checked', 'checked')

                if(label) {
                    label.classList.add('mutt-field-checkbox-checked')
                }
            } else {
                element.removeAttribute('checked')

                if(label) {
                    label.classList.remove('mutt-field-checkbox-checked')
                }
            }
        }
    }

    /**
     *
     * @params {array}
     */
    setChoices(choices) {
        this.choices = choices
    }

    /**
     * Get the choices used by the widget
     * @returns {array} choice pair array
     */
    getChoices() {
        return this.choices
    }
}