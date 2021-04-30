import firebase from 'firebase/app' 
// import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'
var app = firebase.initializeApp({
	apiKey: "AIzaSyCIjvBYThkp_b7aXrquzF8pJMcCZ_XaQJI",
	authDomain: "evernote-clone-freecodecamp.firebaseapp.com",
	projectId: "evernote-clone-freecodecamp",
	storageBucket: "evernote-clone-freecodecamp.appspot.com",
	messagingSenderId: "310038364549",
	appId: "1:310038364549:web:1f779a4a9b829a448b44ec"
})

// const projectStorage = firebase.storage() 
export const firestore = firebase.firestore()
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const auth = app.auth()
// export { projectStorage,projectFirestore ,timestamp,auth }
export default app
