import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, get, push, set, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

async function saveUserScore(email, username, score) {
    const scoreboardRef = ref(db, "scoreboard");
    const userSnapshot = await get(scoreboardRef);

    let userEntryKey = null;
    userSnapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.email === email) {
            userEntryKey = childSnapshot.key;
        }
    });

    if (userEntryKey) {
        const userRef = ref(db, "scoreboard/" + userEntryKey);
        const userData = (await get(userRef)).val();
        if (userData.score < score) {
            await update(userRef, { score: score });
            console.log("User score updated in the database");
        } else {
            console.log("Existing score is higher, no update performed");
        }
    } else {
        const newUserRef = push(scoreboardRef);
        await set(newUserRef, { email: email, username: username, score: score });
        console.log("New user score added to the database");
    }
}
