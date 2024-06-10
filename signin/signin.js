document.addEventListener('DOMContentLoaded', (event) => {
    const signinButton = document.getElementById('signin-btn');

    signinButton.addEventListener('click', () => {
        window.location.href = '../Ready/Ready.html';
    });
});
