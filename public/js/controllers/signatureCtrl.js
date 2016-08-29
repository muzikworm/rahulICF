app.controller('signatureCtrl', function($scope, $state, authUser, $http){
	$scope.sign = function(){
		console.log($scope.signature);
		signature = $scope.signature;
		$http.get('/api/sign/'+signature).success(function(response){
            if(response == "success"){
                alert(response);

            }
        });
	}
});