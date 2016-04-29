/* eslint-env mocha */
'use strict';

const assert = require('assert');

describe('mxd-yaml-config-lib', function () {
  const lib = require('../src/lib.js');
  const directory = __dirname + '/config';

  it('should be a function', function () {
    assert(lib instanceof Function);
  });

  it('should return empty object if no .yml file is defined', function () {
    const config = lib([]);
    assert(config instanceof Object);
  });

  it('should load simple values a single .yml file', function () {
    const config = lib([directory + '/a.yml']);
    assert(config instanceof Object);
    assert.equal(config.a, 'a');
  });

  it('should load complex values from a single .yml file', function () {
    const config = lib([directory + '/a.yml']);
    assert(config instanceof Object);
    assert(config.c instanceof Object);
    assert.equal(config.c.a, 'a');
    assert.equal(config.c.b, 'a');
  });

  it('should load a multiple .yml files', function () {
    const config = lib([directory + '/a.yml', directory + '/b.yml']);
    assert(config instanceof Object);
    assert.equal(config.a, 'a');
    assert.equal(config.b, 'b');
  });

  it('should override simple values with same key of later loaded .yml files', function () {
    const config = lib([directory + '/a.yml', directory + '/c.yml']);
    assert(config instanceof Object);
    assert.equal(config.a, 'c');
  });

  it('should override complex values with same key of later loaded .yml files', function () {
    const config = lib([directory + '/a.yml', directory + '/b.yml']);
    assert(config instanceof Object);
    assert(config.c instanceof Object);
    assert.equal(config.c.a, 'b');
    assert.equal(typeof config.c.b, 'undefined');
  });

  it('should override complex value tress with simple values with same key of later loaded .yml files', function () {
    const config = lib([directory + '/a.yml', directory + '/c.yml']);
    assert(config instanceof Object);
    assert.equal(config.d, 'c');
  });

  it('should ignore not existing .yml files', function () {
    const config = lib([directory + '/d.yml']);
    assert(config instanceof Object);
  });

  it('should also work if using all features together', function () {
    const config = lib([directory + '/a.yml', directory + '/d.yml', directory + '/b.yml', directory + '/c.yml']);
    assert(config instanceof Object);
    assert.equal(config.a, 'c');
    assert.equal(config.b, 'b');
    assert(config.c instanceof Object);
    assert.equal(config.c.a, 'b');
    assert.equal(config.d, 'c');
  });
});
