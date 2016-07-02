'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _walkSync = require('walk-sync');

var _walkSync2 = _interopRequireDefault(_walkSync);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fs3 = require('../util/fs');

var _mixin = require('../util/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _textHelper = require('../util/text-helper');

var _fileInfo = require('./file-info');

var _fileInfo2 = _interopRequireDefault(_fileInfo);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var basePath = _config2.default.basePath;


function generateLookupPaths(lookupPaths) {
  lookupPaths = lookupPaths || [];
  lookupPaths = lookupPaths.concat(Blueprint.defaultLookupPaths());
  return _lodash2.default.uniq(lookupPaths);
}

function dir(fullPath) {
  if ((0, _fs3.fileExists)(fullPath)) {
    return _fs2.default.readdirSync(fullPath).map(function (fileName) {
      return _path2.default.join(fullPath, fileName);
    });
  } else {
    return [];
  }
}

var Blueprint = function () {
  function Blueprint(blueprintPath) {
    _classCallCheck(this, Blueprint);

    this.path = blueprintPath;
    this.name = _path2.default.basename(blueprintPath);
  }

  // HOOK: that can be overridden.  Defaults to look in <blueprint-name>/files.


  _createClass(Blueprint, [{
    key: 'filesPath',
    value: function filesPath() {
      return _path2.default.join(this.path, 'files');
    }
  }, {
    key: 'files',
    value: function files() {
      if (this._files) {
        return this._files;
      }

      var filesPath = this.filesPath();

      if ((0, _fs3.fileExists)(filesPath)) {
        this._files = (0, _walkSync2.default)(filesPath);
      } else {
        this._files = [];
      }
      return this._files;
    }
  }, {
    key: '_fileMapTokens',
    value: function _fileMapTokens(options) {
      var standardTokens = {
        __name__: function __name__(options) {
          var name = options.entity.name;
          var casing = options.settings.getSetting('fileCasing') || 'default';
          return (0, _textHelper.normalizeCasing)(name, casing);
        },
        __path__: function __path__(options) {
          return options.originalBlueprintName;
        },
        __root__: function __root__(options) {
          return options.settings.getSetting('sourceBase');
        },
        __test__: function __test__(options) {
          return options.settings.getSetting('testBase');
        }
      };

      // HOOK: calling into the blueprints fileMapTokens() hook, passing along
      // an options hash coming from _generateFileMapVariables()
      var customTokens = this.fileMapTokens(options) || {};
      return Object.assign({}, standardTokens, customTokens);
    }
  }, {
    key: 'generateFileMap',
    value: function generateFileMap(fileMapOptions) {
      var tokens = this._fileMapTokens(fileMapOptions);
      var fileMapValues = _lodash2.default.values(tokens);
      var tokenValues = fileMapValues.map(function (token) {
        return token(fileMapOptions);
      });
      var tokenKeys = _lodash2.default.keys(tokens);
      return _lodash2.default.zipObject(tokenKeys, tokenValues);
    }

    // Set up options to be passed to fileMapTokens that get generated.

  }, {
    key: '_generateFileMapVariables',
    value: function _generateFileMapVariables(entityName, locals, options) {
      var originalBlueprintName = options.originalBlueprintName || this.name;
      var settings = options.settings;
      var entity = options.entity;


      return {
        originalBlueprintName: originalBlueprintName,
        settings: settings,
        entity: entity,
        locals: locals
      };
    }

    // Given a file and a fileMap from locals, convert path names
    // to be correct string

  }, {
    key: 'mapFile',
    value: function mapFile(file, locals) {
      var pattern = void 0,
          i = void 0;
      var fileMap = locals.fileMap || { __name__: locals.camelEntityName };
      for (i in fileMap) {
        pattern = new RegExp(i, 'g');
        file = file.replace(pattern, fileMap[i]);
      }
      return file;
    }
  }, {
    key: '_locals',
    value: function _locals(options) {
      var entityName = options.entity && options.entity.name;
      var customLocals = this.locals(options);
      var fileMapVariables = this._generateFileMapVariables(entityName, customLocals, options);
      var fileMap = this.generateFileMap(fileMapVariables);

      var standardLocals = {
        pascalEntityName: (0, _textHelper.normalizeCasing)(entityName, 'pascal'),
        camelEntityName: (0, _textHelper.normalizeCasing)(entityName, 'camel'),
        snakeEntityName: (0, _textHelper.normalizeCasing)(entityName, 'snake'),
        dashesEntityName: (0, _textHelper.normalizeCasing)(entityName, 'dashes'),
        fileMap: fileMap
      };

      return Object.assign({}, standardLocals, customLocals);
    }
  }, {
    key: '_process',
    value: function _process(options, beforeHook, process, afterHook) {
      var locals = this._locals(options);
      return Promise.resolve().then(beforeHook.bind(this, options, locals)).then(process.bind(this, locals)).then(afterHook.bind(this, options));
    }
  }, {
    key: 'processFiles',
    value: function processFiles(locals) {
      var _this = this;

      var files = this.files();
      var fileInfos = files.map(function (file) {
        return _this.buildFileInfo(locals, file);
      });
      this.ui.writeDebug('built file infos: ' + fileInfos.length);
      var filesToWrite = fileInfos.filter(function (info) {
        return info.isFile();
      });
      this.ui.writeDebug('files to write: ' + filesToWrite.length);
      filesToWrite.map(function (file) {
        return file.writeFile();
      });
    }
  }, {
    key: 'buildFileInfo',
    value: function buildFileInfo(locals, file) {
      var mappedPath = this.mapFile(file, locals);
      this.ui.writeDebug('mapped path: ' + mappedPath);

      return new _fileInfo2.default({
        ui: this.ui,
        templateVariables: locals,
        originalPath: this.srcPath(file),
        mappedPath: this.destPath(mappedPath),
        outputPath: this.destPath(file)
      });
    }

    // where the files will be written to

  }, {
    key: 'destPath',
    value: function destPath(mappedPath) {
      return _path2.default.resolve(basePath, mappedPath);
    }

    // location of the string templates

  }, {
    key: 'srcPath',
    value: function srcPath(file) {
      return _path2.default.resolve(this.filesPath(), file);
    }

    /*
     * install options:
       const blueprintOptions = {
        originalBlueprintName: name,
        ui: this.ui,
        settings: this.settings,
        entity: {
          name: cliArgs.entity.name,
          options cliArgs.entity.options
        }
      }
    */

  }, {
    key: 'install',
    value: function install(options) {
      var ui = this.ui = options.ui;

      ui.writeInfo('installing blueprint...');
      return this._process(options, this.beforeInstall, this.processFiles, this.afterInstall).then(function () {
        ui.writeInfo('finished installing blueprint.');
      });
    }

    // uninstall() {
    // }

    // HOOKS:
  }, {
    key: 'locals',
    value: function locals() {}
  }, {
    key: 'fileMapTokens',
    value: function fileMapTokens() {}
  }, {
    key: 'beforeInstall',
    value: function beforeInstall() {}
  }, {
    key: 'afterInstall',
    value: function afterInstall() {}

    // TODO: add uninstall hooks once support for uninstall exists
    // beforeUninstall() {}
    // afterUninstall() {}

    // HOOK: for normalizing entity name that gets passed in as an arg
    // via the CLI
    // normalizeEntityName(options) {
    // return normalizeEntityName(name)
    // }

  }], [{
    key: 'defaultLookupPaths',
    value: function defaultLookupPaths() {
      return [_path2.default.resolve(_path2.default.join(basePath, 'blueprints')), _path2.default.resolve(__dirname, '..', '..', 'blueprints')];
    }
    // find blueprint given a path or return error
    // look inside current project first and then redux-cli defaults

  }, {
    key: 'lookup',
    value: function lookup(name) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var lookupPaths = generateLookupPaths(options.paths);

      var lookupPath = void 0;
      var blueprintPath = void 0;

      for (var i = 0; lookupPath = lookupPaths[i]; i++) {
        blueprintPath = _path2.default.resolve(lookupPath, name);

        if ((0, _fs3.fileExists)(blueprintPath)) {
          return Blueprint.load(blueprintPath);
        }
      }

      if (!options.ignoreMissing) {
        throw new Error('Unknown blueprint: ' + name);
      }
    }

    // load in the blueprint that was found, extend this class to load it

  }, {
    key: 'load',
    value: function load(blueprintPath) {
      var Constructor = void 0;
      var constructorPath = _path2.default.resolve(blueprintPath, 'index.js');

      if (_fs2.default.lstatSync(blueprintPath).isDirectory()) {
        if ((0, _fs3.fileExists)(constructorPath)) {
          var blueprintModule = require(constructorPath);
          Constructor = (0, _mixin2.default)(Blueprint, blueprintModule);

          return new Constructor(blueprintPath);
        }
      }
    }
  }, {
    key: 'list',
    value: function list() {
      var _this2 = this;

      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return generateLookupPaths(options.paths).map(function (lookupPath) {
        var blueprintFiles = dir(lookupPath);
        var packagePath = _path2.default.join(lookupPath, '../package.json');
        var source = void 0;

        if ((0, _fs3.fileExists)(packagePath)) {
          source = require(packagePath).name;
        } else {
          source = _path2.default.basename(_path2.default.join(lookupPath, '..'));
        }

        var blueprints = blueprintFiles.map(function (filePath) {
          var blueprint = _this2.load(filePath);

          if (blueprint) {
            var description = void 0;
            var name = blueprint.name;

            if (blueprint.description) {
              description = blueprint.description();
            } else {
              description = 'N/A';
            }

            return {
              name: name,
              description: description
            };
          }
        });

        return {
          source: source,
          blueprints: _lodash2.default.compact(blueprints)
        };
      });
    }
  }]);

  return Blueprint;
}();

exports.default = Blueprint;