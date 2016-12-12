/*
* ObjectField Tests
*/

'use strict'

import {expect} from 'chai'
import {ObjectField} from '../../../../src/fields/object'
import {TextField} from '../../../../src/fields/text'
import {ObjectInput} from '../../../../src/widgets/object'
import {RequiredValidator} from '../../../../src/validators/core'

describe('ObjectField', function() {
    var TestObjectField

    beforeEach('create an ObjectField instance', function() {
        TestObjectField = new ObjectField({
            id: 'test-object', 
            name: 'TestObject', 
            label: 'Test Object Field',
            properties: {
                item1: {
                    type: 'string',
                    title: 'Item 1'
                },
                item2: {
                    type: 'string',
                    title: 'Item 2'
                }
            },
            required: ['item1']
        })
    })    

    describe('#constructor()', function() {
        it('return field with children marked as required', function() {
            expect(TestObjectField.object.item1.validators.length).to.equal(1)
            expect(
                TestObjectField.object.item1.validators[0].constructor
            ).to.equal(RequiredValidator)
        })
    })
})