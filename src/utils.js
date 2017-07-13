/**
 * @file Utilities
 */

'use strict'

import Mutt from './index'

/**
 * Function to provide mixin support to classes
 */
export function mixin(target, source) {
    target = target.prototype
    source = source.prototype

    Object.getOwnPropertyNames(target).forEach(
        function(name) {
            if(name !== 'constructor') {
                Object.defineProperty(
                    source,
                    name,
                    Object.getOwnPropertyDescriptor(target, name)
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
