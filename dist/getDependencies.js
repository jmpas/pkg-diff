'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getDependencies;

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDependencies(path) {
  var pkg = require((0, _path.resolve)(path));
  var dependencies = [pkg.dependencies, pkg.devDependencies, pkg.peerDependencies, pkg.opitionalDependencies];
  return _assign2.default.apply(Object, [{}].concat(dependencies));
}