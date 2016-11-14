/*
* Widget Tests
*/

import {assert} from 'chai'
import {Widget} from '../../../../src/widgets/core'
import {StringField} from '../../../../src/fields/text'

describe('Widget', function() {
    var TestField, TestWidget

    beforeEach('create an TestWidget instance', function() {
        TestField = new StringField({
            id: 'test-string', 
            name: 'TestString', 
            label: 'Test String Field'
        })

        TestWidget = new Widget(
            TestField, 
            'string', 
            'test-widget', 
            'TestWidget', 
            'Test Widget'
        )
    })

    describe('#setValue()', function() {
        it('should allow for a value to be set before being rendered', function() {
            TestWidget.setValue('Test')
        })
    })

    describe('#getValue()', function() {
        it('should allow for a value to be returned', function() {
            let testValue = 'Test'
            TestWidget.value = testValue
            assert.equal(testValue, TestWidget.getValue())
        })
    })

})