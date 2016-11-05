/*
    pug - fields/text.js
*/

'use strict';

import {Field} from './core';
import {TextInput} from '../widgets/text';

export class StringField extends Field {

    getWidget() {
        return TextInput;
    }

}