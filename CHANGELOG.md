## [1.0.0](https://github.com/power-assert-js/espower-coffee/releases/tag/v1.0.0) (2015-08-22)


#### Features

  * transfer to power-assert-js organization ([5227edb8](https://github.com/power-assert-js/espower-coffee/commit/5227edb88f18f8ebaf014fb2ffc094e4771f6336))
  * [use options.cwd for default sourceRoot](https://github.com/power-assert-js/espower-coffee/pull/2)


## [0.10.0](https://github.com/power-assert-js/espower-coffee/releases/tag/v0.10.0) (2014-11-11)


#### Features

* **espower-coffee:**
  * update espower-source to 0.10.0 ([48f6d5fd](https://github.com/power-assert-js/espower-coffee/commit/48f6d5fd375d86add888dcf34016cefd8585c120))


### 0.9.1 (2014-09-17)


#### Features

* **espower-coffee:** update espower-source to 0.9.1 ([c84cf698](https://github.com/power-assert-js/espower-coffee/commit/c84cf698cf4ddff7a74c3f1677a2fdb3a4aa00d1))


## 0.9.0 (2014-09-02)


#### Features

* **espower-coffee:** interact with coffeescript compiler to adjust line number in power-assert output ([9c159205](https://github.com/power-assert-js/espower-coffee/commit/9c159205608e6a556f61167d1fb65123ae2421ab))


## 0.8.0 (2014-08-12)


#### Features

* **espower-coffee:** update espower-source to 0.8.0 ([8702d847](https://github.com/power-assert-js/espower-coffee/commit/8702d84704d659919e96801014c4653539b7b3f0))


#### Breaking Changes

If you already customize instrumentation pattern using `espowerOptions.powerAssertVariableName` and `espowerOptions.targetMethods`, you need to migarte. To migrate, change your code from the following:

```javascript
require('espower-coffee')({
    cwd: process.cwd(),
    pattern: 'spec/unit/**/*.coffee',
    espowerOptions: {
        powerAssertVariableName: 'yourAssert',
        targetMethods: {
            oneArg: [
                'okay'
            ],
            twoArgs: [
                'equal',
                'customEqual'
            ]
        }
    }
});
```

To:

```javascript
require('espower-coffee')({
    cwd: process.cwd(),
    pattern: 'spec/unit/**/*.coffee',
    espowerOptions: {
        patterns: [
            'yourAssert(value, [message])',
            'yourAssert.okay(value, [message])',
            'yourAssert.equal(actual, expected, [message])',
            'yourAssert.customEqual(actual, expected, [message])'
        ]
    }
});
```
