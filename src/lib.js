'use strict';

const YAML = require('yamljs');

module.exports = paths => {
  const parameters = [{}];
  for (const path of paths) {
    try {
      parameters.push(YAML.load(path));
    } catch (e) {
      // ignore not existing files
    }
  }
  return Object.assign.apply(undefined, parameters);
};
