"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Categories = function Categories() {
  return _react.default.createElement("div", {
    className: "post_sidebar categories"
  }, _react.default.createElement("h2", null, "Categories "), _react.default.createElement("div", {
    className: "post_list"
  }, _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("h4", null, "Culture")), _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("h4", null, "Culture")), _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("h4", null, "Culture")), _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("h4", null, "Culture")), _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("h4", null, "Culture")), _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("h4", null, "Culture"))));
};

var _default = Categories;
exports.default = _default;