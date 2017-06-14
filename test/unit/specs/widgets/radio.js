'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import RadioInputList from '../../../../src/widgets/radio'

describe('RadioInputListWidget', function() {
    var TestField, TestWidget

    beforeEach('create an CheckboxInput instance', function() {
        jsdom()

        TestField = new ChoiceField({
            id: 'test-choice',
            name: 'TestChoice',
            label: 'Test Choice Field'
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

    })
})
