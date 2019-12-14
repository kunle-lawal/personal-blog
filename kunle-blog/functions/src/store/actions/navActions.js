"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleFullNav = exports.closeFullNav = exports.openFullNav = exports.paginate = exports.resetView = exports.toggleMobileNav = void 0;

var toggleMobileNav = function toggleMobileNav() {
  return function (dispatch, getstate) {
    dispatch({
      type: 'MOBILE_NAV_TOGGLED'
    });
  };
};

exports.toggleMobileNav = toggleMobileNav;

var resetView = function resetView() {
  return function (dispatch, getstate) {
    dispatch({
      type: 'MOBILE_NAV_RESET'
    });
  };
};

exports.resetView = resetView;

var paginate = function paginate(val) {
  return function (dispatch, getstate) {
    dispatch({
      type: 'PAGINATE'
    }, val);
  };
};

exports.paginate = paginate;

var openFullNav = function openFullNav() {
  return function (dispatch) {
    dispatch({
      type: 'OPEN_FULL_NAV'
    });
  };
};

exports.openFullNav = openFullNav;

var closeFullNav = function closeFullNav() {
  return function (dispatch) {
    dispatch({
      type: 'CLOSE_FULL_NAV'
    });
  };
};

exports.closeFullNav = closeFullNav;

var toggleFullNav = function toggleFullNav() {
  return function (dispatch) {
    dispatch({
      type: 'TOGGLE_FULL_NAV'
    });
  };
};

exports.toggleFullNav = toggleFullNav;