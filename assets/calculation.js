import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXtiSnNBHs1NQXwL6vrK-U71veeMpIpXQ",
  authDomain: "signagematerialdatabaseapp.firebaseapp.com",
  databaseURL: "https://signagematerialdatabaseapp-default-rtdb.firebaseio.com",
  projectId: "signagematerialdatabaseapp",
  storageBucket: "signagematerialdatabaseapp.appspot.com",
  messagingSenderId: "276886100857",
  appId: "1:276886100857:web:ec1b93f74995aa30e1ada8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) location.href = "login.html";
  document.getElementById("userEmail").textContent = `Logged in as: ${user.email}`;
  loadMaterials();
});

function logout() {
  signOut(auth).then(() => location.href = "login.html");
}

function toggleMode() {
  const body = document.body;
  const current = body.classList.contains("dark") ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  body.classList.remove(current);
  body.classList.add(next);
  localStorage.setItem("theme", next);
}

document.body.classList.add(localStorage.getItem("theme") || "dark");

function loadMaterials() {
  const materialSelect = document.getElementById("materialSelect");
  onValue(ref(db, 'materials'), (snapshot) => {
    const data = snapshot.val();
    materialSelect.innerHTML = '<option disabled selected>Select Material</option>';
    for (const category in data) {
      for (const key in data[category]) {
        const mat = data[category][key];
        const opt = document.createElement("option");
        opt.value = mat.material_price;
        opt.textContent = `${mat.material_name} (${category})`;
        materialSelect.appendChild(opt);
      }
    }
  });
}

function updateAreas() {
  const rectW = parseFloat(document.getElementById("rectWidth").value) || 0;
  const rectH = parseFloat(document.getElementById("rectHeight").value) || 0;
  const rectArea = rectW * rectH;
  document.getElementById("rectArea").textContent = rectArea.toFixed(2);

  const diameter = parseFloat(document.getElementById("circleDiameter").value) || 0;
  const circleArea = Math.PI * Math.pow(diameter / 2, 2);
  document.getElementById("circleArea").textContent = circleArea.toFixed(2);
}
document.getElementById("rectWidth").oninput = updateAreas;
document.getElementById("rectHeight").oninput = updateAreas;
document.getElementById("circleDiameter").oninput = updateAreas;

const materialSelect = document.getElementById("materialSelect");
const totalAreaInput = document.getElementById("totalArea");
materialSelect.onchange = updateMaterialCost;
totalAreaInput.oninput = updateMaterialCost;

function updateMaterialCost() {
  const price = parseFloat(materialSelect.value) || 0;
  const area = parseFloat(totalAreaInput.value) || 0;
  document.getElementById("materialPrice").textContent = price.toFixed(2);
  document.getElementById("materialCost").textContent = (price * area).toFixed(2);
}
