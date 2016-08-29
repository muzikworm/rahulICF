app.controller('invoiceCtrl', function($scope, $http, $state,contractShare, fileUpload,authUser,$http){

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


	$scope.dayDiff = function(firstDate,secondDate){
		var date2 = new Date(secondDate);
		var date1 = new Date(firstDate);
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
		$scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return($scope.dayDifference);
    }
	id = $state.params.contractId;
	$scope.brandingToggle = false;
    if (id) {
        $scope.imgUrl = "/uploads/contracts/" + id + ".jpg";
        $scope.brandingToggle = true;
        // console.log($scope.imgUrl);
    }

    $scope.uploadFile = function(){
            var file = $scope.userPhoto;
            console.log("File is",file);
            var uploadUrl = "/api/photo";
            fileUpload.uploadFileToUrl(file,id,'./public/uploads/contracts/',uploadUrl);
    };

	$http.get('/api/listcontracts/id/'+id).success(function(response){
		$http.get('/api/profile/'+authUser.getUsername()).success(function(response){
			if (response == "failed") {
				console.log("Error in retrieving user data")
			}
			else
				$scope.freelanceEmail = response.email;
		})
	   	details = response;
		// console.log(details);
		$scope.feeType = details.feeType;
		$scope.freelancer = details.freelancer;
		$scope.freelanceCompany = details.freelanceCompany;
	    $scope.freelanceTitle = details.freelanceTitle;
	    $scope.milestone = details.milestone;
	    if ($scope.freelanceTitle == "Null") {
	    	$scope.freelanceTitle == '';
	    }
	    if ($scope.freelanceCompany == "Null") {
	    	$scope.freelanceCompany = '';
	    }
	    if ($scope.clientTitle == "Null") {
	    	$scope.clientTitle == '';
	    }
	    if ($scope.clientCompany == "Null") {
	    	$scope.clientCompany = '';
	    }
	    var milestoneFactor = parseInt($scope.milestone.fee[$scope.milestoneNumber]) /100;
	    $scope.freelanceOwnership = details.freelanceOwnership;
	    $scope.client = details.client;
	    $scope.clientOwnership = details.clientOwnership;
		$scope.issueDate = new Date();
		$scope.dueDate = new Date();
		$scope.invoiceDays = details.invoiceDays;
		$scope.dueDate = new Date($scope.dueDate.setDate($scope.issueDate.getDate() + parseInt($scope.invoiceDays)));
		$scope.workSubject = details.workSubject;
		$scope.iterationFee = details.iterationFee;
		$scope.iterations = details.iterations;
		$scope.duration = $scope.dayDiff(details.startDate,details.endDate);
		var time;
		if (details.feeType != 'a Pro-Rated Charge') {
			time = 1;
		}
		else if (details.proratedType == "Per Hour") {
			time = $scope.duration * 24;
		}
		else if (details.proratedType == "Per Week") {
			time = $scope.duration/7;
			console.log(time);
		}
		else if (details.proratedType == "Per Day") {
			time = $scope.duration;
		}
		else if (details.proratedType == "Per Month") {
			time = $scope.duration/30; 
		}
		
		if (details.feeType != 'in Milestones' ) {

			milestoneFactor = 1;
		}

		$scope.lineTotal = parseInt(details.fee) * parseInt(time) * milestoneFactor ;
		$scope.subtotal = $scope.lineTotal;
		$scope.advancePayment = details.advancePayment*$scope.subtotal/100;
		$scope.total = parseInt($scope.subtotal) - parseInt($scope.advancePayment);
		$scope.currency = details.currency;
		$scope.lateFee = details.latePayment;
		

		
		$scope.calculate = function(){
			if(details.iterations>=$scope.units){
				units = 0;
			}
			else
				units = parseInt($scope.units) - parseInt(details.iterations);
		
			$scope.lineTotal = units * parseInt($scope.iterationFee) + parseInt(details.fee) * parseInt(time)* milestoneFactor ;
			$scope.subtotal = $scope.lineTotal;
			$scope.total = parseInt($scope.subtotal) - parseInt($scope.advancePayment) ;
			console.log($scope.total)
		} 
		$scope.savePdf = function(){

			var invoiceData = {
				"paid" : false,
				"freelancer" : $scope.freelancer,
				"freelanceCompany" : $scope.freelanceCompany,
				"freelanceTitle" : details.freelanceTitle,
				"freelanceOwnership" : $scope.freelanceOwnership,
			    "client" : $scope.client,
			    "clientCompany" : $scope.clientCompany,
			    "clientOwnership" : $scope.clientOwnership,
				'issueDate' : $scope.issueDate,
				"dueDate" : $scope.dueDate,
				"workSubject" : $scope.workSubject,
				"iterations" : $scope.iterations,
				"iterationFee" : $scope.iterationFee,
				"lineTotal" : $scope.lineTotal,
				"subtotal" : $scope.subtotal,
				"advancePayment" : $scope.advancePayment,
				"total" : $scope.total,
				"currency" : $scope.currency,
				"lateFee" : $scope.lateFee,
				"discount" : $scope.discount,

			}
			console.log(invoiceData);

			$http.post('/api/invoice',invoiceData).success(function(response){
				alert(response);
			});
	    	html2canvas(document.getElementById('content'), {
	            onrendered: function (canvas) {
	                var data = canvas.toDataURL();
	                var docDefinition = {
	                    content: [{
	                        image: data,
	                        width: 500
	                    }]
	                };
	                pdfMake.createPdf(docDefinition).download("invoice.pdf");
	            }
	        });
	    };
	 });

});