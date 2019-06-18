
# Checkout Page
[![Build Status](https://travis-ci.org/AkhmedovValikhan/ma-co.svg?branch=master)](https://travis-ci.org/AkhmedovValikhan/ma-co)
[![codecov](https://codecov.io/gh/AkhmedovValikhan/ma-co/branch/master/graph/badge.svg)](https://codecov.io/gh/AkhmedovValikhan/ma-co)
> Notes: In order to save time, some shortcuts have been made :) Some UX improvements can be done, like not validating fields on each keystroke, but the foundation of forms framework is there, so this behaviour can be added easily. Also Cleave library have been used to mask inputs. Application was developed and tested using latest chrome and might not work in older browsers due to absence of any Polyfills/post-css. Test coverage is low as well, just cc validation is tested, snapshots tests can be added in the future:)
## Structure
```
├── public - meta files
│   ├── icons
│   └── manifest.json
├── server.js - simple server
├── src
│   ├── app - App specific components, services and utils
│   ├── common - Common components and utils, ideally should be in separate package
│   ├── index.tsx - Entry point
│   └── styles - scss global styles, includes several mixins from bootstrap(only grid specific)
└── webpack.config.js
```
## Scripts
You should have node v12+.

### `npm run build`

Creates a production build.

### `npm run test`
### `npm run test:w`

Runs jest to execute unit and enzyme tests.

### `npm run start`

Runs dev server in watch mode with module replacement.


### `npm run tslint`
### `npm run tslint:fix`

Runs linting

### `npm run ci`
Simple CI pipeline script
