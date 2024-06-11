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
 
 
 
  firebase.initializeApp(firebaseConfig);
 
  // Reference the Realtime Database service
  const database = firebase.database();
 
  // Function to retrieve data from the Realtime Database and update the leaderboard
  function updateLeaderboard() {
    const leaderboardRef = database.ref('leaderboard');
 
    leaderboardRef.on('value', (snapshot) => {
      const leaderboardData = snapshot.val();
      const leaderboardList = document.getElementById('leaderboardList');
 
      // Clear existing leaderboard entries
      leaderboardList.innerHTML = '';
 
      // Loop through each entry in the leaderboard data
      Object.entries(leaderboardData).forEach(([key, entry]) => {
        // Create list item for each entry
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${entry.name} - ${entry.score}`;
 
        // Append list item to leaderboard list
        leaderboardList.appendChild(listItem);
      });
    });
  }
 
  // Call the updateLeaderboard function to fetch data and update the leaderboard
  updateLeaderboard();