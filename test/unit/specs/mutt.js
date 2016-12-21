/*
* Mutt Tests
*/

'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import Mutt from '../../../src/mutt'
import {NaturalTextInput} from '../../../src/widgets/text'

class TestPlugin {
    availableFields() {
        return {}
    }

    availableWidgets() {
        return {
            testing: NaturalTextInput
        }
    }
}

describe('Mutt', function() {

    beforeEach('setup mutt support', function() {
        jsdom()
    })

    describe('#constructor()', function() {
        it('sets up plugins correctly', function() {
            let plugins = [
                new TestPlugin()
            ]

            let form = new Mutt(
                document.getElementsByTagName('body')[0],
                {},
                {},
                null,
                false,
                plugins
            )

            expect(form.config.getWidget('testing')).to.equal(NaturalTextInput)

        })
    })
})