'use strict'

import Mutt from '../src/index'

describe('Object Field', () => {
    test('test objects serialize correctly', () => {
        const schema = {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
            },
        }

        const options = {
            email: {
                serialize: 'trim',
            },
        }

        const field =  Mutt.fields.ObjectField.new(
            'test',
            'test',
            schema,
            options
        )

        field.value = {
            name: 'Testing',
            email: ' test@example.com ',
        }

        expect(field.getSerializedValue()).toEqual({
            name: 'Testing',
            email: 'test@example.com',
        })
    })
})
