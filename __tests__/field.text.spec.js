'use strict'

import Mutt from '../src/index'

describe('Text Field', () => {
    test('text field has empty string as an initial value', () => {
        const schema = {
            type: 'string',
        }
        const field = Mutt.fields.Field.new(
            'test-id',
            'test-name',
            schema,
        )

        expect(field.initialValue()).toEqual('')
        expect(field.value).toEqual('')
    })
})
