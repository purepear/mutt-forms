/*
* ArrayField Tests
*/

'use strict'

import {assert, expect} from 'chai'
import jsdom from 'mocha-jsdom'
import {ArrayField} from '../../../../src/fields/array'
import {StringField} from '../../../../src/fields/text'
import {ArrayInput} from '../../../../src/widgets/array'

describe('ArrayField', function() {
    var FieldSpec, TestArrayField

    jsdom()

    beforeEach('create an ArrayField instance', function() {
        FieldSpec = {
            id: 'test-array',
            name: 'TestArray',
            label: 'Test Array Field',
            items: {
                type: 'string',
                title: 'Name'
            }
        }

        TestArrayField = new ArrayField(FieldSpec)
    })

    describe('#constructor()', function() {
        it('should return a valid set of slots', function() {
            let spec = {
                type: 'array',
                name: 'TestArray',
                items: {
                    type: 'string',
                    title: 'Testing'
                }
            }

            let TestArrayConstruct = new ArrayField(spec)

            expect(TestArrayConstruct.slots.length).to.equal(1)
            expect(TestArrayConstruct.slots[0].constructor).to.equal(StringField)
            expect(TestArrayConstruct.slots[0].label).to.equal('Testing')
        })
    })

    describe('#addSlot()', function() {
        it('should add a new slot to the array field', function() {
            assert.equal(1, TestArrayField.slots.length)
            TestArrayField.addSlot(false)
            assert.equal(2, TestArrayField.slots.length)
            TestArrayField.addSlot(false)
            assert.equal(3, TestArrayField.slots.length)
        })
    })

    describe('#removeSlot()', function() {
        it('should remove a slot from the array field', function() {
            assert.equal(1, TestArrayField.slots.length)
            let success = TestArrayField.removeSlot(false)
            assert.equal(0, TestArrayField.slots.length)
            assert.equal(true, success)
        })

        it('should return false when unable to remove a slot', function() {
            assert.equal(1, TestArrayField.slots.length)
            TestArrayField.removeSlot(false)
            assert.equal(0, TestArrayField.slots.length)
            let result = TestArrayField.removeSlot(false)
            assert.equal(false, result)
        })
    })

    describe('#spliceSlot()', function() {
        it('should splice a slot from the array field', function() {
            expect(TestArrayField.slots.length).to.equal(1)

            TestArrayField.addSlot(false)
            TestArrayField.addSlot(false)

            expect(TestArrayField.slots.length).to.equal(3)

            TestArrayField.value = [
                'Test 1',
                'Test 2',
                'Test 3',
            ]

            let success = TestArrayField.spliceSlot(1, false)

            expect(TestArrayField.slots.length).to.equal(2)
            expect(success).to.equal(true)

            expect(TestArrayField.slots[0].value).to.equal('Test 1')
            expect(TestArrayField.slots[1].value).to.equal('Test 3')
        })

        it('removes a slot from the rendered widgets and rename remaining',
            function() {
                let NewFieldSpec = Object.assign({}, FieldSpec)
                NewFieldSpec.minItems = 3

                // Use a field to drive the widget interface
                let SpliceTestField = new ArrayField(NewFieldSpec)
                let element = SpliceTestField.render()

                let body = document.querySelector('body')
                body.appendChild(element)

                // Check there are 3 nodes in the parent
                expect(document.querySelector('#test-array').constructor)
                    .to.equal(window.HTMLDivElement)
                expect(document.querySelector('#test-array_item_1').constructor)
                    .to.equal(window.HTMLDivElement)
                expect(document.querySelector('#test-array_item_2').constructor)
                    .to.equal(window.HTMLDivElement)
                expect(document.querySelector('#test-array_item_3').constructor)
                    .to.equal(window.HTMLDivElement)

                // Splice the middle slot
                SpliceTestField.spliceSlot(2, true)

                expect(document.querySelector('#test-array').constructor)
                    .to.equal(window.HTMLDivElement)
                expect(document.querySelector('#test-array_item_1').constructor)
                    .to.equal(window.HTMLDivElement)
                expect(document.querySelector('#test-array_item_2').constructor)
                    .to.equal(window.HTMLDivElement)
                expect(document.querySelector('#test-array_item_3'))
                    .to.equal(null)

                // Check the names are as expected
                let field1 = document.querySelector('#test-array_item_1 .mutt-field')
                expect(field1.name).to.equal('TestArray_1')

                let field2 = document.querySelector('#test-array_item_2 .mutt-field')
                expect(field2.name).to.equal('TestArray_2')
            }
        )
    })

    describe('#getWidget()', function() {
        it('should return ArrayInput widget', function() {
            expect(TestArrayField.getWidget()).to.equal(ArrayInput)
        })
    })

    describe('#validate()', function() {
        it('should validate minItems', function() {
            let spec = {
                type: 'array',
                name: 'TestArray',
                minItems: 2,
                items: {
                    type: 'string'
                }
            }

            let TestArrayValidate = new ArrayField(spec)

            TestArrayValidate.value = ['one']
            expect(TestArrayValidate.validate()).to.equal(false)

            TestArrayValidate.value = ['one', 'two']
            expect(TestArrayValidate.validate()).to.equal(true)
        })

        it('should validate maxItems', function() {
            let spec = {
                type: 'array',
                name: 'TestArray',
                maxItems: 2,
                items: {
                    type: 'string'
                }
            }

            let TestArrayValidate = new ArrayField(spec)

            TestArrayValidate.value = ['one']
            expect(TestArrayValidate.validate()).to.equal(true)

            TestArrayValidate.value = ['one', 'two', 'three']
            expect(TestArrayValidate.validate()).to.equal(false)
        })
    })

    describe('Value property', function() {
        it('should return the correct value for the array field', function() {
            let returnedValue = TestArrayField.value
            assert.typeOf(returnedValue, 'array')
            assert.equal(1, returnedValue.length)
            assert.equal(null, returnedValue[0])
        })

        it('should set the correct value for the array field', function() {
            // Add some empty slots
            TestArrayField.addSlot(false)
            TestArrayField.addSlot(false)
            TestArrayField.addSlot(false)
            assert.equal(4, TestArrayField.slots.length)

            let testArray = ['This', 'is', 'a', 'Test']
            TestArrayField.value = testArray

            assert.equal(testArray[0], TestArrayField.value[0])
            assert.equal(testArray[3], TestArrayField.value[3])
        })
    })
})
