/**
* @file Pug Utilities
* @copyright Bought By Many 2016
*/

'use strict';

/**
* Function to provide mixin support ot classes
*/
export function mixin(baseClass, ...mixins) {
    let base = class _Combined extends baseClass {
        constructor (...args) {
            super(...args);
            mixins.forEach((mixin) => {
                if(mixin.prototype.hasOwnProperty('init')) {
                    mixin.prototype.init.call(this);
                }
            })
        }
    }

    let copyProps = (target, source) => {
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
                if(prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
                    return;
                }

                Object.defineProperty(
                    target, 
                    prop, 
                    Object.getOwnPropertyDescriptor(source, prop)
                );
            });
    }

    mixins.forEach((mixin) => {
        copyProps(base.prototype, mixin.prototype)
        copyProps(base, mixin)
    });

    return base;
}


/**
*
*/
export function logger() {

}
