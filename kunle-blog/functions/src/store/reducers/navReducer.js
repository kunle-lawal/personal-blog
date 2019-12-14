"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initState = {
  mobileToggled: false,
  openFullNav: false
};

var navReducer = function navReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'MOBILE_NAV_TOGGLED':
      if (!state.mobileToggled) {
        document.getElementById('body').style.overflow = "hidden";
      } else {
        document.getElementById('body').style.overflow = "auto";
      }

      return _objectSpread({}, state, {
        mobileToggled: !state.mobileToggled
      });

    case 'MOBILE_NAV_RESET':
      return _objectSpread({}, state, {
        mobileToggled: false
      });

    case 'PAGINATE':
      return _objectSpread({}, state, {
        mobileToggled: false
      });

    case 'OPEN_FULL_NAV':
      return _objectSpread({}, state, {
        openFullNav: true
      });

    case 'CLOSE_FULL_NAV':
      return _objectSpread({}, state, {
        openFullNav: false
      });

    case 'TOGGLE_FULL_NAV':
      return _objectSpread({}, state, {
        openFullNav: !state.openFullNav
      });

    default:
      return state;
  }
};

var _default = navReducer;
exports.default = _default;