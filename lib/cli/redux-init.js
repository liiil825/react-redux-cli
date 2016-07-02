'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _init = require('../sub-commands/init');

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subCommand = new _init2.default();

_commander2.default.on('--help', function () {
  subCommand.printUserHelp();
});

subCommand.run();