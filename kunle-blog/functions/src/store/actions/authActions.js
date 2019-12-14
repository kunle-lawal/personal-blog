"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSignInModule = exports.changeName = exports.signOut = exports.signUp = exports.signIn = void 0;

var signIn = function signIn(authInfo) {
  return function (dispatch, getState, _ref) {
    var getFirebase = _ref.getFirebase,
        getFirestore = _ref.getFirestore;
    var firebase = getFirebase();
    var firestore = getFirestore();
    var auth = firebase.auth();
    auth.signInWithEmailAndPassword(authInfo.email, authInfo.password).then(function () {
      dispatch({
        type: 'LOGIN_SUCCESS'
      });
    }).catch(function (err) {
      dispatch({
        type: 'LOGIN_ERROR'
      }, err);
    });
  };
};

exports.signIn = signIn;

var signUp = function signUp(authInfo) {
  return function (dispatch, getState, _ref2) {
    var getFirebase = _ref2.getFirebase,
        getFirestore = _ref2.getFirestore;
    var firebase = getFirebase();
    var firestore = getFirestore();
    var auth = firebase.auth();
    auth.createUserWithEmailAndPassword(authInfo.email, authInfo.password).then(function () {
      var user = firebase.auth().currentUser;
      firestore.collection('users').doc(user.uid).set({
        first_name: authInfo.first_name,
        last_name: authInfo.last_name
      });
      dispatch({
        type: 'SIGNUP_SUCCESSFUL'
      });
    }).catch(function (err) {
      dispatch({
        type: 'SIGNUP_ERROR',
        err: err
      });
    });
  };
};

exports.signUp = signUp;

var signOut = function signOut() {
  return function (dispatch, getState, _ref3) {
    var getFirebase = _ref3.getFirebase;
    var firebase = getFirebase();
    firebase.auth().signOut().then(function () {
      dispatch({
        type: 'LOGOUT_SUCCESS'
      });
    }).catch(function (err) {
      dispatch({
        type: 'LOGOUT_ERROR'
      });
    });
  };
};

exports.signOut = signOut;

var changeName = function changeName(newName) {
  return function (dispatch, getState, _ref4) {
    var getFirebase = _ref4.getFirebase,
        getFirestore = _ref4.getFirestore;
    var firestore = getFirestore();
    var firebase = getFirebase();
    var user = firebase.auth().currentUser;
    firestore.collection('users').doc(user.uid).set({
      first_name: newName.first_name,
      last_name: newName.last_name
    }, {
      merge: true
    });
  };
};

exports.changeName = changeName;

var showSignInModule = function showSignInModule() {
  return function (dispatch, getState) {
    dispatch({
      type: 'SHOW_SIGNIN_MODULE'
    });
  };
};

exports.showSignInModule = showSignInModule;