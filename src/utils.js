/**
 * @file Utilities
 */

'use strict'

import Mutt from './index'

/**
 * Function to provide mixin support to classes
 */
export function mixin(target, mixin) {
    target = target.prototype
    mixin = mixin.prototype

    Object.getOwnPropertyNames(mixin).forEach(
        function(name) {
            if(name !== 'constructor' && !target.hasOwnProperty(name)) {
                Object.defineProperty(
                    target,
                    name,
                    Object.getOwnPropertyDescriptor(mixin, name)
                )
            }
        }
    )
}

/**
 * Log a message to the console, used for debugging
 * @param message a message to be logged
 */
export function logger(message) {
    if(Mutt.config.getSetting('debug')) {
        console.log('Mutt :: ', message)
    }
}
