/*
* ArrayField Tests
*/

import {assert} from 'chai'
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
                type: "string",
                title: "Array Item"
            }
        })
    })    

    describe('#addSlot()', function() {
        it('should add a new slot to the array field', function() {
            assert.equal(1, TestArrayField.slots.length)
            TestArrayField.addSlot()
            assert.equal(2, TestArrayField.slots.length)
            TestArrayField.addSlot()
            assert.equal(3, TestArrayField.slots.length)
        })
    })

    describe('#removeSlot()', function() {
        it('should remove a slot from the array field', function() {
            assert.equal(1, TestArrayField.slots.length)
            let success = TestArrayField.removeSlot()
            assert.equal(0, TestArrayField.slots.length)
            assert.equal(true, success)
        })

        it('should return false when unable to remove a slot', function() {
            assert.equal(1, TestArrayField.slots.length)
            TestArrayField.removeSlot()
            assert.equal(0, TestArrayField.slots.length)
            let success = TestArrayField.removeSlot()
            assert.equal(false, success)
        })
    })

    describe('#getWidget()', function() {
        it('should return ArrayInput widget', function() {
            assert.equal(ArrayInput, TestArrayField.getWidget())
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
            TestArrayField.addSlot()
            TestArrayField.addSlot()
            TestArrayField.addSlot()
            assert.equal(4, TestArrayField.slots.length)

            let testArray = ['This', 'is', 'a', 'Test']
            TestArrayField.value = testArray

            assert.equal(testArray[0], TestArrayField.value[0])
            assert.equal(testArray[3], TestArrayField.value[3])
        })
    })
})