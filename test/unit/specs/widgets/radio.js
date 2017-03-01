'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import MuttConfig from '../../../../src/config'
import RadioInputList from '../../../../src/widgets/radio'

describe('RadioInputListWidget', function() {
    var TestField, TestWidget

    beforeEach('create an CheckboxInput instance', function() {
        jsdom()

        TestField = new ChoiceField({
            config: new MuttConfig(),
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