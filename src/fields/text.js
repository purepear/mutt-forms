/**
* @file Text Field
*/

'use strict'

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
