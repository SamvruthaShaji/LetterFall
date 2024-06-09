
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const caughtLettersContainer = document.getElementById('caught-letters');
    const basket = document.getElementById('basket');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const vowels = 'AEIOU';
    const gameDuration = 15000; // 15 seconds
    const letterInterval = 1000; // Create a new letter every second
    let fallenLetters = new Set();
    let caughtLetters = [];
    let vowelsCount = 0;
    let intervalId;

    function createFallingLetter(letter) {
        const letterElement = document.createElement('div');
        letterElement.textContent = letter;
        letterElement.classList.add('letter');
        gameContainer.appendChild(letterElement);

        const isVowel = vowels.includes(letter);
        const speed = isVowel ? Math.random() * 2 + 1 : Math.random() * 5 + 3; // Vowels: 1-3s, Consonants: 3-8s
        letterElement.style.animationDuration = `${speed}s`;
        letterElement.style.left = `${Math.random() * 90}%`; // Random horizontal position

        // Remove letter after animation ends and check if caught
        letterElement.addEventListener('animationiteration', () => {
            fallenLetters.delete(letter);
            letterElement.remove();
        });
        letterElement.addEventListener('animationend', () => {
            const basketRect = basket.getBoundingClientRect();
            const letterRect = letterElement.getBoundingClientRect();
            if (
                letterRect.bottom >= basketRect.top &&
                letterRect.left >= basketRect.left &&
                letterRect.right <= basketRect.right
            ) {
                caughtLetters.push(letter);
                letterElement.remove(); // Remove the letter immediately when caught
            }
        });
    }

    function startFallingLetters() {
        intervalId = setInterval(() => {
            if (fallenLetters.size >= letters.length || (Date.now() - startTime > gameDuration && vowelsCount >= 3)) {
                clearInterval(intervalId);
                setTimeout(showCaughtLetters, 1000); // Show caught letters after a short delay
                return;
            }

            let randomIndex = Math.floor(Math.random() * letters.length);
            let randomLetter = letters[randomIndex];

            // Ensure at least 3 vowels fall
            if (vowelsCount < 3) {
                randomLetter = vowels[Math.floor(Math.random() * vowels.length)];
                if (!fallenLetters.has(randomLetter)) {
                    vowelsCount++;
                }
            }

            if (!fallenLetters.has(randomLetter)) {
                createFallingLetter(randomLetter);
                fallenLetters.add(randomLetter);
            }
        }, letterInterval);

        setTimeout(() => {
            clearInterval(intervalId);
        }, gameDuration);
    }

    function showCaughtLetters() {
        caughtLettersContainer.textContent = 'Caught Letters: ' + caughtLetters.join(', ');
        caughtLettersContainer.style.display = 'block';
    }

    // Move basket with mouse
    document.addEventListener('mousemove', (event) => {
        const basketWidth = basket.offsetWidth;
        const containerRect = gameContainer.getBoundingClientRect();
        let newLeft = event.clientX - containerRect.left - basketWidth / 2;
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - basketWidth));
        basket.style.left = `${newLeft}px`;
    });

    const startTime = Date.now();
    startFallingLetters();
});
