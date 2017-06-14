/*
* Widget Tests
*/

'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import {Widget} from '../../../../src/widgets/core'
import {StringField} from '../../../../src/fields/text'
import {ArrayField} from '../../../../src/fields/array'
import {ArrayInput} from '../../../../src/widgets/array'

describe('ArrayInputWidget', function() {
    var FieldSpec, TestField, TestWidget

    beforeEach('create an ArrayInput instance', function() {
        jsdom()

        FieldSpec = {
            id: 'test-array',
            name: 'TestArray',
            label: 'Test Array Field',
            items: {
                type: 'string',
                title: 'Name'
            }
        }

        TestField = new ArrayField(FieldSpec)

        TestWidget = new ArrayInput(
            TestField,
            'array',
            'test-widget',
            'TestWidget',
            'Test Widget'
        )
    })
})
