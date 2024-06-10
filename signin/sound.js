
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
        var formGroups = document.getElementsByClassName('HomePagebtn1 feedback');
        Array.from(formGroups).forEach(function(element) {
            element.addEventListener('click', function(event) {
                // Prevent the default form submission behavior
                event.preventDefault();
        
                // Play the click sound
                var clickSound = document.getElementById('clickSound');
                clickSound.play().catch(function(error) {
                    console.error('Error playing sound:', error);
                });
        
                // Simulate a successful login (for demonstration purposes)
                // document.getElementById('login_successfull').style.display = 'block';
            });
        });

        var formGroups = document.getElementsByClassName('HomePagebtn1 start');
        Array.from(formGroups).forEach(function(element) {
            element.addEventListener('click', function(event) {
                // Prevent the default form submission behavior
                event.preventDefault();
        
                // Play the click sound
                var clickSound = document.getElementById('clickSound');
                clickSound.play().catch(function(error) {
                    console.error('Error playing sound:', error);
                });
        
                // Simulate a successful login (for demonstration purposes)
                // document.getElementById('login_successfull').style.display = 'block';
            });
        });
        var formGroups = document.getElementsByClassName('HomePagebtn1 leaderboard');
        Array.from(formGroups).forEach(function(element) {
            element.addEventListener('click', function(event) {
                // Prevent the default form submission behavior
                event.preventDefault();
        
                // Play the click sound
                var clickSound = document.getElementById('clickSound');
                clickSound.play().catch(function(error) {
                    console.error('Error playing sound:', error);
                });
        
                // Simulate a successful login (for demonstration purposes)
                // document.getElementById('login_successfull').style.display = 'block';
            });
        });
        



        // document.addEventListener('DOMContentLoaded', function() {
        //     function addClickSoundEventListener(className) {
        //         var elements = document.getElementsByClassName(className);
        //         Array.from(elements).forEach(function(element) {
        //             element.addEventListener('click', function(event) {
        //                 event.preventDefault();
                        
        //                 var clickSound = document.getElementById('clickSound');
        //                 clickSound.play().then(function() {
        //                     // After the sound plays, navigate to the href
        //                     window.location.href = element.href;
        //                 }).catch(function(error) {
        //                     console.error('Error playing sound:', error);
        //                     // If there's an error playing the sound, still navigate to the href
        //                     window.location.href = element.href;
        //                 });
        //             });
        //         });
        //     }
        
        //     addClickSoundEventListener('HomePagebtn1 feedback');
        //     addClickSoundEventListener('HomePagebtn1 start');
        //     addClickSoundEventListener('HomePagebtn1 leaderboard');
        // });