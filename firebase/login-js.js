import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 
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
const auth = getAuth(app);
 
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
 
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
 
    // Store email and username in local storage
    localStorage.setItem("email", email);
    localStorage.setItem("username", userCredential.user.displayName || "Anonymous");
 
    // Redirect to the score submission page
    window.location.href = "../Ready/Ready.html";
  } catch (error) {
    document.getElementById("message").innerText = error.message;
  }
}
 
// Handle "Forgot Password"
document.getElementById('forget_password_link').addEventListener('click', async () => {
  const email = document.getElementById('login-email').value;
 
  if (!email) {
    alert("Please enter your email address to reset your password.");
    return;
  }
 
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent. Check your inbox.");
  } catch (error) {
    console.error("Error during password reset:", error);
    alert("Could not send password reset email. Please try again.");
  }
});
 
document.getElementById("login").addEventListener("click", login);