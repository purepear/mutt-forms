/**
* Utilities to help
*/

import {jsdom} from 'jsdom'

const dom = jsdom.defaultLevel
const doc = jsdom('<html><body></body></html>', {
    features: {
        QuerySelector : true 
    }
})

const win = doc.defaultView

global.document = doc
global.window = win

Object.keys(window).forEach((key) => {
    if(!(key in global)) {
        global[key] = window[key]
    }
})