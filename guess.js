/**
 * espower-coffee - power-assert instrumentor for CoffeeScript
 *
 * Copyright (c) 2014-2015 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
var path = require('path');
var pattern = 'test/**/*.coffee';
var packageData;
var testDir;
packageData = require(path.join(process.cwd(), 'package.json'));
if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
    testDir = packageData.directories.test;
    pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*.coffee';
}
require('./index')({
    cwd: process.cwd(),
    pattern: pattern
});
