'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkgBasePath = _config2.default.pkgBasePath;
var version = exports.version = function version() {
  var pkgPath = _path2.default.join(pkgBasePath, '../package.json');
  return (0, _fsExtra.readJsonSync)(pkgPath).version;
};