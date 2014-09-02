espower-coffee
================================

Experimental power-assert instrumentor for CoffeeScript

[![Build Status](https://travis-ci.org/twada/espower-coffee.svg?branch=master)](https://travis-ci.org/twada/espower-coffee)
[![NPM version](https://badge.fury.io/js/espower-coffee.svg)](http://badge.fury.io/js/espower-coffee)
[![Dependency Status](https://gemnasium.com/twada/espower-coffee.svg)](https://gemnasium.com/twada/espower-coffee)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://twada.mit-license.org/)


DESCRIPTION
---------------------------------------
`espower-coffee` is a Node.js module loader that instruments [power-assert](http://github.com/twada/power-assert) feature into target CoffeeScript sources on the fly.

Please note that `espower-coffee` is a beta version product. Pull-requests, issue reports and patches are always welcomed. See [power-assert](http://github.com/twada/power-assert) project for more documentation.


EXAMPLE
---------------------------------------

Given `test/demo_test.coffee`

```coffeescript
assert = require 'power-assert'

class Person
  constructor: (name, age) ->
    @name = name
    @age = age

describe "various types", ->
  beforeEach ->
    @types = [
      "string"
      98.6
      true
      false
      null
      `undefined`
      [
        "nested"
        "array"
      ]
      {
        object: true
      }
      NaN
      Infinity
      /^not/
      new Person("alice", 3)
    ]

  it "demo", ->
    index = @types.length - 1
    bob = new Person("bob", 5)
    assert @types[index].name is bob.name
```

Run mocha with `--require 'espower-coffee/guess'`

```
$ mocha --require 'espower-coffee/guess' test/demo_test.coffee

  ․

  0 passing (15ms)
  1 failing

  1) various types demo:
     AssertionError: # /path/to/test/demo_test.coffee:33

assert(this.types[index].name === bob.name)
            |    ||      |    |   |   |
            |    ||      |    |   |   "bob"
            |    ||      |    |   Person{name:"bob",age:5}
            |    ||      |    false
            |    |11     "alice"
            |    Person{name:"alice",age:3}
            ["string",98.6,true,false,null,undefined,#Array#,#Object#,NaN,Infinity,/^not/,#Person#]

--- [string] bob.name
+++ [string] this.types[index].name
@@ -1,3 +1,5 @@
-bob
+alice

    at Decorator.concreteAssert (/path/to/node_modules/power-assert/node_modules/empower/lib/decorator.js:63:21)
    at /path/to/node_modules/power-assert/node_modules/empower/lib/decorate.js:44:26
    at powerAssert (/path/to/node_modules/power-assert/node_modules/empower/index.js:57:32)
    at Context.<anonymous> (/path/to/test/demo_test.coffee:1:1)

$ 
```

See the power-assert output appears!


INSTALL
---------------------------------------

    $ npm install --save-dev espower-coffee


HOW TO USE
---------------------------------------


### Zero-config mode

If your tests are located on `'test/**/*.coffee'`, just run mocha with `--require 'espower-coffee/guess'`

    $ mocha --require 'espower-coffee/guess' test/**/*.coffee


### If your tests are not in test dir

You can set test directory in your `package.json`

```json
{
    "name": "your-module",
    "description": "Your module",
    "version": "0.0.1",
    "directories": {
        "test": "spec/"
    },
...
}
```

Then, run mocha with `--require 'espower-coffee/guess'`

    $ mocha --require 'espower-coffee/guess' spec/**/*.coffee

Note: `'espower-coffee/guess'` is inspired by [intelli-espower-loader](https://github.com/azu/intelli-espower-loader)


### More customization

If you want to configure more explicitly, put `espower-coffee-loader.js` somewhere in your project.

```javascript
require('espower-coffee')({
    // directory where match starts with
    cwd: process.cwd(),

    // glob pattern using minimatch module
    pattern: 'spec/unit/**/*.coffee',

    // options for espower module
    espowerOptions: {
        patterns: [
            'assert(value, [message])',
            'assert.ok(value, [message])',
            'assert.equal(actual, expected, [message])',
            'assert.notEqual(actual, expected, [message])',
            'assert.strictEqual(actual, expected, [message])',
            'assert.notStrictEqual(actual, expected, [message])',
            'assert.deepEqual(actual, expected, [message])',
            'assert.notDeepEqual(actual, expected, [message])'
        ]
    }
});
```

Then, run mocha with `--require` option

    $ mocha --require ./path/to/espower-coffee-loader spec/unit/some_test_using_powerassert.coffee


CHANGELOG
---------------------------------------
See [CHANGELOG](https://github.com/twada/espower-coffee/blob/master/CHANGELOG.md)


AUTHOR
---------------------------------------
* [Takuto Wada](http://github.com/twada)


LICENSE
---------------------------------------
Licensed under the [MIT](http://twada.mit-license.org/) license.
