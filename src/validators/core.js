/*
    pug - validators/core.js
*/


/**
* Base Validation Interface
*/
export class Validator {

    constructor() {
        this.error = null;
    }

    validate(value) {
        return true;
    }

}


/**
* RequiredValidator - Validate the existance of a value
*/
export class RequiredValidator extends Validator {

    validate(value) {
        if(!value) {
            this.error = 'This field is required.';
            return false;
        }

        return true;
    }

}


/**
* BooleanRequiredValidator - Validate the existance of a value

*/
export class BooleanRequiredValidator extends Validator {

    validate(value) {
        if(!(value === true || value === false)) {
            this.error = 'This field is required.';
            return false;
        }

        return true;
    }
    
}


/**
* LengthValidator - Validate the length of a string
*/
export class LengthValidator extends Validator {

    constructor({min = null, max = null}) {
        super();
        this.min = min;
        this.max = max;
    }

    validate(value) {
        if(!value) {
            this.error = 'This field is required.';
            return false;
        }

        if(this.min && value.length < this.min) {
            this.error = `Length must be at least "${this.min}" characters`;
            return false;
        }

        if(this.max && value.length > this.max) {
            this.error = `Length must be no more than "${this.max}" characters`;
            return false;
        }

        return true;
    }

}


/**
* IntegerValidator - Validate the integer is of a correct type
*/
export class IntegerValidator extends Validator {

    validate(value) {
        if(isNaN(value)) {
            this.error = `Value must be an integer`;
            return false;
        }

        return true;
    }

}

