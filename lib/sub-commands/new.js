'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shelljs = require('shelljs');

var _subCommand = require('../models/sub-command');

var _subCommand2 = _interopRequireDefault(_subCommand);

var _createAndStepIntoDirectory = require('../tasks/create-and-step-into-directory');

var _createAndStepIntoDirectory2 = _interopRequireDefault(_createAndStepIntoDirectory);

var _gitPull = require('../tasks/git-pull');

var _gitPull2 = _interopRequireDefault(_gitPull);

var _projectSettings = require('../models/project-settings');

var _projectSettings2 = _interopRequireDefault(_projectSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eventually allow users to create new projects based on a flag
// ie. they can create a new react-redux-starter-kit or a new
// universal react starter kit, etc.

var New = function (_SubCommand) {
  _inherits(New, _SubCommand);

  function New() {
    _classCallCheck(this, New);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(New).call(this));

    _this.createDirTask = new _createAndStepIntoDirectory2.default(_this.environment);
    _this.gitPullTask = new _gitPull2.default(_this.environment);
    return _this;
  }

  _createClass(New, [{
    key: 'printUserHelp',
    value: function printUserHelp() {
      this.ui.write('Command used for generating new redux projects');
    }
  }, {
    key: 'run',
    value: function run(cliArgs) {
      var _this2 = this;

      this.confirmGit();
      this.createDirTask.run(cliArgs).then(function () {
        var fetch_url = void 0;

        if (cliArgs.useBoilerplate) {
          fetch_url = 'https://github.com/SpencerCDixon/redux-cli-boilerplate.git';
        } else {
          fetch_url = 'https://github.com/davezuko/react-redux-starter-kit.git';
        }

        if (cliArgs.useSsh) {
          _this2.ui.writeInfo('Using SSH to fetch repo');

          if (cliArgs.useBoilerplate) {
            fetch_url = 'git@github.com:SpencerCDixon/redux-cli-boilerplate.git';
          } else {
            fetch_url = 'git@github.com:davezuko/react-redux-starter-kit.git';
          }
        }
        _this2.gitPullTask.run(fetch_url).then(function () {
          _this2.createProjectSettings();
          _this2.resetGitHistory();
        });
      });
    }
  }, {
    key: 'confirmGit',
    value: function confirmGit() {
      if (!(0, _shelljs.which)('git')) {
        this.ui.writeError('This script requires you have git installed');
        this.ui.writeInfo('If you have homebrew installed try: brew install git');
        process.exit(1);
      }
    }

    // Should maybe prompt user for permission to do this since it's dangerous.

  }, {
    key: 'resetGitHistory',
    value: function resetGitHistory() {
      this.ui.writeInfo('Removing the starter kit .git folder');
      (0, _shelljs.rm)('-rf', '.git');
      (0, _shelljs.exec)('git init && git add -A && git commit -m"Initial commit"', {
        silent: true
      });
      this.ui.writeCreate('Created new .git history for your project');
      this.ui.writeInfo('Congrats! New Redux app ready to go.  CLI generators configured and ready to go');
    }

    // All settings for react-redux-starter-kit live in this template so when
    // new projects get created users can immediately start using the CLI

  }, {
    key: 'createProjectSettings',
    value: function createProjectSettings() {
      this.ui.writeInfo('creating a default .reduxrc for your project');
      var reduxStarterKitTemplate = '../../templates/.starterrc';
      var settings = new _projectSettings2.default(reduxStarterKitTemplate);
      settings.save();

      this.ui.writeCreate('.reduxrc with starter kit settings saved.');
    }
  }]);

  return New;
}(_subCommand2.default);

exports.default = New;