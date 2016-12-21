/*
* Core Field Tests
*/

'use strict'

import {assert, expect} from 'chai'
import MuttConfig from '../../../../src/config'
import {Field} from '../../../../src/fields/core'
import {TextInput, HiddenInput} from '../../../../src/widgets/text'
import {RequiredValidator} from '../../../../src/validators/core'

describe('Field', function() {
    var TestField

    beforeEach('create an Field instance', function() {
        TestField = new Field({
            config: new MuttConfig(),
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
                config: new MuttConfig(),
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

    describe('#new()', function() {
        it('return a field with configured attributes', function() {
            let schema = {type: 'string'}
            let field = Field.new(
                new MuttConfig(),
                'test-id', 
                'test-name', 
                schema
            )

            expect(field.id).to.equal('test-id')
            expect(field.name).to.equal('test-name')
            expect(field.type).to.equal('string')
            expect(field.validators.length).to.equal(0)
        })

        it('return a field as required', function() {
            let schema = {type: 'string'}
            let requiredField = Field.new(
                new MuttConfig(),
                'test-id', 
                'test-name', 
                schema, 
                {}, 
                null, 
                true
            )

            expect(requiredField.validators.length).to.equal(1)
            expect(requiredField.validators[0].constructor).to.equal(
                RequiredValidator
            )

            // Check the option config
            let optionsRequiredField = Field.new(
                new MuttConfig(),
                'test-id', 
                'test-name', 
                schema, 
                {required: true}
            )

            expect(optionsRequiredField.validators.length).to.equal(1)
            expect(
                optionsRequiredField.validators[0].constructor
            ).to.equal(RequiredValidator)
        })
    })
})