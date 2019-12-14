"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Newsletter = function Newsletter() {
  return _react.default.createElement("div", {
    className: "post_sidebar newsletter_container"
  }, _react.default.createElement("h2", null, "Newsletter SignUp"), _react.default.createElement("div", {
    className: "newsletter tab"
  }, _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("form", {
    action: "",
    className: "contact"
  }, _react.default.createElement("div", {
    className: "input-field"
  }, _react.default.createElement("input", {
    id: "email",
    type: "email",
    className: "validate email",
    onChange: "fsfs",
    value: "Hello@yahoo.com",
    placeholder: "Email"
  }), _react.default.createElement("button", {
    className: "btn-flat"
  }, "Subscribe"))))));
};

var _default = Newsletter;
exports.default = _default;