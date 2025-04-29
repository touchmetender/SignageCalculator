// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXtiSnNBHs1NQXwL6vrK-U71veeMpIpXQ",
  authDomain: "signagematerialdatabaseapp.firebaseapp.com",
  databaseURL: "https://signagematerialdatabaseapp-default-rtdb.firebaseio.com",
  projectId: "signagematerialdatabaseapp",
  storageBucket: "signagematerialdatabaseapp.firebasestorage.app",
  messagingSenderId: "276886100857",
  appId: "1:276886100857:web:ec1b93f74995aa30e1ada8"
};

const app = initializeApp(firebaseConfig);
const firebase = {
  auth: getAuth(app),
  database: getDatabase(app)
};
window.firebase = firebase;
