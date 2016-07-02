'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shelljs = require('shelljs');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _denodeify = require('denodeify');

var _denodeify2 = _interopRequireDefault(_denodeify);

var _task = require('../models/task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mkdir = (0, _denodeify2.default)(_fs2.default.mkdir);

var _class = function (_Task) {
  _inherits(_class, _Task);

  function _class(environment) {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, environment));
  }

  _createClass(_class, [{
    key: 'run',
    value: function run(options) {
      var _this2 = this;

      this.dirName = options.dirName;
      this.confirmDir();

      this.ui.writeInfo('Creating new directory...');
      return mkdir(this.dirName).then(function () {
        _this2.ui.writeCreate('Created directory: ' + _this2.dirName);
        (0, _shelljs.cd)(_this2.dirName);
        _this2.initGit();
      });
    }
  }, {
    key: 'confirmDir',
    value: function confirmDir() {
      if ((0, _shelljs.test)('-d', this.dirName)) {
        this.ui.writeError(this.dirName + ' directory already exists!  Please choose another name');
        process.exit(1);
      }
    }
  }, {
    key: 'initGit',
    value: function initGit() {
      this.ui.writeInfo('Setting up tracking with git...');
      (0, _shelljs.exec)('git init', { silent: true });
    }
  }]);

  return _class;
}(_task2.default);

exports.default = _class;