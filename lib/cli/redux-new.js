'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _new = require('../sub-commands/new');

var _new2 = _interopRequireDefault(_new);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subCommand = new _new2.default();

_commander2.default.on('--help', function () {
  subCommand.printUserHelp();
});

_commander2.default.arguments('<project name>').option('-S, --use-ssh', 'Fetch starter kit over ssh').option('-B, --use-boilerplate', 'Fetch Redux-CLI boilerplate instead of react-redux-starter-kit').action(function (dirName, command) {
  subCommand.run({
    dirName: dirName,
    useSsh: command.useSsh,
    useBoilerplate: command.useBoilerplate
  });
}).parse(process.argv);