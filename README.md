# Pug

### A simple JSON Schema to HTML form interface for Python & Javascript

#### Running JS tests

The simplist way to run the tests is to boot a local webserver as this allows for fixtures to be imported correctly without causing CORS problems.

	cd path/to/repo
	python3 -m http.server 8888

Navigate to http://localhost:8888/SpecRunner.html