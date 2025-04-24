
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXtiSnNBHs1NQXwL6vrK-U71veeMpIpXQ",
  authDomain: "signagematerialdatabaseapp.firebaseapp.com",
  projectId: "signagematerialdatabaseapp",
  storageBucket: "signagematerialdatabaseapp.firebasestorage.app",
  messagingSenderId: "276886100857",
  appId: "1:276886100857:web:ec1b93f74995aa30e1ada8",
  measurementId: "G-R4EHYT0MW6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentCategory = "Metals";
let table = null;

async function loadData(category) {
  const colRef = collection(db, "materials", category, "items");
  const snapshot = await getDocs(colRef);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  table.setData(data);
}

function initTable() {
  table = new Tabulator("#material-table", {
    height: "500px",
    layout: "fitColumns",
    columns: [
      { title: "Code", field: "code", editor: "input" },
      { title: "Name", field: "name", editor: "input" },
      { title: "Price", field: "price", editor: "number" },
      { title: "Unit", field: "unit", editor: "input" },
      { title: "Price/Unit", field: "price_per_unit", editor: "number" },
      { title: "Unit 2", field: "unit2", editor: "input" }
    ],
    cellEdited: async function(cell) {
      const row = cell.getRow().getData();
      await setDoc(doc(db, "materials", currentCategory, "items", row.id || row.code), row);
    },
    data: []
  });
}

document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    loadData(currentCategory);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  initTable();
  loadData(currentCategory);
});
