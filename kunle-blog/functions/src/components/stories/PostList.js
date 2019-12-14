"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PostSummary = _interopRequireDefault(require("./PostSummary"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostList = function PostList(_ref) {
  var posts = _ref.posts;
  return _react.default.createElement("div", {
    className: "main_body"
  }, _react.default.createElement("div", {
    className: "my_post_container"
  }, posts && posts.map(function (post, index) {
    return _react.default.createElement(_reactRouterDom.Link, {
      to: "/post/post-1",
      key: index
    }, _react.default.createElement(_PostSummary.default, {
      post: post,
      key: index
    }));
  })));
};

var _default = PostList;
exports.default = _default;