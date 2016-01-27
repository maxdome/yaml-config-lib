[![Travis CI](https://travis-ci.org/maxdome/yaml-config-lib.svg?branch=master "Travis CI")]
 (https://travis-ci.org/maxdome/yaml-config-lib)
[![Dependency Status](https://david-dm.org/maxdome/yaml-config-lib.svg)](https://david-dm.org/maxdome/yaml-config-lib)
[![devDependency Status](https://david-dm.org/maxdome/yaml-config-lib/dev-status.svg)](https://david-dm.org/maxdome/yaml-config-lib#info=devDependencies)

# Install
Run ```npm i yaml-config-lib --save```

# Example
```javascript
const directory = __dirname + '/../config';
const config = require('yaml-config-lib')([
  directory + '/all.yml',                                             // Global default config
  directory + '/' + (process.env.NODE_ENV || 'development') + '.yml', // Environment default config
  directory + '/local.yml'                                            // Config for the current instance
]);
```

# Directory structure
* config
  * .gitignore - With content ```/local```
  * all.yml - Global default config
  * development.yml - Development default config
  * production.yml - Production default config
  * local.yml - Config for the current instance

# Attention
If you overwrite a leap of a tree, the complete tree will be overwritten.

e.g.:
* Some defaults for database options in the ```all.yml```:
```yaml
database:
  connection: ''
  options:
    key: 'value'
```
* Overwrite only the connection part in the ```local.yml```:
```yaml
database:
  connection: 'url'
```
* The merged config will only have the connection part, not anymore the options part with the default options:
```yaml
database:
  connection: 'url'
```
