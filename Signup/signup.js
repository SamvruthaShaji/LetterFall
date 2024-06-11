document.addEventListener('DOMContentLoaded', (event) => {
    const signupButton = document.getElementById('signup-btn');

    signupButton.addEventListener('click', () => {
        window.location.href = '../AccountCreated/accountcreated.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Load the sound file
    const clickSound = new Audio('../Audio/secondButtonClickSound.mp3');

    // Function to play the sound
    function playSound() {
        clickSound.play().catch(error => {
            console.error('Failed to play sound:', error);
        });
    }

    // Add event listener to the button with the ID 'login'
    document.getElementById('signup-btn').addEventListener('click', playSound);
});