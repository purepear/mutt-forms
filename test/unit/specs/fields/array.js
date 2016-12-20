/*
* ArrayField Tests
*/

'use strict'

import {assert, expect} from 'chai'
import {ArrayField} from '../../../../src/fields/array'
import {TextField} from '../../../../src/fields/text'
import {ArrayInput} from '../../../../src/widgets/array'

describe('ArrayField', function() {
    var TestArrayField

    beforeEach('create an ArrayField instance', function() {
        TestArrayField = new ArrayField({
            id: 'test-array', 
            name: 'TestArray', 
            label: 'Test Array Field',
            items: {
                type: 'string',
                title: 'Array Item'
            }
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
    })

    describe('#getWidget()', function() {
        it('should return ArrayInput widget', function() {
            expect(TestArrayField.getWidget()).to.equal(ArrayInput)
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