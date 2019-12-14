"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeaturedPost = function FeaturedPost(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "featured_post"
  }, _react.default.createElement("div", {
    className: "featured_post_image"
  }, _react.default.createElement("img", {
    src: "",
    alt: ""
  })), _react.default.createElement("div", {
    className: "featured_post_info"
  }, _react.default.createElement("header", null, _react.default.createElement("h1", {
    className: "featured_post_info_title"
  }, "Blog can be everything nowadays"), _react.default.createElement("div", {
    className: "featured_post_info_description"
  }, _react.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores possimus culpa officiis sed autem saepe aspernatur id ad, doloremque quod recusandae dolor doloribus nobis. Illum labore fugiat harum eos ab?"))))), _react.default.createElement("div", {
    className: "featured_post_arrow"
  }, _react.default.createElement("i", {
    className: "fas fa-arrow-left"
  }), _react.default.createElement("i", {
    className: "fas fa-arrow-right"
  })));
};

var _default = FeaturedPost;
exports.default = _default;