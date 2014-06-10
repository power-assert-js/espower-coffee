/**
 * espower-coffee - Experimental power-assert instrumentor for CoffeeScript
 *
 * Copyright (c) 2014 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
var coffee = require('coffee-script'),
    originalCompileFile = coffee._compileFile,
    minimatch = require('minimatch'),
    espowerSource = require('espower-source');

function espowerCoffee (options) {
    'use strict';

    var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/',
        pattern = options.cwd + separator + options.pattern;

    coffee._compileFile = function (filepath, sourceMap) {
        var answer = originalCompileFile(filepath, sourceMap);
        if (minimatch(filepath, pattern)){
            if (sourceMap) {
                answer.js = espowerSource(answer.js, filepath, options.espowerOptions);
            } else {
                answer = espowerSource(answer, filepath, options.espowerOptions);
            }
        }
        return answer;
    };

    coffee.register();
}

module.exports = espowerCoffee;
