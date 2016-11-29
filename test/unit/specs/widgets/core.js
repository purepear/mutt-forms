/*
* Widget Tests
*/

'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import {Widget} from '../../../../src/widgets/core'
import {StringField} from '../../../../src/fields/text'

describe('Widget', function() {
    var TestField, TestWidget

    beforeEach('create an TestWidget instance', function() {
        jsdom()

        TestField = new StringField({
            id: 'test-string', 
            name: 'TestString', 
            label: 'Test String Field'
        })

        TestWidget = new Widget(
            TestField, 
            'string', 
            'test-widget', 
            'TestWidget', 
            'Test Widget'
        )
    })

    describe('#setValue()', function() {
        it('set widget value', function() {
            TestWidget.setValue('Test')
            expect(TestWidget.value).to.equal('Test')
        })
    })

    describe('#getValue()', function() {
        it('return widget value', function() {
            let testValue = 'Test'
            TestWidget.value = testValue
            expect(TestWidget.getValue()).to.equal(testValue)
        })
    })

    describe('#getFieldClass()', function() {
        it('return field class string', function() {
            expect(TestWidget.getFieldClass()).to.equal('mutt-field')
        })

        it('return field class and other configured class when set', function() {
            TestWidget.attribs = {
                'class': 'test-field'
            }

            expect(TestWidget.getFieldClass()).to.equal('mutt-field test-field')
        })
    })

    describe('#getFieldWrapperClass()', function() {
        it('return field wrapper class string', function() {
            expect(TestWidget.getFieldWrapperClass()).to.equal('mutt-field-wrapper')
        })
    })

    describe('#getErrorClass()', function() {
        it('return field error class string', function() {
            expect(TestWidget.getErrorClass()).to.equal('mutt-error')
        })
    })

    describe('#getErrorWrapperClass()', function() {
        it('return field error wrapper class string', function() {
            expect(TestWidget.getErrorWrapperClass()).to.equal('mutt-error-wrapper')
        })
    })

    describe('#renderLabel()', function() {
        it('return null when no label is set', function() {
            TestWidget.label = ''
            expect(TestWidget.renderLabel()).to.equal(null)
        })

        it('return a HTML label elment when a label is set', function() {
            let label = TestWidget.renderLabel()
            expect(label).to.be.an('object')
            expect(label.constructor).to.equal(window.HTMLLabelElement)
        })        
    })

    describe('#renderWrapper()', function() {
        it('return a HTML div wrapper with the correct ID', function() {
            let wrapper = TestWidget.renderWrapper()
            expect(wrapper).to.be.an('object')
            expect(wrapper.constructor).to.equal(window.HTMLDivElement)
            expect(wrapper.id).to.equal('test-widget')
            expect(wrapper.className).to.equal('mutt-field-wrapper')
        })        
    })

    describe('#renderErrors()', function() {
        it('return null when no errors are set', function() {
            TestWidget.errors = []
            expect(TestWidget.renderErrors()).to.equal(null)
        })

        it('return a HTML list element when errors are set', function() {
            TestWidget.errors = ['Error 1', 'Error 2']
            let errorNode = TestWidget.renderErrors()

            expect(errorNode).to.be.an('object')
            expect(errorNode.constructor).to.equal(window.HTMLUListElement)
            expect(errorNode.children.length).to.equal(2)

            let firstChild = errorNode.children[0]
            expect(firstChild).to.be.an('object')
            expect(firstChild.constructor).to.equal(window.HTMLLIElement)
            expect(firstChild.textContent).to.equal('Error 1')

            let secondChild = errorNode.children[1]
            expect(secondChild).to.be.an('object')
            expect(secondChild.constructor).to.equal(window.HTMLLIElement)
            expect(secondChild.textContent).to.equal('Error 2')
        })        
    })
})