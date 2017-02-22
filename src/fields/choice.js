/**
* @file Choice Field
*/

'use strict'

import {Field} from './core'
import {SelectInput} from '../widgets/select'
import {CheckboxList} from '../widgets/checkbox'

/**
* Choice Field, used as a base to capture inputs from
* a range of values
* @class
*/
export class ChoiceField extends Field {

    constructor({config, id, name, label = null, initial = null, widget = null,
        validators = [], attribs = {}, description = null, options = {},
        order = null, parent = null, choices = []}) {
        super({
            config,
            id,
            name,
            label,
            initial,
            widget,
            validators,
            attribs,
            description,
            options,
            order,
            parent
        })

        this.choices = choices

        if(options.hasOwnProperty('choices')) {
            this.choices = options.choices
        }

        this.widget.setChoices(this.choices)
    }

    /**
    * Get the widget used to display the field
    * @returns {SelectInput} widget to display
    */
    getWidget() {
        return SelectInput
    }
}

export class MultipleChoiceField extends ChoiceField {

    constructor({config, id, name, label = null, initial = null, widget = null,
        validators = [], attribs = {}, description = null, options = {},
        order = null, parent = null, choices = []}) {
        super({
            config,
            id,
            name,
            label,
            initial,
            widget,
            validators,
            attribs,
            description,
            options,
            order,
            parent
        })

        this.choices = choices

        if(options.hasOwnProperty('choices')) {
            this.choices = options.choices
        }

        this.widget.setChoices(this.choices)
    }

    /**
     * Get the widget used to display the field
     * @returns {SelectInput} widget to display
     */
    getWidget() {
        return CheckboxList
    }
}