/*
* Widget Tests
*/

'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import {Widget} from '../../../../src/widgets/core'
import {IntegerField} from '../../../../src/fields/number'
import {NumberInput, CurrencyInput} from '../../../../src/widgets/numbers'

describe('CurrencyInputWidget', function() {
    var TestField, TestWidget

    beforeEach('create an CurrencyInput instance', function() {
        jsdom()

        TestField = new IntegerField({
            id: 'test-int',
            name: 'TestInt',
            label: 'Test Integer Field'
        })

        TestWidget = new CurrencyInput(
            TestField,
            'currency',
            'test-widget',
            'TestWidget',
            'Test Widget'
        )
    })

    describe('#setValue()', function() {
        it('sets the correct value', function() {
            TestWidget.setValue(100)
            expect(TestWidget.value).to.equal(100)
            TestWidget.setValue(0)
            expect(TestWidget.value).to.equal(0)
        })
    })

    describe('#getValue()', function() {
        it('gets the correct value once set but not rendered', function() {
            TestWidget.setValue(100)
            expect(TestWidget.getValue()).to.equal(100)
            TestWidget.setValue(0)
            expect(TestWidget.getValue()).to.equal(0)
        })
    })
})
