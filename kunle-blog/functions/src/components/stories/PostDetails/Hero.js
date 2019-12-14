"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _TimePosted = _interopRequireDefault(require("../../miniComponents/TimePosted"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Hero space will include latest post/featured posts. As well as top 3 posts. 
var HeroSpace = function HeroSpace(_ref) {
  var post = _ref.post;
  return _react.default.createElement("div", {
    className: "post_hero"
  }, _react.default.createElement("div", {
    className: "post_byline"
  }, _react.default.createElement("div", {
    className: "post_title post_item"
  }, _react.default.createElement("h1", {
    dangerouslySetInnerHTML: {
      __html: post ? post.title : ''
    }
  })), _react.default.createElement("div", {
    className: "post_meta post_item"
  }, _react.default.createElement("div", {
    className: "metas"
  }, _react.default.createElement("h4", null, "December 6th, 2019"), _react.default.createElement("div", {
    className: "actions meta"
  }, _react.default.createElement("div", {
    className: "totalComments icon_container action"
  }, _react.default.createElement("i", {
    className: "far fa-comment icon"
  }, _react.default.createElement("span", null, 88))), _react.default.createElement("div", {
    className: "views icon_container noselect action"
  }, _react.default.createElement("i", {
    id: "views",
    className: "far fa-eye icon"
  }, _react.default.createElement("span", {
    id: "views"
  }, 100)))))), _react.default.createElement("div", {
    className: "author post_item"
  }, _react.default.createElement("h4", null, "By - Adam Lavine"))));
};

var _default = HeroSpace;
exports.default = _default;