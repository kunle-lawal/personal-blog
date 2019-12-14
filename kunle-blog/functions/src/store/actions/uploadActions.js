"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = void 0;

var uploadImage = function uploadImage(url) {
  return function (dispatch, getState, _ref) {
    var getFirebase = _ref.getFirebase,
        getFirestore = _ref.getFirestore;
    var firebase = getFirebase();
    var firestore = getFirestore();
    var storeageRef = firebase.storeage().ref('me');
    storeageRef.putString(url, 'base64').then(function () {
      console.log('uploadedFile');
    });
  };
};

exports.uploadImage = uploadImage;