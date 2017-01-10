/*
* Validator Tests
*/

'use strict'

import {expect} from 'chai'
import * as validators from '../../../../src/validators'


describe('RequiredValidator', function() {
    describe('#validate()', function() {
        it('returns true when a string value is present', function() {
            let validator = new validators.RequiredValidator()
            expect(validator.validate('test')).to.equal(true)
        })

        it('returns true when a integer value is present', function() {
            let validator = new validators.RequiredValidator()
            expect(validator.validate(1)).to.equal(true)
        })

        it('returns true when a integer value is zero', function() {
            let validator = new validators.RequiredValidator()
            expect(validator.validate(0)).to.equal(true)
        })

        it('returns true when an array value is present', function() {
            let validator = new validators.RequiredValidator()
            expect(validator.validate([1,2,3])).to.equal(true)
        })

        it('returns true when an object value is present', function() {
            let validator = new validators.RequiredValidator()
            expect(validator.validate({a: 123})).to.equal(true)
        })

        it('returns false when a string value is not present', function() {
            let validator = new validators.RequiredValidator()
            expect(validator.validate('')).to.equal(false)
        })

        it('returns false when a value is not present', function() {
            let validator = new validators.RequiredValidator()
            expect(validator.validate(null)).to.equal(false)
        })   
    })
})


describe('LengthValidator', function() {
    describe('#validate()', function() {
        it('returns true when a string is greater than min length', function() {
            let validator = new validators.LengthValidator({min: 3})
            expect(validator.validate('test')).to.equal(true)
        })

        it('returns true when a string matches min length', function() {
            let validator = new validators.LengthValidator({min: 3})
            expect(validator.validate('tes')).to.equal(true)
        })

        it('returns false when a string is less than min length', function() {
            let validator = new validators.LengthValidator({min: 3})
            expect(validator.validate('te')).to.equal(false)
        })

        it('returns true when a string is less than max length', function() {
            let validator = new validators.LengthValidator({max: 5})
            expect(validator.validate('test')).to.equal(true)
        })

        it('returns true when a string matches max length', function() {
            let validator = new validators.LengthValidator({max: 5})
            expect(validator.validate('test1')).to.equal(true)
        })

        it('returns false when a string is greater than max length', function() {
            let validator = new validators.LengthValidator({max: 3})
            expect(validator.validate('test')).to.equal(false)
        })
    })
})