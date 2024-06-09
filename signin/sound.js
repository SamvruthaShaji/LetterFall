
        // document.getElementsById('signin_btn').addEventListener('click', function() {
        //     var clickSound = document.getElementById('clickSound');
        //     clickSound.play();
        // });
        
        document.getElementById('signin_btn').addEventListener('click', function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();
        
            // Play the click sound
            var clickSound = document.getElementById('clickSound');
            clickSound.play().catch(function(error) {
                console.error('Error playing sound:', error);
            });
        
            // Simulate a successful login (for demonstration purposes)
            document.getElementById('login_successfull').style.display = 'block';
        });
        