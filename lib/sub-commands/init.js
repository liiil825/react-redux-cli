'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _subCommand = require('../models/sub-command');

var _subCommand2 = _interopRequireDefault(_subCommand);

var _initPrompt = require('../prompts/init-prompt');

var _initPrompt2 = _interopRequireDefault(_initPrompt);

var _setup = require('../prompts/setup');

var _textHelper = require('../util/text-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Init = function (_SubCommand) {
  _inherits(Init, _SubCommand);

  function Init() {
    _classCallCheck(this, Init);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Init).call(this));

    (0, _setup.setupPrompt)('initialization', _prompt2.default);
    return _this;
  }

  _createClass(Init, [{
    key: 'printUserHelp',
    value: function printUserHelp() {
      this.ui.write('inititialization command to create a .reduxrc which has project settings');
    }
  }, {
    key: 'run',
    value: function run() {
      var _this2 = this;

      this.ui.write(this.cliLogo());
      _prompt2.default.get(_initPrompt2.default, function (err, result) {
        _this2.ui.writeInfo('Saving your settings...');
        _this2.settings.setAllSettings(result);
        _this2.settings.save();
        _this2.ui.writeCreate('.reduxrc with configuration saved in project root.');
      });
    }
  }, {
    key: 'cliLogo',
    value: function cliLogo() {
      return (0, _textHelper.success)(_figlet2.default.textSync('Redux-CLI', {
        font: 'Doom',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      }));
    }
  }]);

  return Init;
}(_subCommand2.default);

exports.default = Init;