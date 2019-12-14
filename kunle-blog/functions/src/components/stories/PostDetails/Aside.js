"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentPost = exports.Newsletter = exports.Categories = exports.AuthorFeature = void 0;

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

exports.AuthorFeature = AuthorFeature;

var Categories = function Categories() {
  return _react.default.createElement("div", {
    className: "post_sidebar categories"
  }, _react.default.createElement("h2", null, "Categories "), _react.default.createElement("div", {
    className: "post_list"
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Measure"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Cultivate"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Coding Camps"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Work"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Places to go"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Culture"), _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Tech Leads")));
};

exports.Categories = Categories;

var Newsletter = function Newsletter() {
  return _react.default.createElement("div", {
    className: "post_sidebar newsletter_container"
  }, _react.default.createElement("h2", null, "Newsletter SignUp"), _react.default.createElement("div", {
    className: "newsletter tab"
  }, _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("form", {
    action: "",
    className: "contact"
  }, _react.default.createElement("div", {
    className: "input-field"
  }, _react.default.createElement("input", {
    id: "email",
    type: "email",
    className: "validate email",
    onChange: function onChange() {
      return;
    },
    value: "Hello@yahoo.com",
    placeholder: "Email"
  }), _react.default.createElement("button", {
    className: "btn-flat"
  }, "Subscribe"))))));
};

exports.Newsletter = Newsletter;

var RecentPost = function RecentPost() {
  return _react.default.createElement("div", {
    className: "recent_post post_sidebar"
  }, _react.default.createElement("h2", null, "Recent Posts"), _react.default.createElement("ul", {
    className: "post_list"
  }, _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, _react.default.createElement("div", {
    className: "img red"
  }), _react.default.createElement("div", {
    className: "post_info"
  }, _react.default.createElement("h3", null, "How to improve the welfare affair."), _react.default.createElement("h4", null, 'by Jack man', " / ", 'December 24th, 2019')))), _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, _react.default.createElement("div", {
    className: "img blue"
  }), _react.default.createElement("div", {
    className: "post_info"
  }, _react.default.createElement("h3", null, "How to improve the welfare affair."), _react.default.createElement("h4", null, 'by Jack man', " / ", 'December 24th, 2019')))), _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, _react.default.createElement("div", {
    className: "img green"
  }), _react.default.createElement("div", {
    className: "post_info"
  }, _react.default.createElement("h3", null, "How to improve the welfare affair."), _react.default.createElement("h4", null, 'by Jack man', " / ", 'December 24th, 2019'))))));
};

exports.RecentPost = RecentPost;