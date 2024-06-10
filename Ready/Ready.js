document.addEventListener('DOMContentLoaded', () => {
    let countdownElement = document.getElementById('countdown');
    let countdownValue = 3;

    function updateCountdown() {
        countdownElement.textContent = countdownValue > 0 ? countdownValue : "Go!";
        countdownElement.classList.add('animate');
        void countdownElement.offsetWidth; // Trigger reflow to restart the animation
        countdownElement.classList.remove('animate');
        countdownElement.classList.add('animate');

        if (countdownValue > 0) {
            countdownValue--;
        } else {
            clearInterval(countdownInterval);
            redirectToNextPage();
        }
    }

    function redirectToNextPage() {
        window.location.href = '../Integrated/Game.html'; // Update with the actual URL of the next page
    }

    updateCountdown(); // Initialize the first countdown display
    let countdownInterval = setInterval(updateCountdown, 1000);
});
