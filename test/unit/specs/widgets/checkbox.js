/*
* Widget Tests
*/

'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import MuttConfig from '../../../../src/config'
import {Widget} from '../../../../src/widgets/core'
import {BooleanField} from '../../../../src/fields/boolean'
import {CheckboxInput} from '../../../../src/widgets/checkbox'

describe('CheckboxInputWidget', function() {
    var TestField, TestWidget

    beforeEach('create an CheckboxInput instance', function() {
        jsdom()

        TestField = new BooleanField({
            config: new MuttConfig(),
            id: 'test-bool', 
            name: 'TestBool', 
            label: 'Test Boolean Field'
        })

        TestWidget = new CheckboxInput(
            TestField, 
            'boolean', 
            'test-widget', 
            'TestWidget', 
            'Test Widget'
        )
    })

    describe('#setValue()', function() {
        it('sets the correct value', function() {
            TestWidget.setValue(true)
            expect(TestWidget.value).to.equal(true)
            TestWidget.setValue(false)
            expect(TestWidget.value).to.equal(false)
        })

        it('updates the label when set to true and removes when setting false', function() {
            let node = TestWidget.render()

            // Patch it in...
            document.querySelector('body').appendChild(node)
            let element = document.querySelector('#test-widget .mutt-field')
            let label = document.querySelector('#test-widget .mutt-label')

            TestWidget.setValue(true)
            expect(label.classList.contains('mutt-field-checkbox-checked')).to.equal(true)

            TestWidget.setValue(false)
            expect(label.classList.contains('mutt-field-checkbox-checked')).to.equal(false)
        })
    })

    describe('#getValue()', function() {
        it('gets the correct value once set but not rendered', function() {
            TestWidget.setValue(true)
            expect(TestWidget.getValue()).to.equal(true)
            TestWidget.setValue(false)
            expect(TestWidget.getValue()).to.equal(false)
        })

        it('gets the correct value once rendered', function() {
            let node = TestWidget.render()

            // Patch it in...
            document.querySelector('body').appendChild(node)
            let element = document.querySelector('#test-widget .mutt-field')

            TestWidget.setValue(true)
            expect(TestWidget.getValue()).to.equal(true)
            expect(element.hasAttribute('checked')).to.equal(true)

            TestWidget.setValue(false)
            expect(TestWidget.getValue()).to.equal(false)
            expect(element.hasAttribute('checked')).to.equal(false)
        })
    })
})