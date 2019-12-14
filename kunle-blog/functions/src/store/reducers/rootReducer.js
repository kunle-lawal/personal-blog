"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postStateReducer = _interopRequireDefault(require("./postStateReducer"));

var _authReducer = _interopRequireDefault(require("./authReducer"));

var _navReducer = _interopRequireDefault(require("./navReducer"));

var _redux = require("redux");

var _reduxFirestore = require("redux-firestore");

var _reactReduxFirebase = require("react-redux-firebase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  nav: _navReducer.default,
  auth: _authReducer.default,
  postState: _postStateReducer.default,
  firestore: _reduxFirestore.firestoreReducer,
  firebase: _reactReduxFirebase.firebaseReducer
});
var _default = rootReducer;
exports.default = _default;