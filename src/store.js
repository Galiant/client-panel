import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
// Todo

// react-redux-firebase implementation https://github.com/prescottprue/react-redux-firebase

const firebaseConfig = {
  apiKey: 'AIzaSyBCCrRq_gDVcmYyCH60MTQyZreNUAVgE0I',
  authDomain: 'react-client-panel-b2039.firebaseapp.com',
  databaseURL: 'https://react-client-panel-b2039.firebaseio.com',
  projectId: 'react-client-panel-b2039',
  storageBucket: 'react-client-panel-b2039.appspot.com',
  messagingSenderId: '88287278494',
  appId: '1:88287278494:web:1b2d49795073372e'
};

// react-redux firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state
const initialState = {};
// Create store with reducers
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
