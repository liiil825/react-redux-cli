'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  properties: {
    sourceBase: {
      description: _chalk2.default.blue('Path to your source code? (relative from root)'),
      type: 'string',
      required: true
    },
    testBase: {
      description: _chalk2.default.blue('Path to your test code? (relative from root)'),
      type: 'string',
      required: true
    },
    smartPath: {
      description: _chalk2.default.blue('Where is path to Smart/Container Components?'),
      type: 'string',
      required: true
    },
    dumbPath: {
      description: _chalk2.default.blue('Where is path to Dumb/Pure Components?'),
      type: 'string',
      required: true
    },
    fileCasing: {
      description: _chalk2.default.blue('How do you want file casing to be configured? (default|snake|pascal|camel)'),
      pattern: /(default|snake|pascal|camel|dashes)/,
      required: true,
      type: 'string'
    }
  }
};