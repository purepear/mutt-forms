/**
* @file Array Widgets
*/

'use strict'

import MuttRegistry from '../registry'
import {Widget} from './core'

/**
* ArrayInput - Render a list of fields
* @class
*/
export class ArrayInput extends Widget {

    /**
    * Render the list of input fields
    * @params {array} fields - a list of Field objects to render
    * @returns {HTMLElement} returns a HTML fragment containing
    * all rendered fields
    */
    renderList(fields) {
        // Create a fragment for our widget
        let widgetFragment = document.createDocumentFragment()

        let wrapper = this.renderWrapper()

        fields.sort(function(a, b) {
            return a.getSortOrder() - b.getSortOrder()
        })

        for(let field of fields) {
            let renderedField = field.render()
            wrapper.appendChild(renderedField)
        }

        widgetFragment.appendChild(wrapper)

        return widgetFragment
    }

    /**
    * @throws render is not supported on Arrays - renderList must be used
    */
    render() {
        throw new Error('ArrayInput must render as a list - use renderList')
    }

    /**
    * @throws renderLabel is not supported on array fields
    */
    renderLabel() {
        throw new Error('ArrayInput does not support a label!')
    }

    /**
    * Get the class name for the widget element
    * @returns {string} the class to use for the field element
    */
    getFieldClass() { return 'mutt-field mutt-field-array' }

    /**
    *
    */
    getElement() {
        throw new Error('Unable to get element on an array field!')
    }

    /**
    *
    */
    getElementByIndex(index) {
        return this
            .getElementWrapper()
            .querySelector(`#${this.id}_item_${index}`)
    }

    /**
    *
    */
    addSlot(field) {
        let renderedField = field.render()
        let wrapper = this.getElementWrapper()
        wrapper.appendChild(renderedField)
    }

    /**
    *
    */
    removeSlot() {
        let lastFieldIndex = this._field.slots.length
        let lastField = this.getElementByIndex(lastFieldIndex)
        this.getElementWrapper().removeChild(lastField)
    }
}

MuttRegistry.registerWidget('array', ArrayInput)
