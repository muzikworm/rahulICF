var lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN');
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show(function(err, profile, token) {
    if (err) {
      // Error callback
      console.error("Something went wrong: ", err);
    } else {
      // Success calback  

      // Save the JWT token.
      localStorage.setItem('userToken', token);
      // Save the profile
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  });
});