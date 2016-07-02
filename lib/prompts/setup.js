'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupPrompt = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setupPrompt = exports.setupPrompt = function setupPrompt(promptType, prompt) {
  prompt.message = _chalk2.default.green(promptType + ': ');
  prompt.delimiter = '';
  prompt.start();
};