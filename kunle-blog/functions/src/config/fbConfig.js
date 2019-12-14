"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/firestore");

require("firebase/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_app.default.initializeApp(config); // firebase.firestore().settings({timestampsInSnapshots: true});
// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);


var _default = _app.default;
exports.default = _default;