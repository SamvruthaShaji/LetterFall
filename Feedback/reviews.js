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
    feedbackList.innerHTML = ''; // Clear previous feedbacks

    // Reference to the 'feedback' node in the database
    const feedbackRef = database.ref('feedback');

    // Fetch data once from the database
    feedbackRef.once('value', (snapshot) => {
        let feedbacks = [];

        snapshot.forEach((childSnapshot) => {
            // Get feedback data
            const feedbackData = childSnapshot.val();
            feedbacks.push(feedbackData);
        });

        // Sort feedbacks by rating (descending)
        feedbacks.sort((a, b) => b.rating - a.rating);

        // Display only the top 5 ratings
        const top5Feedbacks = feedbacks.slice(0, 5);

        // Iterate through the top 5 feedbacks
        top5Feedbacks.forEach((feedbackData) => {
            const feedbackDiv = createFeedbackDiv(feedbackData);
            feedbackList.appendChild(feedbackDiv);
        });

        // Check if there are more feedbacks to show
        if (feedbacks.length > 5) {
            // Provide a button to show more feedbacks
            const showMoreButton = document.createElement('button');
            showMoreButton.textContent = 'Show More Feedbacks';
            showMoreButton.classList.add('show-more-btn');
            showMoreButton.addEventListener('click', () => {
                feedbackList.innerHTML = ''; // Clear current feedback list

                // Display all feedbacks
                feedbacks.forEach((feedbackData) => {
                    const feedbackDiv = createFeedbackDiv(feedbackData);
                    feedbackList.appendChild(feedbackDiv);
                });

                // Hide the show more button
                showMoreButton.style.display = 'none';
            });

            // Append the show more button
            feedbackList.appendChild(showMoreButton);
        }
    });
}

function createFeedbackDiv(feedbackData) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('feedback-item');

    // Convert numeric rating to star representation
    let stars = '';
    for (let i = 0; i < feedbackData.rating; i++) {
        stars += '★';
    }

    // Construct HTML for feedback with star rating
    const feedbackHTML = `
        <h3>Name: ${feedbackData.name}</h3>
        <p>Feedback: ${feedbackData.feedback}</p>
        <p>Rating: ${stars}</p>
    `;

    // Set HTML content of the div
    feedbackDiv.innerHTML = feedbackHTML;

    return feedbackDiv;
}

// Call the function to fetch feedbacks when the page loads
window.onload = fetchFeedbacks;
