/**
 * Mutt API Tests
 */

'use strict'

import Mutt from '../src/index'
import MuttForm from '../src/mutt'
import MuttConfig from '../src/config'

class MyTestField {}
class MyTestWidget {}

describe('Mutt API', () => {
    test('returns a instance of a mutt form', () => {
        expect(typeof Mutt).toEqual('function')
        let form = new Mutt({})
        expect(form.constructor).toBe(MuttForm)
    })

    test('has a version specified', () => {
        expect(Mutt.hasOwnProperty('version')).toEqual(true)
        expect(Mutt.version).toEqual('1.10.0')
    })

    test('has a config specified', () => {
        expect(Mutt.hasOwnProperty('config')).toEqual(true)
        expect(Mutt.config.constructor).toEqual(MuttConfig)
    })

    test('has a use method for extension', () => {
        expect(Mutt.hasOwnProperty('use')).toEqual(true)
        expect(typeof Mutt.use).toEqual('function')
    })

    test('can install a plugin to add a setting', () => {
        let plugin = {
            install: function() {
                return [null, null, {test: 'test setting'}]
            }
        }
        expect(Mutt.config.getSetting('test')).toEqual(null)
        Mutt.use(plugin)
        expect(Mutt.config.getSetting('test')).toEqual('test setting')
    })

    test('can install a plugin to add a field type', () => {
        let plugin = {
            install: function() {
                return [{'test': MyTestField}, null, null]
            }
        }
        expect(Mutt.config.hasField('test')).toEqual(false)
        Mutt.use(plugin)
        expect(Mutt.config.hasField('test')).toEqual(true)
    })

    test('can install a plugin to add a widget type', () => {
        let plugin = {
            install: function() {
                return [null, {'test': MyTestWidget}, null]
            }
        }
        expect(Mutt.config.hasWidget('test')).toEqual(false)
        Mutt.use(plugin)
        expect(Mutt.config.hasWidget('test')).toEqual(true)
    })
})
