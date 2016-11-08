/**
* A simple HTML form interface, with a squishy face.
* @file Standalone Pug build 
* @version 0.0.1
* @copyright Bought By Many 2016
*/

'use strict';

import {Fieldset} from './fieldsets/core';

import * as fields from './fields';
import * as widgets from './widgets';
import * as validators from './validators';
import * as PugRegistry from './registry';

export {fields, widgets, validators, PugRegistry};

export default class Pug {

    /**
    * Initialisation of a Pug form
    * @constructor
    * @param {HTMLElement} container Containing element for the Pug Form
    * @param {object} schema JSON Schema containing Form & Field Configuration
    * @param {object} options optional form configuration options
    * @param {function} callback optional callback for form submission
    * @param {boolean} debug debugging flag
    */
    constructor(container, schema, options = {}, callback = null, 
        debug = false) {

        if(container === null) {
            throw new Error(
                'You must pass a valid container to create a Pug form!'
            )
        }

        this.container = container;
        this.mulipart = false;
        this.callback = callback;
        this.id = null;
        this.debug = debug;
        this.locked = false;

        this.form = null;
        this.fieldsets = [];
        this.options = {};

        if(options && options.hasOwnProperty('form')) {
            this.options = options.form;
        }

        // Build the form from the config
        this.build(schema, options);
    }

    /**
    * Build the form fieldsets from the config. The default is
    * always to use one, however groups can be specified in the
    * from options
    * @param {object} JSON schema of form
    * @param {object} Optional options object for the form
    */
    build(schema, options = null) {
        // TODO: Allow build options override

        // If fieldsets is specfied in the form options we are
        // going to attempt to build multiple ones
        if(options.hasOwnProperty('fieldsets')) {
            let fieldsetIndex = 0;

            for(let fieldsetSpec of options.fieldsets) {
                let fieldsetFields = null;

                if(fieldsetSpec.hasOwnProperty('fields')) {
                    fieldsetFields = fieldsetSpec.fields;
                }

                if(fieldsetSpec.hasOwnProperty('fieldsets')) {
                    options.fieldsets = fieldsetSpec.fieldsets;
                }

                let fieldset = Fieldset.new(
                    schema, 
                    options, 
                    fieldsetFields,
                     `pug-fieldset-${fieldsetIndex}`
                );

                this.fieldsets.push(fieldset);
                fieldsetIndex++;
            }
        }
        else {
            let fieldset = Fieldset.new(schema, options);
            this.fieldsets.push(fieldset);
        }
    }

    /**
    * Get the data from the form
    * @returns {object} data object for the form
    */
    data() {
        let data = [];

        for(let fieldset of this.fieldsets) {
            data.push(fieldset.data());
        }

        // TODO: Yuck - fix.
        if(data.length == 1) {
            return data[0];
        }

        return data;
    }

    /**
    * Render the form
    * @returns {promise} a promise to be resolved once rendering 
    * is complete
    */
    render() {
        return new Promise((fulfill, reject) => {
            let formContainer = document.createDocumentFragment();
            this.form = document.createElement('form');

            if(this.id) {
                this.form.setAttribute('id', this.id);
            }

            this.form.setAttribute('method', 'POST');
            this.form.setAttribute('action', '');
            this.form.setAttribute('class', 'pug-form');

            if(this.mulipart) {
                this.form.setAttribute('enctype', 'multipart/form-data');
            }

            for(let fieldset of this.fieldsets) {
                let fieldsetElement = fieldset.render();
                this.form.appendChild(fieldsetElement);
            }

            // Add form controls
            let buttonClass = 'pug-button';
            let buttonText = 'Submit';

            // Check for button overide options
            if(this.options.hasOwnProperty('buttons')) {
                if(this.options.buttons.hasOwnProperty('class')) {
                    buttonClass = buttonClass + ' ' + this.options.buttons.class;
                }

                if(this.options.buttons.hasOwnProperty('text')) {
                    buttonText = this.options.buttons.text;
                }
            }

            let buttonWrapper = document.createElement('div');
            buttonWrapper.setAttribute('class', 'pug-button-wrapper');

            let button = document.createElement('button');
            button.setAttribute('class', buttonClass);
            button.setAttribute('type', 'submit');
            button.textContent = buttonText;
            button.onclick = (e) => {
                this.submit(e);
                return false;
            };

            buttonWrapper.appendChild(button);
            this.form.appendChild(buttonWrapper);

            // Build the form and render to the viewport
            formContainer.appendChild(this.form);
            this.container.appendChild(formContainer);

            // Form has been renderd to the stage, call
            // the post render hooks
            for(let fieldset of this.fieldsets) {
                fieldset.postRender();
            }

            fulfill(this);
        });
    }

    /**
    * Remove the form from the stage
    */
    destroy() {
        let form = this.container.querySelector('form');
        this.container.removeChild(form);
    }

    /**
    * Validate the form
    * @returns {bool} response to the validation request
    */
    validate() {
        let valid = true;
        let errors = [];

        for(let fieldset of this.fieldsets) {
            if(!fieldset.validate()) {
                errors.push(fieldset.errors);
                valid = false;
            }
        }

        this.log(
            `Validation Complete -> Status: ${valid} -> ${JSON.stringify(errors)}`
        );

        return valid;
    }

    /**
    * Redraw all of the error states on the stage
    */
    refreshValidationState() {
        for(let fieldset of this.fieldsets) {
            fieldset.refreshValidationState();
        }
    }

    /**
    * Submit handler for the form
    * @returns {bool} success or failure of submission
    */
    submit(event) {
        // We always validate prior to validateion
        let valid = false;

        try {
            valid = this.validate();
        } catch (e) {
            this.log('Unable to validate prior to submit!', e);
            return false;
        }

        if(valid) {
            this.log('Submit form');

            if(this.callback) {
                this.callback(this.data(), event);
            }
            else {
                this.form.submit();
            }

            return true;
        }

        return false;
    }

    /**
    * Lock a form, this changes all of the fields to a read only state
    */
    lock() {
        this.log('Locking form');

        for(let fieldset of this.fieldsets) {
            fieldset.lock();
        }
    }

    /**
    * Unlock a form, this can be used to restore a locked form to it's
    * editable state
    */
    unlock() {
        this.log('Unlocking form');

        for(let fieldset of this.fieldsets) {
            fieldset.unlock();
        }
    }

    /**
    * Set the ID for the form - this is used for rendering
    * @param {string} ID for a form
    */
    setFormId(formId) {
        this.id = formId;
    }

    /**
    * Set the callback for the submission
    * @param {function} Callback function for form submission 
    */
    setSubmitCallback(callback) {
        this.callback = callback;
    }


    /**
    * Get the form ID
    * @returns {string} ID for a form
    */
    getFormId() {
        return this.id;
    }

    /*
    * Set field errors in bulk, this is typically used to
    * show errors from a server side response
    * @param {object} a hash of errors
    */
    setFieldErrors(errors) {
        // TODO: Known limitation. Errors are not provided
        // in a hierarchical manner. Just as key/value - so
        // duplicate keys scoped by parent objects are not
        // supported. Errors are added to both fields in this
        // instance.
        for(let fieldset of this.fieldsets) {
            fieldset.setFieldErrors(errors);
        }
    }

    /**
    * Log a message
    * @param {string} Message to log
    */
    log(message) {
        if(this.debug) {
            window.console.log('Pug ->', message);
        }
    }
}
