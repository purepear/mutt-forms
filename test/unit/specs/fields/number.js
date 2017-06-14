/*
* IntegerField Tests
*/

'use strict'

import {assert, expect} from 'chai'
import jsdom from 'mocha-jsdom'
import {IntegerField} from '../../../../src/fields/number'
import {NumberInput, CurrencyInput} from '../../../../src/widgets/numbers'

describe('IntegerField', function() {
    var FieldSpec, TestIntegerField

    jsdom()

    beforeEach('create an IntegerField instance', function() {
        FieldSpec = {
            id: 'test-integer',
            name: 'TestInteger',
            label: 'Test Integer Field'
        }

        TestIntegerField = new IntegerField(FieldSpec)
    })

})
