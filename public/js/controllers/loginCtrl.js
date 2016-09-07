app.controller('loginCtrl', function($scope, $state, $http, authUser){
	// /$scope.user = {}
	if(authUser.isLoggedIn()){
		$state.go('dashboard');
	}

	$scope.dropdownMenu = function(){
        $('.dropdownMenu').fadeToggle();
    }
    $scope.dashboard = function(){
        $state.go('dashboard');
    }
    $scope.logout = function(){
        authUser.logout();
        $state.go('home');
    }
    $scope.profile = function(){
        $state.go('profile');
    }
    $scope.profileSelf = function(){
        $state.go('profile', {email: authUser.getUsername()});
    }
    $scope.settings = function(){
        $state.go('settings');
    }

    $scope.forum = function(){
        $state.go('forum');
    }

    $scope.kcenter = function(){
        $state.go('kcenter');
    }
    $scope.goHome = function(){
        $state.go('home');
    }

	$scope.hidden = false;
	 $scope.togglePopup = function () {
        $scope.hidden = $scope.hidden ? false : true;
        // $('body').toggleClass('blurred');

        if($scope.hidden2 == true){
        	$scope.hidden2 = $scope.hidden2 ? false : true;
        }
    };
    $scope.togglePopup2 = function () {
        $scope.hidden2 = $scope.hidden2 ? false : true;
        // $('body').toggleClass('blurred');

        if($scope.hidden == true){
        	$scope.hidden = $scope.hidden ? false : true;
        }
    };

    $scope.login = function(){
        loginData = {
            email : $scope.email,
            password : $scope.password
        };
        console.log('login = '+loginData)
        $http.post('/api/login', loginData).success(function(response){
            if(response == "success"){
                authUser.setUsername($scope.username);
                $state.reload();
            }
            else {
                alert("Incorrect Username or Password");
            }
        });
    };
    $scope.signup = function(){
        signupData = {
            'fname' : $scope.fname,
            'lname' : $scope.lname,
           // username : $scope.username,
            'email' : $scope.email,
            'password' : $scope.password,
            verifed : false
        }
        console.log(signupData)
        $http.post('/api/signup', signupData).success(function(response){
            if(response == "success"){
                $state.go('dashboard');
            }
        });
    }
    $scope.fbLogin = function(){
        FB.login(function(response){
            if(response.status === 'connected'){
                FB.api(
                    '/me',
                    'GET',
                    {'fields':'id,first_name,last_name,email'},
                    function(response) {
                        // console.log(response);
                        signupData = {
                            fname : response.first_name,
                            lname : response.last_name,
                            username : response.id,
                            email : response.email,
                            password : response.id,
                            verifed : false
                        };

                        loginData = {
                            username : response.id,
                            password : response.id
                        };
        
                        $http.post('/api/login', loginData).success(function(response){
                            if(response == "success"){
                                authUser.setUsername(loginData.username);
                                $state.go('forum');
                            }
                            else {
                                $http.post('/api/signup', signupData).success(function(response){
                                    if(response == "success"){
                                        $state.go('forum');
                                    }
                                });
                            }
                        });
                    }
                );
                FB.api(
                    '/751246094927006/picture',
                    'GET',
                    {},
                    function(response) {
                        // console.log(response.data.url);
                        $rootScope.imgUrlFb = response.data.url
                    }
                );
            }
            else{
                FB.login();
            }
        });

    }

});