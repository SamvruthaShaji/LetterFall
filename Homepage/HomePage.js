document.addEventListener('DOMContentLoaded', () => {
    // Load the sound file
    const clickSound = new Audio('../Audio/secondButtonClickSound.mp3');

    // Function to play the sound
    function playSound(event) {
        event.preventDefault(); // Prevent default link behavior
        clickSound.play().catch(error => {
            console.error('Failed to play sound:', error);
        });
        // Delay navigation to ensure sound plays
        setTimeout(() => {
            window.location.href = event.currentTarget.href;
        }, 100);
    }

    // Add event listeners to all links with the class 'HomePagebtn1'
    document.querySelectorAll('.HomePagebtn1').forEach(link => {
        link.addEventListener('click', playSound);
    });
});