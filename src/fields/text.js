/**
* @file Text Field
*/

'use strict'

import MuttRegistry from '../registry'
import {Field} from './core'
import {TextInput} from '../widgets/text'

/**
* String Field, used to input text values
* @class
*/
export class StringField extends Field {

    getWidget() {
        return TextInput
    }
}

MuttRegistry.registerField('string', StringField)
MuttRegistry.registerField('date', StringField)
MuttRegistry.registerField('datetime', StringField)