/*
    pug - fields/choice.js
*/

'use strict'

import {Field} from './core'
import {SelectInput} from '../widgets/select'

export class ChoiceField extends Field {

    constructor({id, name, label = null, initial = null, widget = null,
        validators = [], attribs = {}, description = null, options = {},
        order = null, choices = []}) {
        super({
            id,
            name,
            label,
            initial,
            widget,
            validators,
            attribs,
            description,
            options,
            order
        })

        this.choices = choices

        if(options.hasOwnProperty('choices')) {
            this.choices = options.choices
        }

        this.widget.setChoices(this.choices)
    }

    getWidget() {
        return SelectInput
    }
}
