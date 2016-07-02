'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _shelljs = require('shelljs');

var _fs = require('../util/fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  Look into using Yam for finding settings so it will get the first
  .reduxrc it finds and use that for project settings just like how
  eslintrc and ember-cli works
*/

var ProjectSettings = function () {
  function ProjectSettings(relativePath) {
    _classCallCheck(this, ProjectSettings);

    this.relativePath = relativePath || '../../templates/.reduxrc';
    this.loadSettings();
  }

  _createClass(ProjectSettings, [{
    key: 'loadSettings',
    value: function loadSettings() {
      if (this.settingsExist()) {
        this.settings = _jsonfile2.default.readFileSync(this.settingsPath());
      } else {
        this.buildFromTemplate();
        this.settings = _jsonfile2.default.readFileSync(this.settingsPath());
      }
    }
  }, {
    key: 'templatePath',
    value: function templatePath() {
      return _path2.default.join(_path2.default.dirname(module.id), this.relativePath);
    }
  }, {
    key: 'buildFromTemplate',
    value: function buildFromTemplate() {
      (0, _fsExtra.copySync)(this.templatePath(), this.settingsPath());
    }
  }, {
    key: 'settingsPath',
    value: function settingsPath() {
      return _path2.default.join((0, _shelljs.pwd)(), '.reduxrc');
    }
  }, {
    key: 'settingsExist',
    value: function settingsExist() {
      return (0, _fs.fileExists)(this.settingsPath());
    }
  }, {
    key: 'getSetting',
    value: function getSetting(key) {
      return this.settings[key];
    }
  }, {
    key: 'getAllSettings',
    value: function getAllSettings() {
      return this.settings;
    }
  }, {
    key: 'setSetting',
    value: function setSetting(key, val) {
      this.settings[key] = val;
    }
  }, {
    key: 'setAllSettings',
    value: function setAllSettings(json) {
      this.settings = json;
    }
  }, {
    key: 'save',
    value: function save() {
      _jsonfile2.default.writeFileSync(this.settingsPath(), this.settings);
    }
  }]);

  return ProjectSettings;
}();

exports.default = ProjectSettings;