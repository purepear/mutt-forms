/**
 * @file Main Mutt API
 * @author Nick Snell <nick@boughtbymany.com>
 * @copyright Bought By Many 2017
 */

'use strict'

import MuttForm from './mutt'
import MuttConfig from './config'
import {logger} from './utils'

import * as fields from './fields'
import * as widgets from './widgets'
import * as validators from './validators'

export {fields, widgets, validators}

/**
 * Main Mutt API.
 * @returns {MuttForm} Returns an instance of a MuttForm
 * @example
 * let form = new Mutt({name: {type: 'string'}})
 */
function Mutt(schema, options, debug = false) {
    if(debug) {
        this.config.setSetting('debug', true)
    }

    // Setup a new form instance if called directly
    return new MuttForm(schema, options)
}

/**
 * Internal setup for Mutt API
 * @private
 */
function initApi(Mutt) {
    // Setup the config
    let config = new MuttConfig()
    Mutt.config = config

    // Setup plugin interface
    Mutt.use = function(plugins) {
        if(!Array.isArray(plugins)) {
            plugins = [plugins]
        }

        for(let plugin of plugins) {
            Mutt.config.use(plugin)
        }
    }

    // Setup Utilities
    Mutt.logger = logger
}

initApi(Mutt)

Mutt.version = '__VERSION__'

export default Mutt
