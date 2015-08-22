/**
 * espower-coffee - power-assert instrumentor for CoffeeScript
 *
 * Copyright (c) 2014-2015 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
var coffee = require('coffee-script');
var originalCompileFile = coffee._compileFile;
var minimatch = require('minimatch');
var extend = require('xtend');
var convert = require('convert-source-map');
var espowerSource = require('espower-source');

function espowerCoffee (options) {
    'use strict';

    var patternStartsWithSlash = (options.pattern.lastIndexOf('/', 0) === 0);
    var separator = patternStartsWithSlash ? '' : '/';
    var pattern = options.cwd + separator + options.pattern;

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
            extend(options.espowerOptions, { sourceMap: conv.toObject(), sourceRoot: options.cwd })
        );
        return sourceMap ? withMap : withMap.js;
    };

    coffee.register();
}

module.exports = espowerCoffee;
