## 0.8.0 (2014-08-12)


#### Features

* **espower-coffee:** update espower-source to 0.8.0 ([8702d847](https://github.com/twada/espower-coffee/commit/8702d84704d659919e96801014c4653539b7b3f0))


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
