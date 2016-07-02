'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fs3 = require('../util/fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileInfo = function () {
  function FileInfo(args) {
    _classCallCheck(this, FileInfo);

    this.ui = args.ui;
    this.templateVariables = args.templateVariables; // locals passed to ejs template
    this.originalPath = args.originalPath; // path to template
    this.mappedPath = args.mappedPath; // destination path to be written to
  }

  _createClass(FileInfo, [{
    key: 'writeFile',
    value: function writeFile() {
      this.ui.writeDebug('Attempting to write file: ' + this.mappedPath);
      if ((0, _fs3.fileExists)(this.mappedPath)) {
        this.ui.writeError('Not writing file.  File already exists at: ' + this.mappedPath);
      } else {
        var fileContent = this.renderTemplate();
        this.ui.writeDebug('fileContent: ' + fileContent);

        (0, _fsExtra.outputFileSync)(this.mappedPath, fileContent);
        this.ui.writeCreate(this.mappedPath);
      }
      return;
    }
  }, {
    key: 'renderTemplate',
    value: function renderTemplate() {
      var rendered = void 0;
      this.ui.writeDebug('rendering template: ' + this.originalPath);
      var template = _fs2.default.readFileSync(this.originalPath, 'utf8');

      try {
        rendered = _ejs2.default.render(template, this.templateVariables);
      } catch (err) {
        this.ui.writeDebug('couldnt render');
        err.message += ' (Error in blueprint template: ' + this.originalPath + ')';
        this.ui.writeError('error was: ' + err.message);
        throw err;
      }
      return rendered;
    }
  }, {
    key: 'isFile',
    value: function isFile() {
      var fileCheck = void 0;
      try {
        fileCheck = _fs2.default.lstatSync(this.originalPath).isFile();
      } catch (e) {
        if (e.code === 'ENOENT') {
          return false;
        } else {
          throw e;
        }
      }
      this.ui.writeDebug('checking file: ' + this.originalPath + ' - ' + fileCheck);
      return fileCheck;
    }
  }]);

  return FileInfo;
}();

exports.default = FileInfo;