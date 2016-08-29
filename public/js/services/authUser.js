app.factory('authUser', function($sessionStorage) {
	return {
		setUsername: function(user){
		$sessionStorage.username = user;
		},
		getUsername: function(){
			return $sessionStorage.username;
		},
		isLoggedIn: function() {
	    	return Boolean($sessionStorage.username);
	    },
	    logout: function() {
	      delete $sessionStorage.username;
	    }
	};
});