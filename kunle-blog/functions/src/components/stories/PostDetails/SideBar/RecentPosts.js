"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecentPost = function RecentPost() {
  return _react.default.createElement("div", {
    className: "recent_post post_sidebar"
  }, _react.default.createElement("h2", null, "Recent Posts"), _react.default.createElement("ul", {
    className: "post_list"
  }, _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("div", {
    className: "img red"
  }), _react.default.createElement("div", {
    className: "post_info"
  }, _react.default.createElement("h3", null, "How to improve the welfare affair."), _react.default.createElement("h4", null, 'by Jack man', " / ", 'December 24th, 2019')))), _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("div", {
    className: "img blue"
  }), _react.default.createElement("div", {
    className: "post_info"
  }, _react.default.createElement("h3", null, "How to improve the welfare affair."), _react.default.createElement("h4", null, 'by Jack man', " / ", 'December 24th, 2019')))), _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, null, _react.default.createElement("div", {
    className: "img green"
  }), _react.default.createElement("div", {
    className: "post_info"
  }, _react.default.createElement("h3", null, "How to improve the welfare affair."), _react.default.createElement("h4", null, 'by Jack man', " / ", 'December 24th, 2019'))))));
};

var _default = RecentPost;
exports.default = _default;