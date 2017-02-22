/**
 * @file Boolean Field
 */

'use strict'

import {Field} from './core'
import {Button} from '../widgets/button'

/**
 * Boolean field, used to capture true/false inputs
 * @class
 */
export class ButtonField extends Field {
    /**
     * Get the widget for the field
     * @returns {Widget}
     */
    getWidget() {
        return Button
    }
}
