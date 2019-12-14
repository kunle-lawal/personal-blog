"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TimePosted = _interopRequireDefault(require("../miniComponents/TimePosted"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Link } from 'react-router-dom'
var PostSummary = function PostSummary(props) {
  // const { posts } = props;
  var trunc_text = function trunc_text(text) {
    var maxLen = 200;
    maxLen = text.length < maxLen ? text.length : maxLen;
    return text.substring(0, maxLen);
  };

  console.log(props);
  return _react.default.createElement("div", {
    className: "my_post main_page_article"
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
  }, _react.default.createElement("div", {
    className: "author meta"
  }, _react.default.createElement("h4", null, "By: OlaKunle Lawal")), _react.default.createElement("h2", null, "Recreational Powers"), _react.default.createElement("br", null), _react.default.createElement("div", {
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
  }, _react.default.createElement("span", null, 0))), _react.default.createElement("div", {
    className: "views icon_container noselect action"
  }, _react.default.createElement("i", {
    id: "views",
    className: "far fa-eye icon"
  }, _react.default.createElement("span", {
    id: "views"
  }, 0))))))))));
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    auth: state.firebase.auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(PostSummary);
/*{ < div className = "totalComments" >
        <h4>{story.commentsTotal === 1 ? (story.commentsTotal + ' Comment') : (story.commentsTotal + ' Comments')}</h4>
                    </div >

    <Reactions reactions={reactionProps} /> } */


exports.default = _default;