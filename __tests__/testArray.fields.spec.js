'use strict'

import Mutt from '../src/index'

describe('Array Field', () => {
    test('test arrays serialize correctly', () => {
        const schema = {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                    email: {
                        type: 'string',
                    },
                }
            },
        }

        const options = {
            email: {
                serialize: 'trim',
            },
        }

        const field =  Mutt.fields.ArrayField.new(
            'test',
            'test',
            schema,
            options
        )

        field.value = [
            {
                name: 'Testing',
                email: ' test1@example.com ',
            },
            {
                name: 'Testing 2',
                email: ' test2@example.com',
            },
            {
                name: 'Testing 3',
                email: 'test3@example.com',
            },
        ]


        expect(field.getSerializedValue()).toEqual([
            {
                name: 'Testing',
                email: 'test1@example.com',
            },
            {
                name: 'Testing 2',
                email: 'test2@example.com',
            },
            {
                name: 'Testing 3',
                email: 'test3@example.com',
            },
        ])
    })
})
