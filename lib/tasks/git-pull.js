'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = require('../models/task');

var _task2 = _interopRequireDefault(_task);

var _denodeify = require('denodeify');

var _denodeify2 = _interopRequireDefault(_denodeify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var exec = (0, _denodeify2.default)(require('child_process').exec);

var _class = function (_Task) {
  _inherits(_class, _Task);

  function _class(environment) {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, environment));
  }

  _createClass(_class, [{
    key: 'run',
    value: function run(gitUrl) {
      var ui = this.ui;
      ui.startProgress('Fetching ' + gitUrl + ' from github.');

      return exec('git pull ' + gitUrl, { silent: true }).then(function (err, stdout, stderr) {
        ui.stopProgress();

        if (err) {
          ui.writeError('Something went wrong... please try again.  Make sure you have internet access');
          ui.writeError('Error code: ' + err);
          ui.writeError(stdout);
          ui.writeError(stderr);
          process.exit(1);
        }
        ui.writeInfo('pulled down repo');
        Promise.resolve();
      });
    }
  }]);

  return _class;
}(_task2.default);

exports.default = _class;