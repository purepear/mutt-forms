/*
    pug - fields/text.js
*/

'use strict'

import PugRegistry from '../registry'
import {Field} from './core'
import {TextInput} from '../widgets/text'

export class StringField extends Field {

    getWidget() {
        return TextInput
    }
}

PugRegistry.registerField('string', StringField)
PugRegistry.registerField('date', StringField)
PugRegistry.registerField('datetime', StringField)