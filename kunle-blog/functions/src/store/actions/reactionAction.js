"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBookmark = exports.updateReaction = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateReaction = function updateReaction(reaction) {
  return function (dispatch, getState, _ref) {
    var getFirebase = _ref.getFirebase,
        getFirestore = _ref.getFirestore;
    // make async call to database
    var firebase = getFirebase();
    var firestore = getFirestore();
    var user = firebase.auth().currentUser; // const userCollection = firestore.collection('users').doc(user.uid);

    var type = reaction.type[0]; // const isLiked = likeExists(postsLiked, reaction.id, type);
    // if (!isLiked) {
    //     pushData(reaction.id, type);
    // } else {
    //     postsLiked.splice(isLiked, 1)
    //     likeAmt = -1;
    // }
    // userCollection.set({
    //     [reaction.id]: {
    //         reaction: {
    //             [type]: {
    //                 liked: false
    //             }
    //         }
    //     }
    // }, { merge: true })
    // const reactionType = reaction.userData.reactions[reaction.id] ? reaction.userData.reactions[reaction.id].reaction : undefined;
    // const reactionState = reactionType ? reaction.userData.reactions[reaction.id].reaction[type] : false;
    // let likeAmt = 1;
    // let liked = updateUserReactionData({ firestore, firebase }, user.uid, reaction.id, type, (reactionState ? reactionState.liked : false));
    // likeAmt = liked ? -1 : 1;
    // incrementReaction({firebase, firestore}, reaction.id, type, likeAmt);

    var liked = updateUserReactionData({
      firestore: firestore,
      firebase: firebase
    }, user.uid, reaction.docID, type, reaction.userData.reactions === null ? false : reaction.userData.reactions[type] === undefined ? false : reaction.userData.reactions[type].liked);
    var likeAmt = liked ? -1 : 1;
    incrementReaction({
      firebase: firebase,
      firestore: firestore
    }, reaction.docID, type, likeAmt); // if(!reaction) {
    //     firestore.collection('users').doc(user.uid).set({
    //         reactions: {
    //             [type]: {
    //                 liked: true
    //             }
    //         }
    //     })
    // }
    // firestore.collection('users').doc(user.uid).set({
    //     reactions: {
    //         [type]: {
    //             liked: 
    //         }
    //     }
    // })
    // firestore.collection('stories').doc(reaction.id).set({
    //     reactions: {
    //         [type]: {
    //             total: firebase.firestore.FieldValue.increment(likeAmt),
    //         },
    //     }
    // }, { merge: true })
    // pushData(reaction.id, type);
  };
};

exports.updateReaction = updateReaction;

var updateUserReactionData = function updateUserReactionData(data, uid, id, type, action) {
  var firestore = data.firestore;
  firestore.collection('users').doc(uid).set(_defineProperty({}, id, {
    reaction: _defineProperty({}, type, {
      liked: !action
    })
  }), {
    merge: true
  });
  return action;
};

var incrementReaction = function incrementReaction(data, id, type, likeAmt) {
  var firebase = data.firebase,
      firestore = data.firestore;
  firestore.collection('stories').doc(id).set({
    reactions: _defineProperty({}, type, {
      total: firebase.firestore.FieldValue.increment(likeAmt)
    })
  }, {
    merge: true
  });
};

var updateBookmark = function updateBookmark(bookmark) {
  return function (dispatch, getState, _ref2) {
    var getFirebase = _ref2.getFirebase,
        getFirestore = _ref2.getFirestore;
    // make async call to database
    var firebase = getFirebase();
    var firestore = getFirestore();
    var user = firebase.auth().currentUser;
    var story = bookmark.story; // const userCollection = firestore.collection('users').doc(user.uid);

    var bookmarked = updateUserBookmarkData({
      firestore: firestore,
      firebase: firebase
    }, user.uid, story, bookmark.userData.profile === null ? false : bookmark.userData.profile.bookmarked === undefined ? false : bookmark.userData.profile.bookmarked); // return 0;

    if (bookmarked) {
      var removed = removeBookmark({
        firebase: firebase,
        firestore: firestore
      }, user.uid, story);

      if (removed) {
        dispatch({
          type: "REMOVED_BOOKMARK",
          bookmark: {
            id: story.id,
            bookmarked: false
          }
        });
      }
    } else {
      var added = addBookmark({
        firebase: firebase,
        firestore: firestore
      }, user.uid, story);

      if (added) {
        dispatch({
          type: "ADDED_BOOKMARK",
          bookmark: {
            id: story.id,
            bookmarked: true
          }
        });
      }
    }
  };
};

exports.updateBookmark = updateBookmark;

var updateUserBookmarkData = function updateUserBookmarkData(data, uid, story, action) {
  var firestore = data.firestore;
  firestore.collection('users').doc(uid).set(_defineProperty({}, story.id, {
    bookmarked: !action
  }), {
    merge: true
  });
  return action;
};

var addBookmark = function addBookmark(data, uid, story) {
  var firestore = data.firestore;
  var userBookmarkCollection = firestore.collection('users').doc(uid).collection('bookmarks');
  userBookmarkCollection.doc(story.id).set({
    bookmarkedStory: story
  }).then(function () {
    return true;
  }).catch(function () {
    return false;
  });
};

var removeBookmark = function removeBookmark(data, uid, story) {
  var firestore = data.firestore;
  firestore.collection('users').doc(uid).collection('bookmarks').doc(story.id).delete().then(function () {
    return true;
  }).catch(function (error) {
    return false;
  });
};