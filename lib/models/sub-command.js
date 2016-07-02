'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _projectSettings = require('./project-settings');

var _projectSettings2 = _interopRequireDefault(_projectSettings);

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubCommand = function SubCommand() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, SubCommand);

  this.rawOptions = options;
  this.settings = options.settings || new _projectSettings2.default();
  this.ui = options.ui || new _ui2.default();

  this.environment = {
    ui: this.ui,
    settings: this.settings
  };
};

exports.default = SubCommand;