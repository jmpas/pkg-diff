'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = getDiff;

var _diff = require('diff');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function diff() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return (0, _diff.diffChars)(value1, value2);
}

function getDiff(obj1, obj2) {
  var allProps = [].concat((0, _toConsumableArray3.default)((0, _keys2.default)(obj1)), (0, _toConsumableArray3.default)((0, _keys2.default)(obj2)));
  return allProps.reduce(function (props, prop) {
    return props.includes(prop) ? props : [].concat((0, _toConsumableArray3.default)(props), [prop]);
  }, []).map(function (prop) {
    return {
      name: prop,
      diff: diff(obj1[prop], obj2[prop]),
      left: obj1[prop],
      right: obj2[prop]
    };
  });
}