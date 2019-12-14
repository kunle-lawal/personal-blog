"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increaseViews = exports.createPost = void 0;

var createPost = function createPost(post, ids) {
  return function (dispatch, getState, _ref) {
    var getFirebase = _ref.getFirebase,
        getFirestore = _ref.getFirestore;
    // make asyn call to database
    var added = false;
    var firestore = getFirestore();
    var firebase = getFirebase();

    var _getState = getState(),
        posts = _getState.posts;

    var user = firebase.auth().currentUser;
    var userCollection = firestore.collection('users');
    console.log(post);

    if (post.options.public) {
      firestore.collection('posts').doc('post-' + post.totalPosts).set({
        title: post.title,
        content: post.content,
        time: new Date(),
        createdAt: new Date().getTime(),
        categories: post.options.categories,
        tags: post.options.tags
      }).then(function () {
        firestore.collection('totalItems').doc('totalPosts').set({
          totalPosts: firebase.firestore.FieldValue.increment
        }, {
          merge: true
        });
      });
    } else {
      firestore.collection('privatePosts').add({
        title: post.title,
        content: post.content,
        time: new Date(),
        createdAt: new Date().getTime(),
        categories: post.options.categories,
        tags: post.options.tags
      });
    } // const collection = story.underReview ? 'reviews' : 'stories';
    // const userID = story.underReview ? user.uid : story.userID
    // if(!story.passedReview && !story.underReview) {
    //     firestore.collection('reviews').doc(story.docID).delete().then(() => {
    //         dispatch({ type: 'DOCUMENT_DELETED', story: story });
    //     })
    //     return 0;
    // }
    // firestore.collection('posts').doc('post-1').set()
    // firestore.collection('posts').add({
    //     title: post.title,
    //     content: post.content,
    //     time: new Date(),
    //     createdAt: new Date().getTime(),
    //     categories: 
    // }).then((docRef) => {
    //     console.log('this was posted');
    //     userCollection.doc(user.uid).collection('posts').add({
    //         "posts": {
    //             title: post.title,
    //             content: post.content,
    //             postID: ids.postId,
    //             createdAt: new Date().getTime(),
    //             docId: docRef.id
    //         }
    //     })
    //     firestore.collection('Ids').doc("postIds").update({
    //         totalIds: firebase.firestore.FieldValue.increment(1)
    //     })
    //     firestore.collection('users').doc(user.uid).set({
    //         lastPost: Date.now()
    //     }, { merge: true })
    //     dispatch({ type: 'ADDED_STORY', story: story });
    //     // firestore.collection('reviews').doc(story.docID).delete().then(() => {
    //     //     dispatch({ type: 'DOCUMENT_DELETED', story: story });
    //     // })
    //     // } else {
    //     //     
    //     //     dispatch({ type: 'ADDED_STORY', story: story });
    //     // }
    // }).catch((err) => {
    //     dispatch({ type: 'CREATED_STORY_ERROR', err });
    // })

  };
};

exports.createPost = createPost;

var increaseViews = function increaseViews(id) {
  return function (dispatch, getState, _ref2) {
    var getFirebase = _ref2.getFirebase,
        getFirestore = _ref2.getFirestore;
    var firestore = getFirestore();
    var firebase = getFirebase();
    firestore.collection('stories').doc(id).set({
      views: firebase.firestore.FieldValue.increment(1)
    }, {
      merge: true
    }); // dispatch({ type: 'INCREASE_VIEWS' })
  };
};

exports.increaseViews = increaseViews;

var isEmpty = function isEmpty(obj) {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === '') return true;
  }

  return false;
};