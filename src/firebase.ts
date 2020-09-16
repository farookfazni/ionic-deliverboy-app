import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB92uAWJQ_5Tu4WdZ-1YjQtfmGhfvzhSQg",
    authDomain: "delivery-boy-app-421b9.firebaseapp.com",
    databaseURL: "https://delivery-boy-app-421b9.firebaseio.com",
    projectId: "delivery-boy-app-421b9",
    storageBucket: "delivery-boy-app-421b9.appspot.com",
    messagingSenderId: "375280626284",
    appId: "1:375280626284:web:0a70ba6ec7933ee9058649"
  };

const app =  firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();