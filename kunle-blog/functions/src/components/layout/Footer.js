"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
  // var location = window.location.pathname;
  return _react.default.createElement("footer", null, _react.default.createElement("div", {
    className: "footer_container"
  }, _react.default.createElement("div", {
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
    onChange: function onChange() {
      return;
    },
    value: "Hello",
    placeholder: "Email"
  }), _react.default.createElement("button", {
    className: "btn-flat"
  }, "Subscribe"))))), _react.default.createElement("div", {
    className: "contact tab"
  }, _react.default.createElement("div", {
    className: "contact_info"
  }, _react.default.createElement("h3", null, "Contact Me"), _react.default.createElement("p", null, "Email: olawal196@gmail.com"))), _react.default.createElement("div", {
    className: "social tab"
  }, _react.default.createElement("div", {
    className: "socials"
  }, _react.default.createElement("div", {
    className: "social_icons"
  }, _react.default.createElement("div", {
    className: "social_icon"
  }, _react.default.createElement("i", {
    className: "fab fa-twitter"
  })), _react.default.createElement("div", {
    className: "social_icon"
  }, _react.default.createElement("i", {
    className: "fab fa-linkedin"
  })), _react.default.createElement("div", {
    className: "social_icon"
  }, _react.default.createElement("i", {
    className: "fab fa-github"
  }))))), _react.default.createElement("div", {
    className: "copy"
  }, _react.default.createElement("h4", null, "\xA9 Chrona 2019"))));
};

var _default = Footer;
exports.default = _default;