"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthorFeature = function AuthorFeature() {
  return _react.default.createElement("div", {
    className: "post_sidebar author_feature"
  }, _react.default.createElement("div", {
    className: "tab"
  }, _react.default.createElement("h3", null, "About Author"), _react.default.createElement("br", null), _react.default.createElement("div", {
    className: "img"
  }), _react.default.createElement("p", {
    className: ""
  }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, sapiente eaque. Voluptatum, accusantium quo. A repellendus debitis placeat voluptate ducimus error!")));
};

var _default = AuthorFeature;
exports.default = _default;