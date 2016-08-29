app.controller('dashboardCtrl', function($scope, $state, $http, authUser){
	$scope.loggedOut = false;
    if(authUser.isLoggedIn() == false){
        $scope.loggedOut = true;
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

        $http.post('/api/login', loginData).success(function(response){
            if(response == "success"){
                authUser.setUsername($scope.email);
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
            // username : $scope.username,
            email : $scope.email,
            password : $scope.password,
            verifed : false
        }

        $http.post('/api/signup', signupData).success(function(response){
            if(response == "success"){
                $state.go('forum');
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
                            // username : response.id,
                            email : response.email,
                            password : response.id,
                            verifed : false
                        };

                        loginData = {
                            email : response.email,
                            password : response.id
                        };
        
                        $http.post('/api/login', loginData).success(function(response){
                            if(response == "success"){
                                authUser.setUsername(loginData.email);
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

    $scope.$on('event:google-plus-signin-success', function (event,authResult) {
            var response = authResult.wc;

            signupData = {
                fname : response.Za,
                lname : response.Na,
                // username : response.Ka,
                email : response.hg,
                password : response.Ka,
                verifed : false
            };

            loginData = {
                username : response.hg,
                password : response.Ka
            };

            console.log(signupData);
            console.log(loginData);
            $http.post('/api/login', loginData).success(function(response){
                if(response == "success"){
                    authUser.setUsername(loginData.email);
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
    });

    $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
        console.log(authResult);
    });

    $scope.imgurl = 'uploads/user/'+authUser.getUsername()+".jpg";

    $http.get('/api/listcontracts/username/'+authUser.getUsername()).success(function(response){
        
        $scope.contracts = response;
    });

    $scope.deleteContract = function(id){
        $http.post('/api/deleteContract',{'_id':id}).success(function(res){
            if (res == "success"){
                alert("Contract Deleted Successfully");
                window.location.reload();
            }
        })
    }
    $scope.gotoContract = function(id){
        $state.go('contractReview',{contractId : id});
    }

    $scope.seeTrail = function(id){
        $state.go('auditTrail',{contractId : id});
    }

	$scope.sendContractCategory = function(){
		$state.go('category');
	}
    
    $scope.changedp = function(){
        $state.go('photoUpload');
    }
    
    $('.dashboard-tab1').addClass('tab-active');

    $scope.dashboardTab1 = function(){
        $('.dashboard-tab2-view').hide();
        $('.dashboard-tab1-view').show();
        $('.dashboard-tab1').addClass('tab-active')
        $('.dashboard-tab2').removeClass('tab-active')
    }

    $scope.dashboardTab2 = function(){
        $('.dashboard-tab1-view').hide();
        $('.dashboard-tab2-view').show();
        $('.dashboard-tab2').addClass('tab-active')
        $('.dashboard-tab1').removeClass('tab-active')
    }
    $scope.Tab1 = function(){
        $('.dashboard-tab2-view').hide();
        $('.dashboard-tab1-view').show();
        $('.dashboard-tab1').addClass('tab-active')
        $('.dashboard-tab2').removeClass('tab-active')
    }

    $scope.Tab2 = function(){
        $('.dashboard-tab1-view').hide();
        $('.dashboard-tab2-view').show();
        $('.dashboard-tab2').addClass('tab-active')
        $('.dashboard-tab1').removeClass('tab-active')
    }
    $scope.status = function(contract){
        if (contract.isAccepted) {
            return  "Accepted by \n both parties";
        }
        else if(contract.isSent){
            return  "Sent for Acceptance";

        }
        else if(contract.isSigned){
            return  "Drafted";
        }
        else if(contract.isViewed){
            return  "Sent for Acceptance";
        }
    }
    $scope.imgUrl = function(contractId){
        src = "uploads/contracts/"+ contractId + ".jpg"
        return src;
    }

});