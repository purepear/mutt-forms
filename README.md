<img src="https://raw.githubusercontent.com/mutt-forms/mutt-forms/master/docs/mutt.svg?sanitize=true" alt="Mutt" width="275">

# Mutt Forms

> A HTML Form generator & manager

<img src="https://travis-ci.org/mutt-forms/mutt-forms.svg?branch=master">

Mutt forms is a tool for creating HTML forms in Javascript
from JSON Schema definitions.

It can be used as a standalone tool or as part of a larger
project. Mutt is written in ES6 with a standalone version
being ES5 compatible - via Babel.

Mutt forms was developed as internal tool at [boughtbymany.com](https://boughtbymany.com) and is now available under the
MIT license. It is heavily influenced by [Django Forms](https://docs.djangoproject.com/en/1.10/topics/forms/)/
[WTForms](http://wtforms.readthedocs.io/en/latest/) as well as [AlpacaJS](http://www.alpacajs.org/) and has a familiar
API to these tools.


### Installation

The easiest way to get started with Mutt is to install via NPM:

`npm install mutt-forms`

or

`yarn add mutt-forms`


### Getting Started

```javascript

import Mutt from 'mutt-forms'

let form = new Mutt({
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: {
	  type: 'string'
	},
	email: {
	  type: 'string'
	}
  }
})

form.render(document.getElementById('form'))
```

#### Browser Support & Polyfills

Mutt should work in all modern browsers. By default babel-polyfill
is not included, but it should play nicely when included.

#### Development

All pull requests should be made against the `master` branch.

---

(c) Bought By Many 2019. Credit to Helena Long for the Mutt Logo :)
