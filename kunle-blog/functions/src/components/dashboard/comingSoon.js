"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComingSoon = function ComingSoon(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "comingSoonContainer"
  }, _react.default.createElement("div", {
    className: "comingSoon"
  }, _react.default.createElement("div", {
    className: "title"
  }, _react.default.createElement("h1", null, "Coming Soon")), _react.default.createElement("div", {
    className: "siteProgress"
  }))));
};

var _default = ComingSoon;
exports.default = _default;