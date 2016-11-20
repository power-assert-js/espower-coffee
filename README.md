espower-coffee
================================

power-assert instrumentor for CoffeeScript

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependency Status][depstat-image]][depstat-url]
[![License][license-image]][license-url]


DESCRIPTION
---------------------------------------
`espower-coffee` is a Node.js module loader that instruments [power-assert](https://github.com/power-assert-js/power-assert) feature into target CoffeeScript sources on the fly.

Pull-requests, issue reports and patches are always welcomed. See [power-assert](http://github.com/power-assert-js/power-assert) project for more documentation.


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

Note: `'espower-coffee/guess'` is inspired by [intelli-espower-loader](https://github.com/power-assert-js/intelli-espower-loader)


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
            'assert.notDeepEqual(actual, expected, [message])',
            'assert.deepStrictEqual(actual, expected, [message])',
            'assert.notDeepStrictEqual(actual, expected, [message])'
        ]
    }
});
```

Then, run mocha with `--require` option

    $ mocha --require ./path/to/espower-coffee-loader spec/unit/some_test_using_powerassert.coffee


OUR SUPPORT POLICY
---------------------------------------

We support Node under maintenance. In other words, we stop supporting old Node version when [their maintenance ends](https://github.com/nodejs/LTS).

This means that any other environment is not supported.

NOTE: If espower-cli works in any of the unsupported environments, it is purely coincidental and has no bearing on future compatibility. Use at your own risk.


CHANGELOG
---------------------------------------
See [CHANGELOG](https://github.com/power-assert-js/espower-coffee/blob/master/CHANGELOG.md)


AUTHOR
---------------------------------------
* [Takuto Wada](https://github.com/twada)


LICENSE
---------------------------------------
Licensed under the [MIT](http://twada.mit-license.org/2014-2016) license.


[npm-url]: https://npmjs.org/package/espower-coffee
[npm-image]: https://badge.fury.io/js/espower-coffee.svg

[travis-url]: https://travis-ci.org/power-assert-js/espower-coffee
[travis-image]: https://secure.travis-ci.org/power-assert-js/espower-coffee.svg?branch=master

[depstat-url]: https://gemnasium.com/power-assert-js/espower-coffee
[depstat-image]: https://gemnasium.com/power-assert-js/espower-coffee.svg

[license-url]: http://twada.mit-license.org/2014-2016
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg
