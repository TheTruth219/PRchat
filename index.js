$(document).ready(function(){
        // Initiating our Auth0Lock
        let lock = new Auth0Lock(
            '0meuN7nt1wo8g1G98g8JKOPrgsk63gUe',
            'thetruth219.auth0.com',//example: lotus.auth0.com
            {
                auth: {
                    params: {
                        scope: 'openid profile'
                    }
                },
                autoclose: true,
                closable: false,
                rememberLastLogin: true
            }
        );

        let profile = JSON.parse(localStorage.getItem('profile'));
        let isAuthenticated = localStorage.getItem('isAuthenticated');

        function updateValues(userProfile, authStatus) {
            profile = userProfile;
            isAuthenticated = authStatus;
        }

        if(!isAuthenticated && !window.location.hash){
            lock.show();//show Lock widget
        }

        // Listening for the authenticated event
        lock.on("authenticated", function(authResult) {
            // Use the token in authResult to getUserInfo() and save it to localStorage
            lock.getUserInfo(authResult.accessToken, function(error, profile) {
                if (error) {
                    // Handle error
                    return;
                }

                localStorage.setItem('accessToken', authResult.accessToken);
                localStorage.setItem('profile', JSON.stringify(profile));
                localStorage.setItem('isAuthenticated', true);
                updateValues(profile, true);
                $("#username").html(profile.name);
            });
        });
    });
