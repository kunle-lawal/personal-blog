"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addComment = void 0;

var addComment = function addComment(theComment) {
  return function (dispatch, getState, _ref) {
    var getFirebase = _ref.getFirebase,
        getFirestore = _ref.getFirestore;
    // make asyn call to database
    var added = false;
    var firestore = getFirestore();
    var firebase = getFirebase();

    var _getState = getState(),
        comments = _getState.comments;

    var storyCollection = firestore.collection('stories');
    var comment = theComment.comment,
        fbDocument = theComment.fbDocument,
        userProfile = theComment.userProfile;
    var user = firebase.auth().currentUser; // return 0;

    if (comments.addedComments) {
      return 0;
    }

    storyCollection.doc(fbDocument).collection('comments').add({
      comment: comment,
      user: userProfile.first_name + ' - ' + userProfile.last_name,
      time: new Date(),
      createdAt: new Date().getTime()
    }).then(function () {
      firestore.collection('stories').doc(fbDocument).set({
        commentsTotal: firebase.firestore.FieldValue.increment(1)
      }, {
        merge: true
      });
      firestore.collection('users').doc(user.uid).set({
        lastComment: Date.now()
      }, {
        merge: true
      });
      dispatch({
        type: 'ADDED_COMMENT',
        story: comment
      });
    }).catch(function (err) {
      dispatch({
        type: 'CREATED_COMMENT_ERROR',
        err: err
      });
    });
  };
};

exports.addComment = addComment;