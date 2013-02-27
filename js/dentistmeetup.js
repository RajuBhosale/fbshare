  function initFB(){
     FB.init({
      appId      : '208605985948123',
      channelUrl : 'http://rajubhosale.github.com/fbshare/channel.html', 
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });
  }

  function checkLoginStatus(){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log("checkLoginStatus :connected & authResponse : ");
        console.log(response.authResponse);
        var accessToken=response.authResponse.accessToken;
        var userID=response.authResponse.userID;
        //sayHi(accessToken,userID);
        /*
          {
            status: 'connected',
            authResponse: {
                accessToken: '...',
                expiresIn:'...',
                signedRequest:'...',
                userID:'...'
            }
          }
        */
        return response;
      } else if (response.status === 'not_authorized') {
        console.log("checkLoginStatus : not_authorized listed in apps but nt yet authorised ");
        return login();

      } else {
        console.log("checkLoginStatus : not_logged_in");
        return login();
      }
    });
  }

  function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log("login() : connected & authResponse : ");
            console.log(response.authResponse);
            var accessToken=response.authResponse.accessToken;
            var userID=response.authResponse.userID; 
            seemsInterested();
            
        } else {
           console.log("login() : cancelled");
        }
    });
  }
 
  function sayHi(accessToken,userID) {
    console.log('sayHi() accessToken : '+accessToken);
    console.log('sayHi() userID : '+userID);
    console.log('sayHi() Welcome!  Fetching your information.... ');
    
    FB.api('/'+userID, function(response) {
        console.log('sayHi() Good to see you, ' + response.name + '.');
    });
  }

  function seemsInterested(){
      FB.api(
        '/me/dentistmeetup:Interest',
        'post',
          { course: 'http://localhost:8000/fbshare/index.html' },
          function(response) {
           if (!response || response.error) {
              alert('Error occurred');
           } else {
              alert('Cook was successful! Action ID: ' + response.id);
           }
        });
  }