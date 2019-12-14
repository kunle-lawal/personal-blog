"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initState = {
  show_signUp: false,
  show_signIn: false,
  signIn_error: '',
  signUp_error: ''
};

var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        show_signIn: true,
        signIn_error: action.err.message
      };

    case 'LOGIN_SUCCESS':
      window.location = '/';
      return {
        show_signIn: false,
        signIn_error: ''
      };

    case 'SIGNUP_SUCCESSFUL':
      window.location = '/';
      return {
        show_signUp: false,
        signUp_error: ''
      };

    case 'SIGNUP_ERROR':
      return {
        signUp_error: action.err.message,
        show_signUp: true
      };

    case 'USER_DELETED':
      break;

    case 'SHOW_SIGNUP_MODULE':
      return _objectSpread({}, state, {
        show_signUp: true
      });

    case 'SHOW_SIGNIN_MODULE':
      return _objectSpread({}, state, {
        show_signIn: true
      });

    case 'CLOSE_MODULE':
      return _objectSpread({}, state, {
        show_signUp: false,
        show_signIn: false
      });

    default:
      return state;
  }

  return 0;
};

var _default = authReducer;
exports.default = _default;