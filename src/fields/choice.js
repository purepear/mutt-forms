/**
* @file Choice Field
*/

'use strict'

import MuttRegistry from '../registry'
import {Field} from './core'
import {SelectInput} from '../widgets/select'

/**
* Choice Field, used as a base to capture inputs from
* a range of values
* @class
*/
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

    /**
    * Get the widget used to display the field
    * @returns {SelectInput} widget to display
    */
    getWidget() {
        return SelectInput
    }
}

MuttRegistry.registerField('enum', ChoiceField)
