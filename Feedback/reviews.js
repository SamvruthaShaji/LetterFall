// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5rA0JUlvNe-nyqzT5hG9uxEeU97scMS0",
    authDomain: "letter-fall.firebaseapp.com",
    databaseURL: "https://letter-fall-default-rtdb.firebaseio.com",
    projectId: "letter-fall",
    storageBucket: "letter-fall.appspot.com",
    messagingSenderId: "775023329951",
    appId: "1:775023329951:web:472666ffc276ac8739d8aa",
    measurementId: "G-MQCH3BS54K"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
const database = firebase.database();

// Function to fetch feedbacks from Firebase
function fetchFeedbacks() {
    const feedbackList = document.getElementById('feedbackList');

    // Reference to the 'feedback' node in the database
    const feedbackRef = database.ref('feedback');

    // Fetch data once from the database
    feedbackRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            // Get feedback data
            const feedbackData = childSnapshot.val();

            // Create a div to display feedback
            const feedbackDiv = document.createElement('div');
            feedbackDiv.classList.add('feedback-item');
            
            // Construct HTML for feedback
            const feedbackHTML = `
                <h3>Name: ${feedbackData.name}</h3>
                <p>Feedback: ${feedbackData.feedback}</p>
                <p>Rating: ${feedbackData.rating}/5</p>
            `;
            
            // Set HTML content of the div
            feedbackDiv.innerHTML = feedbackHTML;

            // Append the div to the feedback list
            feedbackList.appendChild(feedbackDiv);
        });
    });
}

// Call the function to fetch feedbacks when the page loads
window.onload = fetchFeedbacks;
