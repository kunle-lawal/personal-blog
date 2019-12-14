"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelatedPosts = exports.RelatedTags = exports.AboutAuthor = void 0;

var _react = _interopRequireDefault(require("react"));

var _ThreeUp = require("../../dashboard/ThreeUp");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AboutAuthor = function AboutAuthor() {
  return _react.default.createElement("div", {
    className: "post_sidebar about_author"
  }, _react.default.createElement("div", {
    className: "tab"
  }, _react.default.createElement("div", {
    className: "img"
  }), _react.default.createElement("div", {
    className: "author_info"
  }, _react.default.createElement("h3", null, "Guest Author"), _react.default.createElement("h4", null, "Jack Pane"), _react.default.createElement("p", {
    className: ""
  }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, sapiente eaque. Voluptatum, accusantium quo. A repellendus debitis placeat voluptate ducimus error!"))));
};

exports.AboutAuthor = AboutAuthor;

var RelatedTags = function RelatedTags() {
  return _react.default.createElement("div", {
    className: "related_tags"
  }, _react.default.createElement("a", {
    href: "/"
  }, "Tech"), _react.default.createElement("a", {
    href: "/"
  }, "Tec"), _react.default.createElement("a", {
    href: "/"
  }, "Economist"), _react.default.createElement("a", {
    href: "/"
  }, "Tech"), _react.default.createElement("a", {
    href: "/"
  }, "Plantations"), _react.default.createElement("a", {
    href: "/"
  }, "React"));
};

exports.RelatedTags = RelatedTags;

var RelatedPosts = function RelatedPosts() {
  return _react.default.createElement("div", {
    className: "related_posts"
  }, _react.default.createElement("h3", null, "Realted Post"), _react.default.createElement(_ThreeUp.TwoUp, null));
};

exports.RelatedPosts = RelatedPosts;