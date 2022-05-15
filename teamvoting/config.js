import firebase from 'firebase';

// add SDK Firebase

const firebaseConfig = {
  apiKey: "AIzaSyAd79drL4yc67AX3SPnZ9ekE0mrOojhcLM",
  authDomain: "team-voting-4c229.firebaseapp.com",
  databaseURL: "https://team-voting-4c229-default-rtdb.firebaseio.com",
  projectId: "team-voting-4c229",
  storageBucket: "team-voting-4c229.appspot.com",
  messagingSenderId: "531269813908",
  appId: "1:531269813908:web:567fa63242f2e4cf209681"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.database();