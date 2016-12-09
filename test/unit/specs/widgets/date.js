/*
* Widget Tests
*/

'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import {Widget} from '../../../../src/widgets/core'
import {StringField} from '../../../../src/fields/text'
import {DateSelectionInput} from '../../../../src/widgets/date'

describe('DateSelectionInputWidget', function() {
    var TestField, TestWidget

    beforeEach('create an DateSelectionInputWidget instance', function() {
        jsdom()

        TestField = new StringField({
            id: 'test-string', 
            name: 'TestString', 
            label: 'Test String Field'
        })

        TestWidget = new DateSelectionInput(
            TestField, 
            'string', 
            'test-widget', 
            'TestWidget', 
            'Test Widget'
        )
    })

    describe('#setDateValue()', function() {
        it('sets a valid date value', function() {
            let date = new Date()
            TestWidget.setDateValue(date)
            expect(TestWidget.value).to.equal(date)
        })
    })

    /* describe('#getDateValue()', function() {
        it('return a valid date value', function() {
            let testValue = 'Test'
            TestWidget.value = testValue
            expect(TestWidget.getValue()).to.equal(testValue)
        })
    }) */
})