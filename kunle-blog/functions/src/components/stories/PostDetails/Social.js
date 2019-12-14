"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Link } from 'react-router-dom'
var Social = function Social() {
  return _react.default.createElement("div", {
    className: "social_container"
  }, _react.default.createElement("div", {
    className: "social"
  }, _react.default.createElement("h4", null, "Share "), _react.default.createElement("ul", {
    className: "post_list"
  }, _react.default.createElement("li", {
    className: "social_icon facebook"
  }, _react.default.createElement("i", {
    className: "fab fa-facebook"
  })), _react.default.createElement("li", {
    className: "social_icon twitter"
  }, _react.default.createElement("i", {
    className: "fab fa-twitter"
  })), _react.default.createElement("li", {
    className: "social_icon linkedin"
  }, _react.default.createElement("i", {
    className: "fab fa-linkedin"
  })), _react.default.createElement("li", {
    className: "social_icon envelope"
  }, _react.default.createElement("i", {
    className: "fas fa-envelope"
  })))));
};

var _default = Social;
exports.default = _default;