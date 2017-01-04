/*
* ObjectField Tests
*/

'use strict'

import {expect} from 'chai'
import MuttConfig from '../../../../src/config'
import {ObjectField} from '../../../../src/fields/object'
import {TextField} from '../../../../src/fields/text'
import {ObjectInput} from '../../../../src/widgets/object'
import {RequiredValidator} from '../../../../src/validators/core'

describe('ObjectField', function() {
    var TestObjectField

    beforeEach('create an ObjectField instance', function() {
        TestObjectField = new ObjectField({
            config: new MuttConfig(),
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

        it('sets parent on basic child fields', function() {
            let testParent = new ObjectField({
                config: new MuttConfig(),
                id: 'test-object', 
                name: 'TestObject', 
                label: 'Test Object Field',
                properties: {
                    item1: {
                        type: 'string',
                        title: 'Item 1'
                    },
                    item2: {
                        type: 'integer',
                        title: 'Item 2'
                    },
                    item3: {
                        type: 'boolean',
                        title: 'Item 3'
                    },
                    item4: {
                        type: 'enum',
                        title: 'Item 4'
                    }
                },
                required: ['item1']
            })
            
            expect(testParent.getFieldByPath('item1').parent.id).to.equal(testParent.id)
            expect(testParent.getFieldByPath('item2').parent.id).to.equal(testParent.id)
            expect(testParent.getFieldByPath('item3').parent.id).to.equal(testParent.id)
            expect(testParent.getFieldByPath('item4').parent.id).to.equal(testParent.id)
        })
    })
})