//------------------------Controller-------------------------
app.controller('profileCtrl', function($scope, $rootScope, $state, $stateParams, $http, authUser,fileUpload){
	

 	
	$scope.saveProfile = function(){

		if ($scope.password == null && $scope.cpass == null) {
			
			profileData = {
				fname : $scope.fname,
				lname : $scope.lname,
				email : $scope.email,
	            // username : $scope.username,
	            cname : $scope.cname,
				title : $scope.title,
				country : $scope.country,
	            city : $scope.city,
	            vatid : $scope.vatid,
	            currency : $scope.currency,
	            bio : $scope.bio

        	}
		}
		else
	        profileData = {
				fname : $scope.fname,
				lname : $scope.lname,
				email : $scope.email,
	            // username : $scope.username,
	            password : $scope.password,
	            cname : $scope.cname,
				title : $scope.title,
				country : $scope.country,
				city : $scope.city,
	            vatid : $scope.vatid,
	            currency : $scope.currency,
	            bio : $scope.bio
	        };
        
        

		$http.post('/api/profile', profileData).success(function(response){
			if(response == "success"){
				$state.reload();
			}
		});
	}


    $scope.uploadFile = function(){
        var file = $scope.userPhoto;
        console.log("File is",file);
        var uploadUrl = "/api/photo";
        fileUpload.uploadFileToUrl(file,$stateParams.email,'./public/uploads/user', uploadUrl);
    };

     $rootScope.imgurl = "/uploads/user/"+authUser.getUsername()+".jpg";

	$http.get('/api/listUsers/'+$stateParams.email).success(function(response){
		$scope.profileData = response;
		$scope.fname = $scope.profileData.fname;
		$scope.lname = $scope.profileData.lname;
		$scope.email = $scope.profileData.email;
		$scope.cname = $scope.profileData.cname;
		$scope.title = $scope.profileData.title;
		$scope.country = $scope.profileData.country;
		$scope.city = $scope.profileData.city;
		$scope.vatid = $scope.profileData.vatid;
		$scope.currency = $scope.profileData.currency;
		$scope.bio = $scope.profileData.bio;

		$scope.fullName = ($scope.fname) + " " + ($scope.lname);
		$scope.fullEmail = $scope.email;
	});

	$http.get('/api/listcontracts/'+$stateParams.email).then(function(response){

		$scope.contractData = response.data;
	
		$scope.tranValue = 0;
		for(var i = 0; i< $scope.contractData.length;i++){

			$scope.tranValue= $scope.contractData[i].fee+$scope.tranValue;			

		}
		$scope.tranCount = $scope.contractData.length;

	})

	


	$scope.QuestionsCount =0;
	$scope.AnswersCount =0;
	$http.get('/api/forum/listQuestions/').success(function(response){
		$scope.forumData = response;
		for(var i=0;i<$scope.forumData.length;i++){
			if($scope.forumData[i].askedbyEmail === $stateParams.email){
				$scope.QuestionsCount++;
			}
		}
	});

    $http.get('/api/forum/listAnswers/'+$stateParams.email).then(function(response){
        $scope.AnswersCount = response.data.length;
    });


	$('.profile-tab1').addClass('tab-active');

	$scope.profileTab1 = function(){
		$('.profile-tab2-view').hide();
		$('.profile-tab1-view').show();
		$('.profile-tab1').addClass('tab-active')
		$('.profile-tab2').removeClass('tab-active')
	}

	$scope.profileTab2 = function(){
		$('.profile-tab1-view').hide();
		$('.profile-tab2-view').show();
		$('.profile-tab2').addClass('tab-active')
		$('.profile-tab1').removeClass('tab-active')
	}


	$http.get('/api/verified').then(function(response){
		
		for(var i=0;i<response.data.length;i++){
			if(response.data[i].username === authUser.getUsername()){
				var verified = true;
			}
		}

		if(verified){
			$scope.isVerified = true;
		}
	});	

	var editCount = 2;
	
	if($scope.username != authUser.getUsername()){
		$('.edit-btn').hide();
		$('.upload-label').hide();
	}

	$('.profile-tab1-view input').attr("readonly", "readonly");
	$('textarea').attr("readonly", "readonly");
	$('.profile-tab1-view input[type="submit"]').hide();
	$('.profile-tab1-view input[type="password"]').hide();
	$('.profile-tab1-view input[type="password"]').css("border", "1px solid #14646d;");
	
	$('.profile-tab1-view input').dblclick(function(){

	// $('.edit-btn').on('dblclick', function(){

		if(editCount%2 == 0){
			$('.profile-tab1-view input').removeAttr("readonly");
			$('textarea').removeAttr("readonly");
			$('.profile-tab1-view input').css("border-bottom", "1px solid #14646d");
			$('.profile-tab1-view textarea').css("border-bottom", "1px solid #14646d");
			$('.profile-tab1-view input[type="submit"]').show();
			$('.profile-tab1-view input[type="password"]').show();
			editCount++;
		}
		else{
			$('.profile-tab1-view input').attr("readonly", "readonly");
			$('textarea').attr("readonly", "readonly");
			$('.profile-tab1-view input').css("border-bottom", "none");
			$('.profile-tab1-view textarea').css("border-bottom", "none");
			$('.profile-tab1-view input[type="submit"]').hide();
			$('.profile-tab1-view input[type="password"]').hide();
			editCount++;
		}
	});
	$('textarea').dblclick(function(){

	// $('.edit-btn').on('dblclick', function(){

		if(editCount%2 == 0){
			$('.profile-tab1-view input').removeAttr("readonly");
			$('textarea').removeAttr("readonly");
			$('.profile-tab1-view input').css("border-bottom", "1px solid #14646d");
			$('.profile-tab1-view textarea').css("border-bottom", "1px solid #14646d");
			$('.profile-tab1-view input[type="submit"]').show();
			$('.profile-tab1-view input[type="password"]').show();
			editCount++;
		}
		else{
			$('.profile-tab1-view input').attr("readonly", "readonly");
			$('textarea').attr("readonly", "readonly");
			$('.profile-tab1-view input').css("border-bottom", "none");
			$('.profile-tab1-view textarea').css("border-bottom", "none");
			$('.profile-tab1-view input[type="submit"]').hide();
			$('.profile-tab1-view input[type="password"]').hide();
			editCount++;
		}
	});

});
