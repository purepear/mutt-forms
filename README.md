![Mutt](https://raw.githubusercontent.com/boughtbymany/mutt-forms/master/docs/mutt.jpg)

# Mutt Forms

![Build Status](https://travis-ci.org/boughtbymany/mutt-forms.svg?branch=master)

Mutt forms is a tool for creating HTML forms in Javascript 
from JSON Schema definitions.

It can be used as a standalone tool or as part of a larger 
project. Mutt is written in ES6 with a standalone version
being ES5 compatiable - via Babel.

Mutt forms was developed as internal tool at [boughtbymany.com](https://boughtbymany.com) and is now available under the MIT license. It is heavily 
influenced by [Django Forms](https://docs.djangoproject.com/en/1.10/topics/forms/)/[WTForms](http://wtforms.readthedocs.io/en/latest/) as well as [AlpacaJS](http://www.alpacajs.org/) and has a familiar API to these tools. 


### Installation

The easiest way to get started with Mutt is to install via NPM:

`npm install mutt-forms`


### Getting Started

```javascript

import Mutt from 'mutt-forms'

let schema = {
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
}

let form = new Mutt(
	document.getElementById('form'), // HTML target to render form
	schema, // Schema for the form
	{}, // Options for fields...
	(data) => { 
		// Callback on form submission, validation
		// is implicit by default....
	}
)

form.render()
```

#### Standalone Playground

A standalone version of mutt is available, you can use this either 
directly or by firing up a simple python server:

`python -m SimpleHTTPServer`

and navigating to:

`http://localhost:8000/test/standalone.html`


---

(c) Bought By Many 2016. Credit to Helena Long for the Mutt Logo :)