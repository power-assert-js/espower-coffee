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
    extend = require('xtend'),
    convert = require('convert-source-map'),
    espowerSource = require('espower-source');

function espowerCoffee (options) {
    'use strict';

    var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/',
        pattern = options.cwd + separator + options.pattern;

    coffee._compileFile = function (filepath, sourceMap) {
        if (! minimatch(filepath, pattern)) {
            return originalCompileFile(filepath, sourceMap);
        }
        var withMap = originalCompileFile(filepath, true); // enable sourcemaps
        var conv = convert.fromJSON(withMap.v3SourceMap);
        // restore filepath since coffeescript compiler drops it
        conv.setProperty('sources', [filepath]);
        withMap.js = espowerSource(
            withMap.js,
            filepath,
            extend(options.espowerOptions, {sourceMap: conv.toObject()})
        );
        return sourceMap ? withMap : withMap.js;
    };

    coffee.register();
}

module.exports = espowerCoffee;
