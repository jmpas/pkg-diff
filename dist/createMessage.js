'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMessage;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMessage(dep) {
  var name = '' + dep.name;
  var diff = dep.diff.reduce(function (init, diff) {
    var color = diff.added ? 'green' : diff.removed ? 'red' : 'white';
    return '' + init + _chalk2.default.bold[color](diff.value);
  }, '');
  var versions = (dep.left || 'N/D') + ' / ' + (dep.right || 'N/D');

  return name + ': diff = ' + diff + ' | versions = ' + versions;
}