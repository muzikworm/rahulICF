app.controller('auditTrailCtrl', function($scope, $state, $http, contractShare, authUser){
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

	$scope.contractId = $state.params.contractId;
	var contractData;
	$scope.validData = false;

	$http.get('/api/listcontracts/id/'+ $scope.contractId ).success(function(res){

		$scope.validData = true;
		contractData = res;
		console.log(contractData);
		
		$scope.offerer                =  contractData.offerer;
		$scope.acceptor               =  contractData.acceptor;
		$scope.offererEmail           =  contractData.offererEmail;
		$scope.acceptorEmail          =  contractData.acceptorEmail;
		$scope.offererIP              =  contractData.offererIP;
		$scope.acceptorIP             =  contractData.acceptorIP;
		$scope.acceptorSignatureDate  =  contractData.acceptorSignatureDate;
		$scope.offererSignatureDate   =  contractData.offererSignatureDate;
		$scope.viewDate               =  contractData.viewDate;
		$scope.viewIP                 =  contractData.viewIP;
		$scope.isSigned               =  contractData.isSigned;
		$scope.isAccepted             =  contractData.isAccepted;
		$scope.isSent                 =  contractData.isSent;
		$scope.isViewed               =  contractData.isViewed;
		$scope.contractDate           =  contractData.contractDate;
		$scope.ipMade                 =  contractData.ipMade;

		if(contractData.clientCompany == 'Null')
			$scope.client             =  contractData.client;
		else 
			$scope.client             =  contractData.clientCompany;
		
		if(contractData.freelanceCompany == 'Null')
			$scope.freelancer         =  contractData.freelancer;
		else 
			$scope.freelancer         =  contractData.freelanceCompany;

		contractDate = contractData.contractDate;

		if (contractData.isAccepted) {
			$scope.contractStatus     =  "The contract completed on";
			$scope.contractAcceptDate =  contractData.acceptorSignatureDate;
			$scope.status             =  "Accepted by both parties";
		}
		else if(contractData.isSent){
			$scope.contractStatus     =  "The contract has not been complete yet";
			$scope.status             =  "Sent for Acceptance";

		}
		else if(contractData.isSigned){
			$scope.contractStatus     =  "The contract has not been complete yet";
			$scope.status             =  "Drafted";
		}
		else if(contractData.isViewed){
			$scope.contractStatus     =  "The contract has not been complete yet";
			$scope.status             =  "Sent for Acceptance";
		}
		else {

		}

	}).error(function(err){
		alert(err);
		console.log(err);
		$scope.validData = false;
	})
	

	// faltu function
	/*$scope.post = function(){
		var data = {
						_id : $scope.contractId,
						signature : "Rahul Maheshwari"
					};
		console.log(data);
		$http.post('/api/sign',data).success(function(res){
				if (res.state == "success") {
					alert (res);
					console.log("contract: ",res.contract);
				}
		})
	}*/
});