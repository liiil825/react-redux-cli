'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = require('../models/task');

var _task2 = _interopRequireDefault(_task);

var _blueprint = require('../models/blueprint');

var _blueprint2 = _interopRequireDefault(_blueprint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Task) {
  _inherits(_class, _Task);

  function _class(environment) {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, environment));
  }

  // confirm blueprint exists
  // go fetch blueprint object
  // noramlize/setup args to be passed to install
  // install the blueprint


  _createClass(_class, [{
    key: 'run',
    value: function run(blueprintName, cliArgs) {
      // if blueprint doesnt exist
      // this.ui.writeError(
      // 'this is not a valid blueprint. type help for help.. or w/e'
      // );
      // process.exit(1);
      // }

      var mainBlueprint = this.lookupBlueprint(blueprintName);

      var entity = {
        name: cliArgs.entity.name,
        options: cliArgs.entity.options
      };

      var blueprintOptions = {
        originalBlueprintName: blueprintName,
        ui: this.ui,
        settings: this.settings,
        entity: entity
      };

      mainBlueprint.install(blueprintOptions);
    }
  }, {
    key: 'lookupBlueprint',
    value: function lookupBlueprint(name) {
      return _blueprint2.default.lookup(name);
    }
  }]);

  return _class;
}(_task2.default);

exports.default = _class;