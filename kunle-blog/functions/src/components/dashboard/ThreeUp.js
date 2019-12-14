"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwoUp = exports.ThreeUp = void 0;

var _react = _interopRequireDefault(require("react"));

var _TimePosted = _interopRequireDefault(require("../miniComponents/TimePosted"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postList = function postList() {
  return _react.default.createElement("div", {
    className: "my_post"
  }, _react.default.createElement("div", {
    className: "image_container"
  }, _react.default.createElement("img", {
    src: "",
    alt: ""
  })), _react.default.createElement("div", {
    className: "post_info"
  }, _react.default.createElement("div", {
    className: "post_blurb"
  }, _react.default.createElement("div", {
    className: "blurb"
  }, _react.default.createElement("h2", null, "How to view section C on rite"), _react.default.createElement("br", null), _react.default.createElement("div", {
    className: "post_meta"
  }, _react.default.createElement(_TimePosted.default, {
    time: 1562813777423
  }), _react.default.createElement("div", {
    className: "metas"
  }, _react.default.createElement("div", {
    className: "actions meta"
  }, _react.default.createElement("div", {
    className: "totalComments icon_container action"
  }, _react.default.createElement("i", {
    className: "far fa-comment icon"
  }, _react.default.createElement("span", null, 100))), _react.default.createElement("div", {
    className: "views icon_container noselect action"
  }, _react.default.createElement("i", {
    id: "views",
    className: "far fa-eye icon"
  }, _react.default.createElement("span", {
    id: "views"
  }, 1000))))))))));
};

var ThreeUp = function ThreeUp(props) {
  return _react.default.createElement("div", {
    className: "post_container"
  }, _react.default.createElement("div", {
    className: "three_up"
  }, postList(), postList(), postList()));
};

exports.ThreeUp = ThreeUp;

var TwoUp = function TwoUp(props) {
  return _react.default.createElement("div", {
    className: "post_container"
  }, _react.default.createElement("div", {
    className: "two_up"
  }, postList(), postList()));
};

exports.TwoUp = TwoUp;