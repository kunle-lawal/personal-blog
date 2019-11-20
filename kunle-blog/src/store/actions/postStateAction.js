export const createPost = (post, ids) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make asyn call to database
        var added = false;
        const firestore = getFirestore();
        const firebase = getFirebase();
        const {posts} = getState();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection('users');
        console.log(post);

        if(post.options.public) {
            firestore.collection('posts').doc('post-' + post.totalPosts).set({
                title: post.title,
                content: post.content,
                time: new Date(),
                createdAt: new Date().getTime(),
                categories: post.options.categories,
                tags: post.options.tags,
            }).then(() => {
                firestore.collection('totalItems').doc('totalPosts').set({
                    totalPosts: firebase.firestore.FieldValue.increment
                }, { merge: true })
            })
        } else {
            firestore.collection('privatePosts').add({
                title: post.title,
                content: post.content,
                time: new Date(),
                createdAt: new Date().getTime(),
                categories: post.options.categories,
                tags: post.options.tags,
            })
        }

        // const collection = story.underReview ? 'reviews' : 'stories';
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
    }
}

export const increaseViews = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        firestore.collection('stories').doc(id).set({
            views: firebase.firestore.FieldValue.increment(1)
        }, { merge: true })
        // dispatch({ type: 'INCREASE_VIEWS' })
    }
}


const isEmpty = (obj) => {
    for( var key in obj) {
        if (obj[key] === null || obj[key] === '')
            return true;
    }
    return false;
}