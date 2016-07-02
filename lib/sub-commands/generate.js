'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _subCommand = require('../models/sub-command');

var _subCommand2 = _interopRequireDefault(_subCommand);

var _blueprint = require('../models/blueprint');

var _blueprint2 = _interopRequireDefault(_blueprint);

var _generateFromBlueprint = require('../tasks/generate-from-blueprint');

var _generateFromBlueprint2 = _interopRequireDefault(_generateFromBlueprint);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generate = function (_SubCommand) {
  _inherits(Generate, _SubCommand);

  function Generate() {
    _classCallCheck(this, Generate);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Generate).call(this));

    _this.generateTask = new _generateFromBlueprint2.default(_this.environment);
    return _this;
  }

  _createClass(Generate, [{
    key: 'printUserHelp',
    value: function printUserHelp() {
      var _this2 = this;

      var blueprints = _blueprint2.default.list();

      this.ui.writeLine('Available Blueprints:');
      this.ui.writeLine('(sources on the top will override sources below)');
      this.ui.writeLine('');

      blueprints.forEach(function (blueprintSource) {
        _this2.ui.writeLine('  ' + _chalk2.default.blue('Blueprint Source') + ' ===> ' + _chalk2.default.green(blueprintSource.source) + ':');

        blueprintSource.blueprints.forEach(function (blueprint) {
          _this2.ui.writeLine('    ' + blueprint.name + ' ' + _chalk2.default.yellow('<name>'));
          _this2.ui.writeLine('      ' + _chalk2.default.gray(blueprint.description));
        });
        _this2.ui.writeLine('');
      });
    }
  }, {
    key: 'run',
    value: function run(blueprintName, cliArgs) {
      if (cliArgs.debug) this.ui.setWriteLevel('DEBUG');

      this.generateTask.run(blueprintName, cliArgs);
    }
  }]);

  return Generate;
}(_subCommand2.default);

exports.default = Generate;