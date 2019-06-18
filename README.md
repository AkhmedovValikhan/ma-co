
# Checkout Page

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
