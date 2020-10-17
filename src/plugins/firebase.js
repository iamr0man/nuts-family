// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-analytics.js"></script>
import firebase from 'firebase'
import 'firebase/firestore' // if use firestore
import 'firebase/storage' // if use storage
// import { firebaseConfig } from '../../configs/firebase'
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBZx_8fsqIiJsy3sVPhd-9bwVI9brVC1uo',
  authDomain: 'nuts-family.firebaseapp.com',
  databaseURL: 'https://nuts-family.firebaseio.com',
  projectId: 'nuts-family',
  storageBucket: 'nuts-family.appspot.com',
  messagingSenderId: '1080084695529',
  appId: '1080084695529'
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  // firebase.analytics()
}
// firebase.firestore().settings({ timestampsInSnapshots: true })

export const db = firebase.firestore()
export const FieldValue = firebase.firestore.FieldValue
export const auth = firebase.auth()
export const storage = firebase.storage()

export default (context) => {
  const { store } = context
  try {
    auth.onAuthStateChanged((user) => {
      store.dispatch('auth/FETCH_USER', user)
      store.dispatch('auth/GET_PROFILE', user)
      store.dispatch('cart/GET_CART', user)
    })
  } catch (error) {}
}
