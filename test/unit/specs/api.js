/**
* Mutt API Tests
**/

'use strict'

import {expect} from 'chai'
import Mutt from '../../../src/index'
import MuttConfig from '../../../src/config'

class MyTestField {}
class MyTestWidget {}

describe('Mutt API', function() {

    it('has a version specified', function() {
        expect(Mutt.hasOwnProperty('version')).to.equal(true)
        expect(Mutt.version).to.equal('__VERSION__')
    })

    it('has a config specified', function() {
        expect(Mutt.hasOwnProperty('config')).to.equal(true)
        expect(Mutt.config.constructor).to.equal(MuttConfig)
    })

    it('has a use method for extension', function() {
        expect(Mutt.hasOwnProperty('use')).to.equal(true)
        expect(typeof Mutt.use).to.equal('function')
    })

    it('can install a plugin to add a setting', function() {
        let plugin = {
            install: function() {
                return [null, null, {test: 'test setting'}]
            }
        }

        expect(Mutt.config.getSetting('test')).to.equal(null)
        Mutt.use(plugin)
        expect(Mutt.config.getSetting('test')).to.equal('test setting')
    })

    it('can install a plugin to add a field type', function() {
        let plugin = {
            install: function() {
                return [{'test': MyTestField}, null, null]
            }
        }

        expect(Mutt.config.hasField('test')).to.equal(false)
        Mutt.use(plugin)
        expect(Mutt.config.hasField('test')).to.equal(true)
    })

    it('can install a plugin to add a widget type', function() {
        let plugin = {
            install: function() {
                return [null, {'test': MyTestWidget}, null]
            }
        }

        expect(Mutt.config.hasWidget('test')).to.equal(false)
        Mutt.use(plugin)
        expect(Mutt.config.hasWidget('test')).to.equal(true)
    })

})
