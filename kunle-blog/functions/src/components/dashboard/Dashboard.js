"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _PostList = _interopRequireDefault(require("../stories/PostList"));

var _HeroSpace = _interopRequireDefault(require("./HeroSpace"));

var _Navbar = _interopRequireDefault(require("../layout/Navbar"));

var _Footer = _interopRequireDefault(require("../layout/Footer"));

var _reactRedux = require("react-redux");

var _reactReduxFirebase = require("react-redux-firebase");

var _redux = require("redux");

var _navActions = require("../../store/actions/navActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dashboard =
/*#__PURE__*/
function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Dashboard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Dashboard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      firstLoad: false,
      prevPage: 1
    });

    _defineProperty(_assertThisInitialized(_this), "sameStoryIds", false);

    _defineProperty(_assertThisInitialized(_this), "changePage", function () {
      _this.setState({
        startAt: _this.state.startAt + 1,
        endAt: _this.state.endAt + 1
      });
    });

    return _this;
  }

  _createClass(Dashboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // const {stories } = this.props;
      if (isNaN(this.props.match.params.id) && this.props.match.params.id !== undefined) {
        return 0;
      }

      var timeoutId = window.setTimeout(function () {
        _this2.setState({
          firstLoad: true,
          prevPage: Number(_this2.props.match.params.id)
        });

        _this2.loadType = 'first';
      }, 1000);
      this.setState({
        timeoutId: timeoutId
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // use intervalId from the state to clear the interval
      clearInterval(this.state.timeoutId);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          stories = _this$props.stories,
          currentPage = _this$props.currentPage;
      var prevStory = prevProps.stories ? prevProps.stories : [];
      var currPage = isNaN(currentPage) ? 1 : currentPage; //IF NEW PREVIOUS PAGE IS THE NEW CURRENT PAGE THEN WE ARE GOLDEN//

      if (Number(currPage) === Number(this.state.prevPage) || currentPage === undefined) {
        return 0;
      }

      if (prevStory.length > 0 && this.state.firstLoad) {
        if (prevProps.stories[0].id === stories[0].id) {
          this.sameStoryIds = true;
        } else {
          this.sameStoryIds = false;
          this.setState({
            prevPage: currentPage
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          nav = _this$props2.nav,
          posts = _this$props2.posts,
          auth = _this$props2.auth; // let filteredStories = (stories) ? (stories.filter((story) => {
      //     return !(this.props.banList.includes(story.userID))
      // })) : [];

      var filteredPosts = posts ? posts : [];
      console.log(filteredPosts);

      if (isNaN(this.props.match.params.id) && this.props.match.params.id !== undefined) {
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: "/404"
        });
      } else if (!nav.mobileToggled) {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Navbar.default, null), _react.default.createElement("div", {
          id: "main_body_container",
          className: "main_body_container"
        }, _react.default.createElement(_HeroSpace.default, {
          posts: filteredPosts
        }), _react.default.createElement(_PostList.default, {
          posts: filteredPosts
        })), _react.default.createElement(_Footer.default, null));
      } else {
        return null;
      }
    }
  }]);

  return Dashboard;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    resetView: function resetView() {
      return dispatch((0, _navActions.resetView)());
    }
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    posts: state.firestore.ordered.posts,
    currentPage: ownProps.match.params.id,
    nav: state.nav
  };
};

var _default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactReduxFirebase.firestoreConnect)(function (props, dispatch) {
  return [{
    collection: 'posts',
    orderBy: ['time', 'desc'],
    limit: 10
  }];
}))(Dashboard); // export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect((props, dispatch) => [
//         (props.totalStories <= 0 && (props.match.url === '/' || props.match.params.id === '1')) ? { collection: 'stories', orderBy: ['postID', 'desc'], limit: props.limit } : { collection: 'stories', orderBy: ['postID', 'desc'], startAt: ((props.totalStories - (props.limit * (props.match.params.id - 1))) <= 0) ? -1 : (props.totalStories - (props.limit * (props.match.params.id - 1))) - 1, limit: props.limit }
//     ])
// )(Dashboard)
// endAt: ((props.totalStories - (props.limit * (props.match.params.id))) <= 0) ? 0 : (props.totalStories - (props.limit * (props.match.params.id))) - 1
// (true) ? { collection: 'stories', orderBy: ['postID', 'desc'], limit: 10 } : { collection: 'stories', orderBy: ['postID', 'desc'], startAt: ((props.totalStories - (10 * (props.match.params.id - 1))), endAt: ((props.totalStories - (10 * (props.match.params.id - 1))) > 10) ? (props.totalStories - (10 * props.match.params.id)) : 0 }
// <Pagination paginationState={paginationState} />


exports.default = _default;