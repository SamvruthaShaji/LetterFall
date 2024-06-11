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
    document.getElementById('login').addEventListener('click', playSound);
});