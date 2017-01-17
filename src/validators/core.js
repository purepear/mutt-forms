/**
* @file Core Validators
*/

/**
* Base Validation Interface
* @class
*/
export class Validator {

    constructor() {
        this.error = null
    }

    validate(value) {
        return true
    }

}

/**
* RequiredValidator - Validate the existance of a value
* @class
*/
export class RequiredValidator extends Validator {

    validate(value) {
        if(!value && (value !== 0)) {
            this.error = 'This field is required.'
            return false
        }

        return true
    }
}

/**
* BooleanRequiredValidator - Validate the existance of a value
* @class
*/
export class BooleanRequiredValidator extends Validator {

    validate(value) {
        if(!(value === true || value === false)) {
            this.error = 'This field is required.'
            return false
        }

        return true
    }
}

/**
* LengthValidator - Validate the length of a string
* @class
*/
export class LengthValidator extends Validator {

    constructor({min = null, max = null}) {
        super()
        this.min = min
        this.max = max
    }

    validate(value) {
        if(!value) {
            this.error = 'This field is required.'
            return false
        }

        if(this.min && value.length < this.min) {
            this.error = `Length must be at least "${this.min}" characters`
            return false
        }

        if(this.max && value.length > this.max) {
            this.error = `Length must be no more than "${this.max}" characters`
            return false
        }

        return true
    }
}

/**
* IntegerValidator - Validate the integer is of a correct type
* @class
*/
export class IntegerValidator extends Validator {

    validate(value) {
        // NOTE: We only check it's an integer IF we
        // have a value.
        if(value && isNaN(value)) {
            this.error = `Value must be an integer`
            return false
        }

        return true
    }
}


/**
* RegexValidator - Validate the value against a regular expression
* @class
*/
export class RegexValidator extends Validator {

    constructor(pattern) {
        super()
        this.pattern = pattern
    }

    validate(value) {
        if(!value) {
            this.error = 'This field is required.'
            return false
        }

        if(!value.match(this.pattern)) {
            this.error = `Value must match the pattern: ${this.pattern}`
            return false
        }

        return true
    }
}
