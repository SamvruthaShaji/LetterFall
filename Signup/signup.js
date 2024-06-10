document.addEventListener('DOMContentLoaded', (event) => {
    const signupButton = document.getElementById('signup-btn');

    signupButton.addEventListener('click', () => {
        window.location.href = '../AccountCreated/accountcreated.html';
    });
});