/**
 * @file Button Field
 */

'use strict'

import {Field} from './core'
import {ButtonWidget} from '../widgets/button'

/**
 * Button field, used to add custom actions to form elements
 * @class
 */
export class ButtonField extends Field {
    /**
     * Get the widget for the field
     * @returns {Widget}
     */
    getWidget() {
        return ButtonWidget
    }
}
