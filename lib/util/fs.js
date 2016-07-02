'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.fileExists = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootPath = process.cwd();

/*
 Node deprecated existsSync so this is a simple
 helper function wrapping try/catch around the new
 recommended approach of accessSync
 https://nodejs.org/api/fs.html#fs_fs_existssync_path
 */
var fileExists = exports.fileExists = function fileExists(filename) {
  try {
    _fs2.default.accessSync(filename);
    return true;
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
};

var readFile = exports.readFile = function readFile(filename) {
  var filePath = _path2.default.join(rootPath, filename);
  return _fs2.default.readFileSync(filePath, 'utf8');
};