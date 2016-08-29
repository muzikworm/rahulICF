app.controller('homeCtrl', function($scope, $rootScope, $state, authUser, $http){
	if(authUser.isLoggedIn() == true){
       if($state.current.name === "home"){
            $state.go('forum');
       }
    }
	$scope.requestMail = function(emailReq){
        requestEmailData = {
            email : emailReq
        }


        $http.post('/api/requestmail', requestEmailData).then(function(response){
            if(response.data == "success"){
                    $scope.emailReq = "You will be contacted soon...";
            }
        });
    }

    $('.contactus-popup').hide();   
    $scope.togglePopupContact = function(){
        $('.contactus-popup').toggle();
        $('.login-curtain').toggle();
    }
    
});