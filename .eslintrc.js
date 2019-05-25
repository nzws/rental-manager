'use strict';

module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    '$': false
  }
};
