app.controller('headerCtrl', function($scope,$rootScope, $state,$stateParams, $http, $window, authUser){

    $rootScope.loggedOut = false;
    if(authUser.isLoggedIn() == false){
        $rootScope.loggedOut = true;
    }

    else if($state.current.name === "about"){
        $state.go('about');
    }
    
    $scope.dropdownMenu = function(){
        $('.dropdownMenu').fadeToggle();
    }
    $scope.dashboard = function(){
        $state.go('dashboard');
    }
    $scope.logout = function(){
        authUser.logout();
        $rootScope.loggedOut = true;
        $('.dropdownMenu').hide();
        $scope.confirmed = true;
        $state.go('home');
    }

    $rootScope.profile = function(email){
        $state.go('profile',{email : email});
    }
    $rootScope.profileSelf = function(){
        $state.go('profile', {email: authUser.getUsername()});
        $('.dropdownMenu').fadeToggle();
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
    $scope.request = function(){
        $state.go('request');
    }

    $scope.goHome = function(){
        $state.go('home');
    }
    $scope.goAbout = function(){
        $state.go('about');
    }
    
    $scope.hidden = false;
    
    $rootScope.togglePopup = function () {
        $scope.hidden = $scope.hidden ? false : true;
        
        if($scope.hidden2 == true){
            $scope.hidden2 = $scope.hidden2 ? false : true;
        }
    };
    $rootScope.togglePopup2 = function () {
        $scope.hidden2 = $scope.hidden2 ? false : true;
        
        if($scope.hidden == true){
            $scope.hidden = $scope.hidden ? false : true;
        }
    };
    $('.contactus-popup').hide();
    
    $rootScope.hidden3 = false;
    $scope.togglePopupContact = function(){
        $rootScope.hidden3 = $rootScope.hidden3 ? false : true;
        $('.contactus-popup').toggle();
    }

    $scope.contactus = function(){
        contactusData = {
            name : $scope.username,
            email : $scope.email,
            subject : $scope.subject,
            message : $scope.message
        };
        $http.post('/api/contactus', contactusData).success(function(response){
            if(response == "success"){
                $state.reload();
            }
            else {
                alert("Incorrect Username or Password");
            }
        });
    };
    $scope.login = function(){
        loginData = {
            email : $scope.email,
            password : $scope.password
        };
        $http.post('/api/login', loginData).success(function(response){
            if(response == "success"){
                authUser.setUsername($scope.email);
                $rootScope.loggedOut = false;
                $scope.hidden = false;
                $scope.hidden2 = false;
                $state.go('forum');
            }
            else {
                alert("Incorrect Email or Password");
            }
        });
    };
    $scope.signup = function(){
        signupData = {
            fname : $scope.fname,
            lname : $scope.lname,
            email : $scope.email,
            password : $scope.password,
            cpassword : $scope.cpassword,
            verifed : false
        }
        $http.post('/api/signup', signupData).success(function(response){
            if(response == "success"){
                $state.go('forum');
                authUser.setUsername($scope.email);
                $rootScope.loggedOut = false;
                $scope.hidden = false;
                $scope.hidden2 = false;
            }
            else {
                alert('Email already exists');
            }
        });
    }

    $scope.cpass = function(pass) {
        if($scope.password == pass) {
            $scope.confirm_password = false;
        }
        else {
            $scope.confirm_password = true;   
        }
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
                            fname : $scope.fname,
                            lname : $scope.lname,
                            email : $scope.email,
                            password : $scope.password,
                            cpassword : $scope.cpassword,
                            verifed : false
                        };

                        loginData = {
                            email : response.email,
                            password : response.id
                        };
        
                        $http.post('/api/login', loginData).success(function(response){
                            if(response == "success"){
                                authUser.setUsername($scope.email);
                                $rootScope.loggedOut = false;
                                $scope.hidden = false;
                                
                            }
                            else {
                                $http.post('/api/signup', signupData).success(function(response){
                                    if(response == "success"){
                                        authUser.setUsername($scope.email);
                                        $rootScope.loggedOut = false;
                                        $scope.hidden = false;
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
    
    $scope.googleLogin = function(){
        $scope.$on('event:google-plus-signin-success', function (event,authResult) {
            var response = authResult.wc;

            signupData = {
                fname : $scope.fname,
                lname : $scope.lname,
                email : $scope.email,
                password : $scope.password,
                cpassword : $scope.cpassword,
                verifed : false
            };

            loginData = {
                email : response.hg,
                password : response.Ka
            };
            $http.post('/api/login', loginData).success(function(response){
                if(response == "success"){
                    authUser.setUsername($scope.email);
                    $rootScope.loggedOut = false;
                    $scope.hidden = false;
                    $scope.hidden2 = false;
                    $state.go('forum');
                }
                else {
                    $http.post('/api/signup', signupData).success(function(response){
                        if(response == "success"){
                            authUser.setUsername($scope.email);
                            $rootScope.loggedOut = false;
                            $scope.hidden = false;
                            $scope.hidden2 = false;
                            $state.go('forum');
                        }
                    });
                }
            });
        });

        $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
            console.log(authResult);
        });
    }

    $scope.passreset = function(){
        newpass = {
            token : $stateParams.token,
            password : $scope.newpass
        }
        $http.post('/password_reset', newpass).success(function(response){
                        if(response == "success"){
                            alert("Password reset succesfull")
                            // $window.location.reload();
                        }
                    });
    }

    $scope.forgotpass = function() {
        data = {};
        data.email = $scope.forgotemail
        $http.post('/forgotpass', data).success(function(response){
                        if(response == "success"){
                            alert("Email sent")
                            // $window.location.reload();
                        }
                    });
    }

    $http.get('/api/listUsers/'+authUser.getUsername()).then(function(response){        
        if(response.data.confirmed === true){
            $scope.confirmed = true;
        }
        else if(response.data.confirmed === false){
            $scope.confirmed = false;
        }
        else{
            $scope.confirmed = true;
        }
    });
});