"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactReduxFirebase = require("react-redux-firebase");

var _navActions = require("../../store/actions/navActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navbar = function Navbar(props) {
  var auth = props.auth,
      nav = props.nav,
      Ids = props.Ids,
      profileData = props.profileData;
  var mobile_nav = nav.mobileToggled ? 'mobile_nav' : 'mobile_nav-noDisplay';
  var toggle_mobile_nav = nav.mobileToggled ? 'animate' : '';
  return (// Nav Container.
    _react.default.createElement("nav", {
      className: "nav"
    }, _react.default.createElement("div", {
      className: "top_section"
    }, _react.default.createElement("div", {
      className: "top_section_items"
    }, _react.default.createElement("div", {
      className: "logo_container left"
    }, _react.default.createElement("div", {
      className: "logo"
    }, _react.default.createElement(_reactRouterDom.Link, {
      to: "/"
    }, _react.default.createElement("h2", null, "TITLE")))), _react.default.createElement("div", {
      className: "top_section_item right connect"
    }, _react.default.createElement("div", {
      className: "socials"
    }, _react.default.createElement("div", {
      className: "social_icons"
    }, _react.default.createElement("div", {
      className: "social_icon"
    }, _react.default.createElement("i", {
      className: "fab fa-twitter"
    })), _react.default.createElement("div", {
      className: "social_icon"
    }, _react.default.createElement("i", {
      className: "fab fa-linkedin"
    })), _react.default.createElement("div", {
      className: "social_icon"
    }, _react.default.createElement("i", {
      className: "fab fa-github"
    })), _react.default.createElement("div", {
      className: "social_icon"
    }, _react.default.createElement("i", {
      className: "far fa-envelope"
    }))))))))
  );
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleMobileNav: function toggleMobileNav() {
      return dispatch((0, _navActions.toggleMobileNav)());
    },
    resetView: function resetView() {
      return dispatch((0, _navActions.resetView)());
    },
    openFullNav: function openFullNav() {
      return dispatch((0, _navActions.openFullNav)());
    },
    closeFullNav: function closeFullNav() {
      return dispatch((0, _navActions.closeFullNav)());
    },
    toggleFullNav: function toggleFullNav() {
      return dispatch((0, _navActions.toggleFullNav)());
    }
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    auth: state.firebase.auth,
    nav: state.nav,
    Ids: state.firestore.data.Ids,
    data: state.firestore.data,
    profileData: state.firebase.profile
  };
};

var _default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactReduxFirebase.firestoreConnect)([{
  collection: 'Ids'
}]))(Navbar);

exports.default = _default;