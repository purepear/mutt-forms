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
        this._rendered = false
        if(!this.value){
            this.value = []
        }
        this.options = options
    }

    renderField() {

        let list = document.createElement('ul')
        list.setAttribute('id', this.getFieldId())

        for(let choice in this.choices){
            let listItem = document.createElement('li')
            let checkbox = document.createElement('input')
            let label = document.createElement('label')

            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('name', this.name)
            checkbox.setAttribute('class', this.getFieldClass())
            checkbox.setAttribute('data-index', choice)

            checkbox.setAttribute('id', this.id + choice)
            label.setAttribute('for', this.id + choice)

            if(this.options['choices']){
                if(this.options['choices'][choice][1]){
                    label.textContent = this.options['choices'][choice][1]
                }
            }

            checkbox.onchange = () => {
                this.setValueByIndex(!checkbox.hasAttribute('checked'), checkbox.getAttribute('data-index'))
            }

            if(this.value[choice]) {
                checkbox.setAttribute('checked', 'checked')
            }

            for(let attrib in this.attribs) {
                checkbox.setAttribute(attrib, this.attribs[attrib])
            }

            listItem.appendChild(checkbox)
            listItem.appendChild(label)
            list.appendChild(listItem)
        }

        this._rendered = true

        return list
    }

    getValueByIndex(index) {

        if(!this._rendered){
            return this.value[index]
        }

        let element = this.getElementByIndex(index)

        if(!element) {
            throw new Error('Unable to get element!')
        }

        if(element.hasAttribute('checked')){
            this.value = true
        } else {
            this.value = false
        }

        return this.value
    }

    getValue(){

        if(!this._rendered){
            return this.value
        }

        let elements = this.getAllElements()

        if(!elements) {
            throw new Error('Unable to get elements!')
        }

        for(let index in Array.from(elements)) {
            if(elements[index].hasAttribute('checked')){
                this.value[index] = true
            } else {
                this.value[index] = false
            }
        }

        return this.value
    }

    //{string, int}
    setValueByIndex(value, index) {

        if(!this._rendered){
            this.value[index] = value
            return
        }

        this.value[index] = value
        let element = this.getElementByIndex(index)
        if(element) {
            if(this.value[index]) {
                element.setAttribute('checked', 'checked')
            } else {
                element.removeAttribute('checked')
            }
        }
    }

    // {array}
    setValue(value){

        if(!this._rendered){
            this.value = value
            return
        }

        this.value = value
        let elements = this.getAllElements()

        if(value.length == elements.length){
            if(elements){
                elements[0].setAttribute('checked', 'checked')

                for(let index in Array.from(elements)) {
                    if(this.value[index]){
                        elements[parseInt(index)].setAttribute('checked', 'checked')
                    } else {
                        elements[parseInt(index)].removeAttribute('checked')
                    }
                }
            }
        } else {
            new Error('Array Length does not match number of Elements in CheckboxList')
        }

    }

    setChoices(choices) {
        for(let index in choices){
            if(typeof this.value[index] === 'undefined'){
                this.value[index] = false
            }
        }

        this.choices = choices
    }

    getFieldId() {
        return `${this.id}-checkbox`
    }

    getChoices() {
        return this.choices
    }
}