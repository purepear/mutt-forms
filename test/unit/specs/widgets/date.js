/*
* Widget Tests
*/

'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import MuttConfig from '../../../../src/config'
import {Widget} from '../../../../src/widgets/core'
import {StringField} from '../../../../src/fields/text'
import {DateSelectionInput} from '../../../../src/widgets/date'

describe('DateSelectionInputWidget', function() {
    var TestField, TestWidget

    beforeEach('create an DateSelectionInputWidget instance', function() {
        jsdom()

        TestField = new StringField({
            config: new MuttConfig(),
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

    describe('#constructor()', function() {
        it('sets an initial date value', function() {
            let TestInitialWidget = new DateSelectionInput(
                TestField, 
                'string', 
                'test-widget', 
                'TestWidget', 
                'Test Widget',
                {}, {},
                '1990-01-01'
            )

            let date = JSON.stringify(new Date(1990, 0, 1))
            expect(JSON.stringify(TestInitialWidget.value)).to.equal(date)
        })
    })    

    describe('#setDateValue()', function() {
        it('sets a valid date value', function() {
            let date = new Date()
            TestWidget.setDateValue(date)
            // Convert to string for comparison
            expect(JSON.stringify(TestWidget.value)).to.equal(JSON.stringify(date))
        })

        it('sets a valid date value from a string', function() {
            let date = JSON.stringify(new Date(1990, 0, 1))
            TestWidget.setDateValue('1990-1-1')
            // Convert to string for comparison
            expect(JSON.stringify(TestWidget.value)).to.equal(date)
        })
    })

    describe('#render()', function() {
        it('renders the correct fields with inital values', function() {
            let TestInitialWidget = new DateSelectionInput(
                TestField, 
                'string', 
                'test-widget', 
                'TestWidget', 
                'Test Widget',
                {}, {},
                '2005-07-05'
            )

            let dateSelectionNode = TestInitialWidget.render()

            expect(
                dateSelectionNode.querySelectorAll('select').length
            ).to.equal(3)

            let daySelect = dateSelectionNode.querySelector(
                'select[name="TestWidget-day"]'
            )

            expect(daySelect.value).to.equal('05')

            let monthSelect = dateSelectionNode.querySelector(
                'select[name="TestWidget-month"]'
            )

            expect(monthSelect.value).to.equal('07')

            let yearSelect = dateSelectionNode.querySelector(
                'select[name="TestWidget-year"]'
            )

            expect(yearSelect.value).to.equal('2005')
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