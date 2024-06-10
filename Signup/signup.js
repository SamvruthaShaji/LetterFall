document.addEventListener('DOMContentLoaded', (event) => {
    const signupButton = document.getElementById('signUp');

    signupButton.addEventListener('click', () => {
        window.location.href = 'newpage.html';
    });
});