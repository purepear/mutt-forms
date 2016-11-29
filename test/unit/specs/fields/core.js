/*
* Core Field Tests
*/

'use strict'

import {assert} from 'chai'
import {Field} from '../../../../src/fields/core'
import {TextInput, HiddenInput} from '../../../../src/widgets/text'

describe('Field', function() {
    var TestField

    beforeEach('create an Field instance', function() {
        TestField = new Field({
            id: 'test-field', 
            name: 'TestField', 
            label: 'Test Field'
        })
    })

    describe('#refreshValidationState()', function() {
        it('reset the validation state of the field & widget', function() {
            TestField._errors.push('Test Error')
            TestField.widget.errors.push('Test Error')

            TestField.refreshValidationState(false)

            assert.equal(0, TestField._errors.length)
            assert.equal(0, TestField.widget.errors.length)
        })
    })

    describe('#getWidget()', function() {
        it('return the base widget used for the field', function() {
            assert.equal(TextInput, TestField.getWidget())
            
            let AnotherTestField = new Field({
                id: 'test-field', 
                name: 'TestField', 
                label: 'Test Field',
                widget: HiddenInput
            })

            // Overides should be applied but this function only returns
            // the default
            assert.equal(TextInput, AnotherTestField.getWidget())
            assert.equal(HiddenInput, AnotherTestField.widget.constructor)
        })
    })

    describe('#getSortOrder()', function() {
        it('return the order value', function() {
            assert.equal(null, TestField.getSortOrder())
            TestField.setSortOrder(1)
            assert.equal(1, TestField.getSortOrder())
        })
    })

    describe('#setSortOrder()', function() {
        it('alter the order value', function() {
            assert.equal(null, TestField.sortOrder)
            TestField.setSortOrder(1)
            assert.equal(1, TestField.sortOrder)
        })
    })

    describe('#toString()', function() {
        it('return a string representation of the field', function() {
            assert.equal('Field <TestField field>', TestField.toString())
        })
    })
})