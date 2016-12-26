#!/usr/bin/env node --harmony
'use strict';

var _getDependencies = require('./getDependencies');

var _getDependencies2 = _interopRequireDefault(_getDependencies);

var _getDiff = require('./getDiff');

var _getDiff2 = _interopRequireDefault(_getDiff);

var _createMessage = require('./createMessage');

var _createMessage2 = _interopRequireDefault(_createMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deps = (0, _getDiff2.default)((0, _getDependencies2.default)(process.argv[2]), (0, _getDependencies2.default)(process.argv[3]));

deps.map(_createMessage2.default).forEach(function (msg) {
  return console.log(msg);
});