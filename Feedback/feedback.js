//firebase
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
// Get a reference to the authentication service
const auth = firebase.auth();

// Configure email/password authentication
const emailAuthProvider = new firebase.auth.EmailAuthProvider();


// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevents the form from submitting

    // Collect input values
    let name = document.querySelector('input[type="text"]').value;
    let feedback = document.getElementById('message').value;
    let rating = parseInt(output.innerText.split(' ')[2]); // Extract the rating from the output text

    // Create notification element
    let notification = document.getElementById("notification");
    notification.style.display = "block";
    notification.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span><strong>Thank you, ' + name + '!</strong> Your feedback has been submitted:<br>' + feedback;

    // Automatically remove notification after 5 seconds
    setTimeout(function() {
        notification.style.display = 'none';
    }, 5000);

    // Push data to Firebase using push() to append new entries
    database.ref('feedback').push({
        name: name,
        feedback: feedback,
        rating: rating
    }).then(() => {
        console.log('Feedback submitted successfully:', { name, feedback, rating });
    }).catch(error => {
        console.error('Error submitting feedback:', error);
    });
}



// Add event listener to the submit button
document.getElementById('feedbackForm').addEventListener('submit', handleSubmit);

 

// To access the stars
let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");


// Function to update rating
function gfg(n) {
    remove();
    for (let i = 0; i < n; i++) {
        let cls;
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
    output.innerText = "Rating is: " + n + "/5";
}

// To remove the pre-applied styling
function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}