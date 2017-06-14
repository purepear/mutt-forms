/**
 * @file Utilities
 */

'use strict'

import Mutt from './index'

/**
 * Function to provide mixin support ot classes
 */
export function mixin(baseClass, ...mixins) {
    let base = class _Combined extends baseClass {
        constructor(...args) {
            super(...args)
            mixins.forEach((mixin) => {
                if(mixin.prototype.hasOwnProperty('init')) {
                    mixin.prototype.init.call(this)
                }
            })
        }
    }

    let copyProps = (target, source) => {
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
                if(prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
                    return
                }

                Object.defineProperty(
                    target,
                    prop,
                    Object.getOwnPropertyDescriptor(source, prop)
                )
            })
    }

    mixins.forEach((mixin) => {
        copyProps(base.prototype, mixin.prototype)
        copyProps(base, mixin)
    })

    return base
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
