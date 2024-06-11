import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5rA0JUlvNe-nyqzT5hG9uxEeU97scMS0",
  authDomain: "letter-fall.firebaseapp.com",
  projectId: "letter-fall",
  storageBucket: "letter-fall.appspot.com",
  messagingSenderId: "775023329951",
  appId: "1:775023329951:web:472666ffc276ac8739d8aa",
  measurementId: "G-MQCH3BS54K",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

function createConfetti() {
  const colors = [
    "#DC143C",
    "#1E90FF",
    "#228B22",
    "#9ACD32",
    "#4B0082",
    "#800080",
  ];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(confetti);
  }
}

async function saveUserScore(email, username, score) {
  const userRef = ref(db, "scoreboard/" + email.replace(".", "_"));
  const userSnapshot = await get(userRef);

  if (!userSnapshot.exists()) {
    // If the document does not exist, create a new one
    await set(userRef, {
      username: username,
      score: score,
    });

    console.log("New user score added to the database");
  } else {
    // If the document exists, update the score if the new score is higher
    const userData = userSnapshot.val();
    if (userData.score < score) {
      await update(userRef, {
        score: score,
      });
      console.log("User score updated in the database");
    } else {
      console.log("Existing score is higher, no update performed");
    }
  }
}

window.onload = function () {
  createConfetti();
  const email = localStorage.getItem("email");
  const receivedData = localStorage.getItem("myData");
  const score = receivedData;
  const username = "user";
  saveUserScore(email, username, score);
};
