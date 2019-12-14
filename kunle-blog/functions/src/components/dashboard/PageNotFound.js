"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _Navbar = _interopRequireDefault(require("../layout/Navbar"));

var _Footer = _interopRequireDefault(require("../layout/Footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageNotFound = function PageNotFound(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Navbar.default, null), _react.default.createElement("div", {
    className: "center-align large page_not_found_container"
  }, _react.default.createElement("div", {
    className: "page_not_found"
  }, _react.default.createElement("h1", null, "404"), _react.default.createElement("h4", null, "Page not found"), _react.default.createElement("p", null, " The page you are looking for does not exist anywhere on our servers. Not sure how you got here but lets get you  ", _react.default.createElement(_reactRouterDom.NavLink, {
    className: "center",
    to: "/"
  }, " ", _react.default.createElement("span", {
    className: ""
  }, "Home"), " ")))), _react.default.createElement(_Footer.default, null));
};

var _default = PageNotFound;
exports.default = _default;