// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyDZHl03Lrk0onP4ZAfzK2gCoAvRljkVfIw",
  authDomain: "signagematerialdatabaseapp.firebaseapp.com",
  databaseURL: "https://signagematerialdatabaseapp-default-rtdb.firebaseio.com",
  projectId: "signagematerialdatabaseapp",
  storageBucket: "signagematerialdatabaseapp.appspot.com",
  messagingSenderId: "984103840861",
  appId: "1:984103840861:web:4c26e11c92f64acb65d2f8"
};

firebase.initializeApp(firebaseConfig);

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}

firebase.auth().onAuthStateChanged(user => {
  const userInfo = document.getElementById('user-info');
  if (user && userInfo) {
    userInfo.textContent = `Logged in as: ${user.email}`;
  }
});
