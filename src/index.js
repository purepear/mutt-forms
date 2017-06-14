/**
* Mutt bootstapper
**/

'use strict'

// import MuttForm from './mutt'
import MuttConfig from './config'

function Mutt(schema, options, debug = false) {
    // Setup a new form instance if called directly
    //return new MuttForm(schema, options, debug)
    console.log('Setup form...')
}

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
}

initApi(Mutt)

Mutt.version = '__VERSION__'

export default Mutt
