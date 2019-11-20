import postStateReducer from './postStateReducer'
import authReducer from './authReducer'
import navReducers from './navReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    nav: navReducers,
    auth: authReducer,
    postState: postStateReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer