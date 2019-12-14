"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortTime(time) {
  if (time.length > 5) {
    return time;
  }

  var curr_time = new Date().getTime();
  var time_diff = ((curr_time - time) / 1000 / 60).toFixed(0);

  if (time_diff / 60 >= 24) {
    time = (time_diff / 60 / 24).toFixed(0) + "d";
  } else if (time_diff >= 60) {
    time = (time_diff / 60).toFixed(0) + "h";
  } else {
    time = time_diff + "m";
  }

  return time;
}

function TimePosted(props) {
  var time = props.time;
  return _react.default.createElement("h4", null, "December 6th, 2019 ");
}

var _default = TimePosted;
exports.default = _default;