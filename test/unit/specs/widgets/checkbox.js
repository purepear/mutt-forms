/*
* Widget Tests
*/

'use strict'

import {expect} from 'chai'
import jsdom from 'mocha-jsdom'
import {BooleanField} from '../../../../src/fields/boolean'
import {ChoiceField} from '../../../../src/fields/choice'
import {CheckboxList, CheckboxInput} from '../../../../src/widgets/checkbox'

describe('CheckboxInputWidget', function() {
    var TestField, TestWidget

    jsdom()

    beforeEach('create an CheckboxInput instance', function() {
        TestField = new BooleanField({
            id: 'test-bool',
            name: 'TestBool',
            label: 'Test Boolean Field'
        })

        TestWidget = new CheckboxInput(
            TestField,
            'boolean',
            'test-widget',
            'TestWidget',
            'Test Widget'
        )
    })

    describe('#setValue()', function() {
        it('sets the correct value', function() {
            TestWidget.setValue(true)
            expect(TestWidget.value).to.equal(true)
            TestWidget.setValue(false)
            expect(TestWidget.value).to.equal(false)
        })

        it('updates the label when set to true and removes when setting false', function() {
            let node = TestWidget.render()

            // Patch it in...
            document.querySelector('body').appendChild(node)
            let element = document.querySelector('#test-widget .mutt-field')
            let label = document.querySelector('#test-widget .mutt-label')

            TestWidget.setValue(true)
            expect(label.classList.contains('mutt-field-checkbox-checked')).to.equal(true)

            TestWidget.setValue(false)
            expect(label.classList.contains('mutt-field-checkbox-checked')).to.equal(false)
        })
    })

    describe('#getValue()', function() {
        it('gets the correct value once set but not rendered', function() {
            TestWidget.setValue(true)
            expect(TestWidget.getValue()).to.equal(true)
            TestWidget.setValue(false)
            expect(TestWidget.getValue()).to.equal(false)
        })

        it('gets the correct value once rendered', function() {
            let node = TestWidget.render()

            // Patch it in...
            document.querySelector('body').appendChild(node)
            let element = document.querySelector('#test-widget .mutt-field')

            TestWidget.setValue(true)
            expect(TestWidget.getValue()).to.equal(true)
            expect(element.hasAttribute('checked')).to.equal(true)

            TestWidget.setValue(false)
            expect(TestWidget.getValue()).to.equal(false)
            expect(element.hasAttribute('checked')).to.equal(false)
        })
    })
})


describe('CheckboxListWidget', function(){
    var TestField, TestWidget
    jsdom()

    beforeEach('create mock objects', function(){
        TestField = new ChoiceField({
            id: 'test-multiple-choice',
            name: 'TestChoice',
            label: 'Test Choice Field',
            options: {
                'widget': 'checkboxlist'
            }
        })

        TestWidget = new CheckboxList(
            TestField,
            'checkboxlist',
            'test-checkboxlist-widget',
            'TestCheckboxListWidget',
            'Test CheckboxList Widget'
        )
    })

    describe('widget renders & clicking checkbox returns array', function(){
        it('renders ok', function() {
            TestWidget.setChoices(['test1', 'test2', 'test3'])
            let node = TestWidget.render()
            document.querySelector('body').appendChild(node)
            let id = TestWidget.id

            expect(document.querySelector(`#${id}`)).to.not.equal(null)

            let boxes = document.querySelectorAll(`#${id} .mutt-field-checkbox`)
            expect(boxes.length).to.equal(3)
            boxes[0].setAttribute('checked', 'true')
            boxes[1].setAttribute('checked', 'true')
            expect(TestWidget.getValue()).to.deep.equal([true, true, false])
        })
    })

    describe('set & get value via js', function(){
        it('sets & gets value', function(){

            var myNode = document.querySelector('body');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            TestWidget.setChoices(['test1', 'test2', 'test3'])
            let node = TestWidget.render()
            document.querySelector('body').appendChild(node)


            TestWidget.setValueByIndex(true, 2)
            expect(TestWidget.getValueByIndex(2)).to.equal(true)
        })
    })

    describe('set & get all values via js', function(){
        it('sets & gets all values', function(){

            var myNode = document.querySelector('body');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            TestWidget.setChoices(['test1', 'test2', 'test3'])
            let node = TestWidget.render()
            document.querySelector('body').appendChild(node)

            TestWidget.setValue([false, true, false])
            expect(TestWidget.getValue()).to.deep.equal([false, true, false])
        })
    })

    describe('set and get values without rendering', function(){
        it('sets and gets values without rendering', function(){
            var myNode = document.querySelector('body');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            TestWidget.setChoices(['test1', 'test2', 'test3'])
            TestWidget.setValue([false, true, false])
            expect(TestWidget.getValue()).to.deep.equal([false, true, false])
        })
    })

    describe('set and get values by index without rendering', function(){
        it('sets and gets values by index without rendering', function(){
            var myNode = document.querySelector('body');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            TestWidget.setChoices(['test1', 'test2', 'test3'])
            TestWidget.setValueByIndex(true, 2)

            expect(TestWidget.getValueByIndex(0)).to.equal(false)
            expect(TestWidget.getValueByIndex(1)).to.equal(false)
            expect(TestWidget.getValueByIndex(2)).to.equal(true)
        })
    })
})
