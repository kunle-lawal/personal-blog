import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyA65u1A5wy5RUnJFWelFY742XWmq3FLXfs",
    authDomain: "kunle-blog.firebaseapp.com",
    databaseURL: "https://kunle-blog.firebaseio.com",
    projectId: "kunle-blog",
    storageBucket: "kunle-blog.appspot.com",
    messagingSenderId: "66618069940",
    appId: "1:66618069940:web:f9a1e69dcdbceaa9d4d8e1",
    measurementId: "G-B4RV2YJZ7S"
};

firebase.initializeApp(config);
// firebase.firestore().settings({timestampsInSnapshots: true});
// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);

export default firebase;